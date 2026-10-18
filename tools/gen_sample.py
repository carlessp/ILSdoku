#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ILSdoku — generador de cas de mostra validat.
Construeix un puzle 7x7 amb zones Matí/Tarda, centres amb demanda, objectes,
un conjunt de pistes en català i verifica que la solució sigui ÚNICA
(incloent qui es queda sense plaça).
"""
import itertools, random

N = 7
MATI_ROWS = range(0, 4)     # files 0-3 = Matí
TARDA_ROWS = range(4, 7)    # files 4-6 = Tarda

# --- Centres: nom, files, columnes, demanda, zona -------------------------
CENTRES = {
    "FEP": ("FEP Aprenents EE",                 set(MATI_ROWS),  set(range(0, 4)), 3, "matí"),
    "ALI": ("Institut dels Aliments",           set(MATI_ROWS),  set(range(4, 7)), 1, "matí"),
    "ESC": ("INS Escola del Treball",           set(TARDA_ROWS), set(range(0, 5)), 2, "tarda"),
    "LOG": ("Institut de Logística de Barcelona",set(TARDA_ROWS), set(range(5, 7)), 1, "tarda"),
}

def centre_of(r, c):
    for k, (_, rows, cols, dem, zone) in CENTRES.items():
        if r in rows and c in cols:
            return k
    return None

def zone_of(r):
    return "matí" if r in MATI_ROWS else "tarda"

# --- Objectes -------------------------------------------------------------
# (r,c) -> (nom, ocupable)
OBJECTS = {
    (0, 5): ("Ordinador", False),
    (1, 6): ("Prestatge", False),
    (2, 4): ("Taula", False),
    (3, 3): ("Pissarra", False),
    (4, 5): ("Taula", False),
    (5, 1): ("Pissarra", False),
    (6, 3): ("Cadira", True),
}

def blocked(r, c):
    o = OBJECTS.get((r, c))
    return o is not None and not o[1]

# --- ILS ------------------------------------------------------------------
# nom, torn
ILS = [
    ("Oscar", "matí"),
    ("María Nuria", "matí"),
    ("Carla", "matí"),
    ("Judit", "matí"),
    ("Aroha", "tarda"),
    ("Miriam", "tarda"),
    ("Irene", "tarda"),
    ("Tatiana", "tarda"),   # <- es quedarà sense plaça
]
NILS = len(ILS)

# Solució objectiu: ILS -> (r,c) o None
TARGET = {
    "Oscar": (0, 1),
    "María Nuria": (1, 3),
    "Carla": (2, 0),
    "Judit": (3, 5),
    "Aroha": (4, 2),
    "Miriam": (5, 4),
    "Irene": (6, 6),
    "Tatiana": None,
}

def torn_ok(i, r):
    return ILS[i][1] == zone_of(r)

# --- Comprovacions bàsiques de l'objectiu ---------------------------------
def check_target():
    cells = [cell for cell in TARGET.values() if cell is not None]
    rows = [x for x, y in cells]
    cols = [y for x, y in cells]
    assert sorted(rows) == list(range(N)), rows
    assert sorted(cols) == list(range(N)), cols
    for name, cell in TARGET.items():
        if cell is None:
            continue
        r, c = cell
        cen = centre_of(r, c)
        assert cen is not None and not blocked(r, c), (name, cell)
        assert ILS[[n for n, t in ILS].index(name)][1] == zone_of(r), name
    # demandes
    from collections import Counter
    cnt = Counter(centre_of(r, c) for r, c in cells)
    for k, (_, _, _, dem, _) in CENTRES.items():
        assert cnt[k] == dem, (k, cnt[k], dem)
    print("[ok] objectiu coherent")

# --- Claus / pistes -------------------------------------------------------
def row_name(r):
    if r == 0: return "la primera fila"
    if r == N - 1: return "l'última fila"
    return f"la fila {r+1}"

def col_name(c):
    if c == 0: return "la primera columna"
    if c == N - 1: return "l'última columna"
    return f"la columna {c+1}"

def centre_name(k):
    return CENTRES[k][0]

include_room = False   # si False, no es regala el centre de ningú (més interessant)
include_abs = False    # si False, no es regalen files/columnes absolutes

def gen_pool():
    """Genera totes les pistes CERTES per a la solució objectiu (tipus variats)."""
    pool = []
    name2idx = {n: i for i, (n, t) in enumerate(ILS)}
    placed = {n: cell for n, cell in TARGET.items() if cell is not None}
    for nm, (r, c) in placed.items():
        cen = centre_of(r, c)
        # centre
        if include_room:
            pool.append(("room", nm, cen, f"{nm} era a {centre_name(cen)}."))
        # fila / columna absolutes (només es faran servir si cal)
        if include_abs:
            pool.append(("absrow", nm, r, f"{nm} treballava a {row_name(r)}."))
            pool.append(("abscol", nm, c, f"{nm} treballava a {col_name(c)}."))
        # objecte a la casella (ocupable)
        if (r, c) in OBJECTS and OBJECTS[(r, c)][1]:
            obj = OBJECTS[(r, c)][0]
            pool.append(("on", nm, obj, f"{nm} seia en una {obj.lower()}."))
        # al costat d'objecte (adjacent, mateix centre)
        seen = set()
        for (ar, ac) in [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            if 0 <= ar < N and 0 <= ac < N and (ar, ac) in OBJECTS and centre_of(ar, ac) == cen:
                obj = OBJECTS[(ar, ac)][0]
                if obj in seen: continue
                seen.add(obj)
                art = "la" if obj in ("Pissarra", "Taula", "Cadira") else "el"
                pool.append(("beside", nm, obj, f"{nm} era al costat de {art} {obj.lower()}."))
        # era l'única del seu centre (si la demanda és 1)
        if CENTRES[cen][3] == 1:
            pool.append(("alone", nm, cen, f"{nm} era l'única ILS a {centre_name(cen)}."))
        # relacions binàries amb altres ILS
        for om, (orow, ocol) in placed.items():
            if om == nm: continue
            if orow < r:
                pool.append(("north", nm, om, f"{nm} treballava abans que {om}."))
            if orow > r:
                pool.append(("south", nm, om, f"{nm} treballava després que {om}."))
        # mateix centre
        for om, (orow, ocol) in placed.items():
            if om == nm: continue
            if centre_of(orow, ocol) == cen and CENTRES[cen][3] > 1:
                pool.append(("samecentre", nm, om, f"{nm} anava amb {om}."))
        # offsets exactes (>=1)
        for om, (orow, ocol) in placed.items():
            if om == nm: continue
            d = orow - r
            if abs(d) >= 1:
                dirw = "més avall" if d < 0 else "més amunt"
                pool.append(("rowoffset", nm, om, d, f"{nm} era exactament {abs(d)} files {dirw} que {om}."))
            dc = ocol - c
            if abs(dc) >= 1:
                dirw = "a la dreta" if dc < 0 else "a l'esquerra"
                pool.append(("coloffset", nm, om, dc, f"{nm} era exactament {abs(dc)} columnes {dirw} de {om}."))
    # pista per a la ILS sense plaça: només pot dir on NO era
    for nm, cell in TARGET.items():
        if cell is None:
            for k in CENTRES:
                pool.append(("notroom", nm, k, f"{nm} no era a {centre_name(k)}."))
    uniq = {}
    for p in pool:
        uniq[p[-1]] = p
    return list(uniq.values())

def clue_check(clue, sol):
    """sol: dict nom -> (r,c) o None"""
    t = clue[0]
    if t == "room":
        _, nm, cen, _ = clue
        cell = sol[nm]
        return cell is not None and centre_of(*cell) == cen
    if t == "notroom":
        _, nm, cen, _ = clue
        cell = sol[nm]
        return cell is None or centre_of(*cell) != cen
    if t == "absrow":
        _, nm, r, _ = clue
        cell = sol[nm]
        return cell is not None and cell[0] == r
    if t == "abscol":
        _, nm, c, _ = clue
        cell = sol[nm]
        return cell is not None and cell[1] == c
    if t == "on":
        _, nm, obj, _ = clue
        cell = sol[nm]
        return cell is not None and OBJECTS.get(cell, (None,))[0] == obj
    if t == "beside":
        _, nm, obj, _ = clue
        cell = sol[nm]
        if cell is None: return False
        r, c = cell; cen = centre_of(r, c)
        for (ar, ac) in [(r-1,c),(r+1,c),(r,c-1),(r,c+1)]:
            if 0 <= ar < N and 0 <= ac < N and (ar, ac) in OBJECTS and OBJECTS[(ar,ac)][0] == obj and centre_of(ar,ac) == cen:
                return True
        return False
    if t in ("north", "south"):
        _, nm, om, _ = clue
        a, b = sol[nm], sol[om]
        if a is None or b is None: return False
        return (a[0] < b[0]) if t == "north" else (a[0] > b[0])
    if t == "samecentre":
        _, nm, om, _ = clue
        a, b = sol[nm], sol[om]
        if a is None or b is None: return False
        return centre_of(*a) == centre_of(*b)
    if t == "alone":
        _, nm, cen, _ = clue
        a = sol[nm]
        if a is None: return False
        return centre_of(*a) == cen and sum(1 for n2 in sol if sol[n2] is not None and centre_of(*sol[n2]) == cen) == 1
    if t == "rowoffset":
        _, nm, om, d, _ = clue
        a, b = sol[nm], sol[om]
        if a is None or b is None: return False
        return (b[0] - a[0]) == d
    if t == "coloffset":
        _, nm, om, d, _ = clue
        a, b = sol[nm], sol[om]
        if a is None or b is None: return False
        return (b[1] - a[1]) == d
    raise ValueError(t)

# --- Solucionador (compta solucions, s'atura a cap) -----------------------
DEM = {k: CENTRES[k][3] for k in CENTRES}
NAMES = [n for n, t in ILS]
TORN = {n: t for n, t in ILS}

def count_solutions(clues, cap=40):
    sols = []
    # ordre de files
    rows = list(range(N))

    def rec(ri, used_cols, used_names, ccnt, assign):
        if len(sols) >= cap:
            return
        if ri == N:
            sol = dict(assign)
            for n in NAMES:
                sol.setdefault(n, None)
            if all(clue_check(cl, sol) for cl in clues):
                sols.append(sol)
            return
        r = rows[ri]
        for c in range(N):
            if c in used_cols: continue
            cen = centre_of(r, c)
            if cen is None or blocked(r, c): continue
            if ccnt.get(cen, 0) + 1 > DEM[cen]: continue
            for nm in NAMES:
                if nm in used_names: continue
                if TORN[nm] != zone_of(r): continue
                assign.append((nm, (r, c)))
                ccnt[cen] = ccnt.get(cen, 0) + 1
                rec(ri + 1, used_cols | {c}, used_names | {nm}, ccnt, assign)
                ccnt[cen] -= 1
                assign.pop()
                if len(sols) >= cap:
                    return
    rec(0, set(), set(), {}, [])
    return sols

# --- Greedy: tria pistes fins a unicitat ---------------------------------
def subject(clue):
    return clue[1]

STRENGTH = {"samecentre": 0, "north": 1, "south": 1, "rowoffset": 2, "coloffset": 2,
            "beside": 3, "on": 3, "alone": 4, "notroom": 5, "absrow": 6, "abscol": 6, "room": 7}

def greedy(target, cap=5000):
    pool = gen_pool()
    true = [p for p in pool if clue_check(p, target)]
    chosen = []
    clued_subjects = set()
    best_count = len(count_solutions(chosen, cap))
    print(f"solucions inicials (sense pistes): >= {best_count}  (pool={len(true)})")
    guard = 0
    while best_count > 1 and guard < 40:
        guard += 1
        cand = [p for p in true if p not in chosen]
        fresh = [p for p in cand if subject(p) not in clued_subjects]
        pool2 = fresh if fresh else cand
        best, best_n = None, None
        for p in pool2:
            n = len(count_solutions(chosen + [p], cap))
            if n == 0:
                continue
            key = (n, STRENGTH.get(p[0], 9))
            if best is None or key < (best_n, STRENGTH.get(best[0], 9)):
                best, best_n = p, n
        if best is None:
            break
        chosen.append(best)
        clued_subjects.add(subject(best))
        best_count = best_n
        print(f"  + {best[-1]:72s} -> {best_n}")
    return chosen, count_solutions(chosen, cap)

def clue_text(spec):
    """Construeix el text català d'una pista donada la seva especificació."""
    t = spec[0]
    if t == "room":
        return f"{spec[1]} era a {centre_name(spec[2])}."
    if t == "notroom":
        return f"{spec[1]} no era a {centre_name(spec[2])}."
    if t == "absrow":
        return f"{spec[1]} treballava a {row_name(spec[2])}."
    if t == "abscol":
        return f"{spec[1]} treballava a {col_name(spec[2])}."
    if t == "on":
        return f"{spec[1]} seia en una {spec[2].lower()}."
    if t == "beside":
        art = "la" if spec[2] in ("Pissarra", "Taula", "Cadira") else "el"
        return f"{spec[1]} era al costat de {art} {spec[2].lower()}."
    if t == "alone":
        return f"{spec[1]} era l'única ILS a {centre_name(spec[2])}."
    if t == "north":
        return f"{spec[1]} treballava abans que {spec[2]}."
    if t == "south":
        return f"{spec[1]} treballava després que {spec[2]}."
    if t == "samecentre":
        return f"{spec[1]} anava amb {spec[2]}."
    if t == "rowoffset":
        d = spec[3]
        dirw = "més avall" if d < 0 else "més amunt"
        return f"{spec[1]} era exactament {abs(d)} files {dirw} que {spec[2]}."
    if t == "coloffset":
        d = spec[3]
        dirw = "a la dreta" if d < 0 else "a l'esquerra"
        return f"{spec[1]} era exactament {abs(d)} columnes {dirw} de {spec[2]}."
    raise ValueError(t)

