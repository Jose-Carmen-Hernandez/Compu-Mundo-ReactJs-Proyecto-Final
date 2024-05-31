import logo from "./headerImg/compuLogo.jpg";
import "./header.css";

const Header = () => {
  return (
    <div className="header">
      <div>
        <h1>Compu Mundo</h1>
        <h2>**Su aliado en electrónicos**</h2>
      </div>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default Header;
