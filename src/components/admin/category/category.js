import React, { useState } from "react";
import Input from "../common/input";
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import { Badge } from "react-bootstrap";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const CategoryList = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const columns = [
      {
        name: "ID",
        selector: (row) => (
          <p
            onClick={() => {
              navigate("/productdetail");
            }}
          >
            {row.id}
          </p>
        ),
        sortable: true,
        width: "70px",
        center: true,
        style:{
            paddingLeft:0,
        }
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
        name: "Category Name",
        selector: (row) => row.cname,
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
        name: "Category Type",
        selector: (row) => row.ctype,
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
        name: "Status",
        selector: (row) => (
         
          <Badge  bg= {row.status === "Selling"
          ?"success"  : row.status === "Sold out"
                ? "danger" : null}>{row.status}</Badge>
        ),
        sortable: true,
        width: "105px",
        // center: true,
      },
      {
        name: "Action",
        width: "100px",
        style: {
          paddingRight: "12px",
          paddingLeft: "0px",
        },
        center: true,
        selector: (row) => (
          <div className={"actioncolimn"}>
           <BiEdit className=" p-0 m-0  editiconn text-secondary" />
            <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
          </div>
        ),
      },
    ];
    
    const data = [
      {
        id: 1,
        ctype:"Grocery",
        cname: (
          <div className="productdescbox">
            <b>
              <p className="mb-0">Green Leaf Lettuce</p>
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
        stock: "15",
        status: "Selling",
      },
      {
        id: 2,
        ctype:"Health & Care",
        cname: (
          <div className="productdescbox">
            <b>
              <p className="mb-0">Green Leaf Lettuce</p>
            </b>
            <p className="productdesc">
              {" "}
              The root vegetables include beets, and turnips
            </p>
          </div>
        ),
        category: "Fruits & Vegetable",
        price: "$14",
        stock: "15",
        status: "Sold out",
      },
    ];
    const handleClick = () => {};
    const onButtonClick = () => {};
    const navigate = useNavigate();
    return (
        <div className="App productlist_maindiv">
        <h2>Category</h2>
  
        {/* search bar */}
        <div className="card mt-3 px-3 ">
        <div className="product_page_searchbox">
          <Input type={"text"} plchldr={"Search by category name"} />
          <Form.Select aria-label="Search by category type" className="adminselectbox">
            <option>Search by category type</option>
            <option value="1">Grocery</option>
            <option value="2">Health</option>
            <option value="3">Sports & Accessor</option>
          </Form.Select>
          <Form.Select aria-label="Search by status" className="adminselectbox">
            <option>Search by category</option>
            <option value="1">Food</option>
          <option value="2">Fish & Meat</option>
          <option value="3">Baby Care</option>
          </Form.Select>
  
          <MainButton btntext={"Search"} btnclass={'button main_button w-50'} />
        </div>
  
        {/* upload */}
  
        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Category"}
            onClick={handleShow}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button adminmainbutton"}
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
              Add Category
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="addproductbody p-2">
          <div className="row p-3 m-0">
        <div className="col-md-6">
          <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
            <Form.Label>Category Name</Form.Label>
            <Form.Control type="text" placeholder="Category Name" />
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
            <Form.Label>Category Type</Form.Label>
            <Form.Select aria-label="Search by category type" className="adminselectbox">
            <option>Search by category type</option>
            <option value="1">Grocery</option>
            <option value="2">Health</option>
            <option value="3">Sports & Accessor</option>
          </Form.Select>
          </Form.Group>
        </div>
        <div className="col-md-6">
          <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
            <Form.Label>Parent Category</Form.Label>
            <Form.Select aria-label="Search by status" className="adminselectbox">
            <option>Search by category</option>
            <option value="1">Food</option>
          <option value="2">Fish & Meat</option>
          <option value="3">Baby Care</option>
          </Form.Select>
  
          </Form.Group>
        </div>
       
        <div className="col-md-6">
          <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
            <Form.Label>Category Icon</Form.Label>
            <Form.Control type="file" placeholder="Category Icon" />
          </Form.Group>
        </div>
      </div>
          </Modal.Body>
          <Modal.Footer className="addproductfooter">
            <Iconbutton
              btntext={"X Cancel"}
              onClick={handleClose}
              btnclass={"button main_outline_button adminmainbutton px-2"}
              // Iconname={<GiCancel /> }
            />
            <Iconbutton
              btntext={"Add Category"}
              onClick={handleClose}
              Iconname={<AiOutlinePlus />}
              btnclass={"button main_button adminmainbutton"}
            />
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

export default CategoryList;
