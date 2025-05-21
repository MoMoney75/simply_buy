// Cart.js is responsible for showing all the items in a user's cart
import { useState, useEffect } from "react";
import wishlistAPI from "./APIs/wishlistAPI";
function Cart({deleteFromCart}){
      const [cart, setCart] = useState([]);
      const [errors, setError] = useState([])
      const [message, setMessage] = useState('')

      useEffect(()=> {

          async function fetchCart(){
            const result = await wishlistAPI.get();
            if(result.error){
              setError([result.error])
              return
              
            }
            console.log("cart in app.js:", result)
            if(result.result.length === 0){
              setMessage("Oh no, looks like your cart is empty!")
            }
            else{
              setCart(result.result);
            }
            }
            fetchCart();
          },[]);
      
    console.log("HERE IS YOUR CART:", cart)
    return(

      <div>
        <h1>Here is your cart!</h1>

       {errors && errors.map((e) =>(<p> {e}</p>))}
        <ol>
        
        {message && <p>{message}</p>} 

        {cart.map((item) =>(
          <li>
               <h3>{item.title}</h3>
                    <img src={item.image}
                    alt={item.title} width={100} height={100}/>
                    <p>${item.price}</p>

                    <button onClick={ ()=> deleteFromCart(item.item_id)}>Remove</button>

          </li>
        ))}
        </ol>

        </div>
    );

}

export default Cart;