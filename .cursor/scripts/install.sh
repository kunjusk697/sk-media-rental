#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../.."

npm ci
npx prisma generate
npx prisma db push --skip-generate
npm run db:seed
