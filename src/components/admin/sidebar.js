import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import Accordion from "react-bootstrap/Accordion";
import { FaBeer } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { BiShoppingBag, BiTransfer, BiCategory } from "react-icons/bi";
import { BsBox, BsShopWindow } from "react-icons/bs";
import { TbFileInvoice } from "react-icons/tb";
import { RiCustomerService2Line, RiAdminLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
// import {GrUserAdmin} from 'react-icons/gr';

// import Dashboard from './dashboard';
// import Product from './product';
// import Orders from './orders';
function AdminSidebar() {
  return (
    <div className="main_sidebar">
      <div className="logo_div">
        <Link to="/dashboard">
          <img src={logo} className="logo" alt="Apna Organic Store" />
        </Link>
      </div>
      <hr />
    <div className="sidebar_links">
      <Accordion defaultActiveKey="0" variant="pills">
        <Accordion.Item eventKey="0">
          <Accordion>
            <Link to="/dashboard" className="nav-link nav_heading active">
              <MdOutlineDashboard /> Dashboard
            </Link>
          </Accordion>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <Link className="nav-link nav_heading">
              <BiShoppingBag />
              Product
            </Link>
          </Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/product" className="nav-link">
                  Product List
                </Link>
              </li>
              <li>
                <Link to="/soldproduct" className="nav-link ">
                  Sold Product
                </Link>
              </li>
              <li>
                <Link to="/expiredproduct" className="nav-link ">
                  Expired Product
                </Link>
              </li>
              <li>
                <Link to="/featureproduct" className="nav-link ">
                  Featured Product
                </Link>
              </li>
              <li>
                <Link to="/pendingproduct" className="nav-link ">
                  Pending Product
                </Link>
              </li>
              <li>
                <Link to="/promotionproduct" className="nav-link ">
                  Promotion Product
                </Link>
              </li>
              <li>
                <Link to="/offerproduct" className="nav-link ">
                  {" "}
                  Offer Product{" "}
                </Link>
              </li>
              <li>
                <Link to="/deletedproduct" className="nav-link ">
                  {" "}
                  Deleted Product{" "}
                </Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" active>
          <Accordion>
            {" "}
            <Link to="/orders" className="nav-link nav_heading">
              <BsBox /> Orders
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion>
            <Link to="/transactions" className="nav-link nav_heading">
              <BiTransfer /> Transactions
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion>
            <Link to="/vendors" className="nav-link nav_heading">
              <BsShopWindow /> Vendor List
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion>
            {" "}
            <Link to="/category" className="nav-link nav_heading">
              <BiCategory /> Category List
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion>
            <Link to="/invoice" className="nav-link nav_heading">
              <TbFileInvoice /> Invoices
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion.Header>
            <Link className="nav-link nav_heading">
              <BiShoppingBag />
              Report
            </Link>
          </Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/revenuereport" className="nav-link">
                  Revenue
                </Link>
              </li>
              <li>
                <Link to="/orderreport" className="nav-link ">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/productreport" className="nav-link ">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categoryreport" className="nav-link ">
                  Category
                </Link>
              </li>
              <li>
                <Link to="/couponreport" className="nav-link ">
                  Coupons
                </Link>
              </li>
              <li>
                <Link to="/taxreport" className="nav-link ">
                  Taxes
                </Link>
              </li>
              <li>
                <Link to="/stockreport" className="nav-link ">
                  {" "}
               Stock
                </Link>
              </li>
              {/* <li>
                <Link to="/deletedproduct" className="nav-link ">
                  {" "}
                  Deleted Product{" "}
                </Link>
              </li> */}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion>
            <Link to="/coupon" className="nav-link nav_heading">
              <TbFileInvoice /> Coupons
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="10">
          <Accordion>
            <Link to="/review" className="nav-link nav_heading">
              <TbFileInvoice /> Review
            </Link>
          </Accordion>
        </Accordion.Item><Accordion.Item eventKey="11">
          <Accordion>
            <Link to="/delivery" className="nav-link nav_heading">
              <TbFileInvoice /> Delivery
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="12">
          <Accordion>
            {" "}
            <Link to="/complaint" className="nav-link nav_heading">
              <RiCustomerService2Line /> Complaints
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="13">
          <Accordion>
            {" "}
            <Link to="/components" className="nav-link nav_heading">
              <FaBeer /> Components
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="14">
          <Accordion>
            <Link to="/add_admin" className="nav-link nav_heading">
              <RiAdminLine /> Add/Update Admin
            </Link>
          </Accordion>
        </Accordion.Item>

        <Accordion.Item eventKey="15">
          <Accordion.Header>
            {" "}
            <Link to="/add_admin" className="nav-link nav_heading">
              <AiOutlineSetting />
              Setting
            </Link>
          </Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/home_manager" className="nav-link">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/" className="nav-link ">
                  Content Manager
                </Link>
              </li>
              <li>
                <Link to="/banner" className="nav-link ">
                  Banner Manager
                </Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
    </div>
  );
}

export default AdminSidebar;
