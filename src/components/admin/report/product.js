import React, { useEffect, useState } from "react";
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
import axios from "axios";
import moment from "moment/moment";

const ProductReport = () => {
  
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
        name: "Item Sold",
        data: [1, 2, 1, 4, 3, 6, 9, 4, 1, 8, 3, 5],
      },
      {
        name: "Net Sales",
        data: [1, 3, 1, 3, 2, 5, 1, 4, 1, 8, 3, 5],
      },
      {
        name: "Orders",
        data: [2, 1, 6, 7, 4, 6, 2, 4, 1, 8, 3, 5],
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
      name: "Sku",
      selector: (row) => row.product_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
      width: "160px",
    },

    {
      name: "Item Sold",
      selector: (row) => row.product_name,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Category",
      selector: (row) => row.category_name,
      sortable: true,
      width: "190px",
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
      name: "Orders",
      selector: (row) => row.order_count,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Stock",
      selector: (row) => row.product_count,
      sortable: true,
      width: "140px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Status",
      selector: (row) => row.product_count,
      sortable: true,
      width: "100px",
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
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Light House Device Bag</p>,
  //     isold: "45",
  //     stock: "25",
  //     category: <p className="reviewdesc"> Decoration Decoration </p>,
  //     order: "120",
  //   },
  //   {
  //     id: 2,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Light House Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     status: "$14",
  //     stock: "25",
  //   },
  //   {
  //     id: 1,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Light House Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  //   {
  //     id: 2,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Solo Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  //   {
  //     id: 1,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Solo Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  //   {
  //     id: 2,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Solo Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  //   {
  //     id: 1,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Solo Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  //   {
  //     id: 2,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Solo Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  //   {
  //     id: 1,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Solo Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  //   {
  //     id: 2,
  //     net: "$250",
  //     sku: "256143",
  //     pname: <p className="reviewdesc">Solo Device Bag</p>,
  //     isold: "45",
  //     category: "Backpacks",
  //     order: "120",
  //     stock: "25",
  //     status: "$14",
  //   },
  // ];
  const [filterchange,setFilterchange] = useState('')

  const [getProduct, setGetProduct]= useState([])
  const [tableProduct, setGetTableProduct]= useState([])

  const [fromDate, setFromDate]=useState(moment().format("YYYY-MM-DD"));
  const [toDate,setToDate]=useState(moment().format("YYYY-MM-DD"))
  const [apicall,setapicall]=useState(false)

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
   if(value===3){
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
    console.log( "to_date---"+toDate)

    axios.post(`${process.env.REACT_APP_BASEURL}/products_report`
    ,
    {
      "from_date":fromDate,
      "to_date":toDate,
      "products_search":""
  }
    ).then((response) => {
         console.log('product data-all---'+JSON.stringify(response.data))
         console.log('product data [0] [0]--'+JSON.stringify(response.data[0][0]))
        console.log('revenue data'+JSON.stringify(response.data[1]))
      //  console.log('product data [1] [0]---'+JSON.stringify(response.data[1][0]))
      //  console.log('product data [1] [1]---'+JSON.stringify(response.data[1][1]))
      //  console.log('product data [1] [2]---'+JSON.stringify(response.data[1][2]))
         setGetProduct(response.data[0][0])
         setGetTableProduct(response.data[1])
          // console.log("get Product"+getProduct)
    }).catch(function (error) {
      console.log(error);
    });

  }

          useEffect(() => {

          fetchData();
    
           
          }, [apicall]);

          
      const submitHandler=()=>{
       
        setapicall(true)
         fetchData()
       }
            

  return (
    <div>
      <h2>Product Report</h2>
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
              <option>Search by category</option>
              <option name="today" value={1}>Today</option>
              <option name="yesterday" value={2}>yesterday</option>
              <option name="last_week" value={3}>Last week</option>
              <option name="last_month" value={4}>last month</option>
              <option name="last_6_month" value={5}>last 6  month</option>
              {/* <option value="6">custom month</option> */}
              <option value="7">custom date</option>

            </Form.Select>
          </div>
          {filterchange==='7'?
          <>
      <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} plchldr={"Search by date"} onChange={(e)=>{setFromDate(e.target.value)}} className={'adminsideinput'} />
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <input type={"date"} plchldr={"Search by date"}onChange={(e)=>{setToDate(e.target.value)}} className={'adminsideinput'}/> 
        </div>
        </>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
        </div> : null}

        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} onClick={submitHandler}  />
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
                      <h3>
                        
                        { (getProduct.product_count)==null? <h3>No Record</h3>:  <h3>{getProduct.product_count}</h3> }  
                        </h3>
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
                    { (getProduct.net_sales)==null? <h3>No Record</h3>:  <h3>{getProduct.net_sales}</h3> }  
                     
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
                     
                      { (getProduct.order_count)==null? <h3>No Record</h3>:  <h3>{getProduct.order_count}</h3> }  
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
          </div>
        </div>
        {/*  */}

        {/* graph */}
        <HighchartsReact highcharts={Highcharts} options={options} />

        {/*  */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={tableProduct}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body productreport_table"}
        />
      </div>
    </div>
  );
};

export default ProductReport;
