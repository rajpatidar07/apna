import React, { useEffect } from "react";
import "./order_detail.css";
import Profile from "../../../images/user.jpg";
import { AiOutlineFileText } from "react-icons/ai";
import { BsTelephoneFill, BsFillEnvelopeFill } from "react-icons/bs";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import moment from "moment";
const OrderDetail = () => {
  let totalorder=0;
  let orderid = localStorage.getItem("orderid")
  let userid= localStorage.getItem("userid")
  const[order,setOrder]=useState([]);
  const[productorder,setproductOrder]=useState([]);
  const[user,setUser]=useState([]);
  const [changstatuss, setchangstatuss] = useState('');
  const [searchdataa, setsearchDataa] = useState({
    status:"",
    created_on:""
    })
   
    const OnSearchChangee = (e) => {
      setsearchDataa({ ...searchdataa, [e.target.name]: e.target.value })
    }
   
    const onStatusChangee = (e) => {
      // e.prevantDefault();
      setchangstatuss(e.target.value)
      axios.put("http://192.168.29.108:5000/order_status_change", {
      status_change:e.target.value,
      id:`${orderid}`
        }).then((response) => {
        // setapicall(true)
      }).catch(function (error) {
        console.log(error);
      });
    }
  useEffect(()=>{
    axios.get(`http://192.168.29.108:5000/order_deteils?id=${orderid}`).then((response) => {
      setOrder(response.data);
      setproductOrder(response.data.product_types)
      UserData();
      // console.log("______uuuuu_____"+JSON.stringify(response.data))
      // setapicall(false)
    }).catch(function (error) {
      console.log(error);
    });
    
  },[])
  const UserData = () =>{
    axios.get(`http://192.168.29.108:5000/user_details?user_id=${userid}`).then((response) => {
      let data = response.data;
      setUser(data);
      console.log("______uuuuserdataa_____"+JSON.stringify(response.data))
      // setapicall(false)
    }).catch(function (error) {
      console.log(error);
    });
  }
  return (
    <div className="order_detail_page">
      <div className="order_detail">
        <h2>Orders Detail</h2>
        <div className="row">
          <div className="col-lg-8">
            <div className="left_side">
              <div className="top_bar d-flex justify-content-between text-center">
                <div className="order_id d-flex flex-column">
                  <div className="order_info_heading">
                    <span>#</span>Order Id
                  </div>
                  <div>
                        <span>{order.id}</span>
                    
                  </div>
                </div>
                <div className="d-flex flex-column text-center">
                  <div className="order_info_heading">Payment</div>
                  <div className="badge bg-success">{order.payment_mode}</div>
                </div>
                <div className="d-flex flex-column text-center">
                  <div className="order_info_heading">Order Status</div>
                
                      <Form.Select aria-label="Floating label select example"
                      onChange={onStatusChangee}
                      name='status'
                      // value={changstatuss}
                      >
                     <option>Select Order Status</option>
                     <option value="delivered" selected={order.status === 'delivered' ? true:false}>Delivered</option>
                   <option value="pending" selected={order.status === 'pending' ? true:false}>Pending</option>
                   <option value="approved" selected={order.status === 'approved' ? true:false}>Approved</option>
                   <option value="packed" selected= {order.status === 'packed' ? true:false}>Packed</option>
                   <option value="return" selected= {order.status === 'return' ? true:false}>Return</option>
                   <option value="cancel" selected= {order.status === 'cancel' ? true:false}>Cancelled</option>
         </Form.Select>
       
                 
                </div>
                <div className="d-flex flex-column text-center">
                  <div className="order_info_heading">Order Date & Time</div>
                  <div className="date_time">
                  {order.order_date} 
                  </div>
                </div>
              </div>
            </div>

            <div className="product_img_price">
              <div className="product_image_price"></div>

{(productorder || []).map(orderdata=>{
                    return(

              <div className="d-flex justify-content-between mb-3 align-items-center">

                <div className="product_img d-flex">
                  <img src="" alt="apnaorganic"/>
                  <div className="product_name_detial ps-3">
                    <h6>T-Shirt Blue</h6>
                    <p>color:blue</p>
                    <p>size: M</p>
                  </div>
                </div>

                <div className="product_price">{orderdata.price}₹</div>
                <div className="product_quantity">{orderdata.quantity}</div>
                <div className="total_amount">{orderdata.price*orderdata.quantity}</div>
               
              </div>
              )
            })} 
             
            </div>

            <div className="delivery_charges">
              <h5 className="pb-3">Delivery</h5>
              <div className="d-flex justify-content-between align-items-center">
                <div className="delivery_img d-flex ">
                  <img src="https://media.istockphoto.com/vectors/express-delivery-symbol-vector-id1175078000?b=1&k=20&m=1175078000&s=612x612&w=0&h=2Y5FLXleVSLyaEfZztp2Mhf2pVV6BbqNYkXYs1KHpik=" alt="apnaorganic"/>
                  <div className="delivery_componay ps-3">
                    <h6>E-Kart</h6>
                    <p>Speed post package</p>
                  </div>
                </div>
                <div className="delivery_payment">$20.00</div>
              </div>
            </div>
            <div className="payment_summary">
              <h5 className="pb-3">Payment Summary</h5>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>
                    Subtotal<span>({order.total_quantity} items)</span>
                  </p>
                </div>
                <div className="">{order.total_amount - (order.total_cgst + order.total_sgst )}₹</div>
              </div>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>Delivery Charges</p>
                </div>
                <div className="">00.00₹</div>
              </div>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>Tax</p>
                </div>
                <div className="">{order.total_cgst + order.total_sgst}₹</div>
              </div>
              <div className="payment_summary_total d-flex justify-content-between align-items-center">
                <div className="Subtotal">
                  <p>
                    <strong>Total paid by customer</strong>
                  </p>
                </div>
                <div className="">
                  <strong>{order.total_amount}₹</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="right_side">
              
              {user.map((userdata)=>{
                    return(
                      <div className="customer_name_address">
                      <div className="customer_info">
                  <div className="customer">Customer</div>
                  
                  <div className="customer_name_img d-flex py-3">
                    <img src={Profile} alt={'apnaorganic'}/>
                    <div className="customer_name ps-4 my-auto">
                      {userdata.first_name} {userdata.last_name}
                    </div>
                  </div>
                  <div className="customer_orders d-flex py-3">
                    <AiOutlineFileText className="order_icon p-1" />
                   
                    <div className="customer_orders_no ps-4 my-auto">
                       {/* {totalorder=Number(totalorder)+Number(orderdata.quantity)} */}
                    {order.total_quantity}
                    </div>
                  
                  </div>
                  
                </div>
                <div className="contact py-3">
                  <div className="contact_heading pb-3">
                    <h5>Contact Info</h5>
                  </div>
                  <div className="email py-2">
                    <BsFillEnvelopeFill />
                    <span>{userdata.email}</span>
                  </div>
                  <div className="number py-2">
                    <BsTelephoneFill />
                    <span>{userdata.phone_no}</span>
                  </div>
                </div>
                <div className="ship_Address py-3">
                  <h5>Ship Address</h5>
                  <div className="address">
                    <p> {userdata.first_name} {userdata.last_name}</p>
                    <p>{userdata.gender}</p>
                    <p>{userdata.date_of_birth}</p>
                    <p>{userdata.address}</p>
                    <p>{userdata.address2}</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>{userdata.phone_no}</p>
                  </div>
                </div>
                <div className="bill_Address py-3">
                  <h5>Bill Address</h5>
                  <div className="address">
                    <p>{userdata.first_name} {userdata.last_name}</p>
                    <p>{userdata.gender}</p>
                    <p>{userdata.date_of_birth}</p>
                    <p>{userdata.address}</p>
                    <p>{userdata.address2}</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>{userdata.phone_no}</p>
                  </div>
                </div>
                 </div>
                    )
                  })}

                  
                {/* <div className="customer_info">
                  <div className="customer">Customer</div>
                  
                  <div className="customer_name_img d-flex py-3">
                    <img src={Profile} alt={'apnaorganic'}/>
                    <div className="customer_name ps-4 my-auto">
                      Gourav Choudhary
                    </div>
                  </div>
                  <div className="customer_orders d-flex py-3">
                    <AiOutlineFileText className="order_icon p-1" />
                    <div className="customer_orders_no ps-4 my-auto">
                      2 Order
                    </div>
                  </div>
                </div>
                <div className="contact py-3">
                  <div className="contact_heading pb-3">
                    <h5>Contact Info</h5>
                  </div>
                  <div className="email py-2">
                    <BsFillEnvelopeFill />
                    <span>text159@gamil.com</span>
                  </div>
                  <div className="number py-2">
                    <BsTelephoneFill />
                    <span> +91 987654321</span>
                  </div>
                </div>
                <div className="ship_Address py-3">
                  <h5>Ship Address</h5>
                  <div className="address">
                    <p>Gourav Choudhary</p>
                    <p>45 Universal Tower</p>
                    <p>2nd Floor Scheme 54 PU4</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>+91 9876543210</p>
                  </div>
                </div>
                <div className="bill_Address py-3">
                  <h5>Bill Address</h5>
                  <div className="address">
                    <p>Gourav Choudhary</p>
                    <p>45 Universal Tower</p>
                    <p>2nd Floor Scheme 54 PU4</p>
                    <p>Indore Madhya Pradesh</p>
                    <p>Pin:452001</p>
                    <p>+91 9876543210</p>
                  </div>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetail;
