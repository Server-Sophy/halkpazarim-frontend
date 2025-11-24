import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

const categoryFilters = [
  'Tümü',
  'Kahvaltılık',
  'Peynirler',
  'Zeytinyağı',
  'Reçel & Bal',
  'Bakliyat',
  'Salça & Sos',
];

const deriveProductTags = (product) => {
  if (Array.isArray(product.tags) && product.tags.length > 0) {
    return product.tags;
  }

  const searchable = `${product.title} ${product.subtitle || ''}`.toLowerCase();
  const tags = [];

  if (searchable.includes('peynir')) {
    tags.push('Peynirler');
  }
  if (searchable.includes('zeytin')) {
    tags.push('Zeytinyağı');
  }
  if (searchable.includes('reçel') || searchable.includes('bal')) {
    tags.push('Reçel & Bal');
  }
  if (searchable.includes('bakliyat') || searchable.includes('nohut') || searchable.includes('mercimek')) {
    tags.push('Bakliyat');
  }
  if (searchable.includes('salça') || searchable.includes('sos')) {
    tags.push('Salça & Sos');
  }

  if (tags.length === 0) {
    tags.push('Kahvaltılık');
  }

  return tags;
};

const Pazar = () => {
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

  const pazarProducts = products.filter((product) => product.category === 'yoresel');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'Tümü') {
      return pazarProducts;
    }

    return pazarProducts.filter((product) => deriveProductTags(product).includes(activeFilter));
  }, [pazarProducts, activeFilter]);

  return (
    <>
      <Header />
      <main>
        <h2>Yöresel Pazar</h2>
        <p className="page-intro">
          Kahvaltılık, peynir, zeytin ve daha fazlası burada. Filtreleri kullanarak ürüne hızlıca ulaş.
        </p>
        <div className="category-filters">
          {categoryFilters.map((filter) => (
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

export default Pazar;
