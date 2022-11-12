import React, { useState, useRef } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import logo from '../../../images/logo.png';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import Iconbutton from "../common/iconbutton";
const VendorsList = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState('');
  const [Alert, setAlert] = useState(false);
  const [vendordata, setvendordata] = useState([]);
  const [addvendordata, setaddvendordata] = useState([]);
  const handleClose = () => {
    formRef.current.reset();
    // e.preventDefault()
    setValidated(false)
    setShow(false);
  }
  const handleShow = (e) => {
    if (e === 'add') {
      setShow(e)
    }
    console.log(JSON.stringify(e))
    if (e !== 'add') {
      setvendordata(vendorjson.vendor[e - 1])
      setShow(e);
    }
  }
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);

  const handleStatusChnage = (e) => {
  }
  const vendorjson = {
    "vendor": [
      {
        id: 1,
        email: "shivani@we2cdodjj.com",
        gstn: "6656",
        p_id: "HHAHA",
        shopname: "Bhati Sweets",
        owner: "Kuldeep Bhati",
        address: "Vijay Nagar Indore",
        mobile: "1234567890",
        status: "Active",
        change: "Active",
      },
      {
        id: 2,
        email: "shivani@we2cdodjj.com",
        gstn: "6656",
        p_id: "HHAHA",
        shopname: "Sharma Veg",
        owner: "Anil Sharma",
        address: "Palasia, Indore",
        mobile: "1234567890",
        status: "In Progress",
        change: "In Progress",
      },
      {
        id: 3,
        email: "shivani@we2cdodjj.com",
        gstn: "6656",
        p_id: "HHAHA",
        shopname: "Mohan Kirana",
        owner: "Mohan Verma",
        address: "PU4, Indore",
        mobile: "1234567890",
        status: "Pending",
        change: "Blocked",
      },
      {
        id: 4,
        email: "shivani@we2cdodjj.com",
        gstn: "6656",
        p_id: "HHAHA",
        shopname: "Bhati Sweets",
        owner: "Kuldeep Bhati",
        address: "Vijay Nagar Indore",
        mobile: "1234567890",
        status: "Active",
        change: "Active",
      },
      {
        id: 5,
        email: "shivani@we2cdodjj.com",
        gstn: "6656",
        p_id: "HHAHA",
        shopname: "Sharma Veg",
        owner: "Anil Sharma",
        address: "Palasia, Indore",
        mobile: "1234567890",
        status: "Pending",
        change: "Pending",
      },
      {
        id: 6,
        email: "shivani@we2cdodjj.com",
        gstn: "6656",
        p_id: "HHAHA",
        shopname: "Mohan Kirana",
        owner: "Mohan Verma",
        address: "PU4, Indore",
        mobile: "1234567890",
        status: "Blocked",
        change: "Blocked",
      },
    ]
  }
  const columns = [
    {
      name: "ID",
      selector: (row) => row.p_id,
      sortable: true,
    },
    {
      name: "Logo",
      center: true,
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
        />
      ),
    },
    {
      name: "Shop Name",
      selector: (row) => row.shopname,
      sortable: true,
    },
    {
      name: "Owner Name",
      selector: (row) => row.owner,
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
      selector: (row) => row.mobile,
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
          <Form.Select size="sm" aria-label="Default select example" onChange={handleStatusChnage}
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
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.id)} />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    setvendordata(vendorjson)
  }, [show])
  const handleFormChange = (e) => {
    setaddvendordata({
      ...addvendordata,
      [e.target.name]: e.target.value
    });
  };
  const docsImageUrls = [];
  const newImageUrls = [];

  const ImgFormChange = (e) => {
    ([...e.target.files]).forEach((image) => docsImageUrls.push(URL.createObjectURL(image)));
    setaddvendordata((addvendordata) => { return { ...addvendordata, other_document: docsImageUrls } });
  }
  const DocsFormChange = (e) => {
    ([...e.target.files]).forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setaddvendordata((addvendordata) => { return { ...addvendordata, gumasta: newImageUrls } });
  }
  const AddVendorClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log("falsecheckValidity----------");
      setValidated(true);
    }
    else {
      e.preventDefault();
      console.log("form----------   " + JSON.stringify(addvendordata));
      formRef.current.reset();
      setValidated(false);
    }
  };

  const UpdateVendorClick = (e) => {
    e.preventDefault()
    console.log("form----------   " + JSON.stringify(addvendordata));
  };
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
          <button className='button main_button ml-auto' onClick={() => handleShow('add')}>Add New Shop</button>
        </div>
        <DataTable
          columns={columns}
          className="main_data_table"
          data={vendordata.vendor}
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
      <Modal size="lg" show={show} onHide={handleClose} >
        <Form className="" noValidate validated={validated} ref={formRef} onSubmit={(show === 'add' ? (e) => AddVendorClick(e) : (e) => UpdateVendorClick(e))}>
          <Modal.Header closeButton>
            <Modal.Title>
              {show === 'add' ? 'Add New Vendor ' : ' Update Vendor '}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom01">
                  <Form.Label>Owner Name</Form.Label>
                  <Form.Control onChange={(e) => handleFormChange(e)} value={vendordata.owner} required type="text" placeholder="Owner Name" name={'owner'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill owner name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom02">
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control onChange={(e) => handleFormChange(e)} value={vendordata.shopname} required type="text" placeholder="Shop Name" name={'shopname'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill shop name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom03">
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control onChange={(e) => handleFormChange(e)} value={vendordata.mobile} required type="number" min={1} placeholder="Mobile" name={'mobile'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill mobile
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3 aos_input" controlId="validationCustom04">
                  <Form.Label>Email</Form.Label>
                  <Form.Control onChange={(e) => handleFormChange(e)} value={vendordata.email} required type="email" placeholder="Email" name={'email'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill email
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom05">
                  <Form.Label>Shop Address</Form.Label>
                  <Form.Control className="vendor_address" as="textarea" rows={3} placeholder='Address' name={'address'} onChange={(e) => handleFormChange(e)} value={vendordata.address} required />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill address
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom06">
                  <Form.Label>GSTN</Form.Label>
                  <Form.Control onChange={(e) => handleFormChange(e)} value={vendordata.gstn} required type="text" placeholder="GSTN" name={'gstn'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill gstn
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom07">
                  <Form.Label>Geolocation</Form.Label>
                  <Form.Control onChange={(e) => handleFormChange(e)} required type="location" placeholder="Geolocation" name={'location'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom08">
                  <Form.Label>Gumasta</Form.Label>
                  <Form.Control onChange={() => DocsFormChange()} multiple type="file" placeholder="Gumasta" required name={'gumasta'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload Img
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div classImg="col-md-6">
                <Form.Group className="mb-3 aos_input" controlId="validationCustom09">
                  <Form.Label>Other Documents</Form.Label>
                  <Form.Control onChange={() => ImgFormChange()} multiple type="file" placeholder="Other Documents" required name={'other_document'} />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload document
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='button main_outline_button' onClick={ handleClose}>Cancel</button>
            <Iconbutton
              type={'submit'}
              btntext={(show === 'add' ? "Add Vendor" : "Update Vendor")}
              // onClick={(show === 'add' ? AddVendorClick : UpdateVendorClick(show))}
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorsList;
