import { Bell } from "react-bootstrap-icons";
import React from "react";
import "../../style/dashboard.css";
import {
  BsBagPlus,
  BsBagX,
  BsBagCheck,
  BsBag,
  BsCashCoin, BsAlarm
} from "react-icons/bs";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineLocationOn, MdOutlineRecentActors } from "react-icons/md";
import Table from "react-bootstrap/Table";
import demo from "../../images/demo.jpg";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import ListGroup from 'react-bootstrap/ListGroup';
import { Badge,Form } from "react-bootstrap";
import Chart from "react-apexcharts";
function Dashboard() {
  const navigate = useNavigate();

  const options = {
    chart: {
      type: 'pie',
      borderRadius: '5',
      borderColor: '#335cad'
    },
    title: {
      text: '',
      style: { "color": "green", "fontSize": "22px" },
      align: "left",
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6, 9]
      }
    ]
  };
  const visit = {
    chart: {
      type: 'column',
      borderRadius: '5',
      borderColor: '#335cad'
    },
    title: {
      text: '',
      style: { "color": "green", "fontSize": "22px" },
      align: "left",
    },
    series: [
      {
        data: [2, 9, 15]
      },
      {
        data: [9, 1, 11]
      },
      {
        data: [5, 9, 10]
      }
    ]
  };
  const sales = {
    chart: {
      type: 'line',
      borderRadius: '5',
      borderColor: '2px black border',

    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
        'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
      categories: ['0', '200', '400', '600', '800', '1000']
    },
    title: {
      text: '',
      style: { "color": "green", "fontSize": "22px" },
      align: "left"
    },
    series: [
      {
        data: [1, 9, 2, 5, 3, 4, 8, 7, 0, 1, 1, 9]
      },
      {
        data: [1, 4, 2, 1, 0, 4, 8, 7, 0, 1, 1, 9]
      },
      {
        data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    ]
  };
  const series = [
    {
      name: "Temperature in Fahrenheit", //will be displayed on the y-axis
      data: [43, 53, 50, 57]
    }
  ];
  const line = {
    chart: {
      id: "simple-bar",
      toolbar:false,
    
    },
   
  };
 
  return (
    <div className="App productlist_maindiv">
      <h2>Dashboard</h2>
      <div className="row dashboard_row recentorder_boxx">
        <div className="dashboard_card p-2 col-12">
          <div className="card p-3 col-12 ">
            <div className="row d-flex align-items-baseline ordersummary">
              <h5 className="col-2 text-success">Orders Overview</h5>
              {/* <ProgressBar className="col-2 orderprogressbar p-0">
                <ProgressBar striped variant="success" now={40} key={1} label={`40%`} className={'text-dark'} />
                <ProgressBar variant="warning" now={20} key={2} label={`10%`} className={'text-dark'} />
                <ProgressBar striped variant="danger" now={50} key={3} label={`40%`} className={'text-dark'} />
              </ProgressBar> */}
            </div>
            <div className="row p-3 pt-0 pb-0">
            <div className="col-2">
            <Chart
            series={series}
              options={line}
              type="bar"
              width="200"
              
            />
            </div>
              <div className="col-2">
                <div className="row  d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div ordericonsection">
                      {" "}
                      <BsBagPlus className="text-primary h1 opacity-75 mx-2 ordericon" />
                    </div>
                    <div>
                      <h3 className="m-0">8,458</h3>
                      <p className="m-0 text-primary">Total Order</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-2">
                <div className="row  d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div ordericonsection">
                      {" "}
                      <BsBagCheck className="text-success h1 opacity-75 mx-2 ordericon" />
                    </div>
                    <div>
                      <h3 className="m-0">8,458</h3>
                      <p className="m-0 text-success">Completed Order</p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-2">
                <div className="row d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div ordericonsection">
                      {" "}
                      <BsBag className="text-warning h1 opacity-75 mx-2 ordericon" />
                    </div>
                    <div>
                      <h3 className="m-0">8,458</h3>
                      <p className="m-0 text-warning">Pending Order</p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-2">
                <div className="row  d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div ordericonsection">
                      {" "}
                      <BsBagX className="text-danger h1 opacity-75 mx-2 ordericon" />
                    </div>
                    <div>
                      <h3 className="m-0">8,458</h3>
                      <p className="m-0 text-danger">Cancelled Order</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* order */}

      {/* ------------- */}
        <div className="col-8 recentorder p-2 ">
          <div className="card p-3">
          <div className="d-flex align-items-center justify-content-between ">
                <h5 className="text-success mb-0">Sales Figures</h5>
              <div className="col-md-2 col-sm-6">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox border border-success text-success"
              placeholder="Search by category"
              size="sm"
            >
              <option > Sort By</option>
              <option value="1">Day</option>
              <option value="2">Week</option>
              <option value="3">1 Month</option>
              <option value="3">3 Month</option>
              <option value="3">6 Month</option>

            </Form.Select>
          </div>
          </div>
          <HighchartsReact highcharts={Highcharts} options={sales} />
        </div>
        </div>
        <div className="col-4 p-2 summary_box">
          {/* card */}
          {/* revenue */}
          <div className="card  p-4 col-auto shadow-none">
            <div className=" d-flex mt-0 flex-column">
              <BsCashCoin className="text-success h5 mb-0 mx-2 carddicon" />
              <h5 className="text-success mb-3">Revenue </h5>
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
          </div>
          {/* end */}
          {/* order */}
          <div className="card p-4 my-3 col-auto shadow-none">
            <div className="d-flex mt-0 flex-column">
              <BsBagPlus className="text-primary h5 mx-2 carddicon" />
              <h5 className="text-primary mb-3">Order </h5>
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
          </div>

          {/* order end */}

          {/* Refund */}
          <div className="card p-4 col-auto shadow-none ">
            <div className="d-flex mt-0 flex-column ">
              <HiOutlineReceiptRefund className="text-warning h5 mx-2 carddicon" />
              <h5 className="text-warning mb-3">Refund </h5>
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
            {/* Refund end */}
          </div>
          {/* refund end */}


        </div>




        <div className="col-4 p-2">
          {/* revenue */}
          <div className="card p-3">
          <div className="d-flex align-items-center justify-content-between ">
                <h5 className="text-success mb-0">7 Day Traffic</h5>
              <div className="col-md-3 col-sm-6">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox border border-success text-success"
              placeholder="Search by category"
              size="sm"
            >
              <option > Sort By</option>
              <option value="1">Day</option>
              <option value="2">Week</option>
              <option value="3">1 Month</option>
              <option value="3">3 Month</option>
              <option value="3">6 Month</option>

            </Form.Select>
          </div>
          </div>
          <hr />

          <HighchartsReact highcharts={Highcharts} options={options} />
</div>
          {/* end */}
        </div>
        <div className="col-4 p-2">
          {/* revenue */}
          <div className="card p-3">
          <div className="d-flex align-items-center justify-content-between ">
                <h5 className="text-success mb-0">Traffic vs Sales</h5>
              <div className="col-md-3 col-sm-6">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox border border-success text-success"
              placeholder="Search by category"
              size="sm"
            >
              <option > Sort By</option>
              <option value="1">Day</option>
              <option value="2">Week</option>
              <option value="3">1 Month</option>
              <option value="3">3 Month</option>
              <option value="3">6 Month</option>

            </Form.Select>
          </div>
          </div>
          <hr />

          <HighchartsReact highcharts={Highcharts} options={visit} />
          {/* end */}
          </div>
        </div>
        {/* last box */}
        <div className="col-4 p-2">
        <div className="card p-2  bg-teal shadow-none">
          <div className="d-flex align-items-end  justify-content-between p-2">
            <div className="d-flex align-items-center">
              <h5 className="text-success">Visit</h5>
              <BsAlarm className="text-success h4 mx-2" />
            </div>
            <div className="col-md-3 col-sm-6">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox border border-success text-success"
              placeholder="Search by category"
              size="sm"
            >
              <option > Sort By</option>
              <option value="1">Day</option>
              <option value="2">Week</option>
              <option value="3">1 Month</option>
              <option value="3">3 Month</option>
              <option value="3">6 Month</option>

            </Form.Select>
          </div>
          </div>
          <hr className="my-2"/>
          <Table responsive striped hover>
            <thead className="text-center">
              <tr>
                <td>City</td>
                <td>Visitor</td>
                <td>Page View</td>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>
                  <h6>Andhra Pradesh</h6>
                </td>
                <td>
                  <h6>14100</h6>
                </td>
                <td>
                  <h6>10000</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Andhra Pradesh</h6>
                </td>
                <td>
                  <h6>14100</h6>
                </td>
                <td>
                  <h6>10000</h6>
                </td>
              </tr> <tr>
                <td>
                  <h6>Andhra Pradesh</h6>
                </td>
                <td>
                  <h6>14100</h6>
                </td>
                <td>
                  <h6>10000</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Andhra Pradesh</h6>
                </td>
                <td>
                  <h6>14100</h6>
                </td>
                <td>
                  <h6>10000</h6>
                </td>
              </tr> <tr>
                <td>
                  <h6>Andhra Pradesh</h6>
                </td>
                <td>
                  <h6>14100</h6>
                </td>
                <td>
                  <h6>10000</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Andhra Pradesh</h6>
                </td>
                <td>
                  <h6>14100</h6>
                </td>
                <td>
                  <h6>10000</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Andhra Pradesh</h6>
                </td>
                <td>
                  <h6>14100</h6>
                </td>
                <td>
                  <h6>10000</h6>
                </td>
              </tr>
              <tr>
                <td>
                  <h6>Goa</h6>
                </td>
                <td>
                  <h6>12000</h6>
                </td>
                <td>
                  <h6>12645</h6>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        </div>
        {/* last */}
        {/* section end */}

  {/* Sales */}
        {/* part1 */}
        <div className="col-8 p-2">
          <div className="card p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <h5 className="text-success mb-0">Recent Orders</h5>
                <MdOutlineRecentActors className="text-success h3 mx-2 mb-0" />
              </div>
            <div className="col-md-2 col-sm-6">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox border border-success text-success"
              placeholder="Search by category"
              size="sm"
            >
              <option > Sort By</option>
              <option value="1">Day</option>
              <option value="2">Week</option>
              <option value="3">1 Month</option>
              <option value="3">3 Month</option>
              <option value="3">6 Month</option>

            </Form.Select>
          </div>
            </div>
            <hr className="mb-3" />
            <Table responsive striped hover>
              <thead className="text-center">
                <tr>
                  <th className="py-3">Order ID</th>
                  <th className="py-3"> Customer</th>
                  <th className="py-3">Product</th>
                  <th className="py-3">Amount</th>
                  <th className="py-3">Vendor</th>
                </tr>
              </thead>
              <tbody className="text-center mt-2">
                <tr>
                  <td className="text-primary py-3" onClick={() => { navigate('/order_detail') }}>#VZ2112</td>
                  <td className="py-3">Alex Smith</td>
                  <td className="py-3">Kitchen Storage</td>
                  <td className="text-success py-3">$109.00</td>
                  <td className="py-3">Zoetic Fashion</td>
                </tr>
                <tr>
                  <td className="text-primary py-3" onClick={() => { navigate('/order_detail') }}>#VZ2112</td>
                  <td className="py-3">Alex Smith</td>
                  <td className="py-3">Kitchen Storage</td>
                  <td className="text-success py-3">$109.00</td>
                  <td className="py-3">Zoetic Fashion</td>
                </tr> <tr>
                  <td className="text-primary py-3" onClick={() => { navigate('/order_detail') }}>#VZ2112</td>
                  <td className="py-3">Alex Smith</td>
                  <td className="py-3">Kitchen Storage</td>
                  <td className="text-success py-3">$109.00</td>
                  <td className="py-3">Zoetic Fashion</td>
                </tr> <tr>
                  <td className="text-primary py-3" onClick={() => { navigate('/order_detail') }}>#VZ2112</td>
                  <td className="py-3">Alex Smith</td>
                  <td className="py-3">Kitchen Storage</td>
                  <td className="text-success py-3">$109.00</td>
                  <td className="py-3">Zoetic Fashion</td>
                </tr> <tr>
                  <td className="text-primary py-3" onClick={() => { navigate('/order_detail') }}>#VZ2112</td>
                  <td className="py-3">Alex Smith</td>
                  <td className="py-3">Kitchen Storage</td>
                  <td className="text-success py-3">$109.00</td>
                  <td className="py-3">Zoetic Fashion</td>
                </tr>
                
              </tbody>
            </Table>
          </div>
        </div>
        {/* part2 */}
        <div className="col-4 p-2">
          <div className="card shadow-none p-3">
            <div className="d-flex align-items-center justifu-content-between">
              <h5 className="text-success mt-1">Top Sales Locations</h5>
              <MdOutlineLocationOn className="carddicon text-success" />
            </div>
            <div className="p-2">
              <h4 className="text-success">200k</h4>
              <h6 className="text-secondary">Our Most Customers in US</h6>
            </div>
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
                <Badge bg="primary" className="mt-1" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
                <Badge bg="primary" className="mt-1" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
                <Badge bg="primary" className="mt-1" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
                <Badge bg="primary" className="mt-1" pill>
                  14
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
                <Badge bg="primary" className="mt-1" pill>
                  14
                </Badge>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        {/* sales end */}




        {/* table sectiob */}
        {/*table 1  */}
        <div className="col-6 p-2 ">
          <div className=" card p-3 shadow-none">
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex align-items-center">
                <h5 className="text-success">Best Selling Products</h5>
                <BsAlarm className="text-success h4 mx-2" />
              </div>

            <div className="col-md-2 col-sm-6">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox border border-success text-success"
              placeholder="Search by category"
              size="sm"
            >
              <option > Sort By</option>
              <option value="1">Day</option>
              <option value="2">Week</option>
              <option value="3">1 Month</option>
              <option value="3">3 Month</option>
              <option value="3">6 Month</option>

            </Form.Select>
          </div>
            </div>
            <hr />
            <Table responsive striped hover className='sellertabler'>
              <tbody className="sellertbody text-center">
                <tr>
                  <td className="w-0">
                    <img src={demo} className="mainn_img" />
                  </td>
                  <td>
                    <h6>Branded T-Shirts</h6>
                    <p className="text-secondary mb-0">24 Apr 2021</p>
                  </td>
                  <td>
                    <h6 className="text-success">14040</h6>
                    <p className="text-secondary mb-0">Price</p>
                  </td>
                  <td>
                    <h6>@62</h6>
                    <p className="text-secondary mb-0">Orders</p>
                  </td>
                  <td>
                    <h6>262</h6>
                    <p className="text-secondary mb-0">Stock</p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <img src={demo} className="mainn_img" />
                  </td>
                  <td>
                    <h6>Branded T-Shirts</h6>
                    <p className="text-secondary mb-0">24 Apr 2021</p>
                  </td>
                  <td>
                    <h6 className="text-success">$29.00</h6>
                    <p className="text-secondary mb-0">Price</p>
                  </td>
                  <td>
                    <h6>@62</h6>
                    <p className="text-secondary mb-0">Orders</p>
                  </td>
                  <td>
                    <h6>262</h6>
                    <p className="text-secondary mb-0">Stock</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <img src={demo} className="mainn_img" />
                  </td>
                  <td>
                    <h6>Branded T-Shirts</h6>
                    <p className="text-secondary mb-0">24 Apr 2021</p>
                  </td>
                  <td>
                    <h6 className="text-success">$29.00</h6>
                    <p className="text-secondary mb-0 text-center">Price</p>
                  </td>
                  <td>
                    <h6>@62</h6>
                    <p className="text-secondary mb-0 text-center">Orders</p>
                  </td>
                  <td>
                   <Badge bg="danger">out of stock</Badge>
                    <p className="text-secondary mb-0 ">Stock</p>
                  </td>
                </tr>
              </tbody>
            </Table>

          </div>
        </div>
        {/*table 1  end  */}
        {/*table 2  */}
        <div className="col-6 p-2">
          <div className=" card p-3 shadow-none ">
            <div className="d-flex align-items-end justify-content-between">
              <div className="d-flex align-items-center">
                <h5 className="text-success">Top Seller</h5>
                <BsAlarm className="text-success h4 mx-2" />
              </div>
            <div className="col-md-2 col-sm-6">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox border border-success text-success"
              placeholder="Search by category"
              size="sm"
            >
              <option > Sort By</option>
              <option value="1">Day</option>
              <option value="2">Week</option>
              <option value="3">1 Month</option>
              <option value="3">3 Month</option>
              <option value="3">6 Month</option>

            </Form.Select>
          </div>
            </div>
            <hr />
            <Table responsive striped hover className='sellertabler'>
              <tbody className='sellertbody text-center'>
                <tr>
                  <td className="w-0">
                    <img src={demo} className="mainn_img" />
                  </td>
                  <td>
                    <h6>iTest Factory</h6>
                    <p className="text-secondary mb-0">Oliver Tyler</p>
                  </td>
                  <td>
                    <h6>Bags and Wallets</h6>
                    <p className="text-secondary mb-0">Category</p>
                  </td>
                  <td>
                    <h6>@62</h6>
                    <p className="text-secondary mb-0">Orders</p>
                  </td>
                  <td>
                    <h6>262</h6>
                    <p className="text-secondary mb-0">Stock</p>
                  </td>
                </tr>

                <tr>
                  <td className="w-0">
                    <img src={demo} className="mainn_img" />
                  </td>
                  <td>
                    <h6>iTest Factory</h6>
                    <p className="text-secondary mb-0">Oliver Tyler</p>
                  </td>
                  <td>
                    <h6>Bags and Wallets</h6>
                    <p className="text-secondary mb-0">Category</p>
                  </td>
                  <td>
                    <h6>@62</h6>
                    <p className="text-secondary mb-0">Orders</p>
                  </td>
                  <td>
                  <Badge bg="danger">out of stock</Badge>
                    <p className="text-secondary mb-0">Stock</p>
                  </td>
                </tr>
                <tr>
                  <td className="w-0">
                    <img src={demo} className="mainn_img" />
                  </td>
                  <td>
                    <h6>iTest Factory</h6>
                    <p className="text-secondary mb-0">Oliver Tyler</p>
                  </td>
                  <td>
                    <h6>Bags and Wallets</h6>
                    <p className="text-secondary mb-0">Category</p>
                  </td>
                  <td>
                    <h6>@62</h6>
                    <p className="text-secondary mb-0">Orders</p>
                  </td>
                  <td>
                    <h6>262</h6>
                    <p className="text-secondary mb-0">Stock</p>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        {/*table 2 end  */}
        {/* table section end */}

       



      
      </div>
    </div>
  );
}

export default Dashboard;
