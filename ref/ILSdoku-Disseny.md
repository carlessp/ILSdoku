# ILSdoku — Disseny i especificació (v0.1)

> Joc de lògica deductiva tipus **Murdoku**, ambientat en la confecció de l'horari dels
> **ILS (intèrprets de llengua de signes)** als centres educatius de Barcelona.
> Aquest document és la primera proposta de disseny; algunes decisions encara estan obertes
> (secció 14).

---

## 1. Concepte

Cada partida és un **cas** (puzle). El jugador rep:

- una **graella** que representa el mapa de la jornada, dividida en **dos torns** (Matí i Tarda),
- un conjunt de **centres educatius** (les «sales» del tauler), cadascun amb una **demanda** de persones,
- una llista d'**ILS** (els «personatges»), cadascuna amb les seves **pistes**.

**Objectiu:** col·locar les ILS a la graella respectant totes les pistes. Quan l'horari
està quadrat, es revela la incògnita final: **quina ILS es queda sense plaça**.

El tema és una picada d'ullet a la dificultat real de quadrar aquests horaris.

---

## 2. Nomenclatura

| Terme real | Element del joc | Equivalència Murdoku |
|---|---|---|
| ILS / intèrpret | **Personatge** (peça que es col·loca) | *character* |
| Torn de matí / tarda | **Zona** (2 grans meitats del tauler) | *zone* (proposat) |
| Centre educatiu | **Sala / centre** (conjunt de cel·les) | *room / area* |
| Plaça / necessitat del centre | **Demanda** (1, 2 o 3) | *nº d'ocupants de la sala* |
| Alumne amb 1+ ILS | **Alumne** (objecte/pista dins un centre) | *objecte / subàrea* |
| Horari quadrat | **Solució** | *solution* |
| Qui es queda sense plaça | **Incògnita final** | *assassí* |

---

## 3. Estructura del tauler

### 3.1 Graella

- Graella **N×N** (normalment 6×6 a 10×10). Com al Murdoku, la restricció global és
  **una sola ILS per fila i per columna**.
- Files i columnes són línies abstractes del tauler (no cal que tinguin un significat propi);
  serveixen per a les pistes de tipus «fila/columna» i per garantir la deducció.

### 3.2 Torns (zones)

- Dues grans zones: **MATÍ** i **TARDA**.
- Recomanació: MATÍ = meitat **superior** del tauler, TARDA = meitat **inferior**
  (així «més amunt» = «més aviat», cosa que donarà pistes temporals naturals).
- Cada centre pertany a un torn. Un centre amb activitat al matí i a la tarda pot
  aparèixer com **dues sales** distinctes: «La Salle Gràcia — Matí» i «La Salle Gràcia — Tarda».
- La disponibilitat d'una ILS («només matins» / «només tardes») és una **pista**: la seva
  peça ha d'anar a la zona corresponent.
- Les ILS **sense torn definit** (flexibles) poden anar a qualsevol de les dues zones:
  la pista no els restringeix el torn.

### 3.3 Centres (les «sales»)

- Cada centre és un **conjunt de cel·les** delimitat per parets, com una habitació del Murdoku.
- Cada centre porta una **placa de demanda**: el nombre **exacte** d'ILS que hi ha d'haver
  (1, 2 o 3). És una **regla dura i visible** al tauler (com ho és, al Murdoku, que un
  objecte sigui ocupable o no). El jugador no l'ha de deduir: la llegeix i l'ha de complir.
- Un centre pot tenir 0 persones si la seva demanda ho permet? **No**: si apareix al tauler,
  la seva demanda és ≥ 1. (Els centres que no cal cobrir simplement no són al mapa.)
- Els centres tenen **nom real** (vegeu la llista a §4.3).

### 3.4 Passadissos i espais comuns

- Les cel·les que no són centre (passadissos, pati, lavabos, consergeria…) poden ser
  **ocupables** o **bloquejades** segons els objectes que hi hagi (vegeu §8).
- Serveixen per donar forma al tauler i per generar pistes espacials.

### 3.5 Places

- El nombre total de **places** és la suma de les demandes de tots els centres.
- Aquest nombre determina quantes ILS es col·loquen (vegeu §5).

