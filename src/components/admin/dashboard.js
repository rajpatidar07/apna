import { Bell } from "react-bootstrap-icons";
import React from "react";
import "../../style/dashboard.css";
import {
  BsBagPlus,
  BsBagX,
  BsBagCheck,
  BsBag,
  BsCashCoin,
} from "react-icons/bs";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { GiCash } from "react-icons/gi";
import Table from "react-bootstrap/Table";
import demo from "../../images/demo.jpg";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="App productlist_maindiv">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="dashboard_card p-0 col-12">
          <div className="card p-3 col-12 ">
            <h5>Orders Overview</h5>
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
                  <div className="col-auto text_div text-center mt-2">
                    <div className="col-auto icon_div">
                      {" "}
                      <BsBagCheck className="text-success h1 opacity-75" />
                    </div>
                    <h5 className="m-0">8,458</h5>
                    <p className="m-0 text-success">Completed Order</p>
                  </div>
                </div>
              </div>{" "}
              <div className="col-3">
                <div className="row d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2">
                    <div className="col-auto icon_div">
                      {" "}
                      <BsBag className="text-warning h5" />
                    </div>
                    <h5 className="m-0">8,458</h5>
                    <p className="m-0 text-warning">Pending Order</p>
                  </div>
                </div>
              </div>{" "}
              <div className="col-3">
                <div className="row  d-flex flex-column align-items-center">
                  <div className="col-auto text_div text-center mt-2">
                    <div className="col-auto icon_div">
                      {" "}
                      <BsBagX className="text-danger h5" />
                    </div>
                    <h5 className="m-0">8,458</h5>
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
      <div className="row mt-3 recentorder_boxx">
        <div className="col-8 recentorder">
          <div className=" card p-3">
            <h5>Recent Orders</h5>
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
          <div className="row mt-2">
          <div className="col-6">
 {/* revenue */}
 <div className="card p-5 col-auto">
              <div className="d-flex mt-0 flex-column">
                <BsCashCoin className="text-success h1 opacity-75 mb-0 mx-2 carddicon" />
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
          </div>
          <div className="col-6">
{/* revenue */}
<div className="card p-5 col-auto">
              <div className="justify-content-center d-flex mt-0 flex-column align-items-center">
                <BsCashCoin className="text-success h5 mb-0 mx-2" />
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
          </div>

          </div>
        </div>

        <div className="col-4">
          {/* card */}
          <div className=" row main_dashboard_row d-flex flex-column">
            {/* revenue */}
            <div className="card p-4 col-auto">
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
            <div className="card p-4 col-auto">
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
            <div className="card p-4 col-auto ">
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
          </div>
        </div>
        {/* section end */}

{/* table sectiob */}
        {/*table 1  */}
        <div className="row mt-4">
          <div className="col-6">
            <div className=" card p-3">
              <h5>Best Selling Products</h5>
              <Table responsive>
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
                      <h6>$29.00</h6>
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
                      <h6>$29.00</h6>
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
                      <h6>$29.00</h6>
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
                </tbody>
              </Table>
            </div>
          </div>
          {/*table 1  end  */}
          {/*table 2  */}
          <div className="col-6">
            <div className=" card p-3">
              <h5>Top Seller</h5>
              <Table responsive>
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


      </div>
    </div>
  );
}

export default Dashboard;
