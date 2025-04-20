// Cart.js is responsible for showing all the items in a user's cart
import { useState, useEffect } from "react";
import wishlistAPI from "./APIs/wishlistAPI";
function Cart(){
      const [cart, setCart] = useState([]);

      useEffect(()=> {
          async function fetchCart(){
            const result = await wishlistAPI.get();
            console.log("cart in app.js:", result)
              setCart(result);
            }
            fetchCart();
          },[]);
      
    console.log("HERE IS YOUR CART:", cart)
    return(

        <h1>Here is your cart!</h1>
    );

}

export default Cart;