---

## 4. Els personatges (ILS)

### 4.1 Propietats de cada ILS

| Propietat | Descripció |
|---|---|
| `nom` | Nom de la persona (noms reals facilitats per l'usuari) |
| `torn` | `matí`, `tarda` o `flexible` (sense torn definit) |
| `sexe` | Home / Dona (per a la redacció de les pistes: «ell/ella», «al seu costat»…) |
| `pistes` | Llista de pistes (vegeu §7) |
| `posicio_solucio` | Fila i columna (o «sense plaça») |

### 4.2 Llista actual d'ILS (dades facilitades)

- **Matí (14):** Oscar, María Nuria, José Javier, Carla, Marc, Joan, Sara, Tamara, Ruth,
  Helena, Jennifer, Judit, Eva, **Laura M**.
- **Tarda (5):** Aroha, Miriam, Tatiana, Irene, **Laura G**.
- **Flexibles (2):** Alba, Ingrid. *(Poden anar a qualsevol torn.)*
- **Descartada:** Lluna. *(Eliminada del joc.)*

Total del planter: **21 ILS** (14 matí + 5 tarda + 2 flexibles).

> ℹ️ La **Laura M** és la de matins i la **Laura G** la de tardes.
>
> 🎭 **Regla del joc:** quan hi ha *N* places i *N+1* candidates, **la Laura M és sempre
> qui es queda sense plaça** (broma recurrent sobre la seva disponibilitat real). Com que
> és de matins, al cas de mostra el grup de matí té una candidata de més.
>
> 🔒 **Privacitat:** com que són persones reals, convé confirmar que totes estan d'acord
> a aparèixer-hi (o fer servir inicials/pseudònims).

### 4.3 Llista actual de centres

1. CFA Sants-Sant Raimon de Penyafort
2. EA La Industrial
3. FEP Aprenents EE
4. FEP Mare de Déu de Montserrat
5. INS Escola del Treball
6. Institut d'FP Sanitària Vall d'Hebrón
7. Institut de Logística de Barcelona
8. Institut dels Aliments
9. Institut Salvador Seguí
10. La Salle Gràcia

Cada cas farà servir un **subconjunt** d'aquests centres (tants com calgui per quadrar la
graella), amb la demanda assignada a cadascun.

**Demandes conegudes (reals):**

| Centre | Demanda |
|---|---|
| FEP Aprenents EE | **3** |
| Institut Salvador Seguí | **2** |
| INS Escola del Treball | **2** |
| La resta de centres | **1** |

> Segons la partida, es poden apujar les demandes si convé per quadrar el cas.

---

## 5. La incògnita final: «qui es queda sense plaça»

**Mecànica: N places, N + 1 candidates, amb una pista negativa DECISIVA.**

- Cada cas té **N places** i **N + 1 ILS candidates**.
- Cal col·locar N ILS; **una es queda fora** de la graella.
- Les pistes determinen de manera única tant la col·locació de les N com **quina és la
  que sobra**.
- La ILS sobrant és la **incògnita final**: el joc la revela en resoldre el cas
  («X es queda sense plaça»), amb una frase que **explica el perquè** (`reveal`).
- És l'anàleg directe de «l'assassí» del Murdoku: una peça que el joc identifica al final,
  però aquí **no ocupa cap cel·la**.

### 5.1 El problema de la targeta buida (i com es resol)

Com que totes les pistes són certes, una ILS **sense cel·la** no pot portar cap pista de
col·locació («era sobre una catifa» només pot ser cert si té casella). La primera versió
deixava la seva targeta buida («Sense pista»), i això **regalava la resposta**: una targeta
buit és, de fet, la solució del cas.

La solució triada:

1. **Tothom té pista.** Qui es queda fora rep una pista **negativa** (`notRoom`,
   `onNone`, `notbeside`). Si no és enlloc, qualsevol afirmació negativa se li compleix
   de manera **vàcua**; per tant la pista és certa sense donar cap casella.
