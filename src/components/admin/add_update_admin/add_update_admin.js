import React, { useState, useRef } from "react";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { BsTrash } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import SweetAlert from 'sweetalert-react';
import Form from "react-bootstrap/Form";
import MainButton from "../common/button";
import { useEffect } from "react";
import axios from "axios";
import { data } from "jquery";
function Admin() {

  // const handleAlert = () => setAlert(true);
  // const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [show, setShow] = useState('');
  const [validated, setValidated] = useState(false);
  const [searchvalidated, setsearchValidated] = useState(false);
  const [addadmindata, setaddadmindata] = useState([]);
  const [admindata, setadmindata] = useState([]);
  const[searchAdmin,setSearchAdmin]=useState([]);
  const [Searchad, setSearchAd] = useState({
    "admin_name":"",
    "admin_type":""
  
   });
  const handleClose = () => {
    formRef.current.reset();
    // setadmindata('')
    setValidated(false)
    setShow(false);
  }
  const handleShow = (e) => {
    if (e === 'add') {
      setShow(e);
    }
    if (e !== 'add') {
      try {
              axios
                .get(`${process.env.REACT_APP_BASEURL}/admin?id=${e}`)
                .then((response) => {
                  let data= response.data[0];
                  setaddadmindata(data);
  localStorage.setItem("adminid",response.data.id);
  // console.log(""+response.data.id)

                })
            } catch (err) {}
           
    }
    setShow(e);
    }
   

  const formRef = useRef();

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
      center: true,
    },
    {
      name: "Name",
      selector: (row) => row.admin_name,
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      center: true,
      selector: (row) => row.admin_email,
    },
    {
      name: "Mobile",
      selector: (row) => row.admin_phone,
      sortable: true,
    },
    {
      name: "Admin Type",
      selector: (row) => (row.admin_type === '1' ? 'Super Admin' : row.admin_type === '2' ? 'Admin' : row.admin_type === '3' ? 'Editor' : null),
      sortable: true,
      center: true,
    },
    // {
    //   name: "Password",
    //   selector: (row) => row.admin_password,
    //   sortable: true,
    //   center: true,
    // },
    {
      name: "Action",
      width: "120px",
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <AiFillEdit className=" p-0 m-0 editiconn" onClick={handleShow.bind(this, row.id)} />
          {/* <BsTrash className=" p-0 m-0 editiconn text-danger" onClick={handleAlert} /> */}
        </div>
      ),
    },
  ];
  useEffect(() => {
    axios.post(`${process.env.REACT_APP_BASEURL}/admin_search`,{
      "admin_name":`${Searchad.admin_name}`,
      "admin_type":`${Searchad.admin_type}`,
  }).then ((response) => {
    setadmindata(response.data);
    setSearchAdmin(response.data)
    setsearchValidated(false)
    setapicall(false);
    })
  }, [apicall]);
  const handleFormChange = (e) => {
    setaddadmindata({...addadmindata,[e.target.name]: e.target.value});
    };

    console.log("--------------addadmindata---------"+JSON.stringify(addadmindata))
    const onValueChange=(e)=>{
      setSearchAd({ ...Searchad, [e.target.name]: e.target.value });
    }

  const SearchAdmin=()=>{
      axios.post(`${process.env.REACT_APP_BASEURL}/admin_search`,{
        "admin_name":`${Searchad.admin_name}`,
        "admin_type":`${Searchad.admin_type}`,
    }).then ((response) => {
      console.log("data---------------"+JSON.stringify(response.data))
      setadmindata(response.data);
      setSearchAd('')
      setsearchValidated(false)

      })
    }
  const AddAdminClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log("falsecheckValidity----------");
      setValidated(true);
      setapicall(true);
    }
    else {
      e.preventDefault();
      axios
      .post(`${process.env.REACT_APP_BASEURL}/add_admin`,
      {
        admin_email:`${addadmindata.admin_email}`,
        admin_name:`${addadmindata.admin_name}`,
        admin_phone:`${addadmindata.admin_phone}`,
        admin_type:`${addadmindata.admin_type}`,
        admin_password:`${addadmindata.admin_password}`,
        }
      )
      .then((response) => {
        console.log("adminnnnnnnnnnnnnn----------   " + JSON.stringify(addadmindata));
      });
     
     
      formRef.current.reset();
      setValidated(false);
      setapicall(true);
    }
  }

  const UpdateAdminClick = (e, show) => {
    e.preventDefault()
    axios.put(`${process.env.REACT_APP_BASEURL}/update_admin`,
    
    addadmindata).then((response) => {
    console.log("idddllllllllllllllllllllllllllllllll------"+JSON.stringify(addadmindata))
  });
  formRef.current.reset();
  setValidated(false);
  setaddadmindata("")
  setShow("");
  setapicall(true);
  show.preventDefault();
}


  return (
    <div className="App productlist_maindiv">
      <h2>Admin</h2>
      {/* {search} */}
      <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input  required type="text" className="adminsideinput"  placeholder={"Search by admin name"} value={Searchad.admin_name} name={"admin_name"} onChange={(e) => onValueChange(e)} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              name="admin_type"
              onChange={(e) => onValueChange(e)}
              value={Searchad.admin_type}
            >
              <option>Search by admin type</option>
                <option value="1">Super Admin</option>
              <option value="2">Admin</option>
              <option value="3">Editor</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={SearchAdmin}
            />
          </div>
        </div>
        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Admin"}
            onClick={() => handleShow('add')}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button adminmainbutton"}
          />
        </div>

        {/* datatable */}
        <Modal
          show={show}
          onHide={() => handleClose()}
          dialogClassName="w-80"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form className="" novalidate validated={validated} ref={formRef} onSubmit={(show === 'add' ? (e) => AddAdminClick(e) : (show) => UpdateAdminClick(show))} >

            <Modal.Header closeButton className="">
              <Modal.Title id="example-custom-modal-styling-title">
                {show === 'add' ? 'Add Admin ' : ' Update Admin '}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-3">
              <div className="d-flex justify-content-center align-items-center p-0 m-0">

                <div className="">
                  <div className="">
                    <div className="row px-3">
                      <div className="col-12">
                        <Form.Group className="mb-3" controlId="formPlaintextName">
                          <Form.Label className="" column sm="12">
                            Name
                          </Form.Label>

                          <Form.Control type="text" placeholder="Name" onChange={(e) => handleFormChange(e)} value={addadmindata.admin_name} name={'admin_name'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill name
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextEmail"
                        >
                          <Form.Label className="" column sm="12">
                            Email
                          </Form.Label>

                          <Form.Control type="email" placeholder="Email" onChange={(e) => handleFormChange(e)} value={addadmindata.admin_email} name={'admin_email'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill email
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextMobile"
                        >
                          <Form.Label className="" column sm="12">
                            Mobile
                          </Form.Label>

                          <Form.Control type="number" placeholder="Mobile Number" min={1} onChange={(e) => handleFormChange(e)} value={addadmindata.admin_phone} name={'admin_phone'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill mobile number
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextPassword"
                        >
                          <Form.Label className="" column sm="12">
                            Password
                          </Form.Label>

                          <Form.Control type="password" placeholder="Password" onChange={(e) => handleFormChange(e)} value={addadmindata.admin_password} name={'admin_password'} required />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill password
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextAdminType"
                        >
                          <Form.Label className="" column sm="12">
                            Admin Type
                          </Form.Label>

                          <Form.Select aria-label="Default select example" onChange={(e) => handleFormChange(e)} value={addadmindata.admin_type} name={'admin_type'} required>
                            <option value=''>Select</option>
                            <option value="1">Super Admin</option>
                            <option value="2">Admin</option>
                            <option value="3">Editor</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill admin type
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer className="">
              <button className='button main_outline_button' onClick={() => handleClose()}>Cancel</button>
              <Iconbutton
                type={'submit'}
                btntext={(show === 'add' ? "Add Admin" : "Update Admin")}
                // onClick={(show === 'add' ? AddAdminClick : UpdateAdminClick(show))}
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        <DataTable
          columns={columns}
          data={admindata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body add_update_admin_table"}
        />
        {/* <SweetAlert
          show={Alert}
          title="Admin Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        /> */}
      </div>
  );
  }
  
export default Admin;
