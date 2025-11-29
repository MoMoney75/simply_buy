import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



function Products({addToCart,products}){
const user_id = sessionStorage.getItem('user_id')
const [Selected, setSelected] = useState('all')
const [filtered, setFiltered] = useState([])


const handleChange = (category) => {
    setSelected(category);
        const filteredItems = products.filter((item) =>
          item.category.toLowerCase() === category.toLowerCase());

            setFiltered(filteredItems)
                console.log("Filtered items:", filteredItems)
}


return(

    <div>
        
  {Selected !== "all" ? (
    <div>
        <ul>
      {filtered.map((product) => (
        <li key={product.id}>
          <h3>{product.title}</h3>

          <img
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
          />

          <div>
            {product.rating.rate} stars ({product.rating.count} reviews)
          </div>

          <p>${product.price}</p>
        </li>
      ))}
      </ul>

        <select name="category" 
            id="categorySelect" 
            value={Selected} 
            onChange={(e) => handleChange(e.target.value)}>
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="men's Clothing">Men's Clothing</option>
                <option value="jewelery">Jewelery</option>
                <option value="women's Clothing">Women's Clothing</option>
        </select>
    </div> ) 
    
                    : 
    
    (
    <div>
    <h1>HERE ARE ALL YOUR PRODUCTS</h1>
    <ol>
        {products.map((product,id) => (

            <li key={product.id}>
                <h3>{product.title}</h3>
                <img src={product.image}
                    alt={product.title} width={100} height={100}/>
                <div>{product.rating.rate}stars ({product.rating.count}reviews)</div>
                <p>${product.price}</p>
                <Link to={`/products/product/${product.id}`}>View</Link>
                  <button onClick={()=>{
            addToCart({
              item_id : product.id,
              price : product.price,
              quantity: 1,
              image: product.image,
              category: product.category,
              user_id: user_id,
              title: product.title
            });
             }}>Add to cart</button>
            </li>
        ))}
    </ol>

<div>
<select name="category" 
    id="categorySelect" 
    value={Selected} 
    onChange={(e) => handleChange(e.target.value)}>
<option value="all">All</option>
<option value='electronics'>Electronics</option>
<option value='mens Clothing'>Men's Clothing</option>
<option value='jewelery'>Jewelery</option>
<option value='womens Clothing'>Women's Clothing</option>
</select>
</div>
</div>
  )}
</div> )}


export default Products;