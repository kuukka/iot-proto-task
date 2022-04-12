// importing the dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const temperatureRoutes = require('./routes/temperature.routes');
const pkg = require('./package.json');
const mongoose = require('./config/database');
const path = require('path');

// defining the Express app
const app = express();

// DB settings
mongoose.connection.on('error', console.error.bind(console, 'DB Connection Errror'));

app.set('pkg', pkg);

// adding Helmet to enhance your Rest API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

app.use(express.static('build'));

//app.use("/static", express.static('build/static'));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

//app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/temperature', temperatureRoutes);


// Rest goes to frontend
app.use('/', (req,res) =>{
  res.sendFile(path.resolve('build', 'index.html'));
});

// app.get('/', (req, res) => {
//     res.json({
//         author: app.get('pkg').author,
//         name: app.get('pkg').name,
//         description: app.get('pkg').description,
//         version: app.get('pkg').version
//     })
// })

// starting the server
app.listen(process.env.PORT, () => {
  console.log('listening on port ' + process.env.PORT);
});