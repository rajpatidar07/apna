import React from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/logo.png';
import Accordion from 'react-bootstrap/Accordion';
// import Dashboard from './dashboard';
// import Product from './product';
// import Orders from './orders';
function AdminSidebar() {
  return (
    <div className="main_sidebar">
      <div className="logo_div">
        <Link to='/dashboard'>
          <img src={logo} className="logo" alt="Apna Organic Store" />
        </Link>
      </div>
      <hr />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Dashboard</Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
              </li>
              <li>
                <Link to="/product" className="nav-link">product</Link>
              </li>
              <li>
                <Link to="/orders" className="nav-link">orders</Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Product</Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/product" className="nav-link">Product</Link>
              </li>
              <li>
                <Link to="/addproduct" className="nav-link">Add Product</Link>
              </li>
              <li>
                <Link to="/productdetail" className="nav-link">Product Detail</Link>
              </li>
              <li>
                <Link to="/soldproduct" className="nav-link">Sold Product</Link>
              </li>
              <li>
                <Link to="/expiredproduct" className="nav-link">Expired Product</Link>
              </li>
              <li>
                <Link to="/featureproduct" className="nav-link">Featured Product</Link>
              </li>
              <li>
                <Link to="/pendingproduct" className="nav-link">Pending Product</Link>
              </li>
              <li>
                <Link to="/promotionproduct" className="nav-link">Promotion Product</Link>
              </li>
              <li>
                <Link to="/offerproduct" className="nav-link"> Offer Product </Link>
              </li>
              <li>
                <Link to="/deletedproduct" className="nav-link"> Deleted Product </Link>
              </li>

            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Vendor</Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/vendors" className="nav-link">Vendor List</Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Category</Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/category" className="nav-link">Category List</Link>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <ul class="sidebar_navigation_bar">
          <li>
            <Link to="/components" className="nav-link">Components</Link>
          </li>
        </ul>
      </Accordion>
    </div>
  );
}

export default AdminSidebar;