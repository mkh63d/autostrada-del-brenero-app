# Autostrada del Brennero - Backend API

Django REST API for managing attractions along the A22 Brennero highway.

## Features

- **Attractions API**: CRUD operations for approved attractions
- **Submissions System**: Public submission of new attractions with admin review workflow
- **Admin Dashboard**: Full Django admin interface for managing content
- **Filtering & Search**: Filter by type, highway exit, search by name/description

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attractions/` | List all active attractions |
| GET | `/api/attractions/{id}/` | Get attraction details |
| GET | `/api/attractions/featured/` | Get featured attractions |
| GET | `/api/attractions/by-exit/{exit_name}/` | Get attractions by highway exit |
| POST | `/api/submissions/` | Submit a new attraction |
| GET | `/api/submissions/{id}/status/` | Check submission status |
| GET | `/api/health/` | API health check |

### Admin Endpoints (Requires Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/attractions/` | Create new attraction |
| PUT | `/api/attractions/{id}/` | Update attraction |
| DELETE | `/api/attractions/{id}/` | Delete attraction |
| GET | `/api/submissions/` | List all submissions |
| GET | `/api/submissions/pending/` | List pending submissions |
| GET | `/api/submissions/stats/` | Get submission statistics |
| POST | `/api/submissions/{id}/review/` | Review a submission (approve/reject) |

## Setup

### 1. Create Virtual Environment

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 4. Run Migrations

```bash
python manage.py migrate
```

### 5. Create Admin User

```bash
python manage.py createsuperuser
```

### 6. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`
Admin interface at `http://localhost:8000/admin/`

## Submission Workflow

1. **User submits** via `POST /api/submissions/` with attraction data
2. **Submission created** with status `pending`
3. **Admin reviews** in Django admin or via `POST /api/submissions/{id}/review/`
4. **If approved**: New `Attraction` is created and linked to submission
5. **If rejected**: Rejection reason is recorded and visible to submitter

## Review Actions

When reviewing a submission, send:

```json
{
  "action": "approve",
  "reviewer_notes": "Optional internal notes"
}
```

or

```json
{
  "action": "reject",
  "rejection_reason": "Reason shown to submitter",
  "reviewer_notes": "Optional internal notes"
}
```

or

```json
{
  "action": "needs_changes",
  "reviewer_notes": "What needs to be changed"
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DEBUG` | Enable debug mode | `True` |
| `SECRET_KEY` | Django secret key | (dev key) |
| `ALLOWED_HOSTS` | Comma-separated hosts | `localhost,127.0.0.1` |
| `DATABASE_URL` | Database connection URL | SQLite |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins | `http://localhost:3000` |

## Production Deployment

1. Set `DEBUG=False`
2. Set a secure `SECRET_KEY`
3. Configure `DATABASE_URL` for PostgreSQL
4. Run `python manage.py collectstatic`
5. Use gunicorn: `gunicorn config.wsgi:application`
