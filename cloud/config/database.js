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

module.exports = mongoose;