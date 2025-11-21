import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

const Atolye = () => {
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

  const atelierProducts = products.filter((product) => product.category === 'atolye');

  return (
    <>
      <Header />
      <main>
        <h2>Zanaat Atölyesi</h2>
        <section className="product-section">
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            <div className="product-grid">
              {atelierProducts.map((product) => (
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
