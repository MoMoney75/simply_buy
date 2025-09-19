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

    async function handleDelete(id){
      console.log("id in Cart.js handleDelete", id)

      const result = await deleteFromCart(id);

      console.log("result inside handleDelete:", result)

      /** After deleting item from cart, filter out the deleted item
       * to display the updated cart
       */
      if (result.success === true){
        setCart((prevCart => prevCart.filter((item) => item.item_id !== id)))
      }
    
    }


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

                    <button onClick={ ()=> handleDelete(item.item_id)}>Remove</button>

          </li>
        ))}
        </ol>

        </div>
    );

}

export default Cart;