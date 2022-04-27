/**
 * Copyright (c) 2009 Andrew Rapp. All rights reserved.
 *
 * This file is part of XBee-Arduino.
 *
 * XBee-Arduino is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * XBee-Arduino is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with XBee-Arduino.  If not, see <http://www.gnu.org/licenses/>.
 */

#define ARDUINO1    1     // comment out this line when compiling for Arduino #2
                          // Arduino 1 is with 5E Xbee and Arduino 2 with 82 Xbee
#if defined(ARDUINO1)
    // installed sensors
    const bool lightSensor = true;
    const bool tempHumSensor = false;
    const bool distanceSensor = false;  
    const bool heartrateSensor = true;
#else
    const bool lightSensor = false;
    const bool tempHumSensor = true;
    const bool distanceSensor = true;  
    const bool heartrateSensor = false;
#endif      

#define MESSAGE_INTERVAL  10000   // in milliseconds
 
#include <XBee.h>
#include <TH02_dev.h>
#include <Wire.h>
#include "Ultrasonic.h"

Ultrasonic ultrasonic(4);

TH02_dev TH02;

/*
This example is for Series 1 XBee
Sends a TX16 or TX64 request with the value of analogRead(pin5) and checks the status response for success
Note: In my testing it took about 15 seconds for the XBee to start reporting success, so I've added a startup delay
*/

XBee xbee = XBee();

unsigned long start = millis();

// allocate two bytes for to hold a 10-bit analog reading
uint8_t payload[] = { 0, 0, 0, 0, 0, 0, 0 };

// with Series 1 you can use either 16-bit or 64-bit addressing

// 16-bit addressing: Enter address of remote XBee, typically the coordinator
//Tx16Request tx = Tx16Request(0x1874, payload, sizeof(payload));

// 64-bit addressing: This is the SH + SL address of remote XBee
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x41779552);
// unless you have MY on the receiving radio set to FFFF, this will be received as a RX16 packet
Tx64Request tx = Tx64Request(addr64, payload, sizeof(payload));

TxStatusResponse txStatus = TxStatusResponse();

int pin5 = 0;

int statusLed = 8;
int errorLed = 12;

void flashLed(int pin, int times, int wait) {
    
    for (int i = 0; i < times; i++) {
      digitalWrite(pin, HIGH);
      delay(wait);
      digitalWrite(pin, LOW);
      
      if (i + 1 < times) {
        delay(wait);
      }
    }
}

void transfer() {
  // start transmitting after a startup delay.  Note: this will rollover to 0 eventually so not best way to handle
    if (millis() - start > 15000) {
      // break down 10-bit reading into two bytes and place in payload
      //pin5 = analogRead(5);
      //payload[0] = pin5 >> 8 & 0xff;
      //payload[1] = pin5 & 0xff;
      
      xbee.send(tx);

      // flash TX indicator
      flashLed(statusLed, 1, 100);
    }
  
    // after sending a tx request, we expect a status response
    // wait up to 5 seconds for the status response
    if (xbee.readPacket(5000)) {
        // got a response!

        // should be a znet tx status              
      if (xbee.getResponse().getApiId() == TX_STATUS_RESPONSE) {
         xbee.getResponse().getTxStatusResponse(txStatus);
        
         // get the delivery status, the fifth byte
           if (txStatus.getStatus() == SUCCESS) {
              // success.  time to celebrate
              flashLed(statusLed, 5, 50);
           } else {
              // the remote XBee did not receive our packet. is it powered on?
              flashLed(errorLed, 3, 500);
           }
        }      
    } else if (xbee.getResponse().isError()) {
      //nss.print("Error reading packet.  Error code: ");  
      //nss.println(xbee.getResponse().getErrorCode());
      // or flash error led
    } else {
      // local XBee did not provide a timely TX Status Response.  Radio is not configured properly or connected
      flashLed(errorLed, 2, 50);
    }
}

uint8_t read_light() {
  return analogRead(A0);
}

float read_humidity() {
  return TH02.ReadHumidity();
}

float read_temp() {
  return TH02.ReadTemperature();
}

uint8_t  heart_rate() {
  uint8_t  c;
  Wire.requestFrom(0xA0 >> 1, 1);    // request 1 bytes from slave device
    while(Wire.available()) {          // slave may send less than requested
       c = Wire.read();   // receive heart rate value (a byte)
       //Serial.print(c, DEC);         // print heart rate value
   }
  return c;
}

long read_dist() {
  return ultrasonic.MeasureInCentimeters();
}

void setup() {
  pinMode(statusLed, OUTPUT);
  pinMode(errorLed, OUTPUT);
  
  Wire.begin(); // Wire communication begin
  TH02.begin();
  
  pinMode(A0,INPUT); // A0 for light sensor
  
  Serial.begin(9600);
  xbee.setSerial(Serial);
}

void loop() {

    //float humidity = read_humidity();
    //byte humidityByte = byte(read_humidity());

    //float temperature = read_temp();
    //int temperatureInt = (int) 10*temperature;
    //byte tempHiByte = highByte(temperatureInt);
    //byte tempLoByte = lowByte(temperatureInt);

    //payload[0] = read_temp();
    //payload[1] = humidityByte;

    //uint16_t light = read_light();
    //payload[2] = highByte(light);
    //payload[3] = lowByte(light);
    //uint16_t dist = read_dist();
    //payload[4] = highByte(dist);
    //payload[5] = lowByte(dist);
    //payload[6] = heart_rate();

    //int amountOfLight = read_light();
    uint8_t lightByte = read_light();
    //byte lightByte = byte(amountOfLight);

    //float humidity = read_humidity();
    byte humidityByte = byte(read_humidity());

    //float temperature = read_temp();
    int temperatureInt = (int) 10*read_temp();
    byte tempHiByte = highByte(temperatureInt);
    byte tempLoByte = lowByte(temperatureInt);

    //long distance = read_dist();
    int distanceInt = (int) read_dist();
    byte distHiByte = highByte(distanceInt);
    byte distLoByte = lowByte(distanceInt);

    byte heartrate = heart_rate();

    // if a certain sensor is installed, the measurement is sent, otherwise 0xFF is sent
    if(lightSensor){
      payload[0] = lightByte;
    }
    else{
      payload[0] = 0xFF;
    }

    if(tempHumSensor){
      payload[1] = humidityByte;
      payload[2] = tempLoByte;          // little-endian byte order (LSB first)
      payload[3] = tempHiByte;
    }
    else{
      payload[1] = 0xFF;
      payload[2] = 0xFF;
      payload[3] = 0xFF;
    }

    if(distanceSensor){
      payload[4] = distLoByte;
      payload[5] = distHiByte;
    }
    else{
      payload[4] = 0xFF;
      payload[5] = 0xFF;
    }

    if(heartrateSensor){
      payload[6] = heartrate;
    }
    else{
      payload[6] = 0xFF;
    }
    
    transfer();
    delay(MESSAGE_INTERVAL);
}
