import React, { useEffect, useState } from "react";
import Input from "../common/input";
import {
  MdOutlineRestore
} from "react-icons/md";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Iconbutton from "../common/iconbutton";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import axios from "axios";

const Deletedproduct = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [deletedata, setdeletedata] = useState([]);
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
    axios.post(`${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`, {
      "product_search": {
        "search": `${searchdata.product_title_name}`,
        "category": `${searchdata.category}`,
        "price_from": "",
        "price_to": "",
        "latest_first":"",
        "short_by_updated_on":"",
        "product_title_name":"",
        "sale_price":"",
        "is_delete": ["0"]

      }}).then((response) => {
      setdeletedata(response.data)
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
      width: "120px",
      center: true,
    },
    {
      name: "#",
      width: "150px",
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
      width: "290px",
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
      width: "140px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
  
    {
      name: "Date",
      selector: (row) => row.manufacturing_date,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Action",
      width: "120px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      selector: (row) => (
        <Iconbutton onClick={(e)=>OnProductRestore(e,row.id,row.product_id)} btntext={'Restore'} btnclass={'button bg-warning'} Iconname={<MdOutlineRestore className="mx-1"/>}/>
      ),
    },
  ];
  
  const OnProductRestore= (e,id,productid) =>{
    axios
    .get(
      `${process.env.REACT_APP_BASEURL}/products_pricing?id=${id}&product_id=${productid}`
    )
    .then((response) => {
      let data = response.data
    //   axios
    // .put(
    //   `${process.env.REACT_APP_BASEURL}/products_varient_update`,{
    //     "id": id,
    //     "product_id": productid,
    //     "unit": data.unit,
    //     "colors": data.colors,
    //     "size": data.size,
    //     "product_price": data.product_price,
    //     "mrp": data.mrp,
    //     "sale_price": data.sale_price,
    //     "discount":data.discount,
    //     "special_offer": data.special_offer,
    //     "featured_product": data.featured_product,
    //     "manufacturing_date": data.manufacturing_date,
    //     "expire_date": data.expire_date,
    //     "quantity": data.quantity,
    //     "unit_quantity": data.unit_quantity,
    //     "product_status": "1"
    //   }
    // )
    // .then((response) => {
    //   let data = response.data
      
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  const handleClick = () => {};
  return (
    <div>
      <h2>Deleted Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
      <div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
        <input type={"text"} placeholder={"Search by product name"} onChange={OnSearchChange} name='product_title_name'
              value={searchdata.product_title_name}
              className={'adminsideinput'}/>
        </div>
        {/* <div className="col-md-3 col-sm-6 aos_input">
        <Form.Select aria-label="Search by category" className="adminselectbox" placeholder="Search by category" onChange={OnSearchChange}
              name='category'
              value={searchdata.category}>
        <option>Search by category</option>
          <option value="1">Food</option>
          <option value="2">Fish & Meat</option>
          <option value="3">Baby Care</option>
        </Form.Select>
        </div> */}
        <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} 
              value={searchdata.manufacturing_date} placeholder={"Search by date"} className={'adminsideinput'}/>
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
        </div>
      </div>

      {/* upload */}

      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={deletedata.results}
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body deletedproduct_tabel"}
      />
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to restore"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
    </div>
    </div>
  );
};

export default Deletedproduct;
