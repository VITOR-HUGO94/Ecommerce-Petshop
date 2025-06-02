# syntax=docker/dockerfile:1
FROM python:3.11-slim

# 1. Definições iniciais
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# 2. Instalação de dependências
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copia o código do projeto
COPY . .

# 4. Cria diretórios para estáticos e mídia
RUN mkdir -p /vol/static && \
    mkdir -p /vol/media

# 5. Coleta arquivos estáticos
RUN python manage.py collectstatic --noinput

# 6. Expõe porta e define comando de execução
EXPOSE 8000
#CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
# Para desenvolvimento: usa o runserver do Django com reload automático
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]