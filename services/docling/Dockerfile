FROM python:3.12-slim

WORKDIR /app

# Install system dependencies for Docling
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create non-root user for running the service
RUN groupadd -r docling && useradd -r -g docling -d /app -s /sbin/nologin docling

COPY app.py .

# Ensure the app directory has correct ownership
RUN chown -R docling:docling /app

# Cloud Run sets PORT env var
ENV PORT=8001
EXPOSE 8001

USER docling

CMD ["sh", "-c", "uvicorn app:app --host 0.0.0.0 --port ${PORT}"]
