import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

const designFilters = ['Tümü', 'Seramik', 'Deri Ürünler', 'Aksesuar'];

const deriveDesignTags = (product) => {
  if (Array.isArray(product.tags) && product.tags.length > 0) {
    return product.tags;
  }

  const searchable = `${product.title} ${product.subtitle || ''}`.toLowerCase();
  const tags = [];

  if (searchable.includes('seramik')) {
    tags.push('Seramik');
  }
  if (searchable.includes('deri')) {
    tags.push('Deri Ürünler');
  }
  if (searchable.includes('aksesuar') || searchable.includes('makrome') || searchable.includes('tasarım')) {
    tags.push('Aksesuar');
  }

  if (tags.length === 0) {
    tags.push('Aksesuar');
  }

  return tags;
};

const Atolye = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tümü');

  useEffect(() => {
    let active = true;

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        if (active) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to load products', error);
        if (active) {
          setProducts([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      active = false;
    };
  }, []);

  const atelierProducts = products.filter((product) => product.category === 'atolye');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'Tümü') {
      return atelierProducts;
    }

    return atelierProducts.filter((product) => deriveDesignTags(product).includes(activeFilter));
  }, [atelierProducts, activeFilter]);

  return (
    <>
      <Header />
      <main>
        <h2>Zanaat Atölyesi</h2>
        <p className="page-intro">El emeği tasarımları malzeme türüne göre ayırarak kolayca keşfet.</p>
        <div className="category-filters">
          {designFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={activeFilter === filter ? 'active' : undefined}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <section className="product-section">
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  image={product.image}
                  href={product.href}
                />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Atolye;
