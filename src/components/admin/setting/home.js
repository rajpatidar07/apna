import React, { useState } from "react";
// import Input from "../common/input";
// import { FaFileInvoiceDollar } from "react-icons/fa";
import DataTable from "react-data-table-component";
// import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
// import { Link } from "react-router-dom";
import "../../../style/order.css";
import Demo0 from "./banner_header.png";
import Demo1 from "./banner02.png";
import Demo2 from "./banner03.png";
import "./setting.css";
// import Iconbutton from "./common/iconbutton";
import Iconbutton from "../common/iconbutton";
import {
  AiFillDelete,
  AiOutlineEdit,
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import Input from "../common/input";

const onButtonClick = () => {};
function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="banner_body">
      <h2>Banner Setting</h2>
      <div className="row">
        <div className="col-6">
          <div className="banner_box card">
            <img src={Demo0} />
            <div className="img_info d-flex justify-content-between text-center p-3">
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Location</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">Header</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Id</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">#header_top_left</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Size</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">586&times;286</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="hide_show">
                  <p className="mb-1">Upload</p>
                </div>
                <div className="on_off">
                  <div className="product_page_uploadbox_one">
                    <Iconbutton
                      btntext={"Upload"}
                      btnclass={"button outline_button"}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="hide_show">
                  <p className="mb-1">Hide/Show</p>
                </div>
                <div className="on_off">
                  <Form.Switch inline label="2" name="group1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6">
          <div className="banner_box card">
            <img src={Demo1} />
            <div className="img_info d-flex justify-content-between text-center p-3">
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Location</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">Header</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Id</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">#banner_center</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Size</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">586&times;286</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="hide_show">
                  <p className="mb-1">Upload</p>
                </div>
                <div className="on_off">
                  <div className="product_page_uploadbox_one">
                    <Iconbutton
                      btntext={"Upload"}
                      btnclass={"button outline_button"}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="hide_show">
                  <p className="mb-1">Hide/Show</p>
                </div>
                <div className="on_off">
                  <Form.Switch inline label="2" name="group1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6 mt-4">
          <div className="banner_box card">
            <img src={Demo2} />
            <div className="img_info d-flex justify-content-between text-center p-3">
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Location</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">Header</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Id</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">#footer</p>
                </div>  
              </div>
              <div className="d-flex flex-column">
                <div className="location">
                  <p className="mb-1">Size</p>
                </div>
                <div className="location_name">
                  <p className="mb-1">586&times;286</p>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="hide_show">
                  <p className="mb-1">Upload</p>
                </div>
                <div className="on_off">
                  <div className="product_page_uploadbox_one">
                    <Iconbutton
                      btntext={"Upload"}
                      btnclass={"button outline_button"}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <div className="hide_show">
                  <p className="mb-1">Hide/Show</p>
                </div>
                <div className="on_off">
                  <Form.Switch inline label="2" name="group1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
