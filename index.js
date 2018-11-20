require('rootpath')();
var express = require("express");

var app = express(),
    api = express.Router();

const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');


// var authentification = require("./middlewares").authentification;
// var permit = require("./middlewares").permit;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.use(authentification);

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./core/users/users.controller'));

// global error handler
app.use(errorHandler);





// // viewing account "GET" available to account owner and account member
// api.post("/account", permit("owner"), (req, res) => {
//     //   res.json({ currentUser: req.user })
//     res.write("you posted:\n");
//     res.end(JSON.stringify(req.body, null, 2));
// });

// // mount api router
// app.use("/api", api);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
