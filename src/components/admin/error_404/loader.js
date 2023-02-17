import React from "react";
import "./error.css";
import Spinner from "react-bootstrap/Spinner";
const Loader = () => {
  return (
    <div className="loader_page">
      <div className="spinner">
        <Spinner animation="border" variant="success" />
      </div>
    </div>
  );
};

export default Loader;
