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
                        <img src={image} alt={title}/>
                    </div>

                    <div id="title-div">
                        <h1 id="product-title">{title}</h1> 
                    </div>
                    {isDetailsPage ?
                        <div id="rating-div">
                            {rating}
                            <i class="fa-solid fa-star" style={{color: "rgb(255, 212, 59)"}}> </i>
                        </div> : null }

                    
                                     <span id="price-div"> ${price} </span>

                    <div className="btn-div">
                        

                    {isDetailsPage ? 
                        <div className="btn-div">
                            <button  className="btn products-btn"
                                     onClick={()=>redirectTo('/products')}>
                                     Back
                            </button>

                            <button  type="button" 
                                     className="btn products-btn"
                                     onClick={()=>{
                                     addToCart({
                                     item_id,
                                     price,
                                     quantity: 1,
                                     image,
                                     category,
                                     user_id,
                                     title}); }}>
                                     Add
                            </button>
                        </div>
                            :
                        <button type="button" 
                            className="btn products-btn" 
                            onClick={()=> redirectTo(`/products/product/${item_id}`)}> 
                            View           
                        </button>}
                 </div>
              </div> 
            </div> )}

export default ProductCard;