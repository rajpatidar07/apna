import React  from 'react';
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
        <Link  to='/dashboard'>
        <img src={logo} className="logo" alt="Apna Organic Store" />
        </Link>
      </div>
      <hr/>
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
       
      </ul>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </div>
  );
}

export default AdminSidebar;