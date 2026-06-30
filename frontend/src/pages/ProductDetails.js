import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productsAPI from '../APIs/productsAPI';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isLoggedIn } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const result = await productsAPI.getById(id);
        setProduct(result.data);
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  async function handleAddToCart() {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    await addToCart({
      item_id: product.id,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
      title: product.title,
    });
  }

  if (loading) return <div className="spinner" />;

  if (!product) {
    return (
      <div className="empty-state">
        <h3>Product not found</h3>
        <button className="btn btn-primary" onClick={() => navigate('/products')}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-info">
            <span className="product-category">{product.category}</span>
            <h1 className="product-detail-title">{product.title}</h1>
            {product.rating && (
              <StarRating
                rating={product.rating.rate}
                count={product.rating.count}
              />
            )}
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>
            <div className="product-detail-actions">
              <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/cart')}
              >
                View Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
