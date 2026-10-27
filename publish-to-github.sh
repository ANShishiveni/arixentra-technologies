#!/usr/bin/env bash
# Publish this website to a NEW repository owned by the connected GitHub account.
# Requires Git and the authenticated GitHub CLI: https://cli.github.com/
set -euo pipefail

OWNER="ANShishiveni"
REPO="arixentra-technologies"
VISIBILITY="private"
if [[ "${1:-}" == "--public" ]]; then VISIBILITY="public"; fi

command -v gh >/dev/null || { echo "Install GitHub CLI from https://cli.github.com/"; exit 1; }
command -v git >/dev/null || { echo "Git must be installed."; exit 1; }
gh auth status >/dev/null || { echo "Log in with: gh auth login"; exit 1; }

if gh repo view "$OWNER/$REPO" >/dev/null 2>&1; then
  echo "Repository $OWNER/$REPO already exists. Refusing to overwrite it."
  exit 1
fi

if [[ ! -d .git ]]; then git init -b main; fi
if ! git rev-parse HEAD >/dev/null 2>&1; then
  git add .
  git -c user.name='Arixentra Technologies' -c user.email='arixentra@gmail.com' commit -m 'Build Arixentra Technologies business website'
fi

gh repo create "$OWNER/$REPO" "--$VISIBILITY" --source=. --remote=origin --push \
  --description='Official website for Arixentra Technologies — software, networks and cybersecurity consulting.'

echo "Repository created: https://github.com/$OWNER/$REPO"
echo "To publish GitHub Pages from a public repo, open Settings > Pages."
