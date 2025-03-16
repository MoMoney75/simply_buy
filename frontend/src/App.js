import {React, useState, useEffect} from "react";
import productsAPi from "./APIs/productsAPI";
import userAPI from "./APIs/userAPI";
import wishlistAPI from "./APIs/wishlistAPI";
import historyAPI from "./APIs/historyAPI";
import RegistrationForm from "./Forms/Register";
import LoginForm from "./Forms/Login";
import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Skeleton from "./Router/Skeleton";


function App() {
  const [products,setProducts] = useState([]);
  const user_id = sessionStorage.user_id;

  useEffect(()=> {
    async function getAllProducts(){
      const result = await productsAPi.getAll();
        setProducts(result.data);
      }
      getAllProducts();
    },[]);

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
      const result = await userAPI.login(data);
      
      return ({success: true, result})
    }
    catch(err){
      return {success: false, error:err}
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
    <Skeleton addToCart={addToCart} login={login} register={register} products={products}/>
    </div>

  );
}

export default App;
