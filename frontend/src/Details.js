import {React, useEffect,useState} from "react";
import productsAPi from "./APIs/productsAPI";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import './CSS/products.css'
function ProductDetails({addToCart}){
const {id} = useParams();
const [product,setProduct] = useState({});
const [errors, setErrors] = useState([])
const user_id = sessionStorage.getItem('user_id')

useEffect(()=>{
    async function getById(){
        const result = await productsAPi.getById(id)
        setProduct(result.data)
    }
    getById();
},[id]);


if(document.URL.includes('/products/product')){
return (

    <div className="container-fluid text-center details-container products-container">
           <div>
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
                  addToCart={addToCart}/>
            </div>
    </div>
    )}
}


export default ProductDetails;