FROM python:3
RUN pip install Django==3.2.4 django-cors-headers python-decouple django-pgtrigger django-user-agents djangorestframework
RUN pip install psycopg2 psycopg2-binary django-phonenumber-field[phonenumbers] django-allauth[socialaccount]
COPY . .
ENV PYTHONUNBUFFERED=1
CMD ["python","manage.py","runserver","0.0.0.0:8002"]

