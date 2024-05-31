import "./itemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const ItemDetail = ({ item }) => {
  const { addItem } = useContext(CartContext);

  const onAdd = (quantity) => {
    addItem(item, quantity);
  };

  return (
    <>
      <article className="detail-card">
        <header className="detail-header">
          <h3 className="detail-title">
            <b>{item.nombre}</b>
          </h3>
        </header>
        <section className="detail-description">
          <img src={item.img} alt={item.nombre} className="item-img" />
          <div className="info-container">
            <p className="info cat">
              <b> Categoría:</b> {item.categoria} <br />
              <b>Id:</b> {item.id}
            </p>
            <p className="info">
              <b>Descripción:</b> {item.descripcion}
            </p>
            {item.precio !== undefined && (
              <p className="info">
                <b>Precio:</b> ${item.precio.toFixed(2)}
              </p>
            )}
            <p className="info">
              <b>Disponibles:</b> {item.stock} piezas
            </p>
          </div>
        </section>
        <footer className="item-footer">
          <ItemCount stock={item.stock} onAdd={onAdd} />
        </footer>
      </article>
    </>
  );
};

export default ItemDetail;
