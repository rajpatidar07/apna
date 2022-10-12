import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
// import Banner from '../../Photos/login.png'
// import Footer from '../part/footer'
// import Header from '../part/header'
// import Breadcumb from '../UI/beadcumb'

const Login = () => {
  return (
    <Fragment>
      <div class="row">
        <div class="col-xxl-4 col-xl-5 col-lg-6 m-auto login_form">
          <div class="log-in-box">
            <div class="log-in-title">
              <h3>Welcome To Apna Organic</h3>
              <h4>Log In Your Account</h4>
            </div>

            <div class="input-box">
              <form class="row g-4">
                <div class="col-12">
                  <div class="form-floating theme-form-floating log-in-form">
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      placeholder="Email Address"
                    />
                    <label for="email">Email Address</label>
                  </div>
                </div>

                <div class="col-12">
                  <div class="form-floating theme-form-floating log-in-form">
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label for="password">Password</label>
                  </div>
                </div>

                <div class="col-12">
                  <div class="forgot-box d-flex ">
                    <div class="form-check ps-0 m-0 remember-box">
                      <input
                        class="checkbox_animated check-box"
                        type="checkbox"
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Remember me
                      </label>
                    </div>
                    <NavLink to="/forgot" class="forgot">
                      Forgot Password?
                    </NavLink>
                  </div>
                </div>

                <div class="col-12">
                  <button
                    class="btn btn-animation w-100 justify-content-center"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>

            <div class="other-log-in">
              <h6>or</h6>
            </div>

            <div class="log-in-button">
              <ul>
                <li>
                  <a
                    href="https://www.google.com/"
                    class="btn google-button w-100"
                  >
                    Log In with Google
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/"
                    class="btn google-button w-100"
                  >
                    Log In with Facebook
                  </a>
                </li>
              </ul>
            </div>

            <div class="other-log-in">
              <h6></h6>
            </div>

            <div class="sign-up-box">
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
