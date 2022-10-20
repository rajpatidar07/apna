import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./setting.css";
// import Iconbutton from "./common/iconbutton";
import Iconbutton from "../common/iconbutton";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Input from "../common/input";

function Banner() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <h2>Banner Manager</h2>
      <div className="main_body  card">
        <Tabs
          defaultActiveKey="home"
          id="justify-tab-example"
          className="my-3 ms-3"
          justify
        >
          <Tab eventKey="home" title="Home" className="iframe_tabs">
            <iframe
              src="https://www.we2code.com/"
              title="W3Schools Free Online Web Tutorials"
              scrolling="no"
            />
            <div className="product_page_uploadbox upload_file_1 p-4 d-flex flex-column">
              <div className="product_page_uploadbox_one">
                <Input type={"file"} inputclass={"hiddeninput"} />
                <Iconbutton
                  btntext={"Upload"}
                  btnclass={"button main_outline_button"}
                  Iconname={<AiOutlineCloudUpload />}
                />
              </div>
              <div>
                <p>615 &times; 556</p>
              </div>
            </div>
            <div className="product_page_uploadbox upload_file_2 p-4 d-flex flex-column">
              <div className="product_page_uploadbox_one">
                <Input type={"file"} inputclass={"hiddeninput"} />
                <Iconbutton
                  btntext={"Upload"}
                  btnclass={"button main_outline_button"}
                  Iconname={<AiOutlineCloudUpload />}
                />
              </div>
              <div>
                <p>615 &times; 556</p>
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Product" className="iframe_tabs">
            <iframe
              src="https://www.we2code.com/"
              title="W3Schools Free Online Web Tutorials"
              scrolling="no"
            />
            <div className="product_page_uploadbox upload_file_1 p-4 d-flex flex-column">
              <div className="product_page_uploadbox_one">
                <Input type={"file"} inputclass={"hiddeninput"} />
                <Iconbutton
                  btntext={"Upload"}
                  btnclass={"button main_outline_button"}
                  Iconname={<AiOutlineCloudUpload />}
                />
              </div>
              <div>
                <p>615 &times; 556</p>
              </div>
            </div>
            <div className="product_page_uploadbox upload_file_2 p-4 d-flex flex-column">
              <div className="product_page_uploadbox_one">
                <Input type={"file"} inputclass={"hiddeninput"} />
                <Iconbutton
                  btntext={"Upload"}
                  btnclass={"button main_outline_button"}
                  Iconname={<AiOutlineCloudUpload />}
                />
              </div>
              <div>
                <p>615 &times; 556</p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default Banner;
