//importar CartWidget:
import CartWidget from "../CartWidget/CartWidget";
//importar estilos:
import "./navBar.css";
import { Link } from "react-router-dom";
//crear componente navBar:
const NavBar = () => {
  return (
    <div className="menu">
      <Link to="/" className="principal-title">
        <h3>
          <b>Compu-Mundo</b>
        </h3>
      </Link>
      <ul>
        <li>
          <Link to="/categoria/computadoras">Computadoras</Link>
        </li>
        <li>
          <Link to="/categoria/celulares">Celulares</Link>
        </li>
        <li>
          <Link to="/categoria/accesorios">Accesorios</Link>
        </li>
        <li>
          <Link to="/categoria/monitores">Monitores</Link>
        </li>
      </ul>

      <CartWidget />
    </div>
  );
};
//exportar componente e importarlo en App.jsx:
export default NavBar;
