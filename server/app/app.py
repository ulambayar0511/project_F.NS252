from flask import jsonify
from flask import Flask, request, session
from flaskext.mysql import MySQL
from Crypto.Hash import SHA224
app = Flask(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'users'
app.config['MYSQL_DATABASE_HOST'] = 'db'
mysql.init_app(app)

# Get all user data
@app.route('/')
def users():
    conn = mysql.connect()
    cursor = conn.cursor()
    sql = "SELECT * FROM user"
    cursor.execute(sql)
    rows = cursor.fetchall()
    resp = jsonify(rows)
    resp.status_code = 200
    return resp

# Log into 
@app.route("/login", methods=['POST'])
def login():
    conn = mysql.connect()
    cursor = conn.cursor()
    data = request.form

    password = data['password']
    email = data['email']

    hash_value = SHA224.new()
    hash_value.update(password.encode("utf-8"))
    password = hash_value.hexdigest()
    query_string = """SELECT * FROM user WHERE email=%s AND password=%s"""
    values = (email, password)
    cursor.execute(
        query_string, values)
    user = cursor.fetchall()
    if user:
        return {"success": True}
    else:
        return {"success": False}

# Log out
@ app.route("/logout", methods=['GET'])
def logout():
    session['login'] = False
    return session

# Sign up
@ app.route("/signup", methods=['POST'])
def signup():
    conn = mysql.connect()
    cursor = conn.cursor()
    data = request.form
    username = data['username']
    password = data['password']
    email = data['email']
    hash_value = SHA224.new()
    hash_value.update(password.encode("utf-8"))
    # save db
    password = hash_value.hexdigest()
    query_string = """SELECT * FROM user WHERE email=%s AND password=%s"""
    values = (email, password)
    cursor.execute(
        query_string, values)
    user = cursor.fetchall()
    if user:
        return {"success": False}
    query_string = """INSERT  INTO user (username, email, password) VALUES (%s,%s,%s)"""
    values = (username, email, password)

    user = cursor.execute(query_string, values)
    conn.commit()
    return {"success": True}


if __name__ == "__main__":
    app.run(host='0.0.0.0')