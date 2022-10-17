import { Bell } from "react-bootstrap-icons";
import React from "react";
import "../../style/dashboard.css";
import {
  BsBagPlus,
  BsBagX,
  BsBagCheck,
  BsBag,
  BsCashCoin,BsAlarm
} from "react-icons/bs";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import Table from "react-bootstrap/Table";
import demo from "../../images/demo.jpg";
import { useNavigate } from "react-router-dom";
import ProgressBar from 'react-bootstrap/ProgressBar';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import { Badge } from "react-bootstrap";

function Dashboard() {
  const navigate = useNavigate();
 
  const options = {
    chart: {
      type: 'pie',
      borderRadius:'5',
      borderColor:'#335cad'
    },
    title: {
      text: '7 Day Traffic'
    },
    series: [
      {
        data: [1, 2, 1, 4, 3, 6,9]
      }
    ]
  };
  const visit = {
    chart: {
      type: 'bar',
      borderRadius:'5',
      borderColor:'#335cad'
    },
    title: {
      text: 'Traffic vs Sales'
    },
    series: [
      {
        data: [2,9]
      }
    ]
  };
  const sales = {
    chart: {
      type: 'line',
      borderRadius:'5',
      borderColor:'#335cad'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
          'Sep', 'Oct', 'Nov', 'Dec']
  },
  yAxis: {
    categories: ['0', '200', '400', '600', '800', '1000']
},
    title: {
      text: 'Sales Figures'
    },
    series: [
      {
        data: [1,9,2,5,3,4,8,7,0,1,1,9]
      }
    ]
  };
  return (
    <div className="App productlist_maindiv">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="dashboard_card p-0 col-12">
          <div className="card p-3 col-12 ">
          <div className="row d-flex align-items-baseline ordersummary">
            <h5 className="col-2">Orders Overview</h5>
            <ProgressBar className="col-3 orderprogressbar">
      <ProgressBar striped variant="success" now={15} key={1} />
      <ProgressBar variant="warning" now={20} key={2} />
      <ProgressBar striped variant="danger" now={10} key={3} />
    </ProgressBar>
    </div>
            <div className="row p-3 pt-0 pb-0">
            
              <div className="col-3">
                <div className="row  d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div">
                      {" "}
                      <BsBagPlus className="text-primary h1 opacity-75 mx-2" />
                    </div>
                    <div>
                    <h5 className="m-0">8,458</h5>
                    <p className="m-0 text-primary">Total Order</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-3">
                <div className="row  d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div">
                      {" "}
                      <BsBagCheck className="text-success h1 opacity-75 mx-2" />
                    </div>
                    <div>
                    <h5 className="m-0">8,458</h5>
                    <p className="m-0 text-success">Completed Order</p>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-3">
                <div className="row d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div">
                      {" "}
                      <BsBag className="text-warning h1 opacity-75 mx-2" />
                    </div>
                    <div>
                    <h5 className="m-0">8,458</h5>
                    <p className="m-0 text-warning">Pending Order</p>
                  </div>
                  </div>
                </div>
              </div>{" "}
              <div className="col-3">
                <div className="row  d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2 d-flex align-items-center">
                    <div className="col-auto icon_div">
                      {" "}
                      <BsBagX className="text-danger h1 opacity-75 mx-2" />
                    </div>
                    <div>
                    <h5 className="m-0">8,458</h5>
                    <p className="m-0 text-danger">Cancelled Order</p>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* order */}

      {/* ------------- */}
      <div className="row mt-5 recentorder_boxx">
        <div className="col-8 recentorder">
          <div className="card p-3">
          <div className="d-flex justify-content-between align-items-end">
            <h5>Recent Orders</h5>
            <Dropdown>
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size="md" >
        Sort By
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Day</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Week</Dropdown.Item>
        <Dropdown.Item href="#/action-3">3 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">6 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">1 Month</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
    </div>
            <hr/>
            <Table responsive striped  hover>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th> Customer</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Vendor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-primary" onClick={()=>{navigate('/order_detail')}}>#VZ2112</td>
                  <td>Alex Smith</td>
                  <td>Kitchen Storage</td>
                  <td className="text-success">$109.00</td>
                  <td>Zoetic Fashion</td>
                </tr>

                <tr>
                  <td className="text-primary" onClick={()=>{navigate('/order_detail')}}>#VZ2112</td>
                  <td>Alex Smith</td>
                  <td>Kitchen Storage</td>
                  <td className="text-success">$109.00</td>
                  <td>Zoetic Fashion</td>
                </tr>
                <tr>
                  <td className="text-primary" onClick={()=>{navigate('/order_detail')}}>#VZ2112</td>
                  <td>Alex Smith</td>
                  <td>Kitchen Storage</td>
                  <td className="text-success">$109.00</td>
                  <td>Zoetic Fashion</td>
                </tr>
                <tr>
                  <td className="text-primary" onClick={()=>{navigate('/order_detail')}}>#VZ2112</td>
                  <td>Alex Smith</td>
                  <td>Kitchen Storage</td>
                  <td className="text-success">$109.00</td>
                  <td>Zoetic Fashion</td>
                </tr>
                <tr>
                  <td className="text-primary" onClick={()=>{navigate('/order_detail')}}>#VZ2112</td>
                  <td>Alex Smith</td>
                  <td>Kitchen Storage</td>
                  <td className="text-success">$109.00</td>
                  <td>Zoetic Fashion</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className="row mt-5">
          <div className="col-6">
 {/* revenue */}

            <HighchartsReact highcharts={Highcharts} options={options}  />
            
            {/* end */}
          </div>
          <div className="col-6">
{/* revenue */}

            <HighchartsReact highcharts={Highcharts} options={visit}  />
            {/* end */}
          </div>

          </div>
        </div>

        <div className="col-4 px-3">
          {/* card */}
          <div className=" row main_dashboard_row d-flex flex-column">
            {/* revenue */}
            <div className="card p-4 col-auto shadow-none">
              <div className=" d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h5 mb-0 mx-2 carddicon" />
                <h5 className="text-success">Revenue </h5>
              </div>
              <div className="row mt-2">
                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0">Total revenue</h6>
                      <h5 className="m-0 text-success">8,458</h5>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0">Current month </h6>
                      <h5 className="m-0 text-success">8,458</h5>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0">Previous month </h6>
                      <h5 className="m-0 text-success">8,458</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end */}
            {/* order */}
            <div className="card p-4 col-auto shadow-none">
              <div className="d-flex mt-0 flex-column">
                <BsBagPlus className="text-primary h5 mx-2 carddicon" />
                <h5 className="text-primary">Order </h5>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Total Orders</h6>
                      <h5 className="m-0 text-primary">8,458</h5>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Current month </h6>
                      <h5 className="m-0 text-primary">8,458</h5>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Previous month </h6>
                      <h5 className="m-0 text-primary">8,458</h5>
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
                <h5 className="text-warning">Refund </h5>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Total Refund</h6>
                      <h5 className="m-0 text-warning">8,458</h5>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Current month </h6>
                      <h5 className="m-0 text-warning">8,458</h5>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <div className="row  d-flex flex-column align-items-center">
                    <div className="col-auto text_div text-center mt-0">
                      <h6 className="m-0 ">Previous month </h6>
                      <h5 className="m-0 text-warning">8,458</h5>
                    </div>
                  </div>
                </div>
              </div>
              {/* Refund end */}
            </div>
            {/* refund end */}

            {/* last box */}
             <div className="card p-3 col-auto bg-teal shadow-none">
             <div className="d-flex align-items-end  justify-content-between">
             <div className="d-flex align-items-center">
             <h5 className="text-danger">Visit</h5>
             <BsAlarm  className="text-danger h4 mx-2"/>
             </div>
             <Dropdown>
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size="md" >
        Sort By
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Day</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Week</Dropdown.Item>
        <Dropdown.Item href="#/action-3">3 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">6 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">1 Month</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
    </div>
             <hr/>
             <Table responsive striped  hover>
             <thead>
              <tr>
                <td>City</td>
                <td>Visitor</td>
                <td>Page View</td>
              </tr>
             </thead>
                <tbody>
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
              {/* last */}
          </div>
        </div>
        {/* section end */}

