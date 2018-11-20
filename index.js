var express = require("express");
var authentification = require("./core/middlewares").authentification;
var permit = require("./core/middlewares").permit;

var app = express(),
  api = express.Router();

// // mount api router
// app.use("/api", api);

app.use(authentification);

// viewing account "GET" available to account owner and account member
api.get("/account", permit("employee"), (req, res) =>
  res.json({ currentUser: req.user })
);

// mount api router
app.use("/api", api);

app.listen(process.env.PORT || 3000, function() {
  console.log("Example app listening on port 3000!");
});
