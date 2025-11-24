import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ImageWithFallback from '../components/ImageWithFallback';
import { demoSellers } from '../data/sellersDemo';
import { sellerProducts } from '../data/sellerProductsDemo';
import { fetchProducts } from '../lib/api';

const SaticiDetay = () => {
  const { id } = useParams();
  const seller = demoSellers.find((item) => item.id === id);
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
  }, [id]);

  const staticProducts = useMemo(
    () => (seller ? sellerProducts[seller.id] || [] : []),
    [seller],
  );

  const apiProducts = useMemo(
    () => products.filter((product) => product.sellerId === id),
    [products, id],
  );

  const productsToRender = staticProducts.length > 0 ? staticProducts : apiProducts;

  if (!seller) {
    return (
      <>
        <Header />
        <main>
          <h2>Satıcı bulunamadı</h2>
          <p>Aradığınız satıcı kaldırılmış ya da hiç eklenmemiş olabilir.</p>
          <Link to="/saticilar" className="btn btn-secondary">
            Satıcı listesine dön
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="seller-header">
          {seller.image && (
            <ImageWithFallback className="seller-logo" src={seller.image} alt={seller.name} />
          )}
          <h1>{seller.name}</h1>
          <p className="seller-meta">
            {seller.city}
            {' '}
            <span aria-hidden="true">·</span>
            {' '}
            {seller.region}
          </p>
          <p className="seller-bio">{seller.description}</p>
        </section>
        <section className="product-section">
          <h2>Satıcının Ürünleri</h2>
          {staticProducts.length > 0 ? (
            <div className="product-grid">
              {staticProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  image={product.image}
                  sellerName={seller.name}
                />
              ))}
            </div>
          ) : loading ? (
            <p>Yükleniyor...</p>
          ) : productsToRender.length > 0 ? (
            <div className="product-grid">
              {productsToRender.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  image={product.image}
                  sellerName={seller.name}
                />
              ))}
            </div>
          ) : (
            <p>Bu satıcı henüz ürün eklemedi.</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SaticiDetay;
