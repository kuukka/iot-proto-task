const mongoose = require('mongoose');

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.DB_CONN, { 
          useNewUrlParser: true,
          useUnifiedTopology: true 
        }, 
        () => console.log(" Mongoose is connected")
    );

  } catch (e) {
      console.log("could not connect", e);
  }

mongoose.Promise = global.Promise;

// iot-test / mh6P4o2OU5dMEAto
// teemu@testing.lo / qwertyuiopl
// "newToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMjI1NjE3ZmM4YzM2ZDQ0ZWQzNTQ5MyIsImlhdCI6MTY0NjQxNzQzMSwiZXhwIjoxNjQ2NTAzODMxfQ.mXu8sc9WfPRRwKm6aYKNJEllFdVRgnpKs5m3e_OMyLE"

module.exports = mongoose;