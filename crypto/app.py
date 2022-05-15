from flask import Flask,send_from_directory
from Crypto.PublicKey import RSA
import zipfile
def generate(bit_size):
    keys = RSA.generate(bit_size)
    return keys


app = Flask(__name__)
DOWNLOAD_DIRECTORY = "./"

@app.route('/')
def index():
    return "hello world"
@app.route("/keys")
def key():
    keys= generate(2048)
    with open("public.key",'wb') as file:
        file.write(keys.publickey().export_key("OpenSSH"))
    print("Private Key:")
    print(keys.export_key('PEM').decode())
    with open("private.key",'wb') as file:
        file.write(keys.export_key('PEM'))
    zipfolder = zipfile.ZipFile('keys.zip','w', compression = zipfile.ZIP_DEFLATED)
    zipfolder.write("public.key")
    zipfolder.write("private.key")
    return send_from_directory(DOWNLOAD_DIRECTORY, "keys.zip", as_attachment=True)

if __name__ == "__main__":
    app.run(host='0.0.0.0')