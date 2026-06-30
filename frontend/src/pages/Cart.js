import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wishlistAPI from '../APIs/wishlistAPI';
import CartItem from '../components/CartItem';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [removingId, setRemovingId] = useState(null);
  const navigate = useNavigate();
  const { deleteFromCart } = useAuth();

  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const result = await wishlistAPI.get();
        if (result?.error) {
          setError(result.error);
          setCart([]);
        } else if (result?.result) {
          setCart(result.result);
        }
      } catch {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  async function handleRemove(wishlist_itemid) {
    setRemovingId(wishlist_itemid);
    const result = await deleteFromCart({ wishlist_itemid });
    setRemovingId(null);

    if (result.success) {
      setCart((prev) =>
        prev.filter((item) => item.wishlist_itemid !== wishlist_itemid)
      );
    }
  }

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  if (loading) return <div className="spinner" />;

  return (
    <div className="page cart-page">
      <div className="container cart-container">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">
          {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
        </p>

        {error && <div className="alert alert-error">{error}</div>}

        {cart.length === 0 ? (
          <div className="empty-state">
            <h3>Your cart is empty</h3>
            <p>Add some products to get started!</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cart.map((item) => (
                <CartItem
                  key={item.wishlist_itemid}
                  item={item}
                  onRemove={handleRemove}
                  isRemoving={removingId === item.wishlist_itemid}
                />
              ))}
            </div>
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free">Free</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-primary btn-lg checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
