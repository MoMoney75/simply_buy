const db = require('../db');

class PurchaseHistory{

    static async add(purchase_id,item_id,price,quantity,description,image,category,user_id){        
        const result = await db.query(`INSERT INTO purchase_history(purchase_id,item_id,
                                       price,quantity,description,image,category,user_id)
                                        VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
                                    [purchase_id,item_id,price,quantity,description,image,category,user_id]);
        
            return result.rows[0];
    }

    /* Add filtering methods for easy search through purchase history. */

    /* Sorts user's purchase history by date, starting with the oldest */
    static async sortDateAsc(user_id){
        const result = await db.query(`SELECT * FROM purchase_history 
                                       WHERE user_id = $1 
                                       ORDER BY purchase_date ASC`, [user_id]);

        return result.rows;
    }

     /* Sorts user's purchase history by date, starting with the newest */
    static async sortDateDSC(user_id){
        const result = await db.query(`SELECT * FROM purchase_history 
                                       WHERE user_id = $1 
                                       ORDER BY purchase_date DSC`,[user_id]);

        return result.rows;
    }

    /* Sort's user's purchase history by price, ascending */
    static async sortPriceASC(user_id){
        const result = await db.query(`SELECT * FROM purchase_history
                                       WHERE user_id = $1
                                       ORDER BY price ASC`,[user_id]);

        return result.rows
    }
     /* Sort's user's purchase history by price, descending */
    static async sortPriceDSC(user_id){
        const result = await db.query(`SELECT * FROM purchase_history
            WHERE user_id = $1
            ORDER BY price DSC`,[user_id]);

        return result.rows
    }

    /* Sort's user's purchase history by quantity of an item bought,
       ascending
    */
    static async sortQuantityASC(user_id){
        const result = await db.query(`SELECT * FROM purchase_history
            WHERE user_id = $1
            ORDER BY quantity ASC`,[user_id]);

        return result.rows
    }

    /* Sort's user's purchase history by quantity of an item bought,
       descending
    */
    static async sortQuantityDSC(user_id){
        const result = await db.query(`SELECT * FROM purchase_history
            WHERE user_id = $1
            ORDER BY price DSC`,[user_id]);

        return result.rows
    }


}

module.exports = PurchaseHistory;