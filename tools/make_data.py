#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Reconstrueix app/data.js a partir de les actes de tools/atoms/*.json.

    python3 make_data.py

És l'alternativa ràpida a gen_collection.py (que torna a *generar* els casos):
aquí només es tornen a muntar les dades de l'app des de les actes ja validades.
Serveix per reordenar la col·lecció, retocar una acta a mà o refer data.js sense
esperar el generador. L'ordre de presentació és per dificultat, mida i id.
"""
import glob
import json
import os
import sys

import gen_case as G

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
DIFF_ORDER = ["molt fàcil", "fàcil", "mitjà", "difícil", "expert"]


def load_atoms():
    paths = sorted(glob.glob(os.path.join(HERE, "atoms", "*.json")))
    atoms = [json.load(open(p, encoding="utf-8")) for p in paths]
    atoms.sort(key=lambda a: (DIFF_ORDER.index(a["difficulty"]), a["n"], a["id"]))
    return atoms


def main():
    atoms = load_atoms()
    if not atoms:
        print("cap acta a tools/atoms/ (executa gen_collection.py primer)")
        return 1
    built = []
    for a in atoms:
        G.setup(G.cfg_from_atoms(a))
        built.append((a, G.case_dict(a["clues"], a.get("reveal"))))
    G.write_cases([c for _, c in built], os.path.join(ROOT, "app", "data.js"))
    print("[app/data.js: %d casos]" % len(built))
    for a, c in built:
        print("  - %-22s %-11s %d×%d  %d pistes"
              % (c["id"], c["difficulty"], c["grid"]["w"], c["grid"]["h"],
                 len(a["clues"])))
    return 0


if __name__ == "__main__":
    sys.exit(main())
