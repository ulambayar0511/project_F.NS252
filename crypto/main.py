from Crypto.PublicKey import RSA

def generate(bit_size):
    keys = RSA.generate(bit_size)
    return keys
keys = generate(2048)
print("Public key:")
print(keys.publickey().export_key('PEM').decode(), end='\n\n')
with open("public.key",'wb') as file:
    file.write(keys.publickey().export_key())
print("Private Key:")
print(keys.export_key('PEM').decode())
with open("private.key",'wb') as file:
    file.write(keys.export_key('PEM'))