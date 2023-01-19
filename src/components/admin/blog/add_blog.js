import React, { useState, useRef } from "react";
import Input from "../common/input";
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
import { Badge, Button, InputGroup } from "react-bootstrap";
import moment from "moment";
let categoryArray = [];

const BlogList = () => {
  const formRef = useRef();
  const [changstatus, setchangstatus] = useState("");
  const [apicall, setapicall] = useState(false);
  const [validated, setValidated] = useState(false);

  const [show, setShow] = useState("");
  const [Alert, setAlert] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState();
  const [DocuImgarray, setDocuImgArray] = useState([]);
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [AddAlert, setAddAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [blog, setBlog] = useState([]);
  const [addblog, setaddBlog] = useState({
    admin_id: "",
    image: "",
    title: "",
    description: "",
    category: "",
    product_tag: "",
    publish_date: "",
  });
  console.log("======================" + JSON.stringify(addblog));
  const [searchdata, setsearchData] = useState([]);
  // const [searchblog, setsearchBlog] = useState({
  //   id:"",
  //   for_:"admin",
  //   recent:"",
  //   category:"",
  //   product_tag:""
  //   })
  const [recent, setRecent] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [productTagSearch, setProductTagSearch] = useState("");

  // Function of cancel add success alert:-

  const closeAddAlert = () => {
    setAddAlert(false);
  };

  // Function of cancel update success alert:-

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  const OnCtegorySearch = (e) => {
    setCategorySearch(e.target.value);
  };
  const onRecentSearch = (e) => {
    setRecent(e.target.value);
    if (recent) {
      setapicall(true);
    }
  };
  const onSearchClick = () => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/blogs`, {
        id: "",
        for_: "admin",
        recent: recent,
        category: [categorySearch],
        product_tag: productTagSearch,
      })
      .then((response) => {
        let data = response.data;
        console.log("search----------   " + JSON.stringify(response.data));
        setBlog(response.data);
        // setsearchBlog('')
        categoryArray = [];
        setapicall(false);
      });
  };
  const ImgFormChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const handleFormChange = (e) => {
    setaddBlog({ ...addblog, [e.target.name]: e.target.value });
    // console.log("dataaaaaaaaaaaaaaaaaaaaaaa"+JSON.stringify(addblog))
  };

  const handleClose = () => {
    formRef.current.reset();
    setValidated(false);
    setShow(false);
  };

  const handleShow = (e, id) => {
    // console.log("gggggggggggggg"+e)

    if (e === "add") {
      setShow(e);
    } else {
      function getBlog() {
        try {
          axios
            .post(`${process.env.REACT_APP_BASEURL}/blogs`, {
              id: e,
              for_: "admin",
              recent: "",
              category: [],
              product_tag: "",
            })
            .then((response) => {
              let data = response.data;
              // console.log("gggggggggggggg"+JSON.stringify(data));
              setaddBlog(response.data[0]);
              setsearchData(data);
              setId(id);
              // setBlog(response.data);
              // setAdminId(response.data.admin_id);
              setapicall(false);
            });
        } catch (err) {}
      }
      getBlog();
      setShow(true);
    }
  };
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/blogs`, {
        id: "",
        for_: "admin",
        recent: "",
        category: [],
        product_tag: "",
      })
      .then((response) => {
        let data = response.data;
        setBlog(response.data);
        // console.log("ALL DATA"+JSON.stringify(response.data))
        // setDocuImgArray(JSON.parse(response.data[0].multiple_document_upload))

        setaddBlog(response.data);
        setsearchData(data);
        setapicall(false);
      });
  }, [apicall]);

  const admid = localStorage.getItem("adminid");
  // console.log("adminnnnnnnnnnnn___________________-"+(admid))

  const AddBlog = (e, id) => {
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
      formData.append("admin_id", admid);
      formData.append("title", addblog.title);
      formData.append("description", addblog.description);
      formData.append("category", addblog.category);
      formData.append("product_tag", addblog.product_tag);
      formData.append("publish_date", addblog.publish_date);
      // console.log("adminmmmmmmm"+adminId)
      axios
        .post(`${process.env.REACT_APP_BASEURL}/add_blog`, formData)
        .then((response) => {
          let data = response.data;
          setShow(false);
          setapicall(true);
          // setAdminId();
          setAddAlert(true);
        })
        .catch(function (error) {
          console.log(error);
        });
      formRef.current.reset();
      setValidated(false);
      // setData("");
    }
  };

  console.log("kkkkkkkkkkk_______________________kkkkkkkk" + admid);
  const UpdateBlog = (show) => {
    const formData = new FormData();
    console.log("---show" + addblog.id);

    formData.append("image", file);
    formData.append("filename", fileName);
    formData.append("admin_id", admid);
    formData.append("title", addblog.title);
    formData.append("description", addblog.description);
    formData.append("category", addblog.category);
    formData.append("product_tag", addblog.product_tag);
    formData.append("publish_date", addblog.publish_date);
    formData.append("id", addblog.id);
    axios
      .put(`${process.env.REACT_APP_BASEURL}/update_blog`, formData)
      .then((response) => {
        let data = response.data;
        console.log("formupdate----------   " + JSON.stringify(response.data));
        setapicall(true);
        setShow(false);
        setUpdateAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    formRef.current.reset();
    setValidated(false);
    show.preventDefault();
  };

  const handleAlert = (id) => {
    setId(id);
    setAlert(true);
    console.log("idddddddd" + id);
  };

  const hideAlert = () => {
    console.log("--id" + id);
    axios.put(`${process.env.REACT_APP_BASEURL}/delete_blog`, {
      is_delete: "0",
      id: `${id}`,
    });
    setapicall(true);
    setAlert(false);
  };

  // to cancel in the delete alert :-

  const CancelAlert = () => {
    setAlert(false);
  };

  console.log("newwwwwwwwww consoleeeeeeee" + id);
  const columns = [
    {
      name: "Admin_id",
      selector: (row) => row.admin_id,
      sortable: true,
    },
    {
      name: "id",
      selector: (row) => row.id,
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
            alt={row.owner_name}
            src={row.image}
            style={{
              borderRadius: 10,
              paddingTop: 10,
              paddingBottom: 10,
              textAlign: "right",
            }}
            // onClick={() => handleClick()}
          />
        </>
      ),
    },
    // {
    //   name: "Logo",
    //   center: true,
    //   cell: (row) => (
    //     <img
    //       width={"100%"}
    //       alt={row.title}
    //       src={row.image}
    //       style={{
    //         borderRadius: 15,
    //         paddingTop: 10,
    //         paddingBottom: 10,
    //         textAlign: "right",
    //       }}
    //     />
    //   ),
    // },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Product_tag",
      selector: (row) => row.product_tag,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Publish_date",
      selector: (row) => moment(row.publish_date).format("YYYY-MM-DD"),
      sortable: true,
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <Badge
          bg={
            row.status === "approved"
              ? "success"
              : row.status === "pending"
              ? "warning"
              : row.status === "published"
              ? "info"
              : null
          }
        >
          {row.status}
        </Badge>
      ),
      sortable: true,
      width: "120px",
      // center: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onStatusChange(e, row.id, row.status)}
          name="status"
        >
          <option
            value="pending"
            selected={row.status === "pending" ? true : false}
          >
            Pending
          </option>
          <option
            value="published"
            selected={row.status === "published" ? true : false}
          >
            Published
          </option>
          <option
            value="approved"
            selected={row.status === "approved" ? true : false}
          >
            Approved{" "}
          </option>
        </Form.Select>
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
            onClick={handleShow.bind(
              this,
              row.id,
              row.title,
              row.category,
              row.description,
              row.product_tag,
              row.publish_date,
              row.image
            )}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, row.id)}
          />
        </div>
      ),
    },
  ];
  const result1 = searchdata.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.category == thing.category)
  );
  const result2 = searchdata.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.product_tag == thing.product_tag)
  );
  const handleClick = () => {};
  // let logo = `${process.env.REACT_APP_BASEURL}/${addblog.image}`
  // let docsdata = `${process.env.REACT_APP_BASEURL}/${DocuImgarray}`
  // var Newlogo = logo.replace("/public", "");
  // var imgdata =docsdata.replace("/public", "");
  // console.log("dataaSHOWWWWWWWWWWWWW"+JSON.stringify(searchdata))

  const onStatusChange = (e, id) => {
    // e.prevantDefault();
    setchangstatus(e.target.value);
    axios
      .put(`${process.env.REACT_APP_BASEURL}/update_blog_status`, {
        status: e.target.value,

        id: `${id}`,
      })
      .then((response) => {
        let data = response.data;
        setStatus(data);
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  console.log("kkkkkkkkkkkkkkkkkk" + JSON.stringify(status));

  let date = moment();
  let currentDate = date.format("YYYY-MM-DD");
  console.log(currentDate);

  return (
    <div>
      <h2>Blog List</h2>

      {/* search bar */}
      <div className="card p-3">
        <div className="row page_searchbox">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              placeholder={"Search by Days"}
              onChange={onRecentSearch}
              name="recent"
              className={"adminsideinput"}
            />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Category"
              className="adminselectbox"
              onChange={OnCtegorySearch}
              // value={searchblog.category}
              name="category"
            >
              <option value={""}>Select Category</option>
              {result1.map((searchData) => {
                return (
                  <>
                    <option value={searchData.category}>
                      {searchData.category}
                    </option>
                  </>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by Store Type"
              className="adminselectbox"
              name="product_tag"
              // value={searchblog.product_tag}

              onChange={(e) => {
                setProductTagSearch(e.target.value);
              }}
            >
              <option value={""}>Select Product Tag</option>
              {result2.map((searchData) => {
                return (
                  <>
                    <option value={searchData.product_tag}>
                      {searchData.product_tag}
                    </option>
                  </>
                );
              })}
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <button
              className="button main_button w-100"
              onClick={() => onSearchClick()}
            >
              Search
            </button>
          </div>
        </div>

        <div className="product_page_uploadbox my-4">
          <button
            className="button main_button ml-auto"
            onClick={() => handleShow("add")}
          >
            Add Blogs
          </button>
        </div>
        <DataTable
          columns={columns}
          className="main_data_table"
          data={blog}
          pagination
          highlightOnHover
          pointerOnHover
        />
        <SweetAlert
          show={Alert}
          title="Blog"
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
          onSubmit={show === "add" ? (e) => AddBlog(e) : (e) => UpdateBlog(e)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {show === "add" ? "Add New Blog " : " Update Blog "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    required
                    value={addblog.title}
                    type="text"
                    placeholder="Add Title"
                    name={"title"}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill title
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom06"
                >
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    size="sm"
                    aria-label="Default select example"
                    onChange={(e) => handleFormChange(e)}
                    required
                    value={addblog.category}
                    name={"category"}
                  >
                    <option>Select Category</option>
                    <option>Feshion</option>
                    <option>Grocry</option>
                    <option>Electronic</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill category
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="formBasicStartDate"
                >
                  <Form.Label>Publish Date</Form.Label>
                  <Form.Control
                    name="publish_date"
                    min={currentDate}
                    type="date"
                    defaultValue={
                      show === "add"
                        ? ""
                        : moment(addblog.publish_date).format("YYYY-MM-DD")
                    }
                    onChange={(e) => handleFormChange(e)}
                    required
                    placeholder="Blog Date"
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill date
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Product_Tag</Form.Label>
                  <Form.Control
                    onChange={(e) => handleFormChange(e)}
                    required
                    value={addblog.product_tag}
                    type="text"
                    placeholder="Add Tag"
                    name={"product_tag"}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill field
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
                    placeholder="write your blog..."
                    name={"description"}
                    onChange={(e) => handleFormChange(e)}
                    required
                    value={addblog.description}
                  />
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please fill description
                  </Form.Control.Feedback>
                </Form.Group>
              </div>

              <div classImg="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom08"
                >
                  <Form.Label>Blog Image</Form.Label>
                  <Form.Control
                    // onChange={(e) => saveFile(e)}
                    onChange={(e) => ImgFormChange(e)}
                    src={addblog.image}
                    type="file"
                    placeholder="Shop_logo"
                    name={"image"}
                  />
                  {/* {addvendordata.shop_logo ?
                  <img src={Newshoplogo} width={'50px'}/> : null} */}
                  <Form.Control.Feedback type="invalid" className="h6">
                    Please upload image
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            {/* <button
              className="button main_outline_button"
              onClick={() => handleClose()}
            >
              Cancel
            </button> */}
            <Iconbutton
              type={"button"}
              btntext={"Cancel"}
              onClick={() => handleClose()}
              btnclass={"button main_outline_button "}
              // Iconname={<GiCancel /> }
            />
            <Iconbutton
              type={"submit"}
              btntext={show === "add" ? "Add Blog" : "Update Blog"}
              // onClick={(show === 'add' ? AddVendorClick : UpdateVendorClick(show))}
              btnclass={"button main_button "}
            />
          </Modal.Footer>
        </Form>
      </Modal>

      <SweetAlert
        show={AddAlert}
        title="Added Blog Successfully "
        onConfirm={closeAddAlert}
      />
      <SweetAlert
        show={UpdateAlert}
        title="Updated Blog Successfully "
        onConfirm={closeUpdateAlert}
      />
    </div>
  );
};

export default BlogList;
