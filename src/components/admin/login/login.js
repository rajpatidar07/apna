import React, { Fragment } from "react";
import {  NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import MainButton from "../common/button";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="row">
        <div className="col-xxl-4 col-xl-5 col-lg-6 m-auto admin_login_form">
          <div className="log-in-box">
            <div className="log-in-title">
              <h3>Welcome To Apna Organic</h3>
              <h4>Log In Your Account</h4>
            </div>

            <div className="input-box">
              <form className="row g-4">
                <div className="col-12">
                  <div className="form-floating theme-form-floating log-in-form">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Email Address"
                    />
                    <label for="email">Email Address</label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-floating theme-form-floating log-in-form">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label for="password">Password</label>
                  </div>
                </div>

                <div className="col-12">
                  <div className="forgot-box d-flex justify-content-between">
                    <div className="form-check ps-0 m-0 remember-box">
                      <input
                        className="checkbox_animated check-box"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label className="form-check-label" for="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                    <NavLink to="/forgot" className="forgot">
                      Forgot Password?
                    </NavLink>
                  </div>
                </div>

                <div className="col-12">
                
                  <MainButton btntext={"Login"}  btnclass={"w-100 btn-success btn"} onClick={()=>{navigate('/dashboard')}} />
                </div>
              </form>
            </div>

            <div className="other-log-in">
              <h6>OR</h6>
            </div>

            <div className="log-in-button">
              <ul classNameName="p-0">
                <li>
                  <a
                    href="https://www.google.com/"
                    className="btn google-button w-100"
                  >
                    Log In with Google
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/"
                    className="btn google-button w-100"
                  >
                    Log In with Facebook
                  </a>
                </li>
              </ul>
            </div>

            <div className="other-log-in">
                          </div>

            <div className="sign-up-box">
              <h4>Don't have an account?</h4>
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default Login;
