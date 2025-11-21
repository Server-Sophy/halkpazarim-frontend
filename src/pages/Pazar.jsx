import { useEffect, useState } from 'react';
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

const Pazar = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <Header />
      <main>
        <h2>Yöresel Pazar</h2>
        <div className="category-filters">
          {categoryFilters.map((filter) => (
            <a href="#" key={filter}>
              {filter}
            </a>
          ))}
        </div>
        <section className="product-section">
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            <div className="product-grid">
              {pazarProducts.map((product) => (
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
