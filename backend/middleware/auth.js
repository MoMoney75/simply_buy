const jwt = require('jsonwebtoken');
/* This secret is being used for testing purposes,
   DONT FORGET TO ADD A REAL SECRET!!!! */
const SECRET = 'fakesecret'

function authenticateUser(req,res,next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (!token){
        console.log("WARNING IN MIDDLEWARE: TOKEN NOT PROVIDED!!!")
        return res.status(401).json({error: "Please login to continue"})
    };

    jwt.verify(token, SECRET, (err, user) =>{
        if(err) { 
            if(err.name === 'TokenExpiredError'){
                console.log("WARNING IN MIDDLEWARE: TOKEN EXPIRED!!");
                return res.status(401).json({ error: "Session expired, please login to continue." });
            }
        }
        
            req.user = user;
            console.log("user set in auth.js function:", user)
            next();
        
     })
}

module.exports = authenticateUser;