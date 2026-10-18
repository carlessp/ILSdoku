# Murdoku — Especificació completa del joc

> Document d'enginyeria inversa del joc **Murdoku** (https://murdoku.com/play/) creat a
> partir de l'anàlisi dels *bundles* JavaScript, del catàleg de puzles i dels fitxers
> JSON de cada cas, complementat amb la inspecció de la interfície en viu.
> Objectiu: servir de base per construir una nova versió del joc.
>
> Fonts analitzades:
> - `/play/assets/index-*.js`, `app-core-*.js`, `puzzle-core-*.js`, `generator-*.js`, `lang-data-*.js`
> - `https://murdoku.com/play_puzzles/_puzzleCatalog.json`
> - `https://murdoku.com/play_puzzles/en/{id}.json` (64 casos descarregats)
> - Interfície en viu (mode alfa, 40 puzles visibles sense compte)

---

## 1. Concepte i objectiu

**Murdoku** és un joc de lògica deductiva tipus *logic grid puzzle* ambientat en escenes
de crim. Cada cas presenta:

- Una **escena** (una graella, normalment quadrada) dividida en **zones/àrees** (habitacions, jardins, carrers…).
- Un conjunt de **personatges** (suspectes) i **una víctima**.
- Un conjunt de **pistes** (una per personatge + possibles pistes generals d'escena).

**Objectiu:** col·locar tots els personatges a la graella de manera que es compleixin
totes les pistes i, d'aquesta manera, determinar **qui és l'assassí**.

**Regla clau de l'assassinat:** l'assassí és l'únic personatge que estava
**sol amb la víctima** (tots dos a la mateixa àrea i cap altre personatge en aquella àrea).
Un cop col·locats tots els personatges correctament, l'assassí queda determinat.

Al final, el jugador **envia** la solució (botó ENVIA / SUBMIT). El joc valida les
posicions i nomena l'assassí, la víctima i el símbol de cada un.

---

## 2. El tauler

### 2.1 Graella i coordenades

- Normalment la graella és **quadrada**, però **no sempre**: hi ha casos rectangulars
  (p. ex. **11×9** amb 9 personatges i **12×14** amb 12 personatges). Mides observades de
  **5×5 fins a 16×16**. Quan W = H = nombre de personatges, es compleix "una persona per
  fila i per columna"; en graelles rectangulars la restricció és que **no hi hagi mai dues
  persones a la mateixa fila ni a la mateixa columna** (com a molt una per línia).
- Convenció interna (JSON): `solution_x_N` = **columna** (0-indexada, esquerra→dreta),
  `solution_y_N` = **fila** (0-indexada, dalt→baix).
- Convenció mostrada al jugador (pistes): **`R{fila} C{columna}`** amb **índex 1**.
  Exemple: `solution_x=3, solution_y=4` → la pista ho anomena **R5 C4**.
- Cada casella fa `cellsize = 150` px al sistema de dibuix original.
  El centre en píxels d'una casella és:
  `x_px = grid_rx + x*150 + 75`, `y_px = grid_ry + y*150 + 75`.
- Les coordenades dels cartells de lletra (`letter_xpos_N`, `letter_ypos_N`) ja venen
  calculades seguint aquesta fórmula.

### 2.2 Zones, àrees i subàrees

- Una **àrea** (també dita *room*, *zone*, *area*) és **una secció tancada de la graella**
  delimitada per **parets** (vores gruixudes). Cada casella pertany a una àrea
  (`room_code_{fila}_{columna}` = índex d'àrea).
- Una àrea té **nom** (`room_name_{idx}`), **color** (`room_color_{idx}`),
  **textura de terra** (`room_texture_{idx}`, `room_texture_color_{idx}`) i
  posició del rètol (`room_name_xpos_{idx}`, `room_name_ypos_{idx}`).
- Existeixen **subàrees** (`room_subroom_{idx} = "1"` i
  `room_subroom_mainroom_{idx} = <idx àrea pare>`): trossos que es mostren com a part
  d'una àrea més gran però que poden rebre restriccions pròpies. Apareixen en unes
  poques escenes (p. ex. camps de golf, illes, cellers…).
- Àrees especials/derivades amb **flag** intern (generador): `isSea`, `isBeach`,
  `isJungle`, `isCliffs`, `isPath`, `isParkArea`, `isWoodsArea`, `isRiver`, `isPond`,
  `isStage`, `isVip`, `isBackstage`, `isStreet`, `isYard`, `isHall`, `isCabin`,
  `isWarehouse`, `isStands`, `isGrocery`, `isCashier`, `isAisle`, `isDining`,
  `isCircle`, `isShack`.
- Sobre el concepte de **"àrea pròpia"** ("his/her own area"): àrea el títol de la qual
  conté el nom del personatge (p. ex. l'àrea "Ada's Room" per a Ada).

### 2.3 Parets, portes i finestres

- **Paret**: qualsevol vora negra gruixuda, inclosa la vora exterior de la graella.
- **Porta** (`obj_door.svg`, id 18) i **finestra** (`obj_window.svg`, id 0): elements de
  pas. "In front of" (davant de) es defineix com **les dues caselles connectades per una
  porta o finestra**. Els objectes 0/18/33 i "Void" (id 8) tenen `occupiable = null`
  (caselles especials: ni s'hi pot estar, ni són obstacles "sòlids" normals).
- Les finestres es dibuixen derivant les obertures de les parets (flag `hasWindows`),
  no pas com a objecte de casella (l'id 0 de la taula és un *placeholder*).

### 2.4 Cantonades i vores

- **Cantonada (corner)**: casella a la intersecció de dues (o tres) parets d'una àrea.
- **Vora (edge)**: casella al llarg d'una paret.
- **Border**: casella al llarg del límit exterior de la graella.
- **Cantonada de la graella (corner of the grid)**: cantonada formada pel límit exterior.

---

## 3. Caselles i objectes

Cada casella pot portar un **objecte** a sobre (moble, planta, vehicle, animal…).
El valor `room_objects_{fila}_{columna}` és l'**id de l'objecte**; **`0` = casella buida**
(sòl, sense objecte). Hi ha també objectes a sobre d'objectes: `carpet_objects_*`
(catifa) i `room_objects_frame_*` (variant/marc de l'objecte).

L'atribut clau és **`occupiable`**:

| valor | significat |
|---|---|
| `true` (1) | **S'hi pot col·locar un personatge** (cadira, catifa, llit, vehicle, animal…) |
| `false` (0) | **Obstacle**: no s'hi pot col·locar ningú (taula, planta, prestatge…) |
| `null` (-1) | **Especial**: finestra/forat/porta ("Void"); ni ocupable ni obstacle sòlid estàndard |

> Regla: els suspectes **només** es col·loquen en caselles ocupables; la resta (taules,
> arbres, etc.) bloquegen el pas. Els objectes grans (llit, cotxe, vaixell) **cobreixen
> diverses caselles però només se n'ocupa una**.

### 3.1 Objectes ocupables (`occupiable = true`)

`Chair`(2) · `Carpet`(5) · `Bed`(6,7,119,120) · `Horse`(15,137) · `Painting`(19) ·
`Car`(21,22) · `Sand`(24) · `Rowboat`(25) · `House`(27) · `Puddle`(34) · `Camel`(40) ·
`Cat`(50) · `Bus`(56) · `Flag/Forat`(58) · `Mammoth`(59) · `Bow`(61) · `Fish`(62) ·
`Berries`(63) · `Wolf`(64) · `Tool`(65) · `Golf Cart`(71) · `Sloop`(73,77,113) ·
`Frigate`(74,112) · `Boat`(76) · `Tee`(78) · `Carriage`(90) · `Ox`(91) · `Monkey`(96) ·
`Anubis Symbol`(108) · `Ra Symbol`(109) · `Brig`(110) · `Galleon`(111) · `Raft`(124) ·
`Hammock`(129,130) · `Oil Slick`(138) · `Paint Spill`(139) · `Path`(140) ·
`Portable Toilet`(147) · `Black Cat`(151)

### 3.2 Objectes no ocupables / obstacles (`occupiable = false`)

`Plant`(1) · `TV`(3) · `Table`(4) · `Crate`(9) · `Tree`(10,11,69,99,100) · `Fire`(12) ·
`Shelf`(13) · `Trashcan`(14) · `Cactus`(16) · `Cow`(17) · `Statue`(20,105,114) ·
`Rubble`(23) · `Shark`(26) · `Register`(28,94,141) · `Present`(29,30,31) · `Barrel`(32,133) ·
`Boar`(35) · `Weapons`(36,115) · `Shrub`(37) · `Jar`(38) · `Catapult`(39) · `Pumpkin`(41) ·
`Box`(42) · `Boulder`(43,75) · `Bonsai`(44) · `Locker`(45) · `Punching Bag`(46) · `Lion`(47) ·
`Pig`(48) · `Gas Pump`(49) · `Grain`(51) · `Crocodile`(52) · `Bear`(53) · `Elephant`(54) ·
`Penguin`(55) · `Cone`(57) · `Basket`(60) · `Stump`(66) · `Bones`(67) · `Sabertooth`(68) ·
`Shell`(70) · `Water`(72) · `Lily Pad`(79,104) · `Flowers`(80) · `Easel`(81) · `Camera`(82) ·
`Safe`(83,92) · `Buffalo`(84) · `Tombstone`(85) · `Piano`(86) · `Hay`(87) · `Coal`(88) ·
`Sack`(89) · `Dynamite`(93) · `Treasure`(95) · `Gold Vein`(97) · `Mining Cart`(98) ·
`Obelisk`(101) · `Column`(102,131) · `Block`(103) · `Sarcophagus`(106,107) · `Sphinx`(116) ·
`Chest`(117,118,132) · `Papyrus`(121) · `Rope`(123) · `Cannon`(125–128) ·
`Time Machine`(134) · `Teddy Bear`(135) · `Something`(136) · `Drum Set`(145) ·
`Pyro Fire`(146) · `Speaker`(148) · `Sign`(149) · `Lamppost`(150)

### 3.3 Objectes especials (`occupiable = null`)

`Window`(0) · `Void`(8) · `Door`(18) · `Void show Back`(33)

> La llista completa d'ids i noms viu a l'array `wt` de `puzzle-core-*.js`. Cada objecte
> té `{ id, name, occupiable, file }` on `file` és el SVG (`obj_*.svg`).
> El nom mostrat depèn de l'idioma (`room_objects` localitzat via `lang-data`).

---

## 4. Personatges

Cada puzle declara `total_char` personatges, indexats de `0` a `total_char-1`.
Els tipus de les 100+ claus del bloc `CHARACTERS` (amb `N` = índex):

| clau | significat |
|---|---|
| `char_name_N` | Nom mostrat |
| `char_sex_N` | `0` = home, `1` = dona (determina "He/She", colors ♂/♀) |
| `char_quote_en_N` | **Text de la pista** del personatge (en anglès; hi ha variants `_es/_fr/_nl/_pt`) |
| `char_subquote_en_N` | Subtext de la pista (opcional) |
| `char_avatar_N` | Id / configuració d'avatar |
| `char_class_N` | Classe/rang del personatge (p. ex. presoner, guarda, zookeeper) |
| `char_body_N`, `char_skincolor_N`, `char_hair_N`, `char_haircolor_N`, `char_clothes_N`, `char_clothescolor_N`, `char_hat_N`, `char_accessory_N`, `char_facial_N`, `char_theme_N` | Components visuals de l'avatar (cos, pell, cabell, roba, barret, accessori, facial, tema) + variants `*_hex_N` |
| `char_bgcolor_N` | Color de fons de la targeta |
| `solution_x_N`, `solution_y_N` | **Solució**: columna (x) i fila (y) |
| `letter_xpos_N`, `letter_ypos_N` | Posició en píxels de la lletra al tauler |

- **Víctima**: l'últim personatge (índex `total_char-1`) és la víctima. La seva pista és
  `<b>The Victim.</b> ... was alone with the murderer.` (o `<b>The Victim.</b>` en mode "open").
- **Assassí**: índex a `PROPERTIES.murderer`. És el personatge (no víctima) que estava
  **sol amb la víctima**; la seva posició no té cap restricció especial a la resta de pistes.
- **Símbol/lletra**: a la graella, cada personatge es marca amb la seva **inicial**
  (A, B, C, …) i la víctima amb **V**. (Algunes escenes usen lletres com A–J per a un
  subconjunt específic.)

### 4.1 Avatars

Els avatars es componen per capes (cos, pell, cabell amb color, roba amb color, barret,
accessori, element facial, tema). Són **purament estètics**: cap deducció no pot dependre
de l'aspecte, tret que una pista ho digui explícitament (ulleres, barrets…).

---

## 5. Regles del joc

1. **Com a molt una persona per fila i per columna**. Si la graella és quadrada i hi ha
   tants personatges com files/columnes, la restricció esdevé **exactament** una per fila
   i una per columna (és la restricció "global" fonamental).
2. **Occupabilitat**: només es pot col·locar un personatge en caselles ocupables.
3. **"Beside" (al costat de)** = directament adjacent **amunt/avall/esquerra/dreta**
   **I a la mateixa àrea**.
4. **Totes les pistes són certes** (no hi ha paranys).
5. La paraula **"someone"/"person"** inclou sempre la víctima.
6. La **víctima ha d'estar sola amb l'assassí** (mateixa àrea, només ells dos).
7. **Solució única**: només hi ha una col·locació vàlida; però hi pot haver diversos
   camins de deducció. **No cal endevinar mai**: tot es resol per deducció.
8. Els objectes grans ocupen diverses caselles físicament, però el personatge n'ocupa una.
9. **L'aigua es pot ocupar**, tret que es digui el contrari.
10. Tots dos sentits: "algú altre estava al costat de X" implica que l'autor de la pista
    no és aquell "algú altre".

---

## 6. Vocabulari de pistes

Cada personatge (excepte la víctima) té una llista d'**àtoms de pista** que es
renderitzen en una frase en l'idioma actiu. A continuació, la redacció **exacta en
anglès** (la que apareix al camp `char_quote_en_N`) i el significat lògic.

### 6.1 Pistes de lloc / àrea

| Àtom intern | Redacció (EN) | Significat |
|---|---|---|
| `room` | "*He/She* was **in the X**." | És dins l'àrea X. |
| `orroom` | "*He/She* was **in X** or **in Y**." | En una de les dues àrees. |
| `notRoom` | "*He/She* was **not** in the X." | No és a l'àrea X. |
| `aloneInRoom` | "*He/She* was **alone** in the X." | Únic ocupant de l'àrea X. |
| `withInRoom` | "*He/She* was **with** {Nom} in the **X**." | Amb algú altre, dins X. |
| `cornerInRoom` | "*He/She* was [**alone**] in the X." / "…, **but not in a corner**." | A l'àrea X, en/no en una cantonada. |
| `inCorner` | "*He/She* was [**not**] in a **corner** of {his/her} area." | Cantonada de la seva pròpia àrea. |
| `notCorner` | "*He/She* was **not** in a **corner** of {his/her} area." | No a la cantonada. |
| `cornerRoom` | "*He/She* was **alone** in {his/her} area, in a **corner**." | Sol i en cantonada. |
| `cornerGrid` | "*He/She* was [**alone**] in {his/her} area, in a **corner of the grid**." | Cantonada de la graella. |
| `otherbeside` | "**Someone else** was **beside** {the X} in {his/her} area." | Hi ha algú altre al costat de X. |
| `genderinroom` | "There was a **{man/woman}** in {his/her} area." | Hi ha un home/dona a la seva àrea. |

### 6.2 Pistes de relació

| Àtom | Redacció (EN) | Significat |
|---|---|---|
| `beside` | "*He/She* was **beside** {the/a X}." | Adjacent i mateixa àrea. |
| `notbeside` | "*He/She* was **not beside** {the/a X}." | No adjacent. |
| `on` | "*He/She* was **on** {the/a X}." / "was **in** the car." | Sobre un objecte. |
| `withChar` | "*He/She* was **with** {Nom}." | Mateixa àrea que un altre. |
| `alonewith` | "*He/She* was **alone** with {Nom}." | Només ells dos a l'àrea. |
| `alone` | "*He/She* was **alone**." | Únic a la seva àrea. |
| `onlyon` | "*He/She* was the **only** person on {the X}." / "…**sitting in a chair**." | Únic sobre aquell objecte. |
| `onlyBeside` | "*He/She* was the **only** person **beside** {the X}." | Únic adjacent a X. |
| `withOnly` | "*He/She* was with the **only** person {on the X / sitting in a chair}." | Amb l'únic que és sobre X. |
| `victim` | "**The Victim.** *He/She* was **alone** with the **murderer**." | La víctima. |

### 6.3 Pistes de posició absoluta/relativa

| Àtom | Redacció (EN) | Significat |
|---|---|---|
| `absRow` | "*He/She* was in **the top row** / **the Nth row from the top** / **the bottom row** / **the middle row**." | Fila absoluta. |
| `absCol` | "*He/She* was in **the first column** / **the Nth column from the left** / **the last column**." | Columna absoluta. |
| `rowOffset` | "*He/She* was **exactly N rows** {**north/south**} of {Nom}." | Desplaçament exacte de files. |
| `colOffset` | "*He/She* was **exactly N columns** {**west/east**} of {Nom}." | Desplaçament exacte de columnes. |
| `compass` | "*He/She* was **{north/south/east/west/northeast/…}** of {Nom}." | Direcció cardinal (qualsevol àrea). |

> Les direccions (`north/south/east/west` + diagonals) s'apliquen a **qualsevol casella**
> en aquella direcció, en qualsevol àrea, tret que la pista digui el contrari.
> Existeix una opció d'usuari *"Plain directions"* que substitueix nord→"above",
> sud→"under", est→"to the right of", oest→"to the left of".

### 6.4 Pistes generals d'escena (no lligades a un personatge)

S'emmagatzemen a `PROPERTIES.general_clue_0` / `general_clue_1` i a
`clue_custom_text1..3` (text lliure). Els tipus suportats pel generador:

| Àtom | Redacció (EN) |
|---|---|
| `noEmptyRoom` | "**No room** was empty." |
| `oneOnType` (chair) | "Exactly **one** person was sitting in a **chair**." |
| `oneOnType` (bed) | "Exactly **one** person was on a **bed**." |

A més, els puzles reals fan servir **text personalitzat** lliure, per exemple:

- "Every man was beside a table."
- "For every man beside a table, a woman was beside the same table."
- "There was a man and a woman on the Altar."
- "Every island had a unique number of occupants (0 is possible)."
- "Everyone from A to J is a Prisoner. Everyone else is a Guard."
- "Each Habitat had at least one Zookeeper in it."
- "Each camera had exactly one person beside it."
- "No one was in the River."
- "Either the top row or the bottom row was empty."
- "No area contained exactly one person."
- "There are five office owners. All owners occupy their own office."
- "There was exactly one person on a bed/chair/carpet/beside a table/beside a barrel."
- "No room was empty." / "There was exactly one empty area."

> Aquests textos permeten regles d'escena avançades (lleis de comptatge, categories de
> personatges via `char_class_N`, condicions sobre rètols, etc.). Són clau per a la
> varietat de casos difícils i expert.

### 6.5 Àtoms interns del generador (referència)

Tipus d'àtom complets que el generador pot emetre (vegeu el `switch` a
`generator-*.js`): `room`, `orroom`, `notRoom`, `beside`, `notbeside`, `on`, `alone`,
`with`, `onlyon`, `onlyBeside`, `withOnly`, `cornerRoom`, `cornerGrid`, `otherbeside`,
`genderinroom`, `inCorner`, `notCorner`, `absRow`, `absCol`, `alonewith`, `rowOffset`,
`colOffset`, `compass`. Els tipus **"avançats"** (que compten per a la dificultat) són
`cornerRoom`, `cornerGrid`, `inCorner`, `notCorner`, `onlyBeside`, `withOnly`, `otherbeside`,
`genderinroom`, `absRow`, `absCol`, i combinacions "unique/only".

---

## 7. Mode "classic" vs "open victim"

- **`victimMode = "classic"`** (per defecte): la víctima és un personatge més, amb pista
  "The Victim. … alone with the murderer." i la seva targeta es mostra.
- **`victimMode = "open"`**: la víctima és coneguda d'entrada i la seva pista és només
  "**The Victim.**". El generador exigeix que la víctima sigui **l'últim** a col·locar-se
  (és a dir, la seva posició es dedueix la darrera).
- (`victimcard_visible` controla si es mostra la targeta de la víctima.)

---

## 8. Dificultats

Etiquetes (EN / CA): `very easy` (Molt fàcil) · `easy` (Fàcil) · `medium` (Mitjà) ·
`hard` (Difícil) · `expert` (Expert).

Orientativament, cada nivell es correspon amb una mida de graella:

| Dificultat | Mida típica |
|---|---|
| very easy | 5×5 – 6×6 |
| easy | 5×5 – 8×8 |
| medium | 6×6 – 11×11 |
| hard | 9×9 – 14×14 |
| expert | 12×12 – 16×16 |

**Gating del generador** (paràmetres interns `GENERATOR_DIFFICULTIES = [easy, medium, hard]`,
`GENERATOR_SIZES = [6,7,8,9]`):

- `requireInstantPin` (nivells fàcils): exigeix que hi hagi **≥ 1 "pin instantani"**
  (una casella que quedi forçada immediatament).
- **`instantPins`** (pins immediats) ≤ 2 (easy) o ≤ 1 (medium/hard).
- **`positionalCount`** (pistes absolutes/relatives: `absRow`, `absCol`, `rowOffset`,
  `colOffset`, `compass`) ≤ 1 (easy/medium) o ≤ 2 (hard).
- **`advancedCount`** (pistes avançades) = 0 per a nivells sense avançades; > 0 per als
  que en requereixen; medium n'exigeix alguna.
- La **víctima s'ha de col·locar gairebé al final** (posició ≥ `len-2` a l'ordre de
  col·locació).
- Si l'escena té **pista general**, aquesta no ha de fer el puzle trivial
  (amb la pista, la solució ha de seguir sent única i no resolta immediatament).
- Es comprova que la solució sigui **única** (`count === 1`) i que el solucionador
  lògic resolgui el puzle completament.

---

## 9. Generador de puzles

Funcions exportades (mòdul `generator-*.js`):
`generatePuzzleRaw` / `generatePuzzle` / `generatePlayable` / `finishPlayable` /
`verifyPuzzleJson` / `scenarioToPuzzleJson` / `useGeneratedPuzzle` /
`GENERATOR_DIFFICULTIES` / `GENERATOR_SIZES` / `GENERATOR_BUILD` (= `"v142-badge-default"`).

Paràmetres d'entrada:

```
{
  size: 9,                     // 6..9 per al generador immediat
  difficulty: "medium",        // easy | medium | hard
  seed: <int>,                 // reproduïble
  roomFunk: 0,                 // nombre d'àrees "irregulars"/subàrees
  generalClue: false,          // si s'afegeix una pista general
  victimMode: "classic",       // classic | open
  template: "auto",            // plantilla d'escena
  requireInstantPin: false,
  keepDefaultColors: false,
  language: "en"
}
```

**Plantilles d'escena (`template`):** `auto`, `classic`, `central`, `island`, `street`,
`yard`, `cross`, `circle`, `restaurant`, `beach`, `park`, `woods`, `warehouse`,
`concert`, `donut`, `grocery`, `warren`, `store`.
(`auto` tria i, si cal, degrada a `classic` per a mides petites. Cada plantilla genera
un patró de parets/àrees diferent: illes, carrers, escenaris, etc.)

**Procés intern:**
1. Genera disposició de parets/zones segons la plantilla.
2. Col·loca objectes a les caselles (sòl, catifes, mobles, obstacles).
3. Assigna **una solució** i selecciona un **assassí** (la víctima queda a la seva àrea, sola).
4. Genera les pistes dels personatges de manera que la solució sigui **única**.
5. Passa un **solucionador lògic** que verifica unicitat i resolubilitat sense endevinar.
6. Aplica els *gates* de dificultat; reintenta amb altres llavors fins a complir.
7. Exporta el JSON del puzle (`scenarioToPuzzleJson`) + metadades del generador.

El solucionador intern (`ve`, `xe`) produeix també els **passos de la solució**
(`solutionSteps`) en llenguatge humà (col·locacions i deduccions "avançades").

---

## 10. Sistema de pistes i solucions

- **Pistes humanes**: `player_hint_1_en`, `player_hint_2_en`, … (`player_hint_01` per al
  primer). Al joc es mostren amb el botó **"💡 Pista"** ("Pista 1/5" amb navegació ‹ ›).
  El nombre de pistes varia per cas.
- **Passos de solució**: `solution_text_EN_0` … `solution_text_EN_19` (també `_FR_`).
  Descriuen la resolució completa pas a pas, incloent-hi el veredicte final
  (p. ex. "…Esha is the murderer!").
- **Modal de resultat**:
  - Èxit: "**Correct!** You solved the puzzle! The murderer was {name}."
  - Resolució completa: "You've found the murderer! **{assassí}** ({símbol}) killed
    **{víctima}** ({símbol})!"
  - Fallada: "**Not quite…** Some suspects are in the wrong place. Try again!"
  - Incomplert: "You did not find everyone's position! {correctes} de {total} correct.
    The murderer escaped!"
- **Mode competició**: només **el primer enviament compta**; un error desqualifica per
  a la classificació (leaderboard).
- Hi ha ajuda **"Com es juga"** (How to Play) amb objectiu, regles, controls, eines,
  paraules clau, glossari, FAQ i **tècniques avançades**:
  1. Analitzar fila per fila / columna per columna.
  2. Vigilar files/columnes sobrecarregades (dues persones en dues files ⇒ ningú més).
  3. Eliminar caselles d'intersecció (rectangles de restricció).

---

## 11. Format de dades del puzle

Cada puzle és un JSON amb dues seccions: **`PROPERTIES`** i **`CHARACTERS`**
(les claus `room_*` i `char_*` barregen àrees i personatges al mateix bloc `CHARACTERS`).

### 11.1 `PROPERTIES`

| Camp | Tipus | Descripció |
|---|---|---|
| `puzzle_version` | string | Versió del format (p. ex. `"2"`) |
| `grid_w`, `grid_h` | string-num | Amplada i alçada en caselles |
| `grid_rx`, `grid_ry` | string-num | Origen en píxels de la graella |
| `cellsize` | string-num | Mida de casella (150) |
| `total_char` / `total_chars` | string-num | Nombre de personatges |
| `murderer` | string-num | Índex de l'assassí |
| `difficulty` | string-num | Camp **llegat/ambigu** (valors 0–4); la dificultat fiable és la del catàleg (`_puzzleCatalog.json`) |
| `total_rooms_` | string-num | Nombre d'àrees |
| `total_grids` | string-num | Nombre de graelles (normalment 1) |
| `grid_theme`, `grid_objets_theme`, `background_no`, `background_path` | string | Tema visual |
| `clue_0`, `clue_1` | string-num | Índexs/indicadors de pistes especials (p. ex. `101`, `102`) |
| `clue_custom_text1..3` | string | Text de pistes personalitzades |
| `clue_preset_N` | string | Preset de pista |
| `general_clue_0`, `general_clue_1` | string | Pistes generals d'escena |
| `player_hint_N_en`, `player_hint_N_markers` | string | Pistes humanes + marcadors |
| `player_hint_count` | string-num | Nombre de pistes |
| `solution_text_EN_0..19`, `solution_text_FR_0..19` | string | Passos de la solució |
| `victimcard_visible` | string-num/bool | Mostrar targeta de víctima |
| `instructions_in_white` | bool | Estil de les instruccions |
| `language` | string | Idioma del fitxer |
| `title_en_`, `title_es_`, … | string | Títol (normalment al catàleg) |
| `creator_` | string | Autor |

### 11.2 `CHARACTERS`

Cada casella té 4 claus: `room_code_{f}_{c}`, `room_objects_{f}_{c}`,
`room_objects_frame_{f}_{c}`, `carpet_objects_{f}_{c}` i `carpet_objects_frame_{f}_{c}`.

**Casella:**
- `room_code_{f}_{c}`: índex d'àrea de la casella.
- `room_objects_{f}_{c}`: id d'objecte (0 = buit).
- `room_objects_frame_{f}_{c}`: variant/marc de l'objecte (−1 = cap).
- `carpet_objects_{f}_{c}`: id d'objecte de catifa (normalment 5 = Carpet).
- `carpet_objects_frame_{f}_{c}`: variant de la catifa.

**Àrees (per índex `i`):**
`room_name_i`, `room_color_i`, `room_texture_i`, `room_texture_color_i`,
`room_height_i`, `room_color_0_i`, `room_color_1_i`, `room_name_xpos_i`,
`room_name_ypos_i`, `room_subroom_i`, `room_subroom_mainroom_i`.

**Personatges (per índex `N`):** vegeu la taula de la secció 4.

**Colors d'objecte:** `obj_color_base_{id}`, `obj_color_overlay_{id}`.

---

## 12. Interfície i UX

### 12.1 Selecció de puzles (llista)

- Categories del catàleg: **free** (32), **sense categoria** (28), **uncategorized** (7),
  **secret** (2), **premium** (1). (El total del catàleg és de 70 casos; en mode alfa i
  sense compte se'n mostren 40.)
- Filtres per **dificultat** (all / very easy / easy / medium / hard / expert).
- Ordenació (per defecte per dificultat), **amagar completats**, **amagar no publicats**.
- Cada targeta mostra un **mini-preview** de la graella; si ja està resolt, es pot amagar
  la solució a la preview (opció *"Hide solution for completed puzzles"*).

### 12.2 Pantalla de joc

- **Targetes de sospitós** (amb nom, símbol A/B/C…, avatar i la pista) + la targeta de
  la víctima (V). Mode retrat o llista (opció).
- **Graella** amb zones acolorides, objectes, rètols d'àrea i etiquetes R1..Rn / C1..Cn
  (visibles sempre o només amb pista, segons opció).
- **Eines**: `X` (marcar caselles impossibles), **esborrador** (tocar = esborrar una
  casella; mantenir = esborrar totes), **DESFER** (undo).
- **Interacció**:
  - Clic a sospitós → seleccionar.
  - Clic a casella → afegir/treure **nota** (lletra petita).
  - **Prémer i mantenir** una casella → **col·locar** el sospitós (lletra gran).
  - **Arrossegar** → pintar notes en diverses caselles.
  - Opció *Auto-X on Place*: autocompleta X a la fila/columna en col·locar.
- **Botons**: 💡 Pista, ENVIA (submit), COM ES JOUA (How to Play), ? (ajuda), ↗ compartir,
  🖨 imprimir, 🔇 so, ⚙ opcions, (timer de temps).
- **Opcions destacades**: volum, idioma, mode fosc, efectes de so, hàptica, animació
  d'obertura (pop / blocs / llanterna), animacions, mostrar temps, mode retrat, zoom de
  pista, auto-X, evitar X en caselles no ocupables, símbols ♂/♀, estil de sospitós
  col·locat (lletra/retrat), direccions planeres, ocultar solució de completats;
  avançades: tooltips de paraules clau, ombra sota caselles no ocupables, auto-escala de
  graella, ressaltar àrea en passar el ratolí, mida de rètol, opacitat de textura,
  gruix de paret, mida de la X, mostrar coordenades sempre, mida d'objectes.

### 12.3 Tutorial (primer contacte)

En obrir un puzle per primer cop apareix un tutorial pas a pas (ex., en català):
selecció del personatge, escriure notes tocant la graella, prémer i mantenir per col·locar,
marcar amb X, etc. Text clau: *"Toca la graella per escriure una nota, o mantén premut per
col·locar aquest personatge."*

---

## 13. Plataforma tècnica

- **Frontend**: SPA React + **Vite** (base `/play/`), CSS propi (tema clar/fosc).
- **Assets**: imatges SVG d'objectes (`obj_*.svg`), avatars, textures de terra, fons.
- **Contingut estàtic**: `play_puzzles/_puzzleCatalog.json` (+ `play_puzzles/en/{id}.json`
  i variants d'idioma `play_puzzles/{lang}/{id}-{lang}.json`).
- **Backend de comptes/progrés**: **Firebase** (`murdoku-c0640-default-rtdb.firebaseio.com`)
  + *cloud functions* (`getServerTime`, `purchasePremiumPuzzle`).
  - Progrés desat per usuari; els puzles **secret** es desbloquegen via `unlockedSecrets`.
  - `premium`: es compren (`ownedPremiumPuzzles`) o es gaudeixen gratis amb VIP
    (`canPlayPremiumFree`).
- **Generador**: es pot executar al client (web worker `genWorker-*.js`) per a
  administradors (mode `"generate"`) i per a un **mode Arcade** (Time Attack, etc.).
- **Estat**: en **ALPHA** ("Benvingut a la versió alfa").

---

## 14. Checklist per a la reimplementació

**Model de dades mínim d'un cas:**
1. Graella `W×H`, costat de casella, origen.
2. Mapa de caselles: `areaId`, `objectId` (+ catifa), i per a cada objecte el flag
   `occupiable` (true/false/null).
3. Llista d'àrees amb nom, color, textura, geometria (parets → conjunt de caselles).
4. Personatges: nom, sexe, pista (àtoms/text), posició solució, és-víctima.
5. Índex d'assassí.
6. Pistes generals / text personalitzat.
7. Pistes humanes i (opcional) passos de solució.

**Motor de regles a implementar:**
- Restricció "1 per fila i columna".
- Col·locació només en caselles ocupables.
- Avaluació d'àrea (pertinença), adjacència-*beside* (adjacent + mateixa àrea),
  *with*/*alone*/*alone with*, *on*, *only*, cantonades, files/columnes absolutes,
  offsets i brúixola.
- Regla de tancament: **víctima sola amb l'assassí** → identificació de l'assassí.
- Validador d'unicitat (solucionador lògic per constraint propagation + backtracking) i
  generador amb reintents i *gates* de dificultat.

**Decisions de disseny a prendre:**
- Mida/escala de graella i nombre de personatges per dificultat.
- Idiomes i sistema de localització de noms d'objecte i de textos de pista.
- Suport de subàrees i de plantilles d'escena.
- Gestió de progressos/leaderboard (o prescindir-ne).
- Estil visual (avatar per capes, textures de terra, parets).

---

*Document generat a partir de l'anàlisi del joc en viu i dels seus fitxers. Les solucions
detallades de tots els casos descarregats són a `Murdoku-Solucions.md`.*
