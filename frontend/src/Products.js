import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import './CSS/products.css'
import ProductCard from "./ProductCard";

function Products({addToCart,products}){
const user_id = sessionStorage.getItem('user_id')
const [Selected, setSelected] = useState('all')
const [filtered, setFiltered] = useState([])
const [inCart, setInCart] = useState([null])
const navigate = useNavigate();

function redirectTo(address){
   return navigate(address)
} 

const handleChange = (category) => {
    setSelected(category);
        const filteredItems = products.filter((item) =>
          item.category.toLowerCase() === category.toLowerCase());

            setFiltered(filteredItems)
                console.log("Filtered items:", filteredItems)
}


return(
      <div>
          <div id="select-container"> 
            <select className="form-select form-select-sm" size="1" name="category"
              id="categorySelect" 
              value={Selected} 
              onChange={(e) => handleChange(e.target.value)}>

               <option className="option"value="all">All</option>
               <option className="option"value="electronics">Electronics</option>
               <option className="option"value="men's Clothing">Men's Clothing</option>
               <option className="option"value="jewelery">Jewelery</option> 
               <option className="option"value="women's Clothing">Women's Clothing</option>

             </select>

            </div>
            
        {Selected !== "all" ? (
          <div className="container-fluid text-center">
           <div className="row row-cols-2 row-cols-md-2  align-items-stretch products-list">
             
            {filtered.map(product => (
              <ProductCard
                key={product.id}
                item_id={product.id}
                title={product.title}
                image={product.image}
                rating={product.rating.rate}
                count={product.rating.count}
                price={product.price}
                category={product.category}
                user_id={user_id}
                addToCart={addToCart} /> ))}
             
            </div>    
           </div>)
          
           :(

    <div className="container-fluid text-center">
      <div className="row row-cols-2 row-cols-md-2 products-list">

        {products.map(product => (
         <ProductCard
          key={product.id}
          item_id={product.id}
          title={product.title}
          image={product.image}
          rating={product.rating?.rate ?? 0}
          count={product.rating?.count ?? 0}
          price={product.price} 
          category={product.category}
          user_id={user_id}
          addToCart={addToCart}/> ))}
       </div>
    </div>)}
      </div>
     )}



export default Products;