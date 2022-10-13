import React, { useState } from "react";
import Input from "./common/input";
import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../../style/order.css";
const columns = [
  {
    name: "Order Id",
    selector: (row) => <Link to="/order_detail">{row.order_id}</Link>,
    sortable: true,
  },

  {
    name: "Items",
    selector: (row) => row.no_of_item,
    sortable: true,
  },
  {
    name: "price",
    selector: (row) => row.price,
    sortable: true,
  },
  {
    name: "Tax",
    selector: (row) => row.tex,
    sortable: true,
  },

  {
    name: "Order Date",
    selector: (row) => row.order_date,
    sortable: true,
  },
  {
    name: "Delivery Date",
    selector: (row) => row.delivery_date,
    sortable: true,
  },

  {
    name: "Pyament Mode",
    selector: (row) => row.pay_mode,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => (
      <span
        className={
          row.status === "Pending"
            ? "badge bg-warning"
            : row.status === "Delivered"
            ? "badge bg-success"
            : row.status === "Processing"
            ? "badge bg-primary"
            : row.status === "Cancel"
            ? "badge bg-danger"
            : "badge bg-primary"
        }
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
  {
    name: "Change Status",
    selector: (row) => (
      <Form.Select aria-label="Search by delivery" className="adminselectbox">
        <option value="1">Change status</option>
        <option value="1">Delivered</option>
        <option value="2">Pending</option>
        <option value="3">Processing</option>
        <option value="4">Cancel</option>
      </Form.Select>
    ),
    sortable: true,
  },

  {
    name: "Invoice",

    selector: (row) => (
      <Link to="/invoice">
        <FaFileInvoiceDollar />
      </Link>
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
    pay_mode: "UPI",
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
];

const onButtonClick = () => {};
function Product() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App">
      <h2>Orders</h2>
      <div className="card mt-3 px-3 ">
        <div className="product_page_searchbox bg-gray my-4">
          <Input type={"text"} plchldr={"Search by order id"} />
          <Form.Select
            aria-label="Search by delivery"
            className="adminselectbox"
          >
            <option>delivery status</option>
            <option value="1">Delivered</option>
            <option value="2">Pending</option>
            <option value="3">Processing</option>
            <option value="4">Cancel</option>
          </Form.Select>
          <Form.Select
            aria-label="Search by delivery_status"
            className="adminselectbox"
          >
            <option>Order limits</option>
            <option value="1">Last 5 days orders</option>
            <option value="2">Last 7 days orders</option>
            <option value="3">Last 15 days orders</option>
          </Form.Select>

          <MainButton btntext={"Search"} />
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

export default Product;
