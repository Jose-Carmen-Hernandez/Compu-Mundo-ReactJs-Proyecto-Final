import { useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cart, clear, getTotalProducts, getSumProducts } =
    useContext(CartContext);
  //estados para el formulario:
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  //estado para generar la orden:
  const [orderId, setOrderId] = useState("");
  const [nombreError, setNombreError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [telefonoError, setTelefonoError] = useState("");

  //Generar una orden de compra con los datos del cliente y los productos del carrito:
  const generarOrden = () => {
    //validar que los campos del formulario no esten vacios al momento de hacer click en "Generar orden":
    if (nombre == "") {
      setNombreError("Ingresa un nombre!");
      return false;
    } else {
      setNombreError("");
    }
    if (email == "") {
      setEmailError("Ingresa un correo!");
      return false;
    } else {
      setEmailError("");
    }
    if (telefono == "") {
      setTelefonoError("Ingresa un numero telefonico!");
      return false;
    } else {
      setTelefonoError("");
    }

    const buyer = { name: nombre, email: email, telephone: telefono };
    console.log(buyer);

    const items = cart.map((item) => ({
      id: item.id,
      producto: item.nombre,
      precio: item.precio.toFixed(2),
      cantidad: item.quantity,
    }));
    //console.log(items);

    //Registrar la fecha de la operacion:
    const fecha = new Date();
    const date = ` ${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()} Hour: ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

    //Generar el objeto order y calcular el total a pagar:
    const order = {
      cliente: buyer,
      productos: items,
      fecha: date,
      total: getSumProducts().toFixed(2),
    };
    //referencia a la conexion con la base de datos:
    const db = getFirestore();
    //referencia a la coleccion orders:
    const ordersCollection = collection(db, "orders");

    //Agregar nuevo documento  de tipo order a Firestore:
    addDoc(ordersCollection, order).then((data) => {
      //console.log(data);
      //El orden de las siguientes llamadas es muy importante:
      setOrderId(data.id);
      //Una vez generada la orden limpiar los campos del formulario:
      setNombre("");
      setEmail("");
      setTelefono("");
      //y limpiar el carrito:
      clear();
    });
  };

  if (orderId) {
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col text-center">
            <div className="alert alert-info" role="alert">
              <h4>
                Tu Orden de Compra es: <b>{orderId}</b>
              </h4>
            </div>
          </div>
        </div>
      </div>
    );
  }

  //Si navegamos a '/checout' sin haber agregado productos se muestra una alerta de "canasta vacia":
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
          <form>
            <div className="mb-3">
              <label className="form-label text-white">Nombre *</label>
              <input
                type="text"
                className={` form-control
                ${nombreError && "is-invalid"}`}
                onInput={(event) => {
                  setNombre(event.target.value);
                }}
              />
              <div className="text-danger">{nombreError}</div>
            </div>
            <div className="mb-3">
              <label className="form-label text-white">E-mail *</label>
              <input
                type="text"
                className={`form-control ${emailError && "is-invalid"}`}
                onInput={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <div className="text-danger">{emailError} </div>
            </div>
            <div className="mb-3">
              <label className="form-label text-white">Teléfono *</label>
              <input
                type="text"
                className={`form-control ${telefonoError && "is-invalid"}`}
                onInput={(event) => {
                  setTelefono(event.target.value);
                }}
              />
              <div className="text-danger">{telefonoError} </div>
            </div>
            <p className="mb3 text-warning">* Campos obligatorios</p>
            <button
              type="button"
              className="btn bg-light"
              onClick={generarOrden}
            >
              Generar Orden
            </button>
          </form>
        </div>
        <div className="col">
          <table className="table my-3">
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="align-middle ">
                    <img src={item.img} alt={item.nombre} width={64} />
                  </td>
                  <td className="align-middle">{item.nombre}</td>
                  <td className="align-middle text-center">x{item.quantity}</td>
                  <td className="align-middle text-end">
                    ${item.precio.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  <b>Total</b>
                </td>
                <td className="text-end">
                  <b>${getSumProducts().toFixed(2)}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
