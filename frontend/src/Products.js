import React from "react";
import { Link } from "react-router-dom";
function Products({addToCart,products}){
const user_id = sessionStorage.getItem('user_id')

return(
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
    </div>
)
}

export default Products;