2. **La pista és DECISIVA.** El cas es dissenya perquè, **sense** aquesta pista, hi hagués
   més d'una solució: una altra candidata (també amb només pistes negatives) podria
   ocupar **l'última plaça lliure**. Amb la pista, aquella plaça queda descartada per a
   qui es queda fora. La pista deixa de ser decorativa i passa a ser **la que tanca el cas**.
3. **Dues candidates amb pistes només negatives.** Com que hi ha una ILS col·locada i la
   que queda fora amb el mateix tipus de pista, la forma de la targeta ja no delata res:
   cal raonar sobre l'última plaça.

Exemple (cas de mostra): l'última plaça lliure és al costat d'una **cadira**; la **Judit**
(«no era mai sobre cap catifa») hi pot seure, i la **Laura M** («no seia mai en cap
cadira») no. Ergo la Laura M es queda sense plaça.

*(Altres alternatives valorades: treure el candidat sobrer —es perd la incògnita—, i fer
un rol explícit tipus «la novella» amb la pregunta «qui la tutoritza?» —fidel al Murdoku,
però perd el tema del «forat de l'horari».)*

---

## 6. Restriccions reals → elements del joc

| Realitat | Element del joc | Com s'implementa |
|---|---|---|
| Una ILS només fa **matins** o **tardes** | Zona Matí/Tarda | Pista obligatòria de torn: «treballava al matí» |
| ILS **flexible** (sense torn) | — | Cap pista de torn |
| Un centre necessita **1, 2 o 3** ILS | Placa de demanda | **Regla dura** visible: «exactament N ILS en aquest centre» |
| Un **alumne** pot tenir **1 o més** ILS | Alumne (objecte/pista) | Pista de relació avançada **opcional** (casos difícils): «l'alumne X anava amb 2 ILS» / subàrea |
| Cada ILS ocupa **una** plaça | Regla «1 per fila i columna» | Global |
| Una ILS **no pot ser a dos llocs** | Unicitat | Global |
| Màxim d'hores / franges | Pistes de fila/columna o d'offset | *(Si es vol modelar; §14)* |
| Centres amb **torns concrets** | Zona del centre | Geometria del tauler |
| Ningú es pot quedar **sense cobrir** → algú sobra | Incògnita final | §5 |

---

## 7. Vocabulari de pistes (adaptació al català)

Cada ILS rep una o més pistes, **inclosa** la que es queda sense plaça (amb pistes
negatives, §5.1). Proposta de redaccions en català, partint dels tipus del Murdoku:

### 7.1 Torn i centre

| Tipus | Redacció proposada | Significat |
|---|---|---|
| `torn` | «Només treballava al matí.» / «…a la tarda.» | És a la zona Matí/Tarda |
| `centre` | «Era a l'Institut dels Aliments.» | Dins del centre X |
| `orcentre` | «Era a l'Institut dels Aliments o a La Salle Gràcia.» | En un de dos centres |
| `notcentre` | «No era a l'Escola del Treball.» | Fora del centre X |
| `sol_centre` | «Era l'única ILS a l'Escola del Treball.» | Única ocupant del centre X |
| `amb_centre` | «Era amb la Ruth a La Salle Gràcia.» | Amb algú altre, dins X |

### 7.2 Relacions

| Tipus | Redacció proposada | Significat |
|---|---|---|
| `costat` | «Era al costat de la pissarra.» | Adjacent i al **mateix centre** |
| `no_costat` | «No era al costat de la taula.» | No adjacent |
| `sobre` | «Seia en una cadira.» | Sobre un objecte ocupable |
| `amb` | «Anava amb la Carla.» | Al mateix centre |
| `nomes_amb` | «Només eren elles dues al centre.» | Alone with |
| `sola` | «Era l'única ILS del centre.» | Única a la seva sala |
| `unica_sobre` | «Era l'única asseguda en una cadira.» | Única sobre aquell objecte |
| `cantonada` | «… al seu centre, en una cantonada.» | Cantonada de la sala |

### 7.3 Posició (fila/columna/temps)

| Tipus | Redacció proposada | Significat |
|---|---|---|
| `fila_abs` | «Era a la primera fila.» / «…a la fila del mig.» | Fila absoluta |
| `col_abs` | «Era a la tercera columna.» | Columna absoluta |
| `abans` | «Treballava abans que la Miriam.» | *North* (més amunt = més aviat) |
| `despres` | «Treballava després que l'Oscar.» | *South* |
| `offset` | «Exactament 2 franges abans de la Judit.» | Desplaçament exacte |
| `genere` | «Hi havia un home al seu centre.» | Gènere |

> Nota: al Murdoku les direccions (nord/sud/est/oest) apliquen a qualsevol cel·la en
> aquella direcció. Aquí proposo **reutilitzar la vertical com a temps** (dalt = aviat,
> baix = tard) i deixar l'horitzontal com a relació espacial dins la jornada.

### 7.4 Pistes generals d'escena

Possibles regles globals del cas, escrites al tauler:

- «Cada centre tenia exactament les ILS que demana la seva placa.» *(implícit per la demanda)*
- «Cap centre va quedar buit.»
- «Tots els alumnes amb dictamen tenien almenys una ILS.»
- «No hi havia cap centre amb una sola ILS.»

### 7.5 Vocabulari implementat al generador (`tools/gen_case.py`)

El generador de casos ja treballa amb tot aquest repertori i **reparteix les pistes
preferint les «riques»** (objectes, gènere, companyia, unicitat, lloc) i deixant les
**distàncies** com a últim recurs. Tipus disponibles:

| Grup | Tipus | Exemple |
|---|---|---|
| Lloc | `room`, `notRoom` | «era a l'Institut dels Aliments» |
| Sol a la sala | `alone` | «era l'única ILS de la seva sala» |
| Companyia | `withChar` | «anava amb la Miriam» |
| Gènere | `genderPresent`, `genderAbsent` | «al seu centre hi havia un home» |
| Sobre objecte | `on`, `onNone`, `onlyon` | «era sobre una estoreta» · «era l'única ILS sobre una cadira» |
| Al costat d'objecte | `beside`, `notbeside` | «era al costat d'un ordinador» |
| Cantonades | `inCorner`, `notCorner`, `cornerGrid` | «era en una cantonada del tauler» |
| Posició (reserva) | `north`, `south`, `rowOffset`, `colOffset`, `absRow`, `absCol` | «exactament 2 files més avall…» |

El cas de mostra actual **no fa servir cap pista de distància**: tot es resol amb
objectes, companyia, gènere i unicitat.

**Pistes negatives i la ILS que queda fora.** Els tipus `notRoom`, `onNone` i
`notbeside` són els únics que poden portar la ILS que no ocupa cap cel·la (se li
compleixen de manera vàcua). El generador les hi fa servir (§5.1) i, a més, **fa que
siguin decisives**: sense la pista de qui sobra, el cas tindria més d'una solució. També
deixa **una segona candidata** amb només pistes negatives, perquè la forma de la
targeta no delati la resposta.

---

## 8. Objectes i elements educatius

Substitució dels sofàs/teles del Murdoku per elements d'àmbit educatiu. Proposta:

### 8.1 Ocupables (s'hi pot situar una ILS)

Cadira · Cadira de rodes · Banc · Estora / catifa · Matalàs de psicomotricitat · Cadira
de secretaria · Esterilla · Tobogan · Gronxador · Bicicleta · Autobús escolar ·
Cotxe del professorat

### 8.2 Obstacles (no ocupables)

Taula · Taula de professor · Pissarra · Pissarra digital · Ordinador · Projector ·
Prestatge de llibres · Llibres · Arxivador · Paperera · Planta · Tauler d'anuncis ·
Màquina de cafè · Fotocopiadora · Armari / taquilla · Campana · Rellotge · Pilar ·
Lavabo · Pica · Escales · Instrument musical · Material de laboratori

### 8.3 Especials (ni ocupables ni obstacles)

Porta · Finestra · Forat / obra

> Cada element tindrà un **nom** (localitzat), una categoria **ocupable/no/ especial** i un
> gràfic (imatge PNG o emoji). Es farà una taula d'ids com la del Murdoku
> (`{id, nom, ocupable, fitxer}`).

**Implementat fins ara** (cas de mostra): 4 objectes ocupables (cadira, catifa, estoreta,
banc) i 7 obstacles (ordinador, pissarra, taula, prestatge, lavabo, màquina de cafè,
rellotge), cada un amb la seva **imatge pròpia**.

- Les il·lustracions originals viuen a `Imatges/` (1024×1024, fons blanc).
- `tools/make_images.sh` les retalla (fora el fons), les redimensiona i les desa a
  `app/img/` (256×256, fons transparent), que és el que consumeix l'app.
- Al model de dades de cada cas, tant els `objects` com el `glossary` porten el camp
  **`img`** (ruta relativa a `app/`); el camp `icon` (emoji) queda com a reserva.

---

## 9. Model de dades d'un cas (esquema)

Inspirat en el del Murdoku, però reanomenat al domini ILS.

```jsonc
{
  "PROPERTIES": {
    "puzzle_version": "1",
    "grid_w": "6",
    "grid_h": "6",
    "cellsize": "150",
    "total_ils": "6",              // ILS col·locades
    "candidates": "7",             // ILS candidates (total_ils + 1)
    "sense_placa": "4",            // índex de la ILS que sobra (incògnita)
    "total_centres": "4",
    "tour_split": "3",             // files 0-2 = Matí, 3-5 = Tarda
    "difficulty": "easy",
    "titol_ca": "El forat de la graella",
    "clue_general_0": "Cap centre va quedar buit."
  },

  "CENTRES": {
    "centre_name_0": "INS Escola del Treball",
    "centre_demanda_0": "2",
    "centre_torn_0": "matí",       // matí | tarda
    "centre_color_0": "#b1e2de",
    "cell_0_1": "0",               // centre de la cel·la (fila 0, col 1)
    "object_0_1": "4",             // id d'objecte (0 = buit)
    "zone_0_1": "matí"
    // …una entrada per cel·la
  },

  "ILS": {
    "ils_name_0": "Oscar",
    "ils_sexe_0": "0",             // 0 home, 1 dona
    "ils_torn_0": "matí",          // matí | tarda | flexible
    "ils_quote_ca_0": "Treballava al matí i seia en una cadira.",
    "solution_x_0": "2",
    "solution_y_0": "0",
    // …una entrada per ILS (inclosa la sense plaça, amb solution = -1)
  }
}
```

---

## 10. Cas de mostra (validat)

Ja s'ha generat i **verificat per ordinador** un cas complet amb solució única.
El trobaràs desenvolupat a **`ILSdoku-Cas-Mostra.md`** i el programa que el genera i
valida és a **`tools/gen_case.py`** (el generador enriquit; `tools/gen_sample.py` és la
versió primera, amb pistes només de distància).

Resum del cas «El forat de l'horari»:

- **Graella 7×7**, 7 places, **8 candidates** (una es queda sense plaça).
- **Matí** (files R1–R4): FEP Aprenents EE (demanda 3) · Institut dels Aliments (1) →
  **5 candidates de matí per a 4 places**.
- **Tarda** (files R5–R7): INS Escola del Treball (2) · Institut de Logística (1) →
  **3 candidates de tarda per a 3 places** (totes hi entren).
- **8 pistes**: una per cada ILS (7 col·locades + la que queda fora), **cap de distància**:
  sobre objectes («era sobre una estoreta», «seia en un banc»), unicitat («era l'única ILS
  de la seva sala»), «al costat» («era al costat de la pissarra»), lloc («era a l'INS
  Escola del Treball») i **dues de negatives** («no era mai sobre cap catifa» —Judit— i
  «no seia mai en cap cadira» —Laura M—).
- **Objectes variats** al tauler: cadira, catifa, estoreta, banc (ocupables) i ordinador,
  pissarra, taula, prestatge, lavabo, màquina de cafè, rellotge (obstacles).
- **Incògnita**: **Laura M** es queda sense plaça, i la seva pista negativa és la que ho
  demostra (§5.1): l'última plaça lliure és al costat d'una cadira, i ella no seia mai en
  cap cadira. El cas inclou un camp `reveal` amb la frase que ho explica.

El programa fa un **còmput exhaustiu** de totes les col·locacions possibles i comprova
que, amb les pistes triades, només n'hi ha **una** de vàlida. Serveix de plantilla per
generar la resta de casos.

Eines:

| Fitxer | Què fa |
|---|---|
| `tools/cases.py` | **Catàleg de casos**: mida, centres, planter d'ILS i llavor de cadascun |
| `tools/gen_case.py` | Motor del generador (tauler, pool de pistes, solucionador, redacció) i el cas «El forat de l'horari» |
| `tools/gen_collection.py` | Genera **tots** els casos del catàleg → `app/data.js` + `tools/atoms/<id>.json` |
| `tools/atoms/<id>.json` | Acta de cada cas (configuració, pistes en cru, solució i `reveal`) |
| `tools/test_solvable.py` | Verifica **tots** els casos: unicitat, una sola casella factible per ILS col·locada, cap per a qui queda fora, tothom amb pista i pista de qui queda fora **decisiva** |
| `tools/make_cases_doc.py` | Genera `ILSdoku-Casos.md` a partir de les actes |
| `tools/make_data.py` | Refà `app/data.js` des de les actes, sense tornar a generar res |

El generador tria les pistes amb un greedy que mesura **quin domini de caselles
deixa** cada pista (mètrica barata) i només compta les solucions dels candidats
més prometedors. Tots els casos fan servir el mateix solucionador; el que canvia
és el **mode** de cada cas (`tools/cases.py`): els casos ja publicats van en mode
`legacy` (greedy original i fase decisiva original, perquè la seva sortida no
variï) i la resta en mode `extended` (filtre per domini + fase decisiva que, si
cal, completa la unicitat abans de triar la pista decisiva).

El **solucionador** (`count_solutions`) aprofita que sempre hi ha una sola
candidata sense plaça: prova una a una les N+1 possibilitats de qui queda fora
(descartant de seguida les que tenen alguna pista no vàcua) i, per a cada opció,
col·loca les altres amb **MRV per ILS** —la ILS amb menys caselles disponibles
primer— podant la branca tan bon punt alguna es queda sense cap casella. Amb les
pistes que fixen una sola casella, el mètode antic trigava més d'un minut; ara és
instantani, i els recomptes són idèntics (verificats també per força bruta).

---

## 11. Dificultats i mides

| Dificultat | Graella | ILS col·locades | Centres | Tipus de pistes |
|---|---|---|---|---|
| Molt fàcil | 5×5 | 5 | 4 | Torn + centre + objecte + «al costat» |
| Fàcil | 6×6 – 7×7 | 6–7 | 4–5 | + cantonades i «única ILS de la sala» |
| Mitjà | 7×7 – 8×8 | 7–8 | 5–7 | + companyia («anava amb») i distàncies de fila/columna |
| Difícil | 9×9 | 9 | 6 | repertori d'objectes, centre i cantonades, amb moltes candidates |
| Expert | 10×10+ | 10+ | 7–10 | + regles generals d'escena (pendent) |

Nota: al 9×9 les pistes de **distància** (i les de relació, com «anava amb»)
queden fora del planter. No poden podar durant la cerca —només es comproven al
final— i amb 10 candidates fan explotar el nombre de branques. La dificultat del
9×9 ve de la mida, de les candidates i de la incògnita, no d'apilar tipus de
pista. La resta de casos sí que les poden fer servir.

### 11.1 La col·lecció actual

La col·lecció viu a `app/data.js` i es pot regenerar sencera amb
`python3 tools/gen_collection.py`. Cada cas es descriu a `tools/cases.py` i la seva
acta queda a `tools/atoms/<id>.json`; el detall (centres, pistes, solució i
revelació) és a **`ILSdoku-Casos.md`**.

| Id | Títol | Dificultat | Graella |
|---|---|---|---|
| `el-primer-dia` | El primer dia | molt fàcil | 5×5 |
| `la-benvinguda` | La benvinguda | molt fàcil | 5×5 |
| `lhora-del-pati` | L'hora del pati | fàcil | 6×6 |
| `lhora-destudi` | L'hora d'estudi | fàcil | 6×6 |
| `el-forat-de-lhorari` | El forat de l'horari | fàcil | 7×7 |
| `canvi-de-classe` | Canvi de classe | mitjà | 7×7 |
| `portes-obertes` | Portes obertes | mitjà | 7×7 |
| `doble-torn` | Doble torn | mitjà | 8×8 |
| `la-sala-de-professors` | La sala de professors | mitjà | 8×8 |
| `setmana-cultural` | La setmana cultural | difícil | 9×9 |
| `tot-el-curs` | Tot el curs | difícil | 9×9 |

(El recompte de pistes, els centres, la solució i la revelació de cada cas són a
`ILSdoku-Casos.md`, generat amb `tools/make_cases_doc.py`. Per refer només
`app/data.js` des de les actes, sense tornar a generar: `tools/make_data.py`.)

> ℹ️ Tots els casos mantenen la convenció del joc: **una sola candidata sense
> plaça** i sempre la **Laura M**. El tauler és quadrat (una ILS per fila i
> columna) i la meitat superior del tauler és Matí i la inferior, Tarda; per tant,
> a cada cas hi ha **una candidata de matí més que places de matí**.

---

## 12. Pistes i solució

- **Pistes del joc:** cada cas pot incloure una seqüència de pistes humanes
  («Pista 1/N») i, opcionalment, els passos de resolució complets.
- **Resolució:** el joc valida la col·locació i revela la ILS **sense plaça**.
- Missatges (proposta):
  - Èxit: «**Horari quadrat!** Has trobat qui es queda sense plaça: **{nom}**.» + la
    frase `reveal` del cas, que explica **per què** (quina era l'última plaça i quina
    pista la descartava, §5.1).
  - Fallada: «**Gairebé…** Hi ha ILS mal col·locades. Torna-ho a provar!»
  - Incomplert: «No has col·locat tothom! {correctes} de {total} correctes.»

---

## 13. Interfície (implementada v0.1)

> ✅ **Ja implementada** a `app/` (`index.html` com a portada, `joc.html` com a joc, `landing.css`/`landing.js`, `style.css`, `app.js`, `data.js`).
> Vegeu `app/README.md` per executar-la i per afegir casos. Captures a
> `ref/shot_app.png` (inici), `ref/shot_app_autoX.png` (amb X automàtiques),
> `ref/shot_glossari.png` (glossari), `ref/shot_app_solved.png` (resolt) i
> `ref/shot_app_mobil.png` (mòbil, 430 px).
>
> 🖨️ Les **plantilles imprimibles** són a `app/plantilla.html` (vegeu §13.1).

Reaprofitant la del Murdoku:

- **Llista de casos** amb filtres per dificultat i mini-preview del tauler.
- **Pantalla de joc:** targetes d'ILS amb la seva pista; tauler amb centres acolorits,
  plaques de demanda, objectes educatius, rètols dels centres i coordenades R/C.
- **Eines:** X (descartar cel·les), esborrador, desfer.
- **Glossari:** modal amb la imatge i la descripció de cada objecte (ocupables i
  obstacles) i dels símbols del tauler (nota, fitxa, X, demanda…). Dades a
  `glossary` de cada cas.
- **Bombolla d'ajuda:** en passar el cursor per una casella (o amb el focus del
  teclat) s'hi llegeix què hi ha: el nom de l'objecte i si és ocupable
  («Catifa · ocupable — FEP Aprenents»), la ILS col·locada amb el seu torn, les
  notes, el centre de la casella amb la seva demanda i, si és una X automàtica,
  per què està descartada. Els elements interns de la casella no reben el cursor
  (`pointer-events: none`), així que l'atribut `data-tip` va a la casella; els
  elements amb informació rellevant també porten `aria-label` per als lectors de
  pantalla. Captura a `ref/shot_bombolla.png`.
