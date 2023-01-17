import React, { useEffect, useState } from "react";
import Input from "./common/input";
import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import Form from "react-bootstrap/Form";
import { Link,  useNavigate } from "react-router-dom";
import "../../style/order.css";
import OrderJson from "./json/orders"
import axios from "axios";
import moment from "moment";
import Status from "./json/Status";


function Product() {
  const navigate = useNavigate();
  const [orderdata, setorderdata] = useState([]);
  const [changstatus, setchangstatus] = useState('');
  const [apicall, setapicall] = useState(false);
  const [searchdata, setsearchData] = useState({
  status:"",
  created_on:""
  })
 
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value })
  }
    useEffect(() => {
      axios.post(`${process.env.REACT_APP_BASEURL}/orders_list`, {
        "status":`${searchdata.status}`,
        "created_on":`${searchdata.created_on}`
        }).then((response) => {
        setorderdata(response.data)
        setapicall(false)
      }).catch(function (error) {
        console.log(error);
      });
    }, [searchdata,apicall,changstatus]);



    const onStatusChange = (e,id) => {
      // e.prevantDefault();
      setchangstatus(e.target.value)
      axios.put(`${process.env.REACT_APP_BASEURL}/order_status_change`, {
      status_change:e.target.value,
      id:`${id}`
        }).then((response) => {
        setapicall(true)
      }).catch(function (error) {
        console.log(error);
      });
    }
    const onOrderClick = (id) =>{
      localStorage.setItem("orderid", id[0])
      localStorage.setItem("userid", id[1])
      
      navigate('/order_detail')
    }
  const columns = [
    {
      name: "Order Id",
      selector: (row) => <p onClick={onOrderClick.bind(this,[row.order_id,row.user_id])}> {row.order_id}</p>,
      sortable: true,
    },
  
    {
      name: "Items",
      selector: (row) => (
        <p className="m-0"><b>Product ID:</b> {row.product_id}<br/>
        <b>Quantity:</b> {row.quantity}</p>
      ),
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => (
        <p className="m-0"><b>MRP :</b>₹ {row.mrp} ({row.discount}%) <br/>
        <b>Product Price:</b>₹ {Number(row.taxable_value).toFixed(2)} <br/>
        <b>Sale Price:</b> ₹ {Number(row.sale_price).toFixed(2)}
        </p>
      ),
      sortable: true,
    },
    {
      name: "Tax",
      selector: (row) => (
        <p className="m-0">
          <b>GST %:</b> {row.gst}<br/>
          <b>CGST %:</b> {row.cgst}<br/>
          <b>SGST %:</b> {row.sgst}<br/>
        </p>
      ),
      sortable: true,
    },
  
    {
      name: "Total Ammount",
      selector: (row) => (
        <p className="m-0">
          <b>Sale Price X Quantity</b><br/>
          ₹{(Number(row.sale_price)* Number(row.quantity)).toFixed(2)}<br/>
     
        </p>
      ),
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => moment(row.created_on).format('YYYY-MM-DD'),
      sortable: true,
    },
    {
      name: "Delivery Date",
      selector: (row) => row.delivery_date,
      sortable: true,
    },
  
    {
      name: "Pyament Mode",
      selector: (row) => (row.payment_mode),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status === "placed"
              ? "badge bg-warning"
              : row.status === "pending"
              ? "badge bg-secondary"
              : row.status === "delivered"
                ? "badge bg-success"
                : row.status === "packed"
                  ? "badge bg-primary"
                  : row.status === "cancelled"
                    ? "badge bg-danger"
                    : row.status === "approved"
                      ? "badge bg-info"
                      : "badge bg-dark"
          }
        >
          {row.status === "placed"
              ? "placed"
              : row.status === "delivered"
                ? "delivered"
                : row.status === "packed"
                  ? "packed"
                  : row.status === "cancelled"
                    ? "cancelled"
                    : row.status === "approved"
                      ? "approved"
                      :
                      row.status === "pending"
                      ? "pending": "return"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select aria-label="Search by delivery" size="sm" className="w-100" onChange={(e)=>onStatusChange(e,row.order_id)} name='status' >
          <option value="placed" selected={row.status === 'placed' ? true : false}>Placed</option>
          <option value="pending" selected={row.status === 'pending' ? true : false}>Pending</option>
          <option value="delivered"  selected={row.status === 'delivered' ? true : false}>Delivered</option>
          <option value="packed"  selected={row.status === 'packed' ? true : false}>Packed</option>
          <option value="cancel" selected={row.status === 'cancel' ? true : false}>Cancel</option>
          <option value="approved" selected={row.status === 'approved' ? true : false}>Approved  </option>
          <option value="return" selected={row.status === 'return' ? true : false}>Return  </option>
        </Form.Select>
      ),      
      sortable: true,
    }
  
 
  ];
  
 
  
  return (
    <div className="App">
      <h2>Orders</h2>
      <div className="card mt-3 px-3 ">
        <div className="product_page_searchbox bg-gray my-4">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by delivery"
                className="adminselectbox"
                onChange={OnSearchChange}
              name='status'
              value={searchdata.status}
              >
                <option>Delivery status</option>
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="packed">Processing</option>
                <option value="return">Return</option>
                <option value="cancel">Cancel</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by delivery_status"
                className="adminselectbox"
                onChange={OnSearchChange}
              name='created_on'
              value={searchdata.created_on}
              >
                <option>Order limits</option>
                <option value="one">Today</option>
                <option value="1">Yesterday</option>
                <option value="15">Last 15 days orders</option>
                <option value="30">Last 30 days orders</option>
                <option value="90">Last 3 month orders</option>
                <option value="180">Last 6 month orders</option>

              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <MainButton btntext={"Search"} />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={orderdata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body order_table"}
        />
      </div>
    </div>
  );
}

export default Product;
