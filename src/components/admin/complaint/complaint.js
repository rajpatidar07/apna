import React, { useState, useMemo } from "react";
import Input from "../common/input";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Complaint = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.sku,
      sortable: true,
      width: "75px",
    },
    {
      name: "Order Id",
      selector: (row) => row.oid,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      width: "180px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Description",
      selector: (row) => row.des,
      sortable: true,
      width: "200px",
    },

    {
      name: "Ticket Date",
      selector: (row) => row.tdate,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Assigned To",
      selector: (row) => row.assign,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Resolved at",
      selector: (row) => row.res,
      sortable: true,
      width: "140px",
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
            row.status === "Solved"
              ? "badge bg-success"
              : row.status === "Pending"
              ? "badge bg-danger"
              : null
          }
        >
          {row.status}
        </span>
      ),
      sortable: true,
      width: "115px",
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
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow}
          />
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
      sku: 1,
      oid: 124532,
      subject: "American tourister trolley return",
      des: (
        <div className="complaintdescbox">
          <p className="complaintdesc">
            {" "}
            My phone is locked due to overdue payment But i have allreday paid
            the remaining amount of 5400 on 29.07.2022 time 15.40.54 Transaction
            no - EXTLINK[protected]_1
          </p>
        </div>
      ),
      tdate: "2022-01-22",
      assign: "raj",
      res: "2022-05-02",
      status: "Solved",
    },
    {
      sku: 2,
      oid: 100333,
      subject: "American tourister trolley return",
      des: (
        <div className="complaintdescbox">
          <p className="complaintdesc">
            {" "}
            I have purchased Realme GT master edition with flipkart smart
            upgrade plan (order id - OD[protected]. From October 1st I suppose
            to be eligible to pay the remaining 30% balance that is 8400/-. But
            I am unable to pay that as my pay later account is disabled. My due
            date for the payment is approaching. My phone will be locked if I am
            unable to pay the payment on time. I have tried to reach...
          </p>
        </div>
      ),
      tdate: "2022-01-22",
      assign: "raj",
      res: "2022-05-02",
      status: "Pending",
    },
  ];
  const handleClick = () => {};
  const onButtonClick = () => {};
  const navigate = useNavigate();

  // filter

  //
  return (
    <div className="App productlist_maindiv">
      <h2>Complaint/Support</h2>

      {/* search bar */}
      <div className="card mt-3 p-3">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by Id"} />
          </div>
          
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"date"} plchldr={"Search by Order Date"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select aria-label="Search by category" className="adminselectbox">
              <option>Status</option>
              <option value="1">Pending</option>
              <option value="2">Solved</option>
              <option value="3">Failed</option>
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

        {/* datatable */}

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
        <Modal size="md" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Complaint Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Ticket Id</Form.Label>
                  <Form.Text className="mt-0">100333</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Order Id</Form.Label>
                  <Form.Text className="mt-0">124532</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Description</Form.Label>
                  <Form.Text className="mt-0"> My phone is locked due to overdue payment But i have allreday paid
            the remaining amount of 5400 on 29.07.2022 time 15.40.54 Transaction
            no - EXTLINK[protected]_1</Form.Text>
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Resolved Description</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Assigned To" />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control type="text" placeholder="Assigned To" />
                </Form.Group>
              </div>
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
                    <option value="1">Solved</option>
                    <option value="2">Pending</option>
                    <option value="3">Processing</option>
                  </Form.Select>
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
      </div>
    </div>
  );
};

export default Complaint;
