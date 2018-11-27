#!/usr/bin/python3

import time
import board
import requests

from busio import I2C
import adafruit_bme680

# Create library object using our Bus I2C port
i2c = I2C(board.SCL, board.SDA)
bme680 = adafruit_bme680.Adafruit_BME680_I2C(i2c, debug=False)

# change this to match the location's pressure (hPa) at sea level
bme680.sea_level_pressure = 1013.25

temp = round((bme680.temperature * (9/5) + 32), 2)
gas = bme680.gas
rh = round(bme680.humidity, 1)
pressure = round(bme680.pressure, 1)
altitude = round(bme680.altitude, 1)

URL = "http://cs.uml.edu/~gjohnson/php/middleman.php"
PARAMS = {'temp': temp, 'pressure': pressure, 'rh': rh}

response = requests.get(url = URL, params = PARAMS)

print ("api response: %s" %response.text)