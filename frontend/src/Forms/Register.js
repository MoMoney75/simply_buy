import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserConext from '../App/App'

function RegistrationForm({register}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        first_name: '',
        last_name: '',
        username: '',
        password: ''
    }
    const user = useContext(UserConext)
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState({})

    function handleChange(evt){
        const {name,value} = evt.target;
        setFormData(data =>({...data, [name]: value}
    ))}


    async function handleSubmit(evt){
        evt.preventDefault();
        const result = await register(formData);

        if (result.success !== true) {
            console.log("Error registering new user:", result)
            const fieldErrors = {};
            result.error.forEach(err => {
            fieldErrors[err.field] = err.message;
            
            });
            setErrors(fieldErrors);
            return;
          }
          

        setErrors([])
        sessionStorage.setItem("user_id", result.result.user.user_id)    
        setFormData(INITIAL_STATE)
        navigate('/products')
        return result;
    }

    
    return(
      
<div>
  <div  id="registerheader"  className="container-fluid">
      <h2 className="h6">Please create an account to continue</h2>
  </div>

        <form className="row g-3 needs-validation" onSubmit={handleSubmit} noValidate>
       

 <div class="col-md-4">
 {errors.length > 0 && errors.map(e => <p>{e}</p>)}

   <label for="validationCustom01" className="form-label">First Name</label>
     <input 
            type="text" 
            name="first_name" 
            className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
            id="validationCustom01" 
            value={formData.first_name} onChange={handleChange} required/>

        {errors.first_name && (
        <div className="invalid-feedback">
        {errors.first_name}
    </div>
  )}

     </div>

 <div className="col-md-4">
   <label for="validationCustom02" className="form-label">Last Name</label>
   <input 
    type="text" 
    name="last_name" 
    className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
    id="validationCustom02"
    value={formData.last_name} onChange={handleChange} required />


{errors.last_name && (
        <div className="invalid-feedback">
        {errors.last_name}
    </div>
  )}
 </div>


 <div className="col-md-4">
   <label for="validationCustom02" className="form-label">Username</label>
   <input 
    type="text" 
    name="username" 
    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
    id="validationCustom02" 
    value={formData.username} onChange={handleChange} required />

    {errors.username && (
        <div className="invalid-feedback">
        {errors.username}
    </div>
  )}

    
 </div>


 <div class="col-md-4">
   <label for="validationCustom02" className="form-label">Password</label>
   <input 
    type="password" 
    name="password" 
    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
    id="validationCustom02" 
    value={formData.password} onChange={handleChange} required />

    {errors.password && (
        <div className="invalid-feedback">
        {errors.password}
    </div>)}

 </div>

 <div className="col-12">
   <button className="btn btn-primary" type="submit">Register</button>
 </div>
</form>
</div>
    )
}

export default RegistrationForm;