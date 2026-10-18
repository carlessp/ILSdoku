#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Verificació de tots els casos d'ILSdoku.

    python3 test_solvable.py                 # tots els casos de tools/atoms/
    python3 test_solvable.py doble-torn      # només els indicats

Cada acta (tools/atoms/<id>.json) conté prou informació per reconstruir el cas
(vegeu gen_case.cfg_from_atoms). Per a cada cas es comprova:

  1. Unicitat: el cas té exactament una solució i és la prevista.
  2. Deducció directa: cada ILS col·locada només té 1 casella factible i la que
     es queda sense plaça no en té cap (no cal endevinar mai).
  3. Disseny de la incògnita (opció 1b):
     - la ILS que es queda fora TÉ pista (mai una targeta buida);
     - com a mínim DUES candidates tenen pistes només negatives, perquè la forma
       de la targeta no delati la resposta;
     - la pista de qui queda fora és DECISIVA: sense ella hi hauria més d'una
       solució (una altra candidata podria ocupar l'última plaça lliure).
"""
import glob
import json
import os
import sys
import time

import gen_case as G

HERE = os.path.dirname(os.path.abspath(__file__))
DEADLINE_GLOBAL = time.time() + 3600


def load(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def feasible(clues, i, r, c):
    """Hi ha alguna solució amb la ILS i a (r,c)?"""
    extra = [{"type": "absRow", "i": i, "r": r}, {"type": "absCol", "i": i, "c": c}]
    return len(G.count_solutions(clues + extra, cap=1)) == 1


def candidates(clues, i):
    out = []
    for r in range(G.N):
        for c in range(G.N):
            if G.blocked(r, c) or G.centre_of(r, c) is None:
                continue
            if G.TORN[i] not in (G.zone_of(r), "flexible"):
                continue
            if time.time() > DEADLINE_GLOBAL:
                raise RuntimeError("deadline global")
            if feasible(clues, i, r, c):
                out.append((r, c))
    return out


def check_case(atoms):
    """Comprova un cas. Retorna (ok, informe)."""
    lines = []
    g = G.cfg_from_atoms(atoms)
    G.setup(g)
    clues = atoms["clues"]
    ok = True

    n = len(G.count_solutions(clues, 4000))
    uniq = G.target_is_unique_solution(clues, 4000)
    lines.append("  1. unicitat: %d solució(ns)  %s"
                 % (n, "OK" if uniq else "!!! no és única o no és la prevista"))
    ok = ok and uniq

    bad = []
    for i in range(G.NILS):
        cands = candidates(clues, i)
        vol = 1 if G.TARGET[i] is not None else 0
        if len(cands) != vol:
            bad.append("%s (%d caselles factibles, se n'esperaven %d)"
                       % (G.NAMES[i], len(cands), vol))
    lines.append("  2. deducció directa: %s"
                 % ("OK (1 casella per ILS, 0 per a qui queda fora)"
                    if not bad else "!!! " + "; ".join(bad)))
    ok = ok and not bad

    out_i = [i for i in range(G.NILS) if G.TARGET[i] is None][0]
    per_ils = {i: [c for c in clues if c["i"] == i] for i in range(G.NILS)}
    only_neg = [i for i in range(G.NILS) if per_ils[i] and
                all(c["type"] in G.VACUOUS_TYPES for c in per_ils[i])]
    lines.append("  3a. només negatives: %s" % ([G.NAMES[i] for i in only_neg]))
    if len(only_neg) < 2:
        ok = False
        lines.append("      !!! calen 2 o més: si només n'hi ha una, la targeta la delata")
    if not per_ils[out_i]:
        ok = False
        lines.append("      !!! %s no té cap pista (targeta buida = regal)" % G.NAMES[out_i])
    else:
        lines.append("      pista de %s: %s" % (G.NAMES[out_i],
                     " ".join(G.clue_text(c) for c in per_ils[out_i])))
        sense = [c for c in clues if c["i"] != out_i]
        n_sense = len(G.count_solutions(sense, 3))
        decisiva = n_sense > 1
        lines.append("      sense la seva pista, %d solucions  %s"
                     % (n_sense, "OK (és decisiva)" if decisiva else "!!! no decideix res"))
        ok = ok and decisiva

    lines.append("  %d pistes · dificultat: %s" % (len(clues), atoms["difficulty"]))
    lines.append("  revelació: %s" % atoms.get("reveal"))
    return ok, lines


def main():
    only = [a for a in sys.argv[1:] if not a.startswith("-")]
    paths = sorted(glob.glob(os.path.join(HERE, "atoms", "*.json")))
    if only:
        paths = [p for p in paths if os.path.basename(p)[:-5] in only]
    if not paths:
        print("cap acta a tools/atoms/ (executa gen_collection.py primer)")
        return 1

    tot = True
    for path in paths:
        atoms = load(path)
        print("=== %s — «%s» (%s, %d×%d) ==="
              % (atoms["id"], atoms["title"], atoms["difficulty"],
                 atoms["n"], atoms["n"]))
        ok, lines = check_case(atoms)
        print("\n".join(lines))
        print("  RESULTAT: %s\n" % ("correcte" if ok else "AMB PROBLEMES"))
        tot = tot and ok
    print("Tots els casos correctes:", tot)
    return 0 if tot else 1


if __name__ == "__main__":
    raise SystemExit(main())
