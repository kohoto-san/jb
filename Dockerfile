# Config for dokku

FROM python:3.4
ENV PYTHONUNBUFFERED 1

RUN mkdir /webapp
WORKDIR /webapp/

# Install pip dependencies
COPY requirements.txt requirements.txt

# COPY prod-requirements.txt prod-requirements.txt
# RUN sudo apt-get install python-dev libxml2-dev libxslt1-dev zlib1g-dev
# RUN pip install -r requirements.txt \
#    && pip install -r prod-requirements.txt

RUN pip install -r requirements.txt

# RUN python -c "import os; print(os.getcwd())"
CMD python ./project/manage.py migrate

# CMD python ./project/manage.py crontab add
RUN python -c "import nltk; nltk.download('all')"


# Copy the project
COPY . /webapp/


# CMD python ./project/manage.py makemigrations

EXPOSE 5000

CMD python ./project/manage.py runserver 0.0.0.0:5000
# CMD python ./project/manage.py collectstatic --noinput
# CMD cd project && gunicorn project.wsgi:application --bind 0.0.0.0:5000

# CMD ["./project/deploy/deploy_script.sh"]
