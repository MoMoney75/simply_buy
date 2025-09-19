const db = require('../db')
/* 
    Wishlist handles adding/deleting and sorting items from a user's wishlist for future purchases 
    *****PLEASE NOTE: "wishlist_itemID" refers to the auto-incrementing id given to each item added to a 
    user's wishlist while "item_id" refers to the id given to an item in the API***** 
*/
class Wishlist {
    
    static async get(user_id){
    
            const result = await db.query(`SELECT * FROM wishlist_items
                                           WHERE user_id = $1`, [user_id])

            return result.rows;
    }

    static async add(item_id,price,quantity,image,category,user_id,title){
        const result = await db.query(`INSERT INTO wishlist_items(item_id,price,quantity,
                                       image,category,user_id,title)
                                       VALUES ($1,$2,$3,$4,$5,$6,$7) 
                                       RETURNING *`, 
        [item_id,price,quantity,image,category,user_id,title])
                                 
        if(!user_id){
            throw new Error("Please login into continue")
        }
        else{
        return result.rows[0]
        }
    }

    /* Deletes an item from a user's wishlist */
    static async delete(user_id,item_id){
        const result = await db.query(`DELETE FROM wishlist_items WHERE user_id = $1
                                        AND item_id = $2 RETURNING *`, [user_id,item_id])


        if(result.rows.length < 1){
            throw new Error("deleting item in models")
        }
        return result.rows[0]

    }

    /* Sort's user's wishlist by price, ascending */
    static async sortPriceASC(user_id){
        const result = await db.query(`SELECT * FROM wishlist_items
                                       WHERE user_id = $1
                                       ORDER BY price ASC`,[user_id]);

        return result.rows
    }
     /* Sort's user's wishlist by price, descending */
    static async sortPriceDSC(user_id){
        const result = await db.query(`SELECT * FROM wishlist_items
            WHERE user_id = $1
            ORDER BY price DSC`,[user_id]);

        return result.rows
    }

    /* ADD FEATURE FOR SORTING THROUGH WISHLIST BY CATEGORY,
        WILL HAVE TO DONE THROUGH API? */
}

module.exports = Wishlist