FROM python:3
RUN pip install django psycopg2 selenium psycopg2-binary python-decouple django-pgtrigger APScheduler cryptography django-user-agents
COPY . .
ENV PYTHONUNBUFFERED=1
CMD ["python","manage.py","runserver","0.0.0.0:8002"]

