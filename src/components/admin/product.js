import React, { useState } from "react";
import Input from "./common/input";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Addproduct from "./products/addproduct";
import Iconbutton from "./common/iconbutton";
import Dropdown from "react-bootstrap/Dropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
const columns = [
  {
    name: "Sku",
    selector: (row) => row.sku,
    sortable: true,
    width: "100px",
    center: true,
  },
  {
    name: "#",
    width: "100px",
    center: true,
    cell: (row) => (
      <img
        height="90px"
        width="75px"
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
    name: "Product Name",
    selector: (row) => row.pname,
    sortable: true,
    width: "250px",
  },
  {
    name: "Category",
    selector: (row) => row.category,
    sortable: true,
    width: "160px",
  },
  {
    name: "Price",
    selector: (row) => row.price,
    sortable: true,
    width: "90px",
    center: true,
    style: {
      paddingRight: "32px",
      paddingLeft: "0px",
    },
  },
  {
    name: "Gst",
    selector: (row) => row.gst,
    sortable: true,
    width: "90px",
    center: true,
    style: {
      paddingLeft: "0px",
    },
  },

  {
    name: "Stock",
    selector: (row) => row.stock,
    sortable: true,
    width: "100px",
    center: true,
    style: {
      paddingRight: "32px",
      paddingLeft: "0px",
    },
  },

  {
    name: "Discount",
    selector: (row) => row.discount,
    sortable: true,
    width: "130px",
    center: true,
    style: {
      paddingRight: "32px",
      paddingLeft: "0px",
    },
  },
  {
    name: "Status",
    selector: (row) => (
      <div
        className={
          row.status === "Selling"
            ? "statuschhangeselling"
            : row.status === "Sold out"
            ? "statuschhangesold"
            : null
        }
      >
        {row.status}
      </div>
    ),
    sortable: true,
    width: "130px",
    center: true,
  },
  {
    name: "Action",
    width: "120px",
    center: true,
    selector: (row) => (
      <div className={"actioncolimn"}>
        <AiFillEdit className=" p-0 m-0 editiconn" />
        <AiFillDelete className=" p-0 m-0 editiconn" />
        <BiDotsVertical className=" p-0 m-0 editiconn doticon" />

        <Dropdown className="productprofile_div p-0 m-0 editiconn doticon">
          <Dropdown.Toggle
            className=""
            variant=""
            id="productstatus_dropdown"
          ></Dropdown.Toggle>
          <Dropdown.Menu className="product_list_dropdownstatus">
            <Dropdown.Item
              className="product_list_dropdownstatus_link"
              href="#/action-1"
            >
              Action
            </Dropdown.Item>
            <Dropdown.Item
              className="product_list_dropdownstatus_link"
              href="#/action-2"
            >
              Another action
            </Dropdown.Item>
            <Dropdown.Item
              className="product_list_dropdownstatus_link"
              href="#/action-3"
            >
              Something else
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
          {`The root vegetables include beets, carrots, radishes, sweet potatoes,
          and turnips`}
        </p>
       
      </div>
    ),
    category: (
      <p className="productdesc">Fruits & Vegetable Fruits & Vegetable</p>
    ),
    price: "$14",
    gst: "10%",
    stock: "15",
    status: "Selling",
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
    gst: "10%",
    stock: "15",
    status: "Sold out",
    discount: "50%",
  },
];
const handleClick = () => {};
const onButtonClick = () => {};
function Product() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="App productlist_maindiv">
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
          <Iconbutton
            btntext={"Upload"}
            btnclass={"btn-outline-success btn adminmainbutton"}
            Iconname={<AiOutlineCloudUpload />}
          />
        </div>
        <MainButton btntext={"Download"} />
        <Iconbutton
          btntext={"Add"}
          onClick={handleShow}
          Iconname={<AiOutlinePlus />}
          btnclass={"btn-outline-success btn adminmainbutton"}
        />
      </div>

      {/* datatable */}
      <Modal show={show} onHide={handleClose} dialogClassName="addproductmainmodal"   aria-labelledby="example-custom-modal-styling-title" centered >
        <Modal.Header closeButton className="addproductheader">
          <Modal.Title id="example-custom-modal-styling-title">Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="addproductbody p-2">
          <Addproduct />
        </Modal.Body>
        <Modal.Footer className="addproductfooter">
          <MainButton btntext={"Add"} onClick={handleClose} />
          <MainButton btntext={"Save as Draft"} onClick={handleClose} />
          <MainButton btntext={"Cancel"} onClick={handleClose} />
        </Modal.Footer>
      </Modal>
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
