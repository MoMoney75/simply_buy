// Cart.js is responsible for showing all the items in a user's cart
import { useState, useEffect } from "react";
import wishlistAPI from "./APIs/wishlistAPI";
import CartCard from "./CartCard";

function Cart({deleteFromCart}){
      const [cart, setCart] = useState([]);
      const [errors, setError] = useState([])
      const [message, setMessage] = useState('')
      const [total, setTotal] = useState(0);

      useEffect(()=> {

          async function fetchCart(){
            const result = await wishlistAPI.get();
            if(result.error){
              setError([result.error])
              return }
            if(result.result.length === 0){
              setMessage("Oh no, looks like your cart is empty!")}
              else{
              setCart(result.result)};
            }
            fetchCart();
          },[]);
      
    //adds all items in cart for total price
    useEffect(() => {
      let price = 0;

        for(let i = 0; i < cart.length; i++){
          price += (+cart[i].price)}
      //console.log("total price of cart", price.toFixed(2))
      price = `$${price.toFixed(2)}`
      setTotal(price)
    }, [cart])

    async function handleDelete({wishlist_itemid}){
      console.log("id in Cart.js handleDelete", {wishlist_itemid})

      const result = await deleteFromCart({wishlist_itemid});

      console.log("result inside handleDelete:", result)

      /** After deleting item from cart, filter out the deleted item
       * to display the updated cart */
      if (result.success === true){
        setCart(prevCart => prevCart.filter(item => item.wishlist_itemid !== wishlist_itemid))}
      
    
    }

    return(

      <div>
        <h1>Here is your cart!</h1>

       {errors && errors.map((e) =>(<p> {e}</p>))}
        {message && <p>{message}</p>} 

        <div className="container text-center">
          <div>
        {cart.map(product =>(
             <CartCard 
               key={product.wishlist_itemid}
               wishlist_itemid={product.wishlist_itemid}
               title={product.title}
               image={product.image}
               price={product.price} 
               category={product.category}
               deleteFromCart={handleDelete}/>))}
         </div>
        </div>

        <div>
          <p>Total: {total} </p>
          <button>Checkout</button>
        </div>

        </div>
    );
  }

export default Cart;