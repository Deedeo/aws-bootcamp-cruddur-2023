FROM python:3.10-slim-buster

WORKDIR /backend-flask

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

# Update repository

RUN apt-get update 

# installs curl for health checks
RUN apt-get install -y curl

ENV FLASK_ENV=development

EXPOSE ${PORT}
CMD ["./run-script.sh"]