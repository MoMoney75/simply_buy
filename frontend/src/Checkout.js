import { useNavigate } from "react-router-dom";
import './CSS/checkout.css'


function Checkout(){
const navigate = useNavigate();

    return(
        <div id="checkout-page">
            <div id="checkout-container">
            <h1>Thank you for your order</h1>

            <div>
                Order confirmation#: 1o999qzsjt
                <p>Please allow between 3-5 business days for delivery</p>
            </div>

            <div>
                <button className="btn btn-success" onClick={()=>{navigate('/products')}}> Continue Shopping </button>
            </div> 
        </div>
   </div>

    )
}

export default Checkout;