- **Ajudes automàtiques:** en col·locar una ILS es descarten soles la seva fila i
  columna (i les caselles d'un centre ja ple); no es pot fer nota ni col·locar-hi res.
  Les X noves **apareixen de manera esglaonada** (de la fitxa cap enfora, ~45 ms entre
  cadascuna) amb una petita animació; si el sistema demana menys moviment
  (`prefers-reduced-motion`), l'animació no es fa.
- **Notes i X:** les notes queden **per sobre** de la imatge de l'objecte (amb un fons
  clar per llegir-les bé) i la X de descartar és **gruixuda, gran i fosca** (dibuixada amb
  dues barres, així escala amb la mida de la cel·la; el to és el mateix que el de les
  **vores dels centres**). La X que marques tu és una mica més gruixuda que l'automàtica,
  per no confondre-les.
- **Interacció:** tocar = nota; prémer i mantenir = col·locar; arrossegar = pintar notes.
- **Botons:** Pista, ENVIA, COM ES JUGA, compartir, imprimir, opcions.
- **Tema:** fosc/clar; opcions d'accessibilitat i de visualització (mida d'objectes, gruix
  de parets, ressaltar centre en passar-hi per sobre…).
- **Extra:** mostrar el «forat» (cel·la sense cobrir) quan es revela la incògnita.

