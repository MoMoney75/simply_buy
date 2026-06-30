import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const CATEGORIES = [
  {
    id: 'electronics',
    label: 'Electronics',
    description: 'Cutting-edge tech to power your lifestyle.',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)',
  },
  {
    id: 'jewelery',
    label: 'Jewelry',
    description: 'Timeless pieces crafted with elegance.',
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #b45309 100%)',
  },
  {
    id: "men's clothing",
    label: "Men's Clothing",
    description: 'Sharp styles for every occasion.',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #334155 100%)',
  },
  {
    id: "women's clothing",
    label: "Women's Clothing",
    description: 'Fashion that celebrates your style.',
    gradient: 'linear-gradient(135deg, #831843 0%, #9d174d 100%)',
  },
];

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  function handleShop() {
    navigate(isLoggedIn ? '/products' : '/login');
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-content">
          <span className="hero-badge">New Collection 2026</span>
          <h1 className="hero-title">
            Shop smarter with <span>Simply Buy</span>
          </h1>
          <p className="hero-subtitle">
            Discover curated products across electronics, fashion, and jewelry.
            Fast checkout, secure accounts, and a seamless shopping experience.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={handleShop}>
              Start Shopping
            </button>
            {!isLoggedIn && (
              <button
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/register')}
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">
            Find exactly what you&apos;re looking for
          </p>
          <div className="category-grid">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className="category-card"
                style={{ background: cat.gradient }}
                onClick={() =>
                  isLoggedIn
                    ? navigate(`/products?category=${encodeURIComponent(cat.id)}`)
                    : navigate('/login')
                }
              >
                <h3>{cat.label}</h3>
                <p>{cat.description}</p>
                <span className="category-arrow">&rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#128722;</div>
            <h3>Easy Shopping</h3>
            <p>Browse, add to cart, and checkout in just a few clicks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128274;</div>
            <h3>Secure Accounts</h3>
            <p>Your data is protected with JWT authentication.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128230;</div>
            <h3>Order History</h3>
            <p>Track your purchases and revisit past orders anytime.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
