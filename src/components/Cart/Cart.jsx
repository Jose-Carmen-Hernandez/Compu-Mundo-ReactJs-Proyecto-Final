import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeItem, clear, getTotalProducts, getSumProducts } =
    useContext(CartContext);

  if (getTotalProducts() == 0) {
    return (
      <div className="container mt-5 my5">
        <div className="row">
          <div className="col text-center ">
            <div className="alert alert-info " role="alert">
              <h4>Tu Canasta Está Vacía! </h4>
            </div>
            <Link to={"/"} className="btn bg-info my-5">
              <b>Volver a Inicio</b>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col">
          <table className="table">
            <tbody>
              <tr>
                <td colSpan={6} className="align-middle text-end">
                  <button className="btn bg-danger" onClick={clear}>
                    Vaciar Canasta
                  </button>
                </td>
              </tr>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.img} alt={item.nombre} width={64} />
                  </td>
                  <td className="align-middle text-start">{item.nombre}</td>
                  <td className="align-middle text-center">
                    ${item.precio.toFixed(2)}
                  </td>
                  <td className="align-middle text-center">x{item.quantity}</td>
                  <td className="align-middle text-center">
                    ${(item.quantity * item.precio).toFixed(2)}
                  </td>
                  <td className="align-middle text-end">
                    <i
                      className="bi bi-trash3-fill"
                      onClick={() => {
                        removeItem(item.id);
                      }}
                      title="Eliminar Producto"
                    ></i>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4} className="align-middle text-center">
                  <b>Total</b>
                </td>
                <td className="align-middle text-center">
                  <b>${getSumProducts().toFixed(2)}</b>
                </td>
                <td className="align-middle text-end">
                  <Link to={"/checkout"} className="btn bg-success">
                    Finalizar Compra
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
