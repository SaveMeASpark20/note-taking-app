const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


async function signup(req, res) {
    try {
    //Get the email and password off the req body
    const {email, password} = req.body;

    //Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    //Create a user with the provided email and data
    await User.create({email, password: hashedPassword})

    //respond
    res.sendStatus(200);
    } catch(err){
        console.log(err);
        res.sendStatus(400);
    }
}

async function login(req, res) {
    try{
    //Get the email and password off rq body

    const {email, password} = req.body;

    //Find the user with requested email
    const user = await User.findOne({ email });
    if(!user) return res.sendStatus(401);

    //Compare sent in password with found user password
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if(!passwordMatch) return res.sendStatus(401);
    

    //Create a jwt token
    const expiration = Date.now() + 1000 * 60 * 60 *24 * 30; 

    const token = jwt.sign({ sub: user._id, exp: expiration }, process.env.SECRET_TOKEN);

    //Set the Cookie
    res.cookie("Authorization", token, {
        expires: new Date(expiration),
        // httpOnly: true,                                              
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    })
    

    //send it
    res.sendStatus(200);
    }catch(err) {
        console.log(err);
        res.sendStatus(400);
    }
}

function logout(req, res) {
    try {
        res.clearCookie("Authorization");
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
    
}

function checkAuth(req, res) {
    try {
        res.sendStatus(200); 
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
    
}

module.exports = {signup, login, logout, checkAuth}; 