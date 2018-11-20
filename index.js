var express = require("express");
var authentification = require("./core/middlewares").authentification;
var permit = require("./core/middlewares").permit;

var app = express(),
    api = express.Router();

app.use(authentification);
// mount api router
app.use("/api", api);

app.get("/", function(req, res) {
  res.send("Hello World!");
});

api.get("/account", permit("owner", "employee"), (req, res) =>
  req.json({ currentUser: request.user })
);

app.listen(process.env.PORT || 3000, function() {
  console.log("Example app listening on port 3000!");
});
