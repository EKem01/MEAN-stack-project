const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentification = require('./routes/authentification')(router);
const bodyParser = require('body-parser')
const cors = require('cors');


mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if (err) {
        console.log('COULD NOT CONNECT TO DATABASE ', err);
    }else {
        console.log('CONNECTED TO DATABASE ' + config.db)
    }
});

// parse application/x-www-form-urlencoded (middleware)
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(cors());


//provide static directory for frontend
app.use(express.static(__dirname + '/client/dist/client/'));
app.use('/authentification', authentification);

//connect server to angular index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/client/index.html'));
});


//starting server, listening on port 8080
app.listen(8080, () => {
    console.log('Listening on port 8080');
});