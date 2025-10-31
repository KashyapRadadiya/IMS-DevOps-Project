FROM python:3.10-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends build-essential gcc libpq-dev && \
    rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt /app/requirements.txt
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r /app/requirements.txt

# removing build tools to shrink image bcz its only for pip install:
RUN apt-get remove -y --purge build-essential gcc && \
    apt-get autoremove -y && \
    rm -rf /var/lib/apt/lists/*

# backend source
COPY backend /app/backend

# directory for DB and set permissions
RUN mkdir -p /data && chown -R 1000:1000 /data /app

EXPOSE 5000

# Gunicorn to serve the Flask app. (backend/wsgi.py)
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "backend.wsgi:app", "--workers", "3", "--threads", "2", "--timeout", "120"]
