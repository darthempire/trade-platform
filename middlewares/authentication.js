const userService = require('../core/users/user.service');

// middleware for authentication
module.exports = async function authorize(req, res, next) {
    const apiToken = req.headers["x-api-token"];

    // set user on-success
    req.user = await userService.getByToken(apiToken);

    // always continue to next middleware
    next();
}
