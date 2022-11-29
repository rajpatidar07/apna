import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import axios from "axios";
const Soldproduct = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
const handleClick = () => {};
const [solddata, setsolddata] = useState([]);
const [searchdata, setsearchData] = useState({
  product_title_name: "",
  category: "",

})

const OnSearchChange = (e) => {
  setsearchData({ ...searchdata, [e.target.name]: e.target.value })
}
const onSearchClick = () =>{
  
}
  useEffect(() => {
    axios.post("http://192.168.29.108:5000/products_search?page=0&per_page=50", {
      "product_search": {
        "search": `${searchdata.product_title_name}`,
        "category": `${searchdata.category}`,
        "quantity": 50

      }}).then((response) => {
      setsolddata(response.data)
      console.log("---sold"+JSON.stringify(solddata))
    }).catch(function (error) {
      console.log(error);
    });
  }, [searchdata]);

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
            ""
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
          <BiEdit className=" p-0 m-0  editiconn text-secondary" />
            <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
        </div>
      ),
    },
  ];
  

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
        <div className="col-md-3 col-sm-6 aos_input">
        <Form.Select aria-label="Search by category" className="adminselectbox" placeholder="Search by category"  onChange={OnSearchChange}
              name='category'
              value={searchdata.category}>
        <option>Search by category</option>
          <option value="1">Food</option>
          <option value="2">Fish & Meat</option>
          <option value="3">Baby Care</option>
        </Form.Select>
        </div>

        <div className="col-md-3 col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button w-100'} onClick={onSearchClick}/>
        </div>
      </div>
    

      {/* upload */}

     
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
