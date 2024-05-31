//El framework de bootstrap fue instalado usando el comando npm 'install bootstrap' y aqui estamos importando.
import "bootstrap/dist/css/bootstrap.min.css";
//Instalamos los iconos de bootstrap usando el comando 'npm install bootstrap-icons' y aqui los estamos importando:
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailcontainer";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import NotFound from "./components/NotFound/NotFound";
import CartContextProvider from "./components/Context/CartContext";

function App() {
  return (
    <div>
      <Header />
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path={"/"} element={<ItemListContainer />} />
            <Route path={"/inicio"} element={<ItemListContainer />} />
            <Route
              path={"/categoria/:categoryId"}
              element={<ItemListContainer />}
            />
            <Route path="/productos/:id" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
/*<Route path={"/"} element={<ItemListContainer />} />
Muestra la vista de todos los productos del array*/

/*
La ruta dentro del Link 'ver detalle' debe coincidir con la Route definida en App:

<Link to={`/productos/${item.id}`}>Ver detalle</Link

debe ser igual a:

<Route path="/productos/:id" element=<ItemDetailContainer />} />
*/
