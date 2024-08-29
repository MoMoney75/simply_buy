import {React, useState, useEffect} from "react";
import { useParams,Link } from "react-router-dom";
import productsAPi from "./APIs/productsAPI";

function CategoriesPage(){
const [categories, setCategory] = useState([]);
const {category} = useParams();

useEffect(()=>{
    async function getByCategory(){
      const result = await productsAPi.getByCategory(category)
      setCategory(result.data);
    } 
    getByCategory();
  },[category]);

  return(
    <div>
    <h1>Here are your products by category</h1>
        {categories.map((product =>(
        <ol>            
            <li key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image}
                alt={product.title} width={100} height={100}/>
            <div>{product.rating.rate}stars ({product.rating.count}reviews)</div>
            <p>${product.price}</p>
            <Link to={`/products/product/${product.id}`}>View</Link>
            <button>Add to cart</button>
        </li>
        </ol>
        )))}
    </div>
  )
}
  

export default CategoriesPage;