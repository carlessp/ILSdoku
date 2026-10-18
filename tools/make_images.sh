#!/usr/bin/env bash
# Prepara les imatges dels objectes per a l'app ILSdoku.
#
#   Entrada:  Imatges/<slug>.png   (il·lustracions 1024x1024 amb fons blanc)
#   Sortida:  app/img/<slug>.png   (256x256, fons transparent, optimitzades)
#
# El fons blanc s'esborra amb un «floodfill» des de la cantonada (0,0): així
# desapareix només el fons exterior i es conserven els blancs interiors
# (pissarra, rellotge, lavabo…).
#
# Ús:  tools/make_images.sh
set -euo pipefail

cd "$(dirname "$0")/.."

SRC_DIR="Imatges"
OUT_DIR="app/img"
SLUGS="banc cadira catifa estoreta lavabo maquina_cafe ordinador pissarra prestatge rellotge taula"

if ! command -v magick >/dev/null 2>&1; then
  echo "Cal ImageMagick (ordre 'magick')." >&2
  exit 1
fi

mkdir -p "$OUT_DIR"
fets=0
for n in $SLUGS; do
  src="$SRC_DIR/$n.png"
  if [ ! -f "$src" ]; then
    echo "avís: falta $src (es deixa com està)"
    continue
  fi
  magick "$src" \
    -alpha set -fuzz 10% -fill none -draw "alpha 0,0 floodfill" \
    -trim +repage \
    -resize 236x236 -background none -gravity center -extent 256x256 \
    -strip "$OUT_DIR/$n.png"
  echo "fet: $OUT_DIR/$n.png"
  fets=$((fets + 1))
done
echo "Imatges preparades: $fets"
