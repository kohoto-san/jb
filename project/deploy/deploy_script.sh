#!/usr/bin/env bash

python project/manage.py collectstatic --noinput

gunicorn --config project/deploy/gunicorn.conf.py project.project.wsgi
