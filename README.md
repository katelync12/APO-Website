The tech stack is React + Django + Postgres

Here is how to get started
1. Put the .env file inside of the todo folder. The todo folder is the main project folder for Django. This .env file contains information about database connection, and is required for the project to run
2. Have npm, pip on your computer
3a. If you want to run the application locally, make sure all python libraries are installed. You can find them inside of the Dockerfile. Then run "python manage.py runserver 8002".
3b. If you want to run the application through Docker, have the daemon running, and call "docker build . -t django-app", then "docker run -p 8002:8002 django-app"
Follow up, to prevent memory accumulation, clear unused images and containers
4. You can modify any files while the server is up, and the server will reload and show new changes
5. If you modify a something that is part of reactapp, go inside reactapp and call "npm run build". Changes will be shown after this command is complete. You can call this while the django server is running or not
6. Before pushing, test to make sure your code complies locally and through Docker. Add any additional pip installs to the Dockerfile 
