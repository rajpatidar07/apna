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
import axios from "axios";
import moment from "moment";

const Coupon = () => {
  const formRef = useRef();
  const handleClick = () => { };
  const [validated, setValidated] = useState(false);
  
  const [coupondata, setcoupondata] = useState([]);
 
  const [addcoupondata, setaddcoupondata] = useState([]);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [dltapicall, setDltapicall] = useState(false);
  const [cid, setCId] = useState(false);
  const [isActive, setisActive] = useState(false);
  // const [scoupon, setScoupon] = useState([]);
  const [searchcoupon, setsearchCoupon] = useState([]);
  const [SearchCoup, setSearchCoup] = useState({
      "campaign_name":"",
      "code":"",
      "status":""
   });


  const handleAlert=(id,is_active)=> {
    setAlert(true);
    setisActive(is_active)
    setCId(id)
    
  }
  const hideAlert =()=> {
    setAlert(false);
    console.log("no");
  }
  const showAlert =()=> {
    console.log("yes")
    setAlert(true);
     axios.put(`http://192.168.29.108:5000/coupons_delete`,
    {
         id:cid,
         is_active:'0'
   
    }) .then((response) => {
      let data= response.data;
      
      setcoupondata(data);
      setsearchCoupon(data);
      setAlert(false);
      setDltapicall(true) 
    })
  }
  const handleClose = () => {
    formRef.current.reset();
    // setcoupondata('')
    setValidated(false)
    setShow(false);}
  const handleShow = (e) => {
    console.log(e+"-----aaaiiiiiiiiooooooooooooooooooooo")
    if (e === 'add') {
      setShow(e)
    }
    console.log(JSON.stringify(e))
    if (e !== 'add') {
      try {
        axios
          .get(`http://192.168.29.108:5000/coupon?coupon_id=${e}`)
          .then((response) => {
            let data= response.data[0];
            setaddcoupondata(data);
            // console.log("getttttttcouponnnnnnnnnnnnnnnnnnnnnnnnnn----------   " + JSON.stringify(data));

          })
      } catch (err) {}
      // setcoupondata(couponjson[e - 1])
      setShow(e);
    }
  }
  
  useEffect(() => {
    function getCouponList() {
      try {
        axios
          .get("http://192.168.29.108:5000/coupon?coupon_id=all")
          .then((response) => {
            let data = response.data;
            setcoupondata(data)
            setaddcoupondata(data);
            setsearchCoupon(data);
            setapicall(false);
            // console.log("couponnnnnnnnnnnnnn--------" + JSON.stringify(data));
            // Invoice_Check();
          });
      } catch (err) {}
    }

    getCouponList();
  }, [apicall,dltapicall]);
  
  
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
      selector: (row) => row.campaign_name,
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
      selector: (row) => row.product_type,
      sortable: true,
      width: "140px",
    },
    {
      name: "Start Date",
      selector: (row) => moment(row.start_date).format('YYYY-MM-DD'),
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
      selector: (row) => moment(row.end_date).format('YYYY-MM-DD'),
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
      selector: (row) => row.minimum_amount,
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
      selector: (row) => row.percentage,
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

        <Badge bg={row.status === "active"
          ? "success" : row.status === "expired"
            ? "danger" : row.status === "pending"
              ? "warning" : null}>{row.status}</Badge>
      ),
      sortable: true,
      width: "105px",
      // center: true,
    },

    {
      name: "Image",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          // height="90px"
          // width="75px"
          alt={'apna_organic'}
          src={
            row.image
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight: "100px",
            maxWidth: "100px"
          }}
          onClick={handleClick}
        />
      ),
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
          <BsTrash className=" p-0 m-0 editiconn text-danger" onClick={handleAlert.bind(this,row.id,row.is_active)} />
        </div>
      ),
    },
  ];
  const CouponSearch = (e) => {
   
    setSearchCoup({...SearchCoup, [e.target.name]: e.target.value });
  };
 
  const CoupondataSearch=()=>{
    axios.post(`http://192.168.29.108:5000/coupons_list`,{
      "campaign_name":`${SearchCoup.campaign_name}`,
       "code":`${SearchCoup.code}`,
       "status":`${SearchCoup.status}`
   

  }).then ((response) => {
    setcoupondata(response.data)
    setSearchCoup('');

    })
  }
  useEffect(() => {
    setcoupondata(coupondata)
  }, [])
  const handleFormChange = (e) => {
    setaddcoupondata({
      ...addcoupondata,
      [e.target.name]: e.target.value
    });
  };

   const ImgFormChange = (e) => {
    // addcoupondata(e.target.files[0]);
    setFile(e.target.files[0]);
 setFileName(e.target.files[0].name);
  };
  // const formData = new FormData();
  // let x = [];
  // x.push(formData);
  // let v = addcoupondata.concat(x);
  // console.log("rrrrrrrrrrrrr---------   " + JSON.stringify(v));
  const AddCouponClick = (e) => {
    const form = e.currentTarget;
    // console.log("file --> "+file +" ----filename--> "+fileName +"  formdata-- > "+JSON.stringify(formData))

    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault()
      setValidated(true)
    }
    else {
      e.preventDefault();
      axios
      .post(`http://192.168.29.108:5000/coupons_add`,
      {
        campaign_name:`${addcoupondata.campaign_name}`,
        code:`${addcoupondata.code}`,
        product_type:`${addcoupondata.product_type}`,
        start_date:`${addcoupondata.start_date}`,
        end_date:`${addcoupondata.end_date}`,
        minimum_amount:`${addcoupondata.minimum_amount}`,
        percentage:`${addcoupondata.percentage}`,
        status:`${addcoupondata.status}`,
        image:`${addcoupondata.image}`
        }
      )
      .then((response) => {
        setapicall(true)
        // console.log("addddd__________Coupon----------   " + JSON.stringify(addcoupondata));
      });
      formRef.current.reset();
      setValidated(false);
      e.preventDefault();
      formRef.current.reset();
      //   setValidated(false)
  
    // if (form.checkValidity() === true) {
    //   e.preventDefault();
    //   console.log("form----------   " + JSON.stringify(coupondata));
    //   formRef.current.reset();
    //   setValidated(false)
    // }
    };
  }
