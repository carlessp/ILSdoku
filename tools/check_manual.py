#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Comprova un conjunt manual de pistes contra el cas de gen_case.py."""
import gen_case as G

CAND = [
    {"type": "on", "i": 0, "obj": "Catifa"},            # Oscar
    {"type": "on", "i": 1, "obj": "Estoreta"},          # José Javier
    {"type": "genderPresent", "i": 2, "g": "H"},        # Carla (al seu centre hi havia un home)
    {"type": "alone", "i": 3},                          # Judit
    {"type": "genderAbsent", "i": 4, "g": "H"},         # Aroha (cap home al seu centre)
    {"type": "beside", "i": 5, "obj": "Pissarra"},      # Miriam
    {"type": "cornerGrid", "i": 6},                     # Irene
]

tgt = {i: G.TARGET[i] for i in range(G.NILS)}
print("--- Verificació que totes són certes per a l'objectiu ---")
for cl in CAND:
    ok = G.check(cl, tgt)
    print(f"  [{'OK ' if ok else 'NO '}] {G.clue_text(cl)}")

sols = G.count_solutions(CAND, cap=50)
print(f"\nsolucions amb aquest conjunt: {len(sols)}")
if len(sols) == 1:
    print("ÚNICA ✅")
else:
    for s in sols[:5]:
        print("  ", {G.NAMES[i]: s[i] for i in range(G.NILS)})
