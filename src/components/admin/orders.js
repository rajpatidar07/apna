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
      <div
        className={
          row.status === "Pending"
            ? "pending"
            : row.status === "Cancel"
            ? "cancel"
            : row.status === "Delivered"
            ? "delivered"
            : row.status === "Processing"
            ? "processing"
            : null
        }
      >
        {" "}
        {row.status}{" "}
      </div>
    ),
    sortable: true,

    //   {
    //     when: (row) => row.status === "Delivered",
    //     style: {
    //       backgroundColor: "rgba(63, 195, 128, 0.9)",
    //       borderRadius: "100px",
    //       height: "40px",
    //       margin: "8px auto",
    //       display: "flex",
    //       justifyContent: "center",
    //     },
    //   },
    //   {
    //     when: (row) => row.status === "Cancel",
    //     style: {
    //       backgroundColor: "rgb(242, 38, 19, 0.9)",
    //       borderRadius: "100px",
    //       height: "40px",
    //       margin: "8px auto",
    //       display: "flex",
    //       justifyContent: "center",
    //     },
    //   },
    //   {
    //     when: (row) => row.status === "Processing",
    //     style: {
    //       backgroundColor: "rgb(39 0 255 / 53%)",
    //       borderRadius: "100px",
    //       height: "40px",
    //       margin: "8px auto",
    //       display: "flex",
    //       justifyContent: "center",
    //     },
    //   },
    // ],
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
      <div className="product_page_searchbox bg-gray">
        <Input type={"text"} plchldr={"Search by order id"} />
        <Form.Select aria-label="Search by delivery" className="adminselectbox">
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
  );
}

export default Product;
