import React, { useState, useRef, useEffect } from "react";
import Input from "../common/input";
import { AiOutlinePlus } from "react-icons/ai";
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
var newImg = "";
const CategoryList = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [searchvalidated, setsearchValidated] = useState(false);

  const handleAlert = (id) => {
    setParentid(id[0]);
    setlevel(id[1]);
    setAlert(true);
  };

  const hideAlert = () => {
    console.log("id", parentid, "level", level);
    axios.put(`${process.env.REACT_APP_BASEURL}/delete_category`, {
      id: parentid,
      is_active: 0,
      level: level,
    });
    setAlert(false);
    setapicall(true);
  };

  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState("");
  const [newName, setnewName] = useState("");
  const [type, setType] = useState("");
  const [ImagePaht, setImagePath] = useState("");
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [indVal, setIndVal] = useState(0);
  const [subCategory, setSubCategory] = useState([]);
  const [childCategory, setchildCategory] = useState([]);
  const [grandcCategory, setgrandcCategory] = useState([]);
  const [scategory, setScategory] = useState({
    category_name: "0",
    sub_category: "",
    child_category: "",
    s_category: "",
  });
  const [level, setlevel] = useState("");
  const [cid, setCid] = useState();
  const [parentid, setParentid] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [allparentid, setAllparentid] = useState([]);
  const [apicall, setapicall] = useState(false);
  const [searchdata, setsearchData] = useState([]);
  const [CategoryEditparent, setCategoryEditparent] = useState("");
  const [CategoryEditSubparent, setCategoryEditSubparent] = useState("");
  const [AddAlert, setAddAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [CategoryEditChildparent, setCategoryEditChildparent] = useState("");
  const [CategoryEditdata, setCategoryEditData] = useState([]);
  const [SearchCat, setSearchCat] = useState({
    category_name: "",
    category_type: "",
    level: "",
  });

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const closeAddAlert = () => {
    setAddAlert(false);
    setAlert(false);
  };

  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  const handleShow = (
    e,
    name,
    all_parent_id,
    parent_id,
    level,
    category_type,
    category_name
  ) => {
    // console.log("all parent id---------" + all_parent_id);
    if (e === "add") {
      setShow(e);
    }
    if (e !== "add") {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/category_details?id=${e}`)
          .then((response) => {
            let data = response.data[0];
            // console.log("data-------------" + JSON.stringify(data));
            setCategoryEditData(data);
            setImagePath(response.data[0].image);

            const arr = data.all_parent_id.split(",");
            for (let i = 0; i < arr.length; i++) {
              axios
                .get(
                  `${process.env.REACT_APP_BASEURL}/category_details?id=${arr[i]}`
                )
                .then((response) => {
                  let data = response.data[0];
                  if (i === 0) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`
                      )
                      .then((response) => {
                        setSubCategory(response.data);
                      });
                    setCategoryEditparent(data.category_name);
                  } else if (i === 1) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`
                      )
                      .then((response) => {
                        setchildCategory(response.data);
                      });
                    setCategoryEditSubparent(data.category_name);
                  } else if (i === 2) {
                    setCategoryEditChildparent(data.category_name);
                  }
                });
            }
          });
      } catch (err) {}
      setnewName(name);
      setCid(e);
      setParentid(parent_id);
      setAllparentid(all_parent_id);
      setlevel(level);
      setType(category_type);
      setShow(e);
      setCategoryEditData(data);
    }
  };

  {
    // console.log("image path---" + ImagePaht);
  }
  newImg = ImagePaht.replace("public", "");
  {
    // console.log("image new path ---" + newImg);
  }

  const handlChangeName = (e, id) => {
    setnewName(e.target.value);
  };

  const handlChangeType = (e, id) => {
    setType(e.target.value);
  };

  const categoryFormChange = (e, id) => {
    // console.log("indVallllllll________"+e.target.value)
    // console.log("grandcCategory.id________"+grandcCategory[0])

    // if(indVal===grandcCategory){
    //   alert("dont select Any more")
    // }
    // else{
    // if(e.target.s_category.value !== ""){
    //   alert("fdhfbjhbjkbh")
    // }

    setIndVal(e.target.value);
    setScategory({ ...scategory, [e.target.name]: e.target.value });

    // }
  };

  // }

  // console.log(" Indval---" + indVal);
  // console.log(" Scategory---" + JSON.stringify(scategory));
  let parentidddata = [];
  parentidddata.push(scategory.category_name);

  if (scategory.sub_category !== "") {
    parentidddata.push(scategory.sub_category);
  }
  if (scategory.child_category !== "") {
    parentidddata.push(scategory.child_category);
  }

  function getUser() {
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/category?category=all`)
        .then((response) => {
          let data = response.data.filter((item) => item.is_active === "1");
          setData(data);
          setsearchData(data);
          setapicall(false);
        });
    } catch (err) {}
  }

  useEffect(() => {
    getUser();
  }, [apicall]);

  useEffect(() => {
    addCategory();
  }, [indVal]);

  const addCategory = async (category, id) => {
    if (id === "" || id === null || id === undefined || indVal !== "") {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/category?category=${indVal}`)
          .then((response) => {
            let cgory = response.data;
            let specificValues = cgory.filter(
              (obj) =>
                obj.all_parent_id.substring(0, obj.all_parent_id.length - 2) ===
                scategory.category_name
            );
            if (indVal === 0) {
              setCategory(cgory);
              setlevel(0);
            }
            if (indVal === scategory.category_name) {
              setSubCategory(cgory);
              setchildCategory("");
              setlevel(1);
            } else if (indVal === scategory.sub_category) {
              setchildCategory(cgory);
              setgrandcCategory("");
              setlevel(2);
            } else if (indVal === scategory.child_category) {
              setgrandcCategory(cgory);
              setlevel(3);
            } else if (indVal === scategory.s_category) {
              setgrandcCategory(cgory);
              setlevel(4);
            }
          });
      } catch (err) {}
    }
  };

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
        <div>
          <img
            height="90px"
            width="75px"
            alt={row.category_name}
            src={
              row.image === "no image"
                ? "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                : row.image
            }
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
        <span
          className={
            row.is_active === "0"
              ? "badge bg-success"
              : row.is_active === "1"
              ? " badge bg-danger"
              : null
          }
        >
          {row.is_active === "0" ? "active" : "inactive"}
        </span>
      ),
      sortable: true,
      width: "105px",
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
            onClick={handleShow.bind(
              this,
              row.id,
              row.category_name,
              row.all_parent_id,
              row.parent_id,
              row.level,
              row.category_type
            )}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, [row.id, row.level])}
          />
        </div>
      ),
    },
  ];

  const AddCategoryClick = (e, id) => {
    const form = e.currentTarget;
    setValidated(true);

    if (form.checkValidity() === true) {
      e.stopPropagation();
      e.preventDefault();
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("filename", fileName);
    formData.append("parent_id", indVal);
    formData.append("level", level);
    formData.append("all_parent_id", parentidddata);
    formData.append("new_category", newName);
    formData.append("category_type", type);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/add_category`, formData)
      .then((response) => {
        console.log("Add ", response);
        setnewName("");
        setFileName("");
        setType("");
        setCategoryEditparent("");
        setCategoryEditSubparent("");
        setCategoryEditChildparent("");
        setSubCategory([]);
        setchildCategory([]);
        setgrandcCategory([]);
        setImagePath("");
        newImg = "";
        setFile();
        setValidated(false);
        setShow(false);
        setapicall(true);
        setAddAlert(true);
        formRef.current.reset();
      });
    setValidated(false);
  };

  const UpdateCategoryClick = (show) => {
    const form = show.currentTarget;

    if (form.checkValidity() === true) {
      show.stopPropagation();
      show.preventDefault();
    }

    const formData = new FormData();
    formData.append("id", CategoryEditdata.id);
    formData.append("image", file);
    formData.append("filename", fileName);
    formData.append("parent_id", indVal);
    formData.append("level", level);
    formData.append("all_parent_id", parentidddata);
    formData.append("new_category", newName);
    formData.append("category_type", type);
    axios
      .put(`${process.env.REACT_APP_BASEURL}/update_category`, formData)
      .then((response) => {
        setnewName("");
        setType("");
        setFileName("");
        setCategoryEditparent("");
        setCategoryEditSubparent("");
        setCategoryEditChildparent("");
        setSubCategory([]);
        setchildCategory([]);
        setgrandcCategory([]);
        setImagePath("");
        newImg = "";
        setFile();
        setValidated(false);
        setapicall(true);
        setShow(false);
        setUpdateAlert(true);
      });
    formRef.current.reset();
    setValidated(false);
  };

  const onValueChange = (e) => {
    setSearchCat({ ...SearchCat, [e.target.name]: e.target.value });
    setsearchValidated(false);
  };

  // console.log("Search data------" + JSON.stringify(SearchCat));

  const SearchCategory = () => {
    // console.log(
    //   SearchCat.category_name,
    //   SearchCat.category_type,
    //   SearchCat.level
    // );
    if (
      SearchCat.category_name === "" ||
      SearchCat.category_name === undefined
    ) {
      setsearchValidated(true);
    } else {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/search_category`, {
          category_name: `${SearchCat.category_name}`,
          category_type: `${SearchCat.category_type}`,
          level: `${SearchCat.level}`,
        })
        .then((response) => {
          // console.log(response);
          setData(response.data);
          setsearchValidated(false);
          // setSearchCat("");
        });
    }
  };

  const OnReset = () => {
    setsearchValidated(false);
    setSearchCat({
      category_name: "",
      category_type: "",
      level: "",
    });

    setapicall(true);
  };
  const handleClick = () => {};
  const navigate = useNavigate();

  const result1 = searchdata.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.category_type == thing.category_type)
  );
  const result2 = searchdata.filter(
    (thing, index, self) =>
      index === self.findIndex((t) => t.level == thing.level)
  );

  const handleClose = () => {
    setnewName(" ");
    setType("");
    setCategoryEditparent("");
    setCategoryEditSubparent("");
    setCategoryEditChildparent("");
    setSubCategory([]);
    setchildCategory([]);
    setgrandcCategory([]);
    setImagePath("");
    newImg = "";
    setValidated(false);
    setShow(false);
  };

  return (
    <div className="App productlist_maindiv">
      <h2>Category</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              required
              type="text"
              className="adminsideinput"
              placeholder={"Search by category name"}
              value={SearchCat.category_name}
              name={"category_name"}
              onChange={(e) => onValueChange(e)}
            />
            {searchvalidated === true ? (
              <p className="mt-1 ms-2 text-danger" type="invalid">
                Please fill this field
              </p>
            ) : null}
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              name="category_type"
              onChange={(e) => onValueChange(e)}
              value={SearchCat.category_type}
            >
              <option>Search by category</option>
              {result1.map((lvl, i) => {
                return (
                  <option value={lvl.category_type} key={i}>
                    {lvl.category_type}
                  </option>
                );
              })}
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              name="level"
              onChange={(e) => onValueChange(e)}
              value={SearchCat.level}
            >
              <option>Search by level</option>
              {result2.map((lvl, i) => {
                return (
                  <option value={lvl.level} key={i}>
                    {lvl.level}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={SearchCategory}
            />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button "}
              onClick={OnReset}
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
                      required
                      name={"category_type"}
                    >
                      <option
                        selected={
                          (CategoryEditdata.category_type = "" ? true : false)
                        }
                        value=""
                      >
                        Search by category type
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Cloths"
                            ? true
                            : false)
                        }
                        value="Cloths"
                      >
                        Cloths
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Food"
                            ? true
                            : false)
                        }
                        value="Food"
                      >
                        Food
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type =
                            "Beauty & Personal care" ? true : false)
                        }
                        value="Beauty & Personal care"
                      >
                        Beauty & Personal care
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Mobiles"
                            ? true
                            : false)
                        }
                        value="Mobiles"
                      >
                        Mobiles
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Two wheelers"
                            ? true
                            : false)
                        }
                        value="Two wheelers"
                      >
                        Two wheelers
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Home Applience"
                            ? true
                            : false)
                        }
                        value="Home Applience"
                      >
                        Home Applience
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Grocery"
                            ? true
                            : false)
                        }
                        value="Grocery"
                      >
                        Grocery
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Health"
                            ? true
                            : false)
                        }
                        value="Health"
                      >
                        Health
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Fashion"
                            ? true
                            : false)
                        }
                        value="Fashion"
                      >
                        Fashion
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type = "Electronic"
                            ? true
                            : false)
                        }
                        value="Electronic"
                      >
                        Electronic
                      </option>
                      <option
                        selected={
                          (CategoryEditdata.category_type =
                            "Sports & Accessories" ? true : false)
                        }
                        value="Sports & Accessories"
                      >
                        Sports & Accessories
                      </option>
                    </Form.Select>

                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill category type
                    </Form.Control.Feedback>

                    <span className="text-danger"> </span>
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
                      onChange={(e, id) => categoryFormChange(e, id)}
                      name={"category_name"}
                      placeholder={"Search by category"}
                    >
                      <option value={""}>Select Parent Category</option>
                      {category.map((cdata, i) => {
                        return (
                          <option
                            value={cdata.id}
                            key={i}
                            selected={
                              CategoryEditparent === cdata.category_name
                                ? true
                                : false
                            }
                          >
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

                {subCategory[0] === "" ||
                subCategory[0] === null ||
                subCategory[0] === undefined ? null : (
                  <div className="col-md-6">
                    <Form.Group
                      className="mb-3 aos_input"
                      controlId="formBasicParentCategory"
                    >
                      <Form.Label>Sub Category</Form.Label>
                      <Form.Select
                        aria-label="Search by status"
                        className="adminselectbox"
                        onChange={(e, id) => categoryFormChange(e, id)}
                        name={"sub_category"}
                        // value={CategoryEditdata.category_name}
                      >
                        <option value="">Select Sub category</option>
                        {subCategory.map((cdata, i) => {
                          // console.log(
                          //   CategoryEditSubparent + "CategoryEditSubparent"
                          // );

                          return (
                            <option
                              value={cdata.id}
                              key={i}
                              selected={
                                CategoryEditSubparent === cdata.category_name
                                  ? true
                                  : false
                              }
                            >
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
                )}

                {childCategory[0] === "" ||
                childCategory[0] === null ||
                childCategory[0] === undefined ? null : (
                  <div className="col-md-6">
                    <Form.Group
                      className="mb-3 aos_input"
                      controlId="formBasicParentCategory"
                    >
                      <Form.Label> Child Category</Form.Label>
                      <Form.Select
                        aria-label="Search by status"
                        className="adminselectbox"
                        onChange={(e, id) => categoryFormChange(e, id)}
                        name={"child_category"}
                      >
                        {" "}
                        <option value="">Select Child category</option>
                        {childCategory.map((cdata, i) => {
                          return (
                            <option
                              value={cdata.id}
                              key={i}
                              selected={
                                CategoryEditChildparent === cdata.category_name
                                  ? true
                                  : false
                              }
                            >
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
                )}

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
                        // value={newImg}
                      />
                    </div>
                    {newImg === "" ? null : (
                      <img
                        src={newImg}
                        alt={"apna_organic"}
                        className={"category_icon"}
                        width={"100px"}
                        height={"100px"}
                        style={{ marginTop: 10 }}
                      />
                    )}
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                type={"button"}
                btntext={"Cancel"}
                onClick={() => handleClose()}
                btnclass={"button main_outline_button adminmainbutton px-2"}
              />
              <Iconbutton
                type={"submit"}
                btntext={show === "add" ? "Add Category" : "Update Category"}
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
          title={"Category"}
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={closeAddAlert}
        />
        <SweetAlert
          show={AddAlert}
          title="Added Category Successfully "
          onConfirm={closeAddAlert}
        />
        <SweetAlert
          show={UpdateAlert}
          title="Updated Category Successfully "
          onConfirm={closeUpdateAlert}
        />
      </div>
    </div>
  );
};
export default CategoryList;
