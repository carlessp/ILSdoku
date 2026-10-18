#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ILSdoku — generador de casos amb repertori de pistes ric.

Tipus de pista suportats (adaptats del Murdoku):
  room, notRoom, alone, withChar, genderPresent, genderAbsent,
  on, onNone, beside, notbeside, onlyon,
  inCorner, notCorner, cornerGrid,
  north, south, rowOffset, colOffset, absRow, absCol

PISTES NEGATIVES I LA ILS QUE QUEDA FORA
-----------------------------------------
Les pistes són totes certes. Una ILS que no ocupa cap cel·la (la «que es queda
sense plaça») només pot portar pistes *negatives* (notRoom, onNone, notbeside):
si no és enlloc, qualsevol afirmació negativa se li compleix de manera vàcua.

Perquè això no sigui un regal (una targeta buida o amb només negatives ja
delataria la resposta), el generador fa tres coses:

  1. Dóna una pista negativa a la ILS que queda fora (mai una targeta buida).
  2. Fa que aquesta pista sigui **DECISIVA**: sense ella el cas tindria més d'una
     solució, perquè una altra candidata (també amb només negatives) podria
     ocupar l'última plaça lliure. Amb ella, l'última plaça queda descartada per
     al qui queda fora.
  3. Com que hi ha **dues candidates amb pistes només negatives** (una col·locada
     i la que queda fora), el jugador no pot endevinar la resposta per la forma
     de la targeta: ha de raonar sobre l'última plaça.

