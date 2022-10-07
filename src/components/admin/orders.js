import React, { useState } from "react";
import Input from "./common/input";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import { navigate, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { AlignCenter } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Addproduct from "./products/addproduct";


function Orders() {
  return (
    <div className="">
    <h2>Orders</h2>
    <div className="product_page_searchbox bg-gray">
        <Input type={"text"} plchldr={"Search by order id"} />
        <Form.Select aria-label="Search by category" className="adminselectbox">
          <option>Status</option>
          <option value="1">Delivered</option>
          <option value="2">Pending</option>
          <option value="3">Processing</option>
          <option value="4">Cancel</option>
        </Form.Select>
        <Form.Select aria-label="Search by status" className="adminselectbox">
          <option>Order limits</option>
          <option value="1">Last 5 days orders</option>
          <option value="2">Last 7 days orders</option>
          <option value="3">Last 15 days orders</option>
        </Form.Select>

        <MainButton btntext={"Search"} />
      </div>
    <div className="product_page_uploadbox">
    <div className="product_page_uploadbox_one">
      <Input type={"file"} inputclass={"hiddeninput"} />
      </div>
    
    </div>
    </div>
  );
}

export default Orders;
