import React, { useState,useMemo,useEffect,Fragment } from "react";
import Input from "../common/input";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import FilterComponent from "../common/FilterComponent";
import axios from "axios";
import moment from "moment";
import { Navigate, useNavigate } from "react-router-dom";

const InvoiceList = () => {


  const navigate = useNavigate();
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const[invoice,setInvoice]=useState([]);
  // const[invoiceno,setInvoiceNo]=useState([]);
  // const [invoiceid,setInvoiceId]=useState([]);
  // const [invoiceprice,setInvoicePrice]=useState([]);
  const [SearchInvo, setSearchInvo] = useState({
    "search":"",
    "from_date":"",
    "to_date":""
    });


    const InvoiceCheck= (id) =>{
       localStorage.setItem("invoiceid",id[1])
      localStorage.setItem("invoice_no",id[0]);
      if(id[0] == undefined || id[0] == '' || id[0]==null){

      }else{
      navigate('/invoice_detail');}
    }

  useEffect(() => {
    function getInvoiceList() {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/invoice_list`)
          .then((response) => {
            let data = response.data;
            setInvoice(data);
            // InvoiceCheck();
          })
      } catch (err) {}
    }

    getInvoiceList();
  }, []);

  const onValueChange=(e)=>{
    setSearchInvo({ ...SearchInvo, [e.target.name]: e.target.value });
   
  }
  
  const onDateChange=(e)=>{
    setSearchInvo({ ...SearchInvo, [e.target.name]: moment(e.target.value).format('DD-MM-YYYY')});
   
  }
  const SearchInvoices=()=>{
    {
      axios.post(`${process.env.REACT_APP_BASEURL}/invoice_search`,{
        "search":`${SearchInvo.search}`,
        "from_date":`${SearchInvo.from_date}`,
        "to_date":`${SearchInvo.to_date}`
    }) .then ((response) => {
      setInvoice(response.data);
      setSearchInvo('')
     

      })
    }
   
  }
  const columns = [
    {
      name: "Id",
      selector: (row) => (
          row.id
      ),
      sortable: true,
      width: "75px",
    },
    {
      name: "Invoice Number",
      selector: (row) =><p onClick={InvoiceCheck.bind(this,[row.invoice_no,row.id]) }>{row.invoice_no}</p>,
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
      selector: (row) =>row.invoice_date,
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
      selector: (row) => row.order_date,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "Stock",
      selector: (row) => row.payment_mode,
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
      selector: (row) => row.total_quantity,
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
      selector: (row) => row.total_cgst,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "SGST",
      selector: (row) => row.total_sgst,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    }, {
      name: "Taxable Value",
      selector: (row) => row.taxable_value,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "Discount/Coupon",
      selector: (row) => row.discount_coupon,
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
      selector: (row) => row.total_amount,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    // {
    //   name: "Action",
    //   width: "100px",
    //   style: {
    //     paddingRight: "12px",
    //     paddingLeft: "0px",
    //   },
    //   center: true,
    //   selector: (row) => (
    //     <div className={"actioncolimn"}>
    //       <BiEdit className=" p-0 m-0  editiconn text-secondary" />
    //       <BsTrash
    //         className=" p-0 m-0 editiconn text-danger"
    //         onClick={handleAlert}
    //       />
    //     </div>
    //   ),
    // },
  ];
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
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
          <div className="col-md-3 col-sm-6 aos_input ">
            <input className="adminsideinput" type={"text"} placeholder="Search by Vendor_Id" value={SearchInvo.search} name={"search"} onChange={(e) => onValueChange(e)} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <input type={"date"} placeholder={"Search by Order Date"} onChange={(e)=>onDateChange(e)}
              value={SearchInvo.from_date} name={'from_date'} className={'adminsideinput'}/>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <input type={"date"} placeholder={"Search by Order End_Date"} onChange={(e)=>onDateChange(e)}
              value={SearchInvo.end_date} name={'end_date'} className={'adminsideinput'}/>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <button className="button main_button w-100" onClick={()=>SearchInvoices()}>Search</button>
          </div>
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={SearchInvoices}
            />
          </div> */}
        </div>

        {/* upload */}


        {/* datatable */}

        <DataTable
          columns={columns}
          data={invoice}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body invoic_table"}
          subHeader
              subHeaderComponent={subHeaderComponent}
        />
        {/* <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        /> */}
      </div>
    </div>
  );
};
export default InvoiceList;
