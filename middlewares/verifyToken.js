const jwt = require('jsonwebtoken');
exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token || req.headers["token"]?.split(" ")[1];
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                console.log(err);
                res.status(403).json({
                    success: false,
                    message: 'Token is not valid',
                });
                return;
            }
            req.user = user;
            next();
        })  
    } else {
        res.status(401).json({
            success: false,
            message: 'Please login to access'
        });
        return;
    }
}
exports.verifyAdmin = (req, res, next) => {
    
    if (req.user.isAdmin) {         
       next();
   } else {
       res.status(403).json({
           success: false,
           message: 'You are not allowed to do that'
       });
       return;
   }
   
}
