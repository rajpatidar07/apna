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
import InputGroup from 'react-bootstrap/InputGroup';
import axios from "axios";

const CategoryList = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [searchvalidated, setsearchValidated] = useState(false);

  const handleAlert = (id) =>{
    setParentid(id[0])

    setlevel(id[1])
    setAlert(true);
  } 
  const hideAlert = () =>{
    console.log(parentid+level+"---ppppppppppp")
    axios.put(`http://192.168.29.108::5000/delete_category`,{
      id:parentid,
      is_active:0,
      level: level
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
  const [scategory, setScategory] = useState({
    category_name:"0",
    sub_category:"",
    child_category:"",
    s_category:""
  });
  const [level, setlevel] = useState('');
  const [file, setFile] = useState();
  const [cid, setCid] = useState();
 const [fileName, setFileName] = useState("");
 const [parentid, setParentid] = useState('');
 const [allparentid, setAllparentid] = useState();
//const [scategory, setScategory] = useState([]);
 const [searchdata, setsearchData] = useState([]);
 const [SearchCat, setSearchCat] = useState({
  "category_name":"",
  "category_type":"",
  "level":""

 });

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
  // const SubcategoryFormChange = (e, id) => {
  //   addCategory();
  //   setScategory({ ...scategory, sub_category: e.target.value});
  // };
  console.log("-----sub----  "+scategory.sub_category )
  let parentidd=[];
  parentidd.push(scategory.category_name)
  parentidd.push(scategory.sub_category)
  useEffect(() => {
    function getUser() {
      try {
        axios
          .get("http://apnaorganicstore.in/myapp/category?category=all")
          .then((response) => {
            let data = response.data;
            setData(data);
            setsearchData(data);

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
          .get(`http://apnaorganicstore.in/myapp/category?category=${indVal}`)
          .then((response) => {
            let cgory = response.data;
            let specificValues = cgory.filter(obj => obj.all_parent_id.substring(0, obj.all_parent_id.length-1) === scategory.category_name);
            if (indVal === 0) {
              setCategory(cgory);
              setlevel(0);
            } 
            if (indVal === scategory.category_name) {
              setSubCategory(specificValues);
              setlevel(1);
            } else if (indVal === scategory.sub_category) {
              setchildCategory(cgory);
              setlevel(2);
            }
            // else if (indVal === scategory.child_category) {
            //   console.log("---child_category"+scategory.child_category)
            //   setlevel(3);
            // }else if (indVal === scategory.s_category) {
            //   setgrandcCategory(cgory);
            //   setlevel(4);
            // }
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
 



  const AddCategoryClick = (e,id) => {
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
      formData.append("parent_id", indVal);
      formData.append("level", level);
      formData.append("all_parent_id", parentidd);
      formData.append("new_category", newName);
      formData.append("category_type", type);
      axios
        .post(`http://apnaorganicstore.in/myapp/add_category`,formData, 
        
        )
        .then((response) => {
          console.log("possttttttt------"+JSON.stringify(response))
        });
      formRef.current.reset();
      setValidated(false);
      setData("");
      
    }
  };
  const UpdateCategoryClick = (show) => {
     axios.put(`http://apnaorganicstore.in/myapp/update_category`, {
      id:cid,
      parent_id: parentid,
      level: level,
      all_parent_id:allparentid,
      new_category:newName,
      category_type:type
  }).then((response) => {
  });
  formRef.current.reset();
  setValidated(false);
  setData("");
  show.preventDefault();
  };
  const onValueChange=(e)=>{
    setSearchCat({ ...SearchCat, [e.target.name]: e.target.value });
   
  }
  const SearchCategory=()=>{
    if(SearchCat.category_name ==='' || SearchCat.category_name=== null || SearchCat.category_name === undefined){
      console.log(SearchCat.category_name+"cat"+searchvalidated)
       setsearchValidated(true)
    }
    else
    {
      axios.post(`${process.env.REACT_APP_BASEURL}/search_category`,{
        "category_name":`${SearchCat.category_name}`,
        "category_type":`${SearchCat.category_type}`,
        "level":`${SearchCat.level}`

    }).then ((response) => {
      setData(response.data);
      setSearchCat('')
      setsearchValidated(false)

      })
    }
   
  }
  const handleClick = () => {};
  const navigate = useNavigate();

  const result1 = searchdata.filter((thing, index, self) =>
  index === self.findIndex((t) => (
    t.category_type == thing.category_type 
  )))
  const result2 = searchdata.filter((thing, index, self) =>
  index === self.findIndex((t) => (
    t.level == thing.level 
  )))

  return (
    <div className="App productlist_maindiv">
      <h2>Category</h2>
         
      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input  required type="text" className="adminsideinput"  placeholder={"Search by category name"} value={SearchCat.category_name} name={"category_name"} onChange={(e) => onValueChange(e)} />
            {searchvalidated === true? 
            <p className="mt-1 ms-2 text-danger" type="invalid">
                      Please fill this field
                    </p> : null}
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category type"
              className="adminselectbox"
              onChange={(e) => onValueChange(e)}
              name="category_type"
                // placeholder={"Search by category type"}
                value={SearchCat.category_type}
            >
              <option>Search by category type</option>
              {result1.map((lvl,i)=>{
                return( <option value={lvl.category_type} key={i}>{lvl.category_type}</option>)
              })}
              {/* <option value="">{type.category_type}</option>
              <option value="2">Health</option>
              <option value="3">Sports & Accessor</option> */}
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
              {result2.map((lvl,i)=>{
                return( 
                <option value={lvl.level} key={i}>{lvl.level}</option>
                )
              })} 
              {/* <option value="2">Fish & Meat</option>
              <option value="21">Baby Care</option> */}
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={SearchCategory}
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
                      name={"category_type"}
                    >
                       <option value="">Search by category type</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Health">Health</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Electronic">Electronic</option>
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
                      <option value={'0'}>
                        Search by category
                      </option>

                      {category.map((cdata, i) => {
                        return (
                          <option value={cdata.id} key={i}>
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
                            <option value={cdata.id} key={i}>
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
                        // onChange={(e, id) => categoryFormChange(e, id)}
                        name={"child_category"}
                      >
                        {childCategory.map((cdata, i) => {
                          return (
                            <option value={cdata.id} key={i}>
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
