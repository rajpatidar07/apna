import React, { useState } from "react";
import {AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import AddAdmin from "../add_update_admin/add_admin";
import SweetAlert from 'sweetalert-react';

function Admin() {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    {
      name: "Name",
      selector: (row) => row.Name,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      center: true,
      selector: (row) => row.Email,
    },
    {
      name: "Mobile",
      selector: (row) => row.Mobile,
      sortable: true,
    },
    {
      name: "Admin Type",
      selector: (row) => row.admin_type,
      sortable: true,
      center: true,
    },
    {
      name: "Password",
      selector: (row) => row.Password,
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      width: "120px",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <AiFillEdit className=" p-0 m-0 editiconn" />
          <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      Name: "Gourav",
      Email: "we2code@gmail.com",
      Mobile: "9876543210",
      admin_type: "Super Admin",
      Password: "@123456",
    },
    {
      id: 2,
      Name: "Vikram Soni",
      Email: "we2code@gmail.com",
      Mobile: "9876543210",
      admin_type: "Editor",
      Password: "@123546",
    },
  ];
  // const handleClick = () => {};
  // const onButtonClick = () => {};
  // const navigate = useNavigate();

  return (
    <div className="App productlist_maindiv">
      <h2>Admin</h2>
      <div className="card mt-3 px-3">
        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Admin"}
            onClick={handleShow}
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
          <Modal.Header closeButton className="">
            <Modal.Title id="example-custom-modal-styling-title">
              Add Admin
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-3">
            <AddAdmin />
          </Modal.Body>
          <Modal.Footer className="">
          <button className='button main_outline_button' onClick={handleClose}>Cancel</button>
          <button className='button main_button' onClick={handleClose}>Save</button>
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