//   console.log({
//     campaign_name:`${addcoupondata.campaign_name}`,
 
// })
// console.log("coupon______________update------------------------"+JSON.stringify(addcoupondata))

  const UpdateCouponClick = (e) => {

    
 console.log("coupon______________update------------------------")

    e.preventDefault()
    axios.put(`http://192.168.29.108:5000/coupon_update`,
    {
      id:`${addcoupondata.id}`,
      campaign_name:`${addcoupondata.campaign_name}`,
      code:`${addcoupondata.code}`,
      product_type:`${addcoupondata.product_type}`,
      start_date:moment(addcoupondata.start_date).format('YYYY-MM-DDThh:mm:00.000'),
      end_date:moment(addcoupondata.end_date).format('YYYY-MM-DDThh:mm:00.000'),
      minimum_amount:`${addcoupondata.minimum_amount}`,
      percentage:`${addcoupondata.percentage}`, 
      // note:"",
      // image:"public/catgory_images/image-1669273978167.jpg"
    },
    
    addcoupondata).then((response) => {
      setapicall(true)
  });
  formRef.current.reset();
  setValidated(false);
  setaddcoupondata("");
  setShow("");
  // setapicall(true);
  show.preventDefault();

  };
  // let a = [];
  // console.log("form----------   " + JSON.stringify(addcoupondata));
  return (
    <div>
      <h2>Coupons</h2>
      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input type={"text"} name={"campaign_name" } className="adminsideinput" onChange={(e) => CouponSearch(e)} placeholder={"Search by campaign name"} value={SearchCoup.campaign_name} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <input type={"text"} name={"code"}  className="adminsideinput" onChange={(e) =>  CouponSearch(e)} placeholder={"Search by code name"} value={SearchCoup.code}/>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select aria-label="Search by category"name={"status"} onChange={(e) =>  CouponSearch(e)}  value={SearchCoup.status} className="adminselectbox">
              <option>Status</option>
              {searchcoupon.map((srch)=>{
                return( <option value={srch.status}>{srch.status}</option>)
             

              })}
              {/* <option value="1">Active</option>
              <option value="2">Expired</option>
              <option value="3">Pending</option> */}
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton btntext={"Search"}   btnclass={'button main_button w-100'} onClick={CoupondataSearch} />
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
          onHide={() => handleClose()}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form className="" validated={validated} ref={formRef} onSubmit={(show === 'add' ? (e) => AddCouponClick(e) : (show) => UpdateCouponClick(show))}>
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
                    <Form.Control onChange={(e)=>handleFormChange(e)} name='campaign_name' value={addcoupondata.campaign_name} required type="text" placeholder="campaign_name" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill  name
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicCategoryType">
                    <Form.Label>Category Type</Form.Label>
                    <Form.Select aria-label="Search by category type" required className="adminselectbox" onChange={(e)=>handleFormChange(e)} name={'product_type'} value={addcoupondata.product_type}>
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
                    <Form.Control onChange={(e)=>handleFormChange(e)} name='code' value={addcoupondata.code} required type="text" placeholder="Coupon Code" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill coupon code
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicAmount">
                    <Form.Label>Minimum Amount</Form.Label>
                    <Form.Control onChange={(e)=>handleFormChange(e)} name='minimum_amount' value={addcoupondata.minimum_amount} required type="number" placeholder="Minimum Amount Required" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill minimum amount
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicPercent">
                    <Form.Label>Discount Percentage</Form.Label>
                    <Form.Control onChange={(e)=>handleFormChange(e)} name='percentage' value={addcoupondata.percentage} required type="number" placeholder="Discount Percentage" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill percentage
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6 aos_input">
                <Form.Label>Status</Form.Label>
            <Form.Select aria-label="Search by category" onChange={(e)=>handleFormChange(e)} name='status' value={addcoupondata.status} className="adminselectbox mt-0 ">
              <option>Status</option>
              <option value="active">active</option>
              <option value="expired">expired</option>
              <option value="pending">pending</option>
            </Form.Select>
          </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicStartDate">
                    <Form.Label>Coupon Start Date</Form.Label>
                    <Form.Control onChange={(e)=>handleFormChange(e)} name='start_date' value={moment(addcoupondata.start_date).format('YYYY-MM-DD')} required type="date" placeholder="Coupon Start Date" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill start date
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>  <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicEndDate">
                    <Form.Label>Coupon End Date</Form.Label>
                    <Form.Control onChange={(e)=>handleFormChange(e)} name='end_date' value={moment(addcoupondata.end_date).format('YYYY-MM-DD')} required type="date" placeholder="Coupon End Date" />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill end date
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                    <Form.Label>Coupon Image</Form.Label>
                    <Form.Control type="file" placeholder="Coupon Image" onChange={(e)=>ImgFormChange(e)} name='image'/>
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                btntext={"Cancel"}
                onClick={() => handleClose()}
                btnclass={"button main_outline_button adminmainbutton px-2"}
              // Iconname={<GiCancel /> }
              />
              <Iconbutton
                type={'submit'}
                btntext={(show === 'add' ? "Add Coupons" : "Update Coupons")}
                onClick={(show === 'add' ? AddCouponClick : () => UpdateCouponClick(show))}
                btnclass={"button main_button "}
              />

            </Modal.Footer>
          </Form>

        </Modal>
        <DataTable
          columns={columns}
          data={coupondata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body coupan_table"}
        />
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={showAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
}

export default Coupon;
