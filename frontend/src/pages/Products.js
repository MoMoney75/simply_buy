import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import productsAPI from '../APIs/productsAPI';
import ProductCard from '../components/ProductCard';
import CategoryDropdown from '../components/CategoryDropdown';
import './Products.css';

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'electronics', label: 'Electronics' },
  { value: "men's clothing", label: "Men's Clothing" },
  { value: 'jewelery', label: 'Jewelry' },
  { value: "women's clothing", label: "Women's Clothing" },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const result = await productsAPI.getAll();
        setProducts(result.data || []);
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let items = products;
    if (category !== 'all') {
      items = items.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((p) => p.title.toLowerCase().includes(q));
    }
    return items;
  }, [products, category, search]);

  function handleCategoryChange(value) {
    if (value === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', value);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="page-title">Shop All Products</h1>
        <p className="page-subtitle">
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} available
        </p>

        <div className="products-toolbar">
          <input
            type="search"
            className="form-input search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <CategoryDropdown
            value={category}
            options={CATEGORIES}
            onChange={handleCategoryChange}
            label="Category"
          />
        </div>

        {loading ? (
          <div className="spinner" />
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No products found</h3>
            <p>Try adjusting your search or category filter.</p>
          </div>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
