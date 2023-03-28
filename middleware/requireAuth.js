const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function requireAuth(req, res, next) {
    try{
        //get the token
        
        const token = req.cookies.Authorization;
        //verify it
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        //find the user
        const user = await User.findById(decoded.sub);

        if(Date.now() > decoded.exp);
        
        if(!user) return res.sendStatus(401);

        //attach the user to req.user
        req.user = user;
        next();
    }catch(err) { 
        return res.sendStatus(401) 
    };
}

module.exports = requireAuth;