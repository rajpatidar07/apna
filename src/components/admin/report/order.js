import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import {
    BsBagPlus,
    BsFileBarGraph,
  } from "react-icons/bs";
import {AiOutlineArrowRight}  from "react-icons/ai";
import {GiTakeMyMoney,GiStorkDelivery}  from "react-icons/gi";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const OrderReport
 = () => {
  const [filterchange,setFilterchange] = useState('')
  const TimeChange = (e)=>{
    setFilterchange(e.target.value)
          }
    const options = {
        chart: {
          type: 'line',
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

            name:"Orders",
            data: [1, 2, 1, 4, 3, 6,9,4,1,8,3,5]
          },
          {
            name:"Net Revenue",
            data: [1, 3, 1, 3, 2, 5,1,4,1,8,3,5]
          },
          {
            name:"Average Order Value",
            data: [2, 1, 6, 7, 4, 6,2,4,1,8,3,5]
          },
          {
            name:"Average Items Per Order",
            data: [1, 9, 1, 8, 1, 5,7,4,1,8,3,5]
          }
        ],
        xAxis: {
            categories: ['1', '3', '5', '7', '9', '11', '13', '15',
                '17', '19', '21', '23']
        },
        yAxis: {
          categories: ['0', '200', '400', '600', '800', '1000']
      },
      };
    const columns = [
        {
          name: "Date",
          selector: (row) => (
              row.sku
          ),
          sortable: true,
          width: "170px",
          center: true,
        },
        
        {
          name: "Order",
          selector: (row) => row.Order,
          sortable: true,
          width: "170px",
        },
        {
          name: "Status",
          selector: (row) => row.Status,
          sortable: true,
          width: "170px",
        },
        {
          name: "Customer",
          selector: (row) => row.Customer,
          sortable: true,
          width: "150px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
      
        {
          name: "Product(s)",
          selector: (row) => row.Product,
          sortable: true,
          width: "150px",
          center: true,
          style: {
            paddingRight: "32px",
            paddingLeft: "0px",
          },
        },
        {
          name: "Item Sold",
          selector: (row) => row.isold,
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
            selector: (row) => row.net,
            sortable: true,
            width: "150px",
            center: true,
            style: {
              paddingRight: "32px",
              paddingLeft: "0px",
            },
          },
        
       
      ];
      
      const data = [
        {
          id: 1,
          sku: "23 Sep,2022",
          Order: "$1,485.73",
          Status:"$0.00",
          Customer: "$14",
          Product: "$1,009.00",
          isold: "$476.73",
        net: "$476.73",
        },
        {
          id: 2,
          sku: "23 Sep,2022",
          Order:"$361.00",
          Status: "$0.00",
          Customer: "$14",
          Product: "$1,009.00",
          isold: "$476.73",
        net: "$476.73",
        },
        {
            id: 1,
            sku: "23 Sep,2022",
            Order: "$1,485.73",
            Status:"$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            Order:"$361.00",
            Status: "$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
          },{
            id: 1,
            sku: "23 Sep,2022",
            Order: "$1,485.73",
            Status:"$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            Order:"$361.00",
            Status: "$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
          },{
            id: 1,
            sku: "23 Sep,2022",
            Order: "$1,485.73",
            Status:"$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            Order:"$361.00",
            Status: "$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
          },{
            id: 1,
            sku: "23 Sep,2022",
            Order: "$1,485.73",
            Status:"$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            Order:"$361.00",
            Status: "$0.00",
            Customer: "$14",
            Product: "$1,009.00",
            isold: "$476.73",
            net: "$476.73",
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
              <option>Search by category</option>
              <option value="1">1 day</option>
              <option value="2">1 week</option>
              <option value="3">current month</option>
              <option value="4">last month</option>
              <option value="5">last 6  month</option>
              <option value="6">custom month</option>
              <option value="7">custom date</option>

            </Form.Select>
          </div>
          {filterchange==='7'?
          <>
      <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        </>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
        </div> : null}
        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'} />
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
                    <h3>2,356</h3>
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
                    <h3>2,356</h3>
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
                    <h3>2,356</h3>
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
                    <h3>2,356</h3>
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
<HighchartsReact highcharts={Highcharts} options={options}  />

{/*  */}


      {/* datatable */}
   
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body orderreport_table"}
      />

</div>

   
        </div>
    );
}

export default OrderReport
;
