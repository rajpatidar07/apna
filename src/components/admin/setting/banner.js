import React, { useState } from "react";
// import Input from "../common/input";
// import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
// import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../../../style/order.css";
import Demo from "./banner01.png";

const onButtonClick = () => {};
function Banner() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="banner_body">
    <h2>Banner Setting</h2>
      <div className="row">
        <div className="col-6">
        <div className="banner_box">
        
        </div>
        </div>
        
        <div className="col-6">
        <div className="banner_box"></div></div>
      </div>
    </div>
  );
}
export default Banner;
