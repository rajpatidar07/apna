import React, { useState, useRef, useEffect } from "react";
import Input from "../common/input";
import { AiOutlinePlus } from "react-icons/ai";
// import fetch from 'node-fetch';
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import { Badge } from "react-bootstrap";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";

const CategoryList = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const handleAlert = (id) =>{
    setParentid(id[0])

    setlevel(id[1])
    setAlert(true);
  } 
  const hideAlert = () =>{
    console.log(parentid+level+"---ppppppppppp")
    axios.put(`http://192.168.29.108::5000/delete_category`,{
      "id":parentid,
      "is_active":0,
      "level": level
  });setAlert(false);
  } 
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState("");
  const [newName, setnewName] = useState("");
  const[type,setType]=useState("")
  const [image,setImage]=useState();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [indVal, setIndVal] = useState(0);
  const [subCategory, setSubCategory] = useState([]);
  const [childCategory, setchildCategory] = useState([]);
  const [grandcCategory, setgrandcCategory] = useState([]);
  const [scategory, setScategory] = useState([]);
  const [level, setlevel] = useState(0);
  const [file, setFile] = useState();
  const [cid, setCid] = useState();
 const [fileName, setFileName] = useState("");
 const [parentid, setParentid] = useState('');
 const [allparentid, setAllparentid] = useState();
