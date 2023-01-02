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
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
function AdminHeader() {
  let loginid = localStorage.getItem("loginid")
  let pass=localStorage.getItem("password");
  // const formRef = useRef();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newpassword, setnewPassword] = useState("");
  const onEmailChange=(e)=>{
    setEmail(e.target.value);
    // setnewPassword(e.target.value)
  }
  const onPasswordChange=(e)=>{
    setPassword(e.target.value);
  }
  const newPass = (e, id) => {
    setnewPassword(e.target.value);
  };
  const LoginForm=(e)=>{
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_BASEURL}/update_password`,
    {
    admin_email:loginid,
    admin_password:pass,
    new_admin_password:newpassword
  }
  ).then((response) => {
    // console.log("possttttttt------"+JSON.stringify(response))
  });
  setEmail("");
  setPassword("");
  e.preventDefault();
  }
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
              <Dropdown.Item href="#/action-2" className="profile_list py-2" onClick={handleShow}>
             
                <AiOutlineSetting />
                Setting
              </Dropdown.Item>
              <Dropdown.Item href="/login" className="profile_list py-2">
                <FiLogOut />
                LogOut
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={LoginForm}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control  onChange={(e) => onEmailChange(e)} name={"admin_email"} value={loginid} type="email" placeholder="Enter Email"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Old Password</Form.Label>
        <Form.Control onChange={(e) => onPasswordChange(e)} value={pass}  name={"admin_password"} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Update Password</Form.Label>
        <Form.Control type="password" name={"new_admin_password"} value={newpassword} onChange={(e) => newPass(e)} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
