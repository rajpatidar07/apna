import React, { useEffect, useState,useRef } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import moment from "moment";

const Offerproduct = () => {
  const formRef = useRef();
  let userid= localStorage.getItem("userid")
const [offerProductData,setOfferProductData]=useState([]);
const[featuredData,setFeaturetData]=useState([]);
const [id,setId]=useState("");

const currentdate = moment().format('')
const [searchdata, setsearchData] = useState({
  end_date:"",
  start_date:"",

})

const OnSearchChange = (e) => {
  setsearchData({ ...searchdata, [e.target.name]: e.target.value })
}

const OnDateChange = (e) => {

  let mdate = moment(e.target.value).format('YYYY-MM-DD')
  setsearchData({ ...searchdata,[e.target.name]: mdate })
}
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
 const [apicall,setapicall]=useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleClick = () => {};


  useEffect(() => {
    try {
      axios.post(`${process.env.REACT_APP_BASEURL}/featured_list`,{
                  "product_id":"", 
                  "fetured_type":"special_offer", 
                  "start_date":`${searchdata.start_date}`,
                  "end_date":`${searchdata.end_date}`
                  })
        .then((response) => {

          setOfferProductData(response.data)
          setapicall(false);
        });
    } catch (err) {}
          },
     [apicall]);
     const columns = [
      {
        name: "Product ID",
        selector: (row) => (
          row.product_id
        ),
        sortable: true,
        width: "150px",
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
        name: "Fetured_type",
        selector: (row) => row.fetured_type,
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
          <span
            className={
              ((currentdate >row.start_date || currentdate ===row.start_date) && currentdate <row.end_date)
                ? "badge bg-success"
                : (currentdate >row.end_date || currentdate ===row.end_date)
                ? "badge bg-danger" :currentdate < row.start_date?
                "badge bg-info" :null
  
            }
          >
            { ((currentdate >row.start_date || currentdate ===row.start_date) && currentdate <row.end_date)
              ? "Active"
              : (currentdate >row.end_date || currentdate ===row.end_date)
              ? "Expired":
              currentdate < row.start_date?
              "In Active" :
              null}
          </span>
        ),
        sortable: true,
        width: "115px",
        // center: true,
      },
      {
        name: "Start Date",
        selector: (row) =>moment(row.start_date).format("DD-MM-YYYY"),
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
           <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.product_id)} />
            <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert}/>
          </div>
        ),
      },
    ];
  const handleFormChange = (e) => {
    setFeaturetData({...featuredData,[e.target.name]: e.target.value})
    };


    const handleShow = (product_id) =>{ 

      try {
        axios.post(`${process.env.REACT_APP_BASEURL}/featured_list`,{
                    "product_id":product_id, 
                    "fetured_type":"special_offer", 
                    "start_date":"",
                    "end_date":""
                    })
          .then((response) => {
            setId(response.data[0].id)
            setFeaturetData({ ...featuredData, start_date: response.data[0].start_date,
       
            end_date:response.data[0].end_date
            })
            setapicall(false);
          });
      } catch (err) {}
      setShow(true)};

    const UpdateOfferProduct = (e) => {
      e.preventDefault();
      axios.put(`${process.env.REACT_APP_BASEURL}/update_fetured_product`,{
        id:id,
        start_date:featuredData.start_date,
        end_date:featuredData.end_date
      }).then((response) => {
        let data=response.data;
        console.log("UPDATE==========="+JSON.stringify(response.data))
        // setFeaturetData(response.data[0])
         setapicall(true);
         setShow(false)
        //  setFeaturetData('')
    });
    formRef.current.reset();
  }

 
  const submitHandler = () => {
    setapicall(true);
  };
  
  const OnReset = () => {
    setsearchData({ start_date: "",end_date:""});
    // fetchdata()
    setapicall(true);
  };
    return (
        <div>
             <h2>Offer Products</h2>

  {/* search bar */}
  <div className="card mt-3 p-3 ">
  <div className="row pb-3">
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <input onChange={OnSearchChange} name='product_title_name'
              value={searchdata.product_title_name}
              className={'adminsideinput'} type={"text"} placeholder={"Search by product name"} />
          </div> */}
          
          <div className="col-md-3 col-sm-6 aos_input value={}">
            <input type={"date"} onChange={OnDateChange} name='start_date'
              value={searchdata.start_date}
              className={'adminsideinput'} placeholder={"Search by date"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input value={}">
            <input type={"date"} onChange={OnDateChange} name='end_date'
              value={searchdata.end_date}
              className={'adminsideinput'} placeholder={"Search by date"} />
          </div>
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div> */}

<div className="col-md-3 col-sm-6 aos_input">
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
          </div>
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
                    <Form.Control  name='start_date' value={featuredData.start_date} onChange={(e) => handleFormChange(e)}  type="date" placeholder="Coupon Start Date" />
                  </Form.Group>
                </div> 
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicStartDate">
                    <Form.Label>Expire Date</Form.Label>
                    <Form.Control  name='end_date' value={featuredData.end_date} onChange={(e) => handleFormChange(e)}   type="date" placeholder="Coupon Start Date" />
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
              onClick={UpdateOfferProduct}
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
        data={offerProductData}
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

export default Offerproduct;