const saveFile = (e) => {
setFile(e.target.files[0]);
 setFileName(e.target.files[0].name);
 };
  const handleClose = () => {
    formRef.current.reset();
    // setData("");
    setValidated(false);
    setShow(false);
  };
  const handleShow = (e,name,all_parent_id,parent_id,level) => {
    if (e === "add") {
      setShow(e);
    }
    if (e !== "add") {
      console.log("update")
      setnewName(name)
      setCid(e)
      setParentid(parent_id)
      setAllparentid(all_parent_id)
      setlevel(level)
      setShow(e);
    }
  };
 
  useEffect(() => {
    function getUser() {
      try {
        axios
          .get("http://192.168.29.108:5000/category?category=all")
          .then((response) => {
            let data = response.data;
            setData(data);
          });
      } catch (err) {}
    }

    getUser();
  }, []);

  useEffect(() => {
    addCategory();
  }, [indVal]);
  const addCategory = async (category, id) => {
    if (id === "" || id === null || id === undefined) {
      try {
        axios
          .get(`http://192.168.29.108:5000/category?category=${indVal}`)
          .then((response) => {
            let cgory = response.data;
            if (indVal === 0) {
              setCategory(cgory);
              setlevel(0);
            } if (indVal === scategory.category_name) {
              setSubCategory(cgory);
              setlevel(1);
            } else if (indVal === scategory.sub_category) {
              setchildCategory(cgory);
              setlevel(2);
            } else if (indVal === scategory.child_category) {
              setgrandcCategory(cgory);
              setlevel(3);
            }else if (indVal === scategory.s_category) {
              setgrandcCategory(cgory);
              setlevel(4);
            }
            

          });
      } catch (err) {}
    }
  };
  console.log("---------------level====" + level);
  const columns = [
    {
      name: "ID",
      selector: (row) => (
        <p
          onClick={() => {
            navigate("/productdetail");
          }}
        >
          {row.id}
        </p>
      ),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingLeft: "0",
      },
    },
    {
      name: "all_parent_id",
      selector: (row) => row.all_parent_id,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "#",
      width: "250px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="75px"
          alt={row.category_name}
          src={row.image}
          style={{
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "right",
          }}
          onClick={() => handleClick()}
        />
      ),
    },
    {
      name: "Category Name",
      selector: (row) => (
        <div className="productdescbox">
          <b>
            <p className="mb-0">{row.category_name}</p>
          </b>
        </div>
      ),
      sortable: true,
      width: "250px",
    },
    // {
    //   name: "Category",
    //   selector: (row) => row.all_parent_id,
    //   sortable: true,
    //   width: "250px",
    // },
    {
      name: "Category Type",
      selector: (row) => row.category_type,
      sortable: true,
      width: "160px",
    },
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <Badge
          bg={
            row.is_active === 0
              ? "success"
              : row.is_active === 1
              ? "danger"
              : null
          }
        >
          {row.is_active === 0 ? "active" : "inactive"}
        </Badge>
      ),
      sortable: true,
      width: "105px",
      // center: true,
    },
    {
      name: "Action",
      width: "200px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this,row.id,row.category_name,row.all_parent_id,row.parent_id,row.level,row.category_type)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this,[row.parent_id,row.level])}
          />
        </div>
      ),
    },
  ];
 
  const handlChangeName = (e, id) => {
    setnewName(e.target.value);
  };
  const handlChangeType = (e, id) => {
    setType(e.target.value);
  };
  const categoryFormChange = (e, id) => {
    setIndVal(e.target.value);
    setScategory({ ...scategory, [e.target.name]: e.target.value});
  };

  // const ImgFormChange = (e,id) => {
  //   setImage(e.target.files[0]);
  // };

  const AddCategoryClick = (e,id) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
    }
    if (form.checkValidity() === true) {
      e.preventDefault();
      console.log("_____________________________test____________")

      const formData = new FormData();
      formData.append("image", file);
      formData.append("filename", fileName);
      formData.append("parent_id", scategory.category_name);
      formData.append("level", level);
      formData.append("all_parent_id", scategory.category_name);
      formData.append("new_category", newName);
      formData.append("category_type", type);
     
// console.log({
//   parent_id: parentid,
//   level: level,
//   all_parent_id:allparentid,
//   new_category: newName,
//   image:formData,
// })
      axios
        .post(`http://192.168.29.108:5000/add_category`,formData, 
        
        )
        .then((response) => {
          console.log("possttttttt------"+JSON.stringify(response))
        });
      formRef.current.reset();
      setValidated(false);
      setData("");
      
    }
  };
  console.log("bahar------"+indVal)
  const UpdateCategoryClick = (show) => {

    console.log("indVal------"+indVal)


     axios.put(`http://192.168.29.108:5000/update_category`, {
      id:cid,
      parent_id: parentid,
      level: level,
      all_parent_id:allparentid,
      new_category:newName,
      category_type:type
  }).then((response) => {
    console.log("possttttttt------"+JSON.stringify(response))
  });
  formRef.current.reset();
  setValidated(false);
  setData("");
  show.preventDefault();
  };
  // // console.log("form----------   " + JSON.stringify(data));
  // console.log("level----------   " + JSON.stringify(scategory));

  const handleClick = () => {};
  const navigate = useNavigate();

  return (
    <div className="App productlist_maindiv">
      <h2>Category</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by category name"}/>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category type"
              className="adminselectbox"
            >
              <option>Search by category type</option>
              <option value="1">Grocery</option>
              <option value="2">Health</option>
              <option value="3">Sports & Accessor</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
            >
              <option>Search by category</option>
              <option value="1">Food</option>
              <option value="2">Fish & Meat</option>
              <option value="3">Baby Care</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Category"}
            onClick={() => handleShow("add")}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button adminmainbutton"}
          />
        </div>

        {/* datatable */}
        <Modal
          show={show}
          onHide={() => handleClose()}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form
            className=""
            validated={validated}
            ref={formRef}
            onSubmit={
              show === "add"
                ? (e) => AddCategoryClick(e, category.id)
                : (show) => UpdateCategoryClick(show)
            }
          >
            <input
              name="id"
              type={"hidden"}
              value={
                category.id !== "" ||
                category.id !== null ||
                category.id !== undefined
                  ? category.id
                  : ""
              }
            />
            <Modal.Header closeButton className="addproductheader">
              <Modal.Title id="example-custom-modal-styling-title">
                {show === "add" ? "Add Category" : " Update Category"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addproductbody p-2">
              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicName"
                  >
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Category Name"
                      required
                      onChange={(e) => handlChangeName(e)}
                      value={newName}
                      name={"category_name"}
                    />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill name
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicCategory"
                  >
                    <Form.Label>Category Type</Form.Label>
                    <Form.Select
                      aria-label="Search by category type"
                      className="adminselectbox"
                      onChange={(e) => handlChangeType(e)}
                      value={type}
                      name={"category_type"}
                    >
                       <option value="">Search by category type</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Health">Health</option>
                      <option value="Sports & Accessor">
                        Sports & Accessor
                      </option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill category type
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicParentCategory"
                  >
                    <Form.Label>Parent Category</Form.Label>
                    <Form.Select
                      aria-label="Search by status"
                      className="adminselectbox"
                      required
                      onChange={(e, id) => categoryFormChange(e, id)}
                      name={"category_name"}
                    >
                      <option value={data.category_name}>
                        Search by category
                      </option>

                      {category.map((cdata, i) => {
                        return (
                          <option value={cdata.id}>
                            {cdata.category_name}{" "}
                          </option>
                        );
                      })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill category
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                {subCategory !="" ? (
                  <div className="col-md-6">
                    <Form.Group
                      className="mb-3 aos_input"
                      controlId="formBasicParentCategory"
                    >
                      <Form.Label>Sub Category</Form.Label>
                      <Form.Select
                        aria-label="Search by status"
                        className="adminselectbox"
                        required
                        onChange={(e, id) => categoryFormChange(e, id)}
                        name={"sub_category"}
                      >
                        <option value="">Search by category</option>

                        {subCategory.map((cdata, i) => {
                          return (
                            <option value={cdata.id}>
                              {cdata.category_name}{" "}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill category
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                ) : null}

                {childCategory != "" ? (
                  <div className="col-md-6">
                    <Form.Group
                      className="mb-3 aos_input"
                      controlId="formBasicParentCategory"
                    >
                      <Form.Label> Child Category</Form.Label>
                      <Form.Select
                        aria-label="Search by status"
                        className="adminselectbox"
                        required
                        onChange={(e, id) => categoryFormChange(e, id)}
                        name={"child_category"}
                      >
                        <option value="">category</option>

                        {childCategory.map((cdata, i) => {
                          return (
                            <option value={cdata.id}>
                              {cdata.category_name}{" "}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill category
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                ) : null}
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicImg"
                  >
                    <Form.Label>Category Icon</Form.Label>
                    <div className="category_icon_box">
                      <Form.Control
                    
                        type="file"
                        placeholder="Category Icon"
                        onChange={(e) => saveFile(e)}
                        name={"category_icon"}
                      />
                      {data.category_icon ? (
                        <img
                          src={image}
                          alt={"apna_organic"}
                          className={"category_icon"}
                        />
                      ) : null}
                    </div>
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                btntext={"X Cancel"}
                onClick={() => handleClose()}
                btnclass={"button main_outline_button adminmainbutton px-2"}
              />
              <Iconbutton
                type={"submit"}
                btntext={show === "add" ? "Add Category" : "Update Category"}
                onClick={(show === 'add' ? AddCategoryClick : () => UpdateCategoryClick(show))}
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body category_table"}
        />
        <SweetAlert
          show={Alert}
          title={"category_name"}
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
};

export default CategoryList;
