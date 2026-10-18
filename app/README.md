# ILSdoku — aplicació jugable (v0.1)

Primera versió **jugable** d'ILSdoku: un joc de lògica deductiva on col·loques les
**ILS (intèrprets de llengua de signes)** als centres educatius respectant les pistes,
i descobreixes **qui es queda sense plaça**.

És una app **estàtica** (HTML + CSS + JavaScript “vanilla”), sense build ni dependències.

## Com executar-la

**Opció A — obrir el fitxer directament**

Fes doble clic a `index.html` (la **portada**: selector de nivells i recursos).
Des d'allà s'obre el joc (`joc.html`), que també es pot obrir directament. Funciona perquè
tot és local i carregat amb etiquetes `<script>`; no fa cap petició de xarxa.

**Opció B — servidor local** (recomanat si vols evitar restriccions del navegador)

```bash
cd app
python3 -m http.server 8791
# obre http://localhost:8791/            (portada)
#       http://localhost:8791/joc.html   (joc)
```

## Portada i enllaços directes

La portada (`index.html` + `landing.css` + `landing.js`) llegeix les mateixes dades
(`data.js`) i mostra el **selector de nivells** (agrupa els casos per dificultat, amb una
fitxa «més casos aviat» a cada nivell), els passos del joc i els enllaços a
**instruccions**, **glossari** i **plantilles**. Si `data.js` té més casos, la portada
s'actualitza sola.

El joc admet paràmetres a l'URL: `joc.html?case=<id>` obre un cas concret,
`joc.html?ajuda` obre les instruccions i `joc.html?glossari` obre el glossari.

## Com s'hi juga

- **Objectiu:** col·locar cada ILS al seu lloc. Hi ha **N places** i **N+1 candidates**:
  una es quedarà fora. Quan quadris l'horari, es revela **qui es queda sense plaça** i,
  si el cas ho porta, una frase que explica **per què** (quina plaça quedava i quina pista
  la descartava). Cap targeta està buida: qui queda fora també porta pista, sempre una
  negació («no seia mai en cap cadira»).
- **Regles del tauler:**
  - una ILS per **fila** i una per **columna**;
  - cada **centre** (zona acolorida) ha de tenir exactament la seva **demanda**
    (la placa «cal 1/2/3»);
  - les ILS de **matí** només van a la zona Matí; les de **tarda**, a la de Tarda;
    les **flexibles**, a qualsevol;
  - no es pot col·locar ningú sobre un objecte **no ocupable** (taula, pissarra…);
    sí sobre un d'**ocupable** (cadira).

- **Controls:**
  | Acció | Gest |
  |---|---|
  | Seleccionar ILS | clic a la targeta |
  | Posar una nota | **tocar** una casella |
  | Col·locar la ILS | **mantenir premut** una casella (~0,4 s) |
  | Pintar notes | **arrossegar** el dit/ratolí |
  | Marcar caselles impossibles | botó **✕ Descartar** |
  | Netejar | botó **🧽 Esborrar** |
  | Desfer | botó **↩︎ Desfer** o `Ctrl`+`Z` |
  | Pista | botó **💡 Pista** (guia pas a pas: raonament i casella de cada ILS, i la incògnita final) |
  | Glossari d'objectes | botó **📖 Glossari** |
  | Validar | botó **ENVIA** |

- **Ajudes automàtiques:** en col·locar una ILS, la seva **fila i columna** es descarten
  totes soles (X automàtica) i, si un centre ja té la seva demanda completa, les caselles
  que li queden també es descarten. Les X automàtiques no es poden esborrar (són
  conseqüència de les regles); les que hi poses tu amb **✕ Descartar** són una mica més
  gruixudes. Quan en surten diverses de cop, apareixen **una rere l'altra** (animació curta,
  des de la fitxa cap enfora). Totes dues són fosques, com les vores dels centres.
