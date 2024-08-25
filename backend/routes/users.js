const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const { error } = require('console');

/* File is responsible for all routes and methods relating to the User
   Model (register, authenticate, delete, and logout) 
*/

router.post('/register', async function(req,res,next){
    const {first_name,last_name,username,password} = req.body;

    try{
    /* Add json schema authentication first to verify validations */
     const user = await User.Register(first_name,last_name,username,password)

        console.log("new user at registration:", user, user.user_id)
        req.session.user = user.user_id
        return res.status(200).json({success : true, user})

    }
    catch(err){
        console.log("Error in /register:", err)
        return next(err);
    }

})

router.post('/login', async function(req,res,next){
    const {username, password} = req.body;
    try{
        const user = await User.Authenticate(username,password)
        console.log("user at login:", user, user.user_id)
        req.session.user = user.user_id
        return res.status(200).json({success: true, user})
        
      
    }
    catch(err){
        console.log("Error in /login", err);
        return next(err)
    }
})

    router.post('/delete', async function(req,res,next){
        const user_id = req.session.user_id
        console.log("user_id before deleting account:", user_id)
        try{
            const result = await User.Delete(user_id);
            return res.status(200).json({success :result.success, message: result.message})
        }

        catch(err){
            console.log("Error in /delete:", err)
            return next(err)
        }
    })

    router.post('/logout', async function (req,res,next){
        try{
            req.session.destroy(function(e){
                if(e){
                    res.status(500).json({success:false, error: e.message})
                }
                return res.status(200).json({success: true, message:"Successfully logged out!"
                })
            })
        }
        catch(err){
            return next(err)
        }
    })

    module.exports = router;