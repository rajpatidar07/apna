import React, { useState, useRef } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import logo from "../../../images/logo.png";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import Iconbutton from "../common/iconbutton";
import axios from "axios";
import { Badge, Button, InputGroup } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
const VendorsList = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState("");
  const [Alert, setAlert] = useState(false);
  const [vendordata, setvendordata] = useState([]);
  const [file, setFile] = useState();
  const [fileDoc, setFileDoc] = useState();
  const [fileDocName, setFileDocName] = useState("");
  const [call, setCall] = useState(false);

 const [fileName, setFileName] = useState("");
  const
   [addvendordata, setaddvendordata] = useState({
  owner_name:"",
  shop_name:"",
  mobile:"",
  email:"",
  shop_address:"",
  gstn:"",
  geolocation:"",
  store_type:"",
  image:"",
  status:"",
  image:"",
  document_name:[],
  availability:""
    });
  const [changstatus, setchangstatus] = useState("");
  const [apicall, setapicall] = useState(false);
  const [addtag, setaddtag] = useState();
  const [Docnamearray, setDocnameArray] = useState([]);
  const [DocuImgarray, setDocuImgArray] = useState([]);

  const [searchdata, setsearchData] = useState({
    status:"",
    store_type:"",
    owner_name:""
    })
   
    const OnSearchChange = (e) => {
      setsearchData({ ...searchdata, [e.target.name]: e.target.value })
    }
    const onSearchClick = () =>{
      axios
      .post(`${process.env.REACT_APP_BASEURL}/vendor_list`,{
        "owner_name":`${searchdata.owner_name}`,
        "store_type":`${searchdata.store_type}`,
        "status":`${searchdata.status}`
        })
      .then((response) => {
      console.log("search----------   " + JSON.stringify(response.data));
        setvendordata(response.data); 
        setapicall(false);
      })
      .catch(function(error) {
        console.log(error);
      });
    }
    const columns = [
      {
        name: "ID",
        selector: (row) => row.id,
        sortable: true,
      },
      {
        name: "Logo",
        center: true,
        cell: (row) => (
          <img
            width={"100%"}
            alt={row.owner_name}
            src={row.shop_logo}
            style={{
              borderRadius: 15,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "right",
            }}
          />
        ),
      },
      {
        name: "Shop Name",
        selector: (row) => row.shop_name,
        sortable: true,
      },
      {
        name: "Owner Name",
        selector: (row) => row.owner_name,
        sortable: true,
      },
      {
        name: "Address",
        selector: (row) => row.shop_address,
        sortable: true,
        center: true,
      },
      {
        name: "Contact",
        selector: (row) => row.mobile,
        sortable: true,
        center: true,
      },
      {
        name: "Status",
        selector: (row) => (
          <span
            className={
              row.status === "pending"
                ? "badge bg-secondary"
                : row.status === "active"
                ? "badge bg-success"
                : row.status === "blocked"
                ? "badge bg-danger"
                : row.status === "in progress"
                ? "badge bg-primary"
                : "badge bg-dark"
            }
          >
            {row.status}
          </span>
        ),
        sortable: true,
        center: true,
      },
      {
        name: "Change",
        selector: (row) => (
          <Form.Group className="" controlId="formBasicEmail">
            <Form.Select
              size="sm"
              aria-label="Default select example"
              onChange={(e) => handleStatusChnage(e, row.id)}
              name="status"
            >
              <option
                value="pending"
                selected={row.status === "pending" ? true : false}
              >
                Pending
              </option>
              <option
                value="active"
                selected={row.status === "active" ? true : false}
              >
                Active
              </option>
              <option
                value="blocked"
                selected={row.status === "blocked" ? true : false}
              >
                Block
              </option>
              <option
                value="in progress"
                selected={row.status === "in progress" ? true : false}
              >
                In Progress
              </option>
            </Form.Select>
          </Form.Group>
        ),
        sortable: true,
        center: true,
      },
  
      {
        name: "ACTION",
        center: true,
        selector: (row) => (
          <div className={"actioncolimn"}>
            <BiEdit
              className=" p-0 m-0  editiconn text-secondary"
              onClick={handleShow.bind(this, row.id)}
            />
            <BsTrash
              className=" p-0 m-0 editiconn text-danger"
              onClick={handleAlert}
            />
          </div>
        ),
      },
    ];

    // useEffect(() => {
      
    //   // setaddtag(addvendordata.document_name);
    //   let splitDoc = [];
    //    splitDoc =  addvendordata.document_name.split(',');
    //   setDocnameArray(Docnamearray => [...Docnamearray,splitDoc]);
    // setCall(false);
    // },[call]);

    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/vendors?id=all`)
        .then((response) => {
          setvendordata(response.data);
          setapicall(false);
        })
        .catch(function(error) {
          console.log(error);
        });
    }, [apicall]);
    useEffect(() => {
      setaddvendordata({
        ...addvendordata,
        document_name: Docnamearray
      });
    }, [Docnamearray]);
    
    const handleFormChange = (e) => {
      setaddvendordata({
        ...addvendordata,
        [e.target.name]: e.target.value,
      });
    };
  const handleClose = () => {
    formRef.current.reset();
    // e.preventDefault()
    setValidated(false);
    setaddtag('');
    setDocnameArray('');
    setShow(false);
  };


  let arr;
  const handleShow = (e) => {
    if (e === "add") {
      setShow(e);
    }
    if (e !== "add") {
      setCall(true)
      console.log("clcikeddd");
      axios
    .get(`${process.env.REACT_APP_BASEURL}/vendors?id=${e}`,addvendordata)
    .then((response) => {
      setaddvendordata(response.data[0]);
      // setDocnameArray(response.data[0].document_name);
     setDocuImgArray(JSON.parse(response.data[0].multiple_document_upload))
 console.log("---docname"+ (response.data[0].document_name))

      setapicall(false);
    })
    .catch(function(error) {
      console.log(error);
    });
      setShow(e);
    }
  };
 console.log("---docname"+ Docnamearray)

  const onDocumentNamechange = (e) => {
    setaddtag(e.target.value);
  };
  const onDocuAddclick = (e) => {
    // e.preventDefault();
    setDocnameArray(Docnamearray => [...Docnamearray, addtag]);
    setaddtag('');
    
  };
  const DocuRemoveClick = (e) => {
    setDocnameArray(Docnamearray.filter(item => item !== e));
  }
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const handleStatusChnage = (e, id) => {
    setchangstatus(e.target.value);
    axios
      .put("${process.env.REACT_APP_BASEURL}/vendor_status_change", {
        status_change: e.target.value,
        id: `${id}`,
      })
      .then((response) => {
        setapicall(true);
      })
      .catch(function(error) {
        console.log(error);
      });
  };


  
  const docsImageUrls = [];
  const newImageUrls = [];
  const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
 setFileName(e.target.files[0].name);
  };
  const DocsFormChange = (e) => {
    setFileDoc(e.target.files[0])
    setFileDocName(e.target.files[0].name);

  //   [e.target.files].forEach((image) =>
  //     newImageUrls.push(image)
  //   );
  //   [e.target.files.name].forEach((image) =>
  //   docsImageUrls.push((image))
  // );
  //   setaddvendordata((addvendordata) => {
  //     return { ...addvendordata, 
  //       multiple_document_upload: newImageUrls,
  //       MultipleDocs : docsImageUrls
  //     };
  //   });
  };

  let shoplogo = `${process.env.REACT_APP_BASEURL}/${addvendordata.shop_logo}`
  let docsdata = `${process.env.REACT_APP_BASEURL}/${DocuImgarray}`
  var Newshoplogo = shoplogo.replace("/public", "");
  var imgdata =docsdata.replace("/public", "");
  console.log("---add vendorrr --- > "+addvendordata.document_name);

  const AddVendorClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      console.log("falsecheckValidity----------");
      setValidated(true);
    } else {
      e.preventDefault();

  const formData = new FormData();
  let x = [addvendordata.document_name]
    formData.append("image", file);
    formData.append("filename", fileName);
    formData.append("owner_name", addvendordata.owner_name);
    formData.append("shop_name", addvendordata.shop_name);
    formData.append("mobile", addvendordata.mobile);
    formData.append("email",addvendordata.email);
    formData.append("shop_address",addvendordata.shop_address);
    formData.append("gstn",addvendordata.gstn);
    formData.append("geolocation",addvendordata.geolocation);
    formData.append("store_type",addvendordata.store_type);
    formData.append("availability", addvendordata.availability);
    formData.append("image",fileDoc);
    formData.append("filename", fileDocName);
    formData.append("document_name",x);
    formData.append("status",addvendordata.status);
    formData.append("availability", addvendordata.availability);

      axios
      .post(`${process.env.REACT_APP_BASEURL}/vendor_register`,formData)
      .then((response) => {
        // setvendordata(response.data);
      console.log("formadd----------   " + JSON.stringify(response.data));
        setapicall(true);
    setShow(false);

      })
      .catch(function(error) {
        console.log(error);
      });
      formRef.current.reset();
      setValidated(false);
    }
  };

  const UpdateVendorClick = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id",addvendordata.id)
    formData.append("image", file);
    formData.append("filename", fileName);
    formData.append("owner_name", addvendordata.owner_name);
    formData.append("shop_name", addvendordata.shop_name);
    formData.append("mobile", addvendordata.mobile);
    formData.append("email",addvendordata.email);
    formData.append("shop_address",addvendordata.shop_address);
    formData.append("gstn",addvendordata.gstn);
    formData.append("geolocation",addvendordata.geolocation);
    formData.append("store_type",addvendordata.store_type);
    formData.append("availability", addvendordata.availability);
    formData.append("image",fileDoc);
    formData.append("filename", fileDocName);
    formData.append("document_name",addvendordata.document_name);
    formData.append("status",addvendordata.status);
    axios
    .put(`${process.env.REACT_APP_BASEURL}/vendor_update`,formData)
    .then((response) => {
    console.log("formupdate----------   " + JSON.stringify(response.data));
      
      setapicall(true);
    setShow(false);

    })
    .catch(function(error) {
      console.log(error);
    });
  };

  return (
    <div>
      <h2>Vendors List</h2>

      {/* search bar */}
      <div className="card p-3">
        <div className="row page_searchbox">
          <div className="col-md-3 col-sm-6 aos_input">
            <input type={"text"} plchldr={"Search by Owner Name"}  onChange={OnSearchChange}
              name='owner_name'
              value={searchdata.owner_name} className={'adminsideinput'}/>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Status"
              className="adminselectbox"
              onChange={OnSearchChange}
              name='status'
              value={searchdata.status}
            >
              <option>-Status-</option>
              <option value="pending"> Pending</option>
              <option value="approved">Approved</option>
              <option value="blocked">Blocked</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Store Type"
              className="adminselectbox"
              onChange={OnSearchChange}
              name='store_type'
              value={searchdata.store_type}
            >
              <option>-Store Type-</option>
              <option value="shoese">shoese</option>
              <option value="Cloths">Cloths</option>
              <option value="Food">Food</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <button className="button main_button w-100" onClick={()=>onSearchClick()}>Search</button>
          </div>
        </div>

        <div className="product_page_uploadbox my-4">
          <button
            className="button main_button ml-auto"
            onClick={() => handleShow("add")}
          >
            Add New Shop
          </button>
        </div>
        <DataTable
          columns={columns}
          className="main_data_table"
          data={vendordata}
          pagination
          highlightOnHover
          pointerOnHover
        />
        <SweetAlert
          show={Alert}
          title="Demo"
          text="SweetAlert in React"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
      <Modal size="lg" show={show} onHide={() => handleClose()}>
        <Form
          className=""
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={
            show === "add"
              ? (e) => AddVendorClick(e)
              : (e) => UpdateVendorClick(e)
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {show === "add" ? "Add New Vendor " : " Update Vendor "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Owner Name</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    value={addvendordata.owner_name}
                    required
                    type="text"
                    placeholder="Owner Name"
                    name={"owner_name"}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill owner name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom02"
                >
                  <Form.Label>Shop Name</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    value={addvendordata.shop_name}
                    required
                    type="text"
                    placeholder="Shop Name"
                    name={"shop_name"}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill shop name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom03"
                >
                  <Form.Label>Mobile</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    value={addvendordata.mobile}
                    required
                    type="number"
                    min={1}
                    placeholder="Mobile"
                    name={"mobile"}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill mobile
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom04"
                >
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    value={addvendordata.email}
                    required
                    type="email"
                    placeholder="Email"
                    name={"email"}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill email
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom05"
                >
                  <Form.Label>Shop Address</Form.Label>
                  <Form.Control
                    className="vendor_address"
                    as="textarea"
                    rows={3}
                    placeholder="Address"
                    name={"shop_address"}
                    onChange={(e) => handleFormChange(e)}
                    value={addvendordata.shop_address}
                    required
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill address
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>GSTN</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    value={addvendordata.gstn}
                    required
                    type="text"
                    placeholder="GSTN"
                    name={"gstn"}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill gstn
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    size="sm"
                    aria-label="Default select example"
                    onChange={(e) => handleFormChange(e)}
                    name="status"
                  >
                     <option
                      value=""
                      selected={
                        addvendordata.status === "" ? true : false
                      }
                    >
                      Select
                    </option>
                    <option
                      value="pending"
                      selected={
                        addvendordata.status === "pending" ? true : false
                      }
                    >
                      Pending
                    </option>
                    <option
                      value="active"
                      selected={
                        addvendordata.status === "active" ? true : false
                      }
                    >
                      Active
                    </option>
                    <option
                      value="blocked"
                      selected={
                        addvendordata.status === "blocked" ? true : false
                      }
                    >
                      Block
                    </option>
                    <option
                      value="in progress"
                      selected={
                        addvendordata.status === "in progress" ? true : false
                      }
                    >
                      In Progress
                    </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill gstn
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Avaliable</Form.Label>
                  <Form.Select
                    size="sm"
                    aria-label="Default select example"
                    onChange={(e) => handleFormChange(e)}
                    name="availability"
                  >
                     <option
                      value=""
                      selected={
                        addvendordata.availability === "" ? true : false
                      }
                    >
                      Select
                    </option>
                    <option
                      value="close"
                      selected={
                        addvendordata.availability === "close" ? true : false
                      }
                    >
                      close
                    </option>
                    <option
                      value="update"
                      selected={
                        addvendordata.availability === "update" ? true : false
                      }
                    >
                      update
                    </option>
                    <option
                      value="block"
                      selected={
                        addvendordata.availability === "block" ? true : false
                      }
                    >
                      Block
                    </option>
                    <option
                      value="delete"
                      selected={
                        addvendordata.availability === "delete" ? true : false
                      }
                    >
                     Delete
                    </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill gstn
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Store Type</Form.Label>
                  <Form.Select
                    size="sm"
                    aria-label="Default select example"
                    onChange={(e) => handleFormChange(e)}
                    name="store_type"
                  >
                     <option
                      value=""
                      selected={
                        addvendordata.store_type === "" ? true : false
                      }
                    >
                      Select
                    </option>
                    <option
                      value="shoese"
                      selected={
                        addvendordata.store_type === "shoese" ? true : false
                      }
                    >
                      Pending
                    </option>
                    <option
                      value="Cloths"
                      selected={
                        addvendordata.store_type === "Cloths" ? true : false
                      }
                    >
                      Active
                    </option>
                   
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill gstn
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom07"
                >
                  <Form.Label>Geolocation</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    required
                    type="location"
                    placeholder="Geolocation"
                    name={"geolocation"}
                    value={addvendordata.geolocation}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
             
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom10"
                >
                   <Form.Label>Document Name</Form.Label>
                  <InputGroup className="" size="sm">
                  <Form.Control
                    onChange={(e) => onDocumentNamechange(e)}
                    value={addtag}
                    placeholder="document_name"
                    name={"document_name"}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                      onDocuAddclick();
                      }
                    }}
                  />
                   <Button variant="outline-success" className="addcategoryicon"
                            onClick={() => onDocuAddclick()} size="sm">
                            +
                          </Button>
                          </InputGroup>
                          {Docnamearray === undefined || Docnamearray === null || Docnamearray === '' ? null :
                    <div className="d-flex align-items-center tagselectbox mt-2" >
                                               
                          { Docnamearray.map((seotags, i) => {
                          return (
                            <>
                        <Badge className="tagselecttitle mb-0" bg="success" >
                        {seotags === null || seotags === undefined ? '' : seotags
                        }
                 
                          <GiCancel
                            className=" mx-0 ms-1 btncancel"
                            onClick={() => DocuRemoveClick(seotags)}
                          />
                        </Badge>
                            </>
                          )

                         })}
                        
                      </div>
                      }
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill document name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div classImg="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom08"
                >
                  <Form.Label>Shop Logo</Form.Label>
                  <Form.Control
                    onChange={(e) => ImgFormChange(e)}
                    type="file"
                    placeholder="Shop_logo"
                    name={"shop_logo"}
                  />
                  {addvendordata.shop_logo ?
                  <img src={Newshoplogo} width={'50px'}/> : null}
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload document
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom09"
                >
                  <Form.Label>Gumasta</Form.Label>
                  <Form.Control
                    onChange={(e) => DocsFormChange(e)}
                    multiple
                    type="file"
                    placeholder="multiple_document_upload"
                    name={"multiple_document_upload"}
                  />
                  {/* {
                  (DocuImgarray).map((imgdata)=> {
                    return( */}
                      <img src={imgdata} width={'50px'}/>
                    {/* )
                  })
                 } */}

                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload Img
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button main_outline_button"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <Iconbutton
              type={"submit"}
              btntext={show === "add" ? "Add Vendor" : "Update Vendor"}
              // onClick={(show === 'add' ? AddVendorClick : UpdateVendorClick(show))}
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorsList;
