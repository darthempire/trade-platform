// middleware for authentication
module.exports = function authorize(req, res, next) {
    const apiToken = req.headers['x-api-token'];

    
    console.log(1234);

    // get the user
    req.user = {
        name: 'Vasya',
        role: 'owner'
    };

    // always continue to next middleware
    next();
  }