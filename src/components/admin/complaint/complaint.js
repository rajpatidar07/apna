import React, { useState, useRef,useEffect } from "react";
import Input from "../common/input";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Search } from "react-bootstrap-icons";

const Complaint = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [complaintdata, setcomplaintdata] = useState([]);
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [search, setNewSearch] = useState("");
  const complaintjson = {
    "complaint": [{
      id: 1,
      order_id: 124532,
      subject: "American tourister trolley return",
      description:"I have purchased Realme GT master edition with flipkart smart upgrade plan (order id - OD[protected]. From October 1st I suppose to be eligible to pay the remaining 30% balance that is 8400/-.",
      ticket_date: "2022-01-22",
      assign: "raj",
      resolved_date: "2022-05-02",
      status: "1",
    },
    {
      id: 2,
      order_id: 100333,
      subject: "American tourister trolley return",
      description: "I have purchased Realme GT master edition with flipkart smart upgrade plan (order id - OD[protected]. From October 1st I suppose to be eligible to pay the remaining 30% balance that is 8400/-. But I am unable to pay that as my pay later account is disabled.My due date for the payment is approaching.My phone will be locked if I am unable to pay the payment on time.I have tried to reach...",
      ticket_date: "2022-01-22",
      assign: "raj",
      resolved_date: "2022-05-02",
      status: "2",
    },
    {
      id: 3,
      order_id: 100333,
      subject: "American tourister trolley return",
      description: "I have purchased Realme GT master edition with flipkart smart upgrade plan (order id - OD[protected]. From October 1st I suppose to be eligible to pay the remaining 30% balance that is 8400/-. But I am unable to pay that as my pay later account is disabled.My due date for the payment is approaching.My phone will be locked if I am unable to pay the payment on time.I have tried to reach...",
      ticket_date: "2022-01-22",
      assign: "raj",
      resolved_date: "2022-05-02",
      status: "3",
    },

    ]
  }
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      width: "75px",
    },
    {
      name: "Order Id",
      selector: (row) => row.order_id,
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
      selector: (row) => <div className="complaintdescbox">
        <p className="complaintdesc">
          {row.description}
        </p>
      </div>,
      sortable: true,
      width: "200px",
    },

    {
      name: "Ticket Date",
      selector: (row) => row.ticket_date,
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
      selector: (row) => row.resolved_date,
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
            row.status === "1"
              ? "badge bg-success"
              : row.status === "2"
                ? "badge bg-danger"
                : row.status === "3"
                ? "badge bg-warning" : null
          }
        >
          { row.status === "1"
              ? "Solved"
              : row.status === "2"
                ? "Pending"
                : row.status === "3"
                ? "Processing" : null}
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
            onClick={handleShow.bind(this,row.id)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert}
          />
        </div>
      ),
    },
  ];
  const handleClose = () =>{ 
    formRef.current.reset();
    setValidated(false)
    setShow(false);
  }
  const handleShow = (e) => {
      setcomplaintdata(complaintjson.complaint[e - 1])
      setShow(true);
  }
  useEffect(() => {
    setcomplaintdata(complaintjson.complaint)
  }, [])
 
  const handleFormChange = (e) => {
    setcomplaintdata({
      ...complaintdata,
      [e.target.name]: e.target.value
    });
  };

  const UpdateCategoryClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      // e.stopPropagation();
      e.preventDefault()
      console.log("form----------   " + JSON.stringify(complaintdata));
      formRef.current.reset();
    setValidated(false)

    }
    setValidated(true)
  };
  const SearchOnChange = (e) =>{
//     let value = e.target.value.toLowerCase();
//     console.log(value);
// let result = [];
// result = complaintdata.filter((data) => {
//   return Object.values(data).join('').toLowerCase().includes(value.toLowerCase())
// });
// setcomplaintdata(result);
//     console.log("result"+JSON.stringify(result))
setNewSearch(e.target.value);
  }
  // filter
  // const filtered = !search
  //   ? complaintdata
  //   : complaintdata.filter((data) =>
  //       data.id.toLowerCase().includes(search.toLowerCase())
  //     );
  // console.log("complaintdata"+JSON.stringify(complaintdata))

  //
  return (
    <div className="App productlist_maindiv">
      <h2>Complaint/Support</h2>

      {/* search bar */}
      <div className="card mt-3 p-3">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
          <Form.Control type={"text"} placeholder={"Search by Id"} onChange={SearchOnChange} name={'idsearch'}/>
            {/* <Input type={"text"} plchldr={"Search by Id"} onChange={SearchOnChange} name={'idsearch'}/> */}
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
          data={complaintdata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body complaint_table"}
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
          <Form className="" validated={validated} ref={formRef} onSubmit={UpdateCategoryClick}>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input flex-column d-flex"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">Ticket Id</Form.Label>
                  <Form.Text className="mt-0" value={complaintdata.id} name={'id'}>100333</Form.Text>
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
                  <Form.Control as="textarea" rows={3} placeholder="Assigned To" onChange={handleFormChange} name={'resolved_desc'}/>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Assigned To</Form.Label>
                  <Form.Control type="text" placeholder="Assigned To" onChange={handleFormChange} name={'assign'} required value={complaintdata.assign}/>
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
                    onChange={handleFormChange} name={'status'}
                    value={complaintdata.status}
                  >
                    <option value={''}>Status</option>
                    <option value="1">Solved</option>
                    <option value="2">Pending</option>
                    <option value="3">Processing</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button main_outline_button"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button className="button main_button" onClick={UpdateCategoryClick} type='submit'>
              Update
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Complaint;
