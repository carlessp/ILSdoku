#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Genera ref/ILSdoku-Casos.md a partir de les actes de tools/atoms/*.json.

    python3 make_cases_doc.py          # ~/ILSdoku/ref/ILSdoku-Casos.md
"""
import glob
import json
import os
import sys

import gen_case as G

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, "ref", "ILSdoku-Casos.md")


def case_md(atoms):
    g = G.cfg_from_atoms(atoms)
    G.setup(g)
    sol = {G.NAMES[i]: G.TARGET[i] for i in range(G.NILS)}
    ini = {G.NAMES[i]: G.ILS[i][3] for i in range(G.NILS)}
    who = {v: k for k, v in sol.items() if v}

    out = []
    out.append("## %s — «%s»\n" % (atoms["id"], atoms["title"]))
    out.append("- **Dificultat:** %s · **graella:** %d×%d · **%d pistes**"
               % (atoms["difficulty"], atoms["n"], atoms["n"], len(atoms["clues"])))
    out.append("- **Candidates:** %d (%d places)"
               % (G.NILS, G.NILS - 1))
    out.append("- **Qui queda sense plaça:** **%s**" % atoms["out"])
    out.append("")

    # centres
    out.append("### Centres\n")
    out.append("| Centre | Zona | Fila | Columnes | Demanda |")
    out.append("|---|---|---|---|---|")
    for c in g["centres"]:
        zona = "Matí" if set(c["rows"]) <= set(g["mati_rows"]) else "Tarda"
        out.append("| %s | %s | %d–%d | %d–%d | %d |"
                   % (c["name"], zona, c["rows"][0] + 1, c["rows"][-1] + 1,
                      c["cols"][0] + 1, c["cols"][-1] + 1, c["demand"]))
    out.append("")

    # pistes
    out.append("### Pistes\n")
    per = {}
    for cl in atoms["clues"]:
        per.setdefault(cl["i"], []).append(cl)
    ordre = sorted(per, key=lambda i: (G.TORN[i] != "matí", G.NAMES[i]))
    for i in ordre:
        txt = " ".join(G.clue_text(cl) for cl in per[i])
        out.append("- **%s** (%s): %s" % (G.NAMES[i], G.TORN[i], txt))
    for i in range(G.NILS):
        if i not in per:
            out.append("- **%s** (%s): *(sense pista)*" % (G.NAMES[i], G.TORN[i]))
    out.append("")

    # solució
    out.append("### Solució\n")
    out.append("Tauler complet; en **negreta**, la ILS de cada casella "
               "(les altres caselles mostren l'objecte, si n'hi ha).\n")
    header = "| |" + "|".join("C%d" % (c + 1) for c in range(G.N)) + "|"
    out.append(header)
    out.append("|---|" + "---|" * G.N)
    for r in range(G.N):
        fila = ["**R%d**" % (r + 1)]
        for c in range(G.N):
            if (r, c) in who:
                fila.append("**%s**" % ini[who[(r, c)]])
            else:
                o = G.object_at(r, c)
                fila.append(o[0] if o else "")
        out.append("|" + "|".join(fila) + "|")
    out.append("")
    out.append("| ILS | Inicial | Torn | Casella |")
    out.append("|---|---|---|---|")
    for i in range(G.NILS):
        s = G.TARGET[i]
        out.append("| %s | %s | %s | %s |"
                   % (G.NAMES[i], G.ILS[i][3], G.TORN[i],
                      ("R%d C%d" % (s[0] + 1, s[1] + 1)) if s else "**sense plaça**"))
    out.append("")
    out.append("> **Revelació:** %s" % atoms.get("reveal"))
    out.append("")
    return "\n".join(out)


def main():
    paths = sorted(glob.glob(os.path.join(HERE, "atoms", "*.json")))
    if not paths:
        print("cap acta a tools/atoms/")
        return 1
    casos = [json.load(open(p, encoding="utf-8")) for p in paths]
    ordre = ["molt fàcil", "fàcil", "mitjà", "difícil", "expert"]
    casos.sort(key=lambda a: (ordre.index(a["difficulty"]), a["n"], a["id"]))

    doc = []
    doc.append("# ILSdoku — Col·lecció de casos")
    doc.append("")
    doc.append("> Document **generat** amb `tools/make_cases_doc.py` a partir de les")
    doc.append("> actes de `tools/atoms/`. No editeu aquest fitxer a mà.")
    doc.append("")
    doc.append("Tots els casos compleixen les regles del disseny (vegeu")
    doc.append("`ILSdoku-Disseny.md` §5, §5.1 i §11): una ILS per fila i columna, la")
    doc.append("demanda de cada centre com a regla dura, torns en zones i **una sola**")
    doc.append("candidata sense plaça (la Laura M), amb una pista **decisiva** que tanca")
    doc.append("el cas. La verificació automàtica és a `tools/test_solvable.py`.")
    doc.append("")
    doc.append("| Cas | Dificultat | Graella | Places | Centres | Pistes |")
    doc.append("|---|---|---|---|---|---|")
    for a in casos:
        doc.append("| %s | %s | %d×%d | %d | %d | %d |"
                   % (a["title"], a["difficulty"], a["n"], a["n"],
                      a["n"], len(a["centres"]), len(a["clues"])))
    doc.append("")
    doc.append("---")
    doc.append("")
    for a in casos:
        doc.append(case_md(a))
        doc.append("---")
        doc.append("")
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(doc).rstrip() + "\n")
    print("[%s: %d casos]" % (os.path.relpath(OUT, ROOT), len(casos)))
    return 0


if __name__ == "__main__":
    sys.exit(main())
