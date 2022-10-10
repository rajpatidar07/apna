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
import Invoice from "./order/invoice";
import Soldproduct from "./products/soldproduct";
import Featuredproduct from "./products/featuredproduct";
import Expiredproduct from "./products/expiredproduct";
import Pendingproduct from "./products/pendingproduct";
import Promotionproduct from "./products/promotionproduct";
import Offerproduct from "./products/offerproduct";
import Deletedproduct from "./products/deletedproduct";
import Order_detail from "./order/order_detail";
import '../../style/common.css';
import Login from "./login/login";


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
            <div className="main_content_div" >
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product" element={<Product />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/addproduct" element={<Addproduct />} />
                <Route path="/productdetail" element={<Productdetail />} />
                <Route path="/invoice" element={<Invoice/>} />
                <Route path="/soldproduct" element={<Soldproduct/>} />
                <Route path="/featureproduct" element={<Featuredproduct />} />
                 <Route path="/expiredproduct" element={<Expiredproduct />} />
                <Route path="/pendingproduct" element={<Pendingproduct />} />
                 <Route path="/promotionproduct" element={<Promotionproduct />} />
                <Route path="/offerproduct" element={<Offerproduct />} />
                 <Route path="/deletedproduct" element={<Deletedproduct />} />
                 <Route path="/order_detail" element={<Order_detail/>}/>
                 <Route path="/login" element={<Login/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default AdminLayout;
