import React, { useEffect, useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Input from "./common/input";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Badge } from "react-bootstrap";
import MainButton from "./common/button";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "./common/iconbutton";
import { MdOutlineEdit } from 'react-icons/md';
import InputGroup from 'react-bootstrap/InputGroup';
import VariationJson from './json/variation';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
import {
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";

function Product() {
  const [pdata, setpdata] = useState([]);
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [varietyshow, setvarietyShow] = useState(false);
  const [addtag, setaddtag] = useState();
  const [validated, setValidated] = useState(false);
  const [customvalidated, setcustomValidated] = useState(false);
  const [modalshow, setmodalshow] = useState(false);
  const [seoarray, setseoArray] = useState([]);
  const [varietyval, setvarietyval] = useState('');
  const [variantarray, setvariantarray] = useState([]);
  const [data1, setdata1] = useState('');
  const [headerval, setheaderval] = useState('');
  const [descval, setdescval] = useState('');
  const [customarray, setcustomarray] = useState([]);
  const [vdata, setvdata] = useState([]);
  const mainformRef = useRef();
  const formRef = useRef();

  const ChangeStatus = () => { }
  // useEffect(() => {
  //   axios.get("https://apnaorganicstore.in/backend/products").then((response) => {
  //     setpdata(response.data)
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }, []);
  //  json
  var varietyy = VariationJson;
  const productjson = [
    {
    id: 1,
    stock: "250",
    product_title_name: "just herbs shampoo",
    product_slug: "just_herbs_123",
    store_name: "w2c_store_lapssi",
    product_type: "organic_shampoo",
    category: "18",
    product_description:"this product is amazing yeh woh ",
    parent_category: "5,18",
    product_quantity: "250",
    mrp: "600",
    product_price: "500",
    sale_price: "450",
    discount: "10",
    wholesale_sales_tax: "10",
    manufacturers_sales_tax: "10",
    retails_sales_tax: "5",
    gst: "25",
    value_added_tax: "5",
    manufacturing_date: "2022-11-01",
    expire_date: "2022-01-16",
    special_offer: true,
    variety: true,
    seo_tag: [
      "shampoo",
        "herbs",
        "organic"
      ],
      add_custom_input: [
        "packaging,good quality",
        "storage,500gb"
      ]
    },
    {
    id: 2,
    stock: "250",
    product_title_name: "just herbs shampoo",
    product_slug: "just_herbs_123",
    store_name: "w2c_store_lapssi",
    product_type: "organic_shampoo",
    product_description:"helo hey editorjkfcjksd",
    category: "18",
    parent_category: "5,18",
    product_quantity: "250",
    mrp: "600",
    product_price: "500",
    sale_price: "450",
    discount: "10",
    wholesale_sales_tax: "10",
    manufacturers_sales_tax: "10",
    retails_sales_tax: "5",
    gst: "25",
    value_added_tax: "5",
    manufacturing_date: "2022-11-01",
    expire_date: "2022-01-16",
    special_offer: true,
    variety: true,
    seo_tag: [
        "shampoo",
        "herbs",
        "organic"
      ],
      add_custom_input: [
        "packaging,good quality",
        "storage,500gb"
      ]
    },
    {
    id: 3,
    stock: "250",
    product_title_name: "just herbs shampoo",
    product_slug: "just_herbs_123",
    store_name: "w2c_store_lapssi",
    product_type: "organic_shampoo",
    product_description:"helo hey editorjkfcjksd",
    category: "18",
    parent_category: "5,18",
    product_quantity: "250",
    mrp: "600",
    product_price: "500",
    sale_price: "450",
    discount: "10",
    wholesale_sales_tax: "10",
    manufacturers_sales_tax: "10",
    retails_sales_tax: "5",
    gst: "25",
    value_added_tax: "5",
    manufacturing_date: "2022-11-01",
    expire_date: "2022-01-16",
    special_offer: true,
    variety: true,
    seo_tag: [
        "shampoo",
        "herbs",
        "organic"
      ],
      add_custom_input: [
        "packaging,good quality",
        "storage,500gb"
      ]
    },
  ]


  const varietyjson = [
      {
        id:1,
        variations: "volume",
      volume: "300",
      price: "250",
      mrp: "300",
      sale_price: "200",
      discount: "10",
      special_offer: "on",
      featured_product: "on",
      manufacturing_date: "2022-11-08",
      expire_date: "2022-11-27",
      quantity: "50",
      product_img: [
          "blob:http://localhost:3000/4737c736-dcc9-4901-a5c9-41efb95667ce",
          "blob:http://localhost:3000/e2394413-1533-42f0-858f-babcafefac1e"
        ]
      },
      {
        id:2,
      variations: "color",
      colorname: "pink",
      size: "xl",
      price: "250",
      mrp: "1400",
      sale_price: "200",
      discount: "500",
      featured_product: "on",
      manufacturing_date: "2022-11-25",
      quantity: "40",
      product_img: [
          "blob:http://localhost:3000/c9b8c6e6-c0b6-49e2-8940-c49e3382eea6",
          "blob:http://localhost:3000/e2394413-1533-42f0-858f-babcafefac1e"
        ]
      },
    ]
  
  // json end
  useEffect(() => {
    setpdata(productjson)
  }, []);
  const columns = [
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          // height="90px"
          // width="75px"
          alt={'apna_organic'}
          src={
            row.id
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight: "100px",
            maxWidth: "100px"
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => (
        <div>
          <p className="mb-1" onClick={() => {
            navigate("/productdetail");
          }}><b>{row.product_title_name}<br />SKU:</b>
            {row.sku}
          </p>
        </div>),
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "160px",
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Gst",
      selector: (row) => row.gst,
      sortable: true,
      width: "90px",
      center: true,
      style: {
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
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
      width: "130px",
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
            row.status === 1
              ? "badge bg-success"
              : row.status === 2
                ? "badge bg-danger"
                : "badge bg-secondary"
          }
        >
          {row.status === 1
            ? "Active"
            : row.status === 2
              ? "Inactive"
              : "Draft"}
        </span>
      ),
      sortable: true,
      width: "115px",
      // center: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select aria-label="Search by delivery" size="sm" value={row.status} className="w-100" onChange={ChangeStatus}>
          <option value="1">Pending</option>
          <option value="2">Delivered</option>
          <option value="3">Processing</option>
          <option value="4">Cancel</option>
          <option value="5">Approved  </option>
          <option value="6">Return  </option>
        </Form.Select>
      ),
      sortable: true,

    },
    {
      name: "Variety",
      selector: (row) => (
        (row.variety) ?
          <Button size="sm" onClick={handlevarietyShow}>Add Variety</Button> : null
      ),
      sortable: true,

    },
    {
      name: "Action",
      width: "110px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={handleShow.bind(this, row.id)} />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert}
          />

        </div>
      ),
    },
  ];

  // modal




  // api
  // useEffect(() => {
  //   axios.get("https://apnaorganicstore.in/backend/products").then((response) => {
  //     let udata = response.data[1];
  //     setpdata(udata);
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // }, []);
  // api end

  const handleShow = (e) => {
    if (e === 'add') {
      setmodalshow(e);
    }
    console.log(JSON.stringify(e))
    if (e !== 'add') {
      setpdata(productjson[e - 1])
      setseoArray(productjson[e - 1].seo_tag)
      setmodalshow(e);
    }
  }

  const handlevarietyShow = () => setvarietyShow(true);
  const handlevarietyClose = () => { setvarietyShow(false) }
  const handleClose = () => {
    mainformRef.current.reset();
    setpdata('')
    setValidated(false)
    setmodalshow(false)
  }
  useEffect(() => {
    setvdata(varietyjson)
  }, []);

  // seotag
  let tagname;
  const ontagchange = (e) => {
    tagname = e.target.value;
    setaddtag(tagname);
  };

  const tagRemoveClick = (e) => {
    setseoArray(seoarray.filter(item => item !== e));
  }
  const ontagaddclick = (e) => {
    // e.preventDefault();
    setseoArray(seoarray => [...seoarray, addtag]);
    setaddtag('');
  };
  useEffect(() => {
    setpdata({
      ...pdata,
      seo_tag: seoarray
    });
  }, [seoarray]);
  // useEffect(() => {
  //   setvariantarray(varietyjson)
  // }, []);
  // end seotag

  // variant
  const newImageUrls = [];
  const imguploadchange = (e) => {
    ([...e.target.files]).forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setvariantarray((variantarray) => { return { ...variantarray, product_img: newImageUrls } });
  }
  const onVariantChange = (e) => {
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value
    });
  };
  const onVariantaddclick = (e) => {
    if (vdata !== '') {
      e.preventDefault();
      setvdata(vdata => [...vdata, variantarray]);
      console.log("------addvriety"+JSON.stringify(variantarray))
      setcustomValidated(false);
      formRef.current.reset();
    }
    else {
      setcustomValidated(true);
    }
  }

  const VariantRemoveClick = (id) => {
    setvdata(vdata.filter(item => item !== id));
  }
  const VariantEditClick = (id) => {
    setvariantarray(vdata[id-1]);
    // setdata1(e)
    // setvariantmainarray(variantmainarray.filter(item => item !== e));
  }
  // varint end
  // handle click event of the Remove button
  let customvalue;
  const oncustomheadChange = (e) => {
    setheaderval(e.target.value);
  };
  const oncustomdescChange = (e) => {
    setdescval(e.target.value);
  };
  const handleAddClick = (e) => {
    customvalue = headerval + ',' + descval;

    if (headerval !== '' && descval !== '') {
      setcustomarray(customarray => [...customarray, customvalue]);
      setheaderval('');
      setdescval('');
      setcustomValidated(false);
    }
    else {
      setcustomValidated(true);
    }
  }
  const handleRemoveClick = (e) => {
    setcustomarray(customarray.filter(item => item !== e));
  };
  useEffect(() => {
    setpdata({
      ...pdata,
      add_custom_input: customarray
    });
  }, [customarray]);
  // end

  const handleInputcheckboxChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value
    setpdata({
      ...pdata,
      [e.target.name]: value
    });

  }
  const handleInputFieldChange = (e) => {
    setpdata({
      ...pdata,
      [e.target.name]: [e.target.value]
    });
  };
  const handledescription = (event, editor) => {
    setdata1(editor.getData());
      console.log({ event, editor, data1 });
      console.log(data1);
      setpdata({
        ...pdata,
        product_description: data1
      });
    }
   const createMarkup = () => {
      return { __html: pdata.product_description };
    }

  const handleSaveDraft = (e) => {
    // const form = e.currentTarget;
  };

  const handleAddProduct = (e) => {
    const form = e.currentTarget;
    console.log("form----------   " + JSON.stringify(pdata));

    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault()
    }
    setValidated(true);
    setcustomValidated(false);
    e.preventDefault();
    mainformRef.current.reset();
    setpdata('');
    setValidated(false);
    // handleClose();
  }
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    console.log("---edit"+ JSON.stringify(pdata))
  }
  // useEffect(() => {
  //   setvdata({
  //     ...vdata,
  //     quantity: variantmainarray
  //   });
  // }, [variantmainarray]);



  const handleClick = () => { };
  const navigate = useNavigate();
  return (
    <div className="App productlist_maindiv">
      <h2>Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row">
          <div className="col-md-3 col-sm-6 aos_input">
            <Input type={"text"} plchldr={"Search by product name"} />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
            >
              <option>Search by category</option>
              <option value="1">Food</option>
              <option value="2">Fish & Meat</option>
              <option value="3">Baby Care</option>
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              placeholder="Search by status"
            >
              <option>Search by status</option>
              <option value="1">Pending</option>
              <option value="2">Selling</option>
              <option value="3">Sold Out</option>
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
          <div className="product_page_uploadbox_one">
            <Input type={"file"} inputclass={"hiddeninput"} />
            <Iconbutton
              btntext={"Upload"}
              btnclass={"button main_outline_button"}
              Iconname={<AiOutlineCloudUpload />}
            />
          </div>
          <MainButton btntext={"Download"} />
          <Iconbutton
            btntext={"Add Product"}
            onClick={() => { handleShow('add') }}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button "}
          />
        </div>

        {/* datatable */}
        <Modal
          show={modalshow}
          onHide={()=>handleClose()}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form className="p-2 addproduct_form" validated={validated} ref={mainformRef} onSubmit={(modalshow === 'add' ? (e)=>handleAddProduct(e) : (modalshow)=>handleUpdateProduct(modalshow))}>
            <Modal.Header closeButton className="addproductheader">
              <Modal.Title id="example-custom-modal-styling-title">
                Add Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addproductbody p-2">
              <div className=" addproduct_form_boxx p-0 m-0">
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Basic Info</h5>
                  <div className="productvariety">

                    <Form.Group className="mx-3" controlId="validationCustom01">
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Title/Name<span className="text-danger">*
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill productname
                          </Form.Control.Feedback></span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="text" placeholder="Product Title/Name" required onChange={(e)=>handleInputFieldChange(e)} name={'product_title_name'} value={pdata.product_title_name} />
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill productname
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom02">
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Slug<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="text" placeholder="Product Slug" onChange={(e)=>handleInputFieldChange(e)} name={'product_slug'} value={pdata.product_slug} />
                      </Col>
                    </Form.Group>


                    <Form.Group className="mx-3" controlId="validationCustom03">
                      <Form.Label className="inputlabelheading" sm="12">
                        Store Name<span className="text-danger">* <Form.Control.Feedback type="invalid" className="h6">
                          Please fill storename
                        </Form.Control.Feedback></span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="text" placeholder=" Store Name" required onChange={(e)=>handleInputFieldChange(e)} name={'store_name'} value={pdata.store_name} />
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill storename
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </div>
                  <Form.Group className="mx-3" controlId="validationCustom04">
                    <Form.Label className="inputlabelheading" sm="12">
                      Product Description
                    </Form.Label>
                    <Col sm="12">
                      <CKEditor
                        editor={ClassicEditor}
                        data= {pdata.product_description}  
                        onReady={editor => {
                          // You can store the "editor" and use when it is needed.
                          // console.log('Editor is ready to use!', editor);
                        }}
                        onChange={handledescription}
                       
                        
                        onBlur={(event, editor) => {
                          // console.log('Blur.', editor);
                        }}
                        onFocus={(event, editor) => {
                          // console.log('Focus.', editor);
                        }}
                        name={'product_description'}
                        value={pdata.product_description}
                      />
                    </Col>
                    <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div>
                  </Form.Group>
                </div>
                {/* category */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Category Info</h5>
                  <div className="productvariety">
                    <Form.Group className="mx-3" controlId="validationCustom05">
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Type<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">

                        <Form.Select
                          aria-label="Product Type"
                          className="adminselectbox"
                          required
                          name="product_type"
                          onChange={(e)=>handleInputFieldChange(e)}
                          value={pdata.product_type}
                        >
                          <option value={''}>Select Product Type</option>
                          <option value="organic_shampoo">organic_shampoo</option>
                          <option value="Foods">Two</option>
                          <option value="Clothes">Three</option>
                          <option value="Health Care">Four</option>
                          <option value="Books">Five</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select producttype
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom06">
                      <Form.Label className="inputlabelheading" sm="12">
                        Category<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Select aria-label="Category" className="adminselectbox" required onChange={(e)=>handleInputFieldChange(e)} name={'category'} value={pdata.category}>
                          <option value={''}> Select Category</option>
                          <option value="18">18</option>
                          <option value="Drinks">Two</option>
                          <option value="Cakes">Three</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select category
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom07">
                      <Form.Label className="inputlabelheading" sm="12">
                        Parent Category<span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Select
                          onChange={(e)=>handleInputFieldChange(e)} name={'parent_category'}
                          aria-label="Parent Category"
                          className="adminselectbox"
                          required
                          value={pdata.parent_category}
                        >
                          <option value={''}>Select Parent Category</option>
                          <option value="5,18">5,18</option>
                          <option value="Fresh">Two</option>
                          <option value="Organic">Three</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select parentcategory
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                {/*Price and Quantity  */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Stock Info</h5>
                  <div className="productvariety mt-0">
                    <Form.Group className="mx-3" controlId="validationCustom08">
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Quantity<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="Product Quantity" required onChange={(e)=>handleInputFieldChange(e)} name={'product_quantity'} value={pdata.product_quantity} />
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill quantity
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom09">
                      <Form.Label className="inputlabelheading" sm="12">
                        Mrp<span className="text-danger">*</span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="mrp" required onChange={(e)=>handleInputFieldChange(e)} name={'mrp'} value={pdata.mrp} />
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill mrp
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="m-3" controlId="validationCustom10">
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Price<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="Price" required onChange={(e)=>handleInputFieldChange(e)} name={'product_price'} value={pdata.product_price} />
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill price
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Sale Price
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="Sale Price" onChange={(e)=>handleInputFieldChange(e)} name={'sale_price'} value={pdata.sale_price} />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Discount
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="Discount" onChange={(e)=>handleInputFieldChange(e)} name={'discount'} value={pdata.discount} />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                {/* Taxes */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Taxes</h5>
                  <div className="productvariety mt-0">
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Wholesale Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          placeholder="Wholesale Sales Tax"
                          name="wholesale_sales_tax"
                          value={pdata.wholesale_sales_tax}
                          onChange={(e)=>handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Manufacturers’ Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          placeholder="Manufacturers’ Sales Tax "
                          name="manufacturers_sales_tax"
                          value={pdata.manufacturers_sales_tax}
                          onChange={(e)=>handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="m-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Retail Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="Retail Sales Tax" name="retails_sales_tax" value={pdata.retails_sales_tax}
                          onChange={(e)=>handleInputFieldChange(e)} />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Gst
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="Gst" required name="gst" value={pdata.gst} onChange={(e)=>handleInputFieldChange(e)} />
                        <Form.Control.Feedback type="invalid">
                          Please choose a gst
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Value Added Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="number" placeholder="Value Added Tax" name="value_added_tax" value={pdata.value_added_tax} onChange={(e)=>handleInputFieldChange(e)} />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                {/*Date  */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Date</h5>
                  <div className="productvariety">
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Manufacturing Date
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="date" placeholder="manufacturing_date" name="manufacturing_date" required onChange={(e)=>handleInputFieldChange(e)} value={pdata.manufacturing_date} />
                        <Form.Control.Feedback type="invalid">
                          Please choose a date
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3">
                      <Form.Label
                        className="inputlabelheading"
                        sm="12 d-flex align-itmes-center"
                      >
                        Expire Date
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control type="date" placeholder="expire_date" required name="expire_date" value={pdata.expire_date} onChange={(e)=>handleInputFieldChange(e)} />
                        <Form.Control.Feedback type="invalid">
                          Please choose a expire date
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                {/* Variation */}

                <div className="my-3 inputsection_box">
                  <div className="productvariety_box">
                    <h5 className="m-0">Offer</h5>
                    <div className="productvariety">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom11"
                      >
                        <Form.Label
                          className="inputlabelheading"
                          sm="12 d-flex align-itmes-center"
                        >
                          {pdata.variety === true ?
                            <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='variety' value={pdata.variety === true ? true : false} checked /> :
                            <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='variety' value={pdata.variety === true ? true : false} />}
                          Variety
                        </Form.Label>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                {/* Offer */}

                <div className="my-3 inputsection_box">
                  <div>
                    <div className="productvariety_box">
                      <h5 className="m-0">Offer</h5>
                      <div className="productvariety">
                        <Form.Group
                          className="mx-3"
                          controlId="validationCustom11"
                        >
                          <Form.Label
                            className="inputlabelheading"
                            sm="12 d-flex align-itmes-center"
                          >
                            {pdata.special_offer === true ?
                              <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='special_offer' value={pdata.special_offer === true ? true : false} checked /> :
                              <Form.Check className="mx-2" onChange={handleInputcheckboxChange} name='special_offer' value={pdata.special_offer === true ? true : false} />}
                            Special Offer
                          </Form.Label>
                        </Form.Group>
                        <Form.Group
                          className="mx-3"
                          controlId="validationCustom11"
                        >
                          <Form.Label
                            className="inputlabelheading"
                            sm="9 d-flex align-items-end"
                          >
                            {pdata.featured_product === true ?
                              <Form.Check className="mx-0" value={pdata.featured_product ? true : false} name='featured_product' onChange={handleInputcheckboxChange} checked /> : <Form.Check className="mx-2" value={pdata.featured_product ? true : false} name='featured_product' onChange={handleInputcheckboxChange} />
                            }
                            Featured Product
                          </Form.Label>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>

                {/* seo tag */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Seo Tag</h5>
                  <div className="productvariety">
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <div className=" d-flex align-items-center my-2">
                        <InputGroup className="" size="sm">
                          <Form.Control
                            sm="9"
                            onChange={ontagchange}
                            value={addtag}
                            onKeyPress={event => {
                              if (event.key === "Enter") {
                                ontagaddclick();
                              }
                            }
                            }
                          />
                          <Button variant="outline-success" className="addcategoryicon"
                            onClick={() => ontagaddclick()} size="sm">
                            +
                          </Button>
                        </InputGroup>

                      </div>

                      <div className="d-flex align-items-center tagselectbox mt-2" >
                        {(seoarray || []).map((seotags, i) => {
                          return (
                            <Badge className="tagselecttitle mb-0" bg="success" key={i}>{seotags}

                              <GiCancel
                                className=" mx-0 ms-1 btncancel"
                                onClick={() => tagRemoveClick(seotags)}
                              />

                            </Badge>

                          )

                        })}
                      </div>

                    </Form.Group>
                  </div>
                </div>

                {/* other info */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Other Instruction</h5>
                  <Col sm="12" className="mt-3">
                    <CKEditor
                      editor={ClassicEditor}
                      data="<p>Hello from CKEditor 5!</p>"
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log('Editor is ready to use!', editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        // console.log({ event, editor, data });
                      }}
                      onBlur={(event, editor) => {
                        // console.log('Blur.', editor);
                      }}
                      onFocus={(event, editor) => {
                        // console.log('Focus.', editor);
                      }}
                    />

                  </Col>
                </div>
                {/* input */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Add Custom Input</h5>
                  <div className=" mt-0 mb-3">
                    <Table className="align-middle" >
                      <thead>
                        <tr>
                          <th >Heading</th>
                          <th >Description</th>
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
                                name={'custom_input_header'}
                                className={(customvalidated === true) ? 'border-danger' : null}
                              />
                            </InputGroup>

                          </td>
                          <td className="col-4">
                            <InputGroup className="">
                              <Form.Control
                                className={(customvalidated === true) ? 'border-danger' : null}
                                value={descval}
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
                            <Button variant="outline-success" className="addcategoryicon"
                              onClick={() => handleAddClick()} size="sm">
                              +
                            </Button>
                          </td>
                        </tr>
                        {(pdata.add_custom_input || []).map((variantdata, i) => {
                          const arr = variantdata.split(',')
                          return (
                            <tr className="">
                              <td className=" text-center">
                                <InputGroup className="">
                                  <Form.Control
                                    value={arr[0]}
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
                                    value={arr[1]}
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
                        })}
                      </tbody>
                    </Table>
                  </div>
                  {/* );
                })} */}
                  {/* --------------------------------------------- */}
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                btntext={" Cancel"}
                onClick={() => handleClose()}
                btnclass={"button main_outline_button px-2"}
              // Iconname={<GiCancel /> }
              />
              <MainButton btntext={"Save as Draft"} onClick={() => handleSaveDraft()} />
              <Iconbutton
                type={'submit'}
                btntext={(modalshow === 'add' ? "Add Product" : "Update Product")}
                // onClick={(modalshow === 'add' ? handleAddProduct : handleUpdateProduct)}
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        {/* variety */}
        <Modal size="lg" show={varietyshow} onHide={()=>handlevarietyClose()} dialogClassName="addproductmainmodal">
          <Form ref={formRef} validated={validated} onSubmit={(e)=>onVariantaddclick(e)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Variety</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">

                <Form.Group
                  className="mx-3"
                // controlId="validationCustom13"
                >
                  <div className="variation_box my-2">
                    <div className="row">
                      <div className="col-auto">
                        <Table bordered className="align-middle my-2">
                          <thead className="align-middle">
                            <tr>
                              <th >Variety</th>
                              <th >Color</th>
                              <th >Weight/Size</th>
                              <th >Price</th>
                              <th >Mrp</th>
                              <th >Sale Price</th>
                              <th >Discount</th>
                              <th >Special Offer</th>
                              <th >Featured Product</th>
                              <th className="manufacture_date">Mdate</th>
                              <th className="manufacture_date">Edate</th>
                              <th className="manufacture_date">Image</th>
                              <th className="manufacture_date">Quantity</th>
                              <th ></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Select aria-label="Default select example" name='variations' value={vdata.variations} 
                                   onChange={(e)=>onVariantChange(e)}
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                    >
                                      <option value={''} >Select</option>
                                      {(varietyy.variety || []).map((vari, i) => {
                                        return (
                                          <option value={vari} key={i}>{vari}</option>
                                        );
                                      })}
                                    </Form.Select>
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="text"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={'colorname'}
                                      value={variantarray.colorname}
                                    />
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={(variantarray.variations === 'weight' ? variantarray.weight : variantarray.variations === 'volume' ? variantarray.volume : variantarray.variations === 'piece' ? variantarray.piece : variantarray.variations === 'color' ? variantarray.size : null)}
                                      type="text"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={(varietyval === 'weight' ? 'weight' : varietyval === 'volume' ? 'volume' : varietyval === 'piece' ? 'piece' : varietyval === 'color' ? 'size' : null)}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      min={1}
                                      type="number"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={'price'}
                                      value={variantarray.price}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      min={1}
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={'mrp'}
                                      value={variantarray.mrp}

                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      min={1}
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={'sale_price'}
                                      value={variantarray.sale_price}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="number"
                                      sm="9"
                                      min={1}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={'discount'}
                                      value={variantarray.discount}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e)=>onVariantChange(e)}
                                    name={'special_offer'}
                                    value={variantarray.special_offer}
                                  />
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e)=>onVariantChange(e)}
                                    name={'featured_product'}
                                    value={variantarray.featured_product}
                                  />
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="manufacture_date" >
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="date"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={'manufacturing_date'}
                                      value={variantarray.manufacturing_date}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="manufacture_date" >
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="date"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      name={'expire_date'}
                                      value={variantarray.expire_date}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="manufacture_date">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      multiple
                                      type="file"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={imguploadchange}
                                      name={'product_img'}

                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0">
                                <div className="manufacture_date">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      name={'quantity'}
                                      type="number"
                                      value={variantarray.quantity}
                                      sm="9"
                                      min={'1'}
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e)=>onVariantChange(e)}
                                      onKeyPress={event => {
                                        if (event.key === "Enter") {
                                          onVariantaddclick();
                                        }
                                      }
                                      }
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0">
                                <div className=" d-flex align-items-center">
                                  <Button variant="outline-success" className="addcategoryicon"
                                    type="submit"
                                    // onClick={()=>onVariantaddclick()}
                                    size="sm">
                                    +
                                  </Button>
                                </div>
                              </td>
                            </tr>

                            {
                              (vdata || []).map((variantdata, i) => {
                                return (
                                  <tr >
                                    <td className="p-0 text-center ">
                                      {variantdata.variations}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.colorname}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {(variantdata.variations === 'color' ? variantdata.size : variantdata.variations === 'weight' ? variantdata.weight : variantdata.variations === 'volume' ? variantdata.volume : variantdata.variations === 'piece' ? variantdata.piece : null)}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.price}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.mrp}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.sale_price}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.discount}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.special_offer}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.featured_product}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.manufacturing_date}
                                    </td>
                                    <td className="p-0 text-center ">
                                      {variantdata.expire_date}
                                    </td>
                                    <td className="p-0 text-center">
                                      <Carousel indicators={false} controls={false}>
                                        {(variantdata.product_img || []).map((data) => {
                                          return (
                                            <Carousel.Item interval={1000}>
                                              <img src={data} alt='apnaorganic' width={50} />
                                            </Carousel.Item>
                                          )
                                        })}
                                      </Carousel>
                                    </td>
                                    <td className="p-0 text-center">
                                      {variantdata.quantity}
                                    </td>
                                    <td className="p-0 text-center">
                                      <Button variant="text-danger" className="addcategoryicon text-danger"
                                        onClick={(id) => VariantRemoveClick(variantdata.id)} size="sm">
                                        &times;
                                      </Button>
                                      <Button variant="text-danger" className="addcategoryicon text-danger"
                                        onClick={(id) => VariantEditClick(variantdata.id)} size="sm">
                                        <MdOutlineEdit />
                                      </Button>
                                    </td>
                                  </tr>
                                )
                              })
                            }
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </Form.Group>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className='button main_outline_button' onClick={()=>handlevarietyClose()}>Cancel</button>
              <button className='button main_button' onClick={(e) => handlevarietyClose(e)}>Save</button>
            </Modal.Footer>
          </Form>
        </Modal>

        <DataTable
          columns={columns}
          data={productjson}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body product_table"}
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

export default Product;
