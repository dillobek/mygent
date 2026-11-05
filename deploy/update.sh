#!/usr/bin/env bash
set -euo pipefail

cd /opt/mygent

git fetch origin main

current_commit="$(git rev-parse HEAD)"
remote_commit="$(git rev-parse origin/main)"

if [[ "$current_commit" == "$remote_commit" ]]; then
  exit 0
fi

git merge --ff-only origin/main
docker compose up -d --build --remove-orphans

