import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { useAuth } from '../context/AuthContext';
import './ProductCard.css';

function ProductCard({ product, showActions = true }) {
  const navigate = useNavigate();
  const { addToCart, isLoggedIn } = useAuth();

  const { id, title, image, price, category, rating } = product;

  async function handleAddToCart(e) {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    await addToCart({
      item_id: id,
      price,
      quantity: 1,
      image,
      category,
      title,
    });
  }

  return (
    <div className="product-card" onClick={() => navigate(`/products/product/${id}`)}>
      <div className="product-card-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="product-card-body">
        <span className="product-category">{category}</span>
        <h3 className="product-title">{title}</h3>
        {rating && (
          <StarRating rating={rating.rate} count={rating.count} />
        )}
        <div className="product-card-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          {showActions && (
            <button
              className="btn btn-primary btn-sm"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
