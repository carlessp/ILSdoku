/* ------------------------------------------------------------------ *
 * ILSdoku — compte i sessió (compartit entre la portada i el joc)
 *
 * - Manté l'estat de la sessió (configurada / dins / fora) i l'exposa a
 *   la resta de mòduls amb window.ILSDOKU_ACCOUNT.
 * - Pintarà l'indicador del topbar sempre que hi hagi un element
 *   [data-account] (així es veu sempre si estàs dins o no).
 * - A la portada, si no hi ha sessió, obre una invitació a iniciar-la
 *   (un cop per visita i navegador, amb «Ara no» que la silencia 12 h).
 *
 * No té dependències: si Firebase no està configurat o no carrega, no
 * passa res; l'indicador ho explica i prou.
 * ------------------------------------------------------------------ */
(function () {
  "use strict";

  var ESTAT = { configured: false, signedIn: false, who: "", detail: "", busy: false };
  var api = null;
  var subs = [];
  var invitFeta = false;
  var CLAU = "ilsdoku.invit.descartada";     // marca temporal de «ara no»
  var HORES_SILENCI = 12;

  function safe(fn, dflt) { try { return fn(); } catch (e) { return dflt; } }
  function silenciada() {
    var t = safe(function () { return +localStorage.getItem(CLAU) || 0; }, 0);
    return Date.now() - t < HORES_SILENCI * 3600 * 1000;
  }
  function silencia() { safe(function () { localStorage.setItem(CLAU, String(Date.now())); }); }

  function avisa() {
    subs.forEach(function (f) { safe(function () { f(ESTAT); }); });
    pinta();
    potserInvitacio();
  }

  /* ------------------------------------------------ API per a sync.js -- */

  window.ILSDOKU_ACCOUNT = {
    state: function () { return ESTAT; },
    subscribe: function (fn) { subs.push(fn); safe(function () { fn(ESTAT); }); },
    register: function (nou) {
      api = nou || null;
      ESTAT.configured = !!(api && api.available);
      ESTAT.signedIn = !!(api && api.signedIn);
      ESTAT.who = (api && api.who) || "";
      avisa();
    },
    update: function (info) {
      if (!info) return;
      ["configured", "signedIn", "busy"].forEach(function (k) {
        if (info[k] != null) ESTAT[k] = !!info[k];
      });
      ["who", "detail"].forEach(function (k) { if (info[k] != null) ESTAT[k] = info[k]; });
      avisa();
    },
    signIn: function () { if (api && api.signIn) api.signIn(); },
    signOut: function () { if (api && api.signOut) api.signOut(); },
    push: function (manual) { if (api && api.push) api.push(manual); },
    openAccount: openModalCompte,
    openInvitation: function () { obre("modal-invit"); }
  };

  /* ------------------------------------------------------- indicador -- */

  function pinta() {
    var llocs = document.querySelectorAll("[data-account]");
    if (!llocs.length) return;
    var html;
    if (!ESTAT.configured) {
      html = '<span class="acct off" title="La sincronització amb el núvol no està configurada">' +
             "☁️ Sense núvol</span>";
    } else if (!ESTAT.signedIn) {
      html = '<button class="tool ghost acct in" id="acct-signin" title="Inicia sessió per guardar el progrés">' +
             "👤 Inicia sessió</button>";
    } else {
      html = '<button class="tool ghost acct on" id="acct-open" title="Sessió iniciada: ' +
             esc(ESTAT.who) + '"><span class="dot"></span> ' + esc(ESTAT.who || "Compte") + "</button>";
    }
    for (var i = 0; i < llocs.length; i++) llocs[i].innerHTML = html;
    var b1 = document.getElementById("acct-signin");
    if (b1) b1.addEventListener("click", function () {
      if (document.body.classList.contains("landing")) obre("modal-invit");
      else openModalCompte();
    });
    var b2 = document.getElementById("acct-open");
    if (b2) b2.addEventListener("click", openModalCompte);
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* --------------------------------------------------------- modals --- */

  function obre(id) {
    var m = document.getElementById(id);
    if (m) m.classList.remove("hidden");
  }
  function tanca(id) {
    var m = document.getElementById(id);
    if (m) m.classList.add("hidden");
  }

  function construeix() {
    if (document.getElementById("modal-invit")) return;
    var d = document.createElement("div");
    d.innerHTML =
      '<div class="modal-backdrop hidden" id="modal-invit">' +
        '<div class="modal">' +
          "<h2>Guarda el teu progrés</h2>" +
          '<div class="modal-body">' +
            "<p>Inicia sessió amb el teu compte de Google per dur el <strong>recompte de casos " +
            "resolts</strong> i els temps, i per continuar les partides des de qualsevol dispositiu.</p>" +
            "<ul class='invit-llista'>" +
              "<li><strong>✅ Casos resolts</strong> i millor temps de cada cas.</li>" +
              "<li><strong>💾 Partides a mitges</strong>: les reprens allà on les vas deixar.</li>" +
              "<li><strong>🔒 Sense contrasenyes noves</strong>: entres amb Google. Només es desa " +
              "l'identificador del compte, un sobrenom opcional i els registres del joc.</li>" +
            "</ul>" +
            "<p class='pg-dim'>El joc funciona igual sense compte: el progrés es queda en aquest navegador.</p>" +
            '<div class="invit-accions">' +
              '<button class="tool primary" id="invit-signin">Inicia sessió amb Google</button>' +
              '<button class="tool ghost" id="invit-later">Ara no</button>' +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="modal-backdrop hidden" id="modal-compte">' +
        '<div class="modal">' +
          "<h2>El teu compte</h2>" +
          '<div class="modal-body" id="compte-cos"></div>' +
          '<div class="modal-actions"><button class="tool primary" id="compte-tanca">Tanca</button></div>' +
        "</div>" +
      "</div>";
    while (d.firstChild) document.body.appendChild(d.firstChild);

    document.getElementById("invit-signin").addEventListener("click", function () {
      silencia();
      tanca("modal-invit");
      window.ILSDOKU_ACCOUNT.signIn();
    });
    document.getElementById("invit-later").addEventListener("click", function () {
      silencia();
      tanca("modal-invit");
    });
    document.getElementById("compte-tanca").addEventListener("click", function () { tanca("modal-compte"); });
    document.querySelectorAll(".modal-backdrop").forEach(function (bd) {
      bd.addEventListener("click", function (e) { if (e.target === bd) bd.classList.add("hidden"); });
    });
  }

  function potserInvitacio() {
    if (invitFeta || !ESTAT.configured || ESTAT.signedIn) return;
    if (!document.body.classList.contains("landing")) return;   // només a la portada
    if (silenciada()) return;
    invitFeta = true;
    window.setTimeout(function () { obre("modal-invit"); }, 600);
  }

  function openModalCompte() {
    var cos = document.getElementById("compte-cos");
    if (!cos) return;
    var h = "";
    if (!ESTAT.configured) {
      h = "<p>La sincronització amb el núvol no està configurada en aquest lloc. El progrés es desa " +
          "en aquest navegador.</p>";
    } else if (!ESTAT.signedIn) {
      h = "<p>Encara no has iniciat sessió. Amb un compte de Google pots dur el recompte de casos " +
          "resolts i continuar les partides des de qualsevol dispositiu.</p>" +
          '<button class="tool primary" id="compte-dins">Inicia sessió amb Google</button>';
    } else {
      h = "<p>Sessió iniciada com a <strong>" + esc(ESTAT.who || "compte de Google") + "</strong>" +
          (ESTAT.detail ? " <span class='pg-dim'>(" + esc(ESTAT.detail) + ")</span>" : "") + "</p>" +
          "<p class='pg-dim'>El progrés es fusiona amb el del núvol cada cop que canvia alguna cosa.</p>" +
          '<div class="pg-actions">' +
            '<button class="tool ghost" id="compte-sincro">Sincronitza ara</button>' +
            '<button class="tool ghost" id="compte-fora">Tanca la sessió</button>' +
          "</div>";
    }
    if (document.getElementById("modal-progress")) {
      h += "<p style='margin-top:14px'><button class='tool ghost' id='compte-progres'>📈 El meu progrés</button></p>";
    }
    cos.innerHTML = h;
    var b;
    if ((b = document.getElementById("compte-dins"))) b.addEventListener("click", function () {
      tanca("modal-compte"); window.ILSDOKU_ACCOUNT.signIn();
    });
    if ((b = document.getElementById("compte-sincro"))) b.addEventListener("click", function () {
      ESTAT.detail = "sincronitzant…"; pinta(); window.ILSDOKU_ACCOUNT.push(true);
    });
    if ((b = document.getElementById("compte-fora"))) b.addEventListener("click", function () {
      tanca("modal-compte"); window.ILSDOKU_ACCOUNT.signOut();
    });
    if ((b = document.getElementById("compte-progres"))) b.addEventListener("click", function () {
      if (window.ILSDOKU_OPEN_MODAL) window.ILSDOKU_OPEN_MODAL("modal-progress");
    });
    obre("modal-compte");
  }

  /* ----------------------------------------------------------- inici -- */

  function inici() {
    construeix();
    pinta();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inici);
  else inici();
})();
