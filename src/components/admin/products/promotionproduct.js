import React, { useState ,useRef,useEffect} from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import moment from "moment";
const Promotionproduct = () => {
  const formRef = useRef();
  let userid= localStorage.getItem("userid")
const [featuredProductData,setFeatureProductData]=useState([]);

  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
 const [apicall,setapicall]=useState(false);
  const [fdata, setfdata] = useState([]);
  const [show, setShow] = useState(false);
  const currentdate = moment().format('YYYY-MM-DD')
const [searchdata, setsearchData] = useState({
  product_title_name: "",
  category: "",
  manufacturing_date:"",

})

const OnSearchChange = (e) => {
  setsearchData({ ...searchdata, [e.target.name]: e.target.value })
}

const OnDateChange = (e) => {
  let mdate = moment(e.target.value).format('YYYY-MM-DD')
  setsearchData({ ...searchdata,manufacturing_date: mdate })
}
console.log("-----"+searchdata.manufacturing_date)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = () => {};
  useEffect(() => {
  
      try {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=500&user_id=${userid}`,{
            "product_search":{
              "search":`${searchdata.product_title_name}`,
              "price_from":"",
              "price_to":"",
              "id":"",
              "product_title_name":"asc",
              "sale_price":"",
              "short_by_updated_on":"",
              "is_fetured_product": ["1"],
              "fetured_type": ["promotional"],
              "manufacturing_date":[`${searchdata.manufacturing_date}`]
              }
          })
          .then((response) => {
            let data=response.data.result;
            // let data = response.data.filter(item=> item.is_active === 1);
            setFeatureProductData(response.data.results)
            setfdata(response.data.results)
            // setaddcoupondata(data);
            // setsearchCoupon(data);
            setapicall(false);
          });
      } catch (err) {}
  
  }, [apicall,searchdata]);
 
  const columns = [
    {
      name: "ID",
      selector: (row) => (
        row.fetured_product_id
      ),
      sortable: true,
      width: "80px",
      center: true,
      style: {
        paddingLeft: 0,
      }
    },
    {
      name: "Product ID",
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
      name: "Image",
      width: "100px",
      center: true,
      cell: (row) => (
        
        <img
          // height="90px"
          // width="75px"
          alt={'apna_organic'}
          src={
            row.image? row.image :"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
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
      name: "Product Name",
      selector: (row) => row.product_title_name,
      sortable: true,
      width: "170px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "130px",
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
  
    {
      name: "Stock",
      selector: (row) => row.quantity,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
  
    {
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "From Date",
      selector: (row) => row.manufacturing_date,
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "To Date",
      selector: (row) => row.expire_date,
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
         <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.fetured_product_id)} />
          <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
        </div>
      ),
    },
  ];
  const handleFormChange = (e) => {
    setfdata({...fdata,[e.target.name]: e.target.value})
    };

  const UpdateFeaturedProduct = () => {
    
    axios.put(`${process.env.REACT_APP_BASEURL}/update_fetured_product`,{
      id:13,
      start_date:fdata.start_date,
      end_date:fdata.end_date
    }).then((response) => {
      let data=response.data.results;
    // console.log("idddllllllllllllllllllllllllllllllll------"+JSON.stringify(addadmindata))
  });
  formRef.current.reset();
 
  setapicall(true);
  
}

    return (
        <div>
              <h2>Promotional Products</h2>

{/* search bar */}
<div className="card mt-3 p-3 ">
<div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <input onChange={OnSearchChange} name='product_title_name'
              value={searchdata.product_title_name}
              className={'adminsideinput'} type={"text"} placeholder={"Search by product name"} />
          </div>
          
          <div className="col-md-3 col-sm-6 aos_input value={}">
            <input type={"date"} onChange={OnDateChange} name='manufacturing_date'
              value={searchdata.manufacturing_date}
              className={'adminsideinput'} placeholder={"Search by product name"} />
          </div>
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div> */}
        </div>

      {/* upload */}
     
      <Modal size="lg" show={show} onHide={() => handleClose()}>
        <Form
          className=""
         
          ref={formRef}
         
          
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {show === "add" ? "Add New Blog " : " Update Blog "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicStartDate">
                    <Form.Label>Manufacturing Date</Form.Label>
                    <Form.Control  name='start_date' value={fdata.start_date} onChange={(e) => handleFormChange(e)}  type="date" placeholder="Coupon Start Date" />
                  </Form.Group>
                </div> 
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicStartDate">
                    <Form.Label>Expire Date</Form.Label>
                    <Form.Control  name='end_date' value={fdata.end_date} onChange={(e) => handleFormChange(e)}   type="date" placeholder="Coupon Start Date" />
                  </Form.Group>
                </div> 
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button main_outline_button"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="button main_outline_button"
              onClick={() => UpdateFeaturedProduct()}
            >
              Update
            </button>
            {/* <Iconbutton
              type={"submit"}
                 
              // btntext={show === "add" ? "Add Blog" : "Update Blog"}
              // onClick={(show === 'add' ? AddVendorClick : UpdateVendorClick(show))}
              btnclass={"button main_button "}
            /> */}
          </Modal.Footer>
        </Form>
      </Modal>

      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={featuredProductData}
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body featuredproduct_table"}
      />
      <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to remove"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
    </div>
    </div>
    );
}

export default Promotionproduct;
