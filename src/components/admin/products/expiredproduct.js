import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import axios from "axios";
import moment from "moment";


const Expiredproduct = () => {
  const handleClick = () => { };
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [expiredata, setexpiredata] = useState([]);
  const currentdate = moment().format('YYYY-MM-DD')
  console.log("---date"+currentdate)
const [searchdata, setsearchData] = useState({
  product_title_name: "",
  category: "",
  manufacturing_date:"",

})

const OnSearchChange = (e) => {
  setsearchData({ ...searchdata, [e.target.name]: e.target.value })
}

const OnDateChange = (e) => {
  let mdate = moment(e.target.value).format('DD-MM-YYYY')
  setsearchData({ ...searchdata,manufacturing_date: mdate })
}
useEffect(() => {
  axios.post(`${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`, {
    "product_search": {
      "search": `${searchdata.product_title_name}`,
      "category": `${searchdata.category}`,
      "price_from": "",
      "price_to": "",
      "id":"asc",
      "product_title_name":"asc",
      "sale_price":"",
      " short_by_updated_on":"",
      "manufacturing_date":`${searchdata.manufacturing_date}`,
      // "expire_date":`${currentdate}`
    }}).then((response) => {
      setexpiredata(response.data)
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
      width: "100px",
      center: true,
    },
    {
      name: "#",
      width: "120px",
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
      width: "250px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "170px",
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      width: "120px",
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
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Manufacture Date",
      selector: (row) => moment(row.manufacturing_date).format('DD-MM-YYYY'),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Expire Date",
      selector: (row) =>  moment(row.expire_date).format('DD-MM-YYYY'),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

  ];

  
  return (
    <div>
      <h2>Expired Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <input type={"text"} placeholder={"Search by product name"} onChange={OnSearchChange} name='product_title_name'
              value={searchdata.product_title_name}
              className={'adminsideinput'}/>
          </div>
          
          <div className="col-md-3 col-sm-6 aos_input">
            <input type={"date"} placeholder={"Search by product name"}  onChange={OnDateChange} name='manufacturing_date'
              value={searchdata.manufacturing_date}
              className={'adminsideinput'}/>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
          </div>
        </div>

        {/* upload */}


        {/* datatable */}

        <DataTable
          columns={columns}
          data={expiredata.results}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body expired_product_table"}
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
};

export default Expiredproduct;
