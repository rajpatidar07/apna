import React, { useState, useRef } from "react";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { useEffect } from "react";
import Iconbutton from "../common/iconbutton";
import axios from "axios";

function Banner() {
  const formRef = useRef();
  const [error, setError] = useState(true);

  const [show, setShow] = useState("");
  const [Alert, setAlert] = useState(false);
  const [validated, setValidated] = useState(false);
  const [banner, setBanner] = useState([]);
  const[imageBanner,setImageBanner]=useState([]);
  const [apicall, setapicall] = useState([]);
  const [bannerId, setBannerId] = useState("");
  const [Imgarray, setImgArray] = useState([]);
  const [file, setFile] = useState();
  const [AddAlert, setAddAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [fileName, setFileName] = useState("");
  const [addBanner, setAddBanner] = useState({
    image: "",
    title: "",
    description: "",
    size: "",
    banner_url: "",
    banner_location: "",
  });

  const columns = [
    {
      name: "Banner_id",
      selector: (row) => row.banner_id,
      sortable: true,
    },
    {
      name: "Logo",
      width: "250px",
      center: true,
      cell: (row) => (
        <>
          <img
            height="90px"
            width="75px"
            alt={row.title}
            src={row.image.replace("public", "")}
            style={{
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "right",
            }}
            onClick={() => handleClick()}
          />
        </>
      ),
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Size",
      selector: (row) => row.size,
      sortable: true,
    },
    {
      name: "Banner_url",
      selector: (row) => row.banner_url,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Banner_location",
      selector: (row) => row.banner_location,
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
            onClick={handleShow.bind(
              this,
              row.banner_id,
              row.title,
              row.description,
              row.image,
              row.banner_url,
              row.banner_location,
              row.size
            )}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.banner_id)}
          />
        </div>
      ),
    },
  ];
  const closeAddAlert = () => {
    setAddAlert(false);
  };

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  let logo = `${process.env.REACT_APP_BASEURL}/${addBanner.image}`;
  let docsdata = `${process.env.REACT_APP_BASEURL}/${Imgarray}`;
  var Newlogo = logo.replace("/public", "");
  const handleAlert = (banner_id) => {
    setBannerId(banner_id);
    setAlert(true);
  };

  const handleClick = () => {};

  const hideAlert = () => {
    axios.put(`${process.env.REACT_APP_BASEURL}/banner_delete`, {
      banner_id: `${bannerId}`,
      is_deleted: 0,
    });
    setapicall(true);
    setAlert(false);
  };
  const CancelAlert = () => {
    setAlert(false);
  };

  const handleShow = (e, banner_id) => {


    if (e === "add") {
      setShow(e);
    } else {
      function getBanner() {
        try {
          axios
            .post(`${process.env.REACT_APP_BASEURL}/banner_list`, {
              banner_id: e,
              title: "",
              banner_location: "",
            })
            .then((response) => {
              let data = response.data;
              setBanner(data);
              setAddBanner(response.data[0]);
              setBannerId(banner_id);
              setImgArray(response.data[0].image);
            });
        } catch (err) {}
      }
      getBanner();
      setShow(true);
    }
  };
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/banner_list`, {
        banner_id: "",
        title: "",
        banner_location: "",
      })
      .then((response) => {
        let data = response.data;
        setBanner(response.data);
        setAddBanner(response.data);
        
      });
  }, [apicall]);

  const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleFormChange = (e) => {
    setAddBanner({ ...addBanner, [e.target.name]: e.target.value });
  };
  const handleBannerChange=(e)=>{
    setImageBanner({...imageBanner,[e.target.name]: e.target.value})
  }

  const handleClose = () => {
    formRef.current.reset();
    setValidated(false);
    setShow(false);
  };
  const AddBanner = (e, banner_id) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
    }
    if (form.checkValidity() === true) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", file);
      formData.append("filename", fileName);
      formData.append("banner_url", addBanner.banner_url);
      formData.append("title", addBanner.title);
      formData.append("description", addBanner.description);
      formData.append("size", addBanner.size);
      formData.append("banner_location", addBanner.banner_location);
      axios
        .post(`${process.env.REACT_APP_BASEURL}/add_banner`, formData)
        .then((response) => {
          if(response.data.code=="ER_DUP_ENTRY"){
            setError(false);
          }
          else
          {
            setShow(false);
          setapicall(true);
          setAddAlert(true);
          }
          let data = response.data;
        });
      formRef.current.reset();
      setValidated(false);
      // setData("");
    }
  };
  const UpdateBanner = (show) => {

    const formData = new FormData();
    formData.append("image", file);
    formData.append("filename", fileName);
    formData.append("banner_url", addBanner.banner_url);
    formData.append("title", addBanner.title);
    formData.append("description", addBanner.description);
    formData.append("size", addBanner.size);
    formData.append("banner_location", addBanner.banner_location);
    formData.append("banner_id", addBanner.banner_id);
    axios
      .put(`${process.env.REACT_APP_BASEURL}/update_banner`, formData)
      .then((response) => {
        let data = response.data;
        setShow(false);
        setapicall(true);
        setUpdateAlert(true);
      });
    formRef.current.reset();
    setValidated(false);
  };
  return (
    <div>
      <h2>Banner Manager</h2>

      {/* search bar */}
      <div className="card p-3">
        <div className="product_page_uploadbox my-4">
          <button
            className="button main_button ml-auto"
            onClick={() => handleShow("add")}
          >
            Add Banner
          </button>
        </div>
        <DataTable
          columns={columns}
          className="main_data_table"
          data={banner}
          pagination
          highlightOnHover
          pointerOnHover
        />
        <SweetAlert
          show={Alert}
          title="Banner"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={CancelAlert}
        />
      </div>
      <Modal size="lg" show={show} onHide={() => handleClose()}>
        <Form
          className=""
          noValidate
          validated={validated}
          ref={formRef}
          onSubmit={
            show === "add" ? (e) => AddBanner(e) : (e) => UpdateBanner(e)
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {show === "add" ? "Add New Banner " : " Update Banner "}
            </Modal.Title>
          </Modal.Header>
          {error === false ? (
              <p
                className="mt-2 ms-2 text-danger text-center fs-6"
                type="invalid"
              >
                Already Added!!!
              </p>
            ) : null}
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    required
                    value={addBanner.title}
                    type="text"
                    placeholder="Add Title"
                    name={"title"}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill title
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Banner_url</Form.Label>
                  <Form.Control
                    required
                    value={addBanner.banner_url}
                    type="text"
                    placeholder="Enter url"
                    name={"banner_url"}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill this field
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    required
                    value={addBanner.size}
                    type="text"
                    placeholder="Add Size"
                    name={"size"}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill Size
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Label>Banner_location</Form.Label>
                {show === "add" ?
                <>
                 <Form.Select
                  aria-label="Search by location"
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                  onChange={(e) => handleBannerChange(e)}
                  placeholder="Add banner_location"

                  name={"banner_location"}
                >
                  <option>Select location</option>
                  
                  <option value="home_page_left_side">
                    home_page_left_side
                  </option>
                  <option value="home_page_left_side(1)">
                    home_page_left_side(1)
                  </option>
                  <option value="home_page_right_side(1)">
                    home_page_right_side(1)
                  </option>
                  <option value="home_page_right_side(2)">
                    home_page_right_side(2)
                  </option>
                </Form.Select>

                {imageBanner.banner_location === "home_page_left_side"?
                  <p className="mt-2 ms-2 text-danger text-center fs-6" type="invalid">
                            Select Image This (height-738px * width-738px)
                            </p>:imageBanner.banner_location==="home_page_left_side(1)"? <p className="mt-2 ms-2 text-danger text-center fs-6" type="invalid">
                            Select Image This (height-356px * width-738px)
                            </p>:imageBanner.banner_location==="home_page_right_side(1)"? <p className="mt-2 ms-2 text-danger text-center fs-6" type="invalid">
                            Select Image This (height-356px * width-356px)</p>:imageBanner.banner_location==="home_page_right_side(2)"? <p className="mt-2 ms-2 text-danger text-center fs-6" type="invalid">
                            Select Image This(height-356px * width-356px)</p> :null}
                </>
               : <Form.Select
               aria-label="Search by location"
               className="mb-3 aos_input"
               
               controlId="validationCustom01"
               placeholder="Add banner_location"

               name={"banner_location"}
             >
               <option>Select location</option>
               
               <option disabled value="home_page_left_side">
                 home_page_left_side
               </option>
               <option disabled value="home_page_left_side(1)">
                 home_page_left_side(1)
               </option>
               <option disabled value="home_page_right_side(1)">
                 home_page_right_side(1)
               </option>
               <option disabled value="home_page_right_side(2)">
                 home_page_right_side(2)
               </option>
             </Form.Select>}
              </div>
              
              <div className="col-md-4">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom08"
                >
                  <Form.Label>Blog Image</Form.Label>
                  <Form.Control
                    onChange={(e) => ImgFormChange(e)}
                    type="file"
                    placeholder="Shop_logo"
                    name={"image"}
                  />
                  {addBanner.image ? (
                    <img src={Newlogo} width={"50px"} />
                  ) : null}
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload image
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-md-12">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom05"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    className="vendor_address"
                    as="textarea"
                    rows={3}
                    placeholder="write here..."
                    name={"description"}
                    required
                    value={addBanner.description}
                    onChange={(e) => handleFormChange(e)}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill description
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="button main_outline_button"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <Iconbutton
              type={"submit"}
              btntext={show === "add" ? "Add Banner" : "Update Banner"}
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>
      <SweetAlert
        show={AddAlert}
        title="Added Banner Successfully "
        onConfirm={closeAddAlert}
      />
      <SweetAlert
        show={UpdateAlert}
        title="Updated Banner Successfully "
        onConfirm={closeUpdateAlert}
      />
    </div>
  );
}
export default Banner;
