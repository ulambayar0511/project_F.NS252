## nmap port scanning tool implement python script

# setup
 - apt install docker.io
 - docker build -t nmap .
 - docker run -dit -p 5000:5000 nmap

# usage
 - curl localhost:5000 **response: hello world**
 - curl localhost:5000/portscan?host=IP_NAME&ports="ports between commo"