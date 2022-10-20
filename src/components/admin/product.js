import React, { useState } from "react";
import Input from "./common/input";
import {
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit, BiDotsVertical } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Addproduct from "./products/addproduct";
import Iconbutton from "./common/iconbutton";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import ProductJson from "./json/products"
function Product() {
  var products = ProductJson.products;
  console.log(products);
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    // {
    //   name: "Sku",
    //   selector: (row) => (
    //     <p
    //       onClick={() => {
    //         navigate("/productdetail");
    //       }}
    //     >
    //       {row.sku}
    //     </p>
    //   ),
    //   sortable: true,
    //   width: "100px",
    //   center: true,
    // },
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          // height="90px"
          // width="75px"
          alt={row.title}
          src={
            row.images[0]
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight:"100px",
            maxWidth:"100px"
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => (
        <div>
          <p className="mb-1" onClick={() => {
            navigate("/productdetail");
          }}><b>{row.title}<br/>SKU:</b>
          {row.sku}
        </p>
        </div>),
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
      width: "100px",
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
      selector: (row) => row.discountPercentage,
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
        <span
          className={
            row.status === 1
              ? "badge bg-success"
              : row.status === 2
                ? "badge bg-danger"
                : "badge bg-secondary"
          }
        >
          {row.status === 1
              ? "Active"
              : row.status === 2
                ? "Inactive"
                : "Draft"}
        </span>
      ),
      sortable: true,
      width: "115px",
      // center: true,
    },
    {
      name: "Action",
      width: "110px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit className=" p-0 m-0  editiconn text-secondary" />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert}
          />
          <BiDotsVertical className=" p-0 m-0 editiconn doticon text-primary " />

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

  // const data = [
  //   // (products.map|| [])((products)=>{
  //     {
  //       sku:"qqq",
  //     }
  //   // }),
  // ];
  const handleClick = () => { };
  const onButtonClick = () => { };
  const navigate = useNavigate();

  return (
    <div className="App productlist_maindiv">
      <h2>Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by product name"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
            >
              <option>Search by category</option>
              <option value="1">Food</option>
              <option value="2">Fish & Meat</option>
              <option value="3">Baby Care</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              placeholder="Search by status"
            >
              <option>Search by status</option>
              <option value="1">Pending</option>
              <option value="2">Selling</option>
              <option value="3">Sold Out</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <div className="product_page_uploadbox_one">
            <Input type={"file"} inputclass={"hiddeninput"} />
            <Iconbutton
              btntext={"Upload"}
              btnclass={"button main_outline_button"}
              Iconname={<AiOutlineCloudUpload />}
            />
          </div>
          <MainButton btntext={"Download"} />
          <Iconbutton
            btntext={"Add Product"}
            onClick={handleShow}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button "}
          />
        </div>

        {/* datatable */}
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Modal.Header closeButton className="addproductheader">
            <Modal.Title id="example-custom-modal-styling-title">
              Add Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="addproductbody p-2">
            <Addproduct />
          </Modal.Body>
          <Modal.Footer className="addproductfooter">
            <Iconbutton
              btntext={"X Cancel"}
              onClick={handleClose}
              btnclass={"button main_outline_button px-2"}
            // Iconname={<GiCancel /> }
            />
            <MainButton btntext={"Save as Draft"} onClick={handleClose} />
            <Iconbutton
              btntext={"Add Product"}
              onClick={handleClose}
              Iconname={<AiOutlinePlus />}
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Modal>
        <DataTable
          columns={columns}
          data={products}
          pagination
          highlightOnHover
          pointerOnHover
          className={"productlist_table"}
        />
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
}

export default Product;
