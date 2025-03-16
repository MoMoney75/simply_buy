import {React, useState} from "react";
import { useNavigate } from "react-router-dom";
function Login({login}){
    const navigate = useNavigate();
    const INITIAL_STATE = {
        username: '',
        password: ''
    }

    const [formData,setFormData] = useState(INITIAL_STATE)
    const [errors,setErrors] = useState([])

    function handleChange(evt){
        const {name, value} = evt.target;
        setFormData(data => ({...data, [name]: value}))
    }
    async function handleSubmit(evt){
        evt.preventDefault();
        const result = await login(formData);
        
        if(result.success !== true){
            console.log("Result in error:", result)
            setErrors([result.error])
            setFormData(INITIAL_STATE)
            return;
        }
        setErrors([])
        sessionStorage.setItem('user_id', result.result.user.user_id)
        navigate('/products')
        setFormData(INITIAL_STATE);
        return result;
    }
    return(
        <div>
            {errors.length > 0 && errors.map(e => <p>{e}</p>)}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">username</label>
                <input type="text" name="username" value={formData.username}  onChange={handleChange}/>

                <label htmlFor="password">password</label>
                <input type="password" name="password" value={formData.password}  onChange={handleChange}/>

                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default Login;