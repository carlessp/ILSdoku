/* ==========================================================================
   ILSdoku — generador de fulls imprimibles (plantilles A4)
   Reaprofita window.ILSDOKU_CASES (data.js) i les imatges de app/img/.
   ========================================================================== */
(function () {
  "use strict";

  var CASES = window.ILSDOKU_CASES || [];
  var caseIdx = 0;                          // índex o "all"
  var opts = { solution: true, glossary: true };

  /* ---------------- utilitats ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function zoneOf(cd, r) {
    return (cd.zones || []).filter(function (z) { return r >= z.rows[0] && r <= z.rows[1]; })[0] || null;
  }
  function centreOf(cd, r, c) {
    return (cd.centres || []).filter(function (ct) {
      return r >= ct.rect[0] && r <= ct.rect[2] && c >= ct.rect[1] && c <= ct.rect[3];
    })[0] || null;
  }
  function objectAt(cd, r, c) {
    var objs = cd.objects || [];
    for (var i = 0; i < objs.length; i++) {
      var o = objs[i], ow = o.w || 1, oh = o.h || 1;
      if (r >= o.r && r < o.r + oh && c >= o.c && c < o.c + ow) return o;
    }
    return null;
  }
  function ilsById(cd, id) {
    return (cd.ils || []).filter(function (i) { return i.id === id; })[0] || null;
  }

  /* ---------------- tauler ---------------- */
  function buildBoard(cd, placements) {
    var w = cd.grid.w, h = cd.grid.h;
    var wrap = el("div", "board-grid");
    wrap.style.setProperty("--n", Math.max(w, h));

    function rc(text, col, row) {
      var d = el("div", "rc", text);
      d.style.gridColumn = col;
      d.style.gridRow = row;
      return d;
    }
    wrap.appendChild(rc("", 1, 1));
    for (var c = 0; c < w; c++) wrap.appendChild(rc("C" + (c + 1), c + 2, 1));
    for (var r = 0; r < h; r++) wrap.appendChild(rc("R" + (r + 1), 1, r + 2));

    var board = el("div", "board");
    board.style.gridTemplateColumns = "repeat(" + w + ", 1fr)";

    for (r = 0; r < h; r++) {
      for (c = 0; c < w; c++) {
        var cell = el("div", "cell");
        cell.dataset.r = r; cell.dataset.c = c;

        var z = zoneOf(cd, r), ct = centreOf(cd, r, c);
        if (z) cell.classList.add("zone-" + z.id);

        var cUp = r > 0 ? centreOf(cd, r - 1, c) : null;
        var cDown = r < h - 1 ? centreOf(cd, r + 1, c) : null;
        var cLeft = c > 0 ? centreOf(cd, r, c - 1) : null;
        var cRight = c < w - 1 ? centreOf(cd, r, c + 1) : null;
        if (r === 0 || !cUp || !ct || cUp.id !== ct.id) cell.classList.add("wall-t");
        if (r === h - 1 || !cDown || !ct || cDown.id !== ct.id) cell.classList.add("wall-b");
        if (c === 0 || !cLeft || !ct || cLeft.id !== ct.id) cell.classList.add("wall-l");
        if (c === w - 1 || !cRight || !ct || cRight.id !== ct.id) cell.classList.add("wall-r");

        var obj = objectAt(cd, r, c);
        if (obj && !obj.occupiable) cell.classList.add("blocked");
        if (obj && (obj.w || 1) * (obj.h || 1) === 1) {
          var im;
          if (obj.img) {
            im = document.createElement("img");
            im.className = "obj-img";
            im.src = obj.img;
            im.alt = obj.name;
            im.draggable = false;
          } else {
            im = el("span", "obj-icon", obj.icon);
          }
          im.title = obj.name;
          cell.appendChild(im);
        }

        var ini = placements[r + "," + c];
        if (ini) {
          var pl = el("span", "place", ini);
          cell.appendChild(pl);
        }
        board.appendChild(cell);
      }
    }

    // objectes de més d'una casella (p. ex. el banc 2×1): una sola imatge estesa
    (cd.objects || []).forEach(function (o) {
      var ow = o.w || 1, oh = o.h || 1;
      if (ow === 1 && oh === 1) return;
      var ov = el("div", "obj-span");
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
        ov.appendChild(el("span", "obj-icon", o.icon));
      }
      ov.title = o.name;
      board.appendChild(ov);
    });

    (cd.centres || []).forEach(function (ct2) {
      var b = ct2.rect;
      var lab = el("div", "centre-label");
      lab.style.left = (b[1] / w * 100) + "%";
      lab.style.top = (b[0] / h * 100) + "%";
      lab.style.width = ((b[3] - b[1] + 1) / w * 100) + "%";
      lab.style.height = ((b[2] - b[0] + 1) / h * 100) + "%";
      var inner = el("div");
      inner.innerHTML = "<span>" + esc(ct2.short || ct2.name) + "</span><br>" +
        '<span class="demand">cal ' + ct2.demand + "</span>";
      lab.appendChild(inner);
      board.appendChild(lab);
    });

    wrap.appendChild(board);
    return wrap;
  }

  /* ---------------- capçalera ---------------- */
  function head(cd, kicker) {
    var hd = el("div", "sheet-head");
    hd.appendChild(el("span", "logo", "IL"));
    var t = el("h1", null, kicker ? kicker + " — " + cd.title : cd.title);
    hd.appendChild(t);
    var n = (cd.ils || []).length, places = n - 1;
    hd.appendChild(el("div", "meta",
      cd.grid.w + "×" + cd.grid.h + " · " + places + " places · " + n +
      " candidates · " + (cd.difficulty || "")));
    return hd;
  }
  function nameLine() {
    var d = el("div", "sheet-name");
    d.appendChild(el("span", null, "Nom:"));
    d.appendChild(el("span", "fill"));
    d.appendChild(el("span", null, "Data:"));
    d.appendChild(el("span", "fill"));
    return d;
  }

  /* ---------------- regles ---------------- */
  function rulesBox() {
    var ul = el("ul", "rules");
    ul.innerHTML =
      "<li>Col·loca cada ILS a una casella: <strong>una per fila</strong> i <strong>una per columna</strong>.</li>" +
      "<li>Cada <strong>centre</strong> ha de tenir <em>exactament</em> les ILS de la seva placa (<em>cal 1</em>, <em>cal 2</em>, <em>cal 3</em>).</li>" +
      "<li>Les ILS de <strong>matí</strong> només a la zona Matí (files R1–R4); les de <strong>tarda</strong>, a la Tarda (R5–R7).</li>" +
      "<li>No es pot seure sobre un objecte <strong>no ocupable</strong> (taula, pissarra, ordinador…); sí sobre un d'<strong>ocupable</strong>.</li>" +
      "<li>Objectiu: hi ha <strong>una ILS de més</strong> (N places i N+1 candidates). Quan quadris l'horari, <strong>qui es queda sense plaça?</strong></li>";
    return ul;
  }

  /* ---------------- llistes ---------------- */
  function miniList(cd, items) {
    var wrap = el("div", "two-cols");
    items.forEach(function (it) {
      var d = el("div", "mini");
      d.appendChild(el("span", "who", it.who));
      if (it.torn) d.appendChild(el("span", "torn " + it.torn.cls, it.torn.text));
      d.appendChild(el("span", "clue" + (it.none ? " none" : ""), it.clue));
      wrap.appendChild(d);
    });
    return wrap;
  }
  function candidatesSheet(cd) {
    var frag = document.createDocumentFragment();
    frag.appendChild(el("h2", null, "Les candidates i les seves pistes"));
    var items = (cd.ils || []).map(function (il) {
      return {
        who: il.name,
        torn: { cls: il.torn === "tarda" ? "tarda" : "mati", text: il.torn },
        clue: il.clue || "sense pista",
        none: !il.clue
      };
    });
    frag.appendChild(miniList(cd, items));
    return frag;
  }
  function solutionSheet(cd) {
    var frag = document.createDocumentFragment();
    frag.appendChild(el("h2", null, "Col·locacions"));
    var items = [], out = [];
    (cd.ils || []).forEach(function (il) {
      if (il.solution) {
        var ct = centreOf(cd, il.solution[0], il.solution[1]);
        items.push({
          who: il.name,
          torn: { cls: il.torn === "tarda" ? "tarda" : "mati", text: "R" + (il.solution[0] + 1) + " C" + (il.solution[1] + 1) },
          clue: (ct ? ct.name : "") + (il.clue ? " · " + il.clue : "")
        });
      } else {
        out.push(il.name);
      }
    });
    frag.appendChild(miniList(cd, items));
    if (out.length) {
      var note = el("p", "solution-note");
      note.innerHTML = "<strong>Es queda sense plaça: " + esc(out.join(", ")) +
        "</strong>. No encaixa en cap casella lliure." +
        (cd.reveal ? ' <span class="reveal">' + esc(cd.reveal) + "</span>" : "");
      frag.appendChild(note);
    }
    return frag;
  }

  /* ---------------- glossari ---------------- */
  function glossarySheet(cd) {
    var frag = document.createDocumentFragment();
    frag.appendChild(el("h2", null, "Objectes ocupables — una ILS s'hi pot seure"));
    var g = cd.glossary || [];
    frag.appendChild(glossGrid(g.filter(function (o) { return o.occupiable; })));
    frag.appendChild(el("h2", null, "Objectes no ocupables — bloquegen la casella"));
    frag.appendChild(glossGrid(g.filter(function (o) { return !o.occupiable; })));
    frag.appendChild(el("h2", null, "Símbols i conceptes"));
    var ul = el("ul", "rules");
    ul.innerHTML =
      "<li><strong>ILS</strong> — intèrpret de llengua de signes; són les fitxes que es col·loquen.</li>" +
      "<li><strong>Centre</strong> — zona delimitada del tauler; la placa indica la seva <strong>demanda</strong>.</li>" +
      "<li><strong>Matí / Tarda</strong> — meitat de dalt (R1–R4) i meitat de baix (R5–R7); cada ILS només pot anar a la seva.</li>" +
      "<li><strong>Objecte únic</strong> — n'hi ha un de sol al tauler (estoreta, banc, rellotge): les pistes que hi fan referència són molt potents.</li>" +
      "<li><strong>Sense pista</strong> — alguna candidata pot no tenir pista; això no vol dir que quedi fora.</li>";
    frag.appendChild(ul);
    return frag;
  }
  function glossGrid(list) {
    var wrap = el("div", "gloss-print");
    list.forEach(function (o) {
      var it = el("div", "gp-item" + (o.occupiable ? " occ" : ""));
      if (o.img) {
        var im = document.createElement("img");
        im.src = o.img; im.alt = o.name; im.draggable = false;
        it.appendChild(im);
      } else {
        it.appendChild(el("span", null, o.icon));
      }
      var tx = el("div", "gp-t");
      tx.appendChild(el("div", "gp-n", o.name));
      tx.appendChild(el("div", "gp-d", o.desc || ""));
      it.appendChild(tx);
      wrap.appendChild(it);
    });
    return wrap;
  }

  /* ---------------- composició ---------------- */
  function puzzleSheet(cd) {
    var s = el("div", "sheet");
    s.appendChild(head(cd));
    s.appendChild(nameLine());
    s.appendChild(rulesBox());
    s.appendChild(buildBoard(cd, {}));
    s.appendChild(candidatesSheet(cd));
    return s;
  }
  function glossaryPage(cd) {
    var s = el("div", "sheet");
    s.appendChild(head(cd, "Glossari"));
    s.appendChild(glossarySheet(cd));
    return s;
  }
  function solutionPage(cd) {
    var s = el("div", "sheet");
    s.appendChild(head(cd, "Solució"));
    var placements = {};
    (cd.ils || []).forEach(function (il) {
      if (il.solution) placements[il.solution[0] + "," + il.solution[1]] = il.initial;
    });
    s.appendChild(buildBoard(cd, placements));
    s.appendChild(solutionSheet(cd));
    return s;
  }

  function render() {
    var host = document.getElementById("sheets");
    host.innerHTML = "";
    var list = caseIdx === "all" ? CASES : [CASES[caseIdx]];
    list.forEach(function (cd) {
      host.appendChild(puzzleSheet(cd));
      if (opts.glossary) host.appendChild(glossaryPage(cd));
      if (opts.solution) host.appendChild(solutionPage(cd));
    });
  }

  /* ---------------- controls ---------------- */
  function init() {
    var sel = document.getElementById("print-case");
    CASES.forEach(function (c, i) {
      var o = document.createElement("option");
      o.value = i;
      o.textContent = c.title + " (" + c.difficulty + ", " + c.grid.w + "×" + c.grid.h + ")";
      sel.appendChild(o);
    });
    var all = document.createElement("option");
    all.value = "all"; all.textContent = "— Tots els casos —";
    sel.appendChild(all);

    sel.addEventListener("change", function () {
      caseIdx = this.value === "all" ? "all" : +this.value;
      render();
    });
    document.getElementById("opt-solution").addEventListener("change", function () {
      opts.solution = this.checked; render();
    });
    document.getElementById("opt-glossary").addEventListener("change", function () {
      opts.glossary = this.checked; render();
    });
    document.getElementById("btn-print").addEventListener("click", function () {
      window.print();
    });
    render();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
