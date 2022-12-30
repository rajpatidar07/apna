import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import {
  BsBagPlus,
} from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiTakeMyMoney, GiSellCard } from "react-icons/gi";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import moment from "moment/moment";
import Select from 'react-select'
import axios from "axios";
import { useEffect } from "react";

const CategoryReport = () => {
  
  const [filterchange,setFilterchange] = useState('')
  const [Categoryreport, setCategoryreport] = useState([])
  const [apicall,setapicall]=useState(false)
  const [CategoryError,setCategoryError]=useState("")
 const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
 const[category,setCategory]=useState([])
  const[categoryId,setCategoryId]=useState("")



  const fetchData=()=>{
    axios.post(`${process.env.REACT_APP_BASEURL}/categories_report`, 
    {
      from_date:fromDate,
      to_date:toDate,
      parent_category:categoryId
  
    }).then((response) => {
     
       console.log("Category data Report ----"+ JSON.stringify(response.data[0]))
     
       console.log('Error-----'+JSON.stringify(response.data))


       if(response.data.message=="No_Data"){

        setCategoryError(response.data.message)
        setCategoryreport()


      }
      else{
        setCategoryError("")
        
        setCategoryreport(response.data[0])
      
        setapicall(false)
      }

    }).catch(function (error) {
      console.log(error);
    });
   }



   const CategoryData= async()=>{
    let result=  await axios.get(`${process.env.REACT_APP_BASEURL}/category?category=all`)
    // console.log(result.data)
    if(result.data){
      setCategory(result.data)
    }
    
  }
  

  useEffect(() => {
    fetchData()
  
    CategoryData();
   
 }, [apicall]);



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



 const submitHandler=()=>{
       
 setapicall(true)
 fetchData()
         
            
           }
        


 
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




           var itemSold= Categoryreport.total_sold_product_count
           var NetSales=Categoryreport.total_sold_product_amount
           var order=Categoryreport.order_count

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
                name: "Item Sold",
                data: [itemSold],
              },
              {
                name: "Net Sales",
                data: [NetSales],
              },
              {
                name: "Orders",
                data: [order],
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
              name: "Category",
              selector: (row) => row.category,
              sortable: true,
              width: "260px",
            },
            {
              name: "Item Sold",
              selector: (row) => row.isold,
              sortable: true,
              center: true,
            },
            {
              name: "Net Revenue",
              selector: (row) => row.net,
              sortable: true,
              
            },
        
            {
              name: "Orders",
              selector: (row) => row.order,
              sortable: true,
              
            },
            {
              name: "Products",
              selector: (row) => row.product,
              sortable: true,
             
            },
           
          ];
        
          // const data = [
          //   {
          //     id: 1,
          //     net: "$250",
          //     isold: "25",
          //     category: <p className="reviewdesc"> Decoration Decoration </p>,
          //     product: "120",
          //     order:"12"
          //   },
          //   {
          //     id: 2,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     products: "$14",
          //     isold: "25",
          //   },
          //   {
          //     id: 1,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
        
          //   },
          //   {
          //     id: 2,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
          //   },
          //   {
          //     id: 1,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
          //   },
          //   {
          //     id: 2,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
          //   },
          //   {
          //     id: 1,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
          //   },
          //   {
          //     id: 2,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
          //   },
          //   {
          //     id: 1,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
          //   },
          //   {
          //     id: 2,
          //     net: "$250",
          //     category: "Backpacks",
          //     order: "120",
          //     product: "25",
          //     isold: "25",
        
          //   },
          // ];
          
          
  return (
    <div>
      <h2>Category Report</h2>
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
              placeholder="Search by Category"
              onChange={categoryHandler}
             
              classNamePrefix="select"
              isMulti  
              options={options3[0]} 
            />
         
            </div>
          {filterchange==='7'?
                  
                  <div className="col-md-3 col-sm-6 aos_input d-flex">
             
                  <div className="col-6 aos_input pe-2">
                    <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'} max={moment().format("YYYY-MM-DD")}/>
                    </div>
                    
                    <div className="col-6">
                    <input type={"date"} placeholder={"Search by date"} onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'} max={moment().format("YYYY-MM-DD")}/>
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
           {/* item sold */}
           <div className="card py-2 px-4 col-4 rounded-left shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiSellCard className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Item Sold</h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                    {console.log("roroororo---"+CategoryError)}
                    {console.log("dataaaa-"+Categoryreport.total_sold_product_count)}
                    {(CategoryError)=="No_Data"||(Categoryreport.total_sold_product_count)==null || (Categoryreport.total_sold_product_count)==undefined  || (Categoryreport.total_sold_product_count)==""?<h3>No Record</h3>: <h3>{Categoryreport.total_sold_product_count}</h3>}

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
            {/* net */}
            <div className="card py-2 px-4 col-4 rounded-0 shadow-none">
              <div className=" d-flex mt-0 align-items-center">
                <GiTakeMyMoney className="text-success h1 mx-2" />
                <h5 className="text-success">Net Sales </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                    {(CategoryError)=="No_Data"||(Categoryreport.total_sold_product_amount)==null || (Categoryreport.total_sold_product_amount)==undefined  || (Categoryreport.total_sold_product_amount)==""?<h3>No Record</h3>: <h3>{Categoryreport.total_sold_product_amount}</h3>}
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
            {/* net end */}
            {/* order */}
            <div className="card py-2 px-4 col-4 rounded-right shadow-none">
              <div className=" d-flex mt-0 align-items-end">
                <BsBagPlus className="text-success h1 mb-0 mx-2" />
                <h5 className="text-success">Orders </h5>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="d-flex align-items-baseline justify-content-between">
                    {(CategoryError)=="No_Data"||(Categoryreport.order_count)==null || (Categoryreport.order_count)==undefined  || (Categoryreport.order_count)==""?<h3>No Record</h3>: <h3>{Categoryreport.order_count}</h3>}

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
        {(Categoryreport.total_sold_product_count)||(Categoryreport.total_sold_product_amount)||Categoryreport.order_count?   <HighchartsReact highcharts={Highcharts} options={options} />:null}
     

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          // data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body categoryreport_table"}
        />
      </div>
    </div>
  );
};

export default CategoryReport;
