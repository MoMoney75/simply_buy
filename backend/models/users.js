/* This file handles database queries for the users table */

const db = require('../db');
const bcrypt = require('bcrypt');

class User{
    /* Handles new user registration, username and password must be 8-25 characters in length*/
    static async Register(first_name,last_name,username,password){
        /*Add logic checking for duplicate username */
        const existingUser = await db.query(`SELECT username FROM users WHERE username = $1`,
            [username]
        )
        
        if(existingUser.rows.length > 0){
            throw new Error("User with that username already exists. Please try a different username or login to continue")
        }

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await db.query(`INSERT INTO users (first_name,last_name,username,password)
                                        VALUES($1,$2,$3,$4) 
                                        RETURNING user_id, first_name,last_name,username`,
                                        [first_name,last_name,username,hashedPassword])

       return result.rows[0]
    }

    /* Handles login on existing user */
    static async Authenticate(username,password){

        const result = await db.query(`SELECT * FROM users 
                                    WHERE username = $1`,[username]);
        const user  = result.rows[0];
        
        if(result.rows.length === 0){
            throw new Error("Invalid username or password")
        }

        if(user){
        const isValid = await bcrypt.compare(password,user.password);

            if(!isValid){
                throw new Error("Invalid username or password")
            }

            return user;
        }
    
    }

    static async Delete(user_id){
       const result = await db.query(`DELETE FROM users WHERE user_id = $1`,
                        [user_id]
        )
        if(!result){
            return {success:false, message:"Unable to delete user account"}
        }
        
        return {success:true, message:"Account successfully deleted"}
        
    }


}

module.exports = User;