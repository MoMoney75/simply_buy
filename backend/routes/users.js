const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const authenticateUser = require('../middleware/auth.js')
const jwt = require('jsonwebtoken');

/* File is responsible for all routes and methods relating to the User
   Model (register, authenticate, delete, and logout) 
*/

router.post('/register', async function(req,res,next){
    const {first_name,last_name,username,password} = req.body;

    try{
    /* Add json schema authentication first to verify validations */
        const user = await User.Register(first_name,last_name,username,password)

        const token = jwt.sign(user,'fakesecret')
        return res.status(200).json({success : true, user, token})

    }
    catch(err){
        console.log("Error in /register on backend:", err)
        return next(err);
    }

})

router.post('/login', async function(req,res,next){
    const {username, password} = req.body;

    try{

        const user = await User.Authenticate(username,password)
        const token = jwt.sign(user,'fakesecret')
        
        console.log("Decoded JWT created at login:", token, jwt.decode(token))

        
        return res.status(200).json({success: true, user, token})
        
      
    }
    catch(err){
        console.log("Error in /login", err);
        return next(err)
    }
})

    router.post('/delete', async function(req,res,next){
        const user_id = req.session.user.id
        console.log("user_id before deleting account on backend:", user_id)
        try{
            const result = await User.Delete(user_id);
            return res.status(200).json({success :result.success, message: result.message})
        }

        catch(err){
            console.log("Error in /delete on backend:", err)
            return next(err)
        }
    })

    /* For simplicty, logout is only handled on the client side for now */
    // router.post('/logout', async function (req,res,next){
    //     try{
    //        res.
    //     }
    //     catch(err){
    //         return next(err)
    //     }
    // })

    module.exports = router;