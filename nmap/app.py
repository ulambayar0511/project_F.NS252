#nmap модулийг импорлож байна
import nmap
from flask import Flask,request
# portScanner нэртэй объектын PortScanner классын байгуулагч функцийг ашиглан үүсгэж байна
app = Flask(__name__)
@app.route("/")
def hello():
    return "hello world"
@app.route('/portscan')
def rustscan():
    portScanner = nmap.PortScanner()
    result = {}
    host = request.args.get('host')
    ports = request.args.get('ports')
    try:
        portScanner.scan(host,arguments='-n -p '+ports)
        result['cli'] = portScanner.command_line()
        if portScanner[host]['status']['state'] != 'up':
            return "host down"
    except:
        return "host not found"
    result['all'] = portScanner[host]
    # print(portScanner[host])
    portScanResult = []
    for protocol in portScanner[host].all_protocols():
        # print('Protocol : %s' % protocol)
        listport = portScanner[host]['tcp'].keys()
        
        for port in listport:
            portScanResult.append({"port":port,"state":portScanner[host][protocol][port]['state'],"service":portScanner[host][protocol][port]['name']})
            # print(portScanner[host][protocol][port]['name'])
            # print('Port : %s State : %s' % (port,portScanner[host][protocol][port]['state']))
    result["ports_scan_result"] = portScanResult
    return result

if __name__ == "__main__":
    app.run('0.0.0.0')