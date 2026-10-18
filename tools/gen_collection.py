#!/usr/bin/env python3
"""Genera tota la col·lecció de casos d'ILSdoku.

    python3 gen_collection.py                # tots els casos → app/data.js
    python3 gen_collection.py doble-torn     # només els casos indicats

Per cada cas: munta el tauler, busca les pistes (greedy + minimitzar), hi afegeix
la pista negativa decisiva de qui es queda sense plaça i verifica que la solució
sigui única. Escriu app/data.js i tools/atoms/<id>.json.

Variables d'entorn:
    ILS_CAP   segons màxim per cas (per defecte 300)
    ILS_TRIES intents per cas amb llavors diferents (per defecte 6)
"""

import json
import os
import sys
import time

import gen_case as G
from cases import CASES

CAP_SECONDS = float(os.environ.get("ILS_CAP", "300"))
TRIES = int(os.environ.get("ILS_TRIES", "6"))

DIFF_ORDER = ["molt fàcil", "fàcil", "mitjà", "difícil", "expert"]


def merge_cases(new_cases):
    """Fusiona els casos nous amb els ja publicats a app/data.js (per id).

    Així una generació parcial no fa desaparèixer la resta de la col·lecció:
    només substitueix els casos que s'han tornat a generar. Si no es pot llegir
    el data.js actual, es comporta com una escriptura normal."""
    path = os.path.join(G.ROOT, "app", "data.js")
    try:
        with open(path, encoding="utf-8") as f:
            txt = f.read()
        old = json.loads(txt.split("window.ILSDOKU_CASES = ", 1)[1].rstrip().rstrip(";"))
    except (OSError, IndexError, ValueError):
        old = []
    by_id = {c["id"]: c for c in old}
    for c in new_cases:
        by_id[c["id"]] = c

    def key(c):
        d = c.get("difficulty")
        return (DIFF_ORDER.index(d) if d in DIFF_ORDER else len(DIFF_ORDER),
                c["grid"]["w"], c["id"])

    return sorted(by_id.values(), key=key)


def build(cfg):
    """Genera un cas: retorna (pistes, revelació) o (None, None)."""
    for t in range(TRIES):
        c = dict(cfg)
        c["seed"] = cfg.get("seed", 0) + t * 101
        if not c.get("objects"):
            c["objects"] = G.random_objects(c)
        try:
            G.setup(c)
        except AssertionError as e:
            print("  [seu %d] sense col·locació possible (%s)" % (t, e))
            continue

        t0 = time.time()
        deadline = t0 + CAP_SECONDS
        chosen, sols = G.build_final(cap=4000, deadline=deadline)
        if len(sols) != 1 or not G.target_is_unique_solution(chosen, 4000):
            print("  [seu %d] la solució no és única, es torna a provar" % t)
            continue

        chosen, info = G.make_leftover_decisive(chosen, G.gen_pool(), cap=2,
                                                deadline=deadline)
        if not info:
            print("  [seu %d] no s'ha trobat cap pista decisiva" % t)
            continue

        out_i, p, cp, co, S = info
        print("  parella decisiva: %s (amb plaça) i %s (sense plaça)"
              % (G.NAMES[p], G.NAMES[out_i]))
        print("  + %s" % G.clue_text(cp))
        print("  + %s   <-- decisiva" % G.clue_text(co))

        # neteja final: treu pistes supèrfules però no toca la decisiva
        abans = len(chosen)
        chosen = G.minimize_clues(chosen, protect={id(co)}, deadline=deadline)
        if len(chosen) < abans:
            print("  (neteja final: %d -> %d pistes)" % (abans, len(chosen)))
        if not G.target_is_unique_solution(chosen, 4000):
            print("  [seu amb problema] la neteja ha trencat la unicitat")
            continue
        return chosen, G.reveal_text(out_i, co, p, S)
    return None, None


def main():
    only = [a for a in sys.argv[1:] if not a.startswith("-")]
    cases, failed = [], []
    for cfg in CASES:
        if only and cfg["id"] not in only:
            continue
        print("\n=== %s — «%s» (%s, %d×%d) ==="
              % (cfg["id"], cfg["title"], cfg["difficulty"], cfg["n"], cfg["n"]))
        t0 = time.time()
        chosen, reveal = build(cfg)
        if not chosen:
            failed.append(cfg["id"])
            print("!! no s'ha pogut generar el cas %s" % cfg["id"])
            continue
        case = G.case_dict(chosen, reveal)
        G.write_atoms(chosen, reveal, os.path.join(G.HERE, "atoms", cfg["id"] + ".json"))
        cases.append(case)
        # escrivim de seguida: si la generació s'interromp, data.js ja queda útil
        # (fusionant amb la resta de casos publicats: res no desapareix)
        G.write_cases(merge_cases(cases), os.path.join(G.ROOT, "app", "data.js"))
        print("  %d pistes en %.0f s" % (len(chosen), time.time() - t0))
        print("  REVELACIÓ: %s" % reveal)

    if only:
        print("\n[app/data.js actualitzat amb el cas parcial (%s); la resta es conserva]"
              % ", ".join(c["id"] for c in cases))
    else:
        print("\n[app/data.js: %d casos]" % len(cases))
    if failed:
        print("[casos no generats: %s]" % ", ".join(failed))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
