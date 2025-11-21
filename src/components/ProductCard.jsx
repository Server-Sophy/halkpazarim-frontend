import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';
import { formatPrice } from '../utils/formatPrice';
import ImageWithFallback from './ImageWithFallback';

const ProductCard = ({
  id,
  title,
  subtitle,
  price,
  image,
  href = '#',
}) => {
  const { addToCart } = useContext(CartContext);
  const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
  const priceLabel = typeof price === 'number' ? formatPrice(price) : price;

  const isInternal = href && !href.startsWith('http') && !href.startsWith('#');
  const Wrapper = isInternal ? Link : 'a';
  const wrapperProps = isInternal ? { to: href } : { href };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!id) {
      return;
    }

    addToCart({
      id,
      title,
      price: numericPrice,
      image,
    });
  };

  return (
    <div className="product-card">
      <Wrapper className="product-card-link" {...wrapperProps}>
        {image && <ImageWithFallback src={image} alt={title} />}
        <div className="card-content">
          <h3>{title}</h3>
          {subtitle && <h4>{subtitle}</h4>}
          {price && <p className="price">{priceLabel}</p>}
        </div>
      </Wrapper>
      <div className="card-actions">
        <button type="button" className="btn btn-secondary" onClick={handleAddToCart}>
          Sepete Ekle
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
