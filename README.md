# Kerfodrász weboldal fejlesztési útmutató

## Fejlesztői biztonsági frissítés (2026-10-28)

SvelteKit 3 és Vite 8, legalább Node.js 22.17; CI-ben Node 24.
Telepítés a Bun lockfájlból: `bun install --frozen-lockfile`.
A fejlesztői indítás továbbra is `bun run dev`.

A framework beállításai a `vite.config.ts` fájlba kerültek. A belső importok
`#lib/` kezdetűek, explicit kiterjesztéssel; a futásidejű környezeti változókat
a `src/env.ts` deklarálja. A backend-URL csak HTTP(S), beágyazott hitelesítés nélkül.

A CSP **Report-Only**, tehát diagnosztika, nem blokkoló védelem. A framework
kezeli saját inline scriptjeinek nonce/hash értékeit; a fejlesztői websocket
az aktuális frontend-eredetre korlátozott. Google Fonts, a Google-értékelés ikonja
külön engedélyezett. A böngésző azonos eredetű űrlap- és médiaútvonalat használ. Inline stílusok az
átmenetek és stílusattribútumok miatt szükségesek. A `/csp-report` 204-et ad,
riporttartalmat nem tárol vagy naplóz. A diagnosztika a böngésző konzoljában látható.

A privát BACKEND_URL kizárólag szerveroldali adatlekérésre szolgál. A böngésző
nem kap backendcímet. Az Umami-eredet futásidőben kerül a report-only CSP-be.
A blokkoló CSP és az élesítés későbbi feladat.

Az audit egy alacsony besorolású `deepmerge` jelzést mutat (`GHSA-gcqx-w48m-w2h4`),
amelyhez a frissítéskor nincs javított kiadás. A Svelte Vite-plugin helyi
konfigurációkat fésül össze vele; csak megbízható konfigurációval indíts buildet/dev
szervert. Auditkivétel és tranzitív override nem került be.

I am using [Bun](https://bun.sh), because it's much more faster, but you can do everything without Bun.

There is a .githooks folder with automated scripts that run. There is a pre-commit that runs checks automaticly, but you need to set it up one time, to use it. BUT you need Bun for this!!! Run:

```bash
git config core.hooksPath .githooks
```

## First steps:

### 1. Clone the repo

### 2. Install dependecies

```bash
bun install
# or use npm
npm install
```

### Start DEV server

```bash
bun run dev
# or use npm
npm run dev
```

## Environment variables

Create a local env file from the example:

```bash
cp .env.example .env
```

Required frontend variables:

- `BACKEND_URL`: Laravel API base URL (default fallback in code: `http://127.0.0.1:8000`)
- `CONTACT_PROXY_SECRET`: private shared secret (at least 32 characters), matching the backend.
  Browser submissions use same-origin `/api/contact`; the server signs the internal request.
  Configure adapter-node `ADDRESS_HEADER=x-forwarded-for`, `XFF_DEPTH=1` only behind the
  verified Traefik proxy without direct public ports. The proxy must overwrite/validate the chain.

Contact form spam protection uses a hidden honeypot field, so the frontend must keep the hidden `website` input empty.

## Docker / preprod

Build with `docker build -t kertfodrasz-frontend:preprod .`; no public backend build argument is needed.
Set `BACKEND_URL` to the internal service, `CONTACT_PROXY_SECRET` to the shared secret,
and `PROTOCOL_HEADER=x-forwarded-proto` behind the trusted Traefik proxy.
Use `BODY_SIZE_LIMIT=32768`; the contact relay also checks streamed body size. Do not publish the frontend's container port 3000
directly on the VPS; route through Traefik.

The image defaults to `NO_INDEX=true`, which adds an `X-Robots-Tag` header to
dynamic responses for preprod. This does not provide authentication and does not
change static files such as robots.txt. Explicitly set `NO_INDEX=false` when the
production site is ready for indexing. `.dockerignore` excludes local environment
files and generated build/dependency directories.

## Workflow

### 1. Choose an issue you want to work on.

### 2. Pull main branch

```bash
git checkout main
git pull origin main
```

### 3. Make new branch

```bash
git checkout -b feature/[whatever]
```

### 4. Code

```bash
# Test locally
bun run dev
```

### 5. There is automatic checks pre-commmit using GitHub hooks, but you need to configure them to make them run automaticly if you dont want that use these befere commiting:

```bash
bun run lint
# or
npm run lint

bun run check
# or
npm run check

bun run build
# or
npm run build
```

### 6. Commit

```bash
git add .
git commit -m "[Usefull message]"
```

### 7. Push to your branch

```bash
git push origin feature/[whatever]
```

### 8. Open a pull request
