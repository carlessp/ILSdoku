"""Definicions dels casos d'ILSdoku.

Cada cas és un diccionari que setup() de gen_case.py instal·la (vegeu-hi el
format complet). Els casos nous només fixen la mida, els centres, el planter
d'ILS i una llavor; els objectes i la col·locació-solució es generen de manera
determinista a partir de la llavor (random_objects / find_target).

Regles que es compleixen sempre:
  - una ILS per fila i per columna;
  - la demanda de cada centre és una regla dura;
  - files de Matí i de Tarda, amb una ILS de cada torn a la seva zona;
  - exactament una candidata es queda sense plaça (sempre la Laura M).

Planter (dades facilitades): 14 ILS de matí, 5 de tarda i 2 flexibles.
"""

from gen_case import CASE_FORAT

# ------------------------------------------------------------- planter ------
# nom: (inicial, sexe)  H = home, D = dona
MATI = {
    "Oscar":       ("O", "H"),
    "María Nuria": ("MN", "D"),
    "José Javier": ("JJ", "H"),
    "Carla":       ("C", "D"),
    "Marc":        ("Mc", "H"),
    "Joan":        ("Jn", "H"),
    "Sara":        ("S", "D"),
    "Tamara":      ("Tm", "D"),
    "Ruth":        ("R", "D"),
    "Helena":      ("H", "D"),
    "Jennifer":    ("Je", "D"),
    "Judit":       ("J", "D"),
    "Eva":         ("E", "D"),
    "Laura M":     ("LM", "D"),
}
TARDA = {
    "Aroha":   ("A", "D"),
    "Miriam":  ("M", "D"),
    "Tatiana": ("T", "D"),
    "Irene":   ("I", "D"),
    "Laura G": ("LG", "D"),
}
FLEX = {
    "Alba":   ("Al", "D"),
    "Ingrid": ("In", "D"),
}

def ils(*names):
    """Converteix una llista de noms en el format d'ILS del generador."""
    out = []
    for n in names:
        if n in MATI:
            out.append((n, "matí", MATI[n][1], MATI[n][0]))
        elif n in TARDA:
            out.append((n, "tarda", TARDA[n][1], TARDA[n][0]))
        elif n in FLEX:
            out.append((n, "flexible", FLEX[n][1], FLEX[n][0]))
        else:
            raise KeyError("ILS desconeguda: " + n)
    return out


# ------------------------------------------------------------- casos --------
# 1) 5x5 — molt fàcil: només pistes de lloc, objecte i «al costat»
CASE_PRIMER_DIA = {
    "id": "el-primer-dia",
    "title": "El primer dia",
    "difficulty": "molt fàcil",
    "n": 5,
    "mati_rows": [0, 1, 2],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2], "cols": [0, 1, 2], "demand": 2},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2], "cols": [3, 4], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [3, 4], "cols": [0, 1, 2], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [3, 4], "cols": [3, 4], "demand": 1},
    ],
    "ils": ils("Oscar", "Carla", "Judit", "Aroha", "Miriam", "Laura M"),
    "out": "Laura M",
    "seed": 11,
    "object_density": 0.40,
    "object_mix": 0.6,
    "target": None,
    "allowed_types": {"room", "notRoom", "on", "onNone",
                      "beside", "notbeside", "onlyon"},
}

# 2) 6x6 — fàcil: hi entren el sol a la sala, la companyia i les cantonades
CASE_PATI = {
    "id": "lhora-del-pati",
    "title": "L'hora del pati",
    "difficulty": "fàcil",
    "n": 6,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2, 3], "cols": [0, 1, 2], "demand": 2},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [0, 1, 2, 3], "cols": [3, 4, 5], "demand": 2},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5], "cols": [0, 1, 2], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5], "cols": [3, 4, 5], "demand": 1},
    ],
    "ils": ils("Oscar", "José Javier", "Carla", "Judit", "Aroha", "Miriam", "Laura M"),
    "out": "Laura M",
    "seed": 23,
    "object_density": 0.36,
    "object_mix": 0.55,
    "mode": "extended",
    "target": None,
    "allowed_types": {"room", "notRoom", "alone", "withChar", "on", "onNone",
                      "beside", "notbeside", "onlyon",
                      "inCorner", "notCorner", "cornerGrid"},
}

