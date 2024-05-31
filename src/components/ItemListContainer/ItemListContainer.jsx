import "./itemListContainer.css";
import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
//arrayProductos se deja de utilizan al integrar Firebase:
/* import arrayProductos from "../../data/data.json"; */
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
//importar Firestore para consultar los productos desde la nube de google:
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Nuestros Productos");
  const { categoryId } = useParams();

  //Acceder a una coleccion en Firestore usando filtros:

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "items");
    //filtrar por categoria o devolver la colleccion completa:
    const resultQuery = categoryId
      ? query(itemsCollection, where("categoria", "==", categoryId))
      : itemsCollection;
    getDocs(resultQuery).then((respuestaFire) => {
      if (respuestaFire.size > 0) {
        setItems(
          respuestaFire.docs.map((item) => ({ id: item.id, ...item.data() }))
        );
        setLoading(false);
      } else {
        console.log("Los documentos no existen");
        setItems([]);
      }
      //Establecer el titulo de acuerdo a la categoria:
      setTitle(categoryId ? categoryId : "Nuestros Productos");
    });
  }, [categoryId]);

  //Carga de productos a la base de datos Firestore:

  //(Una vez agregados los productos del array a la base de datos se debe comentar o borrar este fragmento de codigo para evitar que se ejecute repetidamente)

  /*  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = collection(db, "items");

    arrayProductos.forEach((producto) => {
      addDoc(itemsCollection, producto);
    });

    console.log("Productos cargados en la BD!");
  }, []); */

  return loading ? (
    <Loading />
  ) : (
    <div className="itemListContainer">
      <ItemList items={items} title={title} />
    </div>
  );
};

export default ItemListContainer;
