import React, { useState } from "react";
import Input from "../common/input";
import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../../../style/order.css";
const columns = [
  {
    name: "Order Id",
    selector: (row) =>row.order_id,
    sortable: true,
  },
  {
    name: "Invoice No.",
    selector: (row) =>row.Invoice,
    sortable: true,
  },

  {
    name: "Transactions id",
    selector: (row) => <Link to="/transactions_detail">{row.transactions_id}</Link>,
    sortable: true,
  },
  {
    name: "Transactions Date",
    selector: (row) => row.transactions_date,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },

  {
    name: "Method",
    selector: (row) => row.pay_mode,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => (
      <span
        className={
          row.status === "Received"
            ? "badge bg-primary"
            : row.status === ""
            ? "badge bg-success"           
            : row.status === "Failed"
            ? "badge bg-danger"
            : "badge bg-dark"
        }
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
  
 
];

const data = [
  {
    id: 1,
    order_id: "AS1568",
    Invoice:"#95584668",
    transactions_id: "15635486465287",
    transactions_date: "11:45 AM 11/01/22",
    amount: "1000",
    order_date: "10/10/22",
    delivery_date: "12/10/22",
    pay_mode: "UPI",
    status: "Received",
  },
  {
    id: 2,
    order_id: "AS1568",
    Invoice:"#95584668",
    transactions_id: "54578765465876",
    transactions_date: "10:45 AM 10/01/22",
    amount: "1000",
    order_date: "10/10/22",
    delivery_date: "12/10/22",
    pay_mode: "Card",
    status: "Failed",
  },
 
];

const onButtonClick = () => {};
function Transactions() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <h2>Orders</h2>
      <div className="card mt-3 px-3 ">
        <div className="product_page_searchbox bg-gray my-4">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <Input type={"text"} plchldr={"Search by order id"} />
            </div>
            <div className="col-md-3 col-sm-6">
              <Input type={"text"} plchldr={"Search by transaction id"} />
            </div>
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by delivery_status"
                className="adminselectbox"
              >
                <option value="0">Pyament Method</option>
                <option value="1">Card</option>
                <option value="2">UPI</option>
                <option value="3">Cash on delivery</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <MainButton btntext={"Search"} />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className={"productlist_table"}
        />
      </div>
    </div>
  );
}

export default Transactions;
