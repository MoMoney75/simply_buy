import { Routes,Route} from "react-router-dom";
import RegistrationForm from "../Forms/Register";
import Login from "../Forms/Login";
import Products from "../Products";
import Home from "../Home";
import CategoriesPage from "../Categories";
import ProductDetails from "../Details";
import Cart from "../Cart";
function Skeleton({token, cart, login, register,products, addToCart, deleteFromCart}){

    return(

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart cart={cart} deleteFromCart={deleteFromCart}/>} />
            <Route path="/login" element={<Login login={login} token={token}/>}/>
            <Route path="/register" element={<RegistrationForm register={register}/>}/>
            <Route path="/products" element={<Products products={products}/>}/>
            <Route path="/products/:category" element={<CategoriesPage addToCart={addToCart} />} />
            <Route path="/products/product/:id" element={<ProductDetails addToCart={addToCart}/>} />
        </Routes>

    )

}

export default Skeleton;