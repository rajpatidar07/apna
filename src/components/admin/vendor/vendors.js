import React, { useState } from "react";
import Input from "../common/input";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Iconbutton from "../common/iconbutton";
const columns = [
  {
    name: "ID",
    selector: (row) => row.p_id,
    sortable: true,
  },
  {
    name: "Logo",
    cell: (row) => (
      <img
        width={'100%'}
        alt={row.name}
        src={
          "http://localhost:3000/static/media/logo.7acc5687.png"
        }
        style={{
          borderRadius: 15,
          paddingTop: 10,
          paddingBottom: 10,
          textAlign: "right",
        }}
        onClick={handleClick}
      />
    ),
  },
  {
    name: "Shop Name",
    selector: (row) => row.shopName,
    sortable: true,
  },
  {
    name: "Owner Name",
    selector: (row) => row.Owner,
    sortable: true,
  },
  {
    name: "Address",
    selector: (row) => row.address,
    sortable: true,
    center: true,
  },
  {
    name: "Contact",
    selector: (row) => row.contact,
    sortable: true,
    center: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
    center: true,
  },


  {
    name: "ACTION",
    selector: (row) => (
      <div className={"actioncolimn"}>
        <AiFillEdit className="p-0 m-0 editiconn" />
        <AiFillDelete className="p-0 m-0 editiconn" />
      </div>
    ),
  },
];

const data = [
  {
    id: 1,
    p_id:"HHAHA",
    shopName:"Sharma Veg",
    Owner:"Anil Sharma",
    address:"Vijay Nagar Indore",
    contact:"1234567890",
    status:"Pending", 
  },
  {
    id: 1,
    p_id:"HHAHA",
    shopName:"Sharma Veg",
    Owner:"Anil Sharma",
    address:"Vijay Nagar Indore",
    contact:"1234567890",
    status:"Pending", 
  },
  {
    id: 1,
    p_id:"HHAHA",
    shopName:"Sharma Veg",
    Owner:"Anil Sharma",
    address:"Vijay Nagar Indore",
    contact:"1234567890",
    status:"Pending", 
  },
];
const handleClick = () => {};
const onButtonClick = () => {};

const VendorsList = () => {
  return (
    <div>
      <h2>Vendors List</h2>

      {/* search bar */}
      <div className="product_page_searchbox bg-gray">
        <Input type={"text"} plchldr={"Search by vendor name"} />
        <Form.Select aria-label="Search by category" className="adminselectbox">
          <option>-Status-</option>
          <option value="1">Approval Pending</option>
          <option value="2">Approved</option>
          <option value="3">Blacklisted</option>
        </Form.Select>
        <Form.Select aria-label="Search by status" className="adminselectbox">
          <option>-Store Type-</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>

        <MainButton btntext={"Search"} />
      </div>

      {/* upload */}

      <div className="product_page_uploadbox">
        <MainButton className={'main_button button'} btntext={"Add New Shop"} />
      </div>
      <DataTable
        columns={columns}
        className="main_data_table"
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
      />
    </div>
  );
};

export default VendorsList;
