import React, { useEffect, useState, useRef } from "react";
import Input from "../common/input";
import {
  AiOutlinePlus,
} from "react-icons/ai";
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
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [coupondata, setcoupondata] = useState([]);
  const [addcoupondata, setaddcoupondata] = useState([]);
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if (e === 'add') {
      setShow(e)
    }
    console.log(JSON.stringify(e))
    if (e !== 'add') {
      setcoupondata(couponjson.coupon[e - 1])
      setShow(e);
    }
  }
  const couponjson = {
    "coupon": [
      {
        id: 1,
        category_type: "Grocery",
        coupon_name: "October Gift Voucher",
        code: "OCTOBER21",
        start_date: "2022-02-22",
        end_date: "2022-02-22",
        percent: "10",
        amount: "2000",
        status: "Active",
      },
      {
        id: 2,
        category_type: "Health & Care",
        coupon_name: "Winter Gift Voucher",
        code: "WINTER21",
        start_date: "2022-02-22",
        end_date: "2022-02-22",
        amount: "2000",
        percent: "10",
        status: "Expired",
      },
      {
        id: 3,
        category_type: "Health & Care",
        coupon_name: "Winter Gift Voucher",
        code: "WINTER21",
        start_date: "2022-02-22",
        end_date: "2022-02-22",
        amount: "2000",
        percent: "10",
        status: "Pending",
      },
    ]
  }
  const columns = [
    {
      name: "ID",
      selector: (row) => (
        row.id
      ),
      sortable: true,
      width: "80px",
      center: true,
      style: {
        paddingLeft: 0,
      }
    },

    {
      name: "Campaign Name",
      selector: (row) => row.coupon_name,
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
      selector: (row) => row.category_type,
      sortable: true,
      width: "140px",
    },
    {
      name: "Start Date",
      selector: (row) => row.start_date,
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
      selector: (row) => row.end_date,
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
      selector: (row) => row.amount,
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

        <Badge bg={row.status === "Active"
          ? "success" : row.status === "Expired"
            ? "danger" : row.status === "Pending"
              ? "warning" : null}>{row.status}</Badge>
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
          <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.id)} />
          <BsTrash className=" p-0 m-0 editiconn text-danger" onClick={handleAlert} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setcoupondata(couponjson.coupon)
  }, [show])
  const handleFormChange = (e) => {
    setaddcoupondata({
      ...addcoupondata,
      [e.target.name]: e.target.value
    });
  };

  const ImgFormChange = (e) => {
    let imgapth = URL.createObjectURL([...e.target.files[0]])
    // ([...e.target.files]).forEach((image) => docsImageUrls.push(URL.createObjectURL(image)));
    setaddcoupondata((addcoupondata) => { return { ...addcoupondata, logo: imgapth } });
  }
  const AddCouponClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault()
      setValidated(true)
    }
    if (form.checkValidity() === true) {
    e.preventDefault();
      console.log("form----------   " + JSON.stringify(addcoupondata));
      formRef.current.reset();
      setValidated(false)
    }
  };
  const UpdateCouponClick = (show) => {
    // setadmindata(adminjson.admin[show])
    show.preventDefault();
    console.log("form----------   " + JSON.stringify(addcoupondata));
    formRef.current.reset();
  
  };
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
            <Form.Select aria-label="Search by category" className="adminselectbox">
              <option>Status</option>
              <option value="1">Active</option>
              <option value="2">Expired</option>
              <option value="3">Pending</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
          </div>

        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Coupons"}
            onClick={() => handleShow('add')}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button adminmainbutton"}
          />
        </div>

        {/* datatable */}
        <Modal
          show={show}
          onHide={()=>handleClose()}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form className="" validated={validated} ref={formRef} onSubmit={(show === 'add' ? (e)=>AddCouponClick(e) : (show) => UpdateCouponClick(show))}>
          <Modal.Header closeButton className="addproductheader">
            <Modal.Title id="example-custom-modal-styling-title">
              {show === 'add' ? 'Add Coupons' : ' Update Coupons'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="addproductbody p-2">
            
              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicNamel">
                    <Form.Label>Campaign Name</Form.Label>
                    <Form.Control onChange={handleFormChange} name='coupon_name' value={coupondata.coupon_name} required type="text" placeholder="Campaign Name" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill  name
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicCategoryType">
                    <Form.Label>Category Type</Form.Label>
                    <Form.Select aria-label="Search by category type" required className="adminselectbox" onChange={handleFormChange} name={'category_type'} value={coupondata.category_type}>
                      <option value={''}>Search by category type</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Health">Health</option>
                      <option value="Sports & Accessor">Sports & Accessor</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill category type
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicCode">
                    <Form.Label>Coupon Code</Form.Label>
                    <Form.Control onChange={handleFormChange} name='code' value={coupondata.code} required type="text" placeholder="Coupon Code" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill coupon code
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicAmount">
                    <Form.Label>Minimum Amount</Form.Label>
                    <Form.Control onChange={handleFormChange} name='amount' value={coupondata.amount} required type="number" placeholder="Minimum Amount Required" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill minimum amount
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicPercent">
                    <Form.Label>Discount Percentage</Form.Label>
                    <Form.Control onChange={handleFormChange} name='percent' value={coupondata.percent} required type="number" placeholder="Discount Percentage" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill percentage
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicStartDate">
                    <Form.Label>Coupon Start Date</Form.Label>
                    <Form.Control onChange={handleFormChange} name='start_date' value={coupondata.start_date} required type="date" placeholder="Coupon Start Date" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill start date
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>  <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicEndDate">
                    <Form.Label>Coupon End Date</Form.Label>
                    <Form.Control onChange={handleFormChange} name='end_date' value={coupondata.end_date} required type="date" placeholder="Coupon End Date" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill end date
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                    <Form.Label>Coupon Image</Form.Label>
                    <Form.Control type="file" placeholder="Coupon Image" onChange={ImgFormChange} name={'logo'} />
                  </Form.Group>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer className="addproductfooter">
            <Iconbutton
              btntext={"X Cancel"}
              onClick={()=>handleClose()}
              btnclass={"button main_outline_button adminmainbutton px-2"}
            // Iconname={<GiCancel /> }
            />
            <Iconbutton
              type={'submit'}
              btntext={(show === 'add' ? "Add Coupons" : "Update Coupons")}
              // onClick={(show === 'add' ? AddCouponClick : () => UpdateCouponClick(show))}
              btnclass={"button main_button "}
            />

          </Modal.Footer>
          </Form>

        </Modal>
        <DataTable
          columns={columns}
          data={couponjson.coupon}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body coupan_table"}
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
