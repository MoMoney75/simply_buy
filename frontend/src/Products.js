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
          <div className="container text-center">
            <select className="form-select form-select-sm" size="5" name="category" 
              id="categorySelect" 
              value={Selected} 
              onChange={(e) => handleChange(e.target.value)}>

                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="men's Clothing">Men's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="women's Clothing">Women's Clothing</option>

            </select>
          </div>

        {Selected !== "all" ? (
          <div className="container text-center">
           <div className="row row-cols row-cols-md-2 products-list">
             
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

    <div className="container text-center">
      <div className="row row-cols row-cols-md-2 products-list">

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
      </div> )}



export default Products;