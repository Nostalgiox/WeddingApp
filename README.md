# 💍 Sandra & Dawid — WeddingApp

A mobile-first wedding application created for Sandra and Dawid's wedding on **22.08.2026**.

The application allows wedding guests to create a shared digital memory by uploading photos, recording voice messages, leaving wishes, and completing special **Wedding Missions**.

---

## ✨ Features

### 📸 Photo Gallery

Guests can:

- Upload photos from their phone gallery
- Take photos directly using their device camera
- Browse the shared wedding gallery
- Upload photos without logging in

Uploaded photos are stored by the backend in the `media/` directory.

---

### 🎙️ Voice Messages

Guests can record and upload voice messages.

The application uses:

- WebM
- Opus
- FFmpeg

Uploaded WebM files are processed by the backend using FFmpeg to ensure that correct duration metadata is available.

This allows the frontend to display the actual recording duration:

```text
00:08 / 00:08
```

instead of:

```text
00:08 / 00:00
```

The audio stream is copied without re-encoding, so the original audio quality is preserved.

---

### 💌 Wedding Wishes

Guests can leave:

- Text wishes
- Voice messages
- Signed wishes
- Anonymous wishes

A wish can contain either text or an audio recording.

---

### 🎯 Wedding Missions

The application contains a collection of special wedding photography missions.

Current missions include:

- 💃 First Dance
- 🎂 Wedding Cake
- 🤳 Selfie with the Newlyweds
- 🥂 Toast
- 🕺 Best Dance
- 💐 Bouquet
- 🎧 DJ / Band
- ✨ Decorations
- 👨‍👩‍👧 Family
- ❤️ Friends
- 👶 Youngest Guest
- 👴 Oldest Guest
- 💍 Wedding Rings
- 🍰 Dessert Table
- 🌅 Sunset
- 📸 Best Memory

Each mission has a required number of photos and displays the current progress.

---

## 🛠️ Technologies

### Frontend

- React 19
- Vite
- Tailwind CSS 4
- Framer Motion
- React Router
- Axios
- Lucide React
- React Icons
- Swiper

### Backend

- Python 3.13
- Django 6
- Django REST Framework
- django-cors-headers
- Pillow
- SQLite

### Multimedia

- FFmpeg
- WebM
- Opus

### Deployment

- Docker
- Docker Compose
- Nginx
- Gunicorn

---

## 📁 Project Structure

```text
WeddingApp/
│
├── backend/
│   ├── backend/
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── wedding/
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── media/
│   │   ├── photos/
│   │   └── wishes/
│   │
│   ├── db.sqlite3
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── manage.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── admin/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── docker-compose.yml
├── start.sh
├── .gitignore
└── README.md
```

---

# 🚀 Local Development

## Requirements

The following tools are required for local development:

- Python 3.13+
- Node.js
- npm
- FFmpeg
- Docker / Docker Compose (optional when running without Docker)

---

## 🐍 Backend — Django

Go to the backend directory:

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it.

### Linux

```bash
source venv/bin/activate
```

### Windows

```powershell
venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

Run migrations:

```bash
python manage.py migrate
```

Start Django:

```bash
python manage.py runserver
```

The backend will be available at:

```text
http://127.0.0.1:8000
```

---

# ⚛️ Frontend — React

Go to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

To make the application accessible from other devices on the same local network:

```bash
npm run dev -- --host
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# ⚙️ Environment Configuration

## Development

The development frontend uses:

```text
frontend/.env
```

Example:

```env
VITE_API_URL=http://127.0.0.1:8000
```

When accessing the application from a phone on the same local network, use the computer's local IP address:

```env
VITE_API_URL=http://192.168.x.x:8000
```

Replace the address with the actual local IP address of the development machine.

---

## Production

Production uses:

```text
frontend/.env.production
```

The production configuration intentionally uses an empty API URL:

```env
VITE_API_URL=
```

This allows the frontend to use relative URLs:

```text
/api/...
/media/...
```

Nginx then routes API requests to the Django backend.

---

# 🐳 Docker

The project includes a complete Docker Compose configuration.

Start the application with:

```bash
docker compose up -d --build
```

Check the running containers:

```bash
docker compose ps
```

The application consists of two containers:

```text
weddingapp-backend
weddingapp-frontend
```

The frontend is available at:

```text
http://localhost
```

---

## 🏗️ Docker Containers

### Backend

The Django backend runs using:

```text
Gunicorn
```

inside the backend container.

The application listens on:

```text
8000
```

The backend does not need to expose port 8000 directly to the internet.

Nginx communicates with the backend through the internal Docker network.

---

### Frontend

The frontend is built using:

```text
Node.js + Vite
```

The resulting static files are served using:

```text
Nginx
```

Nginx listens on:

```text
80
```

---

# 🌐 Nginx

Nginx is responsible for serving the frontend and routing requests.

### Frontend

```text
/
```

### Backend API

```text
/api/
```

API requests are forwarded to:

```text
backend:8000
```

### Media

```text
/media/
```

Media files are served directly by Nginx from the shared `backend/media/` directory.

This includes:

- Photos
- Voice messages
- Other uploaded media

---

## 📤 File Uploads

The Nginx upload limit is currently set to:

```nginx
client_max_body_size 10M;
```

This allows guests to upload reasonably large photos and other media while preventing excessively large requests.

---

# 🎙️ Voice Message Processing

