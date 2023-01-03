import React, { useState, useRef } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "sweetalert/dist/sweetalert.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Iconbutton from "../common/iconbutton";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from "react";
import axios from "axios";
import { SendExclamationFill } from "react-bootstrap-icons";

let categoryArray = [];
const EmailSend = () => {
  const formRef = useRef();

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = (e, id) => {
    // console.log("gggggggggggggg"+e)

    if (e === "add") {
      setShow(e);
    }
  };


  const [emaildata, setEmaildata] = useState({});
  const [userType,setUsertype]=useState("")
  const [emailType,setEmailtype]=useState("")
  const [addStatus,setaddStatus]=useState("")
  const [emailTitle,setEmailTitle]=useState("")
  const [textMessage,setTextMessage]=useState("")
  const [testEmail,setTestEmail]=useState("")
  const[emailText,setEmailText]=useState("")


  const columns = [
    {
      name: "Email Type",
      selector: (row) => row.email_type,
      sortable: true,
    },
    {
      name: "User Type",
      selector: (row) => row.user_type,
      sortable: true,
    },

    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <div>
          <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
            <Form.Select aria-label="Default select example">
              <option>Status</option>
              <option value="1">Send</option>
              <option value="2">Hold</option>
            </Form.Select>
          </Form.Group>
        </div>
      ),
      sortable: true,
    },

    {
      name: "ACTION",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit className=" p-0 m-0  editiconn text-secondary" />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            // onClick={handleAlert.bind(this,row.id)}
          />
        </div>
      ),
    },
  ];
  const data = [
    {
      id: 1,
      email_type: "Order",
      user_type: "Admin",
      title: "Your Order Shipped",
      status: "Hold",
    },
    {
      id: 1,
      email_type: "Order",
      user_type: "Admin",
      title: "Your Order Shipped",
      status: "Hold",
  
    },
  ];

  const EmailTextHandler=(event, editor)=>{
   setEmailText(editor.getData())
   console.log({ event, editor, emailText});
   setEmaildata({...emaildata,
    email_text:emailText})

   
  }

  const EmailSubmitHandler= (e)=>{
  e.preventDefault()
   const sendData= axios.post( `${process.env.REACT_APP_BASEURL}/add_email_template`,{
   type:userType,
   email_type:emailType,
   email_name:"",
   email_text:emailText,
   text_msg:textMessage,
   test_email:testEmail,
   status:addStatus
   
 }).then((response)=>{
    setEmaildata(response.data)
 }).catch(function (error) {
  console.log(error);
})
 
 useEffect(() => {
  sendData();
  
}, []);
   
console.log(" -----"+emaildata)
  }
  return (
    <div>
      <h2>Send Email</h2>

      {/* search bar */}
      <div className="card p-3">
        <div className="row page_searchbox">
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Email Type"
              className="adminselectbox"
              // value={searchblog.category}
              name="category"
            >
              <option value={''}>Email Type</option>
              <option value={'order'}>Order</option>
              <option value={'cancelled'}>Cancelled</option>
              <option value={'delivery'}>Delivery</option>
              <option value={'offer'}>Offer</option>
              <option value={'invoice'}>Inoive</option>
              <option value={'product'}>Product</option>
              <option value={'password'}>Password</option>
              <option value={'payment'}>Payment</option>
              <option value={'stock'}>Stock</option>
              <option value={'sale'}>Sale</option>
              <option value={'cart'}>Cart</option>
              <option value={'wishlisted'}>Wishlisted</option>
              <option value={'regestion'}>Regestion</option>
              </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Store Type"
              className="adminselectbox"
              name="User Type"
           
            >
              <option value={''}>User Type</option>
              <option value={'admin'}>Admin</option>
              <option value={'vendor'}>Vendor</option>
              <option value={'user'}>User</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              placeholder={"Search by Email"}
              className={"adminsideinput"}
            />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <button className="button main_button w-100">Search</button>
          </div>
        </div>

        <div className="product_page_uploadbox my-4">
          <button
            className="button main_button ml-auto"
            onClick={() => handleShow("add")}
          >
            Add Email
          </button>
        </div>
        <DataTable
          columns={columns}
          className="main_data_table"
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
      <Modal size="lg" show={show}>
        <Form
          className=""
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={""}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {show === "add" ? "Add New Blog " : " Update Blog"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Email Type</Form.Label>
                  <Form.Select size="sm" aria-label="" name={""} onChange={(e)=>{setEmailtype(e.target.value)}}>
                    
                  <option value={''}>Email Type</option>
              <option value={'order'}>Order</option>
              <option value={'cancelled'}>Cancelled</option>
              <option value={'delivery'}>Delivery</option>
              <option value={'offer'}>Offer</option>
              <option value={'invoice'}>Inoive</option>
              <option value={'product'}>Product</option>
              <option value={'password'}>Password</option>
              <option value={'payment'}>Payment</option>
              <option value={'stock'}>Stock</option>
              <option value={'sale'}>Sale</option>
              <option value={'cart'}>Cart</option>
              <option value={'wishlisted'}>Wishlisted</option>
              <option value={'regestion'}>Regestion</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>User Type</Form.Label>
                  <Form.Select size="sm" aria-label="" name={""}
                     onChange={(e)=>{setUsertype(e.target.value)}}
                  >
                  <option value={''}>User Type</option>
                 <option value={'admin'}>Admin</option>
                <option value={'vendor'}>Vendor</option>
                 <option value={'user'}>User</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill category
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Status</Form.Label>
                  <Form.Select size="sm" aria-label="" name={""} onChange={(e)=>{setaddStatus(e.target.value)}}>
                    <option value={'hold'}>Hold</option>
                    <option  value={'active'}>Active</option>
                    <option  value={'pending'}>Pending</option>
                    
                  </Form.Select>
                
                  
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill category
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-sm-6 aos_input">
              <Form.Label>Email Title</Form.Label  >
            <input
              type={"text"}
              placeholder={"Email Title"}
              className={"adminsideinput"}
              onChange={(e)=>{setEmailTitle(e.target.value)}}
            />

            
          </div>
          <div className="col-sm-6 aos_input">
              <Form.Label> Text Message</Form.Label>
            <input
              type={"text"}
              placeholder={"Text Message"}
              className={"adminsideinput"}
              onChange={(e)=>{setTextMessage(e.target.value)}}
            />

            
          </div>
          <div className="col-sm-6 aos_input">
              <Form.Label> Test Email </Form.Label>
            <input
              type={"text"}
              placeholder={"Test Email "}
              className={"adminsideinput"}
              onChange={(e)=>{setTestEmail(e.target.value)}}
            />

            
          </div>

            
              <div sm="12" className="mt-3">
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onChange={EmailTextHandler}
                    />
                    </div>
            
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="button main_outline_button">Cancel</button>
            <Iconbutton
              // type={"submit"}
              btntext={"Add Email"}
              onClick={EmailSubmitHandler}
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EmailSend;
