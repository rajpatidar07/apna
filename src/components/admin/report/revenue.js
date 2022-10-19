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
import { HiOutlineReceiptRefund } from "react-icons/hi";
import {AiOutlineArrowRight}  from "react-icons/ai";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const RevenueReport = () => {
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
              <h2>Revenue Report</h2>
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
        <MainButton btntext={"Download"} btnclass={'button main_outline_button w-100'}/>
        </div>
      </div>

         {/* upload */}
         {/* <div className="product_page_uploadbox my-4">
          <MainButton btntext={"Download"} />

         </div> */}
{/*  */}
{/* box */}
<div className="col-12 px-3">
          {/* card */}
          <div className=" row main_dashboard_row1 d-flex mb-3 ">
            {/* revenue */}
         
            {/* end */}
            {/* order */}
            <div className="card p-3  col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 reporticon" />
                <h5 className="text-success">Gross Revenue </h5>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h4>2,356</h4>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight/>
                     <p className="mb-0">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p>$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
            {/* order end */}
            {/* Refund */}
            <div className="card p-3  col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 reporticon" />
                <h5 className="text-success">Refund </h5>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h4>2,356</h4>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight/>
                     <p className="mb-0">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p>$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
{/* refund end */}
{/* extra */}
<div className="card p-3  col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 reporticon" />
                <h5 className="text-success">Coupons </h5>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h4>2,356</h4>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight/>
                     <p className="mb-0">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p>$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
            <div className="card p-3  col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 reporticon" />
                <h5 className="text-success">Taxes </h5>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h4>2,356</h4>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight/>
                     <p className="mb-0">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p>$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
            <div className="card p-3  col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 reporticon" />
                <h5 className="text-success">Shipping </h5>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h4>2,356</h4>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight/>
                     <p className="mb-0">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p>$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
            <div className="card p-3  col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 reporticon" />
                <h5 className="text-success">Net Revenue </h5>
              </div>
              <div className="row mt-2">
                <div className="col-12">
                  <div className="row  d-flex flex-column align-items-center">
                  <div className="d-flex align-items-baseline justify-content-between">
                    <h4>2,356</h4>
                    <div className="d-flex align-items-center justify-content-center">
                     <AiOutlineArrowRight/>
                     <p className="mb-0">0%</p>
                    </div>
                    </div>
                    <div>
                        <h5>Previous Year:</h5>
                        <p>$0.00</p>
                    </div>
                  </div>
                </div>

                
              </div>
            </div>
{/*  */}









{/* <div className="card p-3 col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 reporticon" />
                <h5 className="text-success">Revenue </h5>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0">Total revenue</h6>
                      <h3 className="m-0 text-success">8,458</h3>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0">Current month </h6>
                      <h3 className="m-0 text-success">8,458</h3>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0">Previous month </h6>
                      <h3 className="m-0 text-success">8,458</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* end */}
            {/* order */}
            {/* <div className="card p-3 col-auto shadow-none">
              <div className="d-flex mt-0 flex-column">
                <BsBagPlus className="text-primary h5 mx-2 reporticon" />
                <h5 className="text-primary">Order </h5>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Total Orders</h6>
                      <h3 className="m-0 text-primary">8,458</h3>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Current month </h6>
                      <h3 className="m-0 text-primary">8,458</h3>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Previous month </h6>
                      <h3 className="m-0 text-primary">8,458</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* order end */}
            {/* Refund */}
            {/* <div className="card p-3 col-auto shadow-none ">
              <div className="d-flex mt-0 flex-column ">
                <HiOutlineReceiptRefund className="text-warning h5 mx-2 reporticon" />
                <h5 className="text-warning">Refund </h5>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Total Refund</h6>
                      <h3 className="m-0 text-warning">8,458</h3>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Current month </h6>
                      <h3 className="m-0 text-warning">8,458</h3>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Previous month </h6>
                      <h3 className="m-0 text-warning">8,458</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
              {/* Refund end */}

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

export default RevenueReport;
