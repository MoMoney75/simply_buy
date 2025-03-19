import React from "react";
import { Link } from "react-router-dom";

function Navbar({isLoggedIn,logout}){
    if(!isLoggedIn){
    return(
        <nav>
            <ul>
                <Link to={'/'}>Home</Link>
                <Link to={'/login'}>Login</Link>
                <Link to={'/register'}>Register</Link>
                <Link to={'/products'}>Products</Link>
            </ul>

        </nav>
    )
}

else{
    return(
        <nav>
        <ul>
            <Link to={'/'}>Home</Link> 
            <Link to={'/cart'}>Cart</Link>
            <Link to={'/products'}>Products</Link>
            <Link  onClick={logout} to={'/'}>Logout</Link>
        </ul>
    </nav>
    )
}
}


export default Navbar;
// <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/login" element={<Login login={login}/>}/>
// <Route path="/register" element={<RegistrationForm register={register}/>}/>
// <Route path="/products" element={<Products products={products}/>}/>
// <Route path="/products/:category" element={<CategoriesPage addToCart={addToCart} />} />
// <Route path="/products/product/:id" element={<ProductDetails addToCart={addToCart}/>} />
// </Routes>