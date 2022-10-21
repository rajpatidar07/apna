import React, { useState } from "react";
import Input from "../common/input";
import {
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import logo from '../../../images/logo.png';
import { BsTrash } from "react-icons/bs";
import { BiEdit, BiDotsVertical } from "react-icons/bi";
const handleClick = () => { };

const VendorsList = () => {
  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = () => setShow(true);
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const handleStatusChnage = (e) =>{
    // alert  (e)
  }
  const columns = [
    {
      name: "ID",
      selector: (row) => row.p_id,
      sortable: true,
    },
    {
      name: "Logo",
      center:true,
      cell: (row) => (
        <img
          width={'100%'}
          alt={row.name}
          src={
            logo
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
      name: "Shop Name",
      selector: (row) => row.shopName,
      sortable: true,
    },
    {
      name: "Owner Name",
      selector: (row) => row.Owner,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
      center: true,
    },
    {
      name: "Contact",
      selector: (row) => row.contact,
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status === "Pending"
              ? "badge bg-secondary"
              : row.status === "Active"
                ? "badge bg-success"
                : row.status === "Blocked" ? "badge bg-danger" : "badge bg-primary"
          }
        >
          {row.status}
        </span>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Change",
      selector: (row) => (
        <Form.Group className="" controlId="formBasicEmail">
          <Form.Select size="sm" aria-label="Default select example" onChange={()=>{handleStatusChnage(row.id)}}
            value={row.status === "Pending" ? "0" :
              row.status === "Active" ? "1" :
                row.status === "Blocked" ? "2" :
                  row.status === "In Progress" ? "3" : null
            }>
            <option value="0">Pending</option>
            <option value="1">Active</option>
            <option value="2">Block</option>
            <option value="3">In Progress</option>
          </Form.Select>
        </Form.Group>
      ),
      sortable: true,
      center: true,
    },

    {
      name: "ACTION",
      center:true,
      selector: (row) => (
        <div className={"actioncolimn"}>
         <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow}/>
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      p_id: "HHAHA",
      shopName: "Bhati Sweets",
      Owner: "Kuldeep Bhati",
      address: "Vijay Nagar Indore",
      contact: "1234567890",
      status: "Active",
      change: "Active",
    },
    {
      id: 2,
      p_id: "HHAHA",
      shopName: "Sharma Veg",
      Owner: "Anil Sharma",
      address: "Palasia, Indore",
      contact: "1234567890",
      status: "In Progress",
      change: "In Progress",
    },
    {
      id: 3,
      p_id: "HHAHA",
      shopName: "Mohan Kirana",
      Owner: "Mohan Verma",
      address: "PU4, Indore",
      contact: "1234567890",
      status: "Pending",
      change: "Blocked",
    },
    {
      id: 4,
      p_id: "HHAHA",
      shopName: "Bhati Sweets",
      Owner: "Kuldeep Bhati",
      address: "Vijay Nagar Indore",
      contact: "1234567890",
      status: "Active",
      change: "Active",
    },
    {
      id: 5,
      p_id: "HHAHA",
      shopName: "Sharma Veg",
      Owner: "Anil Sharma",
      address: "Palasia, Indore",
      contact: "1234567890",
      status: "Pending",
      change: "Pending",
    },
    {
      id: 6,
      p_id: "HHAHA",
      shopName: "Mohan Kirana",
      Owner: "Mohan Verma",
      address: "PU4, Indore",
      contact: "1234567890",
      status: "Blocked",
      change: "Blocked",
    },
  ];
  return (
    <div>
      <h2>Vendors List</h2>

      {/* search bar */}
      <div className="card p-3">
        <div className="row page_searchbox">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by vendor name"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select aria-label="Search by category" className="adminselectbox">
              <option>-Status-</option>
              <option value="1">Approval Pending</option>
              <option value="2">Approved</option>
              <option value="3">Blacklisted</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select aria-label="Search by status" className="adminselectbox">
              <option>-Store Type-</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <button className='button main_button w-100'>Search</button>
          </div>
        </div>



        <div className="product_page_uploadbox my-4">
          <button className='button main_button ml-auto' onClick={handleShow}>Add New Shop</button>
        </div>
        <DataTable
          columns={columns}
          className="main_data_table"
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
        />
        <SweetAlert
          show={Alert}
          title="Demo"
          text="SweetAlert in React"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Vendor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-3 m-0">
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Owner Name</Form.Label>
                <Form.Control type="text" placeholder="Owner Name" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Shop Name</Form.Label>
                <Form.Control type="text" placeholder="Shop Name" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" placeholder="Mobile" />
              </Form.Group>
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Shop Address</Form.Label>
                <Form.Control className="vendor_address" as="textarea" rows={3} placeholder='Address' />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>GSTN</Form.Label>
                <Form.Control type="text" placeholder="GSTN" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Geolocation</Form.Label>
                <Form.Control type="location" placeholder="Geolocation" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Gumasta</Form.Label>
                <Form.Control type="file" placeholder="Gumasta" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                <Form.Label>Other Documents</Form.Label>
                <Form.Control type="file" placeholder="Other Documents" />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='button main_outline_button' onClick={handleClose}>Cancel</button>
          <button className='button main_button' onClick={handleClose}>Save</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VendorsList;
