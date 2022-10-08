import React, { useState } from "react";
import Input from "./common/input";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import { navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Addproduct from "./products/addproduct";
import Iconbutton from "./common/iconbutton";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
const columns = [
  {
    name: "ORDER ID",
    selector: (row) => <Link to="/order_detail">{row.order_id}</Link>,
    sortable: true,
    width: "152px",
  },
  {
    name: "PRODUCT",
    selector: (row) => row.product,
    sortable: true,
    width: "156px",
  },
  {
    name: "ITEMS",
    selector: (row) => row.no_of_item,
    sortable: true,
    width: "118px",
  },
  {
    name: "PRICE",
    selector: (row) => row.price,
    sortable: true,
    width: "118px",
  },
  {
    name: "TAX",
    selector: (row) => row.tex,
    sortable: true,
    width: "118px",
  },

  {
    name: "ORDER DATE",
    selector: (row) => row.order_date,
    sortable: true,
    width: "182px",
  },
  {
    name: "DELIVERY DATE",
    selector: (row) => row.delivery_date,
    sortable: true,
    width: "210px",
  },

  {
    name: "PYAMENT MODE",
    selector: (row) => row.pay_mode,
    sortable: true,
    width: "218px",
  },
  {
    name: "STATUS",
    selector: (row) => row.status,
    sortable: true,
    width: "134px",
    
    conditionalCellStyles: [
      {
        when: (row) => row.status === "Pending",
        style: {
          backgroundColor: "rgb(204 207 0 / 90%)",
          color: "black",
          borderRadius: "100px",
          height: "40px",
          margin: "8px auto",
          display: "flex",
          justifyContent: "center",
        },
      },
      {
        when: (row) => row.status === "Delivered",
        style: {
          backgroundColor: "rgba(63, 195, 128, 0.9)",
          borderRadius: "100px",
          height: "40px",
          margin: "8px auto",
          display: "flex",
          justifyContent: "center",
        },
      },
      {
        when: (row) => row.status === "Cancel",
        style: {
          backgroundColor: "rgb(242, 38, 19, 0.9)",
          borderRadius: "100px",
          height: "40px",
          margin: "8px auto",
          display: "flex",
          justifyContent: "center",
        },
      },
    ],
  },
  {
    name: "ACTION",
    selector: (row) => (
      <Form.Select aria-label="Search by delivery" className="adminselectbox">
        <option value="1">Delivered</option>
        <option value="2">Pending</option>
        <option value="3">Processing</option>
        <option value="4">Cancel</option>
      </Form.Select>
    ),
    sortable: true,
    width: "134px",
  },

  {
    name: "INVOICE",
    width: "120px",
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
    product: "Hunny",
    no_of_item: "2",
    price: "$15",
    tex: "CGST 18%",
    order_date: "10.10.22",
    delivery_date: "12.10.22",
    pay_mode: "UPI",
    status: "Pending",
  },
  {
    id: 2,
    order_id: "AS1568",
    product: "Hunny",
    no_of_item: "2",
    price: "$15",
    tex: "CGST 18%",
    order_date: "10.10.22",
    delivery_date: "12.10.22",
    pay_mode: "UPI",
    status: "Delivered",
  },
  {
    id: 3,
    order_id: "AS1568",
    product: "Hunny",
    no_of_item: "2",
    price: "$15",
    tex: "CGST 18%",
    order_date: "10.10.22",
    delivery_date: "12.10.22",
    pay_mode: "UPI",
    status: "Cancel",
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
