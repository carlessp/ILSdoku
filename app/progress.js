/* ------------------------------------------------------------------ *
 * ILSdoku — progrés del jugador (Nivell 1: local, sense comptes)
 *
 * Desa a localStorage: casos resolts, millor temps, pistes i intents
 * gastats, i la partida en curs (fitxes, notes i creus) per poder
 * reprendre-la. Tot és opcional: si no hi ha emmagatzematge o alguna
 * cosa falla, el joc continua funcionant igual.
 *
 * Pont amb app.js (totes les funcions són globals i opcionals):
 *   ILSDOKU_HAS_SOLVED(id)                    -> true/false
 *   ILSDOKU_LOAD_BOARD(id)                    -> board | null
 *   ILSDOKU_SAVE_BOARD(id, board)             (app.js la crida amb debounce)
 *   ILSDOKU_SAVE_SOLVE({caseId, ms, hints, submits})
 *   ILSDOKU_ANNOTATE_PICKER(select)           marca ✓ els casos resolts
 *   ILSDOKU_REGISTER_SYNC(api)                l'usa sync.js (Firebase)
 * ------------------------------------------------------------------ */
(function () {
  "use strict";

  var KEY = "ilsdoku.progress.v1";
  var VERSIO = 1;

  var store = { v: VERSIO, cases: {}, player: { nick: "" }, updatedAt: 0 };
  var sync = null;                       // l'omple sync.js si Firebase està configurat
  var syncInfo = { configured: false, signedIn: false, who: "", detail: "", busy: false };
  var pushTimer = null;

  function safe(fn, dflt) { try { return fn(); } catch (e) { return dflt; } }
  function copia(o) { return safe(function () { return JSON.parse(JSON.stringify(o)); }, null); }

  /* ---------------------------------------------------------- dades -- */

  function best(a, b) {
    if (a == null) return (b == null ? null : b);
    if (b == null) return a;
    return Math.min(a, b);
  }

  function mergeCase(a, b) {
    if (!a) return b;
    if (!b) return a;
    var rec = {
      solved: !!(a.solved || b.solved),
      bestMs: best(a.bestMs, b.bestMs),
      hints: best(a.hints, b.hints),
      submits: best(a.submits, b.submits),
      at: Math.max(a.at || 0, b.at || 0) || null,
      board: null
    };
    var ba = a.board, bb = b.board;
    if (ba && bb) rec.board = (ba.at || 0) >= (bb.at || 0) ? ba : bb;
    else rec.board = ba || bb;
    return rec;
  }

  function mergeStores(x, y) {
    x = x || {}; y = y || {};
    var out = {
      v: VERSIO,
      cases: {},
      player: { nick: (x.player && x.player.nick) || (y.player && y.player.nick) || "" },
      updatedAt: Math.max(x.updatedAt || 0, y.updatedAt || 0)
    };
    var ids = {};
    Object.keys(x.cases || {}).forEach(function (k) { ids[k] = 1; });
    Object.keys(y.cases || {}).forEach(function (k) { ids[k] = 1; });
    Object.keys(ids).forEach(function (id) { out.cases[id] = mergeCase((x.cases || {})[id], (y.cases || {})[id]); });
    return out;
  }

  function load() {
    var raw = safe(function () { return localStorage.getItem(KEY); }, null);
    if (!raw) return;
    var data = safe(function () { return JSON.parse(raw); }, null);
    if (data && data.cases) store = mergeStores(store, data);
  }

  function save() {
    store.updatedAt = Date.now();
    safe(function () { localStorage.setItem(KEY, JSON.stringify(store)); });
  }

  function caseRec(id) { return store.cases[id] || (store.cases[id] = {}); }

  /* -------------------------------------------------- API per app.js -- */

  window.ILSDOKU_HAS_SOLVED = function (id) {
    var c = store.cases[id];
    return !!(c && c.solved);
  };

  window.ILSDOKU_LOAD_BOARD = function (id) {
    var c = store.cases[id];
    if (!c || !c.board) return null;
    return copia(c.board);
  };

  window.ILSDOKU_SAVE_BOARD = function (id, board) {
    if (!id || !board) return;
    var c = caseRec(id);
    c.board = {
      placements: copia(board.placements) || {},
      notes: copia(board.notes) || {},
      xmarks: copia(board.xmarks) || {},
      solved: !!board.solved,
      at: Date.now()
    };
    save();
    schedulePush();
  };

  window.ILSDOKU_SAVE_SOLVE = function (info) {
    if (!info || !info.caseId) return;
    var c = caseRec(info.caseId);
    c.solved = true;
    if (info.ms != null) c.bestMs = best(c.bestMs, info.ms);
    if (info.hints != null) c.hints = best(c.hints, info.hints);
    if (info.submits != null) c.submits = best(c.submits, info.submits);
    c.at = Date.now();
    if (c.board) c.board.solved = true;
    save();
    renderProgress();
    markPicker();
    schedulePush();
  };

  // Marca amb ✓ els casos ja resolts al selector de casos
  window.ILSDOKU_ANNOTATE_PICKER = function (picker) { markPicker(picker); };

  function markPicker(picker) {
    picker = picker || document.getElementById("case-picker");
    if (!picker || !window.ILSDOKU_CASES) return;
    var fets = 0;
    for (var i = 0; i < picker.options.length; i++) {
      var o = picker.options[i];
      var cs = window.ILSDOKU_CASES[+o.value];
      if (!cs) continue;
      var base = cs.title + " (" + cs.grid.w + "×" + cs.grid.h + ")";
      var fet = window.ILSDOKU_HAS_SOLVED(cs.id);
      if (fet) fets++;
      o.textContent = (fet ? "✓ " : "") + base;
    }
    var badge = document.getElementById("progress-badge");
    if (badge) badge.textContent = fets ? String(fets) : "";
    if (badge) badge.classList.toggle("hidden", !fets);
    return fets;
  }

  /* ----------------------------------------------------------- UI ----- */

  function formatMs(ms) {
    if (ms == null) return "—";
    var s = Math.round(ms / 1000);
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    var dos = function (n) { return (n < 10 ? "0" : "") + n; };
    return h ? (h + ":" + dos(m) + ":" + dos(ss)) : (m + ":" + dos(ss));
  }

  function renderProgress() {
    if (!document.getElementById("progress-table")) return;
    var casos = window.ILSDOKU_CASES || [];
    var fets = casos.filter(function (c) { return window.ILSDOKU_HAS_SOLVED(c.id); }).length;
    var files = casos.map(function (c) {
      var r = store.cases[c.id] || {};
      return "<tr>" +
        "<td>" + (r.solved ? "✅" : "⬜") + "</td>" +
        "<td>" + c.title + " <span class='pg-dim'>(" + c.difficulty + " · " + c.grid.w + "×" + c.grid.h + ")</span></td>" +
        "<td class='pg-num'>" + (r.solved ? formatMs(r.bestMs) : "—") + "</td>" +
        "<td class='pg-num'>" + (r.hints == null ? "—" : r.hints) + "</td>" +
        "<td class='pg-num'>" + (r.submits == null ? "—" : r.submits) + "</td>" +
        "</tr>";
    }).join("");
    var total = document.getElementById("progress-total");
    if (total) {
      total.textContent = fets + " de " + casos.length + " casos resolts";
    }
    var taula = document.getElementById("progress-table");
    if (taula) {
      taula.innerHTML = "<thead><tr><th></th><th>Cas</th><th>Temps</th><th>Pistes</th><th>Enviaments</th></tr></thead>" +
        "<tbody>" + files + "</tbody>";
    }
    renderSync();
  }

  function renderSync() {
    var cos = document.getElementById("progress-account");
    if (!cos) return;
    if (window.ILSDOKU_ACCOUNT) {
      // El compte es gestiona des del mòdul compartit (account.js): aquí només
      // se'n mostra l'estat i un botó per obrir-lo.
      var st = window.ILSDOKU_ACCOUNT.state();
      var linia = !st.configured ? "La sincronització amb el núvol no està configurada."
        : (st.signedIn ? "Sessió iniciada com a <strong>" + (st.who || "compte de Google") + "</strong>."
                       : "Encara no has iniciat sessió.");
      cos.innerHTML = "<p>" + linia + "</p>" +
        "<p><button class='tool ghost' id='pg-compte'>Gestiona el compte</button></p>";
      var b = document.getElementById("pg-compte");
      if (b) b.addEventListener("click", function () { window.ILSDOKU_ACCOUNT.openAccount(); });
      return;
    }
    var h = "";
    if (!syncInfo.configured) {
      h = "<p class='pg-dim'>La sincronització amb el núvol encara no està configurada. " +
          "Mira les instruccions de <code>app/README.md</code> (§ «Sincronització amb Firebase»).</p>";
    } else if (!syncInfo.signedIn) {
      h = "<p>Inicia sessió amb el teu compte de Google per tenir el progrés sincronitzat " +
          "entre dispositius.</p>" +
          "<button class='tool primary' id='pg-signin'>Inicia sessió amb Google</button>";
    } else {
      h = "<p>Sessió: <strong>" + (syncInfo.who || "compte de Google") + "</strong>" +
          (syncInfo.detail ? " <span class='pg-dim'>" + syncInfo.detail + "</span>" : "") + "</p>" +
          "<button class='tool ghost' id='pg-syncnow'>Sincronitza ara</button> " +
          "<button class='tool ghost' id='pg-signout'>Tanca la sessió</button>";
    }
    cos.innerHTML = h;
    var b1 = document.getElementById("pg-signin");
    if (b1) b1.addEventListener("click", function () { if (sync && sync.signIn) sync.signIn(); });
    var b2 = document.getElementById("pg-syncnow");
    if (b2) b2.addEventListener("click", function () { if (sync && sync.push) { syncInfo.detail = "sincronitzant…"; renderSync(); sync.push(true); } });
    var b3 = document.getElementById("pg-signout");
    if (b3) b3.addEventListener("click", function () { if (sync && sync.signOut) sync.signOut(); });
  }

  function schedulePush() {
    if (!sync || !sync.push) return;
    clearTimeout(pushTimer);
    pushTimer = setTimeout(function () { sync.push(false); }, 2500);
  }

  function exporta() {
    var dades = JSON.stringify(store, null, 1);
    safe(function () {
      var url = URL.createObjectURL(new Blob([dades], { type: "application/json" }));
      var a = document.createElement("a");
      a.href = url;
      a.download = "ilsdoku-progres.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
    });
  }

  function importa(text) {
    var data = safe(function () { return JSON.parse(text); }, null);
    if (!data || !data.cases) { alert("Aquest fitxer no sembla un progrés d'ILSdoku."); return; }
    store = mergeStores(store, data);
    save();
    renderProgress();
    markPicker();
    schedulePush();
  }

  function initUI() {
    var btn = document.getElementById("btn-progress");
    if (btn) btn.addEventListener("click", function () {
      renderProgress();
      if (window.ILSDOKU_OPEN_MODAL) window.ILSDOKU_OPEN_MODAL("modal-progress");
      else {
        var m = document.getElementById("modal-progress");
        if (m) m.classList.remove("hidden");
      }
    });
    var tanca = document.getElementById("progress-close");
    if (tanca) tanca.addEventListener("click", function () {
      if (window.ILSDOKU_CLOSE_MODAL) window.ILSDOKU_CLOSE_MODAL("modal-progress");
      else {
        var m = document.getElementById("modal-progress");
        if (m) m.classList.add("hidden");
      }
    });
    var exp = document.getElementById("progress-export");
    if (exp) exp.addEventListener("click", exporta);
    var imp = document.getElementById("progress-import");
    if (imp) imp.addEventListener("click", function () {
      var f = document.getElementById("progress-import-file");
      if (f) f.click();
    });
    var f = document.getElementById("progress-import-file");
    if (f) f.addEventListener("change", function () {
      var file = f.files && f.files[0];
      if (!file) return;
      var fr = new FileReader();
      fr.onload = function () { importa(String(fr.result)); f.value = ""; };
      fr.readAsText(file);
    });
    var res = document.getElementById("progress-reset");
    if (res) res.addEventListener("click", function () {
      if (!confirm("Segur que vols esborrar tot el progrés d'aquest navegador?")) return;
      store = { v: VERSIO, cases: {}, player: { nick: "" }, updatedAt: 0 };
      save();
      renderProgress();
      markPicker();
      schedulePush();
    });
    var input = document.getElementById("progress-nick");
    if (input) {
      input.value = store.player.nick || "";
      input.addEventListener("change", function () {
        store.player.nick = input.value.trim().slice(0, 24);
        save();
        schedulePush();
      });
    }
  }

  /* ------------------------------------------- pont amb sync.js ------- */

  window.ILSDOKU_REGISTER_SYNC = function (api) {
    sync = api || null;
    syncInfo.configured = !!(api && api.available);
    syncInfo.signedIn = !!(api && api.signedIn);
    syncInfo.who = (api && api.who) || "";
    renderSync();
  };

  window.ILSDOKU_SYNC_INFO = function (info) {
    if (!info) return;
    if (info.configured != null) syncInfo.configured = !!info.configured;
    if (info.signedIn != null) syncInfo.signedIn = !!info.signedIn;
    if (info.who != null) syncInfo.who = info.who;
    if (info.detail != null) syncInfo.detail = info.detail;
    renderSync();
  };

  // Perquè sync.js pugui llegir i fusionar el progrés
  window.ILSDOKU_PROGRESS_DATA = function () { return copia(store); };
  window.ILSDOKU_PROGRESS_MERGE = function (remote) {
    if (!remote || !remote.cases) return;
    store = mergeStores(store, remote);
    save();
    renderProgress();
    markPicker();
  };

  /* ----------------------------------------------------------- inici -- */

  load();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { initUI(); });
  } else {
    initUI();
  }
})();
