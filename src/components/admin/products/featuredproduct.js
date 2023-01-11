import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import axios from "axios";
const Featuredproduct = () => {
const [featuredProductData,setFeatureProductData]=useState([]);

  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
 const [apicall,setapicall]=useState(false);
  const [fdata, setfdata] = useState([]);

  const handleClick = () => {};
  useEffect(() => {
  
      try {
        axios
          .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=500&user_id=61`,{
            "product_search":{
              "search":"",
              "price_from":"",
              "price_to":"",
              "is_fetured_product": ["1"],
              "fetured_type": ["promotion"]
              }
          })
          .then((response) => {
            let data=response.data.result;
            // let data = response.data.filter(item=> item.is_active === 1);
            setFeatureProductData(response.data.results)
            // setaddcoupondata(data);
            // setsearchCoupon(data);
            setapicall(false);
          });
      } catch (err) {}
  
  }, [apicall]);
  console.log("ffffffffffffffffffffffffff"+JSON.stringify(featuredProductData))

  // useEffect(() => {
  //   axios.post("${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50", {
  //     "product_search": {
  //       "search": "",
  //       "featured_product": 1

  //     }}).then((response) => {
  //     setfdata(response.data)
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }, []);
  const columns = [
    {
      name: "ID",
      selector: (row) => (
        <p>
          {row.id}
        </p>
      ),
      sortable: true,
      width: "80px",
      center: true,
    },
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="75px"
          alt={row.name}
          src={
            "https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg"
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
         <BiEdit className=" p-0 m-0  editiconn text-secondary" />
          <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
        </div>
      ),
    },
  ];
 
  return (
    <div>
      <h2>Featured Products</h2>

       {/* search bar */}
       <div className="card mt-3 p-3 ">
       <div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"text"} plchldr={"Search by product name"} />
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <Form.Select aria-label="Search by category" className="adminselectbox" placeholder="Search by category">
        <option>Search by category</option>
          <option value="1">Food</option>
          <option value="2">Fish & Meat</option>
          <option value="3">Baby Care</option>
        </Form.Select>
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by product name"} />
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
        </div>
      </div>

      {/* upload */}


      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={fdata.results}
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
