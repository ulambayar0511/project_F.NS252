FROM python:3.8.2-slim-buster

WORKDIR app

COPY requirements.txt requirements.txt

COPY app.py app.py

RUN pip install -r requirements.txt

CMD ["python","app.py"]