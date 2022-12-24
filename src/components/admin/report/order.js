import React, { useState, useEffect } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { BsBagPlus, BsFileBarGraph } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiTakeMyMoney, GiStorkDelivery } from "react-icons/gi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import moment from "moment/moment";

const OrderReport = () => {
  const [filterchange, setFilterchange] = useState("");
 
  const [ordersreport, setordersreport] = useState([])
  const [orderTable, setorderTable] = useState([])
  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [OrderError,setOrderError]=useState("")

   const fetchData=()=>{
    axios.post(`${process.env.REACT_APP_BASEURL}/orders_report`, 
    {
      "from_date":fromDate,
      "to_date":toDate,
      "vendors_id":[],
      "categorys":[],
      "user_locations":[],
      "brand":[]
    }).then((response) => {
     
       console.log("Order data----"+ JSON.stringify(response.data[0]))
       console.log("Order Table data---"+ JSON.stringify(response.data[1]))
       console.log('Error-----'+JSON.stringify(response.data))


       if(response.data.message=="No_Data"){

        setOrderError(response.data.message)
        setordersreport([0])
        setorderTable([0])

      }
      else{
        setOrderError("")
        
        setordersreport(response.data[0][0])
        setorderTable(response.data[1])
        setapicall(false)
      }

    }).catch(function (error) {
      console.log(error);
    });
   }

  useEffect(() => {
     fetchData()
  }, [apicall]);



  const TimeChange = (e) => {
    setFilterchange(e.target.value);
    let value = e.target.value;
    console.log("---------------------------------------------"+value);
    if(value==1){
      setFromDate(moment().format("YYYY-MM-DD"))
      console.log("From date"+e.target.value)
      console.log("today")
      setToDate(moment().format("YYYY-MM-DD"))
    }

    if(value==2){
      setFromDate(moment().subtract(1, 'days').startOf('days').format('YYYY-MM-DD'));
      console.log("From date"+e.target.value);
     
      setToDate( moment().format("YYYY-MM-DD"));
      console.log("yesterday--"+moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD'));

    }
   if(value==3){
      setFromDate( moment().subtract(1, 'weeks').startOf('weeks').format('YYYY-MM-DD')  );
    
      console.log("From date"+e.target.value)
      
      setToDate( moment().format("YYYY-MM-DD")  );
      // console.log("last week"+moment().subtract(1, 'week').startOf('week').format('YYYY-MM-DD'))
   
   }

   if(value==4){
   

    setFromDate(moment().subtract(1, 'months').startOf('months').format('YYYY-MM-DD'));
    console.log("From last month"+e.target.value)
    setToDate(  moment().format("YYYY-MM-DD")    );
    // setToDate("2022-12-14");

    
 }
 if(value==5){
  setFromDate(moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD') );
  console.log("From last 6 month"+e.target.value)
  setToDate( moment().format("YYYY-MM-DD") );
}


fetchData()
  };


  const submitHandler=()=>{
       
    setapicall(true)
    fetchData()
 
    
   }



    var Order= ordersreport.order_count
    var NetSales=ordersreport.net_sales
    var AvarageOrderValue=ordersreport.avg_order_value
    var AvarageItemPerOrder=ordersreport.avg_item_per_order
    



   const options = {
    chart: {
      type: "bar",
      borderRadius: "5",
      borderColor: "#335cad",
    },
    title: {
      text: " Figures",
      style: { color: "green", fontSize: "22px" },
      align: "left",
    },
    series: [
      {
        name: "Orders",
        data: [Order],
      },
      {
        name: "Net Revenue",
        data: [NetSales],
      },
      {
        name: "Average Order Value",
        data: [AvarageOrderValue],
      },
      {
        name: "Average Items Per Order",
        data: [AvarageItemPerOrder],
      },
    ],
    xAxis: {
      categories: [
        "1",
        "3",
        "5",
        "7",
        "9",
        "11",
        "13",
        "15",
        "17",
        "19",
        "21",
        "23",
      ],
    },
    yAxis: {
      categories: ["0", "200", "400", "600", "800", "1000"],
    },
  };
  const columns = [
    {
      name: "Date",
      selector: (row) => row.created_on,
      sortable: true,
      width: "170px",
      center: true,
    },

    {
      name: "Order ID",
      selector: (row) => row.order_id,
      sortable: true,
      width: "170px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "170px",
    },
    {
      name: "Customer ID",
      selector: (row) => row.user_id,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Product ID",
      selector: (row) => row.p_id,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
   
    {
      name: "Net Revenue",
      selector: (row) => row.total_order_amount,
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
      <h2>Order Report</h2>
      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
              onChange={TimeChange}
            >
             <option >Search by category</option>
              <option name="today" value={1}>Today</option>
              <option name="yesterday" value={2}>yesterday</option>
              <option name="last_week" value={3}>Last week</option>
              <option name="last_month" value={4}>last month</option>
              <option name="last_6_month" value={5}>last 6  month</option>
              {/* <option name="custom_month" value="6">custom month</option> */}
              <option name="custom_date" value="7">custom date</option>

            </Form.Select>
            </div>
           
          {filterchange==='7'?
         
          <>
             
      <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'}/>
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'}/>
        </div>
        </>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
       
        </div> : null}
        
        
        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} onClick={submitHandler} />
        </div>
       

          <div className="col-md-auto col-sm-6 aos_input">
            <DropdownButton
              id="dropdown-variant-success"
              title="Download"
              variant="button main_button"
            >
              <Dropdown.Item href="#/action-1">Excel</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Pdf</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        {/* upload */}

        {/*  */}
        {/* box */}
        <div className="col-12 px-3">
          {/* card */}
          <div className=" row main_dashboard_row1 d-flex mb-3 ">
            {/* order */}
            <div className="card p-2 col-3 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <BsBagPlus className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Orders </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">

                    {(OrderError)=="No_Data"||(ordersreport.order_count)==null || (ordersreport.order_count)==undefined  || (ordersreport.order_count)==""?<h3>No Record</h3>: <h3>{ordersreport.order_count}</h3>}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        <p className="mb-0 h5">0%</p>
                      </div>
                    </div>
                    <div>
                      <h5>Previous Year:</h5>
                      <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            {/* avg order */}
            <div className="card p-2 col-3 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiStorkDelivery className="text-success h1 mx-2" />
                <h5 className="text-success">Average Order Value </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                    {console.log("********"+OrderError)}
                  {console.log(" Order avarage value===="+ordersreport.avg_order_value)}
                    {(OrderError)=="No_Data"||(ordersreport.avg_order_value)==null || (ordersreport.avg_order_value)==undefined  || (ordersreport.avg_order_value)==""?<h3>No Record</h3>: <h3>{ordersreport.avg_order_value}</h3>}
                      
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        <p className="mb-0 h5">0%</p>
                      </div>
                    </div>
                    <div>
                      <h5>Previous Year:</h5>
                      <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* refund end */}
            {/* avg item */}
            <div className="card p-2 col-3 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <BsFileBarGraph className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Average Item Per Order </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                    {console.log("********"+OrderError)}
                  {console.log(" Avarage item per order===="+ordersreport.avg_item_per_order)}
                    {(OrderError)=="No_Data"||(ordersreport.avg_item_per_order)==null || (ordersreport.avg_item_per_order)==undefined  || (ordersreport.avg_item_per_order)==""?<h3>No Record</h3>: <h3>{ordersreport.avg_item_per_order}</h3>}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        <p className="mb-0 h5">0%</p>
                      </div>
                    </div>
                    <div>
                      <h5>Previous Year:</h5>
                      <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}

            {/*  */}
            {/* net */}
            <div className="card p-2 col-3 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Net Revenue </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                    {console.log("********"+OrderError)}
                  {console.log(" Net Revenue===="+ordersreport.net_sales)}
                    {(OrderError)=="No_Data"||(ordersreport.net_sales)==null || (ordersreport.net_sales)==undefined  || (ordersreport.net_sales)==""?<h3>No Record</h3>: <h3>{ordersreport.net_sales}</h3>}
               
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                        <p className="mb-0 h5">0%</p>
                      </div>
                    </div>
                    <div>
                      <h5>Previous Year:</h5>
                      <p className="h5">$0.00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
        {/*  */}

        {/* graph */}
        <HighchartsReact highcharts={Highcharts} options={options} />

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={orderTable}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body orderreport_table"}
        />
      </div>
    </div>
  );
};

export default OrderReport;
