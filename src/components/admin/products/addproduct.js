import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Iconbutton from "../common/iconbutton";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useReducer } from "react";
const Addproduct = (props) => {
  const [addtag, setaddtag] = useState("");
  const [clickaddtag, setclickaddtag] = useState("");
  const [inputfield, setinputfield] = useState(false);
  const [inpuadd, setinpuadd] = useState([]);
  const [desadd, setdesadd] = useState([]);


  // const seotag = [];

  const ontagaddclick = () => {
    setclickaddtag(addtag);
    // seotag.push(clickaddtag);
  };
  const ontagchangeclick = (e) => {
    setaddtag(e.target.value);
  };
  const oncustomclick = (e) => {
    e.preventDefault()
    setinputfield(true);
  };
  var labeladd;
  const oncustominputadd = (e) => {
    labeladd = e.target.value;
  };
  var descadd;
  const oncustomdesadd = (e) => {
    descadd = e.target.value;
  };
  const oncustomlabelclick = (e) => {
    e.preventDefault()
    setinpuadd(labeladd);
    setdesadd(descadd);
  };

  return (
    <div>
      {/* form */}

      <div className="d-flex justify-content-center align-items-center addproduct_form_boxx p-0 m-0">
        <Form className="p-2 addproduct_form">
        <div className="my-3 inputsection_box">
          <h5 className="m-0">Basic Info</h5>
          <div className="productvariety_one">
            <Form.Group className="mx-3" controlId="formPlaintextEmail">
              <Form.Label column sm="12">
                SKU
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder=" SKU" />
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Product Title/Name
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder="Product Title/Name" />
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Product Slug
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder="Product Slug" />
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Store Name
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder=" Store Name" />
              </Col>
            </Form.Group>
          </div>
          <Form.Group className="mx-3" controlId="formPlaintextPassword">
            <Form.Label column sm="12">
              Product Description
            </Form.Label>
            <Col sm="12">
              <Editor
                value={""}
                init={{
                  height: 200,
                  menubar: false,
                }}
                onEditorChange={undefined}
              />
              {/* <Form.Control as="textarea" rows={3} placeholder="Product Description" /> */}
            </Col>
          </Form.Group>
          </div>
          {/* category */}
          <div className="my-3 inputsection_box">
          <h5 className="m-0">Category Info</h5>
          <div className="productvariety">
            <Form.Group className="mx-3" controlId="formPlaintextEmail">
              <Form.Label column sm="12">
                Product Type
              </Form.Label>
              <Col sm="12">
                <Form.Select
                  aria-label="Product Type"
                  className="adminselectbox"
                >
                  <option>Select Product Type</option>
                  <option value="Grocery">One</option>
                  <option value="Foods">Two</option>
                  <option value="Clothes">Three</option>
                  <option value="Health Care">Four</option>
                  <option value="Books">Five</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextEmail">
              <Form.Label column sm="12">
                Category
              </Form.Label>
              <Col sm="12">
                <Form.Select aria-label="Category" className="adminselectbox">
                  <option> Select Category</option>
                  <option value="Fruits">One</option>
                  <option value="Drinks">Two</option>
                  <option value="Cakes">Three</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextEmail">
              <Form.Label column sm="12">
                Parent Category
              </Form.Label>
              <Col sm="12">
                <Form.Select
                  aria-label="Parent Category"
                  className="adminselectbox"
                >
                  <option>Select Parent Category</option>
                  <option value="Dry Fruits">One</option>
                  <option value="Fresh">Two</option>
                  <option value="Organic">Three</option>
                </Form.Select>
              </Col>
            </Form.Group>
          </div>
          </div>
          {/*Price and Quantity  */}
          <div className="my-3 inputsection_box">
          <h5 className="m-0">Stock Info</h5>
          <div className="productvariety">
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Product Quantity
              </Form.Label>
              <Col sm="12">
                <Form.Control type="number" placeholder="Product Quantity" />
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Mrp
              </Form.Label>
              <Col sm="12">
                <Form.Control type="number" placeholder="mrp" />
              </Col>
            </Form.Group>
            <Form.Group className="m-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Product Price
              </Form.Label>
              <Col sm="12">
                <Form.Control type="number" placeholder="Price" />
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Sale Price
              </Form.Label>
              <Col sm="12">
                <Form.Control type="number" placeholder="Sale Price" />
              </Col>
            </Form.Group>
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Discount
              </Form.Label>
              <Col sm="12">
                <Form.Control type="number" placeholder="Discount" />
              </Col>
            </Form.Group>
          </div>
          </div>
          {/*Date  */}
          <div className="my-3 inputsection_box">
          <h5 className="m-0">Date</h5>
          <div className="productvariety">
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                Manufacturing Date
              </Form.Label>
              <Col sm="12">
                <Form.Control type="date" placeholder="Product Quantity" />
              </Col>
            </Form.Group>
            <Form.Group className="mx-3">
              <Form.Label column sm="12 d-flex align-itmes-center">
                Expire Date
              </Form.Label>
              <Col sm="12">
                <Form.Control type="date" placeholder="Price" />
              </Col>
            </Form.Group>
          </div>
          </div>
          {/* Variation */}

          <div className="my-3 inputsection_box">
          <div className="productvariety_boxx">
            <div>
              <h5 className="m-0">Variety</h5>
              <div className="productvariety_color">
                <Form.Group className="mx-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="2 colorpickerproduct">
                    Color
                  </Form.Label>
                  <Col sm="5">
                    <Form.Control type="color" placeholder="Color" />
                  </Col>
                </Form.Group>
                <Form.Group className="mx-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="12">
                    Size
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control type="number" placeholder="Size" />
                  </Col>
                </Form.Group>
                <Form.Group className="mx-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="12">
                    Quantity
                  </Form.Label>
                  <Col sm="12">
                    <Form.Control type="number" placeholder="Quantity" />
                  </Col>
                </Form.Group>
              </div>
            </div>
          </div>
          </div>
          {/* Offer */}

          <div className="my-3 inputsection_box">
          <div>
            <div className="productvariety_box">
              <h5 className="m-0">Offer</h5>
              <div className="productvariety">
                <Form.Group className="mx-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="12 d-flex align-itmes-center">
                    Special Offer
                    <Form.Check className="mx-2" />
                  </Form.Label>
                </Form.Group>
                <Form.Group className="mx-3" controlId="formPlaintextPassword">
                  <Form.Label column sm="9 d-flex align-items-end">
                    Featured Product
                    <Form.Check className="mx-2" />
                  </Form.Label>
                </Form.Group>
              </div>
            </div>
          </div>
          </div>

          {/* seo tag */}
                   <div className="my-3 inputsection_box">

          <h5 className="m-0">Seo Tag</h5>
          <div className="productvariety my-3">
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <div className=" d-flex align-items-center my-2">
                <Form.Control
                  column
                  sm="9"
                  onChange={ontagchangeclick}
                  value={addtag}
                />
                <BsFillPlusSquareFill
                  className=" mx-2 addcategoryicon"
                  onClick={ontagaddclick}
                />
              </div>
              <div className="d-flex align-items-center tagselectbox my-2">
                <h6 className="tagselecttitle">{"#" + clickaddtag}</h6>
                <h6 className="tagselecttitle">{"#" + clickaddtag}</h6>
              </div>
            </Form.Group>
          </div>
          </div>
          {/* input */}
                   <div className="my-3 inputsection_box">

          {/* <div className="custombuttonbox">
            <Iconbutton
              btntext={"Add Custom Input"}
              onClick={oncustomlabelclick}
              Iconname={<AiOutlinePlus />}
              btnclass={"btn-success btn  addcustominput "}
            />
          </div> */}

          {/* <div className="productvariety my-5"> */}
            {/* {inputfield === true ? (
              <> */}
                {" "}
                <div className="productvariety mt-3">
                <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label column sm="12 d-flex align-itmes-center">
                   Header
                  </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Product Quantity"
                    onChange={oncustominputadd}
                  />
                </Form.Group>
                <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label column sm="12 d-flex align-itmes-center">
                   Description
                  </Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Product Quantity"
                    onChange={oncustomdesadd}
                  />

                </Form.Group>
                <Iconbutton
              btntext={"Add Custom Input"}
              onClick={oncustomlabelclick}
              Iconname={<AiOutlinePlus />}
              btnclass={"btn-success btn  addcustominput "}
            />
                {/* <BsFillPlusSquareFill
                  className=" mx-2 addcategoryicon addcustominput"
                  onClick={oncustomlabelclick}
                />{" "} */}
              </div>
              </div>
              {/* </>
            ) : null} */}
            <div className="my-3 inputsection_box">
            <div className="productvariety">
            <Form.Group className="mx-3" controlId="formPlaintextPassword">
              <Form.Label column sm="12">
                {inpuadd}
              </Form.Label>
              <Form.Label column sm="12">
                {desadd}
              </Form.Label>
            </Form.Group>
            </div>
            </div>
          {/* </div> */}
        </Form>
      </div>
    </div>
  );
};

export default Addproduct;
