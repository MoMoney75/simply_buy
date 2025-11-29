import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../CSS/navbar.css"

function Navbar({isLoggedIn,logout}){

   

    if(isLoggedIn === false){
    return(


            <nav className="navbar navbar-expand-sm bg-body-tertiary">
             <div className="nav-bar container-fluid">

              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" 
              aria-expanded="false" aria-label="Toggle navigation">

                  <span className="nav-bar-button navbar-toggler-icon"></span> 
              </button>
              
             <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                {/* <a class="navbar-brand" href="#">Hidden brand</a> */}
                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
                  </li>

                  <li className="nav-item">
                    <Link to={'/login'} className="nav-link">Login</Link>
                  </li>

                  <li className="nav-item">
                     <Link to={'/register'} className="nav-link">Register</Link>
                  </li>
                </ul>
              </div>
             </div>
            </nav>

    )
}


    return(

               <nav className="navbar navbar-expand-sm bg-body-tertiary">
             <div className="nav-bar container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarTogglerDemo01" 
              aria-controls="navbarTogglerDemo01" aria-expanded="false" 
              aria-label="Toggle navigation">
               <span className="nav-bar-button navbar-toggler-icon"></span>
              </button>
             <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                {/* <a class="navbar-brand" href="#">Hidden brand</a> */}
                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to={'/'} className="nav-link active" aria-current="page">Home</Link>
                  </li>

                  <li className="nav-item">
                    <Link to={'/cart'} className="nav-link">Cart</Link>
                  </li>

                  <li className="nav-item">
                     <Link to={'/products'} className="nav-link">Products</Link>
                  </li>

                  <li className="nav-item">
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