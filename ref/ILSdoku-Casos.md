# ILSdoku — Col·lecció de casos

> Document **generat** amb `tools/make_cases_doc.py` a partir de les
> actes de `tools/atoms/`. No editeu aquest fitxer a mà.

Tots els casos compleixen les regles del disseny (vegeu
`ILSdoku-Disseny.md` §5, §5.1 i §11): una ILS per fila i columna, la
demanda de cada centre com a regla dura, torns en zones i **una sola**
candidata sense plaça (la Laura M), amb una pista **decisiva** que tanca
el cas. La verificació automàtica és a `tools/test_solvable.py`.

| Cas | Dificultat | Graella | Places | Centres | Pistes |
|---|---|---|---|---|---|
| El primer dia | molt fàcil | 5×5 | 5 | 4 | 6 |
| La benvinguda | molt fàcil | 5×5 | 5 | 4 | 6 |
| L'hora del pati | fàcil | 6×6 | 6 | 4 | 8 |
| L'hora d'estudi | fàcil | 6×6 | 6 | 5 | 9 |
| El forat de l'horari | fàcil | 7×7 | 7 | 4 | 8 |
| Canvi de classe | mitjà | 7×7 | 7 | 5 | 8 |
| Portes obertes | mitjà | 7×7 | 7 | 5 | 8 |
| Doble torn | mitjà | 8×8 | 8 | 6 | 14 |
| La sala de professors | mitjà | 8×8 | 8 | 7 | 10 |
| La setmana cultural | difícil | 9×9 | 9 | 6 | 12 |
| Tot el curs | difícil | 9×9 | 9 | 6 | 13 |
| Els horaris de setembre | expert | 10×10 | 10 | 7 | 13 |

---

## el-primer-dia — «El primer dia»

