# Cloudflare Pages Deployment

This guide prepares the project for static hosting on Cloudflare Pages. Pages can host the **frontend UI** only. The APK/ABB/IPA build pipeline still requires a separate backend+worker stack (Redis, BullMQ, Android/Gradle toolchain) which cannot run inside Pages/Workers due to runtime and sandbox limits.

## What you need

- A reachable backend endpoint (your own deployment or another compatible service).
- Cloudflare Pages project connected to this repository.
- Optional: a Cloudflare Worker as a **simple reverse proxy** if you want API calls to stay on the same domain; it is not required if your backend already handles CORS.

## Build configuration

- **Framework preset**: None (Vite/React).
- **Build command**: `pnpm --filter frontend build`
- **Output directory**: `packages/frontend/dist`
- **Node version**: 18+ (matches Vite defaults).
- **Install command**: `pnpm install --frozen-lockfile` (Pages will install pnpm automatically when `pnpm-lock.yaml` is present).

## Required environment variables

Set these in the Pages project settings:

- `VITE_API_BASE_URL` — URL of your backend API, e.g. `https://api.example.com`. Leave empty only if you deploy a proxy at `/api` on the same origin.
- `VITE_GITHUB_REPO` (optional) — repository slug for the star badge, default `keithhegit/apk_converter`.

## Network flow

- Frontend calls are built against `VITE_API_BASE_URL`, falling back to relative `/api/...` paths during local dev.
- If you need same-origin calls on Pages, add a lightweight Worker that proxies `/api/*` to your backend. No build logic should run in that Worker; it only forwards requests.

## Local preview (mirrors Pages)

```bash
pnpm install
pnpm --filter frontend build
pnpm --filter frontend preview --host
# Visit http://localhost:4173
```

Run your backend separately and set `VITE_API_BASE_URL` via `.env` or command line during `pnpm --filter frontend dev`/`build` for consistent behavior.

