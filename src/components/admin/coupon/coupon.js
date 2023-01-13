import React, { useEffect, useState, useRef} from "react";
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
 
  const [addcoupondata, setaddcoupondata] = useState({
  campaign_name:"",
  code:"",
  product_type:"",
  start_date:"",
  end_date:"",
  minimum_amount:"",
  percentage:"",
  status:"",
  image:""
    });
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [dltapicall, setDltapicall] = useState(false);
  const [cid, setCId] = useState(false);
 
  // const [scoupon, setScoupon] = useState([]);
  const [searchcoupon, setsearchCoupon] = useState([]);
  const [SearchCoup, setSearchCoup] = useState({
      "campaign_name":"",
      "code":"",
      "status":""
   });

  const handleAlert = (id) =>{
    setAlert(true);
      // setisActive(is_active)
      setCId(id)
  
} 
const hideAlert = () =>{
  axios.put(`${process.env.REACT_APP_BASEURL}/coupons_delete`,{
           id:`${cid}`,
           is_active:0
      }).then((response) => {
        setapicall(true)
        setAlert(false);
          });

} 
  // const showAlert =()=> {
  //   setAlert(true);
  //    axios.put(`${process.env.REACT_APP_BASEURL}/coupons_delete`,
  //   {
  //        id:cid,
  //        is_active:'0'
  //   }) .then((response) => {
  //     let data= response.data;
      
  //     setcoupondata(data);
  //     setsearchCoupon(data);
  //     setAlert(false);
  //     setDltapicall(true) 
  //   })
  // }
  const handleClose = () => {
    formRef.current.reset();
    // setcoupondata('')
    setValidated(false)
    setShow(false);}
  const handleShow = (e) => {
    if (e === 'add') {
      setShow(e)
    }
    console.log(JSON.stringify(e))
    if (e !== 'add') {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/coupon?coupon_id=${e}`)
          .then((response) => {
            let data= response.data[0];
            // let data = response.data[0].filter(item=>item.is_active===1);
            setaddcoupondata(data);
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
          .get(`${process.env.REACT_APP_BASEURL}/coupon?coupon_id=all`)
          .then((response) => {
            // let data = response.data;
            let data = response.data.filter(item=> item.is_active === 1);
            setcoupondata(data)
            console.log("tfggcvvvvvvvvvvvvvvvvv"+JSON.stringify(data))
            setaddcoupondata(data);
            setsearchCoupon(data);
            setapicall(false);
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
            row.image? row.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
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
          <BsTrash
              className=" p-0 m-0 editiconn text-danger"
              onClick={handleAlert.bind(this,row.id)}
            />
        </div>
      ),
    },
  ];
  const CouponSearch = (e) => {
   
    setSearchCoup({...SearchCoup, [e.target.name]: e.target.value });
  };
 
  const CoupondataSearch=()=>{
    axios.post(`${process.env.REACT_APP_BASEURL}/coupons_list`,{
      "campaign_name":`${SearchCoup.campaign_name}`,
       "code":`${SearchCoup.code}`,
       "status":`${SearchCoup.status}`
   

  }).then ((response) => {
    setcoupondata(response.data)
    setSearchCoup('');

    })
  }
  useEffect(() => {
    setcoupondata(coupondata);
  }, [])
  const handleFormChange = (e) => {
    setaddcoupondata({
      ...addcoupondata,
      [e.target.name]: e.target.value
    });
  };

   const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
 setFileName(e.target.files[0].name);
 
  };

  

  const AddCouponClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault()
      setValidated(true)
    }
    else {
      // e.preventDefault();
      const formData = new FormData();
      formData.append("filename", fileName);
      formData.append("campaign_name",addcoupondata.campaign_name);
      formData.append("code", addcoupondata.code);
      formData.append("product_type", addcoupondata.product_type);
      formData.append("start_date",moment(addcoupondata.start_date).format('YYYY-MM-DDThh:mm:00.000')); 
      formData.append("end_date",moment(addcoupondata.end_date).format('YYYY-MM-DDThh:mm:00.000'));
      formData.append("minimum_amount", addcoupondata.minimum_amount);
      formData.append("percentage", addcoupondata.percentage);
      formData.append("status", addcoupondata.status);
      formData.append("image", file);
      axios.post(`${process.env.REACT_APP_BASEURL}/coupons_add`,formData
      )
      .then((response) => {

        setapicall(true)
        setShow(false)
      });
      formRef.current.reset();
      setValidated(false);
      e.preventDefault();
      formRef.current.reset();
    };
  }


  const UpdateCouponClick = (e) => {
      const formData = new FormData();
      formData.append("filename", fileName);
      formData.append("id", e);
      formData.append("campaign_name",addcoupondata.campaign_name);
      formData.append("code", addcoupondata.code);
      formData.append("product_type", addcoupondata.product_type);
      formData.append("start_date",moment(addcoupondata.start_date).format('YYYY-MM-DDThh:mm:00.000')); 
      formData.append("end_date",moment(addcoupondata.end_date).format('YYYY-MM-DDThh:mm:00.000'));
      formData.append("minimum_amount", addcoupondata.minimum_amount);
      formData.append("percentage", addcoupondata.percentage);
      formData.append("status", addcoupondata.status);
      formData.append("image", file);

    axios.put(`${process.env.REACT_APP_BASEURL}/coupon_update`,formData
    ).then((response) => {
      setapicall(true)
  });
  formRef.current.reset();
  setValidated(false);
  setaddcoupondata("");
  setShow("");
  };

 
  let a = [];
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
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
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

                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicPercent">
                    <Form.Label>Status</Form.Label>
<Form.Select onChange={(e)=>handleFormChange(e)} name='status' value={addcoupondata.status}>
                <option value={''}>Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </Form.Select>
            </Form.Group>
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
                    {addcoupondata.image ? 
                    <img src={addcoupondata.image} width={'90px'} /> : null}
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
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
}

export default Coupon;
