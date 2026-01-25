import './CSS/products.css'

function CartCard({deleteFromCart,wishlist_itemid,price,quantity=1,image,title}){

    return(
        <div>
            <li className="product-container">
                <h3>{title}</h3>
                <img
                    src={image}
                    alt={title}
                    width={100}
                    height={100}/>
                <div> quantity: {quantity} </div>
                <div>total: ${price}</div>
                
                <button 
                    type='button'
                    className=' btn btn-outline-danger'
                    onClick={()=>deleteFromCart({wishlist_itemid})}>Remove
                </button>
            </li>
        </div>
    )

}

export default CartCard