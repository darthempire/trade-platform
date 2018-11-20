// middleware for authentication
module.exports = function authorize(req, res, next) {
    const apiToken = req.headers['x-api-token'];
    
    // get the user
    req.user = new {
        name: 'Vasya',
        role: 'owner'
    };
       
    // always continue to next middleware
    next();
  }