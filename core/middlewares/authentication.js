// middleware for authentication
module.exports = function authorize(req, res, next) {
    const apiToken = req.headers['x-api-token'];
    
    // get the user
    req.user = {
        name: 'Vasya',
        role: 'owner'
    };
       
    console.log(req.user);
    // always continue to next middleware
    next();
  }