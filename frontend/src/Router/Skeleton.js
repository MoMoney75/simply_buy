import { Routes,Route} from "react-router-dom";
import RegistrationForm from "../Forms/Register";
import Login from "../Forms/Login";
function Skeleton({login, register}){

    return(

        <Routes>
            <Route path="/login" element={<Login login={login}/>}/>
            <Route path="/register" element={<RegistrationForm register={register}/>}/>
        </Routes>

    )

}

export default Skeleton;