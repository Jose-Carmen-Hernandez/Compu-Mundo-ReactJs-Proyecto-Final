import Item from "../Item/Item";
import "./itemList.css";
import { toCapital } from "../../helpers/toCapital";
//ItemList va a recibir una prop 'items' que es el array de objetos. Para eso es necesario 'recorrer' el array usando .map:

const ItemList = ({ items, title }) => {
  return (
    <>
      <h3 className="item-list-title">
        <span>{toCapital(title)}</span>
      </h3>
      <div className="item-list">
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
    </>
  );
};
export default ItemList;
