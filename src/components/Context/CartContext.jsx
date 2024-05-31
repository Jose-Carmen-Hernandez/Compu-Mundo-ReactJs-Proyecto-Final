import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  //si el producto ya esta en el carrito y se agregan mas piezas del mismo producto, la cantidad nueva se agrega a la anterior, si no, se agrega al carrito por primera vez:
  const addItem = (item, quantity) => {
    if (isInCart(item.id)) {
      const product = cart.find((prod) => prod.id === item.id);
      product.quantity += quantity;
      setCart([...cart]);
    } else {
      setCart([...cart, { ...item, quantity: quantity }]);
    }
  };

  //filter devuelve un array:
  const removeItem = (id) => {
    const items = cart.filter((item) => item.id !== id);
    setCart([...items]);
  };

  const clear = () => {
    setCart([]);
  };

  //Funcion para saber si un producto ha sido agregado al carrito.
  //find devuelve un objeto, some devuelve true o false:
  const isInCart = (id) => {
    return cart.some((item) => item.id === id);
  };

  //calcular el numero de productos en el carrito:
  //reduce agrupa los productos y nos devuelve un solo numero.
  const getTotalProducts = () => {
    return cart.reduce((acumulador, item) => (acumulador += item.quantity), 0);
  };

  //calcular el precio total del carrito:

  const getSumProducts = () => {
    return cart.reduce(
      (acumulador, item) => (acumulador += item.quantity * item.precio),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        getTotalProducts,
        getSumProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
//'children' son todos los componentes que seran envueltos por el contextProvider.
//'value' son todas las funciones, estados, arrays, etc. que se ejecutaran para manejar el contexto
