import React, { useState,useMemo } from "react";
import Input from "../common/input";
import { AiOutlinePlus, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit, BiDotsVertical } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import Dropdown from "react-bootstrap/Dropdown";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import FilterComponent from "../common/FilterComponent";

const InvoiceList = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const columns = [
    {
      name: "Id",
      selector: (row) => (
          row.sku
      ),
      sortable: true,
      width: "75px",
    },
    {
      name: "Invoice Number",
      selector: (row) => row.Inum,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Invoice Date",
      selector: (row) => row.Idate,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
   
    {
      name: "Order Date",
      selector: (row) => row.odate,
      sortable: true,
      width: "140px",
      center: true,
      style: {
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
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "CGST",
      selector: (row) => row.CGST,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "SGST",
      selector: (row) => row.SGST,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    }, {
      name: "Taxable Value",
      selector: (row) => row.tval,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "Discount/Coupon",
      selector: (row) => row.discount,
      sortable: true,
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Total",
      selector: (row) => row.Total,
      sortable: true,
      width: "100px",
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
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert}
          />
        </div>
      ),
    },
  ];

  const data = [
    {
      sku: 1,
      Inum:32,
      odate: "2022-01-10",
     Idate:"2022-01-22",
      amount: "$14",
      CGST: "10%",
            SGST: "10%",      
            tval: "10%",
      stock: "15",
      Total:"$25",
      discount: "50%",
    },
    {
      sku: 2,
      Inum:33,
      odate: "2022-01-11",
     Idate:"2022-01-22",
      amount: "$14",
      CGST: "10%",
            SGST: "10%",      
            tval: "10%",
      stock: "15",
      Total:"$25",
      discount: "50%",
    },
  ];
  const handleClick = () => {};
  const onButtonClick = () => {};
  const navigate = useNavigate();


  // filter

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );

  const filteredItems = data.filter(
    item =>
      JSON.stringify(item)
        .toLowerCase()
        .indexOf(filterText.toLowerCase()) !== -1
  );

 
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    }
      return (
        <FilterComponent
          onFilter={e => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
        />
        
      );
    }, [filterText, resetPaginationToggle]);
    // 
  return (
    <div className="App productlist_maindiv">
      <h2>Invoice</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by Id"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
          <Input type={"date"} plchldr={"Search by Invoice Date"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
          <Input type={"date"} plchldr={"Search by Order Date"} />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
        </div>

        {/* upload */}


        {/* datatable */}

        <DataTable
          columns={columns}
          data={filteredItems}
          pagination
          highlightOnHover
          pointerOnHover
          className={"productlist_table"}
          subHeader
              subHeaderComponent={subHeaderComponent}
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
export default InvoiceList;
