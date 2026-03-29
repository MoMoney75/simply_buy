import './CSS/products.css'

function CartCard({deleteFromCart,wishlist_itemid,price,quantity=1,image,title}){

    return(
        <div className='col'>
            <div className="product-container">
                <div id='image-container'>
                    <img src={image} alt={title}/>
                </div>

                <div id="title-div">
                    <h1>{title}</h1>
                </div>
    
                <div> quantity: {quantity} </div>
                <span id='price-div'>${price}</span>
                <div className='btn-div'>
                <button 
                    type='button'
                    className=' btn products-btn btn-outline-danger'
                    onClick={()=>deleteFromCart({wishlist_itemid})}>Remove
                </button>
                </div>
            </div>
        </div>
    )

}

export default CartCard