- **Notes a la vista:** les notes (inicials) es dibuixen **per sobre** de la imatge de
  l'objecte, amb un fons clar, perquè sempre es puguin llegir.

## Estructura de fitxers

```
app/
├── index.html     # portada: selector de nivells, passos i recursos
├── landing.css    # estil de la portada
├── landing.js     # portada: llegeix data.js i munta els nivells
├── joc.html       # estructura de la pantalla de joc
├── style.css      # estil (joc i plantilles)
├── app.js         # lògica del joc (estat, render, interacció, validació)
├── data.js        # dades dels casos (afegir casos aquí)
├── img/           # imatges dels objectes (PNG 256×256, fons transparent)
├── plantilla.html # fulls imprimibles (A4)
├── print.css      # estil d'impressió
├── print.js       # generador de les plantilles
└── README.md
```

## Plantilles imprimibles

Obre **`plantilla.html`** (doble clic, o `http://localhost:8791/plantilla.html`). Genera
fulls **A4** a partir de les mateixes dades (`data.js`) i imatges (`img/`):

| Full | Contingut |
|---|---|
| 1 | Enunciat: capçalera, línia *Nom/Data*, regles, tauler amb coordenades R/C i candidates amb la seva pista |
| 2 | Glossari dels objectes (imatge + descripció) i símbols |
| 3 | Solució: tauler resolt, col·locacions, qui es queda sense plaça i la frase de revelació |

- A la barra de dalt pots triar el **cas** (o *tots els casos*) i mostrar/amagar el
  **glossari** i la **solució**.
- **🖨️ Imprimir / Desar PDF** → al diàleg d'impressió tria *Desa com a PDF*. Els colors i
  fons surten impresos (no cal activar «gràfics de fons»).
- Exemple ja generat: `ref/plantilla-el-forat-de-lhorari.pdf`.

## Imatges dels objectes

Les il·lustracions originals són a la carpeta **`Imatges/`** (1024×1024, fons blanc). Per
fer-les servir a l'app cal preparar-les (treure el fons i reduir-les):

```bash
tools/make_images.sh      # Imatges/<nom>.png → app/img/<nom>.png
```

Al fitxer de dades, tant els objectes com el glossari porten el camp **`img`** amb la ruta
relativa a `app/` (p. ex. `"img/cadira.png"`). Si una entrada no té `img`, l'app dibuixa
el seu `icon` (emoji) com a reserva.

## Afegir un cas nou

