import "./itemCount.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const ItemCount = ({ stock, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const [itemStock, setItemStock] = useState(stock);
  const [visible, setVisible] = useState(true);

  const increment = () => {
    if (quantity < itemStock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const addToCart = () => {
    if (quantity <= itemStock) {
      setItemStock(itemStock - quantity);
      onAdd(quantity);
      setQuantity(1);
      setVisible(false);
      console.log(`agregaste ${quantity} productos al carrito`);
    }
  };

  return (
    <div className="counter">
      <div className="controls">
        <button className="button" onClick={decrement}>
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button className="button" onClick={increment}>
          +
        </button>
      </div>
      <div className="add-to-cart">
        {visible ? (
          <button className="add-button" onClick={addToCart}>
            {" "}
            {stock ? "Agregar al carrito" : "No disponible"}
          </button>
        ) : (
          <Link className="add-button" to={"/cart"}>
            Comprar Ahora
          </Link>
        )}
      </div>
    </div>
  );
};

export default ItemCount;
