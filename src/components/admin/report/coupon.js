import React, {useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import {AiOutlineArrowRight}  from "react-icons/ai";
import {GiStorkDelivery,GiMoneyStack}  from "react-icons/gi";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from 'axios';
import moment from "moment/moment";

const CouponReport = () => {
  const options = {
    chart: {
      type: "line",
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
        name: "Discounted Orders",
        data: [1, 2, 1, 4, 3, 6, 9, 4, 1, 8, 3, 5],
      },
      {
        name: "Amount",
        data: [1, 3, 1, 3, 2, 5, 1, 4, 1, 8, 3, 5],
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
      name: "Coupon Code",
      selector: (row) => row.coupons_code,
      sortable: true,
      width: "260px",
    },
    {
      name: " Discount Coupon",
      selector: (row) => row.discount_coupon,
      sortable: true,
      width: "260px",
    },
    {
      name: "Amount Discounted",
      selector: (row) => row.amount_discounted,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => row.created_date,
      sortable: true,
      
    },
    {
      name: "Expires",
      selector: (row) => row.edate,
      sortable: true,
     
    },
    {
      name: "Orders",
      selector: (row) => row.order_count,
      sortable: true,
      
    },
 
   
   
  ];

  // const data = [
  //   {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   },
  //   {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   }, {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   }, {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   }, {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   }, {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   }, {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   }, {
  //     id: 1,
  //     code: "Coupon250",
  //     type: "PErcentage",
  //     cdate:"23 Sep,2021",
  //   edate:"23 Sep,2021",
  // discount:"12",
  // order: "120",
  //   },
  // ];


  
  const [filterchange,setFilterchange] = useState('')

  
  const [getCoupon, setGetCoupon]= useState([])

  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [tabledate, setTabledata]=useState([])
  const [searchCoupon, setSearchCoupon]=useState("")
  const [couponError,setCouponError]=useState("")




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
              axios.post(`${process.env.REACT_APP_BASEURL}/coupons_report`
            ,
             {
               "from_date":fromDate,
                  "to_date":toDate,
                  "coupons_search":searchCoupon
            }
            ).then((response) => {
                console.log('Coupon orders'+JSON.stringify(response.data[0]))
                console.log('All  Coupon '+JSON.stringify(response.data[1]))

                console.log('Error-----'+JSON.stringify(response.data))
               

                  if(response.data.message=="no_data"){
                    setCouponError(response.data.message)
                     setGetCoupon([0])
                  setTabledata([0])

                  }
                  else{
                    setCouponError('')
                    setGetCoupon(response.data[0][0])
                  setTabledata(response.data[1])
                  }
             
            }).catch(function (error) {
              console.log(error);
            });
           } 
    
    
           
    
    
           
    
    
          useEffect(() => {
        
        
            fetchData();
        
           
          }, [ apicall]);
            

          const ProductChange =(e)=>{
            setSearchCoupon(e.target.value)
             
           }
    
           const OnReset =()=>{
            setSearchCoupon("")
           fetchData();
            //  setapicall(true)
            
             
              
         
            
           
           
        }

          const submitHandler=()=>{
       
            setapicall(true)
             fetchData()
           }
     

          //  console.log("get Coupon+++++"+JSON.stringify(getCoupon[0].total_order))
          //  console.log("get Coupon+++++"+JSON.stringify(getCoupon[0].amount))
          console.log("get Table====="+ JSON.stringify(tabledate))
          console.log("get Table++++"+ tabledate)
          console.log("couponError.message=====  "+ couponError);
          console.log("getCoupon====="+ getCoupon);
          console.log("getCoupon====="+JSON.stringify( getCoupon));



    return (
        <div>
            <h2>Coupon Report</h2>
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
            {/* discount order */}
            <div className="card p-2 col-6 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <GiStorkDelivery className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Discounted Orders </h5>
              </div>
              <div className="row mt-3 px-2">

                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  
                  {(couponError)=="no_data"||(getCoupon.total_order)==null || (getCoupon.total_order)==undefined?<h3>No Record</h3>: <h3>{getCoupon.total_order}</h3>}

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
            {/* amt */}
            <div className="card p-2 col-6 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiMoneyStack className="text-success h1 mx-2" />
                <h5 className="text-success">Amount </h5>
              </div>
              <div className="row mt-3 px-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                
                  {console.log("get coupon Ammount"+getCoupon.amount)}
                        {(couponError)=="no_data"||(getCoupon.amount)==null || (getCoupon.amount)==undefined || (getCoupon.amount)==""?<h3>No Record</h3>: <h3>{getCoupon.amount}</h3>}
                
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
{/* amt end */}

</div>
</div>
{/*  */}

{/* graph */}
<HighchartsReact highcharts={Highcharts} options={options}  />

{/*  */}

  {/* datatable */}
  <div className="row justify-content-end py-2">
<div className="col-md-3 col-sm-6">
        <Form.Group className="mb-3">        
            <Form.Control type="text" placeholder="Search by name"   onChange={ProductChange}  value={searchCoupon}/>
            </Form.Group>
            </div>

            <div className="col-md-auto col-sm-6">
        <MainButton btntext={"Search"} btnclass={'button main_button'} onClick={submitHandler} />

        
       
        </div>
        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Reset"} btnclass={'button main_button'}  onClick={OnReset}/>
        </div>
        </div>
      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={tabledate}
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body couponreport_table"}
      />

</div>

 
        </div>
    );
}

export default CouponReport;
