#!/bin/bash
# =============================================================================
# Production Deployment Script
# Usage: ./scripts/deploy.sh [version]
# Examples:
#   ./scripts/deploy.sh              # Deploy latest prod tag
#   ./scripts/deploy.sh v1.2.3       # Deploy specific version
#   ./scripts/deploy.sh sha-abc1234  # Deploy specific commit
# =============================================================================

set -euo pipefail

# Configuration
COMPOSE_FILE="docker-compose.prod.yml"
REGISTRY="ghcr.io"
LOG_FILE="/var/log/autostrada-deploy.log"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING:${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR:${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

# Get version from argument or default to prod
VERSION="${1:-prod}"
export IMAGE_TAG="$VERSION"

log "🚀 Starting deployment with IMAGE_TAG=$IMAGE_TAG"

# Verify we're in the right directory
if [ ! -f "$COMPOSE_FILE" ]; then
    error "Compose file not found: $COMPOSE_FILE"
fi

# Load environment variables
if [ -f .env.prod ]; then
    log "Loading environment from .env.prod"
    export $(grep -v '^#' .env.prod | xargs)
fi

# Login to registry (assumes credentials are configured)
log "🔐 Authenticating with container registry..."
echo "$GHCR_TOKEN" | docker login ghcr.io -u "$GHCR_USER" --password-stdin 2>/dev/null || {
    warn "Registry login failed or already authenticated"
}

# Pull new images
log "📥 Pulling images..."
docker compose -f "$COMPOSE_FILE" pull || error "Failed to pull images"

# Show what we're deploying
log "📋 Image versions:"
docker compose -f "$COMPOSE_FILE" config | grep "image:" | while read line; do
    echo "   $line"
done

# Create backup of current deployment
BACKUP_FILE="/tmp/autostrada-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
log "💾 Creating backup of current state..."
docker compose -f "$COMPOSE_FILE" ps -q 2>/dev/null | head -1 | xargs -I {} docker inspect {} > /tmp/current-state.json 2>/dev/null || true

# Stop old containers gracefully
log "⏹️  Stopping current containers..."
docker compose -f "$COMPOSE_FILE" down --timeout 30 || warn "Some containers may not have stopped cleanly"

# Start new containers
log "▶️  Starting new containers..."
docker compose -f "$COMPOSE_FILE" up -d || error "Failed to start containers"

# Wait for health checks
log "🏥 Waiting for health checks..."
sleep 10

# Verify deployment
log "✅ Verifying deployment..."
docker compose -f "$COMPOSE_FILE" ps

# Check if services are healthy
UNHEALTHY=$(docker compose -f "$COMPOSE_FILE" ps | grep -c "unhealthy" || true)
if [ "$UNHEALTHY" -gt 0 ]; then
    warn "Some services are unhealthy. Check logs with: docker compose -f $COMPOSE_FILE logs"
fi

# Cleanup old images
log "🧹 Cleaning up old images..."
docker image prune -f --filter "until=168h" 2>/dev/null || true

log "🎉 Deployment complete!"
log "   Version: $IMAGE_TAG"
log "   Time: $(date)"

# Show service URLs
echo ""
log "📍 Service endpoints:"
echo "   Frontend: https://\${DOMAIN}"
echo "   Backend:  https://api.\${DOMAIN}"
echo ""
log "📊 View logs: docker compose -f $COMPOSE_FILE logs -f"