### 13.1 Plantilles imprimibles ✅

Full A4 llest per imprimir o desar en PDF, generat des de les **mateixes dades i imatges**
que el joc (`app/plantilla.html`, `app/print.js`, `app/print.css`):

- **Full 1 — Enunciat:** capçalera (títol, mida, dificultat), línia *Nom/Data*, regles,
  **tauler amb coordenades R/C** i els objectes il·lustrats, i la **llista de candidates
  amb la seva pista**.
- **Full 2 — Glossari:** els objectes (amb imatge i descripció), agrupats en ocupables i
  no ocupables, i els símbols i conceptes.
- **Full 3 — Solució** (opcional): tauler resolt amb les inicials, la llista de
  col·locacions, **qui es queda sense plaça** i la frase `reveal` que explica el perquè.
- **Controls (només pantalla):** tria de cas (o *tots els casos*), caselles per incloure
  o treure el glossari i la solució, botó **🖨️ Imprimir / Desar PDF**.
- Els colors i els fons surten impresos gràcies a `print-color-adjust: exact`.
- Exemple generat: `ref/plantilla-el-forat-de-lhorari.pdf`. Captura:
  `ref/shot_plantilla.png`.

---

## 14. Pendent de decidir

**Encara obert:**
1. **Sexe de cada ILS:** per defecte s'ha assignat pel nom (Oscar i José Javier, homes; la
   resta, dones). Cal **confirmar-ho** perquè les pistes de gènere siguin correctes.
