import React, { Fragment,useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";
import MainButton from "../common/button";
import Logo from "../../../images/logo.png";
import axios from "axios";
const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [validated, setValidated] = useState(false);
  const [error,setError]=useState(true);
  const onValueChange = (e) => {
    setEmail(e.target.value);
  };
  const onPasswordChange=(e)=>{
    setPassword(e.target.value );
  }
  const LoginCheck = () =>{
    localStorage.setItem("loginid",email);
    localStorage.setItem("password",password);

    navigate('/') 
  }
   const handleSubmit = ((e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false ) {
      e.preventDefault();
    e.stopPropagation();
    setError(false);
    }
   else{
    axios.post(`${process.env.REACT_APP_BASEURL}/admin_login`,
        {
        admin_email:email,
        admin_password:password
        }
        )
        .then((response) => {
          if(response.data === true){
           
            LoginCheck();

          }
          else{
            setError(false);
          }
        });
   }
    e.preventDefault();
  });

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
                    <h4>Log In Your Account</h4>
                  </div>
 <div className="input-box">
                    <form className="row g-4"  onSubmit={handleSubmit}>
                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                          required
                          onChange={(e) => onValueChange(e)}
                            type="email"
                            className="form-control"
                            name={"admin_email"}
                            value={email}
                            placeholder="Email Address"
                          />
                          {error===false ?
                           <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Enter Your Email
                    </p>:null}
                          <label htmlFor="email">Email Address</label>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-floating theme-form-floating log-in-form">
                          <input
                          required
                          onChange={(e) => onPasswordChange(e)}
                            type="password"
                            className="form-control"
                        name={"admin_password"}
                            value={password}
                            placeholder="Password"
                          />
                          {error===false ?
                            <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please Enter Your Password
                    </p>:null}
                          <label htmlFor="password">Password</label>
                        </div>
                      </div>

                      <div className="col-12 py-2">
                        <div className="forgot-box d-flex justify-content-between">
                          <div className="form-check ps-0 m-0 remember-box">
                            <input
                              className="checkbox_animated check-box"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Remember me
                            </label>
                          </div>
                          <NavLink to="/forgot" className="forgot">
                            Forgot Password?
                          </NavLink>
                        </div>
                      </div>

                      <div className="col-12">
                        <MainButton
                          btntext={"Login"}
                          btnclass={"w-100 btn-success btn"}
                        ></MainButton>
                      </div>
                    </form>
                  </div>

                  <div className="other-log-in">
                    <h6>OR</h6>
                  </div>

                  <div className="log-in-button">
                    <ul className="p-0">
                      <li>
                        <a
                          href="https://www.google.com/"
                          className="btn google-button w-100"
                        >
                          {" "}
                          <button className="button main_outline_button w-100">
                            Log In with Google
                          </button>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.facebook.com/"
                          className="btn google-button w-100"
                        >
                          <button className="button main_outline_button w-100">
                            Log In with Facebook
                          </button>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="other-log-in"></div>

                  <div className="sign-up-box">
                    <NavLink to="/change_password">Reset Password</NavLink>
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
export default Login;
