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
      const result = await userAPI.login(data);
      return ({success: true, result})
    }
    catch(err){
      return {success: false, error:err}
    }
  }

  return (

    <div>
    <Skeleton login={login} register={register} products={products}/>
    </div>

  );
}

export default App;
