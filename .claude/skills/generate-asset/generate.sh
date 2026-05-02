#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 2 ]; then
  cat >&2 <<EOF
Usage: $0 <output-path> <prompt> [size] [background]
  output-path  target file (e.g. app/entity/building/farm/icon.png)
  prompt       text description for gpt-image-1
  size         1024x1024 (default) | 1024x1536 | 1536x1024 | auto
  background   transparent (default) | opaque
EOF
  exit 1
fi

if [ -z "${OPENAI_API_KEY:-}" ]; then
  echo "Error: OPENAI_API_KEY env var not set" >&2
  exit 1
fi

for cmd in curl jq base64; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "Error: missing required command: $cmd" >&2
    exit 1
  fi
done

OUT="$1"
PROMPT="$2"
SIZE="${3:-1024x1024}"
BG="${4:-transparent}"

mkdir -p "$(dirname "$OUT")"

PAYLOAD=$(jq -n \
  --arg prompt "$PROMPT" \
  --arg size "$SIZE" \
  --arg bg "$BG" \
  '{model: "gpt-image-1", prompt: $prompt, size: $size, background: $bg, output_format: "png", n: 1}')

RESPONSE=$(curl -sS -X POST https://api.openai.com/v1/images/generations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")

if echo "$RESPONSE" | jq -e '.error' >/dev/null 2>&1; then
  echo "API error:" >&2
  echo "$RESPONSE" | jq '.error' >&2
  exit 1
fi

B64=$(echo "$RESPONSE" | jq -r '.data[0].b64_json // empty')
if [ -z "$B64" ]; then
  echo "Error: no image data in response" >&2
  echo "$RESPONSE" >&2
  exit 1
fi

echo "$B64" | base64 -d > "$OUT"
echo "Saved: $OUT"
