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

const Coupon = () => {
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
          row.id
        ),
        sortable: true,
        width: "70px",
        center: true,
        style:{
            paddingLeft:0,
        }
      },
      
      {
        name: "Campaign Name",
        selector: (row) => row.cname,
        sortable: true,
        width: "180px",
      },
      {
        name: "Code",
        selector: (row) => row.code,
        sortable: true,
        width: "130px",
      },
      {
        name: "Product Type",
        selector: (row) => row.ctype,
        sortable: true,
        width: "140px",
      },
      {
        name: "Start Date",
        selector: (row) => row.sdate,
        sortable: true,
        width: "120px",
        center: true,
        style: {
          paddingRight: "32px",
          paddingLeft: "0px",
        },
      },
      {
        name: "End Date",
        selector: (row) => row.edate,
        sortable: true,
        width: "120px",
        center: true,
        style: {
          paddingRight: "32px",
          paddingLeft: "0px",
        },
      },
      {
        name: "Mini Amt",
        selector: (row) => row.amt,
        sortable: true,
        width: "100px",
        center: true,
        style: {
          paddingRight: "32px",
          paddingLeft: "0px",
        },
      },
      {
        name: "Percentage",
        selector: (row) => row.percent,
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
         
          <Badge  bg= {row.status === "Active"
          ?"success"  : row.status === "Expired"
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
        id: 545581,
        ctype:"Grocery",
        cname: "October Gift Voucher",
        code:"OCTOBER21",
        sdate: "Sep 26, 2022",
        edate: "Jan 2, 2022",
        percent:"10%",
        amt:"$2000",
        status: "Active",
      },
      {
        id: 257856,
        ctype:"Health & Care",
        cname: "Winter Gift Voucher",
        code: "WINTER21",
        sdate: "Sep 26, 2022",
        edate: "Jan 2, 2022",
        amt:"$2000",
        percent:"10%",
        status: "Expired",
      },
    ];
    const handleClick = () => {};
    const onButtonClick = () => {};
    const navigate = useNavigate();
    return (
        <div>
             <h2>Coupons</h2>
  
  {/* search bar */}
  <div className="card mt-3 p-3 ">
  <div className=" row">
  <div className="col-md-3 col-sm-6 aos_input">
    <Input type={"text"} plchldr={"Search by campaign name"} />
    </div>
  <div className="col-md-3 col-sm-6 aos_input">
  <Input type={"text"} plchldr={"Search by code name"} />
    
    </div>
 
<div className="col-md-3 col-sm-6 aos_input">
    <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
  </div>

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
        Add Coupons
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className="addproductbody p-2">
    <div className="row p-3 m-0">
  <div className="col-md-6">
    <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
      <Form.Label>Campaign Name</Form.Label>
      <Form.Control type="text" placeholder="Campaign Name" />
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
      <Form.Label>Coupon Code</Form.Label>
      <Form.Control type="text" placeholder="Coupon Code" />
    </Form.Group>
  </div>
  <div className="col-md-6">
    <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
      <Form.Label>Minimum Amount</Form.Label>
      <Form.Control type="number" placeholder="Minimum Amount Required" />
    </Form.Group>
  </div>
  <div className="col-md-6">
    <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
      <Form.Label>Discount Percentage</Form.Label>
      <Form.Control type="number" placeholder="Discount Percentage" />
    </Form.Group>
  </div>
  <div className="col-md-6">
    <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
      <Form.Label>Coupon Start Date</Form.Label>
      <Form.Control type="date" placeholder="Coupon Start Date" />
    </Form.Group>
  </div>  <div className="col-md-6">
    <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
      <Form.Label>Coupon End Date</Form.Label>
      <Form.Control type="date" placeholder="Coupon End Date" />
    </Form.Group>
  </div>
  <div className="col-md-6">
    <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
      <Form.Label>Coupon Image</Form.Label>
      <Form.Control type="file" placeholder="Coupon Image" />
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

export default Coupon;
