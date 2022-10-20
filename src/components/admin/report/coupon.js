import React, { useState } from "react";
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
      selector: (row) => row.code,
      sortable: true,
      width: "260px",
    },
    {
      name: "Amount Discounted",
      selector: (row) => row.discount,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => row.cdate,
      sortable: true,
      
    },
    {
      name: "Expires",
      selector: (row) => row.edate,
      sortable: true,
     
    },
    {
      name: "Orders",
      selector: (row) => row.order,
      sortable: true,
      
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true,
      
    },
   
   
  ];

  const data = [
    {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    },
    {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    }, {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    }, {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    }, {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    }, {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    }, {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    }, {
      id: 1,
      code: "Coupon250",
      type: "PErcentage",
      cdate:"23 Sep,2021",
    edate:"23 Sep,2021",
  discount:"12",
  order: "120",
    },
  ];
    return (
        <div>
            <h2>Coupon Report</h2>
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
{/* amt end */}

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

export default CouponReport;
