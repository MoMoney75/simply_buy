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
import Header from "../header";
import {jwtDecode}from 'jwt-decode'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ProductCard from "../ProductCard";



function App() {
  const [products,setProducts] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  //const [cart, setCart] = useState([]);
  const [token, setToken] = useState(null)
  const user_id = sessionStorage.user_id;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const expirationTime = parseInt(localStorage.getItem('token_expiration'),10)

    if(token && expirationTime){
      const currentTime = Date.now();

  

      if(currentTime > expirationTime){
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiration')
        setLoggedIn(false)
        console.log("WARNING, TOKEN EXPIRED, USER LOGGED OUT")
      }

      else{
        setLoggedIn(true)
        setToken(token)
        }
    }
  },[])

  useEffect(()=> {
    async function getAllProducts(){
      const result = await productsAPi.getAll();
        setProducts(result.data);
      }
      getAllProducts();
    },[]);

 

    // useEffect(()=> {
    //   async function fetchCart(){
       
    //     const result = await wishlistAPI.get();
    //     console.log("cart in app.js:", result)
    //       setCart(result.result);
    //     }
    //     fetchCart();
    //   },[]);
  
 

  async function register(data){
    try{
      const result = await userAPI.register(data);
      const token = result.token
      const decodedToken = jwtDecode(token)
      const expireTime = decodedToken.exp * 1000;

              
        localStorage.setItem('token',token)
        localStorage.setItem('token_expiration', expireTime)

          setToken(token)
          setLoggedIn(true)
          console.log("local storage set on registration:", localStorage)
      return ({success: true, result})
    }
    catch(err){
      return ({success: false, error: err})
    }
  }

  async function login(data){
    try{      
      const result = await userAPI.login(data);
      const token = result.token
      const decodedToken = jwtDecode(token)
      const expireTime = decodedToken.exp * 1000;
      
        localStorage.setItem('token',token)
        localStorage.setItem('token_expiration', expireTime)
      
          setToken(token)
          setLoggedIn(true)
          console.log("local storage set on login:", localStorage)
            return ({success: true, result})
        }

    catch(err){
      console.log("Result in login at App.js:", err)
      return ({success: false, err})
    }
  }

    async function logout(){
    try{
      sessionStorage.removeItem('user_id')
      localStorage.removeItem('token')
      localStorage.removeItem('token_expiration')
      setLoggedIn(false)
      console.log("You have been successfully logged out!")

      return {success: true, message: "User successfully logged out!"};
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
      if(err.status === 401){
        localStorage.removeItem('token');
        localStorage.removeItem('token_expiration');
        setLoggedIn(false);
        setToken(null);
      }
      console.log("Error on frontend while adding to cart:", err)
      return ({success: false, error: err})
    }
  }

  async function deleteFromCart({wishlist_itemid}) {

  //  we have access to wishlist_itemID from cart array
  // 
  // const wishlist_itemID = +id;
    console.log("item id in app.js", wishlist_itemid)
    try{
        const result = await wishlistAPI.delete({wishlist_itemid})
        console.log("result in app.js deletefromCart:", result)
        return ({success: true, result})
    }

    catch(err){
      return ({success: false, error: err})
    }
  }

  return (

    <div id="app-div">
    <Navbar logout={logout} isLoggedIn={isLoggedIn}/>
    {/* <Header /> */}
    <Skeleton  token={token} addToCart={addToCart} 
               deleteFromCart={deleteFromCart}
               login={login} register={register} 
               products={products}/>
    </div>

  );
}

export default App;
