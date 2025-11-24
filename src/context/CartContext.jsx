import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

const CartContext = createContext({
  items: [],
  cartCount: 0,
  cartTotal: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

const deriveSellerName = (product) => {
  if (product?.sellerName) return product.sellerName;
  if (product?.seller) return product.seller;

  if (product?.subtitle && typeof product.subtitle === 'string') {
    const [, value] = product.subtitle.split(':');
    if (value) {
      return value.trim();
    }
  }

  return undefined;
};

export const CartProvider = ({ children, initialItems = [] }) => {
  const [items, setItems] = useState(initialItems);

  const addToCart = useCallback((product = {}) => {
    if (!product.id) return;

    const unitPrice = Number(product.price) || 0;
    const sellerName = deriveSellerName(product);

    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title || 'Ürün',
          price: unitPrice,
          image: product.image,
          sellerName,
          quantity: 1,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + (item.quantity || 0), 0),
    [items],
  );

  const cartTotal = useMemo(
    () => items.reduce((total, item) => total + (item.quantity || 0) * (Number(item.price) || 0), 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      cartCount,
      cartTotal,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [items, cartCount, cartTotal, addToCart, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export default CartContext;
