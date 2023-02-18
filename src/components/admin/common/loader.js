import React, { useState } from "react";
// import "./error.css";
import './loader.css'
import Spinner from "react-bootstrap/Spinner";
const Loader = () => {
  let [state ,setState]= useState(true)
  return (
    <div className={state ? "loader_page d-block" :" loader_page d-none"}>
      <div className="spinner">
        <Spinner animation="border" variant="success" />
      </div>
    </div>
  );
};

export default Loader;
