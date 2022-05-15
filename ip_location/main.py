import requests
import pyufw as ufw
ufw.enable()
with open("/var/log/apache2/access.log",'r') as f:
    data = f.readlines()

for i in data:

    ip_address = i[:i.index('-')-1]
    try:
            
        response = requests.get("https://api.hackertarget.com/geoip/?q="+ip_address)
        result = response.text.split('\n')
        ip = result[0].split(':')[1]
        country = result[1].split(':')[1]
        print(ip,country)
        if country !=  "Mongolia":
            rule = "deny from "+ip+"to any port 80"
            ufw.add(rule)
    except:
        print("error")
print(ufw.status())
