import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

const Featuredproduct = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const handleClick = () => {};
  // const columns = [
  //   {
  //     name: "Sku",
  //     selector: (row) => (
  //       <p>
  //         {row.sku}
  //       </p>
  //     ),
  //     sortable: true,
  //     width: "100px",
  //     center: true,
  //   },
  //   {
  //     name: "#",
  //     width: "120px",
  //     center: true,
  //     cell: (row) => (
  //       <img
  //         height="90px"
  //         width="75px"
  //         alt={row.name}
  //         src={
  //           "https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg"
  //         }
  //         style={{
  //           borderRadius: 15,
  //           paddingTop: 10,
  //           paddingBottom: 10,
  //           textAlign: "right",
  //         }}
  //         onClick={handleClick}
  //       />
  //     ),
  //   },
  //   {
  //     name: "Product Name",
  //     selector: (row) => row.pname,
  //     sortable: true,
  //     width: "250px",
  //   },
  //   {
  //     name: "Category",
  //     selector: (row) => row.category,
  //     sortable: true,
  //     width: "170px",
  //   },
  //   {
  //     name: "Price",
  //     selector: (row) => row.price,
  //     sortable: true,
  //     width: "120px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
 
  //   {
  //     name: "Stock",
  //     selector: (row) => row.stock,
  //     sortable: true,
  //     width: "120px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  
  //   {
  //     name: "Discount",
  //     selector: (row) => row.discount,
  //     sortable: true,
  //     width: "150px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "From Date",
  //     selector: (row) => row.mdate,
  //     sortable: true,
  //     width: "150px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "To Date",
  //     selector: (row) => row.edate,
  //     sortable: true,
  //     width: "150px",
  //     center: true,
  //     style: {
  //       paddingRight: "32px",
  //       paddingLeft: "0px",
  //     },
  //   },
  //   {
  //     name: "Action",
  //     width: "110px",
  //     style: {
  //       paddingRight: "12px",
  //       paddingLeft: "0px",
  //     },
  //     center: true,
  //     selector: (row) => (
  //       <div className={"actioncolimn"}>
  //        <BiEdit className=" p-0 m-0  editiconn text-secondary" />
  //           <BsTrash className=" p-0 m-0 editiconn text-danger"  onClick={handleAlert} />
  //       </div>
  //     ),
  //   },
  // ];
  const columns = [
    {
      name: "ID",
      selector: (row) => (
        <p>
          {row.sku}
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
      selector: (row) => row.pname,
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
      selector: (row) => row.price,
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
      selector: (row) => row.stock,
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
      selector: (row) => row.mdate,
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
      selector: (row) => row.edate,
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
  const data = [
    {
      id: 1,
      sku: "9AF4FE",
      pname: (
        <div className="productdescbox">
          <b>
            <p className="mb-0">Green Leaf Lettuce</p>
          </b>
  
          <p className="productdesc">
            {" "}
            {`The root vegetables include beets, carrots, radishes, sweet potatoes,
            and turnips`}
          </p>
        </div>
      ),
      category: (
        <p className="productdesc">Fruits & Vegetable Fruits & Vegetable</p>
      ),
      price: "$14",
      stock: "15",
      status: "Selling",
      discount: "50%",
      mdate:'2022-01-01',
      edate:'2022-05-16'
    },
    {
      id: 2,
      sku: "9AF4FE",
      pname: (
        <div className="productdescbox">
          <b>
            <p className="mb-0">Green Leaf Lettuce</p>
          </b>
          <p className="productdesc">
            {" "}
            The root vegetables include beets, and turnips
          </p>
        </div>
      ),
      category: "Fruits & Vegetable",
      price: "$14",
      stock: "15",
      status: "Sold out",
      discount: "50%",
      mdate:'2022-01-01',
      edate:'2022-05-16'
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
        data={data}
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