# 2b) 5x5 — molt fàcil: benvinguda al centre, amb bancs de 2×1
CASE_BENVINGUDA = {
    "id": "la-benvinguda",
    "title": "La benvinguda",
    "difficulty": "molt fàcil",
    "n": 5,
    "mati_rows": [0, 1, 2],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2], "cols": [0, 1, 2], "demand": 2},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2], "cols": [3, 4], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [3, 4], "cols": [0, 1, 2], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [3, 4], "cols": [3, 4], "demand": 1},
    ],
    "ils": ils("Oscar", "Judit", "María Nuria", "Aroha", "Tatiana", "Laura M"),
    "out": "Laura M",
    "seed": 91,
    "bench_2x1": True,
    "object_density": 0.40,
    "object_mix": 0.6,
    "target": None,
    "allowed_types": {"room", "notRoom", "on", "onNone",
                      "beside", "notbeside", "onlyon"},
}

# 2c) 6x6 — fàcil: hora d'estudi, amb bancs de 2×1
CASE_ESTUDI = {
    "id": "lhora-destudi",
    "title": "L'hora d'estudi",
    "difficulty": "fàcil",
    "n": 6,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2, 3], "cols": [0, 1], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [0, 1, 2, 3], "cols": [2, 3, 4], "demand": 2},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2, 3], "cols": [5], "demand": 1},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5], "cols": [0, 1, 2], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5], "cols": [3, 4, 5], "demand": 1},
    ],
    "ils": ils("Oscar", "José Javier", "Marc", "Judit", "Aroha", "Tatiana", "Laura M"),
    "out": "Laura M",
    "seed": 83,
    "bench_2x1": True,
    "object_density": 0.36,
    "object_mix": 0.55,
    "mode": "extended",
    "target": None,
    "allowed_types": {"room", "notRoom", "alone", "withChar", "on", "onNone",
                      "beside", "notbeside", "onlyon",
                      "inCorner", "notCorner", "cornerGrid"},
}

# 3) 8x8 — mitjà: més torns, més centres i tot el repertori de pistes
CASE_DOBLE_TORN = {
    "id": "doble-torn",
    "title": "Doble torn",
    "difficulty": "mitjà",
    "n": 8,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1], "cols": [0, 1, 2], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [2, 3], "cols": [0, 1, 2], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [0, 1, 2, 3], "cols": [3, 4, 5], "demand": 2},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5, 6, 7], "cols": [0, 1, 2], "demand": 1},
        {"id": "fpv", "name": "Institut d'FP Sanitària Vall d'Hebron", "short": "FP Vall d'Hebron",
         "rows": [4, 5, 6, 7], "cols": [3, 4, 5], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5, 6, 7], "cols": [6, 7], "demand": 2},
    ],
    "ils": ils("Oscar", "José Javier", "Carla", "Judit",
               "Aroha", "Miriam", "Irene", "Laura G", "Laura M"),
    "out": "Laura M",
    "seed": 37,
    "object_density": 0.34,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": None,
}

# 4) 9x9 — difícil: dues files centrals compartides i moltes candidates
CASE_GRAN = {
    "id": "tot-el-curs",
    "title": "Tot el curs",
    "difficulty": "difícil",
    "n": 9,
    "mati_rows": [0, 1, 2, 3, 4],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2], "cols": [0, 1, 2, 3], "demand": 2},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2], "cols": [4, 5, 6, 7, 8], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [3, 4], "cols": [0, 1, 2, 3, 4, 5, 6, 7, 8], "demand": 2},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [5, 6, 7, 8], "cols": [0, 1, 2, 3], "demand": 2},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [5, 6, 7, 8], "cols": [4, 5], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [5, 6, 7, 8], "cols": [6, 7, 8], "demand": 1},
    ],
    "ils": ils("Oscar", "José Javier", "Carla", "Judit", "Marc",
               "Aroha", "Miriam", "Irene", "Laura G", "Laura M"),
    "out": "Laura M",
    "seed": 53,
    "object_density": 0.32,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": {  # només pistes unàries: al 9×9 són les que poden podar
        "room", "notRoom", "on", "onNone", "beside", "notbeside",
        "inCorner", "notCorner", "cornerGrid"},
}

