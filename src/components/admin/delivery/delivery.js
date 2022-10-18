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

const Delivery = () => {
    const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const ExpandedComponent = ({ data }) => <pre className="mx-4 mt-2"><p className="mb-0">Username : shivani</p><p className="mb-0">Mobile : 98956584545</p><p className="mb-0">Email : shivani@gmail.com</p></pre>;
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
        name: "Product Name",
        selector: (row) => row.cname,
        sortable: true,
        width: "120px",
      },
     
      {
        name: "Product Type",
        selector: (row) => row.ctype,
        sortable: true,
        width: "120px",
      },
      {
        name: "Order Date",
        selector: (row) => row.odate,
        sortable: true,
        width: "120px",
        center: true,
        style: {
          paddingRight: "32px",
          paddingLeft: "0px",
        },
      },
      {
        name: "Shipping Date",
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
        name: "Delivery Date",
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
        name: "Instruction",
        selector: (row) => row.instruction,
        sortable: true,
        width: "100px",
        style: {
          paddingRight: "12px",
          paddingLeft: "0px",
        },
      },
      {
        name: "Info",
        selector: (row) => row.info,
        sortable: true,
        width: "120px",
        style: {
          paddingRight: "12px",
          paddingLeft: "0px",
        },
      },
      {
        name: "Status",
        selector: (row) => (
         
          <Badge  bg= {row.status === "Delivered"
          ?"success"  : row.status === "Late"
                ? "danger" : row.status === "Ontime"
                ? "primary" :row.status === "Return"
                ? "warning":null}>{row.status}</Badge>
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
           <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow} />
          </div>
        ),
      },
    ];
    
    const data = [
      {
        id: 1,
        ctype:"Grocery",
        cname: "October Gift Voucher",
        odate: "Sep 26, 2022",
        sdate: "Sep 26, 2022",
        edate: "Jan 2, 2022",
        instruction:<p className="reviewdesc">delivery between 9:00 to 5:00</p>,
        info:<p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
        status: "Delivered",
      },
      {
        id: 2,
        ctype:"Health & Care",
        cname: "Winter Gift Voucher",
        odate: "Sep 26, 2022",
        sdate: "Sep 26, 2022",
        edate: "Jan 2, 2022",
        info:<p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
        instruction:<p className="reviewdesc">delivery between 9:00 to 5:00</p>,
        status: "Late",
      },
      {
        id: 2,
        ctype:"Health & Care",
        cname: "Winter Gift Voucher",
        odate: "Sep 26, 2022",
        sdate: "Sep 26, 2022",
        edate: "Jan 2, 2022",
        info:<p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
        instruction:<p className="reviewdesc">delivery between 9:00 to 5:00</p>,
        status: "Ontime",
      },{
        id: 2,
        ctype:"Health & Care",
        cname: "Winter Gift Voucher",
        odate: "Sep 26, 2022",
        sdate: "Sep 26, 2022",
        edate: "Jan 2, 2022",
        info:<p className="reviewdesc">jhdsj sadjab asdbjasbd sdjasb</p>,
        instruction:<p className="reviewdesc">delivery between 9:00 to 5:00</p>,
        status: "Return",
      },
    ];
    const handleClick = () => {};
    const onButtonClick = () => {};
    const navigate = useNavigate();
    return (
        <div>
             <h2>Delivery</h2>
  
  {/* search bar */}
  <div className="card mt-3 p-3 ">
  <div className=" row">
  <div className="col-md-3 col-sm-6 aos_input">
    <Input type={"text"} plchldr={"Search by Product name"} />
    </div>
  <div className="col-md-3 col-sm-6 aos_input">
  <Input type={"date"} plchldr={"Search by order date"} />
    </div>
    <div className="col-md-3 col-sm-6 aos_input">
    <Form.Select aria-label="Search by category type" className="adminselectbox">
            <option>Search by status</option>
            <option value="1">Delivered</option>
            <option value="2">Late</option>
            <option value="3">Ontime</option>
            <option value="4">Return</option>

          </Form.Select>
    </div>
 
<div className="col-md-3 col-sm-6 aos_input">
    <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
  </div>

  </div>

  {/* upload */}

  <div className="product_page_uploadbox my-4">
   
  </div>

  {/* datatable */}
  <Modal size="md" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Delivery Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Order Id</Form.Label>
                  <Form.Text className="mt-0">124532</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Product Name</Form.Label>
                  <Form.Text className="mt-0">Green Leaf</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Instruction</Form.Label>
                  <Form.Text className="mt-0"> My phone is locked due to overdue payment But i have allreday paid
            the remaining amount of 5400 on 29.07.2022 time 15.40.54 Transaction
            no - EXTLINK[protected]_1</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Status</Form.Label>
                  <Form.Text className="mt-0">Late</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Note</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Note" />
                </Form.Group>
              </div>
              
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button main_outline_button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="button main_button" onClick={handleClose}>
              Update
            </button>
          </Modal.Footer>
        </Modal>
  <DataTable
    columns={columns}
    data={data}
    pagination
    highlightOnHover
    pointerOnHover
    className={"productlist_table"}
    expandableRows
			expandableRowsComponent={ExpandedComponent}
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

export default Delivery;
