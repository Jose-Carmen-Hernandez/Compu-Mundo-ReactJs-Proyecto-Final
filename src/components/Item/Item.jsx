import "./item.css";
import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <div className="item">
      <div className="item-inf">
        <h3 className="titulo-h3">{item.nombre}</h3>

        <img src={item.img} alt={item.nombre} />

        <p>
          {" "}
          <b>Precio:</b> ${item.precio.toFixed(2)}
        </p>
        <p>
          <b>Disponibles: </b>
          {item.stock ? (
            <span>{item.stock} unidades</span>
          ) : (
            <span className="agotado"> "agotado"</span>
          )}
        </p>
      </div>
      <footer className="item-footer">
        <Link className="item-detail-link" to={`/productos/${item.id}`}>
          Ver detalle
        </Link>
      </footer>
    </div>
  );
};
export default Item;

/*
La ruta dentro del Link 'ver detalle' debe coincidir con la Route definida en App:

<Link to={`/productos/${item.id}`}>Ver detalle</Link

debe ser igual a:

<Route path="/productos/:id" element=<ItemDetailContainer />} />
*/
