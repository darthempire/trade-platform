require('rootpath')();
var express = require("express");

var permit = require("./middlewares").permit;
var authenticate = require("./middlewares").authentification;


var app = express(),
    api = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// authenticate each request
// will set `request.user`
app.use(authenticate);

// api routes
app.use('/users', permit('owner'), require('./core/users/users.controller'));

// global error handler
app.use(errorHandler);


// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
