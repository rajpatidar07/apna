import React, { useState } from "react";
import Input from "../common/input";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Badge } from "react-bootstrap";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const Review = () => {
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
        width: "150px",
        center: true,
        style:{
            paddingLeft:0,
        }
      },
      
      {
        name: "Product Name",
        selector: (row) => row.cname,
        sortable: true,
        width: "180px",

      },
      {
        name: "Category Type",
        selector: (row) => row.ctype,
        sortable: true,
        width: "150px",
      },
      {
        name: "Review Date",
        selector: (row) => row.sdate,
        sortable: true,
        width: "150px",
        style: {
          paddingRight: "12px",
          paddingLeft: "0px",
        },
        center:true
      },
      {
        name: "Comment",
        selector: (row) => row.cmnt,
        sortable: true,
        width: "250px",
        style: {
          paddingRight: "12px",
          paddingLeft: "12px",
        },
        center:true

      },
      {
        name: "Status",
        selector: (row) => (
         
          <Badge  bg= {row.status === "Approve"
          ?"success"  : row.status === "Reject"
                ? "danger" :row.status === "Pending" ? "warning": null}>{row.status}</Badge>
        ),
        sortable: true,
        width: "120px",
        // center: true,
      },
      {
        name: "Action",
        width: "150px",
        style: {
          paddingRight: "12px",
          paddingLeft: "0px",
        },
        center: true,
        selector: (row) => (
          <div className={"actioncolimn"}>
           <BiEdit className=" p-0 m-0  editiconn text-secondary"  onClick={handleShow}/>
            <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
          </div>
        ),
      },
    ];
    
    const data = [
      {
        id: 102571,
        ctype:"Health & Care",
        cname: "Green Leaf Lettucer",
        sdate: "Sep 26, 2022",
        cmnt:<p className="reviewdesc">Nice products Bad product badBad product bad</p>,
        status: "Approve",
      },
      {
        id: 210257,
        ctype:"Health ",
        cname: "Green Leaf Lettuce",
        sdate: "Sep 26, 2022",
        cmnt:<p className="reviewdesc">Bad product bad qualityyuzuihcdisdj nrgknknk</p>,
        status: "Reject",
      },
      {
        id: 310257,
        ctype:"Health & Care",
        cname: "Green Leaf Lettuce",
        sdate: "Sep 26, 2022",
        cmnt:<p className="reviewdesc">Bad product bad qualityyuzuihcdisdj nrgknknk</p>,
        status: "Pending",
      },
    ];
 
    return (
        <div>
             <h2>Review</h2>
  
  {/* search bar */}
  <div className="card mt-3 p-3 ">
  <div className=" row">
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
  <Form.Select aria-label="Search by status" className="adminselectbox">
            <option>Search by status</option>
            <option value="1">Approve</option>
            <option value="2">Reject</option>
            <option value="3">Pending</option>
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
            <Modal.Title>Update Review Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Order Id</Form.Label>
                  <Form.Text className="mt-0">100333</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Product Name</Form.Label>
                  <Form.Text className="mt-0">Green Leaf Lettucer</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Review</Form.Label>
                  <Form.Text className="mt-0"> My phone is locked due to overdue payment But i have allreday paid
            the remaining amount of 5400 on 29.07.2022 time 15.40.54 Transaction
            no - EXTLINK[protected]_1</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                 <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    aria-label="Status"
                    className="adminselectbox"
                    placeholder="Status"
                  >
                    <option>Status</option>
                    <option value="1">Reject</option>
                    <option value="2">Pending</option>
                    <option value="3">Approve</option>
                  </Form.Select>
                </Form.Group>
              </div>
                  <Form.Label className="mb-0">Note</Form.Label>
                  <Form.Control as="textarea" rows={3} className="mt-0">  </Form.Control>
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

export default Review;
