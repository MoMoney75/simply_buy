import {React, useState, useEffect} from "react";
import productsAPi from "../APIs/productsAPI";
import userAPI from "../APIs/userAPI";
import wishlistAPI from "../APIs/wishlistAPI";
import historyAPI from "../APIs/historyAPI";
import RegistrationForm from "../Forms/Register";
import LoginForm from "../Forms/Login";
import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Skeleton from "../Router/Skeleton";
import Navbar from "../Router/Nav";

function App() {
  const [products,setProducts] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null)
  const user_id = sessionStorage.user_id;


  useEffect(()=> {
    async function getAllProducts(){
      const result = await productsAPi.getAll();
        setProducts(result.data);
      }
      getAllProducts();
    },[]);

 

    useEffect(()=> {
      async function fetchCart(){
        if (!user_id) {
          console.log("No user_id found, skipping cart fetch.");
          return; // Avoid fetching if user is not logged in
        }
        const result = await wishlistAPI.get();
        console.log("cart in app.js:", result)
          setCart(result);
        }
        fetchCart();
      },[user_id]);
  
  //  async function fetchCart(user_ids){

  //   try{
  //   console.log(user_id)
  //   const result = await wishlistAPI.get(user_id);
  //   console.log("fetch cart function result:", result)
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  //  }

  async function register(data){
    try{
      const result = await userAPI.register(data);
      return ({success: true, result})
    }
    catch(err){
      return ({success: false, error: err})
    }
  }

  async function login(data){
    try{
      console.log("Here is your login data:", data)
      setLoggedIn(true)
      const result = await userAPI.login(data);

      const token = result.token
      localStorage.setItem('token',token)

      setToken(token)
      
      console.log("token set at login", token)
      return ({success: true, result})
    }
    catch(err){
      return {success: false, error:err}
    }
  }

    async function logout(){
    try{
    const result = await userAPI.logout();
    sessionStorage.removeItem('user_id')
    localStorage.removeItem('token')
    setLoggedIn(false)
    console.log("You have been successfully logged out!", result)

    return result;
    }

    catch(err){
      return {success: false, error: err}

    }
  }


  async function addToCart({item_id, price, quantity,
    image,category,user_id,title}){
    try{
      const result = await wishlistAPI.add({
        item_id,
        price,
        quantity,
        image,
        category,
        user_id,
        title});
      return ({success: true, result})
    }

    catch(err){
      console.log("Error on frontend while adding to cart:", err)
      return ({success: false, error: err})
    }
  }

  

  return (

    <div>
    <Navbar logout={logout} isLoggedIn={isLoggedIn}/>
    <Skeleton  token={token} cart={cart} addToCart={addToCart} login={login} register={register} products={products}/>
    </div>

  );
}

export default App;
