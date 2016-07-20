FROM python:3.4
ENV PYTHONUNBUFFERED 1

RUN mkdir /webapp
WORKDIR /webapp/

# Install pip dependencies
COPY requirements.txt requirements.txt
COPY prod-requirements.txt prod-requirements.txt
RUN pip install -r requirements.txt \
    && pip install -r prod-requirements.txt

# Copy the project
COPY . /webapp/

EXPOSE 5000

CMD python ./project/manage.py runserver 0.0.0.0:5000
# CMD ["./project/deploy/deploy_script.sh"]
