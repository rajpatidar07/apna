import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./login.css";
import MainButton from "../common/button";
import Logo from "../../../images/logo.png";


const Signup = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="for_scrol">
        <div className="container">
          <div className="row mt-5">
            <div className="col-xl-4 col-lg-6 m-auto">
              <div className="heading_logo text-center">
                <div className="logo">
                  <img src={Logo}></img>
                </div>
                <div className="heading_line">
                  <h3>Sell On Apna Organic</h3>
                </div>
              </div>
              <div className="admin_login_form">
                <div className="log-in-box">
                  <div className="log-in-title">
                    <h4>Create New Account</h4>
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
                          <label for="email">Full Name</label>
                        </div>
                      </div>
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

                      <div className="col-12 py-2">
                        <div className="forgot-box">
                          <div className="form-check ps-0 m-0 remember-box">
                            <input
                              className="checkbox_animated check-box"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                            I agree with <span>Terms </span> and <span>Privacy</span>
                            </label>
                          </div>
                                                  </div>
                      </div>

                      <div className="col-12">
                        <MainButton
                          btntext={"Sign Up"}
                          btnclass={"w-100 btn-success btn"}
                          onClick={() => {
                            navigate("/dashboard");
                          }}
                        />
                      </div>
                    </form>
                  </div>

                  <div className="other-log-in py-4">
                    <h6>OR</h6>
                  </div>

                  <div className="log-in-button">
                    <ul classNameName="p-0">
                      <li>
                        <a
                          href="https://www.google.com/"
                          className="btn google-button w-100"
                        >
                        <button className='button main_outline_button w-100'>Log In with Google</button>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/"
                          className="btn google-button w-100"
                        >
                        <button className='button main_outline_button w-100'>Log In with Facebook</button>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="other-log-in"></div>

                  <div className="sign-up-box">
                    <h4>Already have an account?</h4>
                    <NavLink to="/signup">Sign Up</NavLink>
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
export default Signup;