{/* table sectiob */}
        {/*table 1  */}
        <div className="row mt-5 px-0">
          <div className="col-6 ">
            <div className=" card p-3 shadow-none">
            <div className="d-flex align-items-end justify-content-between">
            <div className="d-flex align-items-center">
             <h5 className="text-warning">Best Selling Products</h5>
             <BsAlarm  className="text-warning h4 mx-2"/>
             </div>
              
              <Dropdown>
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size="md" >
        Sort By
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Day</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Week</Dropdown.Item>
        <Dropdown.Item href="#/action-3">3 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">6 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">1 Month</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
    </div>
              <hr/>
              <Table responsive striped  hover>
                <tbody>
                  <tr>
                    <td className="w-0">
                      <img src={demo} className="w-75" />
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
                      <img src={demo} className="w-75" />
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
                      <img src={demo} className="w-75" />
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
                      <h6 className="text-danger bg-danger bg-opacity-50 px-1 rounded">out of stock</h6>
                      <p className="text-secondary mb-0">Stock</p>
                    </td>
                  </tr>
                </tbody>
              </Table>

            </div>
          </div>
          {/*table 1  end  */}
          {/*table 2  */}
          <div className="col-6 px-0">
            <div className=" card p-3 shadow-none">
            <div className="d-flex align-items-end justify-content-between">
            <div className="d-flex align-items-center">
             <h5 className="text-warning">Top Seller</h5>
             <BsAlarm  className="text-warning h4 mx-2"/>
             </div>
              <Dropdown>
      <Dropdown.Toggle variant="outline-dark" id="dropdown-basic" size="md" >
        Sort By
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Day</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Week</Dropdown.Item>
        <Dropdown.Item href="#/action-3">3 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">6 Month</Dropdown.Item>
        <Dropdown.Item href="#/action-3">1 Month</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
    </div>
              <hr/>
              <Table responsive striped hover>
                <tbody>
                  <tr>
                    <td className="w-0">
                      <img src={demo} className="w-75" />
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
                      <img src={demo} className="w-75" />
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
                    <h6 className="text-danger bg-danger bg-opacity-50 px-1 rounded">out of stock</h6>
                      <p className="text-secondary mb-0">Stock</p>
                    </td>
                  </tr>
                  <tr>
                    <td className="w-0">
                      <img src={demo} className="w-75" />
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
        </div>
        {/* table section end */}


{/* Sales */}
<div className="row mt-5 mb-5 px-0">
{/* part1 */}
<div className="col-8">
<HighchartsReact highcharts={Highcharts} options={sales}  />
</div>
{/* part2 */}
<div className="col-4 px-0">
  <div className="card shadow-none p-4">
  <div className="d-flex align-items-center justifu-content-between">
     <h5 className="text-primary">Top Sales Locations</h5>
     <MdOutlineMapsHomeWork className="carddicon text-primary"/>
     </div>
     <div className="p-3">
     <h4 className="text-success">200k</h4>
     <h6 className="text-secondary">Our Most Customers in US</h6>
     </div>
     <ListGroup variant="flush">
      <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
      <Badge bg="primary" pill>
          14
        </Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
      <Badge bg="primary" pill>
          14
        </Badge>
        </ListGroup.Item>
         <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
      <Badge bg="primary" pill>
          14
        </Badge>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex justify-content-between p-3">Madhya Pradesh
      <Badge bg="primary" pill>
          14
        </Badge>
        </ListGroup.Item>
    </ListGroup>
  </div>
  </div>
</div>
{/* sales end */}

      </div>
    </div>
  );
}

export default Dashboard;
