const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlist')

router.post('/add', async function(req,res,next){
    const {wishlist_itemid,item_id,price,quantity,description,image,category,user_id} = req.body;
    //const user_id = req.session.user_id;

    try{
    const result = await Wishlist.add(wishlist_itemid,item_id,price,quantity,description,image,category,user_id)
    return res.status(200).json({success: true, result})
    }

    catch(err){
        console.log("Error in wishlist /add:", err)
        return next(err)
    }
})

router.post('/delete', async function(req,res,next){
    const user_id = req.session.user_id;
    const item_id = req.body;

    try{
        const result = await Wishlist.delete(user_id,item_id);
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