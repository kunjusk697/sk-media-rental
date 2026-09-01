FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends git curl build-essential python3 openssl \
    && rm -rf /var/lib/apt/lists/* \
    && corepack enable

USER ubuntu
