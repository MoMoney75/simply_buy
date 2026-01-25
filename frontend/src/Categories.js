import {React, useState, useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import productsAPi from "./APIs/productsAPI";

function CategoriesPage({addToCart}){
const [items, setItems] = useState([]);
const {category} = useParams();
let user_id = sessionStorage.getItem('user_id')

//console.log("items:", items)


useEffect(()=>{
    async function getByCategory(){
      const result = await productsAPi.getByCategory(category)
      setItems(result.data);
    } 
    getByCategory();
  },[category]);

  return(
    <div>
    <h1>Here are your products by category that you selected</h1>
        {items.map((product =>(
        <ol>            
            <li key={product.id}>
            
            <h3>{product.title}</h3>

            <img src={product.image}
                alt={product.title} width={100} height={100}/>

            <div>{product.rating.rate}stars ({product.rating.count}reviews)</div>

            <p>${product.price}</p>

            <Link to={`/products/product/${product.id}`} onClick={(evt,log)=>{
            }}>View</Link>


            <button onClick={()=>{
                addToCart({
                  item_id : product.id,
                  price : product.price,
                  quantity: 1,
                  image: product.image,
                  category: category,
                  user_id: user_id,
                  title: product.title
                });
            }}>Add to cart</button>
          </li>
        </ol>
        
        )))}
       
    </div>
  )
}
  

export default CategoriesPage;