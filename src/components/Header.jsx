import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

const Header = () => {
  const { getCount } = useContext(CartContext);
  const cartCount = getCount();

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Halkpazarım</Link>
        </h1>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/pazar">Yöresel Pazar</Link>
          </li>
          <li>
            <Link to="/atolye">Zanaat Atölyesi</Link>
          </li>
          <li>
            <Link to="/hakkimizda">Hakkımızda</Link>
          </li>
          <li>
            <Link to="/satici-ol">Satıcı Ol</Link>
          </li>
        </ul>
      </nav>
      <div className="header-actions">
        <a href="#" className="btn btn-secondary">
          Giriş Yap
        </a>
        <Link to="/sepet" className="btn btn-primary">
          Sepet ({cartCount})
        </Link>
      </div>
    </header>
  );
};

export default Header;