def make_clue(spec):
    base = list(spec)
    return tuple(base + [clue_text(spec)])

# Conjunt de pistes ja trobat pel cercador (7 pistes, una per ILS col·locada)
CHOSEN_SPECS = [
    ("samecentre", "Oscar", "María Nuria"),
    ("coloffset", "Carla", "Irene", 6),
    ("coloffset", "Aroha", "Miriam", 2),
    ("rowoffset", "Irene", "Oscar", -6),
    ("rowoffset", "María Nuria", "Judit", 2),
    ("coloffset", "Judit", "Oscar", -4),
    ("rowoffset", "Miriam", "Oscar", -5),
]

def main():
    check_target()
    target = {n: TARGET[n] for n in NAMES}
    chosen = [make_clue(s) for s in CHOSEN_SPECS]
    sols = count_solutions(chosen, cap=50)
    print("=== PISTES ===")
    for c in chosen:
        print("  -", c[-1])
    print(f"\nsolucions: {len(sols)}")
    assert len(sols) == 1, "no és única!"
    s = sols[0]
    grid = [["." for _ in range(N)] for _ in range(N)]
    initials = {}
    for n in NAMES:
        ini = n.split()[0][0] + (n.split()[1][0] if len(n.split()) > 1 else "")
        initials[n] = ini
    for n in NAMES:
        if s[n] is not None:
            r, c = s[n]
            grid[r][c] = initials[n]
    print("\n=== TAULER ===")
    print("    " + " ".join(f"C{c+1}" for c in range(N)))
    for r in range(N):
        zona = "M" if r in MATI_ROWS else "T"
        print(f"R{r+1} {zona} " + "  ".join(f"{grid[r][c]:2s}" for c in range(N)))
    print("\n=== SOLUCIÓ ===")
    for n in NAMES:
        print(f"  {n:14s} {s[n] if s[n] else 'SENSE PLAÇA'}")
    print("\n  Inicials:", ", ".join(f"{initials[n]}={n}" for n in NAMES))

if __name__ == "__main__":
    main()

