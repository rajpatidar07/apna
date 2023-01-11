import React, { useState, useRef } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "sweetalert/dist/sweetalert.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import Iconbutton from "../common/iconbutton";
import {CKEditor} from 'ckeditor4-react'
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useEffect } from "react";
import axios from "axios";
import { SendExclamationFill } from "react-bootstrap-icons";
import EmailType from "../json/EmailType";
import EmailStatus from "../json/EmailStatus";


const EmailSend = () => {


  const [emaildata, setEmaildata] = useState({
    email_type:"",
    email_text:"",
    type:"",
    status:"",
    test_email:"",
    email_name:"",
    text_msg:""

  });
 
  const[emailText,setEmailText]=useState('')
  const [getEmaildata,setGetEmaildata]=useState([])
  const [apicall,setapicall]=useState(false)
  const[getemailtype,setGetEmailtype]=useState("")
  const[getusertype,setGetUserType]=useState("")
  const[getemailStatus,setGetEmailStatus]=useState("")
  const [changstatus, setchangstatus] = useState('');
 
  const formRef = useRef();

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleShow = (e) => {
    console.log("----------"+e)
    if (e === 'add') {
      setShow(e);
    }
    if (e !== 'add') {
      try {
              axios
                .get(`${process.env.REACT_APP_BASEURL}/email_template_get?id=${e}`)
                .then((response) => {
                     console.log("single Data"+ JSON.stringify(response.data))
                    setEmaildata(response.data[0])
    console.log(" update data------"+response.data[0].email_text)

                    setEmailText(response.data[0].email_text)
                
                })
            } catch (err) {}
           
    }
    
    setShow(e);
  };



  
  

  const handleClose=()=>{
    //  formRef.current.reset();
      setEmaildata({})
   
   setValidated(false)
    setShow(false)
    
   
  }





// console.log(" get data-----"+JSON.stringify (emaildata))
  const columns = [
    {
      name: "Email Type",
      width: "130px",
      selector: (row) => row.email_type,
      sortable: true,
    },
    {
      name: "User Type",
      width: "120px",
      selector: (row) => row.type,
      sortable: true,
    },

    {
      name: "Title",
       width: "100px",

      selector: (row) => row.email_name,
      sortable: true,
    },
    {
      name: "Email Text",
      width: "500px",
    
      selector: (row) => ( <div  className="spanText" > <span dangerouslySetInnerHTML={{ __html: row.email_text }}></span></div> ),
      sortable: true,
    },

    {
      name: "Status",
    

      selector: (row) => (
        <span
          className={
            row.status === "active"
              ? "badge bg-success"
              : row.status === "pending"
                ? "badge bg-primary"
                : row.status === "hold"
                ? "badge bg-danger"
               : "badge bg-dark"
          }
        >
          {row.status === "pending"
              ? "Pending"
              : row.status === "active"
                ? "Active"
                : row.status === "hold"
                ? "Hold"
             : "No status"}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select aria-label="Search By status" size="sm" className="w-100"  onChange={(e)=>onStatusChange(e,row.id)} name='status' >
          <option value="pending" selected={row.status === 'pending' ? true : false}>Pending</option>
          <option value="active"  selected={row.status === 'active' ? true : false}>Active</option>
          <option value="hold"  selected={row.status === 'hold' ? true : false}>Hold</option>
    
        </Form.Select>
      ),      
      sortable: true,
    },

    {
      name: "ACTION",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.id)} />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={deleteEmail.bind(this, row.id)}
          />
        </div>
      ),
    },
  ];

  const EmailTextHandler=(e)=>{

// console.log("textEditor value"+ e.editor.getData())
  //    console.log("datatatat"+emaildata.email_text)
  // //  console.log({ event, editor, emailText});
   let newTemp;
   if((e.editor.getData()) != undefined){
     newTemp = (e.editor.getData()).replaceAll(/"/g, '\'');
  }
   setEmailText(newTemp)
  // setEmaildata({...emaildata,
  //   email_text:newTemp
  // })
  }

  const valueHandler=(e)=>{

  setEmaildata({ ...emaildata,[e.target.name]:e.target.value})
  
  }
  // console.log("data- before-----"+JSON.stringify(emaildata))

  const EmailSubmitHandler= (e)=>{
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
     
      setValidated(true);
      setapicall(true);
    }

  else{
    
  e.preventDefault()
    // console.log("data------"+JSON.stringify(emaildata))
  axios.post( `${process.env.REACT_APP_BASEURL}/add_email_template`,{
  type:emaildata.type,
  email_type:emaildata.email_type,
  email_name:emaildata.email_name,
  email_text:emailText,
  text_msg:emaildata.text_msg,
  test_email:emaildata.test_email,
  status:emaildata.status
  
}).then((response)=>{
   console.log(response)
  
}).catch(function (error) {
 console.log(error);
})

 formRef.current.reset();
setValidated(false);
setapicall(true);

 setShow(false)

   }


  }
 

