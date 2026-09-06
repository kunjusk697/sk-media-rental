#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

if [ ! -f prisma/dev.db ]; then
  npx prisma db push --skip-generate
  npm run db:seed
fi

echo "Database ready at prisma/dev.db"
