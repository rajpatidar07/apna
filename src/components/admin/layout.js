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
import Invoice from "./invoice/detail";
import Soldproduct from "./products/soldproduct";
import Featuredproduct from "./products/featuredproduct";
import Expiredproduct from "./products/expiredproduct";
import Pendingproduct from "./products/pendingproduct";
import Promotionproduct from "./products/promotionproduct";
import Offerproduct from "./products/offerproduct";
import Deletedproduct from "./products/deletedproduct";
import OrderDetail from "./order/order_detail";
import VendorsList from "./vendor/vendors";
import AdminComponents from "./components";
import "../../style/common.css";
import Login from "./login/login";
import Footer from "./login/footer";
import ChangePassword from "./login/change_password";
import Forgot from "./login/forgot";
import CategoryList from "./category/category";
import Admin from "./add_update_admin/add_update_admin";
import InvoiceList from "./invoice/invoices";
import Complaint from "./complaint/complaint";
import Transactions from "./transactions/transactions";
import TranDetail from "./transactions/transactions_detail";
import Banner from "./setting/banner_manager";
import Coupon from "./coupon/coupon";
import Home from "./setting/home_manager";
import Review from "./review/review";
import Delivery from "./delivery/delivery";
import RevenueReport from "./report/revenue";
import ProductReport from "./report/product";
import OrderReport from "./report/order";
import CouponReport from "./report/coupon";
import CategoryReport from "./report/category";
import StockReport from "./report/stock";
import TaxesReport from "./report/taxes";
import ContentManager from "./setting/content_manager";
import CustomerReport from "./report/customer";
import StoreReport from "./report/store";
import BlogList from "./blog/add_blog";
function AdminLayout() {
  // const location = useLocation();
  console.log("-------" + window.location.pathname);
  return (
    <div className="container-fluid p-0">
      <Router>
     
          <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/change_password" element={<ChangePassword />} />
            <Route path="/forgot" element={<Forgot/>} />
          </Routes>
    
          <div className="row m-0 page_main_row">
            <div className="col-lg-2 col-md-3 col-sm-4 sidebar_main_div p-0">
              <AdminSidebar />
            </div>
            <div className="col-lg-10 col-md-9 col-sm-8">
              <AdminHeader/>
              <div className="main_content_div">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/addproduct" element={<Addproduct />} />
                  <Route path="/productdetail" element={<Productdetail />} />
                  <Route path="/invoice" element={<InvoiceList/>} />
                  <Route path="/invoice_detail" element={<Invoice />} />
                  <Route path="/soldproduct" element={<Soldproduct />} />
                  <Route path="/featureproduct" element={<Featuredproduct />} />
                  <Route path="/expiredproduct" element={<Expiredproduct />} />
                  <Route path="/pendingproduct" element={<Pendingproduct />} />
                  <Route path="/promotionproduct" element={<Promotionproduct />}/>
                  <Route path="/offerproduct" element={<Offerproduct />} />
                  <Route path="/deletedproduct" element={<Deletedproduct />} />
                  <Route path="/order_detail" element={<OrderDetail />} />
                  <Route path="/footer" element={<Footer />} />
                  <Route path="/vendors" element={<VendorsList />} />
                  <Route path="/add_blog" element={<BlogList/>} />
                  
                  <Route path="/components" element={<AdminComponents />} />
                  <Route path="/add_admin" element={<Admin />} />
                  <Route path="/category" element={<CategoryList />} />
                  <Route path="/complaint" element={<Complaint />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/transactions_detail" element={<TranDetail />} />
                  <Route path="/home_manager" element={<Home />} />
                  <Route path="/banner" element={<Banner />} />
                  <Route path="/coupon" element={<Coupon />} />
                  <Route path="/review" element={<Review />} />
                  <Route path="/delivery" element={<Delivery />} />
                  {/* report */}
                  <Route path="/revenuereport" element={<RevenueReport />} />
                  <Route path="/productreport" element={<ProductReport />} />
                  <Route path="/orderreport" element={<OrderReport />} />
                  <Route path="/couponreport" element={<CouponReport />} />
                  <Route path="/stockreport" element={<StockReport />} />
                  <Route path="/taxreport" element={<TaxesReport />} />
                  <Route path="/categoryreport" element={<CategoryReport />} />
                  <Route path="/content_manager" element={<ContentManager />} />
                  <Route path="/customerreport" element={<CustomerReport />} />
                  <Route path="/storereport" element={<StoreReport />} />
                </Routes>
              </div>
            </div>
          </div>
       
      </Router>
    </div>
  );
}

export default AdminLayout;
