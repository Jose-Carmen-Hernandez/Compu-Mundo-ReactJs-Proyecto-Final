import "./loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <span className="span">
        Cargando información...
        <i className="fa-solid fa-spinner animation"></i>
      </span>
    </div>
  );
};

export default Loading;
