# Tämä alkuperäinen tiedosto löytyy https://github.com/digidotcom/xbee-python/blob/master/examples/communication/ReceiveDataSample/ReceiveDataSample.py

# Copyright 2017, Digi International Inc.
#
# Permission to use, copy, modify, and/or distribute this software for any
# purpose with or without fee is hereby granted, provided that the above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
# ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
# ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
# OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

from digi.xbee.devices import XBeeDevice
import time
import ctypes
from Backend import sendReading

# The serial port where the local XBee module is connected to
PORT = '/dev/ttyS0'
# The baud rate of the local XBee module
BAUD_RATE = 9600


def main():
    print(" +-----------------------------------------+")
    print(" | XBee Python Library Receive Data Sample |")
    print(" +-----------------------------------------+\n")

    device = XBeeDevice(PORT, BAUD_RATE)

    try:
        device.open()

        def data_receive_callback(xbee_message):
            address = str(xbee_message.remote_device.get_64bit_addr())
            #data = xbee_message.data.decode()
            data = xbee_message.data
            address8 = address[8:]
            
            #byte 0: light
            #byte 1: humidity
            #byte 2: temperature LSB
            #byte 3: temperature MSB
            #byte 4: distance LSB
            #byte 5: distance MSB
            #byte 6: heartrate
            
            #light_l = [0, 0]
            #light_l[0] = data[2]
            #light_l[1] = data[3]
            #light_arr = bytes(light_l)

            temp_l = [0, 0]
            temp_l[0] = data[2]
            temp_l[1] = data[3]
            temp_arr = bytes(temp_l)

            dist_l = [0, 0]
            dist_l[0] = data[4]
            dist_l[1] = data[5]
            dist_arr = bytes(dist_l)

            timestamp = time.ctime(xbee_message.timestamp)
 
            #light = int.from_bytes(light_arr , "big")
            light = data[0]
            dist = int.from_bytes(dist_arr, "little")
            #temp = ctypes.c_byte(data[0]).value
            temp = int.from_bytes(temp_arr, "little")
            temperature = temp/10
            humidity = ctypes.c_byte(data[1]).value
            heartbeat = data[6]
            
            print()
            print("From %s || %s" % (address8, timestamp))
            print(" Light: %s" % (light))
            print(" Temperature: %s" % (temperature))
            print(" Humidity: %s" % (humidity))
            print(" Distance: %s" % (dist))
            print(" Heart rate: %s" % (heartbeat))
            
            #print()

            # To cloud we go
            sendReading(address8, timestamp, light, temperature, humidity, dist, heartbeat) 

        device.add_data_received_callback(data_receive_callback)

        print("Waiting for data...\n")
        input()

    finally:
        if device is not None and device.is_open():
            device.close()


if __name__ == '__main__':
    main()
