import React, { useState } from "react";
import Input from "../common/input";
import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../../../style/order.css";
import TransactionJson from "../json/transaction"


const onButtonClick = () => { };
function Transactions() {
  var transactions = TransactionJson.transactions;

  const columns = [

    {
      name: "Transactions id",
      selector: (row) => <Link to="/transactions_detail">{row.id}</Link>,
      sortable: true,
    },
    {
      name: "Order Id",
      selector: (row) => row.orderId,
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoiceId,
      sortable: true,
    },

    {
      name: "Transactions Date",
      selector: (row) => row.transactionDate,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.total,
      sortable: true,
    },

    {
      name: "Method",
      selector: (row) => (
        row.paymentMethod === 1
          ? "UPI"
          : row.paymentMethod === 2
            ? "Card"
            : row.paymentMethod === 3
              ? "COD"
              : row.paymentMethod === 4
                ? "Netbanking"
                : row.paymentMethod === 5
                  ? "Wallet"
                  : "Other"
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status === 1
              ? "badge bg-primary"
              : row.status === 2
                ? "badge bg-success"
                : row.status === 3
                  ? "badge bg-danger"
                  : "badge bg-dark"
          }
        >
          {row.status === 1
              ? "Processing"
              : row.status === 2
                ? "Success"
                : row.status === 3
                  ? "Failed"
                  : "Refund"}
        </span>
      ),
      sortable: true,
    },


  ];

  // const data = [
  //   {
  //     id: 1,
  //     order_id: "AS1568",
  //     Invoice:"#95584668",
  //     transactions_id: "15635486465287",
  //     transactions_date: "11:45 AM 11/01/22",
  //     amount: "1000",
  //     order_date: "10/10/22",
  //     delivery_date: "12/10/22",
  //     pay_mode: "UPI",
  //     status: "Received",
  //   },
  //   {
  //     id: 2,
  //     order_id: "AS1568",
  //     Invoice:"#95584668",
  //     transactions_id: "54578765465876",
  //     transactions_date: "10:45 AM 10/01/22",
  //     amount: "1000",
  //     order_date: "10/10/22",
  //     delivery_date: "12/10/22",
  //     pay_mode: "Card",
  //     status: "Failed",
  //   },

  // ];

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
          data={transactions}
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
