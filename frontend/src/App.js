import React from "react";
import userAPI from "./APIs/userAPI";
import wishlistAPI from "./APIs/wishlistAPI";
import historyAPI from "./APIs/historyAPI";
import RegistrationForm from "./Forms/Register";
import LoginForm from "./Forms/Login";
import { useNavigate } from "react-router-dom";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Skeleton from "./Router/Skeleton";


function App() {

async function register(data){
  try{
    const result = await userAPI.register(data);
    return ({success: true, result})
  }
  catch(err){
    console.log("Error in registration in app.js:", err)
    return ({success: false, error: err})
  }
}

async function login(data){
  try{
    const result = await userAPI.login(data);
    return ({success: true, result})
  }
  catch(err){
    console.log("Error in login in app.js:", err)
    return {success: false, error:err}
  }
}

  return (

    <div>
    <Skeleton login={login} register={register}/>
    </div>

  );
}

export default App;
