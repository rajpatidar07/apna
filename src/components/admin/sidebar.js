import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import Accordion from "react-bootstrap/Accordion";

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
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </Accordion>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Product</Accordion.Header>
          <Accordion.Body>
            <ul class="sidebar_navigation_bar">
              <li>
                <Link to="/productdetail" className="nav-link">
                  Product Detail
                </Link>
              </li>
              <li>
                <Link to="/soldproduct" className="nav-link">
                  Sold Product
                </Link>
              </li>
              <li>
                <Link to="/expiredproduct" className="nav-link">
                  Expired Product
                </Link>
              </li>
              <li>
                <Link to="/featureproduct" className="nav-link">
                  Featured Product
                </Link>
              </li>
              <li>
                <Link to="/pendingproduct" className="nav-link">
                  Pending Product
                </Link>
              </li>
              <li>
                <Link to="/promotionproduct" className="nav-link">
                  Promotion Product
                </Link>
              </li>
              <li>
                <Link to="/offerproduct" className="nav-link">
                  {" "}
                  Offer Product{" "}
                </Link>
              </li>
              <li>
                <Link to="/deletedproduct" className="nav-link">
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
            <Link to="/orders" className="nav-link">
              orders
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion>
            <Link to="/transactions" className="nav-link">
              Transactions
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion>
            <Link to="/vendors" className="nav-link">
              Vendor List
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion>
            {" "}
            <Link to="/category" className="nav-link">
              Category List
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="7">
          <Accordion>
            <Link to="/invoice" className="nav-link">
              Invoices
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="8">
          <Accordion>
            {" "}
            <Link to="/complaint" className="nav-link">
              Complaints
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="9">
          <Accordion>
            {" "}
            <Link to="/components" className="nav-link">
              Components
            </Link>
          </Accordion>
        </Accordion.Item>
        <Accordion.Item eventKey="10">
          <Accordion>
            <Link to="/add_admin" className="nav-link">
              Add/Update Admin
            </Link>
          </Accordion>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default AdminSidebar;
