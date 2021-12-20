const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access Denied, No token provided.');

    try{
        const decoded = jwt.verify(token,'key');
        req.admin = decoded;
        if(!req.admin.isAdmin) return res.status(403).send('Access denies');
        next();
    }
    catch(ex){
        res.status(400).send('Invalid Token');
    }
}