import {React, useEffect,useState} from "react";
import productsAPi from "./APIs/productsAPI";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";
import './CSS/products.css'
function ProductDetails({addToCart}){
const {id} = useParams();
const [product,setProduct] = useState({});
const [errors, setErrors] = useState([])
const user_id = sessionStorage.getItem('user_id')
const navigate = useNavigate();

function redirectTo(address){ return navigate(address) } 

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
                <h1 id="details-title">{product.title}</h1>
                 <div> 
                    <img src={product.image} width={"200px"} height={"200px"} />

                    <div id="details-rating">
                        {product.rating?.rate ?? 0}
                        <i class="fa-solid fa-star" style={{color: "rgb(255, 212, 59)"}}> </i>
                    </div>

                    <span id="details-price"> ${product.price} </span>

                    <div className="btn-div">
                            <button  className="btn details-btn"
                                     onClick={()=>redirectTo('/products')}>
                                     Back
                            </button>

                            <button  type="button" 
                                     className="btn details-btn"
                                     onClick={()=>{
                                     addToCart({
                                     item_id: product.id,
                                     price : product.price,
                                     quantity: 1,
                                     image: product.image,
                                     category: product.category,
                                     user_id: user_id,
                                     title: product.title}); }}>
                                     Add
                            </button>
                        </div>
                 </div>

                {/* <ProductCard
                  key={product.id}
                  item_id={product.id}
                  title={null}
                  rating={product.rating?.rate ?? 0}
                  count={product.rating?.count ?? 0}
                  price={product.price} 
                  category={product.category}
                  user_id={user_id}
                  addToCart={addToCart}/> */}
            </div>
    </div>
    )}
}


export default ProductDetails;