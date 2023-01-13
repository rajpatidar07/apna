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
import Select from 'react-select'
import jsPDF from "jspdf";
import "jspdf-autotable";
import { downloadExcel } from "react-export-table-to-excel";

const OrderReport = () => {
  
  const [filterchange, setFilterchange] = useState("");
 
  const [ordersreport, setordersreport] = useState([])
  const [Prevordersreport, setPrevordersreport] = useState([])

  const [orderTable, setorderTable] = useState([])
  const[previousStateChange,setpreviousStateChange] =useState(' ')
  const[prevFromdate,setprevFromdate]=useState(moment().subtract(1, 'days').startOf('days').format('YYYY-MM-DD'))
  const[prevTodate,setprevTodate]=useState(moment().subtract(1, 'days').startOf('days').format('YYYY-MM-DD'))
  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [OrderError,setOrderError]=useState("")
  const [venderList,setVenderList]=useState([])
  const[vendorId,setVendorId]=useState("")
  const[category,setCategory]=useState([])
  const[categoryId,setCategoryId]=useState("")
  const [brand,setBrand]=useState([])
  const[brandName,setBrandName]=useState([])
  const[location,setLocation]=useState([])

   const fetchData=()=>{
    console.log( "from_date------------------------------------"+fromDate)
        console.log( "to_date---------------------------------------"+toDate)
    console.log( "Previous  Todate---------------------------------------"+prevTodate)
    console.log( "Previous fromdate---------------------------------------"+prevFromdate)
    axios.post(`${process.env.REACT_APP_BASEURL}/orders_report`, 
    {
      from_date:fromDate,
      to_date:toDate,
      "prev_from_date":prevFromdate,
      "prev_to_date":prevTodate,
      vendors_id:vendorId,
      categorys:categoryId,
      user_locations:location,
      brand:brandName
    }).then((response) => {
     
       console.log("Order data----"+ JSON.stringify(response.data[0]))
       console.log("Order previous data----"+ JSON.stringify(response.data[1]))
       console.log("Order Table data---"+ JSON.stringify(response.data[2]))
      //  console.log('Error-----'+JSON.stringify(response.data))


       if(response.data.message=="No_Data"){

        setOrderError(response.data.message)
        setordersreport([0])
        setorderTable([0])
        setPrevordersreport([0])

      }
      else{
        setOrderError("")
        
        setordersreport(response.data[0][0])
        setPrevordersreport(response.data[1][0])
        setorderTable(response.data[2])
        setapicall(false)
      }

    }).catch(function (error) {
      console.log(error);
    });
   }




   const VenderData= async()=>{
    let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/vendors?id=all`)
    //  console.log("vendor----"+JSON.stringify(result.data))
    if(result.data){
      setVenderList(result.data)
    }
    
 }


 const CategoryData= async()=>{
  let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/category?category=all`)
  // console.log(result.data)
  if(result.data){
    setCategory(result.data)
  }
  
}


