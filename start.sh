#!/usr/bin/env bash

set -e

echo "        WeddingApp Launcher"

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

BACKEND_DIR="$PROJECT_DIR/backend"
FRONTEND_DIR="$PROJECT_DIR/frontend"

# -----------------------------
# Backend
# -----------------------------

echo "Uruchamianie Django..."

cd "$BACKEND_DIR"

source venv/bin/activate

python manage.py runserver 0.0.0.0:8000 &
DJANGO_PID=$!

sleep 2

# -----------------------------
# Frontend
# -----------------------------

echo "Uruchamianie Vite..."

cd "$FRONTEND_DIR"

npm run dev -- --host &
VITE_PID=$!

IP=$(hostname -I | awk '{print $1}')

echo
echo "Aplikacja uruchomiona"
echo
echo "Frontend:"
echo "  http://localhost:5173"
echo "  http://$IP:5173"
echo
echo "Backend:"
echo "  http://localhost:8000"
echo "  http://$IP:8000"
echo
echo "CTRL+C zatrzymuje oba serwery."
echo

cleanup() {
    echo
    echo "Zatrzymywanie serwerów..."
    kill $DJANGO_PID 2>/dev/null || true
    kill $VITE_PID 2>/dev/null || true
}

trap cleanup EXIT INT TERM

wait
