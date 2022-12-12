import React, { Fragment,useState } from "react";
import {  useNavigate } from "react-router-dom";
import "./login.css";
import MainButton from "../common/button";
import Logo from "../../../images/logo.png";
import axios from "axios";
const Forgot = () => {
  // const navigate = useNavigate();
  const[email,setEmail]=useState('')
  // const[forgotInfo,setForgotInfo]=useState([]);
  const forgotInfo=(e)=>{
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_BASEURL}/admin_forget_password`, 
    {
      admin_email:email,
  
  }).then((response) => {
  });
  }
 
const handleFormChange =(e)=>{
  setEmail(e.target.value);
  // setForgotInfo({...forgotInfo,[e.target.name]: e.target.value})
}
console.log("forrrr"+JSON.stringify(email))
  return (
    <Fragment>
      <div className="for_scrol">
        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-4 col-lg-6 m-auto">
              <div className="heading_logo text-center">
                <div className="logo">
                  <img src={Logo} alt={'apnaorganic'}/>
                </div>
                <div className="heading_line">
                  <h3>Sell On Apna Organic</h3>
                </div>
              </div>
              <div className="admin_login_form">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h4>Forgot your password</h4>
                  </div>

                  <div className="input-box">
                    <form className="row g-4">
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            onChange={(e) => handleFormChange(e)} value={email} name={'admin_email'}
                            placeholder="Email Address"
                          />
                          <label for="email">Email Address</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <MainButton
                          btntext={"Forgot password"}
                          btnclass={"w-100 btn-success btn"}
                          onClick={forgotInfo}
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Forgot;
