#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import subprocess

def main():
    # Run npm build command first
    if os.name == 'nt':
        npm_build = subprocess.Popen(["npm", "run", "build"], cwd="viteapp/", shell=True)
    else:
        npm_build = subprocess.Popen(["npm", "run", "build"], cwd="viteapp/")
    npm_build.wait()  # Wait for npm build to finish
    
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'django-main.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    # no change, see if CI/CD works
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
