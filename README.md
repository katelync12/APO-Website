The tech stack is React + Django + Postgres

Here is how to get started
1. Put the .env file inside of the todo folder. The todo folder is the main project folder for Django. This .env file contains information about database connection and is required for the project to run.
2. Have npm, pip on your computer. Use Django 3.2.4, as higher versions no longer support Postgres version 10.
3. If you want to run the application locally, make sure all Python libraries are installed. You can find them inside the Dockerfile. Then run

```
python manage.py runserver 8002
```

4. If you want to run the application through Docker, have the daemon running, and call

```
docker build . -t django-app
```
   then
```
docker run -p 8002:8002 django-app
```

5. Follow up, to prevent memory accumulation, and clear unused images and containers
6. You can modify any files while the server is up, and the server will reload and show new changes
7. If you modify something that is part of viteapp, go inside /viteapp/ and call
```
npm run build
```
   Changes will be shown after this command is complete. You can call this while the Django server is running or not.
8. Before pushing, test to ensure your code compiles locally and through Docker. Add any additional pip installs to the Dockerfile 
