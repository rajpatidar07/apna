import React, { useState } from "react";
import Input from "./common/input";
import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../../style/order.css";
import OrderJson from "./json/orders"


const onButtonClick = () => { };
function Product() {
  var orders = OrderJson.orders;

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    {
      name: "Order Id",
      selector: (row) => <Link to="/order_detail">{row.id}</Link>,
      sortable: true,
    },
  
    {
      name: "Items",
      selector: (row) => (
        <p className="m-0"><b>Product:</b> {row.totalProducts}<br/>
        <b>Quantity:</b> {row.totalQuantity}</p>
      ),
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => row.total,
      sortable: true,
    },
    {
      name: "Tax",
      selector: (row) => (
        <p className="m-0">
          <b>GST:</b> {row.GST}<br/>
          <b>CGST:</b> {row.CGST}<br/>
          <b>SGST:</b> {row.SGST}<br/>
        </p>
      ),
      sortable: true,
    },
  
    {
      name: "Order Date",
      selector: (row) => row.orderDate,
      sortable: true,
    },
    {
      name: "Delivery Date",
      selector: (row) => row.deliveryDate,
      sortable: true,
    },
  
    {
      name: "Pyament Mode",
      selector: (row) => (
        row.paymentStatus === 1
          ? "UPI"
          : row.paymentStatus === 2
            ? "Card"
            : row.paymentStatus === 3
              ? "COD"
              : row.paymentStatus === 4
                ? "Netbanking"
                : row.paymentStatus === 5
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
              ? "badge bg-warning"
              : row.status === 2
                ? "badge bg-success"
                : row.status === 3
                  ? "badge bg-primary"
                  : row.status === 4
                    ? "badge bg-danger"
                    : row.status === 5
                      ? "badge bg-info"
                      : "badge bg-dark"
          }
        >
          {row.status === 1
              ? "Pending"
              : row.status === 2
                ? "Delivered"
                : row.status === 3
                  ? "Processing"
                  : row.status === 4
                    ? "Cancelled"
                    : row.status === 5
                      ? "Approved"
                      : "Return"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select aria-label="Search by delivery" size="sm" value={row.status} className="w-100">
          <option value="1">Pending</option>
          <option value="2">Delivered</option>
          <option value="3">Processing</option>
          <option value="4">Cancel</option>
          <option value="5">Approved  </option>
          <option value="6">Return  </option>
        </Form.Select>
      ),      
      sortable: true,
      
    },
  
    {
      name: "Invoice",  
      selector: (row) => (
        row.status===2 ?
        <Link to="/invoice">
          <h3 className="m-0 text-primary">
          <FaFileInvoiceDollar className="text-primary" />
          </h3>
        </Link>: null
      ),
    },
  ];
  
  const data = [
    {
      id: 1,
      order_id: "AS1568",
      no_of_item: "2",
      price: "$15",
      tex: "CGST 18%",
      order_date: "10/10/22",
      delivery_date: "12/10/22",
      pay_mode: "UPI",
      status: "Pending",
    },
    {
      id: 2,
      order_id: "AS1568",
      no_of_item: "2",
      price: "$15",
      tex: "CGST 18%",
      order_date: "10/10/22",
      delivery_date: "12/10/22",
      pay_mode: "UPI",
      status: "Delivered",
    },
    {
      id: 3,
      order_id: "AS1568",
      no_of_item: "2",
      price: "$15",
      tex: "CGST 18%",
      order_date: "10/10/22",
      delivery_date: "12/10/22",
      pay_mode: "COD",
      status: "Cancel",
    },
    {
      id: 4,
      order_id: "AS1568",
      no_of_item: "2",
      price: "$15",
      tex: "CGST 18%",
      order_date: "10/10/22",
      delivery_date: "12/10/22",
      pay_mode: "UPI",
      status: "Processing",
    },
    {
      id: 5,
      order_id: "AS1568",
      no_of_item: "2",
      price: "$15",
      tex: "CGST 18%",
      order_date: "10/10/22",
      delivery_date: "12/10/22",
      pay_mode: "COD",
      status: "Approvad",
    },
  ];
  
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
              <Form.Select
                aria-label="Search by delivery"
                className="adminselectbox"
              >
                <option>Delivery status</option>
                <option value="1">Delivered</option>
                <option value="2">Pending</option>
                <option value="3">Processing</option>
                <option value="4">Cancel</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by delivery_status"
                className="adminselectbox"
              >
                <option>Order limits</option>
                <option value="1">Last 5 days orders</option>
                <option value="2">Last 7 days orders</option>
                <option value="3">Last 15 days orders</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <MainButton btntext={"Search"} />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={orders}
          pagination
          highlightOnHover
          pointerOnHover
          className={"productlist_table"}
        />
      </div>
    </div>
  );
}

export default Product;
