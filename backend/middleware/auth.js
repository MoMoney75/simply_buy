const jwt = require('jsonwebtoken');
/* This secret is being used for testing purposes,
   DONT FORGET TO ADD A REAL SECRET!!!! */
const SECRET = 'fakesecret'

function authenticateUser(req,res,next){

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return es.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) =>{
        if(err) { 
            res.sendStatus(403) 
        }
            req.user = user;
            console.log("user set in auth.js function:", user)
            next();
     })
}

module.exports = authenticateUser;