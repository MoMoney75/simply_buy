import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({isLoggedIn,logout}){

   

    if(isLoggedIn === false){
    return(
            <nav class="navbar navbar-expand-sm bg-body-tertiary">
             <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
              </button>
             <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                {/* <a class="navbar-brand" href="#">Hidden brand</a> */}
                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
                  </li>

                  <li class="nav-item">
                    <Link to={'/login'} className="nav-link">Login</Link>
                  </li>

                  <li class="nav-item">
                     <Link to={'/register'} className="nav-link">Register</Link>
                  </li>
                </ul>
              </div>
             </div>
            </nav>
    )
}


    return(
               <nav class="navbar navbar-expand-sm bg-body-tertiary">
             <div class="container-fluid">
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
              </button>
             <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                {/* <a class="navbar-brand" href="#">Hidden brand</a> */}
                 <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
                  </li>

                  <li class="nav-item">
                    <Link to={'/cart'} className="nav-link">Cart</Link>
                  </li>

                  <li class="nav-item">
                     <Link to={'/products'} className="nav-link">Products</Link>
                  </li>

                  <li class="nav-item">
                     <Link  onClick={logout} to={'/'} className="nav-link">Logout</Link>
                  </li>
                </ul>
              </div>
             </div>
            </nav>
    )
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