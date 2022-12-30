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
import Select from 'react-select'

const CouponReport = () => {


  const [filterchange,setFilterchange] = useState('')

  
  const [getCoupon, setGetCoupon]= useState([])

  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)
  const [tabledate, setTabledata]=useState([])
  // const [searchCoupon, setSearchCoupon]=useState("")
  const [couponError,setCouponError]=useState("")
  const [venderList,setVenderList]=useState([])
  const[vendorId,setVendorId]=useState("")
  const[category,setCategory]=useState([])
  const[categoryId,setCategoryId]=useState("")
  const [brand,setBrand]=useState([])
  const[brandName,setBrandName]=useState([])
  const[location,setLocation]=useState([])




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
fetchData();
  }



          const fetchData=()=>{
            console.log( "from_date---"+fromDate)
            console.log( "to_date----"+toDate)
              axios.post(`${process.env.REACT_APP_BASEURL}/coupons_report`
            ,
             {
               "from_date":fromDate,
                  "to_date":toDate,
                  // "coupons_search":searchCoupon, 
                  vendors_id:vendorId,
                  categorys:categoryId,
                  user_locations:location,
                  brand:brandName
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
                    setapicall(false)
                    setGetCoupon(response.data[0])
                  setTabledata(response.data[1])
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
        
           
          }, [apicall]);
            

      

          const submitHandler=()=>{
       
            setapicall(true)
            fetchData();
            
           }
     

          //  console.log("get Coupon+++++"+JSON.stringify(getCoupon[0].total_order))
          //  console.log("get Coupon+++++"+JSON.stringify(getCoupon[0].amount))
          console.log("get Table====="+ JSON.stringify(tabledate))
          console.log("get Table++++"+ tabledate)
          console.log("couponError.message=====  "+ couponError);
          console.log("getCoupon====="+ getCoupon);
 
          console.log("getCoupon====="+JSON.stringify( getCoupon));



          var OrderCount=getCoupon.orders_count;
          var DiscountAmmount=getCoupon.discount_amount





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
                name: "Discounted Orders",
                data: [OrderCount],
              },
              {
                name: "Amount",
                data: [DiscountAmmount],
              },
              
            ],
            xAxis: {
              categories: [
              
              ],
            },
            yAxis: {
              categories: [],
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
             
      <div className="col-6 ps-2">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'} max={moment().format("YYYY-MM-DD")}/>
        </div>
        
        <div className="col-6 ps-2">
        <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'} max={moment().format("YYYY-MM-DD")}/>
        </div>
        </div>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
       
        </div> : null}
        
        
        <div className="col-md-auto col-sm-6 mt-3  aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} onClick={submitHandler} />
        </div>
       
        <div className="col-md-auto col-sm-6 mt-3 aos_input">
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
                  {console.log("********"+couponError)}
                  {console.log(" order===="+getCoupon.orders_count)}
                  {(couponError)=="no_data"||(getCoupon.orders_count)==null || (getCoupon.orders_count)==undefined?<h3>No Record</h3>: <h3>{getCoupon.orders_count}</h3>}

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
                
                           {console.log("********"+couponError)}
                           {console.log(" Ammount===="+getCoupon.discount_amount)}
                        {(couponError)=="no_data"||(getCoupon.discount_amount)==null || (getCoupon.discount_amount)==undefined || (getCoupon.discount_amount)==""?<h3>No Record</h3>: <h3>{getCoupon.discount_amount}</h3>}
                
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
