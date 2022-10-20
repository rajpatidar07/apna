import React, { useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import {
    BsBagPlus,
    BsBagX,
    BsBagCheck,
    BsBag,
    BsCashCoin,BsAlarm
  } from "react-icons/bs";
import { HiOutlineReceiptRefund,HiOutlineGift } from "react-icons/hi";
import {AiOutlineArrowRight}  from "react-icons/ai";
import {GiTakeMyMoney,GiPayMoney}  from "react-icons/gi";
import {MdOutlineLocalShipping}  from "react-icons/md";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const StockReport = () => {
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
            data: [1, 2, 1, 4, 3, 6,9,4,1,8,3,5]
          },
          {
            data: [1, 3, 1, 3, 2, 5,1,4,1,8,3,5]
          },
          {
            data: [2, 1, 6, 7, 4, 6,2,4,1,8,3,5]
          },
          {
            data: [1, 9, 1, 8, 1, 5,7,4,1,8,3,5]
          },{
            data: [1, 0, 5, 4, 3, 4,8,4,1,8,3,5]
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
          name: "Gross Revenue",
          selector: (row) => row.pname,
          sortable: true,
          width: "170px",
        },
        {
          name: "Refunds",
          selector: (row) => row.category,
          sortable: true,
          width: "170px",
        },
        {
          name: "Coupons",
          selector: (row) => row.price,
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
          selector: (row) => row.mdate,
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
          selector: (row) => row.edate,
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
            selector: (row) => row.edate,
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
          pname: "$1,485.73",
          category:"$0.00",
          price: "$14",
          mdate: "$1,009.00",
          edate: "$476.73",
        },
        {
          id: 2,
          sku: "23 Sep,2022",
          pname:"$361.00",
          category: "$0.00",
          price: "$14",
          mdate: "$1,009.00",
          edate: "$476.73",
        },
        {
            id: 1,
            sku: "23 Sep,2022",
            pname: "$1,485.73",
            category:"$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            pname:"$361.00",
            category: "$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },{
            id: 1,
            sku: "23 Sep,2022",
            pname: "$1,485.73",
            category:"$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            pname:"$361.00",
            category: "$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },{
            id: 1,
            sku: "23 Sep,2022",
            pname: "$1,485.73",
            category:"$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            pname:"$361.00",
            category: "$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },{
            id: 1,
            sku: "23 Sep,2022",
            pname: "$1,485.73",
            category:"$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },
          {
            id: 2,
            sku: "23 Sep,2022",
            pname:"$361.00",
            category: "$0.00",
            price: "$14",
            mdate: "$1,009.00",
            edate: "$476.73",
          },
      ];
    return (
        <div>
             <h2>Stock Report</h2>
              {/* search bar */}
      <div className="card mt-3 p-3 ">
      <div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
        </div>
        <div className="col-md-3 col-sm-6 aos_input">
        <DropdownButton id="dropdown-variant-success" title="Download" variant="button main_button w-100">
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
        className={"productlist_table"}
      />

</div>


        </div>
    );
}

export default StockReport;
