#include <TH02_dev.h>

#include <Wire.h> //include Wire.h library

void setup() {
  Wire.begin(); // Wire communication begin
  Serial.begin(9600); // The baudrate of Serial monitor is set in 9600
  //while (!Serial); // Waiting for Serial Monitor
  //Wire.onReceive(receiveEvent);

  Serial.println("start");
}

void loop() {

  float temper = TH02.ReadTemperature();
  float humidity = TH02.ReadHumidity();

  Serial.print("Humidity: ");
  Serial.println(humidity);
  Serial.print("Temp: ");
  Serial.println(temper);

  Serial.print("Heart rate: ");
  Wire.requestFrom(0xA0 >> 1, 1);    // request 1 bytes from slave device
    while(Wire.available()) {          // slave may send less than requested
       unsigned char c = Wire.read();   // receive heart rate value (a byte)
       Serial.print(c, DEC);         // print heart rate value
   }

  Serial.println();
  Serial.println();

  delay(1500);
}
