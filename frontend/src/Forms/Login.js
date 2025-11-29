import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../CSS/form.css'


function Login({login, token}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData,setFormData] = useState(INITIAL_STATE)
    const [errors,setErrors] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) navigate('/products')
    }, [])

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}))
    }

    async function handleSubmit(evt){
        evt.preventDefault();
        const result = await login(formData);
        
        if(result.success !== true){
            console.log("Result in error at Login.js:", result.err)
            const errors = result.err.map(e=> e.message)
            setErrors([errors])
            setFormData(INITIAL_STATE)
            return;
        }


        setErrors([])
        navigate('/products')
        setFormData(INITIAL_STATE);
        return result;
    }
    return(

 <div>
  
  <div  id="loginheader"  className="container-fluid">
      <h2 className="h6">Please login to continue</h2>
  </div>


  <form className="row g-3 needs-validation  forms" noValidate onSubmit={handleSubmit}>
         
  <div class="col-md-4">
    <label for="validationCustom01" className="form-label">Username</label>
      <input type="text" name="username" className="form-control" id="validationCustom01" 
       value={formData.username} onChange={handleChange} required />
   </div>

  <div className="col-md-4">
    <label for="validationCustom02" className="form-label">Password</label>
    <input type="password" name="password" className="form-control" id="validationCustom02" 
    value={formData.password} onChange={handleChange} required />
  </div>


    {errors.length > 0 && errors.map(e =>
    <div> <p className="form-control is-invalid">{e}</p> </div>)}


  <div className="col-12">
    <button className="btn btn-primary" type="submit">Login</button>
  </div>

  
</form>
</div>  )}

export default Login;