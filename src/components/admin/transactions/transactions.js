import React  from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useState} from "react";
import { useEffect } from "react";
import "../../../style/order.css";
import axios from "axios";
// import TransactionJson from "../json/transaction"
function Transactions() {
  const [transectiondata,setTransectionData]=useState([]);
  const [SearchTransection, setSearchTransection] = useState({
    "order_id":"",
    "method":"",
    "status":""
});
  useEffect(() => {
 
    function getTransactions() {
      try {
        axios
          .get("http://192.168.29.108:5000/transaction_details?id=1")
          .then((response) => {
            let data = response.data;
            setTransectionData(data);
            console.log("transection-------------------"+JSON.stringify(data))
            // setapicall(false);
          });
      } catch (err) {}
    }

    getTransactions();
  }, []);
  const TransectionSearch=()=>{
    axios.post(`http://192.168.29.108:5000/transaction_list`,{
        "order_id":`${SearchTransection.order_id}`,
        "method":`${SearchTransection.method}`,
        "status":`${SearchTransection.status}`

  }).then ((response) => {
    setTransectionData(response.data);
    setSearchTransection('');

    })
  }
  const TranSearch = (e) => {
   
    setSearchTransection({...SearchTransection, [e.target.name]: e.target.value });
  };
  // var transactions = TransactionJson.transactions;
  const columns = [

    {
      name: "Id",
      selector: (row) => <Link to="/transactions_detail">{row.id}</Link>,
      sortable: true,
    },
    {
      name: "Transactions id",
      selector: (row) => <Link to="/transactions_detail">{row.transaction_id}</Link>,
      sortable: true,
    },
    {
      name: "Order Id",
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: "Invoice No.",
      selector: (row) => row.invoice_no,
      sortable: true,
    },

    {
      name: "Transactions Date",
      selector: (row) => row.transaction_date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },

    {
      name: "Method",
      selector: (row) => (
        row.method === 1
          ? "UPI"
          : row.method === 2
            ? "Card"
            : row.method === 3
              ? "COD"
              : row.method === 4
                ? "Netbanking"
                : row.method === 5
                  ? "Wallet"
                  : "Other"
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.status === 1
              ? "badge bg-primary"
              : row.status === 2
                ? "badge bg-success"
                : row.status === 3
                  ? "badge bg-danger"
                  : "badge bg-dark"
          }
        >
          {row.status === 1
              ? "Processing"
              : row.status === 2
                ? "Success"
                : row.status === 3
                  ? "Failed"
                  : "Refund"}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <div className="App">
      <h2>Orders</h2>
      <div className="card mt-3 px-3 ">
        <div className="product_page_searchbox bg-gray my-4">
          <div className="row">
            <div className="col-md-3 col-sm-6">
              <input type={"text"}  className="adminsideinput" placeholder={"Search by order id"} onChange={(e) => TranSearch(e)} name={"order_id"} value={SearchTransection.order_id} />
            </div>
            {/* <div className="col-md-3 col-sm-6">
              <input type={"text"} className="adminsideinput" placeholder={"Search by transaction id"} onChange={(e) => TranSearch(e)} name={"transaction_id"} value={SearchTransection.transaction_id} />
            </div> */}
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox" name={"status"} onChange={(e) =>  TranSearch(e)}  value={SearchTransection.status}
              >
                <option value="0">Status</option>
                <option value="1">Processing</option>
                <option value="2">Success</option>
                <option value="3">Failed</option>
                <option value="4">Refund</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by method"
                className="adminselectbox" name={"method"} onChange={(e) =>  TranSearch(e)}  value={SearchTransection.method}
              >
                <option value="0">Pyament Method</option>
                <option value="1">Card</option>
                <option value="2">UPI</option>
                <option value="3">Cash on delivery</option>
                <option value="4">Wallet</option>
                <option value="5">Other</option>
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6">
              <MainButton btntext={"Search"} onClick={TransectionSearch} />
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={transectiondata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body transactions_table"}
        />
      </div>
    </div>
  );
}

export default Transactions;
