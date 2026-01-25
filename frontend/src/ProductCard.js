import { useNavigate, useLocation } from "react-router-dom";
import './CSS/products.css'

function ProductCard({addToCart,category,user_id,item_id,title,image,rating=0,count=0,price}){
    const navigate = useNavigate();
    const location = useLocation();
    const isDetailsPage = location.pathname.includes('/products/product');

    function redirectTo(address){ return navigate(address) } 

    return(
            <div className="col">
                <div className="product-container">
                <div id="image-container">
                     <img src={image} alt={title} width={200} height={200}/>
                </div>

                <div id="title-div">
                     <h1 id="product-title">{title}</h1>
                </div>
                
                <div id="rating-div"> 
                     {rating} stars ({count} reviews)
                </div> 

                <div id="price-div">
                    <p>${price}</p>
                </div>

        <div className="btn-div">
                {!isDetailsPage &&(

                    <button type="button" 
                        className="btn" 
                        onClick={()=> redirectTo(`/products/product/${item_id}`)}>            
                        View
                    </button>

                )}
                

                <button type="button" 
                        className="btn"
                        onClick={()=>{
                            addToCart({
                            item_id,
                            price,
                            quantity: 1,
                            image,
                            category,
                            user_id,
                            title}); }}>
                         Add to cart
                </button>
            </div>
                </div> 
                </div> )}

export default ProductCard;