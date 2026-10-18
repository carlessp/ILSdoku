# ILSdoku

Joc web de **lògica deductiva** (estil Sudoku) on cal col·locar les
**ILS (intèrprets de llengua de signes)** als centres educatius respectant les pistes
i esbrinar **qui es queda sense plaça**. App estàtica (HTML + CSS + JavaScript *vanilla*),
sense dependències ni build.

## Juga en línia

👉 **https://carlessp.github.io/ILSdoku/**

També es pot obrir localment: doble clic a `app/index.html`, o amb un servidor local:

```bash
cd app && python3 -m http.server 8791
```

## Estructura del repositori

| Carpeta | Contingut |
|---|---|
| `app/` | L'aplicació: portada, joc, plantilles imprimibles, dades i imatges ([README](app/README.md)) |
| `Imatges/` | Il·lustracions originals dels objectes (1024×1024) |
| `ref/` | Documentació: disseny, especificació, catàleg de casos i exemples |
| `tools/` | Generadors de casos i verificació (Python) |

## Documentació

- [`app/README.md`](app/README.md) — ús de l'app, controls, afegir casos nous
- `ref/ILSdoku-Disseny.md` — disseny del joc i de les pistes
- `ref/ILSdoku-Casos.md` — catàleg de casos publicats
- `ref/Murdoku-Especificacio.md` — especificació del motor
