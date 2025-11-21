import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ImageWithFallback from '../components/ImageWithFallback';
import { PRODUCTS } from '../data/products';

const aliProducts = PRODUCTS.filter((product) => product.sellerSlug === 'ali');

const SaticiAli = () => (
  <>
    <Header />
    <main>
      <section className="seller-header">
        <ImageWithFallback className="seller-logo" src="/images/kars-gravyeri-kart.jpg" alt="Ali Amca" />
        <h1>Ali Amca&apos;nın Çiftliği</h1>
        <p className="seller-bio">
          &quot;Biz Kars&apos;ta 3 kuşaktır hayvancılıkla uğraşan bir aileyiz. Tüm ürünlerimizi
          kendi ineklerimizin sütünden, hiçbir katkı maddesi kullanmadan üretiyoruz. Bu platform
          sayesinde emeğimizi doğrudan size ulaştırmanın mutluluğunu yaşıyoruz.&quot;
        </p>
      </section>
      <section className="product-section">
        <h2>Satıcının Tüm Ürünleri</h2>
        <div className="product-grid">
          {aliProducts.map((product) => (
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
      </section>
    </main>
    <Footer />
  </>
);

export default SaticiAli;
