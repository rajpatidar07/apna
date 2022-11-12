import React, { useState, useRef, useEffect } from "react";
import Input from "../common/input";
import {
  AiOutlinePlus,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "../common/iconbutton";
import { Badge } from "react-bootstrap";
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';

const CategoryList = () => {
  const formRef = useRef();
  const [validated, setValidated] = useState(false);
  const [categorydata, setcategorydata] = useState([]);
  const [addcategorydata, setaddcategorydata] = useState([]);
  const [editcategorydata, seteditcategorydata] = useState([]);
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState('');
  const handleClose = () => {
    formRef.current.reset();
    setValidated(false)
    setShow(false);
  }
  const handleShow = (e) => {
    if (e === 'add') {
      setShow(e)
      setaddcategorydata('')
    }
    console.log(JSON.stringify(e))
    if (e !== 'add') {
      setcategorydata(categoryjson.category[e - 1])
      setaddcategorydata((addcategorydata) => { return { ...addcategorydata, category_icon: categoryjson.category[e - 1].category_icon } });
      setShow(e);
    }
  }

  const categoryjson = {
    "category": [
      {
        id: 1,
        category_type: "Grocery",
        category_name: "Green Leaf Lettuce",
        product_desc: "The root vegetables include beets, and turnips",
        parent_category: "Fruits & Vegetable",
        price: "$14",
        stock: "15",
        category_icon: "https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg",
        status: "Selling",
      },
      {
        id: 2,
        category_type: "Health & Care",
        category_name: "Green Leaf Lettuce",
        product_desc: "The root vegetables include beets, and turnips",
        parent_category: "Fruits & Vegetable",
        price: "$14",
        stock: "15",
        category_icon: "https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg",
        status: "Sold out",
      },
    ]
  }
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
      width: "70px",
      center: true,
      style: {
        paddingLeft: 0,
      }
    },
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="75px"
          alt={row.name}
          src={
            row.category_icon
          }
          style={{
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "right",
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Category Name",
      selector: (row) => <div className="productdescbox">
        <b>
          <p className="mb-0">{row.category_name}</p>
        </b>
        <p className="productdesc">
          {" "}
          {row.product_desc}
        </p>
      </div>,
      sortable: true,
      width: "250px",
    },
    {
      name: "Category",
      selector: (row) => row.parent_category,
      sortable: true,
      width: "160px",
    },
    {
      name: "Category Type",
      selector: (row) => row.category_type,
      sortable: true,
      width: "160px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
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

        <Badge bg={row.status === "Selling"
          ? "success" : row.status === "Sold out"
            ? "danger" : null}>{row.status}</Badge>
      ),
      sortable: true,
      width: "105px",
      // center: true,
    },
    {
      name: "Action",
      width: "100px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.id)} />
          <BsTrash className=" p-0 m-0 editiconn text-danger" onClick={handleAlert} />
        </div>
      ),
    },
  ];
  useEffect(() => {
    setcategorydata(categoryjson.category)
  }, [show])
  const handleFormChange = (e) => {
    setaddcategorydata({
      ...addcategorydata,
      [e.target.name]: e.target.value
    });
    // seteditcategorydata({
    //   ...editcategorydata,
    //   [e.target.name]: e.target.value
    // });
    
  };
  const ImgFormChange = (e) => {
    let iconpath = URL.createObjectURL(e.target.files[0])
    setcategorydata((categorydata) => { return { ...categorydata, category_icon: iconpath } });
  }
  const AddCategoryClick = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault()
      setValidated(true)
    }
    if (form.checkValidity() === true) {
      e.preventDefault()
      console.log("form----------   " + JSON.stringify(addcategorydata));
      formRef.current.reset();
      setValidated(false)
      setaddcategorydata('')
    }
  };
  const UpdateCategoryClick = (show) => {
    // setadmindata(adminjson.admin[show])
    show.preventDefault()
    console.log("form----------   " + JSON.stringify(addcategorydata));
  };

  const handleClick = () => { };
  const navigate = useNavigate();
  return (
    <div className="App productlist_maindiv">
      <h2>Category</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className=" row">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by category name"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select aria-label="Search by category type" className="adminselectbox">
              <option>Search by category type</option>
              <option value="1">Grocery</option>
              <option value="2">Health</option>
              <option value="3">Sports & Accessor</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select aria-label="Search by status" className="adminselectbox">
              <option>Search by category</option>
              <option value="1">Food</option>
              <option value="2">Fish & Meat</option>
              <option value="3">Baby Care</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton btntext={"Search"} btnclass={'button main_button w-100'} />
          </div>

        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <Iconbutton
            btntext={"Add Category"}
            onClick={() => handleShow('add')}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button adminmainbutton"}
          />
        </div>

        {/* datatable */}
        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form className="" validated={validated} ref={formRef} onSubmit={(show === 'add' ? (e) => AddCategoryClick(e) : (show) => UpdateCategoryClick(show))}>
            <Modal.Header closeButton className="addproductheader">
              <Modal.Title id="example-custom-modal-styling-title">
                {show === 'add' ? 'Add Category' : ' Update Category'}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addproductbody p-2">

              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicName">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control type="text" placeholder="Category Name" required onChange={() => handleFormChange()} value={categorydata.category_name} name={'category_name'} />
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill  name
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                {/* <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicEmail">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" placeholder="Product Description" required onChange={()=>handleFormChange()} value={categorydata.product_desc} name={'product_desc'} />
                  </Form.Group>
                </div> */}
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicCategory">
                    <Form.Label>Category Type</Form.Label>
                    <Form.Select aria-label="Search by category type" className="adminselectbox" required onChange={() => handleFormChange()} value={categorydata.category_type} name={'category_type'}>
                      <option value=''>Search by category type</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Health">Health</option>
                      <option value="Sports & Accessor">Sports & Accessor</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill category type
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicParentCategory">
                    <Form.Label>Parent Category</Form.Label>
                    <Form.Select aria-label="Search by status" className="adminselectbox" required onChange={handleFormChange} value={categorydata.parent_category} name={'parent_category'}>
                      <option value=''>Search by category</option>
                      <option value="Fruits & Vegetable">Fruits & Vegetable</option>
                      <option value="Fish & Meat">Fish & Meat</option>
                      <option value="Baby Care">Baby Care</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="h6">
                      Please fill category
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group className="mb-3 aos_input" controlId="formBasicImg">
                    <Form.Label>Category Icon</Form.Label>
                    <div className="category_icon_box">
                      <Form.Control type="file" placeholder="Category Icon" onChange={ImgFormChange} name={'category_icon'} required />
                      {addcategorydata.category_icon ?
                        <img src={addcategorydata.category_icon} alt={'apna_organic'} className={'category_icon'} /> : null}
                    </div>

                  </Form.Group>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                btntext={"X Cancel"}
                onClick={handleClose}
                btnclass={"button main_outline_button adminmainbutton px-2"}
              // Iconname={<GiCancel /> }
              />
              <Iconbutton
                type={'submit'}
                btntext={(show === 'add' ? "Add Category" : "Update Category")}
                // onClick={(show === 'add' ? AddCategoryClick : () => UpdateCategoryClick(show))}
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        <DataTable
          columns={columns}
          data={categoryjson.category}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body category_table"}
        />
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
}

export default CategoryList;