const BrandData= async()=>{
let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/brand_list`)

//  console.log("Brand data-----"+ JSON.stringify(result.data))
if(result.data){
  setBrand(result.data)
}

}





  useEffect(() => {
     fetchData()
     VenderData();
     CategoryData();
     BrandData();
  }, [apicall]);



  const TimeChange = (e) => {
    setFilterchange(e.target.value);
    let value = e.target.value;
    console.log("---------------------------------------------"+value);
    //today---------------------------------------------------------------------------
    if(value==1){
      let frommDate=moment().format("YYYY-MM-DD")
      setFromDate(frommDate)
      // console.log("From date"+e.target.value)
      // console.log("today")
      setToDate(moment().format("YYYY-MM-DD"))
      let previousTodate=moment(frommDate).subtract(1, 'days').startOf('days').format("YYYY-MM-DD")
      setprevTodate(previousTodate)
      setprevFromdate(previousTodate)
      // console.log("previous day"+ prevDate)
      setpreviousStateChange(1)
    }
        //yesterday------------------------------------------------------------------------
    if(value==2){
      let yesterday=moment().subtract(1, 'days').startOf('days').format("YYYY-MM-DD")
      
      setFromDate(yesterday);
      setToDate( moment().format("YYYY-MM-DD"));
     
      let previousTodatee=moment(yesterday).subtract(1, 'days').startOf('days').format("YYYY-MM-DD")
      setprevTodate(previousTodatee)
      setprevFromdate(moment(previousTodatee).subtract(1, 'days').startOf('days').format("YYYY-MM-DD"))
      setpreviousStateChange(2)

    }
    //last week---------------------------------------------------------------
   if(value==3){
       let lastweek= moment().subtract(1, 'weeks').startOf('weeks').format('YYYY-MM-DD')
      setFromDate(lastweek);
    
      setToDate(moment().subtract(1,'weeks').endOf('weeks').format('YYYY-MM-DD'));
      let previouslastweek=moment(lastweek).subtract(1,'days').endOf('days').format('YYYY-MM-DD')
       setprevTodate(previouslastweek)
       setprevFromdate(moment(previouslastweek).subtract(1,'weeks').endOf('weeks').format('YYYY-MM-DD'))
       setpreviousStateChange(3)

   
   }
         //last month---------------------------------------------------------------
   if(value==4){
   
   let month=moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
    setFromDate(month);
    let lastMonth=moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
    setToDate(lastMonth);
    let previouslastmont=moment(lastMonth).subtract(1, 'days').startOf('days').format('YYYY-MM-DD')
    setprevTodate(previouslastmont);
    setprevFromdate(moment(previouslastmont).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'))
    // setPrevDate(moment(month).subtract(1, 'month').startOf('month').format('YYYY-MM-DD'))
    // console.log("previou month-"+prevDate)
    setpreviousStateChange(4)
 }
//  last six month---------------------------------------------------------
 if(value==5){
  
  let sixMonth=moment().subtract(6, 'month').startOf('month').format('YYYY-MM-DD')
  setFromDate(sixMonth );
  setToDate(moment().format("YYYY-MM-DD") );
  let lastsixMonth=moment(sixMonth).subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
  setprevTodate(lastsixMonth);
  setprevFromdate(moment(lastsixMonth).subtract(5, 'month').startOf('month').format('YYYY-MM-DD'))
  // setPrevDate(moment(sixMonth).subtract(6, 'month').startOf('month').format('YYYY-MM-DD'))
  // console.log("previou 6 month-"+prevDate)
  setpreviousStateChange(5)
}

//this week-----------------------------------------------------------------------
if(value==8){
  
let ThisWeek=moment().startOf('weeks').format('YYYY-MM-DD')
setFromDate(ThisWeek);
// console.log("From last 6 month"+ThisWeek)
setToDate( moment().format("YYYY-MM-DD") );
let previousthisweek=moment(ThisWeek).subtract(1,'days').endOf('days').format('YYYY-MM-DD')
setprevTodate(previousthisweek)
setprevFromdate(moment(previousthisweek).subtract(1,'weeks').endOf('weeks').format('YYYY-MM-DD'))
// setPrevDate(moment(ThisWeek).subtract(1, 'weeks').endOf('weeks').format('YYYY-MM-DD'))
setpreviousStateChange(8)
  
}
if(value==9){
  
let ThisMonth=moment().startOf('month').format('YYYY-MM-DD')
setFromDate(ThisMonth);
// console.log("From last 6 month"+ThisMonth)
setToDate( moment().format("YYYY-MM-DD") );
let previousthismont=moment(ThisMonth).subtract(1, 'days').startOf('days').format('YYYY-MM-DD')
setprevTodate(previousthismont);
setprevFromdate(moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'))
setpreviousStateChange(9)
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



     //----------------------------------------------------------------- pdf----------------------------------------------------->
  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;


    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Order Report";
    const headers = [["Date", "Order ID","Status","Customer ID", "Product ID","Net Revenue"]];

    const data =orderTable.map(elt=> [elt.created_on, elt.order_id, elt.status,elt.user_id, elt.p_id,elt.total_order_amount]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    // doc.text(headers, backgroundColor, "pink");
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("Order Report.pdf")
    // doc.setFillColor("Gray" ,100)
  }

  //-------------------------------------------- end pdf----------------------------------------------------------------->






 //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
 const header = ["Order ID","Date" ,"Status","Customer ID", "Product ID","Net Revenue"];

function handleDownloadExcel() {
  downloadExcel({
    fileName: "Order Report -> downloadExcel method",
    sheet: "Order Report",
    tablePayload: {
       header,
      // accept two different data structures
      body: orderTable ,
    },
  });
}
 //----------------------------------------------------+++=++++++ excel--------------------------------------------------->
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


console.log("dd"+orderTable)

const options1 = [
  brand.map((item)=>(
    { value: `${item.brand}` ,label:`${item.brand}` }
  ))
]

let  arrr=[];

const brandHandler=(e)=>{

 arrr=[]
  e.map((item)=>{
   
  arrr.push(item.value)
  
  })
  setBrandName(arrr)
 
 }



//  console.log("$$$$$$------"+JSON.stringify(brandName[0]))
const options2 = [
  venderList.map((item)=>(
    { value: `${item.id}` ,label:`${item.shop_name}` }
  ))
]

 let  vendorArray=[];

 const VendorHandler=(e)=>{

  vendorArray=[]
   e.map((item)=>{
    
   vendorArray.push(item.value)
   
   })
   setVendorId(vendorArray)
  
  }

console.log("$$$$$$------"+JSON.stringify(vendorId[0]))

 
const options3 = [
  category.map((item)=>(
    { value: `${item.id}` ,label:`${item.category_name}` }
  ))
]


let  CategoryArray=[];

const categoryHandler=(e)=>{

 CategoryArray=[]
  e.map((item)=>{
   
  CategoryArray.push(item.value)
  
  })
  setCategoryId(CategoryArray)
 
 }




  
 const options4 = [

  { value: "indore" ,label:"Indore" },
  { value: "bhopal" ,label:"Bhopal" },
  { value: "dhar" ,label:"Dhar" },
  { value: "khandwa" ,label:"Khandwa" },
  { value: "khargone" ,label:"Khargone" },

]
var  SearchArray=[]
const SearchHandler=(e)=>{

SearchArray=[]
 e.map((item)=>{
  
  SearchArray.push(item.value)
 
 })
 setLocation(SearchArray)

}

// //-------------order---------------------------
var getorderCount=Number(ordersreport.order_count)
var getPreviousorderCount=Number(Prevordersreport.prev_order_count)
var resultCount=(((getorderCount-getPreviousorderCount)/getPreviousorderCount)*100).toFixed(2)
console.log("result Ordr------"+resultCount)
resultCount!="Infinity"?console.log("resultCount"):resultCount=0

// //-----------------------Avg order --------------------------------------------------------
var getorderAvg=Number(ordersreport.avg_order_value)
var getPreviousorderAvg=Number(Prevordersreport.prev_avg_order_value)
var resultAVG=(((getorderAvg-getPreviousorderAvg)/getPreviousorderAvg)*100).toFixed(2)
console.log("result Avg ordder------"+resultAVG)
resultAVG!="Infinity"?console.log():resultAVG=0

// //-----------------------Avg item order count---------------------------------------

var getorderAvgItem=Number(ordersreport.avg_item_per_order)
var getPreviousorderAvgItem=Number(Prevordersreport.prev_avg_item_per_order)
var resultAVGITEM=(((getorderAvgItem-getPreviousorderAvgItem)/getPreviousorderAvgItem)*100).toFixed(2)
console.log("result avg order count------"+resultAVGITEM)
resultAVGITEM!="Infinity"?console.log():resultAVGITEM=0

//  //--------------------Nets sales------------------------------------------

var getNetSales=Number(ordersreport.net_sales)
var getPreviouNetSales=Number(Prevordersreport.prev_net_sales)
var resultNetSales=(((getNetSales-getPreviouNetSales)/getPreviouNetSales)*100).toFixed(2)
console.log("result Net sales------"+resultNetSales)
resultNetSales!="Infinity"?console.log():resultNetSales=0


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
              <option name="this_week" value={8}>this  week</option>
              <option name="last_week" value={3}>Last week</option>
              <option name="this_week" value={9}>This  month</option>
              <option name="last_month" value={4}>last month</option>
              <option name="last_6_month" value={5}>last 6  month</option>
              {/* <option name="custom_month" value="6">custom month</option> */}
              <option name="custom_date" value="7">custom date</option>

            </Form.Select>
            </div>

            <div className="col-md-3 col-sm-6 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Vendor"
              onChange={VendorHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options2[0]} 
            />
            
            </div>


            <div className="col-md-3 col-sm-6 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Brand"
              onChange={brandHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options1[0]} 
            />
         
            </div>

            <div className="col-md-3 col-sm-6 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Category"
              onChange={categoryHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options3[0]} 
            />
         
            </div>

            <div className="col-md-3 col-sm-6 mt-3 aos_input">
            <Select
      
              className=" basic-multi-select"
              placeholder="Search by Location"
              onChange={SearchHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options4} 
            />
         
            </div>

           
          {filterchange==='7'?
       
             <div className="col-md-3 col-sm-6 d-flex mt-3 aos_input">
      <div className="col-6  pe-2 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'}max={moment().format("YYYY-MM-DD")}/>
        </div>
        
        <div className="col-6 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'}max={moment().format("YYYY-MM-DD")}/>
        </div>
        </div>
    
        :filterchange==='6'? <div className="col-md-3 col-sm-6 mt-3 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
       
        </div> : null}
        
        
        <div className="col-md-auto col-sm-6 mt-3 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} onClick={submitHandler} />
        </div>
       

          <div className="col-md-auto col-sm-6 mt-3 aos_input">
            <DropdownButton
              id="dropdown-variant-success"
              title="Download"
              variant="button main_button"
            >
            <Dropdown.Item onClick={handleDownloadExcel}>Excel</Dropdown.Item>
             <Dropdown.Item onClick={()=>exportPDF()}>Pdf</Dropdown.Item>
           
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

                    {(OrderError)=="No_Data"||(ordersreport.order_count)==null || (ordersreport.order_count)==undefined  || (ordersreport.order_count)==""?<h3>0</h3>: <h3>{ordersreport.order_count}</h3>}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                     
                        {(resultCount>0)?<p className="mb-0 h5" style={{color:"green"}}> {resultCount}%</p>:(resultCount<0)?<p className="mb-0 h5" style={{color:"red"}}> {resultCount}%</p>:(resultCount==0)?<p className="mb-0 h5" style={{color:"blue"}}> {resultCount}%</p>:(resultCount=="NaN")?<p className="mb-0 h5" style={{color:"grey"}}> 0%</p>:<p className="mb-0 h5" style={{color:"brown"}}> {resultCount}%</p>}
                      </div>
                    </div>
                    <div>
                    {(previousStateChange==1)?<h5>Today :</h5>:(previousStateChange==2)?<h5>Previous Yesterday :</h5>:(previousStateChange==3)?<h5>Previous Last week :</h5>:(previousStateChange==4)?<h5>Previous Last Month :</h5>:(previousStateChange==5)?<h5>Previous Last 6 Months:</h5>:(previousStateChange==8)?<h5>Previous  week :</h5>:(previousStateChange==9)?<h5>Previous  Month :</h5>:<h5>Today :</h5>}
                        
                        { (OrderError)=="no_data"||(Prevordersreport.prev_order_count)==null||(Prevordersreport.prev_order_count)==undefined||(Prevordersreport.prev_order_count)==""? <p className="h5"> 0</p>:  <p className="h5">{Prevordersreport.prev_order_count} </p>} 

                      
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
          
                    {(OrderError)=="No_Data"||(ordersreport.avg_order_value)==null || (ordersreport.avg_order_value)==undefined  || (ordersreport.avg_order_value)==""?<h3>0</h3>: <h3>{(ordersreport.avg_order_value).toFixed(2)}</h3>}
                      
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {(resultAVG>0)?<p className="mb-0 h5" style={{color:"green"}}> {resultAVG}%</p>:(resultAVG<0)?<p className="mb-0 h5" style={{color:"red"}}> {resultAVG}%</p>:(resultAVG==0)?<p className="mb-0 h5" style={{color:"blue"}}> {resultAVG}%</p>:(resultAVG=="NaN")?<p className="mb-0 h5" style={{color:"grey"}}> 0%</p>:<p className="mb-0 h5" style={{color:"brown"}}> {resultAVG}%</p>}

                      </div>
                    </div>
                    <div>
                    {(previousStateChange==1)?<h5>Today :</h5>:(previousStateChange==2)?<h5>Previous Yesterday :</h5>:(previousStateChange==3)?<h5>Previous Last week :</h5>:(previousStateChange==4)?<h5>Previous Last Month :</h5>:(previousStateChange==5)?<h5>Previous Last 6 Months:</h5>:(previousStateChange==8)?<h5>Previous  week :</h5>:(previousStateChange==9)?<h5>Previous  Month :</h5>:<h5>Today :</h5>}
                        
                        { (OrderError)=="no_data"||(Prevordersreport.prev_avg_order_value)==null||(Prevordersreport.prev_avg_order_value)==undefined||(Prevordersreport.prev_avg_order_value)==""? <p className="h5"> ₹0</p>:  <p className="h5">₹{(Prevordersreport.prev_avg_order_value).toFixed(2)} </p>} 
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
                 
              
                    {(OrderError)=="No_Data"||(ordersreport.avg_item_per_order)==null || (ordersreport.avg_item_per_order)==undefined  || (ordersreport.avg_item_per_order)==""?<h3>0</h3>: <h3>{(ordersreport.avg_item_per_order).toFixed(2)}</h3>}

                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />
                    
                        {(resultAVGITEM>0)?<p className="mb-0 h5" style={{color:"green"}}> {resultAVGITEM}%</p>:(resultAVGITEM<0)?<p className="mb-0 h5" style={{color:"red"}}> {resultAVGITEM}%</p>:(resultAVG==0)?<p className="mb-0 h5" style={{color:"blue"}}> {resultAVGITEM}%</p>:(resultAVGITEM=="NaN")?<p className="mb-0 h5" style={{color:"grey"}}> 0%</p>:<p className="mb-0 h5" style={{color:"brown"}}> {resultAVGITEM}%</p>}
                      </div>
                    </div>
                    <div>
                    {(previousStateChange==1)?<h5>Today :</h5>:(previousStateChange==2)?<h5>Previous Yesterday :</h5>:(previousStateChange==3)?<h5>Previous Last week :</h5>:(previousStateChange==4)?<h5>Previous Last Month :</h5>:(previousStateChange==5)?<h5>Previous Last 6 Months:</h5>:(previousStateChange==8)?<h5>Previous  week :</h5>:(previousStateChange==9)?<h5>Previous  Month :</h5>:<h5>Today :</h5>}
                        
                        { (OrderError)=="no_data"||(Prevordersreport.prev_avg_item_per_order)==null||(Prevordersreport.prev_avg_item_per_order)==undefined||(Prevordersreport.prev_avg_item_per_order)==""? <p className="h5"> 0</p>:  <p className="h5">{(Prevordersreport.prev_avg_item_per_order).toFixed(2)} </p>} 
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
                    {(OrderError)=="No_Data"||(ordersreport.net_sales)==null || (ordersreport.net_sales)==undefined  || (ordersreport.net_sales)==""?<h3>₹0</h3>: <h3>{(ordersreport.net_sales).toFixed(2)}</h3>}
               
                      <div className="d-flex align-items-center justify-content-center">
                        <AiOutlineArrowRight className="h5 mb-0 mx-2" />

                        {(resultNetSales>0)?<p className="mb-0 h5" style={{color:"green"}}> {resultNetSales}%</p>:(resultNetSales<0)?<p className="mb-0 h5" style={{color:"red"}}> {resultNetSales}%</p>:(resultAVG==0)?<p className="mb-0 h5" style={{color:"blue"}}> {resultNetSales}%</p>:(resultNetSales=="NaN")?<p className="mb-0 h5" style={{color:"grey"}}> 0%</p>:<p className="mb-0 h5" style={{color:"brown"}}> {resultNetSales}%</p>}
                      </div>

                    </div>
                    <div>
                    {(previousStateChange==1)?<h5>Today :</h5>:(previousStateChange==2)?<h5>Previous Yesterday :</h5>:(previousStateChange==3)?<h5>Previous Last week :</h5>:(previousStateChange==4)?<h5>Previous Last Month :</h5>:(previousStateChange==5)?<h5>Previous Last 6 Months:</h5>:(previousStateChange==8)?<h5>Previous  week :</h5>:(previousStateChange==9)?<h5>Previous  Month :</h5>:<h5>Today :</h5>}
                        
                        { (OrderError)=="no_data"||(Prevordersreport.prev_net_sales)==null||(Prevordersreport.prev_net_sales)==undefined||(Prevordersreport.prev_net_sales)==""? <p className="h5"> ₹0</p>:  <p className="h5">₹{(Prevordersreport.prev_net_sales).toFixed(2)} </p>} 
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
        {(ordersreport.order_count)||(ordersreport.avg_order_value)||(ordersreport.avg_item_per_order)||(ordersreport.net_sales)? <HighchartsReact highcharts={Highcharts} options={options} />:null}
       

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
