import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const SHIPPING_FEE = 29.99;

const Sepet = () => {
  const {
    items, cartTotal, removeFromCart, clearCart,
  } = useCart();
  const subtotal = cartTotal;
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;
  const grandTotal = subtotal + shipping;

  const handleRemove = (event, id) => {
    event.preventDefault();
    removeFromCart(id);
  };

  return (
    <>
      <Header />
      <main>
        <h2>Alışveriş Sepetim</h2>
        <div className="cart-container">
          <div className="cart-items">
            {items.length === 0 ? (
              <p>Sepetinizde ürün bulunmuyor.</p>
            ) : (
              items.map((item) => (
                <div className="cart-item" key={item.id}>
                  {item.image && <img src={item.image} alt={item.title} />}
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    {item.sellerName && <p className="seller-meta">{item.sellerName}</p>}
                    <p>Adet: {item.quantity}</p>
                    <p className="price">{formatPrice(item.price * item.quantity)}</p>
                    <button type="button" className="link-button" onClick={(event) => handleRemove(event, item.id)}>
                      Kaldır
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <h3>Sepet Özeti</h3>
            <div className="cart-summary-line">
              <span>Ara Toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="cart-summary-line">
              <span>Kargo</span>
              <span>{shipping ? formatPrice(shipping) : '0 TL'}</span>
            </div>
            <div className="cart-summary-line total">
              <span>Genel Toplam</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
            <Link to="/odeme">
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
                Alışverişi Tamamla
              </button>
            </Link>
            {items.length > 0 && (
              <button type="button" className="btn btn-secondary" style={{ width: '100%', marginTop: '10px' }} onClick={clearCart}>
                Sepeti Temizle
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Sepet;
