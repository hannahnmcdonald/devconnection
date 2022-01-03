const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // GET token from header
    const token = req.header('x-auth-token');

    // CHECK if no token
    if(!token) {
        //Not authorized status
        return res.status(401).json({ msg: 'No token, authorization denied!' });
    }

    // Verify Token
    try {
        const decoded = jwt.verify(token, congif.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err) {
        res
            .status(401)
            .json({ msg: 'Token is not valid!' });
    }
}