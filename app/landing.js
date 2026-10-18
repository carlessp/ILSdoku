/*
 * ILSdoku — portada: selector de nivells, recursos i mini-tauler decoratiu.
 * Llegeix window.ILSDOKU_CASES (data.js) i construeix tota la pàgina.
 */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var CASES = window.ILSDOKU_CASES || [];

  // Nivells canònics (l'ordre és el de presentació).
  var LEVELS = [
    { key: "molt facil",   label: "Molt fàcil",   code: "lvl-mf",
      desc: "Taulers petits i pistes clares per agafar el ritme." },
    { key: "facil",        label: "Fàcil",        code: "lvl-f",
      desc: "Una mica més de tauler i pistes per encaixar." },
    { key: "mitja",        label: "Mitjà",        code: "lvl-m",
      desc: "Centres compartits i tot el repertori de pistes." },
    { key: "dificil",      label: "Difícil",      code: "lvl-d",
      desc: "Taulers grans i deduccions en cadena." },
    { key: "expert",       label: "Expert",       code: "lvl-e",
      desc: "Per a qui no deixa cap casella sense descartar." },
    { key: "molt dificil", label: "Molt difícil", code: "lvl-e",
      desc: "Els reptes més exigents del dossier." }
  ];

  function norm(s) {
    return String(s || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
  }

  function levelMeta(difficulty) {
    var n = norm(difficulty);
    for (var i = 0; i < LEVELS.length; i++) {
      if (LEVELS[i].key === n) return LEVELS[i];
    }
    // Nivell desconegut: se'l dona un aspecte neutre.
    return { key: n, label: difficulty, code: "lvl-x", desc: "" };
  }

  // ---------- Agrupació de casos per nivell ----------
  function groupCases() {
    var groups = [];   // [{ meta, cases: [] }] en ordre de primera aparició
    var byKey = {};
    CASES.forEach(function (cs) {
      var meta = levelMeta(cs.difficulty);
      var g = byKey[meta.key];
      if (!g) {
        g = { meta: meta, cases: [] };
        byKey[meta.key] = g;
        groups.push(g);
      }
      g.cases.push(cs);
    });
    // ordena els grups segons l'ordre canònic de LEVELS
    groups.sort(function (a, b) {
      var ia = LEVELS.indexOf(a.meta), ib = LEVELS.indexOf(b.meta);
      if (ia < 0) ia = LEVELS.length;
      if (ib < 0) ib = LEVELS.length;
      return ia - ib;
    });
    return groups;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function caseMetaLine(cs) {
    var places = cs.ils.filter(function (x) { return x.solution; }).length;
    var pistes = cs.ils.filter(function (x) { return x.clue; }).length;
    return cs.grid.w + "×" + cs.grid.h + " · " + places + " places · " +
           cs.ils.length + " candidates · " + pistes + " pistes";
  }

  // ---------- Fitxa d'un cas ----------
  function caseTile(cs, meta) {
    var tile = el("article", "case-tile");
    tile.appendChild(el("div", "ct-strip"));

    var body = el("div", "ct-body");
    var h = el("h3", "ct-title", cs.title);
    body.appendChild(h);

    var metaP = el("p", "ct-meta");
    metaP.textContent = caseMetaLine(cs);
    body.appendChild(metaP);

    var clues = el("span", "ct-clues", norm(cs.difficulty) === norm(meta.label)
      ? cs.difficulty : meta.label);
    body.appendChild(clues);

    var actions = el("div", "ct-actions");
    var play = el("a", "btn primary small", "▶ Juga");
    play.href = "joc.html?case=" + encodeURIComponent(cs.id);
    actions.appendChild(play);
    var print = el("a", "btn ghost small", "🖨️ Plantilla");
    print.href = "plantilla.html";
    actions.appendChild(print);
    body.appendChild(actions);

    tile.appendChild(body);
    return tile;
  }

  function moreTile(meta) {
    var t = el("div", "case-tile more");
    t.appendChild(el("span", "plus", "＋"));
    t.appendChild(el("p", null, "Més casos d'aquest nivell, aviat"));
    var s = el("small", null, "Estem generant nous taulers…");
    t.appendChild(s);
    return t;
  }

  // ---------- Selector i llistat de nivells ----------
  function renderLevels(groups) {
    var nav = document.getElementById("level-nav");
    var list = document.getElementById("levels-list");
    if (!nav || !list) return;
    nav.innerHTML = "";
    list.innerHTML = "";

    if (!CASES.length) {
      list.appendChild(el("p", "notice", "Encara no hi ha cap cas carregat."));
      return;
    }

    function chip(label, count, meta) {
      var c = el("button", "level-chip");
      c.type = "button";
      c.appendChild(el("span", "dot"));
      c.appendChild(el("span", "lbl", label));
      c.appendChild(el("span", "n", String(count)));
      if (meta) c.setAttribute("data-level", meta.code);
      c.setAttribute("aria-pressed", "false");
      return c;
    }

    var allChip = chip("Tots els nivells", CASES.length, null);
    allChip.classList.add("all");
    allChip.setAttribute("aria-pressed", "true");
    nav.appendChild(allChip);

    groups.forEach(function (g) {
      var c = chip(g.meta.label, g.cases.length, g.meta);
      c.setAttribute("data-level", g.meta.code);
      nav.appendChild(c);
    });

    groups.forEach(function (g) {
      var block = el("section", "level-block reveal");
      block.id = "nivell-" + g.meta.code.replace(/^lvl-/, "");
      block.setAttribute("data-level", g.meta.code);

      var head = el("header", "lb-head");
      head.appendChild(el("h3", null, g.meta.label));
      var count = el("span", "lb-count",
        g.cases.length === 1 ? "1 cas" : g.cases.length + " casos");
      head.appendChild(count);
      if (g.meta.desc) head.appendChild(el("p", "lb-desc", g.meta.desc));
      block.appendChild(head);

      var grid = el("div", "cases-grid");
      g.cases.forEach(function (cs) { grid.appendChild(caseTile(cs, g.meta)); });
      grid.appendChild(moreTile(g.meta));
      block.appendChild(grid);

      list.appendChild(block);
    });

    // Filtratge
    var chips = nav.querySelectorAll(".level-chip");
    var blocks = list.querySelectorAll(".level-block");
    function apply(filterKey) {
      Array.prototype.forEach.call(chips, function (ch) {
        var isAll = !ch.hasAttribute("data-level");
        var on = filterKey === "tots" ? isAll : ch.getAttribute("data-level") === filterKey;
        ch.setAttribute("aria-pressed", on ? "true" : "false");
      });
      Array.prototype.forEach.call(blocks, function (bk) {
        var show = filterKey === "tots" || bk.getAttribute("data-level") === filterKey;
        if (show) bk.removeAttribute("hidden");
        else bk.setAttribute("hidden", "");
      });
      if (filterKey !== "tots") {
        var target = list.querySelector('[data-level="' + filterKey + '"]') ||
                     list.firstElementChild;
        if (target && target.scrollIntoView) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
    Array.prototype.forEach.call(chips, function (ch) {
      ch.addEventListener("click", function () {
        apply(ch.hasAttribute("data-level") ? ch.getAttribute("data-level") : "tots");
      });
    });
  }

  // ---------- Hero ----------
  function renderHero(groups) {
    if (CASES.length) {
      var first = CASES[0];
      var url = "joc.html?case=" + encodeURIComponent(first.id);
      var ctaHero = document.getElementById("cta-hero");
      var ctaTop = document.getElementById("cta-top");
      if (ctaHero) ctaHero.href = url;
      if (ctaTop) ctaTop.href = url;

      var min = CASES[0].grid.w, max = CASES[0].grid.w;
      var places = 0, cands = 0;
      CASES.forEach(function (cs) {
        min = Math.min(min, cs.grid.w); max = Math.max(max, cs.grid.w);
        places += cs.ils.filter(function (x) { return x.solution; }).length;
        cands += cs.ils.length;
      });
      var stats = document.getElementById("hero-stats");
      if (stats) {
        stats.innerHTML = "";
        stats.appendChild(strong(String(CASES.length)));
        stats.appendChild(document.createTextNode(" casos · "));
        stats.appendChild(strong(String(groups.length)));
        stats.appendChild(document.createTextNode(" nivells · taulers de " + min + "×" + min + " a " + max + "×" + max + " · " + cands + " candidates a col·locar"));
      }
    }
    function strong(t) { return el("b", null, t); }
  }

  // ---------- Mini tauler decoratiu ----------
  function renderMiniBoard() {
    var board = document.getElementById("mini-board");
    if (!board) return;
    var W = 5, H = 4, MATI = 2;

    var objs = [
      { r: 0, c: 3, img: "img/maquina_cafe.png" },
      { r: 1, c: 4, img: "img/prestatge.png" },
      { r: 2, c: 0, img: "img/rellotge.png" },
      { r: 2, c: 2, img: "img/cadira.png" },
      { r: 3, c: 2, img: "img/pissarra.png" },
      { r: 3, c: 4, img: "img/taula.png" }
    ];
    var tiles = [
      { r: 0, c: 0, i: "O" },
      { r: 1, c: 2, i: "C" },
      { r: 2, c: 4, i: "J", tarda: true },
      { r: 3, c: 1, i: "A", tarda: true }
    ];
    var marks = [{ r: 0, c: 1 }, { r: 3, c: 0 }];

    function cellAt(r, c) {
      return board.querySelector('.mini-cell[data-r="' + r + '"][data-c="' + c + '"]');
    }

    for (var r = 0; r < H; r++) {
      for (var c = 0; c < W; c++) {
        var cell = el("div", "mini-cell " + (r < MATI ? "zone-mati" : "zone-tarda"));
        cell.setAttribute("data-r", r);
        cell.setAttribute("data-c", c);
        board.appendChild(cell);
      }
    }

    objs.forEach(function (o) {
      var cell = cellAt(o.r, o.c);
      if (!cell) return;
      var im = el("img", "mini-obj");
      im.src = o.img;
      im.alt = "";
      im.draggable = false;
      cell.appendChild(im);
    });

    var k = 0;
    tiles.forEach(function (t) {
      var cell = cellAt(t.r, t.c);
      if (!cell) return;
      var s = el("span", "mini-il" + (t.tarda ? " tarda" : ""), t.i);
      s.style.animationDelay = (0.15 + 0.14 * (k++)) + "s";
      cell.appendChild(s);
    });

    marks.forEach(function (m) {
      var cell = cellAt(m.r, m.c);
      if (!cell) return;
      var x = el("span", "xmark auto pop", "✕");
      x.style.animationDelay = (0.7 + 0.2 * (k++)) + "s";
      cell.appendChild(x);
    });

    // centre (marc discontinu) sobre les files de matí, columnes 2-4
    var rect = el("div", "mini-centre");
    rect.style.left = (2 / W * 100) + "%";
    rect.style.top = "0";
    rect.style.width = (3 / W * 100) + "%";
    rect.style.height = (MATI / H * 100) + "%";
    var lab = el("span", "mini-centre-label", "Institut dels Aliments · cal 2");
    rect.appendChild(lab);
    board.appendChild(rect);
  }

  // ---------- Aparició en fer scroll ----------
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      Array.prototype.forEach.call(items, function (it) { it.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    Array.prototype.forEach.call(items, function (it) { io.observe(it); });
  }

  // ---------- Engegada ----------
  var groups = groupCases();
  renderHero(groups);
  renderLevels(groups);
  renderMiniBoard();
  setupReveal();
})();
