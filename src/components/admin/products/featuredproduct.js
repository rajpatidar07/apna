import React, { useEffect, useState ,useRef} from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Iconbutton from "../common/iconbutton";
import moment from "moment";
import axios from "axios";
import Feedback from "react-bootstrap/esm/Feedback";
const Featuredproduct = (fid) => {
  const formRef = useRef();
  let userid= localStorage.getItem("userid")
const [featuredProductData,setFeatureProductData]=useState([]);

  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const[msg,setMsg]=useState([]);
  const [Alert, setAlert] = useState(false);
 const [apicall,setapicall]=useState(false);
  const [fdata, setfdata] = useState([]);
  const [show, setShow] = useState("");
  const [validated, setValidated] = useState(false);
const [id,setId]=useState();
const [searchdata, setsearchData] = useState({
  product_title_name: "",
  category: "",
  manufacturing_date:"",

})
const handleClose = () => {
  formRef.current.reset();
  setValidated(false);
  setShow(false);
};

  const handleShow = (id) =>{ 
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/get_singal_fetured_product?id=${id}`)
        .then((response) => {
          let data=response.data[0];
          // let data = response.data.filter(item=> item.is_active === 1);
          setfdata(data)
          setId(data.id)
          console.log("----------------------"+JSON.stringify(data.id))

          setapicall(false);
        });
    } catch (err) {}
    
    
    
    setShow(true)};
  const handleClick = () => {};
  useEffect(() => {
  
      try {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=500&user_id=${userid}`,{
            "product_search":{
              "search":"",
              "price_from":"",
              "price_to":"",
              "id":"",
              "product_title_name":"asc",
              "sale_price":"",
              "short_by_updated_on":"",
              "is_fetured_product": ["1"],
              "fetured_type": ["featured_offer"]
              }
          })
          .then((response) => {
            let data=response.data.result;
            // let data = response.data.filter(item=> item.is_active === 1);
            setFeatureProductData(response.data.results)
            // setfdata(response.data.results)
            // setId('');
            setapicall(false);
          });
      } catch (err) {}
  
  }, [apicall]);
  const columns = [
    {
      name: "FeturedProductiId",
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
        row.product_id
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
      name: "StartDate",
      selector: (row) => moment(row.manufacturing_date).format('DD-MM-YYYY'),
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
          <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert}/>
        </div>
      ),
    },
  ];
  const handleFormChange = (e) => {
    setfdata({...fdata,[e.target.name]: e.target.value})
    };

  const UpdateFeaturedProduct = () => {
    axios.put(`${process.env.REACT_APP_BASEURL}/update_fetured_product`,{
      id:id,
      start_date:fdata.start_date,
      end_date:fdata.end_date
    }).then((response) => {
      let data=response.data;
      setValidated(false);
       setapicall(true);
       setShow(false)
  });
  formRef.current.reset();
  setValidated(false);
  show.preventDefault();
 
  
}
const OnSearchChange = (e) => {
  setsearchData({ ...searchdata, [e.target.name]: e.target.value })
}
const OnDateChange = (e) => {
  let mdate = moment(e.target.value).format('YYYY-MM-DD')
  setsearchData({ ...searchdata,manufacturing_date: mdate })
  console.log("DATE0000000000000"+mdate);
}
const onSearchClick = () =>{
  
}
useEffect(() => {
  axios.post(`${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`,{
    "product_search": {
      "search": `${searchdata.product_title_name}`,
      "price_from": "",
      "price_to": "",
      "id":"asc",
      "short_by_updated_on":"",
      "product_title_name":"asc",
      "sale_price":"",
      "category":`${searchdata.category}`,
      "quantity":0

    }}).then((response) => {
      let data=response.data
    // let data = response.data.filter(item=>item.quantity===0);
    setFeatureProductData(response.data)
    console.log("--featuredProductData"+JSON.stringify(featuredProductData));
  }).catch(function (error) {
    console.log(error);
  });
}, [searchdata]);

//  const UpdateFeturse
  return (
    <div>
      <h2>Featured Products</h2>

       {/* search bar */}
       <div className="card mt-3 p-3 ">
       <div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
        <input type={"text"}  onChange={OnSearchChange} name='product_title_name'
              value={searchdata.product_title_name} placeholder={"Search by product name"} className={'adminsideinput'}/>
        </div>
        {/* <div className="col-md-3 col-sm-6 aos_input">
        <Form.Select aria-label="Search by category" className="adminselectbox" placeholder="Search by category">
        <option>Search by category</option>
          <option value="1">Food</option>
          <option value="2">Fish & Meat</option>
          <option value="3">Baby Care</option>
        </Form.Select>
        </div> */} 
       <div className="col-md-3 col-sm-6 aos_input value={}">
            <input type={"date"} onChange={OnDateChange} name='manufacturing_date'
              value={searchdata.manufacturing_date}
              className={'adminsideinput'} placeholder={"Search by date"} />
          </div>
        {/* <div className="col-md-3 col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
        </div> */}
      </div>

      {/* upload */}
     
      <Modal size="lg" show={show} onHide={() => handleClose()}>
        <Form
          className=""
          ref={formRef}
          validated={validated}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Featured Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
              
                  <Form.Group className="mb-3 aos_input" controlId="formBasicStartDate">
                    <Form.Label>Manufacturing Date</Form.Label>
                    <Form.Control  name='start_date'   value={moment(fdata.start_date).format('YYYY-MM-DD')} onChange={(e) => handleFormChange(e)}  type="date" placeholder="Coupon Start Date" />
                    <Form.Control.Feedback type="invalid" className="h6">
                    Only current select current date or next date
                  </Form.Control.Feedback>
                  </Form.Group>
                </div> 
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicStartDate">
                    <Form.Label>Expire Date</Form.Label>
                    <Form.Control  name='end_date' value={moment(fdata.end_date).format('YYYY-MM-DD')} onChange={(e) => handleFormChange(e)}  type="date" placeholder="Coupon Start Date" />
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
              onClick={(id) => UpdateFeaturedProduct(id)}
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
        data={featuredProductData.results}
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
};

export default Featuredproduct;
