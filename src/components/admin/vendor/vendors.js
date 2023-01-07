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
import { Badge, Button, InputGroup, Table } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
const VendorsList = () => {
  const formRef = useRef();
   const [newImageUrls,setnewImageUrls] = useState([])
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState("");
  const [docsshow, setDocsShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [vendordata, setvendordata] = useState([]);
  const [file, setFile] = useState();
  const [fileDoc, setFileDoc] = useState();
  const [fileDocName, setFileDocName] = useState("");
  const [call, setCall] = useState(false);
  const [scall, setsCall] = useState(false);

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
  availability:"",
  social_media_links:[]
    });



    let encoded;
    let ImgObj = [];


  const [changstatus, setchangstatus] = useState("");
  const [apicall, setapicall] = useState(false);
  const [addtag, setaddtag] = useState();
  const [Docnamearray, setDocnameArray] = useState([]);
  const [DocuImgarray, setDocuImgArray] = useState([]);
  const [headerval, setheaderval] = useState('');
  const [descval, setdescval] = useState('');
  const [customarray, setcustomarray] = useState([]);
  const [AddCustom, setAddCustom] = useState([]);
  const [customvalidated, setcustomValidated] = useState(false);
  const [searchdata, setsearchData] = useState({
    status:"",
    store_type:"",
    owner_name:""
    })
   
    const OnSearchChange = (e) => {
      setsearchData({ ...searchdata, [e.target.name]: e.target.value })
       if(searchdata.owner_name){
        setapicall(true);
       
       }
     
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
        name: "#",
        width: "250px",
        center: true,
        cell: (row) => 
        
        (
          <div>
          <img
            height="90px"
            width="75px"
            alt={row.owner_name}
            src={(row.shop_logo).replace("public","")}
            style={{
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "right",
            }}
            onClick={() => handleClick()}
          />
          </div>
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
            {row.status==="pending"
            ?"Pending"
            :row.status==="active"
            ?"Active"
            :row.status==="blocked"
            ?"Blocked"
            : row.status === "in progress"
            ?"In Progress"
            :"return"
            }
          </span>
        ),
        sortable: true,
       
      },
      {
        name: "Change Status",
        selector: (row) => (
          <Form.Group className="" controlId="formBasicEmail">
            <Form.Select
              size="sm"
              aria-label="Search By status"
              onChange={(e) => handleStatusChnage(e, row.id)}
              name="status"
            >
                 <option
                value=""
                selected={row.status === "" ? true : false}
              >
                Status
              </option>
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
        name: "Add Docs",
        selector: (row) => (
          
          <Button
            size="sm"
             onClick={handleDocsShow.bind(this, row.id)}
          >
            Add Docs
          </Button>
          // : null
        ),
        sortable: true,
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


    useEffect(() => {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/vendors?id=all`)
        .then((response) => {
          setvendordata(response.data);
          setapicall(false);
          // console.log("gggggggggggggggggggggggg"+JSON.stringify(response.data))
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
      console.log("dataa"+JSON.stringify(addvendordata))
    };
  const handleClose = () => {
    formRef.current.reset();
    // e.preventDefault()
    setValidated(false);
    setaddtag('');
    setDocnameArray('');
    setapicall(true)
    setShow(false);
  };

 
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
     setDocuImgArray(JSON.parse(response.data[0].multiple_document_upload))
    //  let i = JSON.parse(response.data[0].social_media_links);
    // console.log("---iiiii"+ typeof i)

    // console.log("---docname"+ JSON.stringify(i[0]))
    // console.log("---docname"+ (response.data[0].social_media_links))

      setapicall(false);
    })
    .catch(function(error) {
      console.log(error);
    });
      setShow(e);
    }
  };

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
      .put(`${process.env.REACT_APP_BASEURL}/vendor_status_change`, {
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


  

  

  const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
 setFileName(e.target.files[0].name);
  };




  //img code start-----------------------------------------------------------------------------------------------

  const [vendorID ,setVendorId]=useState("")
const handleDocsShow=(id)=>{
  console.log("id- in show----------"+id)
  setVendorId(id)
  setDocsShow(true)
  onImgView(id);
}
const handleDocsClose=()=>{
   formRef.current.reset();
  setDocsShow(false)
  
}



  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      const {  name } = file;
      fileReader.addEventListener("load", () => {
        resolve({name: name,base64:fileReader.result});
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const imguploadchange =  async(e) => {
    e.preventDefault()
    console.log("Out id--"+vendorID)
    for (let i = 0; i < e.target.files.length; i++) {
     
      
      encoded = await convertToBase64(e.target.files[i]);

     

      const [first, ...rest] = encoded.base64.split(",");
      const [nameimg, ext] = encoded.name.split(".");
  

      const vendorimg = rest.join("-");
      let imar = {
      
        vendor_id: `${vendorID}`,
        documents_name: `${encoded.name}${i}${vendorID}`,
        documents_position: `position${i}`,
        type_of_file:`${ext}`,
        img_64: vendorimg,
      };
      ImgObj.push(imar);
    }
    // image
    if(newImageUrls.length<=5){
      axios
      .post(`${process.env.REACT_APP_BASEURL}/vendor_documents_upload`, ImgObj)
      .then((response) => {
        onImgView(vendorID)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    else{
      alert("Cannot upload more than 6 image")
    }
    
  };



  const onImgRemove = (
    id,
    vendor_id,
 
    ) => {
       axios
    .put(`${process.env.REACT_APP_BASEURL}/vendor_document_delete`,{
      "vendor_doc_id":`${id}`,
      "vendor_id": `${vendor_id}`
    }
    )
    .then((response) => {
       onImgView(vendor_id);
    })
    .catch(function (error) {
      console.log(error);
    });};




const onImgView = (vendorID) =>{
  axios
      .get(`${process.env.REACT_APP_BASEURL}/vendor_documents_get?vendor_id=${vendorID}`)
      .then((response) => {
      //  console.log("response--------------------"+JSON.stringify(response.data))
       setnewImageUrls(response.data)
    //  console.log("new img length------"+((response.data.length)))

      
      })
      .catch(function (error) {
        console.log(error);
      });
}




  //img code end-------------------------------------------------------------------------------------------------

     let returnarr=[];
  // social media link
  const oncustomheadChange = (e) => {
    setheaderval(e.target.value);
    // setAddCustom((AddCustom) =>{ return {...AddCustom,  e.target.value : e.target.value}});
  };
  console.log("checkkkk"+JSON.stringify(AddCustom))



  const oncustomdescChange = (e) => {
    setdescval(e.target.value);
  };
  console.log("--------uuuuuuu-------"+JSON.stringify(AddCustom))

  // const handleAClick = () => {
useEffect(()=>{

  if (headerval !== '' && descval !== '') {
    setcustomarray(customarray => [...customarray, AddCustom]);
    setheaderval('');
    setdescval('');
    setAddCustom('')
    // setcustomValidated(false);
    setsCall(false)
    // console.log("--------hello-------"+JSON.stringify(customarray))
  }
 
},[scall])

  // }

  const handleAddClick = (e) => {
    let returnedTarget = Object.assign({},{[headerval]:descval});  
  setAddCustom(...AddCustom,returnedTarget);
  setsCall(true)
  }
  console.log("--------customarray-------"+JSON.stringify(customarray))


  const handleRemoveClick = (e) => {
    setcustomarray(customarray.filter(item => item !== e));
  };
  useEffect(() => {
    setaddvendordata({
      ...addvendordata,
      testjson: customarray
    });
  }, [customarray]);

  // end social media link

  let shoplogo = `${process.env.REACT_APP_BASEURL}/${addvendordata.shop_logo}`
  let docsdata = `${process.env.REACT_APP_BASEURL}/${DocuImgarray}`
  var Newshoplogo = shoplogo.replace("/public", "");
  var imgdata =docsdata.replace("/public", "");
  const handleClick = () => {};
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
  let socialname =  addvendordata.testjson
 let socialname_new=JSON.stringify(socialname)
  console.log("socialname----------"+socialname);
  console.log("socialname----------"+socialname_new);



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
    // formData.append("image",fileDoc);
    formData.append("filename", fileDocName);
    formData.append("document_name",x);
    formData.append("status",addvendordata.status);
    formData.append("social_media_links",socialname_new)

      axios
      .post(`${process.env.REACT_APP_BASEURL}/vendor_register`,formData)
      .then((response) => {
    setapicall(true);
    setShow(false);
console.log("-------done"+response.data)
      })
      .catch(function(error) {
        console.log(error);
      });
      formRef.current.reset();
      setValidated(false);
    }
  };

  const UpdateVendorClick = (e) => {
  let x = [addvendordata.document_name]
    e.preventDefault();
    const formData = new FormData();

    let socialname =  addvendordata.testjson
    let socialname_new=JSON.stringify(socialname)
     console.log("se----------"+socialname);
     console.log("seAAAAAAAAAAAAAaaa----------"+socialname_new);


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
    // formData.append("image",fileDoc);
    formData.append("filename", fileDocName);
    formData.append("document_name",x);
    formData.append("status",addvendordata.status);
    formData.append("social_media_links",socialname_new)
    axios
    .put(`${process.env.REACT_APP_BASEURL}/vendor_update`,formData)
    .then((response) => {
      let data=response.data
    // console.log("formupdate----------   " + JSON.stringify(response.data));
      // setvendordata(data)
      setapicall(true);
    setShow(false);

    })
    .catch(function(error) {
      console.log(error);
    });
  };



  // console.log("VEDORR"+JSON.stringify(addvendordata))

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
              <option value={""}>-Status-</option>
                
        
              <option value="pending"> Pending</option>
              {/* <option value="approved">Approved</option> */}
              <option value="blocked">Blocked</option>
              <option value="in progress">In Progress</option>
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
              <option value={""}>-Store Type-</option>
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
                    onClick={(event) => {
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
                            <div>
                        <Badge className="tagselecttitle mb-0" bg="success" >
                        {seotags === null || seotags === undefined ? '' : seotags
                        }
                 
                          <GiCancel
                            className=" mx-0 ms-1 btncancel"
                            onClick={() => DocuRemoveClick(seotags)}
                          />
                        </Badge>
                            </div>
                          )
                         })}
                        
                      </div>
                      }
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill document name
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              {/* social media links */}

              <div className="my-3 inputsection_box">
                  <h5 className="m-0">Add Social Media Link</h5>
                  <div className=" mt-0 mb-3">
                    <Table className="align-middle" >
                      <thead>
                        <tr>
                          <th >Social Media</th>
                          <th >Link</th>
                          <th ></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center col-4">
                            <InputGroup className="">
                              <Form.Control
                                value={headerval}
                                type="text"
                                sm="9"
                                min={'1'}
                                onChange={oncustomheadChange}
                                
                                name={'header'}
                                className={(customvalidated === true) ? 'border-danger' : null}
                              />
                            </InputGroup>

                          </td>
                          <td className="col-4">
                            <InputGroup className="">
                              <Form.Control
                                className={(customvalidated === true) ? 'border-danger' : null}
                                value={descval}
                                name={'description'}
                                type="text"
                                sm="9"
                                min={'1'}
                                onChange={oncustomdescChange}
                                onKeyPress={event => {
                                  if (event.key === "Enter") {
                                    handleAddClick();
                                  }
                                }
                                }
                              />
                            </InputGroup>
                          </td>
                          <td className="">
                            <Button variant="outline-success" className="addcategoryicon"
                              onClick={() => handleAddClick()} size="sm">
                              +
                            </Button> 
                          </td>
                        </tr>
                        {
                        ((customarray) || []).map((variantdata, i) => {
                          let v =JSON.stringify(variantdata);
                          console.log("v__________________"+v)
                          let st = v.split(':');
                         let pro = st[0].replace(/[{}]/g, "");
                         let link = st[1].replace(/[{}]/g, "");
            
                         

                          return (
                            <tr className="">
                              <td className=" text-center">
                                <InputGroup className="">
                                  <Form.Control
                                    value={JSON.parse(pro)}
                                    type="text"
                                    sm="9"
                                    min={'1'}
                                    onChange={oncustomheadChange}
                                    name={'custom_input_header'}
                                    required
                                  />
                                </InputGroup>

                              </td>
                              <td className="text-center">
                                <InputGroup className="">
                                  <Form.Control
                                    required
                                    value={JSON.parse(link)}
                                    name={'custom_input_desc'}
                                    type="text"
                                    sm="9"
                                    min={'1'}
                                    onChange={oncustomdescChange}
                                    onKeyPress={event => {
                                      if (event.key === "Enter") {
                                        handleAddClick();
                                      }
                                    }
                                    }
                                  />
                                </InputGroup>
                              </td>
                              <td className="">
                                <Button variant="text-danger" className="addcategoryicon text-danger"
                                  onClick={() => handleRemoveClick(variantdata)} size="sm">
                                  &times;
                                </Button>
                              </td>
                            </tr>
                          )
                        })
                        }
                      </tbody>
                    </Table>
                  </div>
                  {/* );
                })} */}
                  {/* --------------------------------------------- */}
                </div>
{/* end social media link */}
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




     //
{/*   Add Docs model */}


          <Modal
          size="lg"
          show={docsshow}
          onHide={ handleDocsClose}
          
        >
          <Form ref={formRef}>
            <Modal.Header closeButton>
              <Modal.Title>Add Images and Documents</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row ">
            <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom09"
                >
                  <Form.Label>Documents Upload </Form.Label>
                  <Form.Control
                    onChange={(e) => imguploadchange(e)}
                    multiple
                    type="file"
                    placeholder="multiple document upload"
                    name={"img_64"}
                  />
                

                </Form.Group>
              </div>
              </div>
              <Table >
                 <tbody>
                           {newImageUrls? (
                                          <tr>
                                            {newImageUrls.map((imgg, i) => {
                                              
                                              return (
                                         
                                               
                                                  <td className="imgprivew_box">
                                                  
                                                      <img
                                                        src={imgg.documents_path}
                                                        key={i}
                                                        alt="apna_organic"
                                                        width={80}
                                                        height={100}
                                                      />
                                                      <span
                                                        className="cross_icon"
                                                        onClick={() =>
                                                          onImgRemove(
                                                            imgg.vendor_doc_id,
                                                            imgg.vendor_id,
                                                          )
                                                        }
                                                      >
                                                        X
                                                      </span>
                                                  
                                                  </td>
                                                 
                                                
                                                
                                              );
                                             
                                            })}
                                         
                                          </tr>
                                        ) : null} 
                                        </tbody>
                                        </Table>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button main_outline_button"
                onClick={() => handleDocsClose()}
              >
                Cancel
              </button>
           
            </Modal.Footer>
          </Form>
        </Modal>




{/* /End add docs model/ */}
    </div>
  );
};

export default VendorsList;
