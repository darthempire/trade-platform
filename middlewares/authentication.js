const jwt = require("jsonwebtoken");
const config = require("config.json");
const userService = require("../core/users/user.service");

// middleware for authentication
module.exports = async function authorize(req, res, next) {
    let apiToken = req.headers["authorization"];

    if (apiToken) {
        apiToken = apiToken
            .replace("Bearer ", "")
            .toString()
            .trim();

        req.user = await userService.getById(
            jwt.verify(apiToken, config.secret).sub
        );
    }

    // always continue to next middleware
    next();
};
