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
  BsCashCoin,
  BsAlarm,
} from "react-icons/bs";
import { HiOutlineReceiptRefund, HiOutlineGift } from "react-icons/hi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { GiTakeMyMoney, GiSellCard } from "react-icons/gi";
import { MdOutlineLocalShipping } from "react-icons/md";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
      selector: (row) => row.sku,
      sortable: true,
      width: "150px",
    },
    {
      name: "Product Name",
      selector: (row) => row.pname,
      sortable: true,
      width: "160px",
    },

    {
      name: "Item Sold",
      selector: (row) => row.isold,
      sortable: true,
      width: "140px",
      center: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "190px",
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

    {
      name: "Orders",
      selector: (row) => row.order,
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
      selector: (row) => row.stock,
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
      selector: (row) => row.status,
      sortable: true,
      width: "100px",
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
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Light House Device Bag</p>,
      isold: "45",
      stock: "25",
      category: <p className="reviewdesc"> Decoration Decoration </p>,
      order: "120",
    },
    {
      id: 2,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Light House Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      status: "$14",
      stock: "25",
    },
    {
      id: 1,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Light House Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
    {
      id: 2,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Solo Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
    {
      id: 1,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Solo Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
    {
      id: 2,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Solo Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
    {
      id: 1,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Solo Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
    {
      id: 2,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Solo Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
    {
      id: 1,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Solo Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
    {
      id: 2,
      net: "$250",
      sku: "256143",
      pname: <p className="reviewdesc">Solo Device Bag</p>,
      isold: "45",
      category: "Backpacks",
      order: "120",
      stock: "25",
      status: "$14",
    },
  ];
  return (
    <div>
      <h2>Product Report</h2>
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
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <DropdownButton
              id="dropdown-variant-success"
              title="Download"
              variant="button main_button w-100"
            >
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
                      <h3>2,356</h3>
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
                      <h3>2,356</h3>
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
                      <h3>2,356</h3>
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
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className={"productlist_table"}
        />
      </div>
    </div>
  );
};

export default ProductReport;
