import carrito from "./cartImg/carro-de-la-compra.png";
import "./cartWidget.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

const CartWidget = () => {
  const { getTotalProducts } = useContext(CartContext);
  console.log(getTotalProducts());

  if (getTotalProducts() > 0) {
    return (
      <Link to={"/cart"}>
        <button type="button" className="btn bg-light position-relative">
          <i className="bi bi-basket-fill"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
            {getTotalProducts()}
          </span>
        </button>
      </Link>
    );
  }
};
//exportar el componente y luego importarlo dentro de NavBar.jsx:
export default CartWidget;
