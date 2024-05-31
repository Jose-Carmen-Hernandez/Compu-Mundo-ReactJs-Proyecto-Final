import "./itemDetailContainer.css";
import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const ItemDetailContainer = () => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  console.log(id);

  //Acceder a un documento en Firestore para mostrar el detalle de producto:
  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "items", id);
    getDoc(docRef).then((respuestaFire) => {
      if (respuestaFire.exists()) {
        setItem({ id: respuestaFire.id, ...respuestaFire.data() });
        setLoading(false);
      } else {
        console.log("Documento no encontrado!");
        setItem({});
      }
    });
  }, [id]);

  return <>{loading ? <Loading /> : <ItemDetail item={item} />}</>;
};

export default ItemDetailContainer;
