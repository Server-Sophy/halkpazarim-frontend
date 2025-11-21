import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext({
  items: [],
  total: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getCount: () => 0,
  getTotal: () => 0,
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    setTotal(newTotal);
  }, [items]);

  const addToCart = useCallback((product) => {
    if (!product?.id) {
      return;
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          title: product.title,
          price: product.price ?? 0,
          image: product.image,
          qty: 1,
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

  const getCount = useCallback(
    () => items.reduce((count, item) => count + item.qty, 0),
    [items],
  );

  const getTotal = useCallback(() => total, [total]);

  const value = useMemo(
    () => ({
      items,
      total,
      addToCart,
      removeFromCart,
      clearCart,
      getCount,
      getTotal,
    }),
    [items, total, addToCart, removeFromCart, clearCart, getCount, getTotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export default CartContext;
