import Button from "react-bootstrap/Button";
import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Bell, Search } from "react-bootstrap-icons";
import profile from "../../images/user.jpg";
import { BsBox, BsShopWindow } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { BiTransfer } from "react-icons/bi";
function AdminHeader() {
  return (
    <div className="container content_top_container">
      <div className="row content_top_row ">
        <div className="search_bar left_side col-md-6">
          <InputGroup className="">
            <Form.Control
              placeholder="Seach"
              aria-label="Seach"
              aria-describedby="basic-addon2"
              variant="outline-success"
            />
            <Button variant="outline-success" id="button-addon2">
              <Search />
            </Button>
          </InputGroup>
        </div>
        <div className="search_bar right_side col-md-6">
          <Dropdown className="notification_div">
            <Dropdown.Toggle
              className="btn-lg btn"
              variant="outline-success"
              id="dropdown-basic"
            >
              <div className="notification_alart">
                <span className="bg-danger">3</span>
              </div>
              <Bell />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="d-flex justify-content-between p-2 notification_heading">
                <div>
                  <h5>Notifications</h5>
                </div>
                <div>
                  {" "}
                  <span className="badges bg-danger">New</span>
                </div>
              </div>
              <Dropdown.Item href="#/action-1" className="notification_box">
                <div className="d-flex">
                  <BsShopWindow className="icon" />
                  <div>
                    <h6 className="d-inline notification_name">
                      New Vendor Listed
                    </h6>
                    <p className="notification_text">
                      Lorem ipsum dolor sit amet, consectetuer elit.
                    </p>
                    <span className="lead notification_time">
                      30 minutes ago
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-1" className="notification_box">
                <div className="d-flex">
                  <BiTransfer className="icon" />
                  <div>
                    <h6 className="d-inline notification_name">
                      New Transactions
                    </h6>
                    <p className="notification_text">
                      Lorem ipsum dolor sit amet, consectetuer elit.
                    </p>
                    <span className="lead notification_time">
                      30 minutes ago
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
              <Dropdown.Item href="#/action-1" className="notification_box">
                <div className="d-flex">
                  <BsBox className="icon" />
                  <div>
                    <h6 className="d-inline notification_name">
                      Order Completed
                    </h6>
                    <p className="notification_text">
                      Lorem ipsum dolor sit amet, consectetuer elit.
                    </p>
                    <span className="lead notification_time">
                      30 minutes ago
                    </span>
                  </div>
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="profile_div">
            <Dropdown.Toggle
              className="btn-lg p-0"
              variant=""
              id="dropdown-basic"
            >
              <img src={profile} className="profile" alt="Apna Organic Store" />
              <span className="px-2">Gourav</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" className="profile_list py-2">
                <CgProfile />
                profile
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" className="profile_list py-2">
                <AiOutlineSetting />
                Setting
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3" className="profile_list py-2">
                <FiLogOut />
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
