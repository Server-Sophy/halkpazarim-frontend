import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';

const SHIPPING_FEE = 29.99;

const Odeme = () => {
  const { items, cartTotal } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const subtotal = cartTotal;
  const shipping = items.length > 0 ? SHIPPING_FEE : 0;
  const grandTotal = subtotal + shipping;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <h2>Ödeme (Demo)</h2>
        <div className="cart-container payment-container">
          <form className="payment-form" onSubmit={handleSubmit}>
            <p className="page-intro">
              Bu form yalnızca sunum amacıyla tasarlanmıştır. Bilgileri girdiğinizde sistemimizde gerçek bir
              ödeme alınmaz.
            </p>
            <div className="payment-form-group">
              <label htmlFor="fullName">Ad Soyad</label>
              <input id="fullName" type="text" placeholder="Örn. Ayşe Yılmaz" required />
            </div>
            <div className="payment-form-group">
              <label htmlFor="email">E-posta</label>
              <input id="email" type="email" placeholder="ornek@mail.com" required />
            </div>
            <div className="payment-form-group">
              <label htmlFor="address">Adres</label>
              <textarea id="address" rows="4" placeholder="Teslimat adresinizi yazınız" required />
            </div>
            <div className="payment-form-group">
              <label htmlFor="cardNumber">Kart Numarası</label>
              <input id="cardNumber" type="text" inputMode="numeric" placeholder="**** **** **** ****" required />
            </div>
            <div className="payment-grid">
              <div className="payment-form-group">
                <label htmlFor="expiry">Son Kullanma Tarihi</label>
                <input id="expiry" type="text" placeholder="AA/YY" required />
              </div>
              <div className="payment-form-group">
                <label htmlFor="cvv">CVV</label>
                <input id="cvv" type="password" placeholder="***" required />
              </div>
            </div>
            <button type="submit" className="btn btn-primary payment-submit">Ödemeyi Onayla</button>
            {submitted && (
              <div className="payment-success">
                Bu, demo bir sitedir. Gerçek ödeme alınmamıştır. Siparişiniz örnek olarak oluşturulmuştur.
              </div>
            )}
          </form>
          <div className="cart-summary">
            <h3>Sepet Özeti</h3>
            <div className="summary-items">
              {items.length === 0 ? (
                <p>Sepetiniz boş, demo amaçlı toplamı görebilirsiniz.</p>
              ) : (
                items.map((item) => (
                  <div className="summary-item" key={item.id}>
                    <span>
                      {item.title}
                      {' '}
                      <small>x{item.quantity}</small>
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))
              )}
            </div>
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Odeme;
