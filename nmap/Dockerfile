FROM python:3.8-slim-buster
RUN apt update -y && apt install nmap -y
WORKDIR app
COPY app.py app.py
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
CMD ["python","app.py"]



