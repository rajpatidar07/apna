import React, { useState } from "react";
// import Input from "../common/input";
// import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
// import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../../../style/order.css";
const columns = [
  {
    name: "View",
    selector: (row) => <div to="/order_detail"><img src="./banner01.png"></img>{row.order_id}</div>,
    sortable: true,
  },

  {
    name: "Id",
    selector: (row) => row.Id,
    sortable: true,
  },
  {
    name: "Page",
    selector: (row) => row.Page,
    sortable: true,
  },
  {
    name: "Size",
    selector: (row) => row.size,
    sortable: true,
  }, 
  {
    name: "Show/Hide",
    selector: (row) => (
      <Form>
      <Form.Check 
        type="switch"
        id="custom-switch"
        reverse="true"
           />
      </Form>
    ),
    sortable: true,
  },

 
];

const data = [
  {
    id: 1,

    Id: "#header_banner",
    Page: "Home>Header",
    size: "157*452",
    order_date: "10/10/22",
    delivery_date: "12/10/22",
    pay_mode: "UPI",
    status: "Pending",
  },
  {
    id: 2,
   
    Id: "#header_banner",
    Page: "Home>Secation",
    size: "221*78",
    order_date: "10/10/22",
    delivery_date: "12/10/22",
    pay_mode: "UPI",
    status: "Delivered",
  },
  {
    id: 3,

    Id: "#header_banner",
    Page: "Home>Footer",
    size: "123*145",
    order_date: "10/10/22",
    delivery_date: "12/10/22",
    pay_mode: "COD",
    status: "Cancel",
  },
  {
    id: 4,

    Id: "#header_banner",
    Page: "Home>Banner",
    size: "214*256",
    order_date: "10/10/22",
    delivery_date: "12/10/22",
    pay_mode: "UPI",
    status: "Processing",
  },
  {
    id: 5,
  
    Id: "#header_banner",
    Page: "Home>header",
    size: "252*265",
    order_date: "10/10/22",
    delivery_date: "12/10/22",
    pay_mode: "COD",
    status: "Approvad",
  },
];

const onButtonClick = () => {};
function Banner() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <h2>Banner Setting</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        className={"productlist_table"}
      />
    </div>
  );
}
export default Banner;
