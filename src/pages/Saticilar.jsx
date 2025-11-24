import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { regions, demoSellers } from '../data/sellersDemo';

const allRegions = regions;

const Saticilar = () => {
  const [activeRegion, setActiveRegion] = useState('Tümü');

  const filteredSellers = useMemo(() => {
    if (activeRegion === 'Tümü') {
      return demoSellers;
    }
    return demoSellers.filter((seller) => seller.region === activeRegion);
  }, [activeRegion]);

  return (
    <>
      <Header />
      <main>
        <h2>Satıcılar</h2>
        <p className="page-intro">
          Halkpazarım&apos;a katılan üreticiler bölgelerine göre listelenir. Yerel üreticiye ulaşmak için
          önce bölgeni seç, sonra hikayelerini dinle.
        </p>
        <div className="seller-filters">
          {allRegions.map((region) => (
            <button
              key={region}
              type="button"
              className={`seller-filter ${activeRegion === region ? 'active' : ''}`}
              onClick={() => setActiveRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>
        <div className="seller-grid">
          {filteredSellers.map((seller) => (
            <Link to={`/satici/${seller.id}`} className="seller-card" key={seller.id}>
              {seller.image && <img src={seller.image} alt={seller.name} />}
              <div className="seller-card-body">
                <h3>{seller.name}</h3>
                <p className="seller-meta">
                  {seller.city}
                  {' '}
                  <span aria-hidden="true">·</span>
                  {' '}
                  {seller.region}
                </p>
                <p>{seller.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Saticilar;