- **Dificultat:** molt fàcil · **graella:** 5×5 · **6 pistes**
- **Candidates:** 6 (5 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–3 | 1–3 | 2 |
| EA La Industrial | Matí | 1–3 | 4–5 | 1 |
| Institut Salvador Seguí | Tarda | 4–5 | 1–3 | 1 |
| Institut de Logística de Barcelona | Tarda | 4–5 | 4–5 | 1 |

### Pistes

- **Carla** (matí): Carla era a l'EA La Industrial.
- **Judit** (matí): Judit no era mai sobre cap estoreta.
- **Laura M** (matí): Laura M no era mai sobre cap catifa.
- **Oscar** (matí): Oscar era al costat del rellotge.
- **Aroha** (tarda): Aroha era al costat d'una catifa.
- **Miriam** (tarda): Miriam era l'única ILS sobre una estoreta.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|
|---|---|---|---|---|---|
|**R1**||Banc||**C**||
|**R2**|||**O**||Estoreta|
|**R3**|**J**|Catifa|Rellotge|Estoreta||
|**R4**||**M**|Catifa|||
|**R5**|||Taula|Catifa|**A**|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R2 C3 |
| Carla | C | matí | R1 C4 |
| Judit | J | matí | R3 C1 |
| Aroha | A | tarda | R5 C5 |
| Miriam | M | tarda | R4 C2 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R3 C1, al FEP Aprenents EE, sobre una catifa. Judit hi podia seure, i Laura M no, perquè no era mai sobre cap catifa. Per això Laura M es queda sense plaça.

---

## la-benvinguda — «La benvinguda»

- **Dificultat:** molt fàcil · **graella:** 5×5 · **6 pistes**
- **Candidates:** 6 (5 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–3 | 1–3 | 2 |
| EA La Industrial | Matí | 1–3 | 4–5 | 1 |
| Institut Salvador Seguí | Tarda | 4–5 | 1–3 | 1 |
| Institut de Logística de Barcelona | Tarda | 4–5 | 4–5 | 1 |

### Pistes

- **Judit** (matí): Judit era sobre una estoreta.
- **Laura M** (matí): Laura M no era enlloc del FEP Aprenents EE.
- **María Nuria** (matí): María Nuria no era mai sobre cap catifa.
- **Oscar** (matí): Oscar era al costat de la pissarra.
- **Aroha** (tarda): Aroha era sobre una estoreta.
- **Tatiana** (tarda): Tatiana era l'única ILS sobre un banc.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|
|---|---|---|---|---|---|
|**R1**||||**O**|Pissarra|
|**R2**||Cadira|**MN**||Taula|
|**R3**|Catifa|**J**||||
|**R4**||||Banc|**T**|
|**R5**|**A**|Banc|Banc|Rellotge||

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R1 C4 |
| Judit | J | matí | R3 C2 |
| María Nuria | MN | matí | R2 C3 |
| Aroha | A | tarda | R5 C1 |
| Tatiana | T | tarda | R4 C5 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R2 C3, al FEP Aprenents EE. María Nuria hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça.

---

## lhora-del-pati — «L'hora del pati»

- **Dificultat:** fàcil · **graella:** 6×6 · **8 pistes**
- **Candidates:** 7 (6 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–4 | 1–3 | 2 |
| Institut dels Aliments | Matí | 1–4 | 4–6 | 2 |
| INS Escola del Treball | Tarda | 5–6 | 1–3 | 1 |
| Institut de Logística de Barcelona | Tarda | 5–6 | 4–6 | 1 |

### Pistes

- **Carla** (matí): Carla era al costat de la pissarra.
- **José Javier** (matí): José Javier era al costat del rellotge. José Javier era en una cantonada de la seva sala.
- **Judit** (matí): Judit era al costat del rellotge.
- **Laura M** (matí): Laura M no era enlloc del FEP Aprenents EE.
- **Oscar** (matí): Oscar no era mai sobre cap catifa.
- **Aroha** (tarda): Aroha era l'única ILS sobre una cadira.
- **Miriam** (tarda): Miriam era al costat d'un banc.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|
|---|---|---|---|---|---|---|
|**R1**|Banc|||**C**|Pissarra||
|**R2**||Prestatge|**O**||Banc||
|**R3**|Rellotge||||**J**|Rellotge|
|**R4**|**JJ**|||Catifa|||
|**R5**||**A**||||Banc|
|**R6**||||Estoreta||**M**|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R2 C3 |
| José Javier | JJ | matí | R4 C1 |
| Carla | C | matí | R1 C4 |
| Judit | J | matí | R3 C5 |
| Aroha | A | tarda | R5 C2 |
| Miriam | M | tarda | R6 C6 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R2 C3, al FEP Aprenents EE, sobre un banc. Oscar hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça.

---

## lhora-destudi — «L'hora d'estudi»

- **Dificultat:** fàcil · **graella:** 6×6 · **9 pistes**
- **Candidates:** 7 (6 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–4 | 1–2 | 1 |
| Institut dels Aliments | Matí | 1–4 | 3–5 | 2 |
| EA La Industrial | Matí | 1–4 | 6–6 | 1 |
| INS Escola del Treball | Tarda | 5–6 | 1–3 | 1 |
| Institut de Logística de Barcelona | Tarda | 5–6 | 4–6 | 1 |

### Pistes

- **José Javier** (matí): José Javier seia en un banc. José Javier era en una cantonada de la seva sala.
- **Judit** (matí): Judit era en una cantonada de la seva sala. Judit era al FEP Aprenents EE.
- **Laura M** (matí): Laura M no era enlloc de l'EA La Industrial.
- **Marc** (matí): Marc era al costat d'una cadira.
- **Oscar** (matí): Oscar no era mai sobre cap catifa.
- **Aroha** (tarda): Aroha era en una cantonada del tauler.
- **Tatiana** (tarda): Tatiana no era en cap cantonada de la seva sala.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|
|---|---|---|---|---|---|---|
|**R1**|||**JJ**|Banc|||
|**R2**|||Banc|Banc|Pissarra|**O**|
|**R3**|||Estoreta|**Mc**|Banc||
|**R4**||**J**||Cadira|Catifa||
|**R5**||Cadira|||**T**||
|**R6**|**A**|Estoreta|Rellotge|||Lavabo|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R2 C6 |
| José Javier | JJ | matí | R1 C3 |
| Marc | Mc | matí | R3 C4 |
| Judit | J | matí | R4 C2 |
| Aroha | A | tarda | R6 C1 |
| Tatiana | T | tarda | R5 C5 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R2 C6, a l'EA La Industrial. Oscar hi podia seure, i Laura M no, perquè no era enlloc de l'EA La Industrial. Per això Laura M es queda sense plaça.

---

## el-forat-de-lhorari — «El forat de l'horari»

- **Dificultat:** fàcil · **graella:** 7×7 · **8 pistes**
- **Candidates:** 8 (7 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–4 | 1–4 | 3 |
| Institut dels Aliments | Matí | 1–4 | 5–7 | 1 |
| INS Escola del Treball | Tarda | 5–7 | 1–5 | 2 |
| Institut de Logística de Barcelona | Tarda | 5–7 | 6–7 | 1 |

### Pistes

- **Carla** (matí): Carla seia en un banc.
- **José Javier** (matí): José Javier era sobre una estoreta.
- **Judit** (matí): Judit no era mai sobre cap catifa.
- **Laura M** (matí): Laura M no seia mai en cap cadira.
- **Oscar** (matí): Oscar era sobre una catifa.
- **Aroha** (tarda): Aroha era a l'INS Escola del Treball.
- **Irene** (tarda): Irene era l'única ILS de la seva sala.
- **Miriam** (tarda): Miriam era al costat de la pissarra.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|
|---|---|---|---|---|---|---|---|
|**R1**|Cadira|**O**|Ordinador|||Taula|Cadira|
|**R2**|Pissarra|||**JJ**|Prestatge|||
|**R3**|**C**|||Lavabo|||Prestatge|
|**R4**||Cadira||Ordinador||**J**|Màquina de cafè|
|**R5**|Pissarra||**A**|Lavabo||Taula||
|**R6**||Cadira|||**M**|Prestatge|Rellotge|
|**R7**|Cadira||Taula||Pissarra||**I**|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R1 C2 |
| José Javier | JJ | matí | R2 C4 |
| Carla | C | matí | R3 C1 |
| Judit | J | matí | R4 C6 |
| Aroha | A | tarda | R5 C3 |
| Miriam | M | tarda | R6 C5 |
| Irene | I | tarda | R7 C7 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R4 C6, a l'Institut dels Aliments, sobre una cadira. Judit hi podia seure, i Laura M no, perquè no seia mai en cap cadira. Per això Laura M es queda sense plaça.

---

## canvi-de-classe — «Canvi de classe»

- **Dificultat:** mitjà · **graella:** 7×7 · **8 pistes**
- **Candidates:** 8 (7 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–2 | 1–4 | 2 |
| Institut dels Aliments | Matí | 3–4 | 1–4 | 1 |
| Institut Salvador Seguí | Matí | 1–4 | 5–7 | 1 |
| INS Escola del Treball | Tarda | 5–7 | 1–5 | 2 |
| Institut de Logística de Barcelona | Tarda | 5–7 | 6–7 | 1 |

### Pistes

- **Carla** (matí): Carla no era mai sobre cap catifa.
- **José Javier** (matí): José Javier era en una cantonada de la seva sala.
- **Judit** (matí): Judit era al costat d'una catifa.
- **Laura M** (matí): Laura M no seia mai en cap cadira.
- **Oscar** (matí): Oscar era exactament 1 columna a la dreta de José Javier.
- **Aroha** (tarda): Aroha era l'única ILS sobre una estoreta.
- **Irene** (tarda): Irene seia en una cadira.
- **Miriam** (tarda): Miriam era l'única ILS de la seva sala.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|
|---|---|---|---|---|---|---|---|
|**R1**|Estoreta|**O**|Banc|Banc||Catifa||
|**R2**|**JJ**||||Banc|Banc||
|**R3**|Rellotge|Catifa|**J**|||Banc|Banc|
|**R4**|||||||**C**|
|**R5**||Cadira||**A**|||Cadira|
|**R6**||||Cadira|**I**|||
|**R7**||||Banc|Banc|**M**|Estoreta|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R1 C2 |
| José Javier | JJ | matí | R2 C1 |
| Carla | C | matí | R4 C7 |
| Judit | J | matí | R3 C3 |
| Aroha | A | tarda | R5 C4 |
| Miriam | M | tarda | R7 C6 |
| Irene | I | tarda | R6 C5 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R4 C7, a l'Institut Salvador Seguí, sobre una cadira. Carla hi podia seure, i Laura M no, perquè no seia mai en cap cadira. Per això Laura M es queda sense plaça.

---

## portes-obertes — «Portes obertes»

- **Dificultat:** mitjà · **graella:** 7×7 · **8 pistes**
- **Candidates:** 8 (7 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–2 | 1–4 | 1 |
| Institut Salvador Seguí | Matí | 3–4 | 1–4 | 1 |
| EA La Industrial | Matí | 1–4 | 5–7 | 2 |
| INS Escola del Treball | Tarda | 5–7 | 1–4 | 2 |
| Institut de Logística de Barcelona | Tarda | 5–7 | 5–7 | 1 |

### Pistes

- **Carla** (matí): Carla era en una cantonada de la seva sala.
- **Judit** (matí): Judit era al costat d'una catifa.
- **Laura M** (matí): Laura M no era mai sobre cap estoreta.
- **Marc** (matí): Marc no era mai sobre cap catifa.
- **Oscar** (matí): Oscar anava amb Carla.
- **Aroha** (tarda): Aroha era al costat del rellotge.
- **Miriam** (tarda): Miriam era en una cantonada del tauler.
- **Tatiana** (tarda): Tatiana seia en una cadira.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|
|---|---|---|---|---|---|---|---|
|**R1**|||||**C**|||
|**R2**|Banc||Rellotge|**Mc**|||Taula|
|**R3**||Estoreta||Ordinador||**O**||
|**R4**|Catifa|**J**|Prestatge|||||
|**R5**|**A**|Rellotge|Prestatge|||Taula|Rellotge|
|**R6**|||**T**|||||
|**R7**||Rellotge|Estoreta||||**M**|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R3 C6 |
| Carla | C | matí | R1 C5 |
| Marc | Mc | matí | R2 C4 |
| Judit | J | matí | R4 C2 |
| Aroha | A | tarda | R5 C1 |
| Miriam | M | tarda | R7 C7 |
| Tatiana | T | tarda | R6 C3 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R2 C4, al FEP Aprenents EE, sobre una estoreta. Marc hi podia seure, i Laura M no, perquè no era mai sobre cap estoreta. Per això Laura M es queda sense plaça.

---

## doble-torn — «Doble torn»

- **Dificultat:** mitjà · **graella:** 8×8 · **14 pistes**
- **Candidates:** 9 (8 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–2 | 1–3 | 1 |
| Institut Salvador Seguí | Matí | 3–4 | 1–3 | 1 |
| Institut dels Aliments | Matí | 1–4 | 4–6 | 2 |
| INS Escola del Treball | Tarda | 5–8 | 1–3 | 1 |
| Institut d'FP Sanitària Vall d'Hebron | Tarda | 5–8 | 4–6 | 1 |
| Institut de Logística de Barcelona | Tarda | 5–8 | 7–8 | 2 |

### Pistes

- **Carla** (matí): Carla no era mai sobre cap catifa.
- **José Javier** (matí): José Javier era en una cantonada de la seva sala. José Javier no seia mai en cap banc.
- **Judit** (matí): Judit no era en cap cantonada de la seva sala.
- **Laura M** (matí): Laura M no era enlloc del FEP Aprenents EE.
- **Oscar** (matí): Oscar era a l'Institut Salvador Seguí. Oscar era exactament 2 columnes a l'esquerra de José Javier.
- **Aroha** (tarda): Aroha no era en cap cantonada de la seva sala. Aroha era a l'Institut d'FP Sanitària Vall d'Hebron.
- **Irene** (tarda): Irene era al costat d'una estoreta. Irene era en una cantonada de la seva sala.
- **Laura G** (tarda): Laura G no era mai sobre cap estoreta.
- **Miriam** (tarda): Miriam era al costat d'una estoreta. Miriam era a l'INS Escola del Treball.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|C8|
|---|---|---|---|---|---|---|---|---|
|**R1**||||**JJ**|Màquina de cafè||Ordinador||
|**R2**|||**C**||||||
|**R3**||Estoreta||||**J**|||
|**R4**||**O**||Banc|||Catifa||
|**R5**|Banc||||**A**||Catifa|Màquina de cafè|
|**R6**|**M**|Pissarra||||Estoreta|Rellotge|Màquina de cafè|
|**R7**|Estoreta|||Catifa|||Estoreta|**LG**|
|**R8**||Catifa||Rellotge||Estoreta|**I**|Prestatge|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R4 C2 |
| José Javier | JJ | matí | R1 C4 |
| Carla | C | matí | R2 C3 |
| Judit | J | matí | R3 C6 |
| Aroha | A | tarda | R5 C5 |
| Miriam | M | tarda | R6 C1 |
| Irene | I | tarda | R8 C7 |
| Laura G | LG | tarda | R7 C8 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R2 C3, al FEP Aprenents EE. Carla hi podia seure, i Laura M no, perquè no era enlloc del FEP Aprenents EE. Per això Laura M es queda sense plaça.

---

## la-sala-de-professors — «La sala de professors»

- **Dificultat:** mitjà · **graella:** 8×8 · **10 pistes**
- **Candidates:** 9 (8 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–2 | 1–3 | 1 |
| EA La Industrial | Matí | 3–4 | 1–3 | 1 |
| Institut dels Aliments | Matí | 1–4 | 4–6 | 1 |
| Institut Salvador Seguí | Matí | 1–4 | 7–8 | 1 |
| INS Escola del Treball | Tarda | 5–6 | 1–4 | 1 |
| Institut d'FP Sanitària Vall d'Hebron | Tarda | 5–6 | 5–8 | 1 |
| Institut de Logística de Barcelona | Tarda | 7–8 | 1–8 | 2 |

### Pistes

- **Carla** (matí): Carla era al costat d'un ordinador.
- **José Javier** (matí): José Javier no era mai sobre cap catifa.
- **Judit** (matí): Judit era al costat d'una cadira.
- **Laura M** (matí): Laura M no era enlloc de l'Institut Salvador Seguí.
- **Oscar** (matí): Oscar era al costat de la pissarra. Oscar no era en cap cantonada de la seva sala.
- **Aroha** (tarda): Aroha era al costat del rellotge.
- **Irene** (tarda): Irene era en una cantonada del tauler.
- **Laura G** (tarda): Laura G era al costat d'una estoreta.
- **Miriam** (tarda): Miriam anava amb Irene.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|C8|
|---|---|---|---|---|---|---|---|---|
|**R1**|Banc|Banc|Cadira||Prestatge||**JJ**||
|**R2**|||**J**|Cadira|Catifa|Pissarra|||
|**R3**|Cadira|||||**O**|||
|**R4**|Ordinador|**C**|||||||
|**R5**|Cadira|Taula|Estoreta|**LG**|Taula||Catifa|Rellotge|
|**R6**|Banc|Banc|Catifa||Prestatge|Estoreta||**A**|
|**R7**|Màquina de cafè||||**M**||||
|**R8**|**I**||Banc|Banc|||||

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R3 C6 |
| José Javier | JJ | matí | R1 C7 |
| Carla | C | matí | R4 C2 |
| Judit | J | matí | R2 C3 |
| Aroha | A | tarda | R6 C8 |
| Miriam | M | tarda | R7 C5 |
| Irene | I | tarda | R8 C1 |
| Laura G | LG | tarda | R5 C4 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R1 C7, a l'Institut Salvador Seguí. José Javier hi podia seure, i Laura M no, perquè no era enlloc de l'Institut Salvador Seguí. Per això Laura M es queda sense plaça.

---

## setmana-cultural — «La setmana cultural»

- **Dificultat:** difícil · **graella:** 9×9 · **12 pistes**
- **Candidates:** 10 (9 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–2 | 1–4 | 1 |
| Institut Salvador Seguí | Matí | 3–4 | 1–4 | 1 |
| EA La Industrial | Matí | 1–4 | 5–9 | 2 |
| INS Escola del Treball | Tarda | 5–6 | 1–5 | 1 |
| Institut dels Aliments | Tarda | 7–8 | 1–5 | 1 |
| Institut de Logística de Barcelona | Tarda | 5–9 | 6–9 | 3 |

### Pistes

- **Carla** (matí): Carla era al costat d'una cadira.
- **Joan** (matí): Joan no era mai sobre cap catifa.
- **Judit** (matí): Judit era al costat del prestatge.
- **Laura M** (matí): Laura M no era mai sobre cap estoreta.
- **Oscar** (matí): Oscar era al costat d'una estoreta. Oscar era al FEP Aprenents EE.
- **Aroha** (tarda): Aroha era a l'Institut dels Aliments. Aroha era en una cantonada de la seva sala.
- **Irene** (tarda): Irene no era en cap cantonada de la seva sala.
- **Laura G** (tarda): Laura G era al costat de la taula.
- **Miriam** (tarda): Miriam era sobre una estoreta.
- **Tatiana** (tarda): Tatiana era en una cantonada del tauler.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|C8|C9|
|---|---|---|---|---|---|---|---|---|---|
|**R1**|Banc||**O**||Estoreta|||Banc||
|**R2**|||Estoreta||||**C**|Cadira||
|**R3**||**Jn**|||Prestatge|||Pissarra|Màquina de cafè|
|**R4**|||||**J**|||||
|**R5**|||Lavabo|||**M**|||Màquina de cafè|
|**R6**||Pissarra||**I**||||Banc|Rellotge|
|**R7**||||Lavabo||||**LG**|Lavabo|
|**R8**|**A**||Prestatge|||Ordinador|Màquina de cafè|Taula|Màquina de cafè|
|**R9**||Rellotge||||Lavabo|Estoreta||**T**|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R1 C3 |
| Carla | C | matí | R2 C7 |
| Joan | Jn | matí | R3 C2 |
| Judit | J | matí | R4 C5 |
| Aroha | A | tarda | R8 C1 |
| Miriam | M | tarda | R5 C6 |
| Tatiana | T | tarda | R9 C9 |
| Irene | I | tarda | R6 C4 |
| Laura G | LG | tarda | R7 C8 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R3 C2, a l'Institut Salvador Seguí, sobre una estoreta. Joan hi podia seure, i Laura M no, perquè no era mai sobre cap estoreta. Per això Laura M es queda sense plaça.

---

## tot-el-curs — «Tot el curs»

- **Dificultat:** difícil · **graella:** 9×9 · **13 pistes**
- **Candidates:** 10 (9 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–3 | 1–4 | 2 |
| EA La Industrial | Matí | 1–3 | 5–9 | 1 |
| Institut dels Aliments | Matí | 4–5 | 1–9 | 2 |
| INS Escola del Treball | Tarda | 6–9 | 1–4 | 2 |
| Institut Salvador Seguí | Tarda | 6–9 | 5–6 | 1 |
| Institut de Logística de Barcelona | Tarda | 6–9 | 7–9 | 1 |

### Pistes

- **Carla** (matí): Carla no era en cap cantonada de la seva sala.
- **José Javier** (matí): José Javier era sobre una catifa. José Javier no era en cap cantonada de la seva sala.
- **Judit** (matí): Judit era al costat d'una cadira. Judit no era en cap cantonada de la seva sala.
- **Laura M** (matí): Laura M no era enlloc de l'Institut dels Aliments.
- **Marc** (matí): Marc era al FEP Aprenents EE.
- **Oscar** (matí): Oscar no seia mai en cap banc.
- **Aroha** (tarda): Aroha no era al costat de la màquina de cafè.
- **Irene** (tarda): Irene era al costat d'una catifa.
- **Laura G** (tarda): Laura G era en una cantonada de la seva sala. Laura G era a l'INS Escola del Treball.
- **Miriam** (tarda): Miriam era en una cantonada de la seva sala.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|C8|C9|
|---|---|---|---|---|---|---|---|---|---|
|**R1**||**JJ**||Cadira|Banc||Rellotge|Pissarra|Estoreta|
|**R2**|Pissarra||**Mc**||||Rellotge|Taula|Taula|
|**R3**||Taula|Taula||Catifa|Cadira|**J**||Lavabo|
|**R4**|||Taula||||||**O**|
|**R5**|||Banc||Pissarra|**C**|||Banc|
|**R6**||||**LG**|Lavabo||Estoreta||Màquina de cafè|
|**R7**|Catifa|||||||**A**||
|**R8**|**I**|||||||||
|**R9**|||||**M**||||Pissarra|

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| Oscar | O | matí | R4 C9 |
| José Javier | JJ | matí | R1 C2 |
| Carla | C | matí | R5 C6 |
| Judit | J | matí | R3 C7 |
| Marc | Mc | matí | R2 C3 |
| Aroha | A | tarda | R7 C8 |
| Miriam | M | tarda | R9 C5 |
| Irene | I | tarda | R8 C1 |
| Laura G | LG | tarda | R6 C4 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R4 C9, a l'Institut dels Aliments. Oscar hi podia seure, i Laura M no, perquè no era enlloc de l'Institut dels Aliments. Per això Laura M es queda sense plaça.

---

## horaris-setembre — «Els horaris de setembre»

- **Dificultat:** expert · **graella:** 10×10 · **13 pistes**
- **Candidates:** 11 (10 places)
- **Qui queda sense plaça:** **Laura M**

### Centres

| Centre | Zona | Fila | Columnes | Demanda |
|---|---|---|---|---|
| FEP Aprenents EE | Matí | 1–3 | 1–4 | 2 |
| EA La Industrial | Matí | 1–3 | 5–10 | 1 |
| Institut Salvador Seguí | Matí | 4–5 | 1–4 | 1 |
| Institut d'FP Sanitària Vall d'Hebron | Matí | 4–5 | 5–10 | 1 |
| INS Escola del Treball | Tarda | 6–7 | 1–5 | 1 |
| Institut dels Aliments | Tarda | 8–10 | 1–5 | 1 |
| Institut de Logística de Barcelona | Tarda | 6–10 | 6–10 | 3 |

### Pistes

- **Helena** (matí): Helena seia en un banc.
- **Joan** (matí): Joan era al costat del prestatge.
- **Laura M** (matí): Laura M no seia mai en cap cadira.
- **María Nuria** (matí): María Nuria no era mai sobre cap catifa.
- **Ruth** (matí): Ruth era al costat d'una cadira. Ruth era en una cantonada de la seva sala.
- **Sara** (matí): Sara no era en cap cantonada de la seva sala.
- **Aroha** (tarda): Aroha era al costat de la taula. Aroha no era al costat de la màquina de cafè.
- **Irene** (tarda): Irene era a l'INS Escola del Treball.
- **Laura G** (tarda): Laura G era al costat de la màquina de cafè.
- **Miriam** (tarda): Miriam era en una cantonada de la seva sala.
- **Tatiana** (tarda): Tatiana era al costat del rellotge.

### Solució

Tauler complet; en **negreta**, la ILS de cada casella (les altres caselles mostren l'objecte, si n'hi ha).

| |C1|C2|C3|C4|C5|C6|C7|C8|C9|C10|
|---|---|---|---|---|---|---|---|---|---|---|
|**R1**|Cadira||||Cadira||Estoreta|**Jn**|Prestatge||
|**R2**|||**H**|||Banc|||||
|**R3**|**MN**||Taula|||Ordinador|Estoreta|||Catifa|
|**R4**||||Cadira|||**S**||||
|**R5**||||**R**|Estoreta|Pissarra|Banc|Màquina de cafè|||
|**R6**||Banc|||||||**A**||
|**R7**|Banc|||Banc|**I**||Estoreta|Estoreta|Taula||
|**R8**||**T**|Rellotge||||Pissarra||||
|**R9**||Estoreta||||||Prestatge|Màquina de cafè|**LG**|
|**R10**|||Rellotge|Rellotge|Banc|**M**|||||

| ILS | Inicial | Torn | Casella |
|---|---|---|---|
| María Nuria | MN | matí | R3 C1 |
| Sara | S | matí | R4 C7 |
| Joan | Jn | matí | R1 C8 |
| Ruth | R | matí | R5 C4 |
| Helena | H | matí | R2 C3 |
| Aroha | A | tarda | R6 C9 |
| Miriam | M | tarda | R10 C6 |
| Tatiana | T | tarda | R8 C2 |
| Irene | I | tarda | R7 C5 |
| Laura G | LG | tarda | R9 C10 |
| Laura M | LM | matí | **sense plaça** |

> **Revelació:** L'última plaça lliure era R3 C1, al FEP Aprenents EE, sobre una cadira. María Nuria hi podia seure, i Laura M no, perquè no seia mai en cap cadira. Per això Laura M es queda sense plaça.

---
