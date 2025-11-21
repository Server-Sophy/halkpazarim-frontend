import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import ImageWithFallback from '../components/ImageWithFallback';
import { PRODUCTS } from '../data/products';

const zeynepProducts = PRODUCTS.filter((product) => product.sellerSlug === 'zeynep');

const SaticiZeynep = () => (
  <>
    <Header />
    <main>
      <section className="seller-header">
        <ImageWithFallback className="seller-logo" src="/images/seramik.jpg" alt="Zeynep" />
        <h1>Zeynep&apos;in Atölyesi</h1>
        <p className="seller-bio">
          &quot;Üniversitede seramik bölümünden mezun oldum ve en büyük hayalim kendi tasarımlarımı
          insanlara ulaştırmaktı. Her bir parçayı sevgiyle şekillendiriyorum. Bu platform, benim
          gibi genç girişimciler için harika bir fırsat.&quot;
        </p>
      </section>
      <section className="product-section">
        <h2>Tasarımcının Tüm Ürünleri</h2>
        <div className="product-grid">
          {zeynepProducts.map((product) => (
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

export default SaticiZeynep;
