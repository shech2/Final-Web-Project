const jwt = require("jsonwebtoken");


exports.authMiddleware = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(token);
    if(token){
        jwt.verify(token, process.env.JWT_SEC, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next();
            }
        });

    }
    else{
        res.redirect("/login");
    }

}

exports.authAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    const isAdmin = req.cookies.isAdmin;
    if(token && isAdmin){
        jwt.verify(token, process.env.JWT_SEC, (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect("/login");
            } else {
                if(decodedToken.isAdmin){
                    next();
                } else {
                    res.redirect("/login");
                }
            }
        });

    }
    else{
        res.redirect("/login");
    }

}