**Via recomanada (generador).** Els casos es descriuen a `tools/cases.py` (mida,
centres, planter d'ILS, llavor) i es generen amb el motor de `tools/gen_case.py`, que
tria les pistes i **garanteix** la unicitat i el disseny de la incògnita (§5.1):

```bash
cd tools
python3 gen_collection.py            # tots els casos → app/data.js + atoms/<id>.json
python3 gen_collection.py doble-torn # només un cas (la resta es conserva)
python3 test_solvable.py             # verifica tots els casos
python3 make_cases_doc.py            # ref/ILSdoku-Casos.md
python3 make_data.py                 # refà app/data.js des de les actes (ràpid)
```

Cada cas genera una **acta** a `tools/atoms/<id>.json` amb la configuració, les
pistes en cru, la solució i la frase de revelació; és el que llegeix el verificador.
Tot el catàleg fa servir el mateix solucionador; el camp `mode` de cada cas
(`tools/cases.py`) decideix el motor de cerca de pistes: `legacy` per als casos ja
publicats (greedy i fase decisiva originals, sortida congelada) i `extended` per a
la resta. Si les actes ja existeixen i només vols refer `app/data.js` sense tornar
a generar res, `python3 make_data.py` ho fa en un segon.

El solucionador aprofita que sempre hi ha **una sola candidata sense plaça**: prova
les N+1 possibilitats de qui queda fora i, per a cada opció, col·loca les altres amb
**MRV per ILS** (la ILS amb menys caselles primer). Les pistes de resolució
(`auto_hints`) es calculen amb un pressupost **de consultes, no de rellotge**, de
manera que `app/data.js` surt igual a qualsevol màquina.

Els objectes són d'una casella, tret dels casos que duen `"bench_2x1": True`
(els dos «mitjà» nous): aleshores els bancs es generen com a **parelles
horitzontals de 2×1** dins d'un mateix centre, es desen a `object_spans` de
l'acta i l'app i les plantilles els dibuixen estesos.

**Via manual.** També pots afegir un objecte a l'array `window.ILSDOKU_CASES` de
`data.js`. Esquema resumit:

```js
{
  id, title, difficulty,
  grid: { w, h },
  zones:   [{ id, name, rows:[r0,r1], color }],
  centres: [{ id, name, short, demand, zone, rect:[r0,c0,r1,c1], color }],
  objects: [{ r, c, name, icon, img, occupiable, w?, h? }],  // w/h > 1 → objecte de diverses caselles (p. ex. el banc 2×1)
  glossary:[{ name, icon, img, occupiable, desc }],       // glossari de termes (modal)
  ils:     [{ id, name, torn, initial, clue, solution:[r,c] | null }],
  reveal,  // opcional: frase que explica per què algú es queda sense plaça
  hints:   ["...", "..."]
}
```

Les posicions `solution` són `[fila, columna]` **0-indexades**; `null` indica la ILS que
es queda sense plaça. **Tothom hi ha de tenir `clue`**, també qui queda fora: com que les
pistes són totes certes, la ILS sense cel·la només pot portar negacions («no seia mai en
cap cadira»). Si una candidata es queda sense pista, la seva targeta buida regala la
resposta (vegeu `../ref/ILSdoku-Disseny.md`, §5.1).

## Estat

- ✅ **Col·lecció de casos** (12): `el-primer-dia` (5×5) i `la-benvinguda` (5×5),
  «molt fàcil»; `lhora-del-pati` (6×6), `lhora-destudi` (6×6) i `el-forat-de-lhorari`
  (7×7), «fàcil»; `canvi-de-classe` (7×7), **`portes-obertes` (7×7)**,
  `doble-torn` (8×8) i `la-sala-de-professors` (8×8), «mitjà»; **`setmana-cultural`
  (9×9)** i **`tot-el-curs` (9×9)**, «difícil»; **`horaris-setembre` (10×10)**,
  «expert». Els casos nous estrenen els **bancs de 2×1** (objectes de més d'una
  casella). El selector del topbar i de la plantilla els agrupa per dificultat.
  Detall a `../ref/ILSdoku-Casos.md`.
- ✅ Cas de mostra «El forat de l'horari» (7×7) complet i jugable, amb **8 pistes
  d'objectes, unicitat, «al costat», lloc i negacions** (sense pistes de distància), una
  **pista negativa decisiva** per a la ILS que queda fora i una **frase de revelació**
  (`reveal`) que n'explica el perquè.
- ✅ **Glossari** d'objectes i símbols (modal) i **X automàtiques** de fila/columna/centre.
- ✅ **Bombolla d'ajuda** en passar el cursor per una casella: diu quin objecte és
  (i si és ocupable), quina ILS hi ha col·locada, les notes, el centre amb la seva
  demanda o per què la casella està descartada.
- ✅ **Imatges dels objectes** (il·lustracions pròpies) al tauler, al glossari i a la llegenda,
  amb emoji de reserva si algun objecte no té imatge.
- ✅ **Plantilles imprimibles** A4 (`plantilla.html`) amb coordenades R/C, llista de pistes,
  glossari i full de solució opcional (amb la frase de revelació), per a un cas o per a tots.
- ✅ Notes, col·locació, descartar, esborrar, desfer, pistes i validació.
- ✅ Disseny responsive (escriptori i mòbil).
- ⏳ Pendent (properes versions): tema fosc, comptador de temps, guardar la partida,
  opcions d'accessibilitat.
