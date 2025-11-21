import Header from '../components/Header';
import Footer from '../components/Footer';

const SaticiOl = () => (
  <>
    <Header />
    <main>
      <div className="form-container">
        <h2>Aramıza Katılın!</h2>
        <p>
          İster yöresel bir üretici olun, ister el emeği ürünler tasarlayan bir genç girişimci...
          Sizi de aramızda görmekten mutluluk duyarız. Lütfen formu doldurun, ekibimiz sizinle
          iletişime geçsin.
        </p>
        <form action="#" method="get">
          <div className="form-group">
            <label htmlFor="name">Adınız Soyadınız</label>
            <input type="text" id="name" placeholder="Ali Veli" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-posta Adresiniz</label>
            <input type="email" id="email" placeholder="ornek@mail.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="brand">Marka / Üretici Adı</label>
            <input type="text" id="brand" placeholder="Ali Amca'nın Çiftliği" required />
          </div>
          <div className="form-group">
            <label htmlFor="type">Ne Tür Ürün Satıyorsunuz?</label>
            <select id="type">
              <option value="yoresel">Yöresel Gıda Ürünü</option>
              <option value="zanaat">El Sanatı / Tasarım Ürünü</option>
              <option value="diger">Diğer</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Ürünlerinizden Kısaca Bahsedin</label>
            <textarea id="message" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Başvurumu Gönder
          </button>
        </form>
      </div>
    </main>
    <Footer />
  </>
);

export default SaticiOl;
