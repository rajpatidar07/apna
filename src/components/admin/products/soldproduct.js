import React, { useEffect, useState ,useRef} from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap";
import Iconbutton from "../common/iconbutton";
import axios from "axios";
const Soldproduct = () => {
  const formRef = useRef();
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
const handleClick = () => {};
const [show, setShow] = useState(false);
const[id,setId]=useState('');
const[productData,setProductData]=useState([]);
const [solddata, setsolddata] = useState([]);
const[apicall,setapicall]=useState([]);
const [searchdata, setsearchData] = useState({
  product_title_name: "",
  category: "",

})
const[quantity,setQuantity]=useState([]);

const handleClose = () => {
  formRef.current.reset();
  setShow(false);
}; 

const handleShow = (id,product_id) =>{ 
  try {
    axios.get(`${process.env.REACT_APP_BASEURL}/products_pricing?id=${id}&product_id=${product_id}`
      )
      .then((response) => {
        let data=response.data;
        // let data = response.data.filter(item=> item.is_active === 1);
        setProductData(data[0])
        setId(data.id)
        // console.log("-----------******************-----------"+JSON.stringify(data.id))

        setapicall(false);
      });
  } catch (err) {}
  
  
  
  setShow(true)
};

// const pid=localStorage.getItem("productid");
// console.log("pidddddddddd"+pid)
const OnSearchChange = (e) => {
  setsearchData({ ...searchdata, [e.target.name]: e.target.value })
}
const onSearchClick = () =>{
  
}

const OnInputChange = (e) => {
  setProductData({ ...productData, [e.target.name]: e.target.value })
  // console.log("-----==========="+e.target.value);
}

const OnQuntityChange = (e) => {
  setQuantity(e.target.value)
  console.log("-----======QQQQQQQQQQQQQQQQ====="+e.target.value);
}
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`,{
      "product_search": {
        "search": `${searchdata.product_title_name}`,
        "price_from": "",
        "price_to": "",
        "latest_first":"",
        "short_by_updated_on":"",
        "product_title_name":"asc",
        "sale_price":"",
        "category":`${searchdata.category}`,
        "quantity":["10"]

      }}).then((response) => {
        let data=response.data
        if(data.length = 0){
      setsolddata([0])

        }
        else{
          setsolddata(response.data)

        }
      // let data = response.data.filter(item=>item.quantity==='0');
      setapicall(false)
      console.log("---sold"+JSON.stringify(solddata))
    }).catch(function (error) {
      console.log(error);
    });
  }, [searchdata,apicall]);
console.log("+++++++++++++++++++++"+JSON.stringify(solddata))
  const columns = [
    {
      name: "Sku",
      selector: (row) => (
        <p>
          {row.id}
        </p>
      ),
      sortable: true,
      width: "150px",
      center: true,
    },
    {
      name: "#",
      width: "180px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="70px"
          alt={row.product_title_name}
          src={
            row.image? row.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          }
          style={{
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "right",
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.product_title_name,
      sortable: true,
      width: "280px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "200px",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      width: "200px",
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      width: "180px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Action",
      width: "180px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.id,row.product_id)} />
            <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
        </div>
      ),
    },
  ];
console.log("---productDataAAAAAAAAAAAAAAAAAaa"+JSON.stringify(productData))
  
// }
const OnProductQutUpdate=(e,product_id)=>{
  e.prevantDefault();
  axios
  .put(
    `${process.env.REACT_APP_BASEURL}/products_varient_update`,
    {
      product_status: productData.product_status,
      product_id: productData.product_id,
      unit: productData.unit,
      colors: productData.colors,
      unit_quantity: productData.unit_quantity,
      size: productData.size,
      product_price: productData.product_price,
      mrp: productData.mrp,
      sale_price: productData.sale_price,
      discount: productData.discount,
      special_offer: productData.special_offer,
      featured_product: productData.featured_product,
      manufacturing_date:productData.manufacturing_date,
      expire_date: productData.expire_date,
      quantity: quantity,
    })
  .then((response) => {
    let data=response.data;
    setapicall(true);
    setShow(false);
  })
}

    return (
        <div>
         <h2>Sold Products</h2>

{/* search bar */}
<div className="card mt-3 p-3">
<div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
        <input type={"text"} placeholder={"Search by product name"} onChange={OnSearchChange} name='product_title_name'
              value={searchdata.product_title_name}
              className={'adminsideinput'}/>
        </div>
        {/* <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by product type"
                className="adminselectbox" name={"product_type"} onChange={(e) =>  OnChange(e)}  value={productData.product_type}
              >
                <option>Select Product Type</option>
                <option>{productData.product_type}</option>
                {/* <option value="1">Processing</option>
                <option value="2">Success</option>
                <option value="3">Failed</option>
                <option value="4">Refund</option> 
              </Form.Select>
            </div> */}
        {/* <div className="col-md-3 col-sm-6 aos_input">
        <Form.Select aria-label="Search by category" className="adminselectbox" placeholder="Search by category"  onChange={OnChange}
              name='product_type'
              >
        <option>Search By Product Type</option>
        <option value={productData.product_type}>{productData.product_type}</option>
          {/* <option value="1">Food</option>
          <option value="2">Fish & Meat</option>
          <option value="3">Baby Care</option> 
        </Form.Select>
        </div> */}

        <div className="col-md-3 col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button w-100'} onClick={onSearchClick}/>
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
              Sold Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    onChange={ OnInputChange}
                    value={productData.product_title_name}
                    
                    type="text"
                    placeholder="Add Title"
                    name={"product_title_name"}
                  />
                </Form.Group>
              </div>
              
              <div className="col-md-3 col-sm-6 aos_input">
                <label>Quantity</label>
              <input type={"number"} placeholder={"Select quantity"} onChange={OnQuntityChange} name='quantity'
              value={quantity}
              className={'adminsideinput'}/>
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
              onClick={(e)=>OnProductQutUpdate(e)}              
              // onClick={() => handleClose()}
            >
              Update
            </button>
          </Modal.Footer>
        </Form>
      </Modal>
     
      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={solddata.results}
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body soldproduct_table"}
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

export default Soldproduct;
