void setup() {
  // put your setup code here, to run once:
  pinMode(A0,INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int lightRead = analogRead(A0);
  Serial.print(lightRead);
  if(lightRead > 389){
    Serial.println("  Bright");
  }
  else{
    Serial.println("  Dark");
  }
  delay(500);
}