# 4b) 9x9 — difícil: quatre files de matí i cinc de tarda, amb corredor central
CASE_SETMANA = {
    "id": "setmana-cultural",
    "title": "La setmana cultural",
    "difficulty": "difícil",
    "n": 9,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [2, 3], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2, 3], "cols": [4, 5, 6, 7, 8], "demand": 2},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5], "cols": [0, 1, 2, 3, 4], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [6, 7], "cols": [0, 1, 2, 3, 4], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5, 6, 7, 8], "cols": [5, 6, 7, 8], "demand": 3},
    ],
    "ils": ils("Oscar", "Carla", "Joan", "Judit",
               "Aroha", "Miriam", "Tatiana", "Irene", "Laura G", "Laura M"),
    "out": "Laura M",
    "seed": 151,
    "object_density": 0.32,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": {  # només pistes unàries: al 9×9 són les que poden podar
        "room", "notRoom", "on", "onNone", "beside", "notbeside",
        "inCorner", "notCorner", "cornerGrid"},
}

# 5) 7x7 — mitjà: passadissos amb bancs de 2×1
CASE_CANVI = {
    "id": "canvi-de-classe",
    "title": "Canvi de classe",
    "difficulty": "mitjà",
    "n": 7,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1], "cols": [0, 1, 2, 3], "demand": 2},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [2, 3], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [0, 1, 2, 3], "cols": [4, 5, 6], "demand": 1},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5, 6], "cols": [0, 1, 2, 3, 4], "demand": 2},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5, 6], "cols": [5, 6], "demand": 1},
    ],
    "ils": ils("Oscar", "José Javier", "Carla", "Judit",
               "Aroha", "Miriam", "Irene", "Laura M"),
    "out": "Laura M",
    "seed": 61,
    "bench_2x1": True,
    "object_density": 0.34,
    "object_mix": 0.55,
    "mode": "extended",
    "target": None,
    "allowed_types": None,
}

# 6) 7x7 — mitjà: portes obertes; tres sales de matí i dues de tarda
CASE_PORTES = {
    "id": "portes-obertes",
    "title": "Portes obertes",
    "difficulty": "mitjà",
    "n": 7,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [2, 3], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2, 3], "cols": [4, 5, 6], "demand": 2},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5, 6], "cols": [0, 1, 2, 3], "demand": 2},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5, 6], "cols": [4, 5, 6], "demand": 1},
    ],
    "ils": ils("Oscar", "Carla", "Marc", "Judit",
               "Aroha", "Miriam", "Tatiana", "Laura M"),
    "out": "Laura M",
    "seed": 103,
    "object_density": 0.34,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": None,
}

# 7) 8x8 — mitjà: la sala de professors, amb bancs de 2×1
CASE_SALA = {
    "id": "la-sala-de-professors",
    "title": "La sala de professors",
    "difficulty": "mitjà",
    "n": 8,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1], "cols": [0, 1, 2], "demand": 1},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [2, 3], "cols": [0, 1, 2], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [0, 1, 2, 3], "cols": [3, 4, 5], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [0, 1, 2, 3], "cols": [6, 7], "demand": 1},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "fpv", "name": "Institut d'FP Sanitària Vall d'Hebron", "short": "FP Vall d'Hebron",
         "rows": [4, 5], "cols": [4, 5, 6, 7], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [6, 7], "cols": [0, 1, 2, 3, 4, 5, 6, 7], "demand": 2},
    ],
    "ils": ils("Oscar", "José Javier", "Carla", "Judit",
               "Aroha", "Miriam", "Irene", "Laura G", "Laura M"),
    "out": "Laura M",
    "seed": 71,
    "bench_2x1": True,
    "object_density": 0.33,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": {"room", "notRoom", "alone", "withChar", "on", "onNone",
                      "beside", "notbeside", "onlyon",
                      "inCorner", "notCorner", "cornerGrid"},
}

# ordre de presentació (de més fàcil a més difícil)
# 9) 10x10 — expert: cinc files de matí i cinc de tarda, amb columna compartida
CASE_HORARIS = {
    "id": "horaris-setembre",
    "title": "Els horaris de setembre",
    "difficulty": "expert",
    "n": 10,
    "mati_rows": [0, 1, 2, 3, 4],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2], "cols": [0, 1, 2, 3], "demand": 2},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2], "cols": [4, 5, 6, 7, 8, 9], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [3, 4], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "fpv", "name": "Institut d'FP Sanitària Vall d'Hebron", "short": "FP Vall d'Hebron",
         "rows": [3, 4], "cols": [4, 5, 6, 7, 8, 9], "demand": 1},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [5, 6], "cols": [0, 1, 2, 3, 4], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [7, 8, 9], "cols": [0, 1, 2, 3, 4], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [5, 6, 7, 8, 9], "cols": [5, 6, 7, 8, 9], "demand": 3},
    ],
    "ils": ils("María Nuria", "Sara", "Joan", "Ruth", "Helena",
               "Aroha", "Miriam", "Tatiana", "Irene", "Laura G", "Laura M"),
    "out": "Laura M",
    "seed": 239,
    "object_density": 0.30,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": {  # només pistes unàries: al tauler gran són les que poden podar
        "room", "notRoom", "on", "onNone", "beside", "notbeside",
        "inCorner", "notCorner", "cornerGrid"},
}

