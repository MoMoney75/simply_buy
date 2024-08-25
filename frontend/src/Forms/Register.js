import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserConext from '../App'

function RegistrationForm({register}){
    const INITIAL_STATE = {
        first_name: '',
        last_name: '',
        username: '',
        password: ''
    }
    const user = useContext(UserConext)
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [errors, setErrors] = useState([])

    function handleChange(evt){
        const {name,value} = evt.target;
        setFormData(data =>({...data, [name]: value}
    ))}


    async function handleSubmit(evt){
        evt.preventDefault();
        const result = await register(formData);

        if(result.success !== true){
            console.log(result)
                setErrors([result.error])
                setFormData(INITIAL_STATE)
                return;
            };

        setErrors([])
        sessionStorage.setItem("user_id", result.result.user.user_id)    
        setFormData(INITIAL_STATE)
        return result;
    }

    
    return(
        <div>
            <h1>Register here!</h1>
            {errors.length ? errors.map(e => <p>{e}</p>) : null}
            <form onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name</label>
                <input name="first_name" type="text" value={formData.first_name} onChange={handleChange}/>

                <label htmlFor="last_name">Last Name</label>
                <input name="last_name" type="text" value={formData.last_name} onChange={handleChange}/>

                <label htmlFor="username">Username</label>
                <input name="username" type="text" value={formData.username} onChange={handleChange}></input>

                <label htmlFor="password">Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange}></input>

          <button type="submit">submit</button>
            </form>
        </div>
    )
}

export default RegistrationForm;