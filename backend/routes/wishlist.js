const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlist')
const authenticateUser = require ('../middleware/auth.js')

router.get('/', authenticateUser,async function(req,res,next){
 
    try{
        const user = req.user;
        console.log("Request jwt user at /get cart:", user)
        
    
        const result = await Wishlist.get(user.user_id);
        console.log("result for user cart items on backend", result)
        
        return res.status(200).json({success: true, result})

    }

    catch(err){
        console.log("Error in /wishlist/get on backend:", err)
        return next(err)
    }
})


router.post('/add', authenticateUser, async function(req,res,next){

    const user = req.user
    const {
        item_id,
        price,
        quantity,
        image,
        category,
        title
        } = req.body;

    try{

    const result = await Wishlist.add(item_id,price,quantity,image,category,user.user_id,title)
    console.log("Attempting to add item to wishlist on backend /add:", result)
    return res.status(200).json({success: true, result})
    }

    catch(err){
        console.log("Error in wishlist /add on backend:", err)
        return next(err)
    }
})

router.post('/delete', authenticateUser, async function(req,res,next){
    const user = req.user
    console.log("user in wishlist /delete in route handler:", user.user_id)
    const item_id = req.body.item_id;

    try{
        const result = await Wishlist.delete(user.user_id,item_id);
        console.log("Result in deleting item from cart:", result)
        return res.status(200).json({success:true, result})
    }
    catch(err){
        console.log("Error in wishlist /delete:", err)
        return next(err)
    }
})

router.get('/', async function(req,res,next){
    const sort = req.query;
    const user_id = req.session.user_id;
    try{
        let result;
        if(!sort){
            result = await Wishlist.sortPriceDSC(user_id);
            return res.status(200).json({success: true, result})
        }

        else if(sort === "ASC"){
            result = await Wishlist.sortPriceASC(user_id);
            return res.status(200).json({success: true, result})
        }

        else{
            return res.status(400).json({ success: false, message: "Invalid sorting parameter" });
        }
    }
    catch(err){
        console.log("Error in sorting wishlist items:", err);
        return next(err)
    }
})
   /* ADD FEATURE FOR SORTING THROUGH WISHLIST BY CATEGORY,
        WILL HAVE TO DONE THROUGH API? 
    */


        module.exports = router;