import React, { useState } from "react";
import Input from "./common/input";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import { navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AlignCenter } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Addproduct from "./products/addproduct";
const columns = [
  {
    name: "SKU",
    selector: (row) => row.sku,
    sortable: true,
    width: "100px",
  },
  {
    name: "#",
    width: "100px",
    cell: (row) => (
      <img
        height="100px"
        width="95px"
        alt={row.name}
        src={
          "https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg"
        }
        style={{
          borderRadius: 15,
          paddingTop: 10,
          paddingBottom: 10,
          textAlign: "right",
        }}
        onClick={handleClick}
      />
    ),
  },
  {
    name: "PRODUCT NAME",
    selector: (row) => row.pname,
    sortable: true,
    width: "230px",
  },
  {
    name: "CATEGORY",
    selector: (row) => row.category,
    sortable: true,
    width: "180px",
  },
  {
    name: "PRICE",
    selector: (row) => row.price,
    sortable: true,
    width: "130px",
  },
  {
    name: "STOCK",
    selector: (row) => row.stock,
    sortable: true,
    width: "130px",
  },
  {
    name: "DISCOUNT",
    selector: (row) => row.discount,
    sortable: true,
    width: "170px",
  },
  {
    name: "STATUS",
    selector: (row) => row.status,
    sortable: true,
    width: "130px",
  },
  {
    name: "ACTION",
    width: "120px",
    selector: (row) => (
      <div className={"actioncolimn"}>
        <AiFillEdit className="w-75 p-0 m-0 editiconn" />
        <AiFillDelete className="w-75 p-0 m-0 editiconn" />
      </div>
    ),
  },
];

const data = [
  {
    id: 1,
    sku: "9AF4FE",
    pname: (
      <div className="productdescbox">
        <b>
          <h6>Green Leaf Lettuce</h6>
        </b>
        <p className="productdesc">
          {" "}
          The root vegetables include beets, carrots, radishes, sweet potatoes,
          and turnips
        </p>
      </div>
    ),
    category: (
      <p className="productdesc">Fruits & Vegetable Fruits & Vegetable</p>
    ),
    price: "$14",
    stock: "15",
    status: "selling",
    discount: "50%",
  },
  {
    id: 2,
    sku: "9AF4FE",
    pname: (
      <div className="productdescbox">
        <b>
          <h6>Green Leaf Lettuce</h6>
        </b>
        <h6 className="productdesc">
          {" "}
          The root vegetables include beets, and turnips
        </h6>
      </div>
    ),
    category: "Fruits & Vegetable",
    price: "$14",
    stock: "15",
    status: "sold out",
    discount: "50%",
  },
];
const handleClick = () => {};

function Product() {
  const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

  return (
    <div className="App">
      <h2>Products</h2>

      {/* search bar */}
      <div className="product_page_searchbox bg-gray">
        <Input type={"text"} plchldr={"Search by product name"} />
        <Form.Select aria-label="Search by category" className="adminselectbox">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
        <Form.Select aria-label="Search by status" className="adminselectbox">
          <option>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>

        <MainButton btntext={"Search"} />
      </div>

      {/* upload */}

      <div className="product_page_uploadbox">
      <div className="product_page_uploadbox_one">
        <Input type={"file"} inputclass={"hiddeninput"} />
        <MainButton btntext={"Upload"} />
        </div>
        <MainButton btntext={"Add"} onClick={handleShow}/>
        <MainButton btntext={"Download"} />
      </div>

      {/* datatable */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton className="addproductheader">
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="addproductbody">
          <Addproduct />
        </Modal.Body>
        <Modal.Footer className="addproductfooter">
        <MainButton btntext={"Add"}  onClick={handleClose}/>
        <MainButton btntext={"Cancel"} onClick={handleClose}/>
        </Modal.Footer>
      </Modal>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
}

export default Product;