# 8) 8x8 — mitjà: dues sales grans a la dreta i un passadís de columnes compartit
CASE_CONSELL = {
    "id": "consell-escolar",
    "title": "El consell escolar",
    "difficulty": "mitjà",
    "n": 8,
    "mati_rows": [0, 1, 2, 3],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1], "cols": [0, 1, 2], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [2, 3], "cols": [0, 1, 2], "demand": 1},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2, 3], "cols": [3, 4, 5, 6, 7], "demand": 2},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [4, 5], "cols": [0, 1, 2, 3, 4], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [6, 7], "cols": [0, 1, 2, 3, 4], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [4, 5, 6, 7], "cols": [5, 6, 7], "demand": 2},
    ],
    "ils": ils("José Javier", "Marc", "Sara", "Helena",
               "Aroha", "Tatiana", "Irene", "Laura G", "Laura M"),
    "out": "Laura M",
    "seed": 313,
    "bench_2x1": True,
    "object_density": 0.34,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": {  # pistes que poden podar: és el que fa viable l'8×8
        "room", "notRoom", "on", "onNone", "beside", "notbeside",
        "inCorner", "notCorner", "cornerGrid"},
}

# 9b) 9x9 — difícil: una sala ampla a baix de tot i quatre sales petites a dalt
CASE_AVALUACIO = {
    "id": "avaluacio-final",
    "title": "L'avaluació final",
    "difficulty": "difícil",
    "n": 9,
    "mati_rows": [0, 1, 2, 3, 4],
    "centres": [
        {"id": "fep", "name": "FEP Aprenents EE", "short": "FEP Aprenents",
         "rows": [0, 1, 2], "cols": [0, 1, 2, 3, 4], "demand": 2},
        {"id": "ind", "name": "EA La Industrial", "short": "La Industrial",
         "rows": [0, 1, 2], "cols": [5, 6, 7, 8], "demand": 1},
        {"id": "ali", "name": "Institut dels Aliments", "short": "Inst. dels Aliments",
         "rows": [3, 4], "cols": [0, 1, 2, 3], "demand": 1},
        {"id": "seg", "name": "Institut Salvador Seguí", "short": "Salvador Seguí",
         "rows": [3, 4], "cols": [4, 5, 6, 7, 8], "demand": 1},
        {"id": "esc", "name": "INS Escola del Treball", "short": "Escola del Treball",
         "rows": [5, 6], "cols": [0, 1, 2, 3, 4], "demand": 1},
        {"id": "fpv", "name": "Institut d'FP Sanitària Vall d'Hebron", "short": "FP Vall d'Hebron",
         "rows": [5, 6], "cols": [5, 6, 7, 8], "demand": 1},
        {"id": "log", "name": "Institut de Logística de Barcelona", "short": "Inst. de Logística",
         "rows": [7, 8], "cols": [0, 1, 2, 3, 4, 5, 6, 7, 8], "demand": 2},
    ],
    "ils": ils("José Javier", "Carla", "Judit", "Sara", "Ruth",
               "Aroha", "Miriam", "Tatiana", "Irene", "Laura M"),
    "out": "Laura M",
    "seed": 409,
    "object_density": 0.31,
    "object_mix": 0.5,
    "mode": "extended",
    "target": None,
    "allowed_types": {  # només pistes unàries: al 9×9 són les que poden podar
        "room", "notRoom", "on", "onNone", "beside", "notbeside",
        "inCorner", "notCorner", "cornerGrid"},
}

CASES = [
    CASE_PRIMER_DIA,
    CASE_BENVINGUDA,
    CASE_PATI,
    CASE_ESTUDI,
    CASE_FORAT,
    CASE_DOBLE_TORN,
    CASE_CANVI,
    CASE_PORTES,
    CASE_SALA,
    CASE_GRAN,
    CASE_SETMANA,
    CASE_HORARIS,
    CASE_CONSELL,
    CASE_AVALUACIO,
]
