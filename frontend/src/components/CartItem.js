import './CartItem.css';

function CartItem({ item, onRemove, isRemoving }) {
  function handleRemove() {
    onRemove(item.wishlist_itemid);
  }

  return (
    <div className={`cart-item ${isRemoving ? 'removing' : ''}`}>
      <div className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <span className="cart-item-category">{item.category}</span>
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-qty">Qty: {item.quantity}</p>
      </div>
      <div className="cart-item-actions">
        <span className="cart-item-price">${Number(item.price).toFixed(2)}</span>
        <button
          className="btn btn-danger btn-sm"
          onClick={handleRemove}
          disabled={isRemoving}
        >
          {isRemoving ? '...' : 'Remove'}
        </button>
      </div>
    </div>
  );
}

export default CartItem;
