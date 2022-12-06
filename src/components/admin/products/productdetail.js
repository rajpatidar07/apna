import React, { useState,useRef } from "react";
import MainButton from "../common/button";
import ShowMoreText from "react-show-more-text";
import { AiFillPushpin } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Table from 'react-bootstrap/Table';
import VariationJson from '../json/variation';
import { MdOutlineEdit } from 'react-icons/md';
import { Button } from "react-bootstrap";
import moment from "moment/moment";
import InputGroup from 'react-bootstrap/InputGroup';

const Productdetail = () => {
  let vid = localStorage.getItem("variantid")
  let pid = localStorage.getItem("productid");
  const [productdata, setProductData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [vdata, setvdata] = useState([]);
  const [colorchange, setcolorchange] = useState('');
  const [sizechange, setsizechange] = useState('');
  const [variantapicall, setvariantapicall] = useState(false);
  const [varietyshow, setvarietyShow] = useState(false);
  const [variantarray, setvariantarray] = useState({
    product_status: "1",
    product_id:pid,
    unit: "",
    colors: "",
    unit_quantity: "",
    size: "",
    product_price: "",
    mrp: "",
    sale_price: "",
    discount: "",
    special_offer: false,
    featured_product: false,
    manufacturing_date: "",
    expire_date: "",
    quantity: ""
  });
  const [productalldata, setproductalldata] = useState({
    add_custom_input: "",
    product_title_name: "",
    product_slug: "",
    store_name: "",
    product_type: "",
    category: "",
    parent_category: "",
    wholesale_sales_tax: "",
    manufacturing_date: "",
    expire_date: "",
    seo_tag: "",
    variety: false,
    product_description: "",
    other_introduction: "",
    is_active: "0"
  });
  const [variantmainarray, setvariantmainarray] = useState([]);
  const [customvalidated, setcustomValidated] = useState(false);
  const formRef = useRef();
 
  useEffect(() => {
    function getProductDetails() {
      try {
        axios.post(`http://192.168.29.108:5000/products_search?page=0&per_page=10`,
          {
            "product_search": {
              "search": "",
              "product_id": `${pid}`,
              // "is_delete": "no"
            }
          }
        )
          .then((response) => {
            let data = response.data.results;
            setProductData(data);
      setvariantapicall(false)
            
          });
      } catch (err) { }
    }

    getProductDetails();
  }, [variantapicall]);

const onColorChange = (e,id) =>{
  setcolorchange(e.target.value)
 vid = localStorage.setItem("variantid" , id)
 console.log("----color"+e.target.value + "000"+id)
}
const onSizeClick = (e,id) =>{
  setsizechange(e.target.value)
 vid = localStorage.setItem("variantid" , id)
 console.log("----size"+e.target.value + "000"+id)
}
var varietyy = VariationJson;
const handlevarietyShow = (id) => {
  console.log("-----produfh"+id)
  setvarietyShow(true)

};
const handlevarietyClose = () => {
  setvariantarray('')
  setvarietyShow(false) 
}
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

const handleInputcheckboxChange = (e) => {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value
  setvariantarray({
    ...variantarray,
    [e.target.name]: value
  });
}

const handleVarietyChange = (e) => {
  // const varietyvalue = e.target.type === 'radio' ? e.target.checked : e.target.value
  console.log("varietyvalue --------->  " + e.target.type)
  setproductalldata({
    ...productalldata,
    [e.target.name]: e.target.value
  });
}

const onVariantaddclick = (id) => {
  if(id === '' || id === null || id === undefined){
    axios.post(`http://192.168.29.108:5000/products_varient_add`, variantarray).then((response) => {
    // setvdata(response.data.results)
    formRef.current.reset();
      setvariantapicall(true)
    }).catch(function (error) {
      console.log(error);
    });
  }
  else{
    axios.put(`http://192.168.29.108:5000/products_varient_update`, variantarray).then((response) => {
      setvariantarray(response.data)
      formRef.current.reset();
      setvariantapicall(true)
    }).catch(function (error) {
      console.log(error);
    });
  }
}
const VariantAddProduct = () =>{
  setvariantmainarray(variantmainarray => [...variantmainarray, variantarray]);
  setcustomValidated(false);
  formRef.current.reset();
}
const VariantRemoveClick = (id, productid) => {
  axios.put(`http://192.168.29.108:5000/products_delete`, {
    id:`${id}`,
    product_id:`${productid}`,
    is_delete:"0"
    }).then((response) => {
      console.log("------changeediteddd---" + JSON.stringify(response.data))
      setvariantapicall(true)
    }).catch(function (error) {
      console.log(error);
    });
  console.log("-----id" + id + 'productid' + productid)
  setvdata(vdata.filter(item => item !== id));
}
const VariantEditClick = (id, productid) => {
  axios.get(`http://192.168.29.108:5000/products_pricing?id=${id}&product_id=${productid}`).then((response) => {
    setvariantarray(response.data[0])
  }).catch(function (error) {
    console.log(error);
  });
}
  return (

    <div>
      {(productdata || []).map((data) => {
        return (
          <>
            {/* <h2 className="productname mb-0">{data.product_title_name}</h2> */}
            {(vid == data.id && pid == data.product_id ) ?
            <div className="productdetail_page_box row mt-3">
              <div className="productimg_box">

                <Carousel autoPlay interval="3000" transitionTime="3000" infiniteLoop showIndicators={false} className={'productimg_carousel'} showStatus={false}>
                  <div className="w-100 h-50">
                    <img
                      src="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
                      alt=""

                    />
                  </div>
                  <div className="w-100 h-50">
                    <img
                      src="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1112&q=80"
                      alt=""

                    />
                  </div>
                  <div className="w-100 h-50">
                    <img
                      src="https://images.unsplash.com/photo-1655745653127-4d6837baf958?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                      alt=""

                    />
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1516527653392-602455dd9cf7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://images.unsplash.com/photo-1655365225165-8d727fe3a091?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=80"
                      alt=""
                    />
                  </div>
                </Carousel>
            
                 
              </div>


              <div className="product_detail_box mt-4">
                {/*  */}
                <div className="product_upper_section">
                  <div>
                    <b><h5 className="statuslabeltext text-success">{data.product_title_name}</h5></b>
                    <div className="productstatus">
                      <h5 className="statuslabeltext">SKU:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.id}</h6>
                      </b>
                    </div>
                  </div>
                </div>

                {/* price */}

                <div className="product_upper_section ">
                  <div className="product_mid_section product_variety_section">
                    <h3 className="mb-0">{data.product_price}</h3>
                    <div className="priceboxx">
                      <b>
                        <p className="text-success mb-0">{data.discount}% off </p>
                      </b>
                      <p className="mrprate text-danger">({data.mrp})</p>
                    </div>
                    <div className="priceboxx">
                      <b>
                        {" "}
                        <p className="text-secondary">Sale Price: </p>
                      </b>
                      <p className="">{data.sale_price}</p>
                    </div>
                  </div>

                  {/* tax */}
                  <div className="product_mid_section product_variety_section">
                    <h5 className="mb-0">Tax:</h5>
                    <div className="productstatus">
                      <h5 className="statuslabeltext">Gst:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.gst}</h6>
                      </b>
                      <h5 className="statuslabeltext">wholesale_sales_tax:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.wholesale_sales_tax}</h6>
                      </b>
                    </div>
                    <div className="productstatus">
                      <h5 className="statuslabeltext">manufacturers_sales_tax:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.manufacturers_sales_tax}</h6>
                      </b>
                      <h5 className="statuslabeltext">retails_sales_tax:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.retails_sales_tax}</h6>
                      </b>
                    </div>
                  </div>


                  {/* store */}
                  <div className="product_lower_section product_upper_section">
                    <div className="productquantity productstatus">
                      <h5 className=" mb-0">Store:</h5>
                      <p className="statuslabeltext mb-0 text-primary">{data.store_name}</p>
                    </div>
                  </div>
                  {/*  */}
                  {/*description  */}
                  <div>
                    <h5 className="mb-1">Product Description:</h5>
                    <ShowMoreText
                      /* Default options */
                      lines={5}
                      more="Show more"
                      less="...Show less"
                      anchorclassName="oooeeer"
                      expanded={false}
                      width={500}
                      className={'detailproduct'}
                    >
                      <p className="detailproduct statuslabeltext">
                        {data.product_description}
                      </p>
                    </ShowMoreText>
                  </div>
                  {/*  */}

                  {/* category */}
                  <div className="product_lower_section product_upper_section">
                    <div className="productquantity productstatus">
                      <h5 className="mb-0">Category:</h5>
                      <p className="categorytext statuslabeltext mb-0">
                        {data.category}
                      </p>
                    </div>
                    <div className="productquantity productstatus">
                      <h6 className="categorytext1">{data.parent_category}</h6>
                      <h6 className="categorytext1">{data.parent_category}</h6>
                    </div>
                  </div>
                  {/*  */}
                  {/* other instarusction */}
                  <div>
                    <h5 className="mb-1">Other Instruction:</h5>
                    <ShowMoreText
                      /* Default options */
                      lines={5}
                      more="Show more"
                      less="...Show less"
                      anchorclassName="oooeeer"
                      expanded={false}
                      width={500}
                    >
                      <p className="detailproduct statuslabeltext">
                        {data.other_introduction}
                      </p>
                      {/* <ListGroup variant="flush">
                  <ListGroup.Item>No style</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Success</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Danger</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Warning</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Info</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Light</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Dark</ListGroup.Item>
                </ListGroup> */}
                    </ShowMoreText>
                  </div>
                </div>



              </div>
   
              <div className="variety_section_box">
                  {/* <h3> Variety</h3> */}
                  <Form ref={formRef} validated={validated}>
                 
                <Form.Group
                  className=""
                // controlId="validationCustom13"
                >
                      <div className="col-12">
                        <Table bordered className="align-middle my-2">
                          <thead className="align-middle">
                            <tr>
                              <th >Variety</th>
                              <th >Color</th>
                              <th >Weight</th>
                              <th >Size</th>
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
                                    <Form.Select aria-label="Default select example" name='unit' 
                                    // value={variantarray.unit === 'pcs' ? 'color' : variantarray.unit === 'gms' ? 'weight' : variantarray.unit === 'ml' ? 'volume' : null}
                                      onChange={(e) => onVariantChange(e)}
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                    >
                                      <option value={variantarray.unit === 'pcs' ? 'color' : variantarray.unit === 'gms' ? 'weight' : variantarray.unit === 'ml' ? 'volume' : ''} >{variantarray.unit === 'pcs' ? 'color' : variantarray.unit === 'gms' ? 'weight' : variantarray.unit === 'ml' ? 'volume' : 'Select'}</option>
                                      {(varietyy.variety || []).map((vari, i) => {
                                        return (
                                          <option value={vari === 'color' ? 'pcs' : vari === 'weight' ? 'gms' : vari === 'volume' ? 'ml' : null} key={i}>{vari}</option>
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'colors'}
                                      value={variantarray.colors}
                                    />
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={(variantarray.unit === 'gms' ? variantarray.unit_quantity : variantarray.unit === 'ml' ? variantarray.unit_quantity : variantarray.unit === 'pcs' ? variantarray.unit_quantity : null)}
                                      type="text"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e) => onVariantChange(e)}
                                      name={'unit_quantity'}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={(variantarray.unit === 'pcs' ? variantarray.size : null)}
                                      type="text"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e) => onVariantChange(e)}
                                      name={'size'}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'product_price'}
                                      value={variantarray.product_price}
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
                                      onChange={(e) => onVariantChange(e)}
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
                                      onChange={(e) => onVariantChange(e)}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'discount'}
                                      value={variantarray.discount}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e) => handleInputcheckboxChange(e)}
                                    name={'special_offer'}
                                    value={variantarray.special_offer}
                                    checked={variantarray.special_offer === 1 ? true : false}
                                  />
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e) => handleInputcheckboxChange(e)}
                                    name={'featured_product'}
                                    value={variantarray.featured_product}
                                    checked={variantarray.featured_product === 1 ? true : false}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'manufacturing_date'}
                                      value={moment(variantarray.manufacturing_date).format('YYYY-MM-DD')}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'expire_date'}
                                      value={moment(variantarray.expire_date).format('YYYY-MM-DD')}
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
                                      onChange={(e) => onVariantChange(e)}
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
                                    // type="submit"
                                    onClick={() => onVariantaddclick(variantarray.id)}
                                    size="sm">
                                    +
                                  </Button>
                                </div>
                              </td>
                            </tr>

                            {
                              productdata === '' || productdata === null || productdata === undefined ?
                                null
                                : (productdata || []).map((variantdata, i) => {
                                
                                  return (
                                    variantdata.is_delete === '0' ? null :
                                    <tr >
                                      <td className="p-0 text-center ">
                                        {variantdata.unit === 'pcs' ? 'color' : variantdata.unit === 'gms' ? 'weight' : variantdata.unit === 'ml' ? 'volume' : null}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {variantdata.colors}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {(variantdata.unit === 'gms' ? variantdata.unit_quantity : variantdata.unit === 'ml' ? variantdata.unit_quantity : variantdata.unit === 'pcs' ? variantdata.unit_quantity : null)}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {(variantdata.unit === 'pcs' ? variantdata.size : null)}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {variantdata.product_price}
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
                                        {moment(variantdata.manufacturing_date).format('YYYY-MM-DD')}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {moment(variantdata.expire_date).format('YYYY-MM-DD')}
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
                                          onClick={(id) => VariantRemoveClick(variantdata.id, variantdata.product_id)} size="sm">
                                          &times;
                                        </Button>
                                        <Button variant="text-danger" className="addcategoryicon text-danger"
                                          onClick={(id) => VariantEditClick(variantdata.id, variantdata.product_id)} size="sm">
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
                    
                  {/* </div> */}
                </Form.Group>

            
              </Form>
                    {/* variety */}
                    {/* <div className="product_lower_section product_upper_section">
                      <b>  <h5 className="mb-1">Product Variety:</h5></b>
                      <div className="product_mid_section">


                        <div className="productstatus align-items-start">
                          <AiFillPushpin className="text-success h5" />
                          <h6 className="statuslabeltext">Color:</h6>
                          <select className="coolorselect" onChange={(e)=>onColorChange(e,data.id)} name='colors'>
                          {(productdata || []).map((data) => {
        return (
           data.is_delete === '0' ? null :
                            <option>{data.colors}</option>
                            
        )})}
                          </select>
                        </div>
                        <div className="productstatus align-items-start">
                          <AiFillPushpin className="text-success h5" />
                          <h6 className="statuslabeltext">Size:</h6>
                         
                          <div className="productstatus">
                          {(productdata || []).map((data,i) => {
        return (
                colorchange === data.colors ?
                            <h6 className="statustextoutsize" onClick={(e)=>onSizeClick(e,data.id)} name='size' value={data.size} key
                            ={i}>{data.size}</h6> : null
                            )})}
                           
                          </div>
                        </div>
                        <div className="productstatus align-items-start">
                          <AiFillPushpin className="text-success h5" />
                          <h6 className="statuslabeltext">Quantity:</h6>
                          {(productdata || []).map((data,i) => {
        return (
               ( sizechange === data.size && colorchange === data.colors) ?
                data.quantity === 0 ? 
                   <h6 className="statustextred" key={i}>(Out of Stock)</h6> 
                   :
                          <h6 className="statustextsize" key={i}> {data.quantity}</h6>
                          : null
                            )})}
                        </div>

                     
                      </div>
                    </div> */}



                    {/* date */}
                    {/* <div className="product_lower_section product_upper_section">
                      <b>  <h5 className="mb-0">Date:</h5> </b>
                      <div className="product_mid_section">
                        <div className="productquantity productstatus">
                          <h5 className="statuslabeltext mb-0">Manufactured Date:</h5>
                          <p className="categorytext mb-0 text-primary">{data.manufacturing_date}</p>
                        </div>
                        <div className="productquantity productstatus">
                          <h5 className="statuslabeltext mb-0">Expire Date:</h5>
                          <p className="categorytext mb-0 text-danger">{data.expire_date}</p>
                        </div>
                      </div>
                      <div className="productquantity productstatus">
                        <b> <h5 className="mb-0">Price:</h5> </b>
                        <b><p className="mb-0 text-success">{data.product_price}</p> </b>
                      </div>
                    </div> */}
                    {/*  */}



                    {/* offers */}
                    {/* <div className="product_lower_section product_upper_section">
                      <b> <h5 className="mb-0">Offers:</h5></b>
                      <div className="product_mid_section ">
                        <div className="productquantity productstatus align-items-start">
                          {data.featured_product === 0 ? <ImCross className="text-danger h5" /> :
                            <BsCheckLg className="text-success h5" />}
                          <h5 className="statuslabeltext mb-0">Featured Product</h5>
                        </div>
                        <div className="productquantity productstatus align-items-start">
                          {data.special_offer === 0 ? <ImCross className="text-danger h5" /> :
                            <BsCheckLg className="text-success h5" />}
                          <h5 className="statuslabeltext mb-0">Special Offer</h5>
                        </div>
                        <div className="productquantity productstatus align-items-start">
                     <BsCheckLg className="text-success h5" />
                     <h5 className="statuslabeltext mb-0">Promotional Product</h5>
                   </div>
                      </div>
                    </div> */}
                  </div>

              {/*  */}
              {/* <MainButton
                btntext={"Edit product"}
                btnclass={"btn btn-success my-4"}
                onClick={()=>handlevarietyShow(pid)}
              /> */}
            </div>
 : null}
          </>
        )
      })}
    {/* <Modal size="lg" show={varietyshow} onHide={() => handlevarietyClose()} dialogClassName="addproductmainmodal">
          <Form ref={formRef} validated={validated}>
            <Modal.Header closeButton>
              <Modal.Title>Update Variety</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <Form.Group
                  className=""
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
                              <th >Weight</th>
                              <th >Size</th>
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
                                    <Form.Select aria-label="Default select example" name='unit' 
                                    // value={variantarray.unit === 'pcs' ? 'color' : variantarray.unit === 'gms' ? 'weight' : variantarray.unit === 'ml' ? 'volume' : null}
                                      onChange={(e) => onVariantChange(e)}
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                    >
                                      <option value={variantarray.unit === 'pcs' ? 'color' : variantarray.unit === 'gms' ? 'weight' : variantarray.unit === 'ml' ? 'volume' : ''} >{variantarray.unit === 'pcs' ? 'color' : variantarray.unit === 'gms' ? 'weight' : variantarray.unit === 'ml' ? 'volume' : 'Select'}</option>
                                      {(varietyy.variety || []).map((vari, i) => {
                                        return (
                                          <option value={vari === 'color' ? 'pcs' : vari === 'weight' ? 'gms' : vari === 'volume' ? 'ml' : null} key={i}>{vari}</option>
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'colors'}
                                      value={variantarray.colors}
                                    />
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={(variantarray.unit === 'gms' ? variantarray.unit_quantity : variantarray.unit === 'ml' ? variantarray.unit_quantity : variantarray.unit === 'pcs' ? variantarray.unit_quantity : null)}
                                      type="text"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e) => onVariantChange(e)}
                                      name={'unit_quantity'}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={(variantarray.unit === 'pcs' ? variantarray.size : null)}
                                      type="text"
                                      sm="9"
                                      className={(customvalidated === true) ? 'border-danger' : null}
                                      onChange={(e) => onVariantChange(e)}
                                      name={'size'}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'product_price'}
                                      value={variantarray.product_price}
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
                                      onChange={(e) => onVariantChange(e)}
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
                                      onChange={(e) => onVariantChange(e)}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'discount'}
                                      value={variantarray.discount}
                                    />
                                  </InputGroup>

                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e) => handleInputcheckboxChange(e)}
                                    name={'special_offer'}
                                    value={variantarray.special_offer}
                                    checked={variantarray.special_offer === 1 ? true : false}
                                  />
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className="">
                                  <Form.Check
                                    onChange={(e) => handleInputcheckboxChange(e)}
                                    name={'featured_product'}
                                    value={variantarray.featured_product}
                                    checked={variantarray.featured_product === 1 ? true : false}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'manufacturing_date'}
                                      value={moment(variantarray.manufacturing_date).format('YYYY-MM-DD')}
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
                                      onChange={(e) => onVariantChange(e)}
                                      name={'expire_date'}
                                      value={moment(variantarray.expire_date).format('YYYY-MM-DD')}
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
                                      onChange={(e) => onVariantChange(e)}
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
                                    // type="submit"
                                    onClick={() => onVariantaddclick(variantarray.id)}
                                    size="sm">
                                    +
                                  </Button>
                                </div>
                              </td>
                            </tr>

                            {
                              productdata === '' || productdata === null || productdata === undefined ?
                                null
                                : (productdata || []).map((variantdata, i) => {
                                
                                  return (
                                    variantdata.is_delete === '0' ? null :
                                    <tr >
                                      <td className="p-0 text-center ">
                                        {variantdata.unit === 'pcs' ? 'color' : variantdata.unit === 'gms' ? 'weight' : variantdata.unit === 'ml' ? 'volume' : null}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {variantdata.colors}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {(variantdata.unit === 'gms' ? variantdata.unit_quantity : variantdata.unit === 'ml' ? variantdata.unit_quantity : variantdata.unit === 'pcs' ? variantdata.unit_quantity : null)}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {(variantdata.unit === 'pcs' ? variantdata.size : null)}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {variantdata.product_price}
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
                                        {moment(variantdata.manufacturing_date).format('YYYY-MM-DD')}
                                      </td>
                                      <td className="p-0 text-center ">
                                        {moment(variantdata.expire_date).format('YYYY-MM-DD')}
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
                                          onClick={(id) => VariantRemoveClick(variantdata.id, variantdata.product_id)} size="sm">
                                          &times;
                                        </Button>
                                        <Button variant="text-danger" className="addcategoryicon text-danger"
                                          onClick={(id) => VariantEditClick(variantdata.id, variantdata.product_id)} size="sm">
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
              <button className='button main_outline_button' onClick={() => handlevarietyClose()}>Cancel</button>
              <button className='button main_button' onClick={(e) => handlevarietyClose(e)}>Save</button>
            </Modal.Footer>
          </Form>
        </Modal> */}
    </div>

  );
};

export default Productdetail;
