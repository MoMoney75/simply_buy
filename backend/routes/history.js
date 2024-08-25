const express = require('express')
const router = express.Router();
const PurchaseHistory = require('../models/purchase_history');

router.post('/', async function(req,res,next){
    const {purchase_id,item_id,price,quantity,description,image,category,user_id} = req.body;
    try{
        const result = await PurchaseHistory.add(purchase_id,item_id,price,quantity,description,image,category,user_id)
        console.log("result of newly added purchase:", result)
        return res.status(200).json({success: true, result})
    }
    catch(err){
        console.log("Error in purchase /add:", err)
        return next(err)
    }
})

router.get('/', async function(req,res,next){
    const user_id = req.session.user_id;
    const {sort} = req.query;

    let result;
    try{
        if(!sort){
            result = await PurchaseHistory.sortDateAsc(user_id)
            return res.status(200).json({success: true, result})
        }

        else if(sort == "dateDSC"){
            result = await PurchaseHistory.sortDateDSC(user_id)
            return res.status(200).json({success: true, result})
        }
        else if(sort == "priceASC"){
            result = await PurchaseHistory.sortPriceASC(user_id)
            return res.status(200).json({success: true, result})
        }
        else if(sort == "priceDSC"){
            result = await PurchaseHistory.sortPriceDSC(user_id)
            return res.status(200).json({success: true, result})
        }

        else if(sort == "qtyASC"){
            result = await PurchaseHistory.sortQuantityASC(user_id)
            return res.status(200).json({success: true, result})
        }

        else if(sort == "qtyDSC"){
            result = await PurchaseHistory.sortQuantityDSC(user_id)
            return res.status(200).json({success: true, result})
        }
        else {
            return res.status(400).json({ success: false, message: "Invalid sorting parameter" });
        }
    }
    catch(err){
        console.log("Error sorting data in /history:", err)
        return next(err)
    }
})

module.exports = router;