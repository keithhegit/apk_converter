## Architecture

```
Cloudflare Pages (Frontend) ──┐
                              ├──→ Cloudflare Worker (API) ──→ Remote Redis + Database
Cloudflare Worker (API) ──────┘
```

- **Frontend**: Cloudflare Pages
- **API**: Cloudflare Workers
- **Database**: Remote database server
- **Queue**: Redis

## Quick Start

### Build HTML File

```bash
curl -X POST https://your-api.workers.dev/api/build/html \
  -F "file=@mypage.html" \
  -F "appName=MyApp"
```

### Build React/Vite Project

```bash
# Zip your project first
zip -r myapp.zip myapp/

# Upload and build
curl -X POST https://your-api.workers.dev/api/build/zip \
  -F "file=@myapp.zip" \
  -F "appName=MyReactApp"
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/build/html` | Build APK from HTML |
| POST | `/api/build/zip` | Build APK from ZIP |
| GET | `/api/build/:taskId/status` | Check build status |
| GET | `/api/build/:taskId/download` | Download APK |
| DELETE | `/api/build/:taskId` | Cancel and cleanup |

## Environment Variables

### Frontend (Cloudflare Pages)

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | API endpoint URL |

### Backend (Cloudflare Worker)

| Variable | Description |
|----------|-------------|
| `REDIS_URL` | Redis connection string |
| `DATABASE_URL` | Database connection string |

## Project Structure

```
├── packages/
│   ├── frontend/     # React UI
│   ├── backend/      # API server
│   └── core/         # Build logic
├── docs/             # Documentation
│   ├── API.md        # API reference
│   └── REACT_PROJECT_REQUIREMENTS.md
└── scripts/          # Utility scripts
```

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Fastify, TypeScript
- **Queue**: BullMQ, Redis
- **Build**: Cordova, Capacitor, Gradle

## License

MIT
