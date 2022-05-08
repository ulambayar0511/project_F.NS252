## Nmap port scanning tool implement Python script

# Setup
```
 - apt install docker.io
 - docker build -t nmap .
 - docker run -dit -p 5000:5000 nmap
```

# Usage
```
 - curl localhost:5000 **response: hello world**
 - curl localhost:5000/portscan?host=IP_NAME&ports="comma between ports"
 ```
