# WeddingApp

A mobile-first web application designed for wedding guests to share photos, leave wishes, record voice messages, and complete photo-based wedding missions.

The project is built with React and Django and is designed to work well on mobile devices while remaining easy to deploy with Docker.

## Features

- 📸 Shared photo gallery
- 📷 Photo uploads from a device gallery or camera
- 💌 Text and anonymous wishes
- 🎙️ Voice-message recording and playback
- 🎯 Photo-based wedding missions with progress tracking
- 🖼️ Shared media storage
- 🔐 Separate administration interface
- 📱 Mobile-first responsive interface
- 🐳 Docker-based production deployment
- ⚡ Nginx + Gunicorn deployment architecture

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Framer Motion
- React Router
- Axios
- Lucide React
- React Icons
- Swiper

### Backend

- Python
- Django
- Django REST Framework
- django-cors-headers
- Pillow
- SQLite

### Media Processing

- FFmpeg
- WebM / Opus

### Deployment

- Docker
- Docker Compose
- Nginx
- Gunicorn

## Project Structure

```text
WeddingApp/
├── backend/
│   ├── backend/
│   ├── wedding/
│   ├── media/
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
│
├── docker-compose.yml
├── start.sh
├── .gitignore
└── README.md
```

## Local Development

### Requirements

- Python 3.13+
- Node.js and npm
- FFmpeg
- Git

Docker is recommended for running the complete application stack.

### Backend

Create and activate a virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate
```

On Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply migrations:

```bash
python manage.py migrate
```

Start Django:

```bash
python manage.py runserver
```

The API will be available at:

```text
http://127.0.0.1:8000
```

### Frontend

Install dependencies:

```bash
cd frontend
npm install
```

Start the development server:

```bash
npm run dev
```

To make the development server accessible from other devices on the same local network:

```bash
npm run dev -- --host
```

The development frontend is normally available at:

```text
http://localhost:5173
```

## Environment Variables

Environment-specific configuration should be kept outside the repository.

For local development, create:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

For a device on the same local network, use the development machine's local address instead.

For production, the frontend uses relative `/api/` and `/media/` paths through Nginx, so no public backend URL needs to be embedded in the frontend build.

### Backend Environment

The backend supports environment-based configuration for values such as:

```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=example.com
CORS_ALLOWED_ORIGINS=https://example.com
```

**Never commit real secrets, passwords, tokens, private keys, or production `.env` files to the repository.**

## Docker

The application can be built and started using Docker Compose:

```bash
docker compose up -d --build
```

Check the running services:

```bash
docker compose ps
```

Stop the application:

```bash
docker compose down
```

View backend logs:

```bash
docker compose logs -f backend
```

View frontend logs:

```bash
docker compose logs -f frontend
```

The production architecture is:

```text
                    Client
                      │
                      ▼
                 ┌─────────┐
                 │  Nginx  │
                 │   :80   │
                 └────┬────┘
                      │
             ┌────────┴────────┐
             │                 │
             ▼                 ▼
          Frontend          Django API
             │              + Gunicorn
             │                 │
             │                 ▼
             │              SQLite
             │
             └────── /media ────► Media storage
```

Nginx serves the compiled frontend, forwards `/api/` requests to Django, and serves uploaded media through `/media/`.

## Database and Media

The default development database is SQLite.

Uploaded files are stored under:

```text
backend/media/
```

The database and uploaded media are application data rather than source code and should be handled separately from Git.

For production deployments, make sure the database and media directory are backed up appropriately.

## Database Migrations

When changing Django models:

```bash
python manage.py makemigrations
python manage.py migrate
```

Migration files should be committed to Git.

When deploying a version containing new migrations, apply them in the deployment environment before using the updated application.

Changes to existing records, such as editing the text of a mission, do not normally require a new migration.

## Voice Messages

Voice messages are recorded in the browser and uploaded as WebM audio.

FFmpeg is used by the backend to process uploaded recordings and ensure that duration metadata is available for reliable playback information.

The audio stream is copied rather than re-encoded, avoiding unnecessary quality loss.

## File Uploads

The production Nginx configuration allows uploads up to the configured request-size limit.

If the upload limit needs to be changed, update the Nginx configuration and rebuild the frontend container:

```bash
docker compose up -d --build
```

## Administration

The application contains a separate administration area for managing application content and submitted wishes.

Administrative access should only be exposed to authorized users.

Production deployments should use HTTPS and appropriate access controls.

## Deployment

A typical deployment workflow is:

```bash
git pull
docker compose up -d --build
```

After deployment, verify the services:

```bash
docker compose ps
```

and inspect logs if necessary:

```bash
docker compose logs -f backend
docker compose logs -f frontend
```

The production environment must provide its own configuration values through environment variables.

## Security

For production use:

- Keep `DEBUG=False`
- Use a unique production `SECRET_KEY`
- Configure `ALLOWED_HOSTS`
- Configure `CORS_ALLOWED_ORIGINS`
- Do not commit `.env` files containing secrets
- Do not commit databases containing private event data
- Do not commit uploaded photos or recordings
- Use HTTPS for public deployments
- Restrict administrative access
- Maintain backups of application data

## Development Commands

### Frontend

```bash
npm install
npm run dev
npm run build
npm run lint
```

### Backend

```bash
python manage.py runserver
python manage.py migrate
python manage.py makemigrations
```

### Docker

```bash
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose down
```

## Privacy

Wedding photos, wishes, voice messages, and other uploaded content may contain personal information.

If the application is deployed publicly, access to uploaded content and administrative functionality should be configured according to the privacy requirements of the event.

Do not include real guest data, private media, credentials, or other sensitive information in the public repository.

## License

This project is provided for personal and educational use.

If you intend to reuse or distribute the project, review and adapt the license terms to the intended use.
