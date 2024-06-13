FROM python:3

# Set the working directory in the container
WORKDIR /

# Install dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
COPY . .

ENV PYTHONUNBUFFERED=1

# Run the application
CMD ["python","manage.py","runserver","0.0.0.0:8002"]

