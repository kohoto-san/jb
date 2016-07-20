#!/usr/bin/env bash

python project/manage.py collectstatic --noinput

gunicorn --config deploy/gunicorn.conf.py project.project.wsgi