const UpdateEmailHandler =(e)=>{
console.log(" email iddd"+emaildata.id)

  e.preventDefault();
  axios.put(`${process.env.REACT_APP_BASEURL}/update_email_template`,{
    id:emaildata.id,
    type:emaildata.type,
    email_type:emaildata.email_type,
    email_name:emaildata.email_name,
    email_text:emailText,
    text_msg:emaildata.text_msg,
    test_email:emaildata.test_email,
    status:emaildata.status
  }).then((response) => {
  // console.log("idddllllllllllllllllllllllllllllllll------"+JSON.stringify(response.data.message))
 
});

formRef.current.reset();
setValidated(false);
setapicall(true);

 setShow(false)

}

       
  const fetchEmailData=()=>{
     axios.post(`${process.env.REACT_APP_BASEURL}/email_template_list`,
     {
      "type":getusertype,
      "email_type":getemailtype,
      "status":getemailStatus
     }
     ).then((response) => {
          //  console.log('emailData-------'+JSON.stringify(response.data))
          
          let data = response.data.filter(item=>item.is_deleted===1);
         
     
           setGetEmaildata(data)
          setapicall(false)
  

     }).catch(function (error) {
       console.log(error);
     });
 
   }
 
 

   
   const onStatusChange = (e,id) => {
 
    setchangstatus("ssssssssss"+e.target.value)
    axios.put(`${process.env.REACT_APP_BASEURL}/email_template_status`, {
      status:e.target.value,
      id:`${id}`
      }).then((response) => {
      setapicall(true)
    }).catch(function (error) {
      console.log(error);
    });
  }

  const deleteEmail =(id)=>{
    // console.log("id---"+id)
    axios.post(`${process.env.REACT_APP_BASEURL}/email_template_remove`, {
      is_deleted:0,
      id:`${id}`
      }).then((response) => {
      setapicall(true)
    }).catch(function (error) {
      console.log(error);
    });
   }
   

  useEffect(() => {
    fetchEmailData()
    
  }, [apicall,changstatus]);

const SearchHandler=()=>{
 setapicall(true)
 fetchEmailData()
}

// console.log("my single data--"+JSON.stringify(emaildata))
// let newTemp = emaildata.email_text.replace(/"/g, '\'');


// console.log("emaildata.email_text--"+emaildata.email_text)
// if((emaildata.email_text) != undefined){
//   let newTemp = (emaildata.email_text).replaceAll(/"/g, '\'');
//   console.log("newTemp -"+newTemp)
// }


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
            
              name="category"
              onChange={(e)=>{setGetEmailtype(e.target.value)}}
            >  <option value={''}>Email Type</option>
              {EmailType.EmailType.map((item)=>{
                return(  <option value={item}>{item}</option>)
              })}
            
            
       
              </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Store Type"
              className="adminselectbox"
              name="User Type"
              onChange={(e)=>{setGetUserType(e.target.value)}}
            >
              <option value={''}>User Type</option>
              <option value={'admin'}>Admin</option>
              <option value={'vendor'}>Vendor</option>
              <option value={'user'}>User</option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Store Type"
              className="adminselectbox"
              name="Status"
              onChange={(e)=>{setGetEmailStatus(e.target.value)}}
            >
              <option value={''}>Status</option>
              {EmailStatus.EmailStatus.map((item)=>{return(
                  <option value={item}>{item}</option>
              )})}
                   
            </Form.Select>
          </div>
        

          <div className="col-md-3 col-sm-6 aos_input">
            <button className="button main_button w-100" onClick={SearchHandler}>Search</button>
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
          data={getEmaildata}
          pagination
          highlightOnHover
          pointerOnHover
        />
      </div>
      <Modal size="lg" show={show} onHide={()=>handleClose()}>
        <Form
          className=""
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={(show === 'add' ? (e) => EmailSubmitHandler(e) : (show) =>UpdateEmailHandler(show))}
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
                  <Form.Select size="sm" aria-label="" value={emaildata.email_type} name={"email_type"} onChange={(e)=>{valueHandler(e)}} required>
                    
                  <option value={''}>Email Type</option>
                  {EmailType.EmailType.map((item)=>{return(
                  <option value={item}>{item}</option>
                  )})}
  
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
                  <Form.Select size="sm" aria-label=""
                  name={"type"} onChange={(e)=>{valueHandler(e)}}
                  value={emaildata.type}
                     required
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
                  <Form.Select size="sm" aria-label="" value={emaildata.status}  name={"status"} onChange={(e)=>{valueHandler(e)}} required>
                  <option value={''}>Status</option>
                  {EmailStatus.EmailStatus.map((item)=>{return(
                  <option value={item}>{item}</option>
              )})}
                    
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
             
              value={emaildata.email_name}
              name={"email_name"} onChange={(e)=>{valueHandler(e)}}
              required
            />

            
          </div>
          <div className="col-sm-6 aos_input">
              <Form.Label> Text Message</Form.Label>
            <input
              type={"text"}
              placeholder={"Text Message"}
              className={"adminsideinput"}
              value={emaildata.text_msg}
              name={"text_msg"} onChange={(e)=>{valueHandler(e)}}
              required
            />

            
          </div>
          <div className="col-sm-6 aos_input">
              <Form.Label> Test Email </Form.Label>
            <input
              type={"text"}
              placeholder={"Test Email "}
              className={"adminsideinput"}
              value={emaildata.test_email}
              name={"test_email"} onChange={(e)=>{valueHandler(e)}}
              required
            />

            
          </div>

            
              <div sm="12" className="mt-3">
                  <CKEditor
                    // editor={"classic"}
                      //  data={ <div dangerouslySetInnerHTML={{ __html: emailText }} className='editor'></div>}
                      // value={<div dangerouslySetInnerHTML={{ __html: emailText }} className='editor'></div>}
                      data={`<p>${emailText}</p>`}
                      //  value="<p>Hi Rajaram Patidar</p>"
                    onChange={(e)=>EmailTextHandler(e)}
                    name={"email_text"}
                    
                
                    required
                    
                    />
                    </div>
            
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="button main_outline_button" onClick={()=>handleClose()}>Cancel</button>
            <Iconbutton
               type={'submit'}
              btntext={(show === 'add' ? "Add Email" : "Update Email")}
            
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default EmailSend;
