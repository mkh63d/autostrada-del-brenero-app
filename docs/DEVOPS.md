# DevOps & Deployment Guide

This document describes the CI/CD pipeline, Docker setup, and deployment process for the Autostrada del Brenero application.

## 📁 Mono-Repo Structure

```
autostrada-del-brenero-app/
├── .github/
│   └── workflows/
│       ├── ci.yml           # Build & push on main
│       └── release.yml      # Promote to prod on tag
├── backend/                  # Django REST API
│   ├── Dockerfile
│   └── ...
├── frontend/                 # Nuxt.js PWA
│   ├── Dockerfile
│   └── ...
├── scripts/
│   └── deploy.sh            # Production deployment script
├── docker-compose.yml        # Development (builds images)
├── docker-compose.prod.yml   # Production (pulls images only)
├── .env.prod.example        # Production env template
└── README.md
```

## 🏷️ Tagging Strategy

| Tag Format | Trigger | Usage |
|------------|---------|-------|
| `dev` | Push to main | Latest development build |
| `sha-<commit>` | Push to main | Immutable, traceable build |
| `prod` | Git tag push | Production deployment |
| `vX.Y.Z` | Git tag push | Semantic version |
| `latest` | Git tag push | Alias for latest release |
| `pr-<number>` | Pull request | PR preview (not pushed) |

### Image Names

All images are published to GitHub Container Registry (GHCR):

```
ghcr.io/<owner>/autostrada-backend:<tag>
ghcr.io/<owner>/autostrada-frontend:<tag>
```

## 🔄 CI/CD Pipelines

### CI Pipeline (ci.yml)

Triggered on every push to `main`:

1. **Detect changes** - Only rebuild services with changed files
2. **Build images** - Multi-stage Docker builds with caching
3. **Push to GHCR** - Tags: `dev` + `sha-<commit>`
4. **Create manifest** - Deployment metadata artifact

### Release Pipeline (release.yml)

Triggered when a Git tag (`v*.*.*`) is pushed:

1. **Validate** - Ensure source images exist
2. **Promote** - Retag images (NO rebuild)
3. **Create release** - GitHub Release with notes
4. **Notify** - Optional webhook

## 🚀 Development Workflow

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/<owner>/autostrada-del-brenero.git
cd autostrada-del-brenero-app

# Start development environment
docker compose up -d --build

# Initialize sample data
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py init_attractions
docker compose exec backend python manage.py createsuperuser
```

### Access Points

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000/api
- Django Admin: http://localhost:8000/admin

### Hot Reload

Both services support hot reload in development:
- Frontend changes are detected automatically
- Backend changes trigger Django's auto-reload

## 📦 Building Images Locally

```bash
# Build all services
docker compose build

# Build specific service
docker compose build backend
docker compose build frontend

# Build for production
docker compose build --target production
```

## 🎯 Production Deployment

### Prerequisites

1. Server with Docker & Docker Compose installed
2. Access to GHCR (personal access token or GITHUB_TOKEN)
3. Domain configured with DNS pointing to server
4. `.env.prod` file with secrets (copy from `.env.prod.example`)

### Deploy Steps

```bash
# Option 1: Using deploy script
./scripts/deploy.sh v1.0.0

# Option 2: Manual deployment
export IMAGE_TAG=prod  # or specific version like v1.0.0
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

### First-Time Setup

```bash
# Run migrations
docker compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Collect static files
docker compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput

# Create admin user
docker compose -f docker-compose.prod.yml exec backend python manage.py createsuperuser

# (Optional) Load sample data
docker compose -f docker-compose.prod.yml exec backend python manage.py init_attractions
```

### Rollback

```bash
# Deploy previous version
./scripts/deploy.sh v0.9.0

# Or manually
export IMAGE_TAG=v0.9.0
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

## 🏗️ Creating a Release

### Automated Release

```bash
# 1. Ensure all changes are pushed to main
git checkout main
git pull origin main

# 2. Wait for CI to complete and images to be built

# 3. Create and push a tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# 4. The release pipeline will:
#    - Verify the sha-<commit> images exist
#    - Retag them as prod, v1.0.0, latest
#    - Create a GitHub Release
```

### Manual Release (Emergency)

```bash
# If you need to release a specific commit
docker pull ghcr.io/<owner>/autostrada-backend:sha-abc1234
docker tag ghcr.io/<owner>/autostrada-backend:sha-abc1234 ghcr.io/<owner>/autostrada-backend:prod
docker push ghcr.io/<owner>/autostrada-backend:prod
```

## 🔒 Security Considerations

1. **Secrets Management**
   - Never commit `.env.prod` to Git
   - Use GitHub Secrets for CI/CD
   - Rotate secrets regularly

2. **Image Scanning**
   - GHCR automatically scans for vulnerabilities
   - Review security alerts in GitHub

3. **Network Security**
   - Internal services use `internal` network
   - Only frontend/backend exposed via `web` network

## 📊 Monitoring & Logs

```bash
# View logs
docker compose -f docker-compose.prod.yml logs -f

# View specific service logs
docker compose -f docker-compose.prod.yml logs -f backend

# Check container status
docker compose -f docker-compose.prod.yml ps

# Resource usage
docker stats
```

## 🐛 Troubleshooting

### Image Pull Errors

```bash
# Re-authenticate with GHCR
echo $GHCR_TOKEN | docker login ghcr.io -u $GHCR_USER --password-stdin
```

### Database Connection Issues

```bash
# Check if database is healthy
docker compose -f docker-compose.prod.yml ps db

# View database logs
docker compose -f docker-compose.prod.yml logs db
```

### Container Won't Start

```bash
# Check container logs
docker compose -f docker-compose.prod.yml logs backend

# Inspect container
docker inspect autostrada-backend-prod
```

## 🔧 Configuration Reference

### Environment Variables

| Variable | Service | Description | Required |
|----------|---------|-------------|----------|
| `IMAGE_TAG` | All | Docker image tag | No (default: prod) |
| `DB_PASSWORD` | db, backend | PostgreSQL password | Yes |
| `SECRET_KEY` | backend | Django secret key | Yes |
| `ALLOWED_HOSTS` | backend | Allowed host headers | Yes |
| `CORS_ALLOWED_ORIGINS` | backend | CORS origins | Yes |
| `DOMAIN` | frontend | Public domain | Yes |

### Docker Compose Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Development with hot reload |
| `docker-compose.prod.yml` | Production with Traefik |
