/*
 * ILSdoku — aplicació jugable (vanilla JS, sense dependències).
 */
(function () {
  "use strict";

  var CASES = window.ILSDOKU_CASES || [];
  var LONG_PRESS_MS = 420;

  // ---------- Estat ----------
  var caseData = null;
  var state = null;
  var history = [];
  var pressTimer = null;
  var longFired = false;
  var pressing = false;
  var dragPainted = false;
  var dragHistory = false;
  var downCell = null;
  var lastCell = null;
  var t0 = null;              // inici de la partida (per al temporitzador)
  var tickTimer = null;       // interval que refresca el rellotge
  var saveTimer = null;       // desat automàtic de la partida en curs
  var hintIndex = 0;
  var flashCells = [];
  var prevAutoX = {};        // X automàtiques ja mostrades (per animar només les noves)
  var lastPlaced = null;     // última fitxa col·locada (origen de l'animació)

  function freshState() {
    return {
      selected: null,
      mode: "note",          // note | x | erase
      placements: {},        // ilsId -> {r, c}
      notes: {},             // "r,c" -> [ilsId, ...]
      xmarks: {},            // "r,c" -> true
      solved: false,
      submits: 0             // enviaments fets (per a les estadístiques)
    };
  }

  function snapshot() { return JSON.stringify(state); }
  function pushHistory() {
    history.push(snapshot());
    if (history.length > 120) history.shift();
    scheduleSave();               // desa la partida en curs (amb retard)
  }

  /* ---------- Progrés: temporitzador i desat automàtic ---------- */

  function formatMs(ms) {
    var s = Math.max(0, Math.round(ms / 1000));
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), ss = s % 60;
    function dos(n) { return (n < 10 ? "0" : "") + n; }
    return h ? (h + ":" + dos(m) + ":" + dos(ss)) : (m + ":" + dos(ss));
  }

  function pintaRellotge() {
    var el = document.getElementById("case-timer");
    if (!el) return;
    if (state && state.solved && el.dataset.final) {
      el.textContent = el.dataset.final;
      return;
    }
    el.textContent = t0 ? formatMs(Date.now() - t0) : "0:00";
  }

  function startTick() {
    stopTick();
    pintaRellotge();
    tickTimer = setInterval(pintaRellotge, 1000);
  }

  function stopTick() {
    if (tickTimer) { clearInterval(tickTimer); tickTimer = null; }
    pintaRellotge();
  }

  function boardActual() {
    if (!state) return null;
    return {
      placements: state.placements,
      notes: state.notes,
      xmarks: state.xmarks,
      solved: state.solved
    };
  }

  function scheduleSave() {
    if (!window.ILSDOKU_SAVE_BOARD || !caseData || !state) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      saveTimer = null;
      if (window.ILSDOKU_SAVE_BOARD && caseData && state) {
        window.ILSDOKU_SAVE_BOARD(caseData.id, boardActual());
      }
    }, 600);
  }

  function flushSave() {
    clearTimeout(saveTimer);
    saveTimer = null;
    if (window.ILSDOKU_SAVE_BOARD && caseData && state) {
      window.ILSDOKU_SAVE_BOARD(caseData.id, boardActual());
    }
  }
  function undo() {
    if (!history.length) return;
    state = JSON.parse(history.pop());
    render();
  }

  // ---------- Geografia del tauler ----------
  function centreOf(r, c) {
    for (var i = 0; i < caseData.centres.length; i++) {
      var ct = caseData.centres[i], b = ct.rect;
      if (r >= b[0] && r <= b[2] && c >= b[1] && c <= b[3]) return ct;
    }
    return null;
  }
  function zoneOf(r) {
    for (var i = 0; i < caseData.zones.length; i++) {
      var z = caseData.zones[i];
      if (r >= z.rows[0] && r <= z.rows[1]) return z;
    }
    return null;
  }
  function objectAt(r, c) {
    var objs = caseData.objects || [];
    for (var i = 0; i < objs.length; i++) {
      var o = objs[i], ow = o.w || 1, oh = o.h || 1;
      if (r >= o.r && r < o.r + oh && c >= o.c && c < o.c + ow) return o;
    }
    return null;
  }
  function isBlocked(r, c) { var o = objectAt(r, c); return !!(o && !o.occupiable); }

  function ilsById(id) {
    for (var i = 0; i < caseData.ils.length; i++) if (caseData.ils[i].id === id) return caseData.ils[i];
    return null;
  }

  // etiquetes i textos de la bombolla d'ajuda
  function tornLabel(torn) {
    return torn === "matí" ? "Matí" : (torn === "tarda" ? "Tarda" : "Flexible");
  }
  function objTip(o) {
    // mateix vocabulari que la llegenda del tauler
    return o.name + (o.occupiable ? " · ocupable" : " · no ocupable");
  }
  function centreLabel(r, c) {
    var ct = centreOf(r, c);
    return ct ? (ct.short || ct.name) : "passadís";
  }

  // ---------- Accions ----------
  function selectCard(id) {
    if (state.solved) return;
    state.selected = (state.selected === id) ? null : id;
    if (state.mode === "x" || state.mode === "erase") state.mode = "note";
    render();
  }

  function setMode(m) {
    if (state.solved) return;
    state.mode = (state.mode === m) ? "note" : m;
    render();
  }

  function place(r, c) {
    var sel = state.selected;
    if (!sel || isBlocked(r, c) || isAutoX(r, c)) return;
    // treure qualsevol altra ILS d'aquesta cel·la
    Object.keys(state.placements).forEach(function (id) {
      var p = state.placements[id];
      if (p.r === r && p.c === c) delete state.placements[id];
    });
    // treure les ILS que xoquin a la mateixa fila o columna (una per fila/columna)
    Object.keys(state.placements).forEach(function (id) {
      var p = state.placements[id];
      if (p.r === r || p.c === c) delete state.placements[id];
    });
    state.placements[sel] = { r: r, c: c };
    // netejar les notes i les creus manuals de la fila i la columna
    Object.keys(state.notes).forEach(function (kk) {
      var pq = kk.split(",");
      if (+pq[0] === r || +pq[1] === c) delete state.notes[kk];
      else state.notes[kk] = state.notes[kk].filter(function (x) { return x !== sel; });
    });
    for (var cc = 0; cc < caseData.grid.w; cc++) delete state.xmarks[k(r, cc)];
    for (var rr = 0; rr < caseData.grid.h; rr++) delete state.xmarks[k(rr, c)];
    delete state.xmarks[k(r, c)];
    lastPlaced = { r: r, c: c };
  }

  // cel·la inhabilitada automàticament (fila, columna o centre ja ple)
  function isAutoX(r, c) {
    if (isBlocked(r, c)) return false;
    var ct = centreOf(r, c);
    var inCentre = 0;
    var ids = Object.keys(state.placements);
    for (var i = 0; i < ids.length; i++) {
      var p = state.placements[ids[i]];
      if (p.r === r && p.c === c) return false;   // ja hi ha una fitxa
      if (p.r === r || p.c === c) return true;    // mateixa fila o columna
      if (ct && centreOf(p.r, p.c) === ct) inCentre++;
    }
    return !!(ct && inCentre >= ct.demand);        // centre amb la demanda ja plena
  }

  function toggleNote(r, c) {
    var sel = state.selected;
    if (!sel) return;
    if (isAutoX(r, c)) return;
    var kk = k(r, c), arr = state.notes[kk] || [];
    if (arr.indexOf(sel) >= 0) {
      state.notes[kk] = arr.filter(function (x) { return x !== sel; });
      if (!state.notes[kk].length) delete state.notes[kk];
    } else {
      state.notes[kk] = arr.concat([sel]);
      delete state.xmarks[kk];
    }
  }

  function toggleX(r, c) {
    if (isAutoX(r, c)) return;   // ja està descartada automàticament
    var kk = k(r, c);
    if (state.xmarks[kk]) { delete state.xmarks[kk]; return; }
    state.xmarks[kk] = true;
    delete state.notes[kk];
    Object.keys(state.placements).forEach(function (id) {
      var p = state.placements[id];
      if (p.r === r && p.c === c) delete state.placements[id];
    });
  }

  function clearCell(r, c) {
    var kk = k(r, c);
    delete state.notes[kk];
    delete state.xmarks[kk];
    Object.keys(state.placements).forEach(function (id) {
      var p = state.placements[id];
      if (p.r === r && p.c === c) delete state.placements[id];
    });
  }

  function k(r, c) { return r + "," + c; }

  // ---------- Validesa ----------
  function validate() {
    var total = 0, correct = 0, placed = 0;
    var wrong = [];
    caseData.ils.forEach(function (il) {
      var p = state.placements[il.id];
      if (p) placed++;
      if (il.solution) {
        total++;
        if (p && p.r === il.solution[0] && p.c === il.solution[1]) correct++;
        else if (p) wrong.push(p);
      } else if (p) {
        wrong.push(p);
      }
    });
    var senseIl = caseData.ils.filter(function (x) { return !x.solution; })[0];
    var sensePlaced = senseIl && state.placements[senseIl.id];
    return { total: total, correct: correct, placed: placed, wrong: wrong, sensePlaced: !!sensePlaced, senseIl: senseIl };
  }

  function submit() {
    if (state.solved) return;
    state.submits++;
    var v = validate();
    if (v.correct === v.total && !v.sensePlaced) {
      state.solved = true;
      var ms = t0 ? (Date.now() - t0) : null;
      t0 = null;
      stopTick();
      render();
      showWin(v.senseIl, ms);
      flushSave();
      if (window.ILSDOKU_SAVE_SOLVE) {
        window.ILSDOKU_SAVE_SOLVE({
          caseId: caseData.id,
          ms: ms,
          hints: hintIndex,
          submits: state.submits
        });
      }
      return;
    }
    var msg = document.getElementById("message");
    if (v.placed < v.total) {
      msg.className = "message info";
      msg.textContent = "Encara no has col·locat totes les ILS. Correctes: " + v.correct + " de " + v.total + ".";
    } else {
      msg.className = "message bad";
      msg.textContent = "Hi ha alguna ILS mal col·locada (o has col·locat qui es quedava sense plaça). Torna-ho a provar!";
      flashCells = v.wrong.slice();
      render();
      setTimeout(function () { flashCells = []; render(); }, 1100);
      return;
    }
    render();
  }

  function showWin(senseIl, ms) {
    var msg = document.getElementById("message");
    msg.className = "message win";
    var temps = (ms != null) ? " en <strong>" + formatMs(ms) + "</strong>" : "";
    msg.innerHTML = "<strong>Horari quadrat!</strong> Has trobat qui es queda sense plaça: <strong>" +
      (senseIl ? esc(senseIl.name) : "?") + "</strong>" + temps + ". 🎉" +
      (caseData.reveal ? "<p class='reveal'>" + esc(caseData.reveal) + "</p>" : "");
  }

  // ---------- Pistes ----------
  function nextHint() {
    var hints = caseData.hints || [];
    var msg = document.getElementById("message");
    if (!hints.length) { msg.className = "message info"; msg.textContent = "Aquest cas no té pistes preparades."; return; }
    var h = hints[hintIndex % hints.length];
    hintIndex++;
    msg.className = "message hint";
    msg.innerHTML = "<strong>Pista " + (((hintIndex - 1) % hints.length) + 1) + "/" + hints.length + ":</strong> " + esc(h);
  }

  function reset() {
    state = freshState();
    history = [];
    hintIndex = 0;
    t0 = Date.now();
    startTick();
    prevAutoX = {};
    lastPlaced = null;
    var msg = document.getElementById("message");
    msg.className = "message info";
    msg.textContent = "Selecciona una ILS i col·loca-la. Toca una casella per fer una nota; mantén premut per col·locar-la.";
    render();
  }

  // ---------- Render ----------
  function render() {
    renderBoard();
    renderCards();
    renderToolbar();
  }

  function renderBoard() {
    var w = caseData.grid.w, h = caseData.grid.h;
    var board = document.getElementById("board");
    board.style.gridTemplateColumns = "repeat(" + w + ", 1fr)";
    board.innerHTML = "";

    // mapa invers de col·locacions
    var placeAt = {};
    Object.keys(state.placements).forEach(function (id) {
      var p = state.placements[id];
      placeAt[k(p.r, p.c)] = id;
    });

    var newAuto = [];   // X automàtiques que apareixen per primer cop en aquest render

    for (var r = 0; r < h; r++) {
      for (var c = 0; c < w; c++) {
        var cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.r = r; cell.dataset.c = c;

        var z = zoneOf(r), ct = centreOf(r, c);
        if (z) cell.classList.add("zone-" + z.id);
        // parets de centre
        var cUp = r > 0 ? centreOf(r - 1, c) : null;
        var cDown = r < h - 1 ? centreOf(r + 1, c) : null;
        var cLeft = c > 0 ? centreOf(r, c - 1) : null;
        var cRight = c < w - 1 ? centreOf(r, c + 1) : null;
        if (r === 0 || !cUp || !ct || cUp.id !== ct.id) cell.classList.add("wall-t");
        if (r === h - 1 || !cDown || !ct || cDown.id !== ct.id) cell.classList.add("wall-b");
        if (c === 0 || !cLeft || !ct || cLeft.id !== ct.id) cell.classList.add("wall-l");
        if (c === w - 1 || !cRight || !ct || cRight.id !== ct.id) cell.classList.add("wall-r");

        var obj = objectAt(r, c);
        if (obj && !obj.occupiable) cell.classList.add("blocked");

        if (obj && (obj.w || 1) * (obj.h || 1) === 1) {
          var icon;
          if (obj.img) {
            icon = document.createElement("img");
            icon.className = "obj-img";
            icon.src = obj.img;
            icon.alt = obj.name;
            icon.draggable = false;
          } else {
            icon = document.createElement("span");
            icon.className = "obj-icon";
            icon.textContent = obj.icon;
          }
          cell.appendChild(icon);
        }

        var pid = placeAt[k(r, c)];
        if (pid) {
          var il = ilsById(pid);
          var pl = document.createElement("span");
          pl.className = "place" + (il.solution ? "" : " is-sense");
          pl.textContent = il.initial;
          pl.setAttribute("aria-label", il.name + " · " + tornLabel(il.torn));
          cell.appendChild(pl);
        } else {
          var arr = state.notes[k(r, c)];
          if (arr && arr.length) {
            var nt = document.createElement("span");
            nt.className = "note";
            nt.textContent = arr.map(function (id) { return ilsById(id).initial; }).join(" ");
            cell.appendChild(nt);
          }
        }
        var manualX = !!state.xmarks[k(r, c)];
        var autoX = !manualX && isAutoX(r, c);
        if (!state.solved && (manualX || autoX)) {
          var x = document.createElement("span");
          x.className = "xmark" + (manualX ? "" : " auto");
          x.textContent = "✕";
          cell.appendChild(x);
          if (autoX && !prevAutoX[k(r, c)]) newAuto.push({ el: x, r: r, c: c });
        }
        if (flashCells.some(function (p) { return p.r === r && p.c === c; })) {
          cell.classList.add("flash-bad");
        }

        // Bombolla d'ajuda: què hi ha en aquesta casella. Els elements de dins
        // (imatges, fitxes, notes, ✕) no reben el cursor, així que l'atribut va
        // a la casella.
        var tipTxt = null;
        if (pid) {
          var ilTip = ilsById(pid);
          tipTxt = ilTip.name + " · " + tornLabel(ilTip.torn) + " — " + centreLabel(r, c);
        } else if (arr && arr.length) {
          tipTxt = "Notes: " + arr.map(function (id) { return ilsById(id).name; })
            .join(", ") + " — " + centreLabel(r, c);
        } else if (obj) {
          tipTxt = objTip(obj) + " — " + centreLabel(r, c);
        } else if (autoX) {
          tipTxt = "Descartada automàticament: la fila, la columna o el centre " +
                   "ja són plens.";
        } else if (ct) {
          tipTxt = centreLabel(r, c) + " · cal " + ct.demand + " ILS";
        } else {
          tipTxt = "Passadís (fora de centre): aquí no hi ha cap sala";
        }
        if (tipTxt) cell.dataset.tip = tipTxt;

        board.appendChild(cell);
      }
    }

    // Les X automàtiques noves apareixen consecutives, de la fitxa cap enfora.
    if (newAuto.length) {
      var from = lastPlaced;
      newAuto.sort(function (a, b) {
        var da = from ? Math.abs(a.r - from.r) + Math.abs(a.c - from.c) : 0;
        var db = from ? Math.abs(b.r - from.r) + Math.abs(b.c - from.c) : 0;
        return (da - db) || (a.r - b.r) || (a.c - b.c);
      });
      newAuto.forEach(function (it, i) {
        it.el.style.animationDelay = (i * 45) + "ms";
        it.el.classList.add("pop");
      });
    }
    // recorda quines X automàtiques ja estaven mostrades
    prevAutoX = {};
    if (!state.solved) {
      for (var rr2 = 0; rr2 < h; rr2++) {
        for (var cc2 = 0; cc2 < w; cc2++) if (isAutoX(rr2, cc2)) prevAutoX[k(rr2, cc2)] = true;
      }
    }

    // objectes de més d'una casella (p. ex. el banc 2×1): una sola imatge estesa
    (caseData.objects || []).forEach(function (o) {
      var ow = o.w || 1, oh = o.h || 1;
      if (ow === 1 && oh === 1) return;
      var ov = document.createElement("div");
      ov.className = "obj-span";
      ov.style.left = (o.c / w * 100) + "%";
      ov.style.top = (o.r / h * 100) + "%";
      ov.style.width = (ow / w * 100) + "%";
      ov.style.height = (oh / h * 100) + "%";
      if (o.img) {
        var im2 = document.createElement("img");
        im2.src = o.img;
        im2.alt = o.name;
        im2.draggable = false;
        ov.appendChild(im2);
      } else {
        var sp2 = document.createElement("span");
        sp2.className = "obj-icon";
        sp2.textContent = o.icon;
        ov.appendChild(sp2);
      }
      board.appendChild(ov);
    });

    // etiquetes de centre
    caseData.centres.forEach(function (ct) {
      var b = ct.rect;
      var lab = document.createElement("div");
      lab.className = "centre-label";
      lab.style.left = (b[1] / w * 100) + "%";
      lab.style.top = (b[0] / h * 100) + "%";
      lab.style.width = ((b[3] - b[1] + 1) / w * 100) + "%";
      lab.style.height = ((b[2] - b[0] + 1) / h * 100) + "%";
      var inner = document.createElement("div");
      inner.innerHTML = "<span>" + esc(ct.short || ct.name) + "</span>" +
        '<br><span class="demand">cal ' + ct.demand + "</span>";
      lab.appendChild(inner);
      board.appendChild(lab);
    });
  }

  function renderCards() {
    var wrap = document.getElementById("cards");
    wrap.innerHTML = "";
    caseData.ils.forEach(function (il) {
      var card = document.createElement("div");
      card.className = "card";
      card.dataset.torn = il.torn;
      if (state.selected === il.id) card.classList.add("selected");
      if (state.placements[il.id]) card.classList.add("placed");

      var av = document.createElement("div");
      av.className = "avatar";
      av.textContent = il.initial;

      var body = document.createElement("div");
      body.className = "card-body";
      var tornTxt = tornLabel(il.torn);
      var name = document.createElement("div");
      name.className = "card-name";
      name.innerHTML = "<span>" + esc(il.name) + '</span><span class="torn-chip">' + tornTxt + "</span>";
      var clue = document.createElement("div");
      clue.className = "card-clue" + (il.clue ? "" : " none");
      clue.textContent = il.clue ? il.clue : "Sense pista.";
      body.appendChild(name);
      body.appendChild(clue);

      card.appendChild(av);
      card.appendChild(body);
      card.addEventListener("click", function () { selectCard(il.id); });
      wrap.appendChild(card);
    });
  }

  function renderGlossary() {
    var g = caseData.glossary || [];
    fillGloss("gloss-ocupables", g.filter(function (o) { return o.occupiable; }));
    fillGloss("gloss-obstacles", g.filter(function (o) { return !o.occupiable; }));
  }

  function fillGloss(id, list) {
    var wrap = document.getElementById(id);
    if (!wrap) return;
    wrap.innerHTML = "";
    list.forEach(function (o) {
      var it = document.createElement("div");
      it.className = "gloss-item " + (o.occupiable ? "occ" : "obs");
      var ic = document.createElement("div");
      ic.className = "gi";
      if (o.img) {
        var im = document.createElement("img");
        im.src = o.img;
        im.alt = o.name;
        im.draggable = false;
        ic.appendChild(im);
      } else {
        ic.textContent = o.icon;
      }
      var tx = document.createElement("div");
      var nm = document.createElement("div");
      nm.className = "gn";
      nm.textContent = o.name;
      var ds = document.createElement("div");
      ds.className = "gd";
      ds.textContent = o.desc || "";
      tx.appendChild(nm);
      tx.appendChild(ds);
      it.appendChild(ic);
      it.appendChild(tx);
      wrap.appendChild(it);
    });
  }

  function renderToolbar() {
    document.getElementById("btn-x").classList.toggle("active", state.mode === "x");
    document.getElementById("btn-erase").classList.toggle("active", state.mode === "erase");
    document.getElementById("btn-undo").disabled = history.length === 0;
    document.getElementById("btn-submit").disabled = state.solved;
  }

  // ---------- Esdeveniments de cel·la (delegats al tauler) ----------
  function cellFromEvent(e) {
    var el = e.target && e.target.closest ? e.target.closest(".cell") : null;
    return el;
  }

  function addX(r, c) {
    if (isAutoX(r, c)) return;
    var kk = k(r, c);
    state.xmarks[kk] = true;
    delete state.notes[kk];
    Object.keys(state.placements).forEach(function (id) {
      var p = state.placements[id];
      if (p.r === r && p.c === c) delete state.placements[id];
    });
  }

  function paintNote(r, c) {
    if (!state.selected || isBlocked(r, c) || isAutoX(r, c)) return false;
    var kk = k(r, c), arr = state.notes[kk] || [];
    if (arr.indexOf(state.selected) >= 0) return false;
    state.notes[kk] = arr.concat([state.selected]);
    delete state.xmarks[kk];
    return true;
  }

  function updateCellNoteDOM(r, c) {
    var el = document.querySelector('.cell[data-r="' + r + '"][data-c="' + c + '"]');
    if (!el) return;
    var existing = el.querySelector(".note");
    var arr = state.notes[k(r, c)];
    if (arr && arr.length) {
      if (!existing) { existing = document.createElement("span"); existing.className = "note"; el.appendChild(existing); }
      existing.textContent = arr.map(function (id) { return ilsById(id).initial; }).join(" ");
    } else if (existing) {
      existing.parentNode.removeChild(existing);
    }
  }

  function onBoardDown(e) {
    if (state.solved) return;
    var el = cellFromEvent(e);
    if (!el) return;
    var r = +el.dataset.r, c = +el.dataset.c;
    pressing = true; longFired = false; dragPainted = false; dragHistory = false;
    downCell = { r: r, c: c }; lastCell = { r: r, c: c };

    if (state.mode === "erase") { pushHistory(); dragHistory = true; clearCell(r, c); render(); return; }
    if (state.mode === "x") { pushHistory(); dragHistory = true; addX(r, c); render(); return; }
    if (!state.selected) {
      var msg = document.getElementById("message");
      msg.className = "message info";
      msg.textContent = "Primer selecciona una ILS de la llista.";
      pressing = false;
      return;
    }
    clearTimeout(pressTimer);
    pressTimer = setTimeout(function () {
      longFired = true;
      if (isAutoX(downCell.r, downCell.c)) {
        var mm = document.getElementById("message");
        mm.className = "message info";
        mm.textContent = "Aquesta casella està descartada (la fila, la columna o el centre ja estan ocupats).";
        return;
      }
      pushHistory();
      place(downCell.r, downCell.c);
      render();
    }, LONG_PRESS_MS);
  }

  function onBoardMove(e) {
    if (!pressing) return;
    var el = cellFromEvent(e);
    if (!el) return;
    var r = +el.dataset.r, c = +el.dataset.c;
    if (lastCell && lastCell.r === r && lastCell.c === c) return;
    lastCell = { r: r, c: c };
    if (longFired) return;
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }  // arrossegament

    if (state.mode === "erase") {
      if (!dragHistory) { pushHistory(); dragHistory = true; }
      clearCell(r, c); render(); return;
    }
    if (state.mode === "x") {
      if (!dragHistory) { pushHistory(); dragHistory = true; }
      addX(r, c); render(); return;
    }
    if (!state.selected || isBlocked(r, c)) return;
    if (!dragHistory) { pushHistory(); dragHistory = true; }
    // en detectar l'arrossegament, pinta també la casella d'origen
    if (!dragPainted) {
      dragPainted = true;
      if (downCell && !isBlocked(downCell.r, downCell.c) && paintNote(downCell.r, downCell.c)) {
        updateCellNoteDOM(downCell.r, downCell.c);
      }
    }
    if (!isBlocked(r, c) && paintNote(r, c)) updateCellNoteDOM(r, c);
  }

  function onBoardUp(e) {
    if (!pressing) return;
    pressing = false;
    clearTimeout(pressTimer); pressTimer = null;
    if (e && e.type === "pointercancel") { longFired = false; dragPainted = false; render(); return; }
    if (longFired) { longFired = false; return; }
    if (state.mode === "erase" || state.mode === "x") { render(); return; }
    if (dragPainted) { dragPainted = false; render(); return; }
    if (downCell) { pushHistory(); toggleNote(downCell.r, downCell.c); render(); }
  }

  function onDocUp(e) {
    // alliberat fora del tauler
    if (!pressing) return;
    pressing = false;
    clearTimeout(pressTimer); pressTimer = null;
    if (state.mode === "note" && !longFired && !dragPainted && downCell) {
      pushHistory(); toggleNote(downCell.r, downCell.c);
    }
    longFired = false; dragPainted = false;
    render();
  }

  // ---------- Utils ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (m) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[m];
    });
  }

  // ---------- Modal ----------
  function openModal(id) { document.getElementById(id).classList.remove("hidden"); }
  function closeModal(id) { document.getElementById(id).classList.add("hidden"); }
  window.ILSDOKU_OPEN_MODAL = openModal;
  window.ILSDOKU_CLOSE_MODAL = closeModal;

  // ---------- Càrrega ----------
  function loadCase(idx) {
    flushSave();                       // el cas que deixem, desat de seguida
    caseData = CASES[idx] || CASES[0];
    document.getElementById("case-title").textContent = caseData.title;
    document.getElementById("case-diff").textContent = caseData.difficulty;
    document.getElementById("case-meta").textContent =
      caseData.grid.w + "×" + caseData.grid.h + " · " +
      caseData.ils.filter(function (i) { return i.solution; }).length + " places · " +
      caseData.ils.length + " candidates";
    renderGlossary();
    reset();
    // reprèn la partida desada (si n'hi ha)
    var guardat = window.ILSDOKU_LOAD_BOARD ? window.ILSDOKU_LOAD_BOARD(caseData.id) : null;
    if (guardat) {
      state.placements = guardat.placements || {};
      state.notes = guardat.notes || {};
      state.xmarks = guardat.xmarks || {};
      if (guardat.solved) {
        state.solved = true;
        t0 = null;
        stopTick();
        var el = document.getElementById("case-timer");
        if (el) el.dataset.final = "✔";
        var sense = null;
        caseData.ils.forEach(function (i) { if (!i.solution) sense = i; });
        showWin(sense);
        flushSave();
      }
      render();
    }
  }

  // ---------- Enllaços directes (?case=<id>, ?ajuda, ?glossari) ----------
  function applyDeepLinks(picker) {
    var q;
    try { q = new URLSearchParams(window.location.search); } catch (e) { return; }
    var cid = q.get("case");
    if (cid) {
      for (var i = 0; i < CASES.length; i++) {
        if (CASES[i].id === cid) {
          picker.value = i;
          loadCase(i);
          break;
        }
      }
    }
    if (q.has("ajuda")) openModal("modal-help");
    if (q.has("glossari")) openModal("modal-glossary");
  }

  function init() {
    if (!CASES.length) { document.body.innerHTML = "<p style='padding:40px'>No hi ha cap cas carregat.</p>"; return; }

    var picker = document.getElementById("case-picker");
    var groups = {};
    CASES.forEach(function (cs, i) {
      var g = groups[cs.difficulty];
      if (!g) {
        g = document.createElement("optgroup");
        g.label = cs.difficulty;
        picker.appendChild(g);
        groups[cs.difficulty] = g;
      }
      var o = document.createElement("option");
      o.value = i;
      o.textContent = cs.title + " (" + cs.grid.w + "×" + cs.grid.h + ")";
      g.appendChild(o);
    });
    if (window.ILSDOKU_ANNOTATE_PICKER) window.ILSDOKU_ANNOTATE_PICKER(picker);
    picker.addEventListener("change", function () { loadCase(+this.value); });

    document.getElementById("btn-x").addEventListener("click", function () { setMode("x"); });
    document.getElementById("btn-erase").addEventListener("click", function () { setMode("erase"); });
    document.getElementById("btn-undo").addEventListener("click", undo);
    document.getElementById("btn-hint").addEventListener("click", nextHint);
    document.getElementById("btn-submit").addEventListener("click", submit);
    document.getElementById("btn-reset").addEventListener("click", reset);
    document.getElementById("btn-help").addEventListener("click", function () { openModal("modal-help"); });
    document.getElementById("help-close").addEventListener("click", function () { closeModal("modal-help"); });
    document.getElementById("btn-glossary").addEventListener("click", function () { openModal("modal-glossary"); });
    document.getElementById("glossary-close").addEventListener("click", function () { closeModal("modal-glossary"); });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { state.selected = null; render(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); undo(); }
    });
    var board = document.getElementById("board");
    board.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    board.addEventListener("pointerdown", onBoardDown);
    board.addEventListener("pointermove", onBoardMove);
    board.addEventListener("pointerup", onBoardUp);
    board.addEventListener("pointercancel", onBoardUp);
    document.addEventListener("pointerup", onDocUp);

    loadCase(0);
    applyDeepLinks(picker);
    initTips();
  }

  /* ------------------------------------------------------------------ *
   * Bombolla d'ajuda: en passar-hi el cursor (o amb el teclat) es llegeix
   * què és cada element del tauler: objectes, ILS col·locades, notes, X
   * automàtiques i etiquetes de centre. Els elements només han de dur
   * l'atribut `data-tip`; la resta ho fa la delegació d'esdeveniments.
   * ------------------------------------------------------------------ */
  function initTips() {
    var tip = document.getElementById("tip");
    if (!tip) return;
    var current = null;

    function hide() {
      current = null;
      tip.classList.remove("on");
      tip.setAttribute("aria-hidden", "true");
      tip.textContent = "";
    }

    function show(el) {
      var text = el.getAttribute("data-tip");
      if (!text) { hide(); return; }
      current = el;
      tip.textContent = text;
      tip.classList.add("on");
      tip.setAttribute("aria-hidden", "false");
      // centrada a sobre de l'element, dins de la finestra
      var r = el.getBoundingClientRect();
      var t = tip.getBoundingClientRect();
      var x = r.left + r.width / 2 - t.width / 2;
      var y = r.top - t.height - 8;
      if (y < 6) y = r.bottom + 8;
      x = Math.max(6, Math.min(x, window.innerWidth - t.width - 6));
      tip.style.left = Math.round(x) + "px";
      tip.style.top = Math.round(y) + "px";
    }

    function targetOf(e) {
      return e.target && e.target.closest ? e.target.closest("[data-tip]") : null;
    }

    document.addEventListener("pointerover", function (e) {
      var el = targetOf(e);
      if (el) { if (el !== current) show(el); }
      else if (current) hide();
    });
    document.addEventListener("pointerout", function (e) {
      var el = targetOf(e);
      if (el && el === current && !el.contains(e.relatedTarget)) hide();
    });
    document.addEventListener("focusin", function (e) {
      var el = targetOf(e);
      if (el) show(el);
    });
    document.addEventListener("focusout", hide);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    document.addEventListener("pointerdown", hide);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
