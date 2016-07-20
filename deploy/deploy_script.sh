#!/usr/bin/env bash

python project/manage.py collectstatic --noinput

gunicorn project.project.wsgi --bind 127.0.0.1:8000 --daemon --workers=3