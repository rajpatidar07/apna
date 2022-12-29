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
import Select from 'react-select'




const RevenueReport = () => {

  
 
  const [filterchange,setFilterchange] = useState('')

  const [getRevenue, setGetRevenue]= useState([])

  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [tabledate, setTabledata]=useState([]) 
   const [RevenueError,setRevenueError]=useState("")
   const [venderList,setVenderList]=useState([])
   const[vendorId,setVendorId]=useState("")
   const[category,setCategory]=useState([])
   const[categoryId,setCategoryId]=useState("")
   const [brand,setBrand]=useState([])
   const[brandName,setBrandName]=useState([])
   const[location,setLocation]=useState([])

  var GrossAmmount=[];
  var totalSales=[];
  var totalGSt=[];
  var TotalShipping=[];
  var NetSales=[];
  var Discount=[]

  // var Refund=[]

  // const [fromDate, setFrom]



  // const [option,setOption]=useState(
  //   {
  
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
  //   labels: []  ,
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: ''
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
  // }
  // )


//   const [series,setSeries]=useState([
 
//    {
//     name: 'TEAM B',
//     type: 'area',
//     data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//   }, 
//   {
//     name: 'TEAM C',
//     type: 'line',
//     data: [30, 25, 36, 30, 70, 35, 64, 52, 45, 36, 39]
//   },

//   {
//     name: 'TEAM D',
//     type: 'line',
//     data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//   }

// ])
 


// setSeries([
 
//   {
//    name: 'TEAM B',
//    type: 'area',
//    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
//  }, 
//  {
//    name: 'TEAM C',
//    type: 'line',
//    data: GrossAmmount
//  },

//  {
//    name: 'TEAM D',
//    type: 'line',
//    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
//  }

// ])





  // setOption( {
  
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
  //   labels: GrossAmmount,
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     type: 'value'
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




    const options = {
        chart: {
          type: 'spline',
          borderRadius:'5',
          borderColor:'#335cad'
        },
        title: {
            text: ' Figures',
            style:{ "color": "green", "fontSize": "22px" },
            align:"left"
          },
        series: [
          {
            name:"Gross Revenue",
            data:GrossAmmount
          },
     
          {
            name:"Discount",
            data:Discount
          },
          {
            name:"Taxes",
            data: totalGSt
          },
          {
            name:"Net Revenue",
            data:NetSales
          },
          {
            name:"shipping",
            data:TotalShipping
          }

         
        ],
        xAxis: {
            categories:GrossAmmount
        },
        yAxis: { 
          
          categories:totalSales
      },
      };


/////////////////////////////////////////////////New Apexchart //////////////////////////////////////////////

// var  Chartoptions = {
//   series: [
//   {
//     name: "High - 2013",
//     data: [28, 29, 33, 36, 32, 32, 33]
//   },
//   {
//     name: "Low - 2013",
//     data: [12, 11, 14, 18, 17, 13, 13]
//   }
// ],
//   chart: {
//   height: 350,
//   type: 'line',
//   dropShadow: {
//     enabled: true,
//     color: '#000',
//     top: 18,
//     left: 7,
//     blur: 10,
//     opacity: 0.2
//   },
//   toolbar: {
//     show: false
//   }
// },
// colors: ['#77B6EA', '#545454'],
// dataLabels: {
//   enabled: true,
// },
// stroke: {
//   curve: 'smooth'
// },
// title: {
//   text: 'Average High & Low Temperature',
//   align: 'left'
// },
// grid: {
//   borderColor: '#e7e7e7',
//   row: {
//     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//     opacity: 0.5
//   },
// },
// markers: {
//   size: 1
// },
// xaxis: {
//   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
//   title: {
//     text: 'Month'
//   }
// },
// yaxis: {
//   title: {
//     text: 'Temperature'
//   },
//   min: 5,
//   max: 40
// },
// legend: {
//   position: 'top',
//   horizontalAlign: 'right',
//   floating: true,
//   offsetY: -25,
//   offsetX: -5
// }
// };

const optionss = {
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
      name:" Total Revenue",
      data:[getRevenue.gross_total_amount]
    },
    
    {
      name:"Discount Ammont",
      data:[getRevenue.discount_amount]
    },
    {
      name:" Return Total",
      data:[getRevenue.return_total]
    },
    {
      name:"Taxes",
      data:[getRevenue.total_gst]
    },

    {
      name:"Total Shopping Charge",
      data:[getRevenue.total_shipping_charges]
    }
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
          selector: (row) => (
              row.uniquedates
          ),
          sortable: true,
          width: "170px",
          center: true,
        }
        ,
         
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

   fetchData()
      }

      
      const fetchData=()=>{
        console.log( "from_date---"+fromDate)
        console.log( "to_date----"+toDate)
        console.log( "brand----"+brandName)
        console.log( "locations by name----"+location)


       
          axios.post(`${process.env.REACT_APP_BASEURL}/revenue`
        ,
        
         {
           "from_date":fromDate,
              "to_date":toDate,
              "vendors_id":vendorId,
              "categorys":categoryId,
              "user_locations":location,
              "brand":brandName
        }
        ).then((response) => {
            // console.log('revenue data'+JSON.stringify(response.data))
            // console.log(" revenue error"+JSON.stringify(response))


                
            if(response.data.message=="no_data"){
              setRevenueError(response.data.message)
              
                setGetRevenue([0])
              setTabledata([])
       
            }
            else{


              setRevenueError('')
               setGetRevenue(response.data[0])
              setTabledata(response.data[0].ravenue_date_data)
             
           
            }
       

          

         
        }).catch(function (error) {
          console.log(error);
          
        });
       } 

       const VenderData= async()=>{
          let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/vendors?id=all`)
           console.log("vendor----"+JSON.stringify(result.data))
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

       console.log("Brand data-----"+ JSON.stringify(result.data))
      if(result.data){
        setBrand(result.data)
      }
      
   }

      

       


       


      useEffect(() => {
    
    
        fetchData();
        VenderData();
        CategoryData();
        BrandData();
    
       
      }, [ apicall]);
        
      


 

      const submitHandler=()=>{
       
       setapicall(true)
        fetchData()
      }





      // console.log("get revenue------"+JSON.stringify(getRevenue))
      // console.log("data====="+ JSON.stringify(tabledate))
      


      


  

     tabledate.map((item)=>{

      GrossAmmount.push(item.gross_amount)
      totalSales.push(item.total_sales)
      totalGSt.push(item.total_gst)
       TotalShipping.push(item.total_shipping_charges)
       NetSales.push(item.net_sales)
       Discount.push(item.discount)

     })

   

 
    //  console.log("gross ammount ------"+GrossAmmount)
    //  console.log("total sales ------"+ totalSales)
    //  console.log("total GST ------"+ totalGSt)
    //  console.log("total Shipping ------"+ TotalShipping)
    //  console.log("net Sales ------"+ NetSales)
    //  console.log("Discount ------"+ Discount)
   
  // console.log("categoryList--"+ category)
     
       
 
    // brand.map((item)=>{

    //   const optionsBrand = [
    //     { value: `${item.brand}` },
  
    //   ]
    // })

    
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

    return (
        <div>
              <h2>Revenue Report</h2>
              {/* search bar */}
      <div className="card mt-3 p-3 ">
      <div className="row pb-3">
      <div className="col-md-3 col-sm-6   aos_input">
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


            <div className="col-md-3 col-sm-6 aos_input">
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
         
          <div>
             
      <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'} max={moment().format('YYYY-MM-DD')} />
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'} max={moment().format('YYYY-MM-DD')}/>
        </div>
        </div>
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
                  { (RevenueError)=="no_data"||(getRevenue.gross_total_amount)==null||(getRevenue.gross_total_amount)==undefined||(getRevenue.gross_total_amount)==""? <h3>No Record</h3>:  <h3>{getRevenue.gross_total_amount}</h3> }  
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
                <h5 className="text-success">Discount Ammount </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.discount_amount)==null||(getRevenue.discount_amount)==undefined||(getRevenue.discount_amount)==""? <h3>No Record</h3>:  <h3>{getRevenue.discount_amount}</h3> }  
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
                <h5 className="text-success">Return Total</h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                  { (RevenueError)=="no_data"||(getRevenue.return_total)==null||(getRevenue.return_total)==undefined||(getRevenue.return_total)==""? <h3>No Record</h3>:  <h3>{getRevenue.return_total}</h3> }  
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
                  { (RevenueError)=="no_data"||(getRevenue.total_gst)==null||(getRevenue.total_gst)==undefined||(getRevenue.total_gst)==""? <h3>No Record</h3>:  <h3>{getRevenue.total_gst}</h3> }  
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
                  { (RevenueError)=="no_data"||(getRevenue.total_shipping_charges)==null||(getRevenue.total_shipping_charges)==undefined||(getRevenue.total_shipping_charges)==""? <h3>No Record</h3>:  <h3>{getRevenue.total_shipping_charges}</h3> }  
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
        


{/*  */}
</div>
</div>
{/*  */}

{/* graph */}
{(getRevenue.gross_total_amount)||(getRevenue.discount_amount)||(getRevenue.return_total)||(getRevenue.total_gst)?<HighchartsReact highcharts={Highcharts} options={optionss}  />:null}

{(getRevenue.gross_total_amount)||(getRevenue.discount_amount)||(getRevenue.return_total)||(getRevenue.total_gst)?<HighchartsReact highcharts={Highcharts} options={options}  />:null}
{/* <div id="chart">
  <ReactApexChart options={option} series={series} type="line" height={350} />
</div> */}





{/*  */}


      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={tabledate }
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