Construeix un cas 7x7, tria un conjunt de pistes (preferint les "riques":
objectes, gènere, companyia, únic...) i verifica que la solució sigui ÚNICA.
"""

import itertools
import json
import os
import random
import sys
import time
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)

# tipus d'objecte (els «ocupables» deixen seure-hi una ILS; la resta bloquegen)
OCCUPIABLE = ("Cadira", "Catifa", "Estoreta", "Banc")
OBSTACLE = ("Ordinador", "Prestatge", "Taula", "Pissarra", "Lavabo",
            "Màquina de cafè", "Rellotge")

# paleta per als centres (si el cas no en fixa el color)
CENTRE_COLOURS = ["#d8ecfa", "#dcefdd", "#fbe2cf", "#ece0f6",
                  "#e6f0d8", "#fde8dc", "#e4eef6", "#f4e6f0"]

# ---------------------------------------------------------------- config ----
# Un «cas» es descriu amb aquesta estructura; setup() instal·la les globals que
# fan servir la resta de funcions (mida, centres, objectes, ILS i solució).
#
#   id, title, difficulty : metadades del cas
#   n                     : mida de la graella (n x n)
#   mati_rows             : files de la zona Matí (la resta són Tarda)
#   zones                 : [{id, name, rows:[r0,r1], color}] (per a l'app)
#   centres               : [{id, name, short, rows, cols, demand, color?}]
#   objects               : {(r,c): "Cadira", ...}
#   ils                   : [(nom, torn, sexe, inicial), ...]
#   out                   : nom de la ILS que es queda sense plaça
#   target                : {nom: (r,c) | None} o None (es busca automàticament)
#   allowed_types         : conjunt de tipus de pista permesos (None = tots)
#   hints                 : pistes humanes del cas (opcional; si no, s'generen)

CASE_FORAT = {
    "id": "el-forat-de-lhorari",
    "title": "El forat de l'horari",
    "difficulty": "fàcil",
    "n": 7,
    "mati_rows": [0, 1, 2, 3],
    "zones": [
        {"id": "mati", "name": "Matí", "rows": [0, 3], "color": "#eaf3fc"},
        {"id": "tarda", "name": "Tarda", "rows": [4, 6], "color": "#fdf2e4"},
    ],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2, 3], "cols": [0, 1, 2, 3], "demand": 3, "color": "#d8ecfa"},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [0, 1, 2, 3], "cols": [4, 5, 6], "demand": 1, "color": "#dcefdd"},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5, 6], "cols": [0, 1, 2, 3, 4], "demand": 2, "color": "#fbe2cf"},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5, 6], "cols": [5, 6], "demand": 1, "color": "#ece0f6"},
    ],
    "objects": {
        (0, 0): "Cadira", (0, 1): "Catifa", (0, 2): "Ordinador", (0, 5): "Taula", (0, 6): "Cadira",
        (1, 0): "Pissarra", (1, 3): "Estoreta", (1, 4): "Prestatge",
        (2, 0): "Banc", (2, 3): "Lavabo", (2, 6): "Prestatge",
        (3, 1): "Cadira", (3, 3): "Ordinador", (3, 5): "Cadira", (3, 6): "Màquina de cafè",
        (4, 0): "Pissarra", (4, 3): "Lavabo", (4, 5): "Taula",
        (5, 1): "Cadira", (5, 4): "Catifa", (5, 5): "Prestatge", (5, 6): "Rellotge",
        (6, 0): "Cadira", (6, 2): "Taula", (6, 4): "Pissarra", (6, 6): "Catifa",
    },
    "ils": [
        ("Oscar",       "matí",  "H", "O"),
        ("José Javier", "matí",  "H", "JJ"),
        ("Carla",       "matí",  "D", "C"),
        ("Judit",       "matí",  "D", "J"),
        ("Aroha",       "tarda", "D", "A"),
        ("Miriam",      "tarda", "D", "M"),
        ("Irene",       "tarda", "D", "I"),
        ("Laura M",     "matí",  "D", "LM"),
    ],
    "out": "Laura M",
    "target": {
        "Oscar": (0, 1), "José Javier": (1, 3), "Carla": (2, 0), "Judit": (3, 5),
        "Aroha": (4, 2), "Miriam": (5, 4), "Irene": (6, 6), "Laura M": None,
    },
}

# ---------------------------------------------------------------- setup -----
def setup(cfg):
    """Instal·la un cas a les globals del mòdul."""
    global N, MATI_ROWS, TARDA_ROWS, CENTRES, DEM, CASE_META, OBJ, SPAN
    global ILS, NILS, NAMES, GENDER, TORN, TARGET

    CASE_META = cfg
    N = cfg["n"]
    MATI_ROWS = list(cfg["mati_rows"])
    TARDA_ROWS = [r for r in range(N) if r not in MATI_ROWS]

    CENTRES, DEM = {}, {}
    for c in cfg["centres"]:
        zone = "matí" if set(c["rows"]) <= set(MATI_ROWS) else "tarda"
        CENTRES[c["id"]] = (c["name"], set(c["rows"]), set(c["cols"]), c["demand"], zone)
        DEM[c["id"]] = c["demand"]

    OBJ = {}
    for (r, c), name in cfg["objects"].items():
        OBJ[(r, c)] = (name, name in OCCUPIABLE)

    # Objectes de més d'una casella (p. ex. el banc, de 2×1): "object_spans"
    # marca la casella d'ancoratge (a dalt a l'esquerra) amb (amplada, alçada).
    # La resta de caselles de l'objecte són a "objects" amb el mateix nom, de
    # manera que object_at/blocked/check funcionen igual que amb un objecte d'1.
    SPAN = {}
    for k, v in (cfg.get("object_spans") or {}).items():
        r, c = (int(x) for x in k.split(","))
        w, h = int(v[0]), int(v[1])
        name = OBJ[(r, c)][0]
        for rr in range(r, r + h):
            for cc in range(c, c + w):
                assert OBJ.get((rr, cc), (None,))[0] == name, \
                    "span sense casella: %s a %d,%d" % (name, rr, cc)
        SPAN[(r, c)] = (w, h)

    ILS = list(cfg["ils"])
    NILS = len(ILS)
    NAMES = [x[0] for x in ILS]
    GENDER = {i: ILS[i][2] for i in range(NILS)}
    TORN = {i: ILS[i][1] for i in range(NILS)}

    if cfg.get("target"):
        tgt = cfg["target"]
        TARGET = {}
        for i, name in enumerate(NAMES):
            assert name in tgt, "falta la casella de " + name
            v = tgt[name]
            TARGET[i] = tuple(v) if v else None
    else:
        TARGET = None
    out_i = NAMES.index(cfg["out"])
    if TARGET is None:
        TARGET = find_target()
        assert TARGET is not None, "no s'ha trobat cap col·locació vàlida"
    assert TARGET[out_i] is None, cfg["out"] + " hauria de quedar-se sense plaça"

setup(CASE_FORAT)

def centre_of(r, c):
    for k, (_, rows, cols, dem, zone) in CENTRES.items():
        if r in rows and c in cols:
            return k
    return None

def zone_of(r):
    return "matí" if r in MATI_ROWS else "tarda"

def centre_bbox(cen):
    _, rows, cols, _, _ = CENTRES[cen]
    return (min(rows), min(cols), max(rows), max(cols))

def corners_of_centre(cen):
    r0, c0, r1, c1 = centre_bbox(cen)
    return {(r0, c0), (r0, c1), (r1, c0), (r1, c1)}

def object_at(r, c):
    return OBJ.get((r, c))

def blocked(r, c):
    o = OBJ.get((r, c))
    return o is not None and not o[1]

def cells_of_type(name):
    return [rc for rc, (n, occ) in OBJ.items() if n == name]

def span_of(r, c):
    """(amplada, alçada) de l'objecte ancorat a (r,c); (1,1) si és d'una casella."""
    return SPAN.get((r, c), (1, 1))

def is_span_cover(r, c):
    """True si (r,c) és una casella coberta per l'span d'un altre ancoratge."""
    for (rr, cc), (w, h) in SPAN.items():
        if (rr, cc) != (r, c) and rr <= r < rr + h and cc <= c < cc + w:
            return True
    return False

def object_units():
    """Agrupa OBJ per objectes sencers: {nom: [casella d'ancoratge, ...]}.

    Amb objectes de 2×1, cells_of_type() retorna una casella per plaça; aquí
    volem comptar objectes (una entrada per banc, no per casella)."""
    covered = set()
    units = {}
    for rc in sorted(OBJ):
        if rc in covered:
            continue
        w, h = span_of(*rc)
        for rr in range(rc[0], rc[0] + h):
            for cc in range(rc[1], rc[1] + w):
                covered.add((rr, cc))
        units.setdefault(OBJ[rc][0], []).append(rc)
    return units

def adj(r, c):
    for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < N and 0 <= nc < N:
            yield nr, nc

def same_area(a, b):
    ca, cb = centre_of(*a), centre_of(*b)
    return ca is not None and ca == cb

def find_target(seed=None):
    """Cerca una col·locació vàlida (una ILS per fila i columna, demandes,
    torn i caselles no bloquejades) deixant fora la ILS indicada a CASE_META."""
    rng = random.Random(CASE_META.get("seed", 0) if seed is None else seed)
    out_i = NAMES.index(CASE_META["out"])
    used_cols, used_ils, assign, ccnt = set(), set(), {}, {}

    def rec(r):
        if r == N:
            return dict(assign)
        opts = []
        for c in range(N):
            if c in used_cols:
                continue
            cen = centre_of(r, c)
            if cen is None or blocked(r, c):
                continue
            if ccnt.get(cen, 0) + 1 > DEM[cen]:
                continue
            for i in range(NILS):
                if i in used_ils or i == out_i:
                    continue
                if TORN[i] not in (zone_of(r), "flexible"):
                    continue
                opts.append((i, c, cen))
        rng.shuffle(opts)
        for i, c, cen in opts:
            assign[i] = (r, c)
            used_cols.add(c); used_ils.add(i); ccnt[cen] = ccnt.get(cen, 0) + 1
            got = rec(r + 1)
            if got is not None:
                return got
            ccnt[cen] -= 1; used_ils.discard(i); used_cols.discard(c)
            del assign[i]
        return None

    sol = rec(0)
    if sol is None:
        return None
    for i in range(NILS):
        sol.setdefault(i, None)
    return sol

def random_objects(case_meta, seed=None):
    """Col·loca objectes a l'atzar (alguns de singulars, que donen pistes fortes).

    Amb bench_2x1=True els bancs són objectes de 2×1: es col·loquen com una
    parella horitzontal de caselles dins d'un mateix centre i es desa l'span a
    case_meta["object_spans"]. Sense el flag, el comportament és exactament el
    de sempre (reprodueix fidelment els casos ja publicats)."""
    n = case_meta["n"]
    rng = random.Random(case_meta.get("seed", 0) if seed is None else seed + 7919)
    if not case_meta.get("bench_2x1"):
        objs = {}
        cells = [(r, c) for r in range(n) for c in range(n)]
        # objectes singulars: un de cada, garantits
        uniques = list(case_meta.get("unique_objects", ["Estoreta", "Banc", "Rellotge"]))
        placed_unique = []
        free = list(cells)
        for name in uniques:
            rng.shuffle(free)
            pick = None
            for (r, c) in free:
                if (r, c) in objs:
                    continue
                pick = (r, c)
                break
            if pick:
                objs[pick] = name
                placed_unique.append(name)
        # resta: ocupables i obstacles
        density = case_meta.get("object_density", 0.34)
        mix = case_meta.get("object_mix", 0.5)
        n_extra = int(len(cells) * density) - len(objs)
        for _ in range(max(0, n_extra)):
            rng.shuffle(free)
            pick = None
            for (r, c) in free:
                if (r, c) not in objs:
                    pick = (r, c)
                    break
            if pick is None:
                break
            name = rng.choice(OCCUPIABLE) if rng.random() < mix else rng.choice(OBSTACLE)
            objs[pick] = name
        return objs

    # --- camí amb objectes de més d'una casella (banc 2×1) ---
    objs, spans = {}, {}
    cells = [(r, c) for r in range(n) for c in range(n)]
    cmeta = case_meta["centres"]

    def centre_of_cfg(r, c):
        for cc in cmeta:
            if r in cc["rows"] and c in cc["cols"]:
                return cc["id"]
        return None

    def pair_free(r, c):
        if not (0 <= c + 1 < n) or (r, c) in objs or (r, c + 1) in objs:
            return False
        cid = centre_of_cfg(r, c)
        return cid is not None and cid == centre_of_cfg(r, c + 1)

    def put_pair(name):
        anchors = [(r, c) for r in range(n) for c in range(n - 1)]
        rng.shuffle(anchors)
        for (r, c) in anchors:
            if pair_free(r, c):
                objs[(r, c)] = name
                objs[(r, c + 1)] = name
                spans[(r, c)] = (2, 1)
                return True
        return False

    def put_one(name):
        free = [rc for rc in cells if rc not in objs]
        if not free:
            return False
        objs[rng.choice(free)] = name
        return True

    # objectes singulars: un de cada, garantits (el banc, com a parella 2×1)
    uniques = list(case_meta.get("unique_objects", ["Estoreta", "Banc", "Rellotge"]))
    for name in uniques:
        if name == "Banc":
            if not put_pair(name):
                put_one(name)
        else:
            put_one(name)

    # resta: ocupables i obstacles, fins a la densitat demanada
    density = case_meta.get("object_density", 0.34)
    mix = case_meta.get("object_mix", 0.5)
    n_extra = int(len(cells) * density) - len(objs)
    for _ in range(max(0, n_extra)):
        name = rng.choice(OCCUPIABLE) if rng.random() < mix else rng.choice(OBSTACLE)
        if name == "Banc":
            if put_pair(name):
                continue
            name = rng.choice([o for o in OCCUPIABLE if o != "Banc"])
        if not put_one(name):
            break

    case_meta["object_spans"] = {"%d,%d" % rc: v for rc, v in spans.items()}
    return objs


# ------------------------------------------------------- redacció (català) --
def row_name(r):
    if r == 0: return "la primera fila"
    if r == N - 1: return "l'última fila"
    return f"la fila {r+1}"

def col_name(c):
    if c == 0: return "la primera columna"
    if c == N - 1: return "l'última columna"
    return f"la columna {c+1}"

def centre_name(cen):
    return CENTRES[cen][0]

def centre_lloc(cen):
    n = centre_name(cen)
    if n[0] in "AEIOU":
        return "a l'" + n
    return "al " + n

def centre_de(cen):
    n = centre_name(cen)
    if n[0] in "AEIOU":
        return "de l'" + n
    return "del " + n

OBJ_PHRASE = {
    "Cadira":          {"de": "d'una cadira", "on": "seia en una cadira", "the": "una cadira",
                        "none": "no seia mai en cap cadira"},
    "Catifa":          {"de": "d'una catifa", "on": "era sobre una catifa", "the": "una catifa",
                        "none": "no era mai sobre cap catifa"},
    "Estoreta":        {"de": "d'una estoreta", "on": "era sobre una estoreta", "the": "una estoreta",
                        "none": "no era mai sobre cap estoreta"},
    "Banc":            {"de": "d'un banc", "on": "seia en un banc", "the": "un banc",
                        "none": "no seia mai en cap banc"},
    "Ordinador":       {"de": "d'un ordinador", "the": "un ordinador"},
    "Prestatge":       {"de": "del prestatge", "the": "el prestatge"},
    "Taula":           {"de": "de la taula", "the": "la taula"},
    "Pissarra":        {"de": "de la pissarra", "the": "una pissarra"},
    "Lavabo":          {"de": "del lavabo", "the": "el lavabo"},
    "Màquina de cafè": {"de": "de la màquina de cafè", "the": "la màquina de cafè"},
    "Rellotge":        {"de": "del rellotge", "the": "el rellotge"},
}

def nm(i): return NAMES[i]

def clue_text(cl):
    t = cl["type"]
    if t == "room":        return f"{nm(cl['i'])} era {centre_lloc(cl['cen'])}."
    if t == "notRoom":     return f"{nm(cl['i'])} no era enlloc {centre_de(cl['cen'])}."
    if t == "alone":       return f"{nm(cl['i'])} era l'única ILS de la seva sala."
    if t == "withChar":    return f"{nm(cl['i'])} anava amb {nm(cl['j'])}."
    if t == "genderPresent":
        art = "un home" if cl["g"] == "H" else "una dona"
        return f"Al centre de {nm(cl['i'])} hi havia {art}."
    if t == "genderAbsent":
        art = "cap home" if cl["g"] == "H" else "cap dona"
        return f"Al centre de {nm(cl['i'])} no hi havia {art}."
    if t == "on":
        return f"{nm(cl['i'])} {OBJ_PHRASE[cl['obj']]['on']}."
    if t == "onNone":
        return f"{nm(cl['i'])} {OBJ_PHRASE[cl['obj']]['none']}."
    if t == "beside":
        return f"{nm(cl['i'])} era al costat {OBJ_PHRASE[cl['obj']]['de']}."
    if t == "notbeside":
        return f"{nm(cl['i'])} no era al costat {OBJ_PHRASE[cl['obj']]['de']}."
    if t == "onlyon":
        return f"{nm(cl['i'])} era l'única ILS sobre {OBJ_PHRASE[cl['obj']]['the']}."
    if t == "inCorner":    return f"{nm(cl['i'])} era en una cantonada de la seva sala."
    if t == "notCorner":   return f"{nm(cl['i'])} no era en cap cantonada de la seva sala."
    if t == "cornerGrid":  return f"{nm(cl['i'])} era en una cantonada del tauler."
    if t == "north":       return f"{nm(cl['i'])} treballava abans que {nm(cl['j'])}."
    if t == "south":       return f"{nm(cl['i'])} treballava després que {nm(cl['j'])}."
    if t == "rowOffset":
        d = cl["d"]; dirw = "més avall" if d < 0 else "més amunt"
        n = abs(d)
        return f"{nm(cl['i'])} era exactament {n} {'fila' if n == 1 else 'files'} {dirw} que {nm(cl['j'])}."
    if t == "colOffset":
        d = cl["d"]; dirw = "a la dreta" if d < 0 else "a l'esquerra"
        n = abs(d)
        return f"{nm(cl['i'])} era exactament {n} {'columna' if n == 1 else 'columnes'} {dirw} de {nm(cl['j'])}."
    if t == "absRow":      return f"{nm(cl['i'])} treballava a {row_name(cl['r'])}."
    if t == "absCol":      return f"{nm(cl['i'])} treballava a {col_name(cl['c'])}."
    raise ValueError(t)

# ---------------------------------------------------------------- checker ---
def check(cl, sol):
    """sol: dict índex -> (r,c) o None (pot ser parcial)."""
    t = cl["type"]
    def cell(i): return sol.get(i)

    if t == "room":
        c = cell(cl["i"]); return c is not None and centre_of(*c) == cl["cen"]
    if t == "notRoom":
        c = cell(cl["i"]); return c is None or centre_of(*c) != cl["cen"]
    if t == "alone":
        c = cell(cl["i"])
        if c is None: return False
        cen = centre_of(*c)
        return sum(1 for j in range(NILS) if sol.get(j) is not None and centre_of(*sol[j]) == cen) == 1
    if t == "withChar":
        a, b = cell(cl["i"]), cell(cl["j"])
        return a is not None and b is not None and same_area(a, b)
    if t == "genderPresent":
        c = cell(cl["i"])
        if c is None: return False
        cen = centre_of(*c)
        return any(sol.get(j) is not None and centre_of(*sol[j]) == cen and GENDER[j] == cl["g"] for j in range(NILS))
    if t == "genderAbsent":
        c = cell(cl["i"])
        if c is None: return False
        cen = centre_of(*c)
        return not any(sol.get(j) is not None and centre_of(*sol[j]) == cen and GENDER[j] == cl["g"] for j in range(NILS))
    if t == "on":
        c = cell(cl["i"]); o = object_at(*c) if c else None
        return o is not None and o[0] == cl["obj"]
    if t == "onNone":
        c = cell(cl["i"])
        if c is None: return True          # no és enlloc: no és sobre res
        o = object_at(*c)
        return o is None or o[0] != cl["obj"]
    if t == "beside":
        c = cell(cl["i"])
        if c is None: return False
        return any(object_at(nr, nc) and object_at(nr, nc)[0] == cl["obj"] and same_area(c, (nr, nc)) for nr, nc in adj(*c))
    if t == "notbeside":
        c = cell(cl["i"])
        if c is None: return True          # no és enlloc: no és al costat de res
        return not any(object_at(nr, nc) and object_at(nr, nc)[0] == cl["obj"] and same_area(c, (nr, nc)) for nr, nc in adj(*c))
    if t == "onlyon":
        c = cell(cl["i"]); o = object_at(*c) if c else None
        if o is None or o[0] != cl["obj"]: return False
        cnt = sum(1 for j in range(NILS) if sol.get(j) is not None and object_at(*sol[j]) and object_at(*sol[j])[0] == cl["obj"])
        return cnt == 1
    if t == "inCorner":
        c = cell(cl["i"]); return c is not None and c in corners_of_centre(centre_of(*c))
    if t == "notCorner":
        c = cell(cl["i"]); return c is not None and c not in corners_of_centre(centre_of(*c))
    if t == "cornerGrid":
        c = cell(cl["i"]); return c is not None and c[0] in (0, N - 1) and c[1] in (0, N - 1)
    if t in ("north", "south"):
        a, b = cell(cl["i"]), cell(cl["j"])
        if a is None or b is None: return False
        return (a[0] < b[0]) if t == "north" else (a[0] > b[0])
    if t == "rowOffset":
        a, b = cell(cl["i"]), cell(cl["j"])
        if a is None or b is None: return False
        return (b[0] - a[0]) == cl["d"]
    if t == "colOffset":
        a, b = cell(cl["i"]), cell(cl["j"])
        if a is None or b is None: return False
        return (b[1] - a[1]) == cl["d"]
    if t == "absRow":
        c = cell(cl["i"]); return c is not None and c[0] == cl["r"]
    if t == "absCol":
        c = cell(cl["i"]); return c is not None and c[1] == cl["c"]
    raise ValueError(t)

UNARY_TYPES = {"room", "notRoom", "on", "onNone", "beside", "notbeside",
               "inCorner", "notCorner", "cornerGrid", "absRow", "absCol"}

# Pistes que són certes per a una ILS que NO ocupa cap cel·la (se li compleixen
# de manera vàcua). Són les úniques que pot portar qui es queda sense plaça.
VACUOUS_TYPES = {"notRoom", "onNone", "notbeside"}

# ---------------------------------------------------------------- pool ------
def gen_pool():
    pool = []
    tgt = {i: TARGET[i] for i in range(NILS)}

    def add(cl):
        if check(cl, tgt):
            pool.append(cl)

    for i in range(NILS):
        cell = TARGET[i]
        if cell is None:
            # la ILS que es queda sense plaça: només pistes negatives (vàcues)
            for cen in CENTRES:
                add({"type": "notRoom", "i": i, "cen": cen})
            for ot in OCCUPIABLE:
                add({"type": "onNone", "i": i, "obj": ot})
            for ot in ("Ordinador", "Lavabo", "Màquina de cafè", "Prestatge"):
                add({"type": "notbeside", "i": i, "obj": ot})
            continue
        r, c = cell
        cen = centre_of(r, c)
        # lloc
        add({"type": "room", "i": i, "cen": cen})
        # sol a la sala
        add({"type": "alone", "i": i})
        # companyia
        for j in range(NILS):
            if j != i and TARGET[j] is not None and same_area(cell, TARGET[j]):
                add({"type": "withChar", "i": i, "j": j})
        # gènere (no trivial: no té sentit «al meu centre hi havia [el meu sexe]»)
        for g in ("H", "D"):
            if g == GENDER[i]:
                add({"type": "genderAbsent", "i": i, "g": g})   # mai serà cert; el filtre el treu
            else:
                add({"type": "genderPresent", "i": i, "g": g})
                add({"type": "genderAbsent", "i": i, "g": g})
        # sobre objecte
        o = object_at(r, c)
        if o and o[1]:
            add({"type": "on", "i": i, "obj": o[0]})
            # onlyon si és l'únic sobre aquest objecte
            add({"type": "onlyon", "i": i, "obj": o[0]})
        for ot in OCCUPIABLE:
            if not (o and o[0] == ot):
                add({"type": "onNone", "i": i, "obj": ot})
        # al costat d'objectes
        adjtypes = set()
        for nr, nc in adj(r, c):
            oo = object_at(nr, nc)
            if oo and same_area(cell, (nr, nc)):
                adjtypes.add(oo[0])
        for ot in OBSTACLE + OCCUPIABLE:
            if ot in adjtypes:
                add({"type": "beside", "i": i, "obj": ot})
        for ot in ("Ordinador", "Lavabo", "Màquina de cafè", "Prestatge"):
            if ot not in adjtypes:
                add({"type": "notbeside", "i": i, "obj": ot})
        # cantonades
        add({"type": "inCorner", "i": i})
        add({"type": "notCorner", "i": i})
        add({"type": "cornerGrid", "i": i})
        # distàncies (reserva)
        for j in range(NILS):
            if j == i or TARGET[j] is None:
                continue
            rj, cj = TARGET[j]
            if rj < r: add({"type": "north", "i": i, "j": j})
            if rj > r: add({"type": "south", "i": i, "j": j})
            if rj != r: add({"type": "rowOffset", "i": i, "j": j, "d": rj - r})
            if cj != c: add({"type": "colOffset", "i": i, "j": j, "d": cj - c})
        add({"type": "absRow", "i": i, "r": r})
        add({"type": "absCol", "i": i, "c": c})

    # dedup per text
    uniq = {}
    for cl in pool:
        uniq[clue_text(cl)] = cl
    pool = list(uniq.values())
    allow = CASE_META.get("allowed_types")
    if allow:
        pool = [cl for cl in pool if cl["type"] in allow]
    return pool

# ---------------------------------------------------------------- solver ----
def count_solutions(clues, cap=4000):
    """Compta (fins a `cap`) les solucions del conjunt de pistes.

    Hi ha N+1 candidates i exactament N places, així que es proven una a una les
    N+1 possibilitats de qui es queda sense plaça. Qui queda fora no té casella:
    les seves pistes unàries només poden ser certes de manera vàcua, i això
    descarta de seguida gairebé totes les opcions. Per a cada opció que passa
    el filtre, es col·loquen les altres N ILS amb **MRV per ILS**: sempre es tria
    la ILS amb menys caselles disponibles i, com que totes s'han de col·locar,
    una ILS sense cap casella poda la branca. Això talla molt aviat les branques
    que, si no, fracassarien al final (la causa dels arbres enormes amb pistes
    que fixen una sola casella).

    Les pistes unàries es comproven en triar casella; les de relació, al final,
    sobre la solució sencera (la ILS sense casella hi compta com a `None`)."""
    assert NILS == N + 1, "el solucionador assumeix exactament una ILS sense plaça"
    unary = {i: [] for i in range(NILS)}
    rest = []
    for cl in clues:
        if cl["type"] in UNARY_TYPES:
            unary[cl["i"]].append(cl)
        else:
            rest.append(cl)

    # caselles permeses a cada ILS segons les seves pistes unàries
    cells_ok = []
    for i in range(NILS):
        ok = []
        for r in range(N):
            for c in range(N):
                cen = centre_of(r, c)
                if cen is None or blocked(r, c):
                    continue
                if TORN[i] not in (zone_of(r), "flexible"):
                    continue
                good = True
                for cl in unary[i]:
                    if not check(cl, {i: (r, c)}):
                        good = False
                        break
                if good:
                    ok.append((r, c, cen))
        cells_ok.append(ok)

    sols = []

    def available(i, used_rows, used_cols, ccnt):
        return [x for x in cells_ok[i]
                if x[0] not in used_rows and x[1] not in used_cols
                and ccnt.get(x[2], 0) < DEM[x[2]]]

    def rec(out_i, placed, used_rows, used_cols, ccnt, assign):
        if len(sols) >= cap:
            return
        if len(placed) == N:
            sol = dict(assign)
            for i in range(NILS):
                sol.setdefault(i, None)
            for cl in rest:
                if not check(cl, sol):
                    return
            sols.append(sol)
            return
        # MRV: la ILS amb menys caselles disponibles
        best_i, best_av = None, None
        for i in range(NILS):
            if i == out_i or i in placed:
                continue
            av = available(i, used_rows, used_cols, ccnt)
            if not av:
                return                  # totes s'han de col·locar: branca morta
            if best_av is None or len(av) < len(best_av):
                best_i, best_av = i, av
                if len(av) == 1:
                    break
        if best_i is None:
            return
        for (r, c, cen) in best_av:
            assign[best_i] = (r, c)
            placed.add(best_i); used_rows.add(r); used_cols.add(c)
            ccnt[cen] = ccnt.get(cen, 0) + 1
            rec(out_i, placed, used_rows, used_cols, ccnt, assign)
            ccnt[cen] -= 1
            used_cols.discard(c); used_rows.discard(r); placed.discard(best_i)
            del assign[best_i]
            if len(sols) >= cap:
                return

    for out_i in range(NILS):
        if any(not check(cl, {out_i: None}) for cl in unary[out_i]):
            continue                    # aquesta no pot ser la que queda fora
        rec(out_i, set(), set(), set(), {}, {})
        if len(sols) >= cap:
            break
    return sols


# ---------------------------------------------------------------- greedy ----
RICH = {"room", "notRoom", "alone", "withChar", "genderPresent", "genderAbsent",
        "on", "onNone", "beside", "notbeside", "onlyon",
        "inCorner", "notCorner", "cornerGrid"}
DIST = {"north", "south", "rowOffset", "colOffset", "absRow", "absCol"}

# límit de comptatge durant la cerca i quants candidats es compten de debò
FAST = 4000
TOPT = 12

def domain_size(cl):
    """Caselles factibles del subjecte de la pista (mètrica barata per ordenar).

    Si la pista pot ser vàcua (la ILS es queda fora), s'hi compta també l'opció
    «sense plaça»."""
    i = cl["i"]
    n = 1 if cl["type"] in VACUOUS_TYPES else 0
    for r in range(N):
        for c in range(N):
            if centre_of(r, c) is None or blocked(r, c):
                continue
            if TORN[i] not in (zone_of(r), "flexible"):
                continue
            if check(cl, {i: (r, c)}):
                n += 1
    return n

# preferència de tipus (menor = més «curt i maco»)
STRENGTH = {"onlyon": 0, "on": 1, "alone": 2, "withChar": 3,
            "genderPresent": 4, "genderAbsent": 4, "beside": 5,
            "cornerGrid": 6, "inCorner": 7, "notCorner": 8,
            "notbeside": 9, "onNone": 10, "room": 11, "notRoom": 12,
            "north": 13, "south": 13, "rowOffset": 14, "colOffset": 14,
            "absRow": 15, "absCol": 15}

def is_unique(clues):
    return len(count_solutions(clues, 2)) == 1

def target_is_unique_solution(clues, cap=2):
    """La solució del cas és única i és exactament la prevista (TARGET)."""
    sols = count_solutions(clues, cap)
    if len(sols) != 1:
        return False
    s = sols[0]
    return all(s[i] == TARGET[i] for i in range(NILS))

# preferència de redacció de les pistes negatives
PREF_OUT  = {"onNone": 0, "notRoom": 1, "notbeside": 2}
PREF_PAIR = {"onNone": 0, "notbeside": 1}

def reveal_text(o, co, p, S):
    """Frase que explica per què la ILS o es queda sense plaça."""
    cen = centre_of(*S)
    oo = object_at(*S)
    lloc = f"R{S[0]+1} C{S[1]+1}, {centre_lloc(cen)}"
    if oo and oo[1]:
        lloc += f", sobre {OBJ_PHRASE[oo[0]]['the']}"
    reason = clue_text(co)[len(nm(o)):].strip().rstrip(".").strip()
    return (f"L'última plaça lliure era {lloc}. "
            f"{nm(p)} hi podia seure, i {nm(o)} no, perquè {reason}. "
            f"Per això {nm(o)} es queda sense plaça.")

def complete_unique(base, free_i, pool, cap=2, deadline=None):
    """Afegeix les pistes necessàries perquè el conjunt quedi únic.

    `free_i` és la ILS que ha de poder quedar-se fora (no s'hi pot afegir cap
    pista que no sigui vàcua). Retorna la llista de pistes o None si no ho
    aconsegueix."""
    chosen = list(base)
    guard = 0
    cur = len(count_solutions(chosen, FAST))
    while cur > 1 and guard < 40:
        guard += 1
        cands = [cl for cl in pool if cl not in chosen and
                 (cl["i"] != free_i or cl["type"] in VACUOUS_TYPES)]
        if not cands:
            return None
        dom = {id(cl): domain_size(cl) for cl in cands}
        short = sorted(cands, key=lambda c: (dom[id(c)], STRENGTH.get(c["type"], 9)))[:TOPT]
        best, bestn, bestk = None, None, None
        for cl in short:
            n = len(count_solutions(chosen + [cl], FAST))
            if n == 0:
                continue
            k = (n, dom[id(cl)], STRENGTH.get(cl["type"], 9))
            if bestk is None or k < bestk:
                best, bestn, bestk = cl, n, k
            if deadline and time.time() > deadline:
                return None
        if best is None:
            return None
        chosen.append(best)
        cur = bestn
        if deadline and time.time() > deadline:
            return None
    if cur != 1 or not target_is_unique_solution(chosen, cap):
        return None
    return chosen

def make_leftover_decisive_legacy(chosen, pool, cap=2, deadline=None):
    """Versió original (la dels casos ja publicats): busca totes les parelles i
    tria la de millor preferència. Es conserva per no alterar aquests casos."""
    out_i = [i for i in range(NILS) if TARGET[i] is None][0]
    placed = [i for i in range(NILS) if TARGET[i] is not None]

    best = None
    for p in placed:
        if TORN[p] != TORN[out_i]:
            continue
        S = TARGET[p]
        cands_p = sorted([cl for cl in pool if cl["i"] == p
                          and cl["type"] in VACUOUS_TYPES and check(cl, {p: S})],
                         key=lambda cl: (PREF_PAIR.get(cl["type"], 9), clue_text(cl)))
        cands_o = sorted([cl for cl in pool if cl["i"] == out_i
                          and cl["type"] in VACUOUS_TYPES and not check(cl, {out_i: S})],
                         key=lambda cl: (PREF_OUT.get(cl["type"], 9), clue_text(cl)))
        for cp in cands_p:
            for co in cands_o:
                trial = [cl for cl in chosen if cl["i"] not in (p, out_i)] + [cp, co]
                if not target_is_unique_solution(trial, cap):
                    continue
                if len(count_solutions([cl for cl in trial if cl is not co], cap)) < 2:
                    continue                       # la pista no seria decisiva
                key = (PREF_OUT.get(co["type"], 9), PREF_PAIR.get(cp["type"], 9))
                if best is None or key < best[0]:
                    best = (key, trial, (out_i, p, cp, co, S))
                break
        if deadline and time.time() > deadline:
            break
    if best is None:
        return chosen, None
    _, trial, info = best
    return trial, info

def make_leftover_decisive_v2(chosen, pool, cap=2, deadline=None):
    """Versió per als taulers grans: a més, completa les pistes si cal.

    Busca una parella (p col·locada, pista cp) tal que:
      - cp sigui una pista negativa certa a la casella de p (si p quedés fora,
        les seves pistes es complirien de manera vàcua: podria ser la que sobra);
      - co sigui una pista negativa FALSA a la casella de p (si la ILS que sobra
        ocupés aquella plaça, la seva pista seria mentida).
    Sense co hi hauria (com a mínim) dues solucions —la parella intercanviada—;
    amb co, exactament una. La pista de qui queda fora passa a ser la que tanca
    el cas, i la seva targeta ja no es pot distingir per la forma.
    Si la resta de pistes no basta per a la unicitat, se n'hi afegeixen (mai
    sobre p si no són vàcues). Retorna (pistes, info) amb info = (out_i, cp,
    co, S), o (chosen, None) si no se n'ha trobat cap.
    """
    out_i = [i for i in range(NILS) if TARGET[i] is None][0]
    placed = [i for i in range(NILS) if TARGET[i] is not None]

    # primer les p que seu en un objecte ocupable: donen una co ben directa
    def prior(p):
        o = object_at(*TARGET[p])
        return 0 if (o and o[1]) else 1

    for p in sorted([i for i in placed if TORN[i] == TORN[out_i]], key=prior):
        S = TARGET[p]
        cands_p = sorted([cl for cl in pool if cl["i"] == p
                          and cl["type"] in VACUOUS_TYPES and check(cl, {p: S})],
                         key=lambda cl: (PREF_PAIR.get(cl["type"], 9), clue_text(cl)))[:3]
        cands_o = sorted([cl for cl in pool if cl["i"] == out_i
                          and cl["type"] in VACUOUS_TYPES and not check(cl, {out_i: S})],
                         key=lambda cl: (PREF_OUT.get(cl["type"], 9), clue_text(cl)))[:3]
        base = [cl for cl in chosen if cl["i"] not in (p, out_i)]
        for cp in cands_p:
            for co in cands_o:
                if deadline and time.time() > deadline:
                    return chosen, None
                trial = base + [cp, co]
                if not target_is_unique_solution(trial, cap):
                    trial = complete_unique(trial, p, pool, cap, deadline)
                    if trial is None:
                        continue
                if len(count_solutions([cl for cl in trial if cl is not co], cap)) < 2:
                    continue                       # la pista no seria decisiva
                return trial, (out_i, p, cp, co, S)
    return chosen, None

def make_leftover_decisive(chosen, pool, cap=2, deadline=None):
    """Despatxa a la versió que toca segons el cas."""
    if CASE_META.get("mode") == "extended":
        return make_leftover_decisive_v2(chosen, pool, cap, deadline)
    return make_leftover_decisive_legacy(chosen, pool, cap, deadline)

def minimize_clues(chosen, keep_types=frozenset(), protect=frozenset(), deadline=None):
    """Treu pistes supèrfules mantenint la unicitat.

    No deixa mai una ILS col·locada sense cap pista, no es queda sense cap tipus
    de `keep_types` i no toca les pistes el `id()` de les quals és a `protect`.
    És una passa de *qualitat*: si s'esgota el termini, torna el que tingui (que
    continua essent únic, perquè només s'hi han tret pistes supèrfules)."""
    chosen = list(chosen)
    changed = True
    while changed:
        changed = False
        for i in range(len(chosen)):
            if deadline and time.time() > deadline:
                return chosen
            cl = chosen[i]
            if id(cl) in protect:
                continue
            if TARGET[cl["i"]] is not None and \
               sum(1 for c in chosen if c["i"] == cl["i"]) <= 1:
                continue
            if cl["type"] in keep_types and \
               sum(1 for c in chosen if c["type"] in keep_types) <= 1:
                continue
            trial = chosen[:i] + chosen[i + 1:]
            t0 = time.time()
            u = is_unique(trial)
            dt = time.time() - t0
            if dt > 2.0:
                print("      (prova d'unicitat lenta: %.1fs)" % dt)
            if u:
                print(f"  - (supèrflua) {clue_text(cl)}")
                chosen = trial
                changed = True
                break
    return chosen

def build_final(cap=4000, deadline=None):
    """Fase 1: pistes riques; fase 2: distàncies. Força gènere + «al costat».
    Finalment minimitza (treu pistes supèrfules) mantenint la unicitat."""
    pool = gen_pool()
    NICE_OK = lambda cl: cl["type"] not in DIST
    chosen = []

    def step(ok, prefer_fresh=True):
        """Fase 1/2 de la cerca de pistes."""
        nonlocal chosen
        legacy = CASE_META.get("mode") != "extended"

        if legacy:
            # --- via original (files en ordre): manté idèntics els casos ja
            #     publicats; es queda curta quan el comptatge toca el llindar.
            cur = len(count_solutions(chosen, cap))
            used = {cl["i"] for cl in chosen}
            guard = 0
            while cur > 1 and guard < 40:
                guard += 1
                cands = [cl for cl in pool if cl not in chosen and ok(cl)]
                fresh = [cl for cl in cands if cl["i"] not in used]
                p = fresh if (prefer_fresh and fresh) else cands
                best, bestn = None, None
                for cl in p:
                    n = len(count_solutions(chosen + [cl], cap))
                    if n == 0:
                        continue
                    if bestn is None or n < bestn:
                        best, bestn = cl, n
                    if deadline and time.time() > deadline:
                        break
                if best is None or bestn >= cur:
                    break
                chosen.append(best); used.add(best["i"]); cur = bestn
                print(f"  + {clue_text(best):70s} -> {bestn}")
                if deadline and time.time() > deadline:
                    break
            return cur

        # --- via estesa (taulers grans): el domini del subjecte (barat) fa de
        #     filtre i només es compten les solucions dels TOPT candidats.
        cur = len(count_solutions(chosen, FAST))
        used = {cl["i"] for cl in chosen}
        guard = 0
        while cur > 1 and guard < 60:
            guard += 1
            cands = [cl for cl in pool if cl not in chosen and ok(cl)]
            if not cands:
                break
            fresh = [cl for cl in cands if cl["i"] not in used]
            p = fresh if (prefer_fresh and fresh) else cands
            dom = {id(cl): domain_size(cl) for cl in p}
            short = sorted(p, key=lambda c: (dom[id(c)], STRENGTH.get(c["type"], 9)))[:TOPT]
            best, bestn, bestk = None, None, None
            for cl in short:
                n = len(count_solutions(chosen + [cl], FAST))
                if n == 0:
                    continue
                k = (n, dom[id(cl)], STRENGTH.get(cl["type"], 9))
                if bestk is None or k < bestk:
                    best, bestn, bestk = cl, n, k
                if deadline and time.time() > deadline:
                    break
            if best is None:
                break
            chosen.append(best); used.add(best["i"]); cur = bestn
            print(f"  + {clue_text(best):70s} -> {bestn}")
            if deadline and time.time() > deadline:
                break
        return cur

    print("Fase 1: pistes «riques» (objectes, gènere, companyia, únic, cantonada)…")
    cur = step(NICE_OK)
    if cur > 1:
        print(f"Fase 2: distàncies (queden {cur})…")
        cur = step(lambda cl: True, prefer_fresh=False)

    # 1) treure tot el que és supèrflu
    chosen = minimize_clues(chosen, deadline=deadline)

    # 2) introduir gènere i «al costat» PER INTERCANVI (sense afegir farciment)
    for wants, label in ((("genderPresent", "genderAbsent"), "gènere"), (("beside",), "al costat")):
        if any(cl["type"] in wants for cl in chosen):
            continue
        swapped = False
        for idx in range(len(chosen)):
            cl = chosen[idx]
            alts = [c for c in pool if c["type"] in wants and c["i"] == cl["i"]]
            for alt in alts:
                trial = chosen[:idx] + [alt] + chosen[idx + 1:]
                if is_unique(trial):
                    print(f"  ~ [{label}] {clue_text(cl)}  →  {clue_text(alt)}")
                    chosen = trial
                    swapped = True
                    break
            if swapped:
                break
        if not swapped:                        # últim recurs: afegir
            cands = [c for c in pool if c["type"] in wants]
            if cands:
                cands.sort(key=lambda c: len(count_solutions(chosen + [c], cap)))
                chosen.append(cands[0])
                print(f"  + [{label}] {clue_text(chosen[-1])}")

    # 3) assegura una pista per cada ILS col·locada (riques sempre que es pugui)
    for i in range(NILS):
        if TARGET[i] is None or any(c["i"] == i for c in chosen):
            continue
        cands = [c for c in pool if c["i"] == i and c["type"] not in DIST]
        if not cands:
            cands = [c for c in pool if c["i"] == i]
        def shape(c):
            return tuple(sorted((k, v) for k, v in c.items() if k != "i"))
        shapes = {shape(c) for c in chosen}
        cands.sort(key=lambda c: (shape(c) in shapes,
                                  STRENGTH.get(c["type"], 9),
                                  len(count_solutions(chosen + [c], cap))))
        chosen.append(cands[0])
        print(f"  + per {NAMES[i]}: {clue_text(chosen[-1])}")

    # 4) minimitzar de nou, sense deixar caure del tot gènere i «al costat»
    chosen = minimize_clues(chosen, {"genderPresent", "genderAbsent", "beside"},
                            deadline=deadline)

    return chosen, count_solutions(chosen, cap)


# ---------------------------------------------------------------- render ----
def board_cell_ch(r, c, o):
    """Cel·la del tauler de text; els objectes de 2×1 es veuen com ╞o═ / ═o╡."""
    mark = "o" if o[1] else "x"
    if is_span_cover(r, c):
        return "═" + mark + "╡"
    if span_of(r, c) != (1, 1):
        return "╞" + mark + "═"
    return "[" + mark + "]"

def render_board(sol=None):
    lines = []
    header = "     " + "   ".join(f"C{c+1}" for c in range(N))
    lines.append(header)
    for r in range(N):
        z = "M" if r in MATI_ROWS else "T"
        row = [f"R{r+1} {z}"]
        for c in range(N):
            if sol and sol.get is not None:
                pass
            ch = " . "
            if sol:
                who = [i for i in range(NILS) if sol.get(i) == (r, c)]
                if who:
                    ch = f"{ILS[who[0]][3]:>3}"
                else:
                    o = object_at(r, c)
                    if o:
                        ch = board_cell_ch(r, c, o)
            else:
                o = object_at(r, c)
                if o:
                    ch = board_cell_ch(r, c, o)
            row.append(ch)
        lines.append("".join(row))
    return "\n".join(lines)

ICONS = {"Cadira": "🪑", "Catifa": "🟫", "Estoreta": "🟩", "Banc": "🛋️",
         "Ordinador": "💻", "Prestatge": "📚", "Taula": "🍽️", "Pissarra": "📝",
         "Lavabo": "🚻", "Màquina de cafè": "☕", "Rellotge": "🕐"}
IMG = {"Cadira": "img/cadira.png", "Catifa": "img/catifa.png",
       "Estoreta": "img/estoreta.png", "Banc": "img/banc.png",
       "Ordinador": "img/ordinador.png", "Prestatge": "img/prestatge.png",
       "Taula": "img/taula.png", "Pissarra": "img/pissarra.png",
       "Lavabo": "img/lavabo.png", "Màquina de cafè": "img/maquina_cafe.png",
       "Rellotge": "img/rellotge.png"}

# glossari de termes (objectes) amb imatge i descripció
GLOSS = [
    ("Cadira", True, "Seient de classe; una ILS s'hi pot asseure."),
    ("Catifa", True, "Catifa de terra de l'aula; també és ocupable."),
    ("Estoreta", True, "Estoreta per seure a terra (n'hi ha una de sola)."),
    ("Banc", True, "Banc del passadís (ocupa 2 caselles); n'hi ha un de sol."),
    ("Ordinador", False, "Ordinador de l'aula."),
    ("Pissarra", False, "Pissarra de classe."),
    ("Taula", False, "Taula de treball o de menjador."),
    ("Prestatge", False, "Prestatge de llibres."),
    ("Lavabo", False, "Lavabo del centre."),
    ("Màquina de cafè", False, "Màquina de cafè de la sala de professors."),
    ("Rellotge", False, "Rellotge de paret; n'hi ha un de sol."),
]

def slug(name):
    s = unicodedata.normalize("NFKD", name).encode("ascii", "ignore").decode("ascii")
    return s.lower().replace(" ", "").replace("'", "")

# ---------------------------------------------------------------- pistes ----
# Pistes de resolució (el botó 💡 de l'app): pas a pas, una ILS per passada.

_HINT_MAX_CONSULTES = 800  # sostre de consultes al solucionador (determinista:
                           # les pistes no depenen de la velocitat de la màquina)

# ordre de «força» per provar les pistes d'una targeta com a raó de la pista
_HINT_RANK = {"onlyon": 0, "on": 0, "inCorner": 1, "cornerGrid": 1,
              "absRow": 1, "absCol": 1, "beside": 2, "room": 2, "alone": 3,
              "notCorner": 4, "notRoom": 4, "onNone": 4, "notbeside": 4,
              "withChar": 5}


def _feasible(clues, i, r, c):
    """Hi ha alguna col·locació possible amb la ILS i a (r,c) i aquestes pistes.""" 
    extra = [{"type": "absRow", "i": i, "r": r}, {"type": "absCol", "i": i, "c": c}]
    return len(count_solutions(clues + extra, 1)) == 1


def _pins_to(clues, i, target):
    """True si, amb només aquest subconjunt de pistes, la ILS i només pot ser a `target`.

    Sortida ràpida: només cal comprovar que (a) la casella prevista és possible
    i (b) no n'hi ha cap altra (atura la cerca a la segona casella factible)."""
    if not _feasible(clues, i, target[0], target[1]):
        return False
    for r in range(N):
        for c in range(N):
            if (r, c) == target:
                continue
            if blocked(r, c) or centre_of(r, c) is None:
                continue
            if TORN[i] not in (zone_of(r), "flexible"):
                continue
            if _feasible(clues, i, r, c):
                return False
    return True


def _clue_label(cl):
    """Text de la pista sense el punt final (per incrustar-lo en una frase)."""
    t = clue_text(cl)
    return t[:-1] if t.endswith(".") else t


def _centre_short(cen_id):
    for c in CASE_META["centres"]:
        if c["id"] == cen_id:
            return c.get("short") or c["name"]
    return cen_id


def auto_hints(chosen, reveal=None):
    """Pistes de resolució, pas a pas, per si l'usuari s'encalla.

    Per cada ILS col·locada es generen dues pistes: primer el *raonament*
    (quina pista de la seva targeta ja la situa tota sola, o quines dues
    creuades) i després la *casella*. L'última pista resol la incògnita
    (qui es queda sense plaça). Tot es comprova amb el solucionador, així
    que les pistes són certes per construcció. El pressupost és un nombre de
    consultes (no temps de rellotge), de manera que la sortida és sempre la
    mateixa a qualsevol màquina."""
    steps = []
    consultes = [0]

    def marge():
        return consultes[0] < _HINT_MAX_CONSULTES

    def pins(clues, i, t):
        consultes[0] += 1
        return _pins_to(clues, i, t)

    for i in range(NILS):
        t = TARGET[i]
        if t is None:
            continue
        own = sorted([cl for cl in chosen if cl["i"] == i],
                     key=lambda cl: (_HINT_RANK.get(cl["type"], 9), clue_text(cl)))
        others = [cl for cl in chosen if cl["i"] != i]
        why, score = None, 3
        # (a) alguna pista de la targeta que, tota sola, ja la situa
        if marge():
            for cl in own[:2]:
                if pins([cl], i, t):
                    why = "la pista «%s» ja la situa tota sola" % _clue_label(cl)
                    score = 0
                    break
        # (b) amb la resta del tauler, quina pista (o parella) la fixa
        if why is None and marge():
            for cl in own:
                if pins(others + [cl], i, t):
                    why = ("fixa't sobretot en «%s»: amb la resta del tauler, "
                           "aquesta pista ja la fixa" % _clue_label(cl))
                    score = 1
                    break
        if why is None and marge():
            for a, b in itertools.combinations(own[:4], 2):
                if pins(others + [a, b], i, t):
                    why = ("fixa't en «%s» i «%s»: creuades amb la resta del "
                           "tauler, ja la fixen" % (_clue_label(a), _clue_label(b)))
                    score = 2
                    break
        if why is None:
            why = ("amb totes les pistes del cas a la vista, només li queda "
                   "una casella possible")
        steps.append({"i": i, "t": t, "why": why, "score": score})

    steps.sort(key=lambda s: (s["score"], s["t"]))
    hs = []
    for s in steps:
        name = NAMES[s["i"]]
        r, c = s["t"]
        cen = _centre_short(centre_of(r, c))
        hs.append("%s: %s. Mira el tauler i troba la seva casella!" % (name, s["why"]))
        hs.append("%s: és a la fila %d, columna %d (%s)." % (name, r + 1, c + 1, cen))
    if reveal:
        hs.append("Per acabar, la incògnita: " + reveal)
    return hs

def case_dict(chosen, reveal=None):
    """Construeix el diccionari del cas per a l'app (a partir del cas instal·lat)."""
    meta = CASE_META
    case = {
        "id": meta["id"],
        "title": meta["title"],
        "difficulty": meta["difficulty"],
        "grid": {"w": N, "h": N},
        "zones": [
            {"id": "mati", "name": "Matí",
             "rows": [min(MATI_ROWS), max(MATI_ROWS)], "color": "#eaf3fc"},
            {"id": "tarda", "name": "Tarda",
             "rows": [min(TARDA_ROWS), max(TARDA_ROWS)], "color": "#fdf2e4"},
        ],
        "centres": [],
    }
    for k, cc in enumerate(meta["centres"]):
        r0, c0, r1, c1 = centre_bbox(cc["id"])
        zone = "mati" if set(cc["rows"]) <= set(MATI_ROWS) else "tarda"
        case["centres"].append({
            "id": cc["id"], "name": cc["name"], "short": cc["short"],
            "demand": cc["demand"], "zone": zone, "rect": [r0, c0, r1, c1],
            "color": cc.get("color") or CENTRE_COLOURS[k % len(CENTRE_COLOURS)],
        })
    objs = []
    covered = set()
    for (r, c), (name, occ) in sorted(OBJ.items()):
        if (r, c) in covered:
            continue
        w, h = span_of(r, c)
        for rr in range(r, r + h):
            for cc in range(c, c + w):
                covered.add((rr, cc))
        o = {"r": r, "c": c, "name": name, "icon": ICONS.get(name, "❓"),
             "img": IMG.get(name), "occupiable": occ}
        if (w, h) != (1, 1):
            o["w"], o["h"] = w, h
        objs.append(o)
    case["objects"] = objs
    case["glossary"] = [
        {"name": n, "icon": ICONS.get(n, "❓"), "img": IMG.get(n),
         "occupiable": occ, "desc": desc}
        for n, occ, desc in GLOSS
    ]

    by_ils = {i: [] for i in range(NILS)}
    for cl in chosen:
        by_ils[cl["i"]].append(clue_text(cl))
    ils = []
    for i in range(NILS):
        name, torn, sex, ini = ILS[i]
        sol = TARGET[i]
        ils.append({
            "id": slug(name),
            "name": name,
            "torn": torn,
            "initial": ini,
            "clue": " ".join(by_ils[i]) if by_ils[i] else None,
            "solution": list(sol) if sol else None,
        })
    case["ils"] = ils
    if reveal:
        case["reveal"] = reveal
    case["hints"] = meta.get("hints") or auto_hints(chosen, reveal)
    return case

def write_cases(cases, path):
    with open(path, "w", encoding="utf-8") as f:
        f.write("window.ILSDOKU_CASES = ")
        f.write(json.dumps(cases, ensure_ascii=False, indent=2))
        f.write(";\n")

def write_atoms(chosen, reveal, path):
    """Escriu l'acta del cas: prou informació per reconstruir-lo i verificar-lo."""
    atoms = {
        "id": CASE_META["id"],
        "title": CASE_META["title"],
        "difficulty": CASE_META["difficulty"],
        "n": N,
        "mati_rows": MATI_ROWS,
        "mode": CASE_META.get("mode"),
        "allowed_types": (sorted(CASE_META["allowed_types"])
                          if CASE_META.get("allowed_types") else None),
        "centres": [{"id": c["id"], "name": c["name"], "short": c["short"],
                     "rows": c["rows"], "cols": c["cols"], "demand": c["demand"]}
                    for c in CASE_META["centres"]],
        "ils": [{"name": x[0], "torn": x[1], "gender": x[2], "initial": x[3]}
                for x in ILS],
        "out": CASE_META["out"],
        "objects": {"%d,%d" % rc: nm for rc, (nm, occ) in sorted(OBJ.items())},
        "target": {NAMES[i]: (list(TARGET[i]) if TARGET[i] else None)
                   for i in range(NILS)},
        "clues": chosen,
        "reveal": reveal,
    }
    if SPAN:
        atoms["object_spans"] = {"%d,%d" % rc: list(sp)
                                 for rc, sp in sorted(SPAN.items())}
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(atoms, f, ensure_ascii=False, indent=1)
    return atoms

def cfg_from_atoms(atoms):
    """Reconstrueix la configuració d'un cas a partir de la seva acta."""
    objs = {}
    for k, v in atoms["objects"].items():
        r, c = k.split(",")
        objs[(int(r), int(c))] = v
    cfg = {
        "id": atoms["id"], "title": atoms["title"],
        "difficulty": atoms["difficulty"], "n": atoms["n"],
        "mati_rows": atoms["mati_rows"], "mode": atoms.get("mode"),
        "centres": atoms["centres"], "objects": objs,
        "ils": [(x["name"], x["torn"], x["gender"], x["initial"])
                for x in atoms["ils"]],
        "out": atoms["out"], "target": atoms["target"],
    }
    if atoms.get("allowed_types"):
        cfg["allowed_types"] = set(atoms["allowed_types"])
    if atoms.get("object_spans"):
        cfg["object_spans"] = {k: tuple(v) for k, v in atoms["object_spans"].items()}
    return cfg

# ---------------------------------------------------------------- main ------
def main():
    tgt = {i: TARGET[i] for i in range(NILS)}
    print("=== TAULER (o = ocupable, x = obstacle) ===")
    print(render_board(None))
    print("\n=== Greedy + diversificació ===")
    t0 = time.time()
    chosen, sols = build_final(cap=4000, deadline=t0 + 1500)
    print(f"\nTemps: {time.time()-t0:.1f}s")

    print("\n=== Fase 3: pista DECISIVA per a qui es queda sense plaça ===")
    out_i = [i for i in range(NILS) if TARGET[i] is None][0]
    chosen, info = make_leftover_decisive(chosen, gen_pool(), cap=2, deadline=t0 + 1500)
    reveal = None
    if info:
        out_i, p, cp, co, S = info
        print(f"  parella: {NAMES[p]} (amb plaça) i {NAMES[out_i]} (sense plaça)")
        print(f"  + {clue_text(cp)}")
        print(f"  + {clue_text(co)}   <-- decisiva")
        reveal = reveal_text(out_i, co, p, S)
        print(f"  REVELACIÓ: {reveal}")
    else:
        print("  [avís: no s'ha trobat cap pista decisiva]")
        pool = gen_pool()
        for cl in pool:
            if cl["i"] == out_i and cl["type"] in VACUOUS_TYPES and \
               target_is_unique_solution(chosen + [cl], 2):
                chosen = chosen + [cl]
                print(f"  (pista de consol) + {clue_text(cl)}")
                break

    print("\n=== PISTES TRIADES ===")
    for cl in sorted(chosen, key=lambda c: c["i"]):
        print("  -", clue_text(cl))
    sols = count_solutions(chosen, 4000)
    print(f"\nsolucions: {len(sols)}")
    if len(sols) == 1 and target_is_unique_solution(chosen, 4000):
        s = sols[0]
        print("\n=== SOLUCIÓ ÚNICA ===")
        print(render_board(s))
        for i in range(NILS):
            print(f"  {NAMES[i]:14s} {s[i] if s[i] else 'SENSE PLAÇA'}")
        case = case_dict(chosen, reveal)
        write_cases([case], os.path.join(ROOT, "app", "data.js"))
        write_atoms(chosen, reveal, os.path.join(HERE, "atoms", case["id"] + ".json"))
        print("\n[app/data.js actualitzat + tools/atoms/%s.json]" % case["id"])
    else:
        print("\n[AVÍS: no és única (o no és la prevista); NO s'ha sobreescrit data.js]")

if __name__ == "__main__":
    main()
