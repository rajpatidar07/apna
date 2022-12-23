import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import moment from "moment/moment";
import {
    BsCashCoin
  } from "react-icons/bs";
import { HiOutlineReceiptRefund,HiOutlineGift } from "react-icons/hi";
import {AiOutlineArrowRight}  from "react-icons/ai";
import {GiTakeMyMoney,GiPayMoney}  from "react-icons/gi";
import {MdOutlineLocalShipping}  from "react-icons/md";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ApexCharts from 'apexcharts'
import ReactApexChart from "react-apexcharts";




const RevenueReport = () => {

  
 
  const [filterchange,setFilterchange] = useState('')

  const [getRevenue, setGetRevenue]= useState([])

  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [tabledate, setTabledata]=useState([])

  var GrossAmmount=[];
  var totalSales=[];
  var totalGSt=[];
  var TotalShipping=[];
  var NetSales=[];
  var Discount=[]

  // const [fromDate, setFrom]



  const [option,setOption]=useState({
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [0, 2, 5],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    
    fill: {
      opacity: [0.85, 0.25, 1],
      gradient: {
        inverseColors: false,
        shade: 'light',
        type: "vertical",
        opacityFrom: 0.85,
        opacityTo: 0.55,
        stops: [0, 100, 100, 100]
      }
    },
    labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
      '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
    ],
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      title: {
        text: 'Points',
      },
      min: 0
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y) {
          if (typeof y !== "undefined") {
            return y.toFixed(0) + " points";
          }
          return y;
    
        }
      }
    }
  })


  const [series,setSeries]=useState([{
    name: 'TEAM A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  }, {
    name: 'TEAM B',
    type: 'area',
    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
  }, {
    name: 'TEAM C',
    type: 'line',
    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
  }])
 


  // setOption({
  //   chart: {
  //     height: 350,
  //     type: 'line',
  //     stacked: false,
  //   },
  //   stroke: {
  //     width: [0, 2, 5],
  //     curve: 'smooth'
  //   },
  //   plotOptions: {
  //     bar: {
  //       columnWidth: '50%'
  //     }
  //   },
    
  //   fill: {
  //     opacity: [0.85, 0.25, 1],
  //     gradient: {
  //       inverseColors: false,
  //       shade: 'light',
  //       type: "vertical",
  //       opacityFrom: 0.85,
  //       opacityTo: 0.55,
  //       stops: [0, 100, 100, 100]
  //     }
  //   },
  //   labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
  //     '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
  //   ],
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: 'datetime'
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Points',
  //     },
  //     min: 0
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: function (y) {
  //         if (typeof y !== "undefined") {
  //           return y.toFixed(0) + " points";
  //         }
  //         return y;
    
  //       }
  //     }
  //   }
  // })




    // const options = {
    //     chart: {
    //       type: 'line',
    //       borderRadius:'5',
    //       borderColor:'#335cad'
    //     },
    //     title: {
    //         text: ' Figures',
    //         style:{ "color": "green", "fontSize": "22px" },
    //         align:"left"
    //       },
    //     series: [
    //       {
    //         name:"Gross Revenue",
    //         data:GrossAmmount
    //       },
     
    //       {
    //         name:"Discount",
    //         data:Discount
    //       },
    //       {
    //         name:"Taxes",
    //         data: totalGSt
    //       },
    //       {
    //         name:"Net Revenue",
    //         data:NetSales
    //       },
    //       {
    //         name:"shipping",
    //         data:TotalShipping
    //       }
    //     ],
    //     xAxis: {
    //         categories:GrossAmmount
    //     },
    //     yAxis: { 
          
    //       categories:totalSales
    //   },
    //   };





    const columns = [
        {
          name: "Date",
          selector: (row) => (
              row.uniquedates
          ),
          sortable: true,
          width: "170px",
          center: true,
        },
        
        {
          name: "Gross Revenue",
          selector: (row) => row.gross_amount,
          sortable: true,
          width: "150px",
        },
        {
          name: "Total GST",
          selector: (row) => row.total_gst,
          sortable: true,
          width: "150px",
        },
        {
          name: "Discount",
          selector: (row) => row.discount,
          sortable: true,
          width: "150px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
      
        {
          name: "Taxes",
          selector: (row) => row.return_value,
          sortable: true,
          width: "150px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
        {
          name: "Shipping",
          selector: (row) => row.total_shipping_charges,
          sortable: true,
          width: "160px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
        {
            name: "Net Revenue",
            selector: (row) => row.net_sales,
            sortable: true,
            width: "150px",
            center: true,
            style: {
              paddingRight: "32px",
              paddingLeft: "0px",
            },
          },

          {
            name: "Total Revenue",
            selector: (row) => row.total_sales,
            sortable: true,
            width: "150px",
            center: true,
            style: {
              paddingRight: "32px",
              paddingLeft: "0px",
            },
          },
        
       
      ];
      
      // const data = [
      //   {
      //     id: 1,
      //     sku: "23 Sep,2022",
      //     pname: "$1,485.73",
      //     category:"$0.00",
      //     price: "$14",
      //     mdate: "$1,009.00",
      //     edate: "$476.73",
      //   },
      //   {
      //     id: 2,
      //     sku: "23 Sep,2022",
      //     pname:"$361.00",
      //     category: "$0.00",
      //     price: "$14",
      //     mdate: "$1,009.00",
      //     edate: "$476.73",
      //   },
      //   {
      //       id: 1,
      //       sku: "23 Sep,2022",
      //       pname: "$1,485.73",
      //       category:"$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },
      //     {
      //       id: 2,
      //       sku: "23 Sep,2022",
      //       pname:"$361.00",
      //       category: "$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },{
      //       id: 1,
      //       sku: "23 Sep,2022",
      //       pname: "$1,485.73",
      //       category:"$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },
      //     {
      //       id: 2,
      //       sku: "23 Sep,2022",
      //       pname:"$361.00",
      //       category: "$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },{
      //       id: 1,
      //       sku: "23 Sep,2022",
      //       pname: "$1,485.73",
      //       category:"$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },
      //     {
      //       id: 2,
      //       sku: "23 Sep,2022",
      //       pname:"$361.00",
      //       category: "$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },{
      //       id: 1,
      //       sku: "23 Sep,2022",
      //       pname: "$1,485.73",
      //       category:"$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },
      //     {
      //       id: 2,
      //       sku: "23 Sep,2022",
      //       pname:"$361.00",
      //       category: "$0.00",
      //       price: "$14",
      //       mdate: "$1,009.00",
      //       edate: "$476.73",
      //     },
      // ];


      const TimeChange = (e)=>{
        setFilterchange(e.target.value)

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
      }


      const fetchData=()=>{
        console.log( "from_date---"+fromDate)
        console.log( "to_date----"+toDate)
          axios.post(`${process.env.REACT_APP_BASEURL}/revenue`
        ,
         {
           "from_date":fromDate,
              "to_date":toDate,
              "vendors_id":[],
              "categorys":[],
              "user_locations":[],
              "brand":[]
        }
        ).then((response) => {
            console.log('revenue data'+JSON.stringify(response.data))
              setGetRevenue(response.data[0])
              setTabledata(response.data[0].ravenue_date_data)
         
        }).catch(function (error) {
          console.log(error);
        });
       } 


       


       


      useEffect(() => {
    
    
        fetchData();
    
       
      }, [ apicall]);
        
     
      // console.log(moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'))
      // console.log(  moment("20111031", "YYYYMMDD").fromNow())
      // console.log(moment("20021219","YYYYMMDD").fromNow())
      // console.log(' from now'+moment().fromNow())


      const submitHandler=()=>{
       
       setapicall(true)
        fetchData()
      }



      console.log("get revenue------"+JSON.stringify(getRevenue))
      console.log("data====="+ JSON.stringify(tabledate))
      


      


  

     tabledate.map((item)=>{

      GrossAmmount.push(item.gross_amount)
      totalSales.push(item.total_sales)
      totalGSt.push(item.total_gst)
       TotalShipping.push(item.total_shipping_charges)
       NetSales.push(item.net_sales)
       Discount.push(item.discount)

     })
 
     console.log("gross ammount ------"+GrossAmmount)
     console.log("total sales ------"+ totalSales)
     console.log("total GST ------"+ totalGSt)
     console.log("total Shipping ------"+ TotalShipping)
     console.log("net Sales ------"+ NetSales)
     console.log("Discount ------"+ Discount)
       



    return (
        <div>
              <h2>Revenue Report</h2>
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
        <DropdownButton id="dropdown-variant-success" title="Download" variant="button main_button">
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
            {/* revenue */}
            <div className="card p-2 col-2 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <BsCashCoin className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Gross Revenue </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (getRevenue.gross_total_amount)==null? <h3>No Record</h3>:  <h3>{getRevenue.gross_total_amount}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
            {/* Refund */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <HiOutlineReceiptRefund className="text-success h1 mx-2" />
                <h5 className="text-success">Refund </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (getRevenue.return_total)==null? <h3>No Record</h3>:  <h3>{getRevenue.return_total}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
{/* coupon */}
<div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <HiOutlineGift className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Coupons </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (getRevenue.total_discount)==null? <h3>No Record</h3>:  <h3>{getRevenue.total_discount}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
            {/* tax */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <GiPayMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Taxes </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (getRevenue.total_gst)==null? <h3>No Record</h3>:  <h3>{getRevenue.total_gst}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
            {/* shipping */}
            <div className="card p-2 col-2 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <MdOutlineLocalShipping className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Shipping </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (getRevenue.total_shipping_charges)==null? <h3>No Record</h3>:  <h3>{getRevenue.total_shipping_charges}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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
   
            {/* net */}
            <div className="card p-2 col-2 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Net Revenue </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (getRevenue.net_sale)==null? <h3>No Record</h3>:  <h3>{getRevenue.net_sale}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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


            <div className="card p-2 col-2 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Total Sales </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (getRevenue.total_amount_with_shipping)==null? <h3>No Record</h3>:  <h3>{getRevenue.total_amount_with_shipping}</h3> }  
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight className="h5 mb-0 mx-2"/>
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

{/* <HighchartsReact highcharts={Highcharts} options={options}  /> */}

<div id="chart">
  <ReactApexChart options={option} series={series} type="line" height={350} />
</div>



{/*  */}


      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={tabledate}
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body revenue_table"}
      />

</div>




        </div>
    );
}

export default RevenueReport;
