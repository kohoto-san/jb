#!/usr/bin/env bash

python ../manage.py migrate
python -c "import nltk; nltk.download('all')"
python ../manage.py runserver 0.0.0.0:5000

# python project/manage.py collectstatic --noinput
# gunicorn --config project/deploy/gunicorn.conf.py project.project.wsgi
