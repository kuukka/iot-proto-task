# Steps in raspi
# --------------
# pip3 install requests
# pip3 install PyJWT
# python3 test.py
# {'deviceName': 'Sensor 3', 'date': '2022-04-05T18:35:11.178Z', 'value': '22.3', '_id': '624c61afd62eb8a1462bf42e', '__v': 0}
from temperature import sendTemp

sendTemp("Sensor 3", 22.3)