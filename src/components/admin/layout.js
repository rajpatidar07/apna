import React from "react";
import AdminSidebar from "./sidebar";
import Dashboard from "./dashboard";
import Product from "./product";
import Orders from "./orders";
import AdminHeader from "./header";
import { Routes, useLocation } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Productdetail from "./products/productdetail";
import Addproduct from "./products/addproduct";
import Invoice from "./invoice/detail";
import Soldproduct from "./products/soldproduct";
import Featuredproduct from "./products/featuredproduct";
import Expiredproduct from "./products/expiredproduct";
import Pendingproduct from "./products/pendingproduct";
import Promotionproduct from "./products/promotionproduct";
import Offerproduct from "./products/offerproduct";
import Deletedproduct from "./products/deletedproduct";
import Order_detail from "./order/order_detail";
import VendorsList from "./vendor/vendors";
import AdminComponents from "./components";
import "../../style/common.css";
import Login from "./login/login";
import Footer from "./login/footer";
import ChangePassword from "./login/change_password";
import Forgot from "./login/forgot";
import CategoryList from "./category/category";
import Admin from "./add_update_admin/add_update_admin";
import Invoices from "./invoice/invoices";
import InvoiceList from "./invoice/invoices";
import Complaint from "./complaint/complaint";
import Transactions from "./transactions/transactions";
import Tran_Detail from "./transactions/transactions_detail";
import Banner from "./setting/banner";
import Home from "./setting/home";

function AdminLayout() {
  // const location = useLocation();
  console.log("-------" + window.location.pathname);
  return (
    <div className="container-fluid p-0">
      <Router>
        {window.location.pathname === "/" ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/forgot" element={<Forgot />} />
          </Routes>
        ) : (
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
                  <Route path="/invoice" element={<InvoiceList />} />
                  <Route path="/invoice_detail" element={<Invoice />} />
                  <Route path="/soldproduct" element={<Soldproduct />} />
                  <Route path="/featureproduct" element={<Featuredproduct />} />
                  <Route path="/expiredproduct" element={<Expiredproduct />} />
                  <Route path="/pendingproduct" element={<Pendingproduct />} />
                  <Route
                    path="/promotionproduct"
                    element={<Promotionproduct />}
                  />
                  <Route path="/offerproduct" element={<Offerproduct />} />
                  <Route path="/deletedproduct" element={<Deletedproduct />} />
                  <Route path="/order_detail" element={<Order_detail />} />
                  <Route path="/footer" element={<Footer />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/vendors" element={<VendorsList />} />
                  <Route path="/components" element={<AdminComponents />} />
                  <Route path="/add_admin" element={<Admin />} />
                  <Route path="/category" element={<CategoryList />} />
                  <Route path="/complaint" element={<Complaint />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route
                    path="/transactions_detail"
                    element={<Tran_Detail />}
                  />
                  <Route path="/banner" element={<Banner />} />
                  <Route path="/home_manager" element={<Home />} />
                </Routes>
              </div>
            </div>
          </div>
        )}
      </Router>
    </div>
  );
}

export default AdminLayout;
