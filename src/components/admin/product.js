import React, { useEffect, useState,useRef } from "react";
import Input from "./common/input";
import {
  AiOutlinePlus,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import MainButton from "./common/button";
import Form from "react-bootstrap/Form";
import Addproduct from "./products/addproduct";
import Iconbutton from "./common/iconbutton";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { MdOutlineEdit } from 'react-icons/md';
import InputGroup from 'react-bootstrap/InputGroup';
import VariationJson from './json/variation';
import Table from 'react-bootstrap/Table';
import Carousel from 'react-bootstrap/Carousel';
function Product() {
  const [pdata, setpdata] = useState();
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [show, setShow] = useState(null);
  const [varietyshow, setvarietyShow] = useState(false);
  const handleShow = (e) => setShow(e);
  const handlevarietyShow = () => setvarietyShow(true);
 

  const formRef = useRef();

  const ChangeStatus =()=>{}
  useEffect(() => {
    axios.get("https://apnaorganicstore.in/backend/products").then((response) => {
      setpdata(response.data)
    }).catch(function (error){
      console.log(error);});
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
          alt={row.product_title_name}
          src={
            row.id
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight:"100px",
            maxWidth:"100px"
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
          }}><b>{row.product_title_name}<br/>SKU:</b>
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
      selector: (row) => row.quantity,
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
        (!row.variety) ?
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
          <BiEdit className=" p-0 m-0  editiconn text-secondary" onClick={()=>{handleShow(2)}}/>
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert}
          />
         
        </div>
      ),
    },
  ];


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
            onClick={()=>{handleShow(1)}}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button "}
          />
        </div>

        {/* datatable */}
        {/* <Modal size="lg" show={varietyshow} onHide={handlevarietyClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Variety</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <div className="my-3 inputsection_box">
                
                <div className="row">
                  <Form ref={formRef} validated={validated} onSubmit={onVariantaddclick}>
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
                                        <Form.Select aria-label="Default select example" name='variations' value ={data1.variations} onChange={(e) => {
                                          // setvariantmainarray('');
                                          setcustomValidated(false)
                                          setvarietyval(e.target.value);
                                          setvariantarray({
                                            ...variantarray,
                                            variations: e.target.value
                                          });
                                        }}
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
                                          onChange={onVariantChange}
                                          name={'colorname'}
                                          value={data1.colorname}
                                        />
                                      </InputGroup>
                                    </div>
                                  </td>

                                  <td className="p-0 text-center">
                                    <div className=" d-flex align-items-center">
                                      <InputGroup className="" size="sm">
                                        <Form.Control
                                        value={(data1.variations === 'weight' ? data1.weight : data1.variations === 'volume' ? data1.volume  : data1.variations === 'piece' ?  data1.piece : data1.variations === 'color' ? data1.size : null)}
                                          type="text"
                                          sm="9"
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
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
                                          onChange={onVariantChange}
                                          name={'price'}
                                          value={data1.price}
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
                                          onChange={onVariantChange}
                                          name={'mrp'}
                                          value={data1.mrp}

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
                                          onChange={onVariantChange}
                                          name={'sale_price'}
                                          value={data1.sale_price}
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
                                          onChange={onVariantChange}
                                          name={'discount'}
                                          value={data1.discount}
                                        />
                                      </InputGroup>

                                    </div>
                                  </td>
                                  <td className="p-0 text-center">
                                    <div className="">
                                      <Form.Check
                                        onChange={onVariantChange}
                                        name={'special_offer'}
                                        value={data1.special_offer}
                                      />
                                    </div>
                                  </td>
                                  <td className="p-0 text-center">
                                    <div className="">
                                      <Form.Check
                                        onChange={onVariantChange}
                                        name={'featured_product'}
                                        value={data1.featured_product}
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
                                          onChange={onVariantChange}
                                          name={'manufacturing_date'}
                                          value={data1.manufacturing_date}
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
                                          onChange={onVariantChange}
                                          name={'expire_date'}
                                          value={data1.expire_date}
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
                                          value={data1.quantity}
                                          sm="9"
                                          min={'1'}
                                          className={(customvalidated === true) ? 'border-danger' : null}
                                          onChange={onVariantChange}
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
                                        onClick={onVariantaddclick}
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
                                            onClick={() => VariantRemoveClick(variantdata)} size="sm">
                                            &times;
                                          </Button>
                                          <Button variant="text-danger" className="addcategoryicon text-danger"
                                            onClick={() => VariantEditClick(variantdata)} size="sm">
                                            <MdOutlineEdit/>
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
                  </Form>
                </div>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <button className='button main_outline_button' onClick={handlevarietyClose}>Cancel</button>
          <button className='button main_button' onClick={handlevarietyClose}>Save</button>
        </Modal.Footer>
      </Modal> */}
            <Addproduct
             show={show}
              show1={varietyshow}/>
        
        <DataTable
          columns={columns}
          data={pdata}
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
