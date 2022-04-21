import requests
from configparser import ConfigParser
import json
from os.path import exists
import jwt
from datetime import datetime

config = ConfigParser()
config.read('config.ini')

baseUrl = config.get("api", "baseUrl")
apiCredentials = {"email": config.get("api", "email"), "password": config.get("api", "password")}

def checkToken(token):
    try:
        decode_token = jwt.decode(token, config.get("api","secret"), algorithms=['HS256'])
        #print("Token valid")
    except jwt.ExpiredSignatureError:
        #print("Token expired. Get new one")
        return False
    except jwt.InvalidTokenError:
        #print("Invalid Token")
        return False
    return True

def doLogin():
    x = requests.post(baseUrl+"api/auth/login", json=apiCredentials)
    resp = json.dumps(x.json())
    response = json.loads(resp)

    if x.status_code == 200:
        token = response['token']

        f = open(config.get("api","tokenFile"), "w")
        f.write(response['token'])
        f.close
    return token

def getToken():
    if exists(config.get("api","tokenFile")): 
        f = open(config.get("api","tokenFile"), "r")
        token = f.read()
        f.close
        
        if checkToken(token) == True:
            return token
    
    token = doLogin()

    return token

token = getToken()


def sendTemp(name, temp):
    now = datetime.now()
    head = {'x-access-token': token}
    body = {"deviceName": name, "date": now.strftime("%Y-%m-%d %H:%M:%S.%f"), "value": temp}
       
    x = requests.post(baseUrl+"api/temperature", json=body, headers=head)

    if x.status_code == 200:
        resp = json.dumps(x.json())
        response = json.loads(resp)
        print(response)

def sendReading(name, timestamp, light, temperature, humidity, distance):
    
    try:        
        d = datetime.strptime(timestamp, "%a %b %d %H:%M:%S %Y")
    except (ValueError, TypeError, AttributeError):    
        d = datetime.now()

    head = {'x-access-token': token}
    body = {
        "deviceName": name,
        "timestamp": d.strftime("%Y-%m-%d %H:%M:%S.%f"),
        "light": light,
        "temperature": temperature,
        "humidity": humidity,
        "distance": distance
    }
       
    x = requests.post(baseUrl+"api/readings", json=body, headers=head)

    if x.status_code == 200:        
        resp = json.dumps(x.json())
        response = json.loads(resp)
        print(response)
