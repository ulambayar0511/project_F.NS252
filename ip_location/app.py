import requests
import dotenv

line = dotenv.get_key(".env","LINE")

with open("/var/log/apache2/access.log",'r') as f:
    data = f.readlines()

for i in range(line,len(data),1):
    ip_address = i[:i.index('-')-1]
    response = requests.get("https://api.hackertarget.com/geoip/?q="+ip_address)
    result = response.text.split('\n')
    print(result)
dotenv.set_key(".env","LINE",len(data))
