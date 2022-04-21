#include <TH02_dev.h>
#include <TH06_dev.h>
#include <THSensor_base.h>

#include <Wire.h>
#include "Ultrasonic.h"
#include <XBee.h>

Ultrasonic ultrasonic(4);

TH02_dev TH02;

// installed sensors
const bool lightSensor = true;
const bool tempHumSensor = true;
const bool distanceSensor = true;  

int read_light() {
  return analogRead(A0);
}

unsigned char heart_rate() {
  unsigned char c;
  Wire.requestFrom(0xA0 >> 1, 1);    // request 1 bytes from slave device
    while(Wire.available()) {          // slave may send less than requested
       c = Wire.read();   // receive heart rate value (a byte)
       //Serial.print(c, DEC);         // print heart rate value
   }
  return c;
}

float read_humidity() {
  return TH02.ReadHumidity();
}

float read_temp() {
  return TH02.ReadTemperature();
}

long read_dist() {
  return ultrasonic.MeasureInCentimeters();
}

/*
This example is for Series 1 XBee
Sends a TX16 or TX64 request with the value of analogRead(pin5) and checks the status response for success
Note: In my testing it took about 15 seconds for the XBee to start reporting success, so I've added a startup delay
*/

XBee xbee = XBee();

unsigned long start = millis();

// allocate two bytes for to hold a 10-bit analog reading
uint8_t payload[] = { 0, 0, 0, 0, 0, 0 };

// with Series 1 you can use either 16-bit or 64-bit addressing

// 16-bit addressing: Enter address of remote XBee, typically the coordinator
//Tx16Request tx = Tx16Request(0x1874, payload, sizeof(payload));

// 64-bit addressing: This is the SH + SL address of remote XBee
XBeeAddress64 addr64 = XBeeAddress64(0x0013a200, 0x41779552);
// unless you have MY on the receiving radio set to FFFF, this will be received as a RX16 packet
Tx64Request tx = Tx64Request(addr64, payload, sizeof(payload));

TxStatusResponse txStatus = TxStatusResponse();

int pin5 = 0;

int statusLed = 11;
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


void setup() {
  // put your setup code here, to run once:
  Wire.begin(); // Wire communication begin
  
  pinMode(A0,INPUT); // A0 for light sensor
  pinMode(statusLed, OUTPUT);
  pinMode(errorLed, OUTPUT);

  Serial.begin(9600);
  xbee.setSerial(Serial);
}

void loop() {
   
   // start transmitting after a startup delay.  Note: this will rollover to 0 eventually so not best way to handle
    if (millis() - start > 15000) {

      int amountOfLight = read_light();
      byte lightByte = byte(amountOfLight);

      float humidity = read_humidity();
      byte humidityByte = byte(humidity);

      float temperature = read_temp();
      int temperatureInt = (int) 10*temperature;
      byte tempHiByte = highByte(temperatureInt);
      byte tempLoByte = lowByte(temperatureInt);

      long distance = read_dist();
      int distanceInt = (int) distance;
      byte distHiByte = highByte(distanceInt);
      byte distLoByte = lowByte(distanceInt);

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
    
    delay(1000);
}