2. **Idioma:** només català (decidit). *(Pendent: confirmar si algun dia caldrà anglès.)*

**Ja decidit:**
- Incògnita: **N + 1 candidates, amb pista negativa decisiva** i frase de revelació (§5.1).
- **Laura M = matins** i **sempre** és qui es queda sense plaça; Laura G = tardes.
- Alba i Ingrid **flexibles**; Lluna **eliminada**.
- Alumnes amb diverses ILS: **pista avançada opcional**.
- Només **Matí i Tarda**.
- Demandes dels centres: **les reals** (FEP Aprenents 3, Salvador Seguí 2, Escola del Treball 2, resta 1).
- Objectes educatius: **llista de §8 aprovada**.
- Idioma: **només català**.
- Noms reals: **aprovat**.
- Format final: **app web jugable + plantilles imprimibles**.

---

## 15. Properes passes suggerides

1. ~~Generar un cas de mostra validat~~ ✅ fet (`ILSdoku-Cas-Mostra.md`).
2. ~~Implementar la interfície jugable~~ ✅ fet (`app/`).
3. ~~Generar més casos i una col·lecció amb dificultats~~ ✅ fet: 5 casos
   («molt fàcil» → «difícil») a `app/data.js`, generats amb `tools/gen_collection.py`
   i verificats amb `tools/test_solvable.py` (§10, §11.1).
4. ~~Plantilles imprimibles~~ ✅ fet (`app/plantilla.html`, §13.1).
5. **Ampliar l'app:** tema fosc, guardar partida, cronòmetre i opcions d'accessibilitat.
6. Confirmar formalment la **privacitat** de fer servir noms reals.
7. **Més varietat de casos:** graelles no quadrades, ILS flexibles (Alba, Ingrid) i els
   casos amb pistes d'alumnes (§4.1) per a graelles de 10×10 o més.

---

*Document de treball. Els noms de centres i d'ILS són les dades facilitades per l'usuari.*
