# Kerfodrász weboldal fejlesztési útmutató

I am using [Bun](https://bun.sh), because it's much more faster, but you can do everything without Bun.

There is a .githooks folder with automated scripts that run. There is a pre-commit that runs checks automaticly, but you need to set it up one time, to use it. Run:

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
