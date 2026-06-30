import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wishlistAPI from '../APIs/wishlistAPI';
import historyAPI from '../APIs/historyAPI';
import { getUserId } from '../utils/auth';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const navigate = useNavigate();
  const { refreshCartCount } = useAuth();

  useEffect(() => {
    async function fetchCart() {
      try {
        const result = await wishlistAPI.get();
        if (result?.result?.length > 0) {
          setCart(result.result);
        } else {
          navigate('/cart');
        }
      } catch {
        navigate('/cart');
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, [navigate]);

  async function handlePlaceOrder() {
    setProcessing(true);
    const userId = getUserId();
    const purchaseGroupId = Date.now();

    try {
      for (const item of cart) {
        await historyAPI.add({
          purchase_id: purchaseGroupId,
          item_id: item.item_id,
          price: Math.round(Number(item.price)),
          quantity: item.quantity || 1,
          description: item.title,
          image: item.image,
          category: item.category,
          user_id: userId,
        });
        await wishlistAPI.delete({ wishlist_itemid: item.wishlist_itemid });
      }
      await refreshCartCount();
      setOrderId(`SB-${purchaseGroupId}`);
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setProcessing(false);
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  if (loading) return <div className="spinner" />;

  if (orderId) {
    return (
      <div className="page">
        <div className="container checkout-success">
          <div className="success-icon">&#10003;</div>
          <h1>Thank you for your order!</h1>
          <p className="order-id">Order confirmation: <strong>{orderId}</strong></p>
          <p className="delivery-note">
            Please allow 3–5 business days for delivery.
          </p>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container checkout-container">
        <h1 className="page-title">Checkout</h1>
        <p className="page-subtitle">Review your order before placing it</p>

        <div className="checkout-layout">
          <div className="checkout-items">
            {cart.map((item) => (
              <div key={item.wishlist_itemid} className="checkout-item">
                <img src={item.image} alt={item.title} />
                <div className="checkout-item-info">
                  <h4>{item.title}</h4>
                  <p>Qty: {item.quantity || 1}</p>
                </div>
                <span className="checkout-item-price">
                  ${Number(item.price).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="checkout-summary">
            <h3>Order Total</h3>
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary btn-lg checkout-btn"
              onClick={handlePlaceOrder}
              disabled={processing}
            >
              {processing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
