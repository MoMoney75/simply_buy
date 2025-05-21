import {React, useEffect,useState} from "react";
import productsAPi from "./APIs/productsAPI";
import { useParams } from "react-router-dom";

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
return (
            <div>
            <h1>Here is the product detail</h1>

            <li key={product.id}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <img src={product.image}
                        alt={product.title} width={100} height={100}/>
                    <p>${product.price}</p>
                    

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


            </div>
)
}

export default ProductDetails;