import { Routes,Route} from "react-router-dom";
import RegistrationForm from "../Forms/Register";
import Login from "../Forms/Login";
import Products from "../Products";
import Home from "../Home";
import CategoriesPage from "../Categories";
import ProductDetails from "../Details";
function Skeleton({login, register,products}){

    return(

        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login login={login}/>}/>
            <Route path="/register" element={<RegistrationForm register={register}/>}/>
            <Route path="/products" element={<Products products={products}/>}/>
            <Route path="/products/:category" element={<CategoriesPage />} />
            <Route path="/products/product/:id" element={<ProductDetails />} />
        </Routes>

    )

}

export default Skeleton;