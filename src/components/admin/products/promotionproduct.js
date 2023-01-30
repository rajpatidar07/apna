import React, { useState, useRef, useEffect } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import moment from "moment";
import SAlert from "../common/salert";
const Promotionproduct = () => {
  const formRef = useRef();
  let userid = localStorage.getItem("userid");
  const [promotionProductData, setpromotionProductData] = useState([]);

  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [show, setShow] = useState(false);
  const [featuredData, setFeaturetData] = useState([]);
  const [id, setId] = useState("");
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const currentdate = moment().format("");
  const [searchdata, setsearchData] = useState({
    start_date: "",
    end_date: "",
  });
  const hideUpdateAlert = () => setUpdateAlert(false);

  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };

  const OnDateChange = (e) => {
    let mdate = moment(e.target.value).format("YYYY-MM-DD");
    setsearchData({ ...searchdata, [e.target.name]: mdate });
  };
  const handleClose = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleClick = () => {};

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingLeft: 0,
      },
    },
    {
      name: "Product ID",
      selector: (row) => row.product_id,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingLeft: 0,
      },
    },

    {
      name: "Fetured_type",
      selector: (row) => row.fetured_type,
      sortable: true,
      width: "250px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Fetured_type",
      selector: (row) => row.fetured_type,
      sortable: true,
      width: "250px",
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
            (currentdate > row.start_date || currentdate === row.start_date) &&
            currentdate < row.end_date
              ? "badge bg-success"
              : currentdate > row.end_date || currentdate === row.end_date
              ? "badge bg-danger"
              : currentdate < row.start_date
              ? "badge bg-info"
              : null
          }
        >
          {(currentdate > row.start_date || currentdate === row.start_date) &&
          currentdate < row.end_date
            ? "Active"
            : currentdate > row.end_date || currentdate === row.end_date
            ? "Expired"
            : currentdate < row.start_date
            ? "In Active"
            : null}
        </span>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Start Date",
      selector: (row) => moment(row.start_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "End Date",
      selector: (row) => moment(row.end_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
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
            onClick={handleShow.bind(this, row.product_id)}
          />
        </div>
      ),
    },
  ];
  const handleFormChange = (e) => {
    setFeaturetData({ ...featuredData, [e.target.name]: e.target.value });
  };
  const handleShow = (product_id) => {
    try {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/featured_list`, {
          product_id: product_id,
          fetured_type: "promotional",
          start_date: "",
          end_date: "",
        })
        .then((response) => {
          setId(response.data[0].id);
          setFeaturetData({
            ...featuredData,
            start_date: response.data[0].start_date,

            end_date: response.data[0].end_date,
          });
          setapicall(false);
        });
    } catch (err) {}
    setShow(true);
  };

  useEffect(() => {
    try {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/featured_list`, {
          product_id: "",
          fetured_type: "promotional",
          start_date: `${searchdata.start_date}`,
          end_date: `${searchdata.end_date}`,
        })
        .then((response) => {
          setpromotionProductData(response.data);
          setapicall(false);
        });
    } catch (err) {}
  }, [apicall]);
  const UpdatePromotionProduct = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BASEURL}/update_fetured_product`, {
        id: id,
        start_date: featuredData.start_date,
        end_date: featuredData.end_date,
      })
      .then((response) => {
        let data = response.data;
        setapicall(true);
        setShow(false);
        setUpdateAlert(true);
      });
    formRef.current.reset();
  };

  const submitHandler = () => {
    setapicall(true);
  };

  const OnReset = () => {
    setsearchData({ start_date: "", end_date: "" });
    setapicall(true);
  };

  return (
    <div>
      <h2>Promotional Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <input onChange={OnSearchChange} name='product_title_name'
              value={searchdata.product_title_name}
              className={'adminsideinput'} type={"text"} placeholder={"Search by product name"} />
          </div> */}
          {/*           
          <div className="col-md-3 col-sm-6 aos_input value={}">
            <input type={"date"} onChange={OnDateChange} name='start_date'
              value={searchdata.start_date}
              className={'adminsideinput'} placeholder={"Search by product name"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input value={}">
            <input type={"date"} onChange={OnDateChange} name='end_date'
              value={searchdata.end_date}
              className={'adminsideinput'} placeholder={"Search by product name"} />
          </div> */}
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div> */}
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              onClick={submitHandler}
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button w-100"}
              type="reset"
              onClick={OnReset}
            />
          </div> */}
        </div>

        {/* upload */}

        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Form className="" ref={formRef}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicStartDate"
                  >
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      name="start_date"
                      value={featuredData.start_date}
                      onChange={(e) => handleFormChange(e)}
                      type="date"
                      placeholder="Coupon Start Date"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicStartDate"
                  >
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      name="end_date"
                      value={featuredData.end_date}
                      onChange={(e) => handleFormChange(e)}
                      type="date"
                      placeholder="Coupon Start Date"
                    />
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
              <button
                className="button main_outline_button"
                onClick={UpdatePromotionProduct}
              >
                Update
              </button>
            </Modal.Footer>
          </Form>
        </Modal>

        {/* datatable */}

        <DataTable
          columns={columns}
          data={promotionProductData}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body featuredproduct_table"}
        />
        <SAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to remove"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
        <SAlert
          show={UpdateAlert}
          title="Promotional Products Updated Successfully "
          onConfirm={hideUpdateAlert}
        />
      </div>
    </div>
  );
};

export default Promotionproduct;
