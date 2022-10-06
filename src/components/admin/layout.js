import React from "react";
import AdminSidebar from "./sidebar";
import Dashboard from "./dashboard";
import Product from "./product";
import Orders from "./orders";
import AdminHeader from "./header";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Productdetail from "./products/productdetail";
import Addproduct from "./products/addproduct";

function AdminLayout() {
  return (
    <div className="container-fluid p-0">
      <Router>
        <div className="row m-0 page_main_row">
          <div className="col-lg-2 col-md-3 col-sm-4 sidebar_main_div p-0">
            <AdminSidebar />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-8">
            <AdminHeader />
            <div className="main_content_div">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product" element={<Product />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addproduct" element={<Addproduct />} />
                <Route path="/productdetail" element={<Productdetail />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default AdminLayout;
