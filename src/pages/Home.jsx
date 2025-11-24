import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../lib/api';

const Home = () => {
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

  const featuredFoods = products.filter((product) => product.category === 'yoresel').slice(0, 3);
  const featuredDesigns = products.filter((product) => product.category === 'atolye').slice(0, 3);

  return (
    <>
      <Header />
      <div className="split-container">
        <Link to="/pazar" className="split-section split-left">
          <div className="split-content">
            <h2>Yöresel Pazar</h2>
            <p>Anadolu&apos;nun binlerce yıllık lezzetleri</p>
            <span className="btn btn-secondary">Keşfet</span>
          </div>
        </Link>
        <Link to="/atolye" className="split-section split-right">
          <div className="split-content">
            <h2>Zanaat Atölyesi</h2>
            <p>Genç girişimcilerin el emeği</p>
            <span className="btn btn-secondary">Keşfet</span>
          </div>
        </Link>
      </div>
      <main>
        <section className="product-section">
          <h2>Öne Çıkan Lezzetler</h2>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            <div className="product-grid">
              {featuredFoods.map((product) => (
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

        <section className="product-section">
          <h2>Öne Çıkan Tasarımlar</h2>
          {loading ? (
            <p>Yükleniyor...</p>
          ) : (
            <div className="product-grid">
              {featuredDesigns.map((product) => (
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

        <section className="trust-section">
          <h2>Neden Halkpazarım?</h2>
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon" aria-hidden="true" />
              <h3>Yerel üreticiyi destekle</h3>
              <p>
                Anadolu&apos;nun köylerinden küçük atölyelere kadar, emeğin gerçek sahibinden
                alışveriş yaparak üreticinin payını büyüt.
              </p>
            </div>
            <div className="trust-item">
              <div className="trust-icon" aria-hidden="true" />
              <h3>Genç zanaatkârlara görünürlük</h3>
              <p>
                Tasarımcılar, seramikçiler ve deri ustaları ürünlerini güvenle sergilerken
                sen de özgün parçalara kolayca ulaş.
              </p>
            </div>
            <div className="trust-item">
              <div className="trust-icon" aria-hidden="true" />
              <h3>Türkiye&apos;nin dört bir yanından güvenli alışveriş</h3>
              <p>
                Doğrulanmış satıcı profilleri, açıklayıcı ürün kartları ve şeffaf fiyatlarla
                rahatça sipariş ver, dengeyi bozmadan kargo ücretini bil.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
