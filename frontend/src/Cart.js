// Cart.js is responsible for showing all the items in a user's cart
import { useState, useEffect } from "react";
import wishlistAPI from "./APIs/wishlistAPI";
function Cart(){
      const [cart, setCart] = useState([]);

      useEffect(()=> {

          async function fetchCart(){
            const result = await wishlistAPI.get();
            console.log("cart in app.js:", result)
              setCart(result.result);
            }
            fetchCart();
          },[]);
      
    console.log("HERE IS YOUR CART:", cart)
    return(

      <div>
        <h1>Here is your cart!</h1>

        <ol>
        {cart.map((item) =>(
          <li>
               <h3>{item.title}</h3>
                    <img src={item.image}
                    alt={item.title} width={100} height={100}/>
                    <p>${item.price}</p>

          </li>
        ))}
        </ol>

        </div>
    );

}

export default Cart;