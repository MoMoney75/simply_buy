const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const authenticateUser = require('../middleware/auth.js')
const jwt = require('jsonwebtoken');
const validate = require('../schema/user.js');
const { error } = require('console');

/* File is responsible for all routes and methods relating to the User
   Model (register, authenticate, delete, and logout) 
*/

router.post('/register', async function(req,res,next){

    try{
    /* Add json schema authentication first to verify validations */

        const {first_name,last_name,username,password} = req.body;
        const isValid = validate({first_name,last_name,username,password});

        if(!isValid){
            const error = validate.errors.map(e => (e.instancePath, e.message))
            console.log("This error is being thrown in !isValid on backend:", error)
           
            const result = res.status(400).json({
                   success : false, 
                   error: validate.errors.map(err => ({
                   field: err.instancePath.replace('/', ''),
                   message: err.message }))
                })

                return result
            }

        const user = await User.Register(first_name,last_name,username,password)
        console.log("new user registered:", first_name,last_name,username,password, user)

        const token = jwt.sign(user,'fakesecret')
        return res.status(200).json({success : true, user, token})}


    catch(err){
        console.log("Error in /register on backend:", err)
        return next(err);
    }

})

router.post('/login', async function(req,res,next){
   // const {username, password} = req.body;

    try{
        const {username, password} = req.body;
        const user = await User.Authenticate(username,password)
        // if(!user){
        //     console.log("Error being thrown at login:", user)
        // }
        const token = jwt.sign(user,'fakesecret', {expiresIn : '1h' })
        
        console.log("Decoded JWT created at login:", token, jwt.decode(token))

        
        return res.status(200).json({success: true, user, token})
        
      
    }
    catch(err){
        console.log("Error in /login on backend routes", err);
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