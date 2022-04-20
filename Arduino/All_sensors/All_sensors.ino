#include <TH02_dev.h>
#include <Wire.h>
#include "Ultrasonic.h"

Ultrasonic ultrasonic(4);

void setup() {
  // put your setup code here, to run once:
  Wire.begin(); // Wire communication begin
  
  pinMode(A0,INPUT); // A0 for light sensor
  Serial.begin(9600);
}

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

void loop() {
  // put your main code here, to run repeatedly:
  Serial.print("Light level: ");
  Serial.println(read_light());

  Serial.print("Heart rate: ");
  Serial.println(heart_rate());

  Serial.print("Humidity: ");
  Serial.println(read_humidity());

  Serial.print("Temperature: ");
  Serial.println(read_temp());

  Serial.print("Distance: ");
  Serial.println(read_dist());

  Serial.println();
  delay(1500);
}