Voice messages are recorded directly in the browser and uploaded as WebM files.

The backend uses:

```text
FFmpeg
```

to process uploaded audio files.

The audio stream is copied without re-encoding:

```text
-c:a copy
```

This preserves the original audio quality while ensuring that the resulting WebM file contains correct duration metadata.

---

# 🗄️ Database

The application uses:

```text
SQLite
```

The database file is:

```text
backend/db.sqlite3
```

Docker Compose mounts the database into the backend container:

```yaml
volumes:
  - ./backend/db.sqlite3:/app/db.sqlite3
```

This ensures that rebuilding or recreating the backend container does not remove the database.

---

# 📂 Media Storage

Uploaded files are stored in:

```text
backend/media/
```

Example structure:

```text
backend/media/
├── photos/
│   └── 2026/
│       └── 08/
│           └── 02/
│               └── image.jpg
│
└── wishes/
    └── audio/
        └── 2026/
            └── 08/
                └── 13/
                    └── wish.webm
```

The media directory is mounted into the containers where required.

This ensures that uploaded files survive Docker container recreation.

---

# 🔄 Updating the Application

When the application is already deployed on a server, pull the latest changes:

```bash
git pull
```

Then rebuild and restart the containers:

```bash
docker compose up -d --build
```

Check the status:

```bash
docker compose ps
```

---

# 🗃️ Database Changes

Not every database change requires a migration.

### Changing existing data

For example, changing the title of an existing mission does not require a migration.

Only the database data changes.

---

### Changing Django Models

If the Django model structure is changed, for example by adding a new field:

```python
class Wish(models.Model):
    ...
    new_field = models.CharField(...)
```

create a migration:

```bash
python manage.py makemigrations
```

Then apply it:

```bash
python manage.py migrate
```

The migration files must be committed to Git.

When deploying the update to the production server, the migrations must also be applied there.

---

# 📦 Production Deployment

The project is designed so that deployment to another server requires minimal configuration.

## 1. Clone the repository

```bash
git clone <REPOSITORY_URL>
cd WeddingApp
```

For an existing installation:

```bash
git pull
```

---

## 2. Create the production `.env`

Create:

```text
.env
```

in the project root.

Example:

```env
SECRET_KEY=YOUR_PRODUCTION_SECRET_KEY
DEBUG=False
ALLOWED_HOSTS=example.com
CORS_ALLOWED_ORIGINS=https://example.com
```

Adjust the values according to the server and domain configuration.

The `.env` file must not be committed to the repository.

---

## 3. Start the application

```bash
docker compose up -d --build
```

Check the containers:

```bash
docker compose ps
```

---

# 🔐 Security

For production deployments:

- Use `DEBUG=False`
- Use a unique production `SECRET_KEY`
- Configure `ALLOWED_HOSTS`
- Configure `CORS_ALLOWED_ORIGINS`
- Never commit `.env`
- Keep regular backups of `db.sqlite3`
- Keep regular backups of `backend/media/`
- Use HTTPS when exposing the application publicly

---

# 💾 Backups

The most important application data is stored in:

```text
backend/db.sqlite3
backend/media/
```

Both locations should be included in backups.

Backing up only the Git repository is **not sufficient**, because the database and uploaded media are intentionally excluded from Git.

---

# 🧪 Useful Docker Commands

### Start

```bash
docker compose up -d
```

### Build and start

```bash
docker compose up -d --build
```

### Stop

```bash
docker compose down
```

### Check status

```bash
docker compose ps
```

### Backend logs

```bash
docker compose logs -f backend
```

### Frontend logs

```bash
docker compose logs -f frontend
```

### Enter the backend container

```bash
docker compose exec backend bash
```

### Check FFmpeg

```bash
docker compose run --rm backend ffmpeg -version
```

---

# 🧪 API Testing

Check the wedding missions:

```bash
curl http://localhost/api/missions/
```

Example response:

```json
[
  {
    "id": 1,
    "title": "First Dance",
    "icon": "💃",
    "requiredPhotos": 5,
    "currentPhotos": 1,
    "order": 1
  }
]
```

---

# 🖼️ Media Testing

Test a photo:

```bash
curl -I http://localhost/media/photos/2026/08/02/image.jpg
```

Test a voice message:

```bash
curl -I http://localhost/media/wishes/audio/2026/08/13/wish.webm
```

A successfully served file should return:

```text
HTTP/1.1 200 OK
```

---

# 🔀 Application Architecture

```text
                         INTERNET
                            │
                            ▼
                     ┌─────────────┐
                     │    NGINX    │
                     │     :80     │
                     └──────┬──────┘
                            │
                 ┌──────────┼──────────┐
                 │          │          │
                 ▼          ▼          ▼
              Frontend     /api/     /media/
                 │          │          │
                 │          ▼          │
                 │       Django        │
                 │       Gunicorn      │
                 │          │          │
                 │          ▼          │
                 │       SQLite        │
                 │                     │
                 └─────────────────────┘
                            │
                            ▼
                       backend/media
```

---

# 👰🤵 Wedding

**Sandra & Dawid**

📅 **22.08.2026**

WeddingApp was created as a digital wedding memory, allowing guests to collectively create a gallery, leave wishes, record voice messages, and complete Wedding Missions.

---

## 📜 License

Private project created for Sandra and Dawid's wedding.

Not intended for public distribution or commercial use without the author's permission.
