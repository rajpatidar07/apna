import React, { useState, useRef } from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import SweetAlert from 'sweetalert-react';
import Form from "react-bootstrap/Form";
import { useEffect } from "react";
function Admin() {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [validated, setValidated] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState('');
  const [admindata, setadmindata] = useState([]);
  const [addadmindata, setaddadmindata] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if (e === 'add') {
      setShow(e);
    }
    // console.log(JSON.stringify(e))
    if (e !== 'add') {
      setadmindata(adminjson[e - 1])
      setShow(e);
    }
  }
  const formRef = useRef();
  const adminjson = [
    {
      "id": "1",
      "name": "Gourav",
      "email": "we2code@gmail.com",
      "mobile": "9876543210",
      "admin_type": "1",
      "password": "@123456",
    },
    {
      "id": "2",
      "name": "Vikram Soni",
      "email": "we2code@gmail.com",
      "mobile": "9876543210",
      "admin_type": "2",
      "password": "@123546"
    },
    {
      "id": "3",
      "name": "Shivani",
      "email": "we2code@gmail.com",
      "mobile": "9876543210",
      "admin_type": "1",
      "password": "@123456",
    },
    {
      "id": "4",
      "name": "Bhavna",
      "email": "we2code@gmail.com",
      "mobile": "9876543210",
      "admin_type": "1",
      "password": "@123456",
    },
  ]

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      center: true,
      selector: (row) => row.email,
    },
    {
      name: "Mobile",
      selector: (row) => row.mobile,
      sortable: true,
    },
    {
      name: "Admin Type",
      selector: (row) => (row.admin_type === '1' ? 'Super Admin' : row.admin_type === '2' ? 'Admin' : row.admin_type === '3' ? 'Editor' : null),
      sortable: true,
      center: true,
    },
    {
      name: "Password",
      selector: (row) => row.password,
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      width: "120px",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <AiFillEdit className=" p-0 m-0 editiconn" onClick={handleShow.bind(this, row.id)} />
          <BsTrash className=" p-0 m-0 editiconn text-danger" onClick={handleAlert} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setadmindata(adminjson)
  }, [show])

  const handleFormChange = (e) => {
    setaddadmindata({
      ...addadmindata,
      [e.target.name]: e.target.value
    });
  };
  const AddAdminClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log("falsecheckValidity----------");
      setValidated(true);
    }
    else {
      e.preventDefault();
      console.log("form----------   " + JSON.stringify(addadmindata));
      formRef.current.reset();
      setValidated(false);
    }
  };

  const UpdateAdminClick = (show) => {
    show.preventDefault()
    console.log("form----------   " + JSON.stringify(addadmindata));
  };
console.log("------admin"+JSON.stringify(addadmindata))

console.log("------admin"+JSON.stringify(addadmindata))
  return (
    <div className="App productlist_maindiv">
      <h2>Admin</h2>
      <div className="card mt-3 px-3">
        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Admin"}
            onClick={() => handleShow('add')}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button adminmainbutton"}
          />
        </div>

        {/* datatable */}
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="w-80"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form className="" novalidate validated={validated} ref={formRef} onSubmit={(show === 'add' ? (e) => AddAdminClick(e) : (show) => UpdateAdminClick(show))}>
            <Modal.Header closeButton className="">
              <Modal.Title id="example-custom-modal-styling-title">
                {show === 'add' ? 'Add Admin ' : ' Update Admin '}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-3">
              <div className="d-flex justify-content-center align-items-center p-0 m-0">

                <div className="">
                  <div className="">
                    <div className="row px-3">
                      <div className="col-12">
                        <Form.Group className="mb-3" controlId="formPlaintextName">
                          <Form.Label className="" column sm="12">
                            Name
                          </Form.Label>

                          <Form.Control type="text" placeholder="Name" onChange={(e) => handleFormChange(e)} value={admindata.name} name={'name'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill name
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextEmail"
                        >
                          <Form.Label className="" column sm="12">
                            Email
                          </Form.Label>

                          <Form.Control type="email" placeholder="Email" onChange={(e) => handleFormChange(e)} value={admindata.email} name={'email'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill email
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextMobile"
                        >
                          <Form.Label className="" column sm="12">
                            Mobile
                          </Form.Label>

                          <Form.Control type="number" placeholder="Mobile Number" min={1} onChange={(e) => handleFormChange(e)} value={admindata.mobile} name={'mobile'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill mobile number
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label className="" column sm="12">
                            Password
                          </Form.Label>

                          <Form.Control type="password" placeholder="Password" onChange={(e) => handleFormChange(e)} value={admindata.password} name={'password'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill password
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextAdminType"
                        >
                          <Form.Label className="" column sm="12">
                            Admin Type
                          </Form.Label>

                          <Form.Select aria-label="Default select example" onChange={(e) => handleFormChange(e)} value={admindata.admin_type} name={'admin_type'} required>
                            <option value=''>Select</option>
                            <option value="1">Super Admin</option>
                            <option value="2">Admin</option>
                            <option value="3">Editor</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill admin type
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer className="">
              <button className='button main_outline_button' onClick={() => handleClose()}>Cancel</button>
              <Iconbutton
                type={'submit'}
                btntext={(show === 'add' ? "Add Admin" : "Update Admin")}
                // onClick={(show === 'add' ? AddAdminClick : UpdateAdminClick(show))}
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        <DataTable
          columns={columns}
          data={adminjson}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body add_update_admin_table"}
        />
        <SweetAlert
          show={Alert}
          title="Admin Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
}

export default Admin;
