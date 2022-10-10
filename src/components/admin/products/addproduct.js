import React, { useState } from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MainButton from "../common/button";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillPlusSquareFill } from 'react-icons/bs';
const Addproduct = (props) => {
  const [spcloffercheck, setspcloffercheck] = useState('0')
  const [expiredatecheck, setexpiredatecheck] = useState('0')

  const onSpecialOfferclick = (e) =>{
    if (e.target.checked) {
      setspcloffercheck('1')
    } else {
      setspcloffercheck('0')
    }
  }
  const onExpireDateclick = (e) =>{
    if (e.target.checked) {
      setexpiredatecheck('1')
    } else {
      setexpiredatecheck('0')
    }
  }
  const ontagaddclick = (e)=>{
console.log("-------"+e.target.value)
  }
  return (
    <div>
      {/* form */}
     
    
<div className="d-flex justify-content-center align-items-center addproduct_form_boxx p-0 m-0">
      <Form className="p-2 addproduct_form">
      <h5 className="m-0">Basic Info</h5>
<div className="productvariety_one">
      <Form.Group  className="mx-3" controlId="formPlaintextEmail">
        <Form.Label column sm="12">
       SKU
        </Form.Label>
        <Col sm="12">
        <Form.Control type="text" placeholder=" SKU" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Product Title/Name
        </Form.Label>
        <Col sm="12">
          <Form.Control type="text" placeholder="Product Title/Name" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Product Slug
        </Form.Label>
        <Col sm="12">
          <Form.Control type="text" placeholder="Product Slug" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Store Name
        </Form.Label>
        <Col sm="12">
          <Form.Control type="text" placeholder=" Store Name" />
        </Col>
      </Form.Group>
      </div>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Product Description
        </Form.Label>
        <Col sm="12">
        <Editor
    value={''}
    init={{
      height: 200,
      menubar: false
    }}
    onEditorChange={undefined}
  />
          {/* <Form.Control as="textarea" rows={3} placeholder="Product Description" /> */}
        </Col>
      </Form.Group>
{/* category */}
      <hr className="m-2" />
      <h5 className="m-0">Category Info</h5>
      <div className="productvariety">
      <Form.Group  className="mx-3" controlId="formPlaintextEmail">
      <Form.Label column sm="12">
      Product Type
        </Form.Label>
        <Col sm="12">
      <Form.Select aria-label="Product Type" className="adminselectbox">
      <option>Select Product Type</option>
      <option value="Grocery">One</option>
      <option value="Foods">Two</option>
      <option value="Clothes">Three</option>
      <option value="Health Care">Four</option>
      <option value="Books">Five</option>

    </Form.Select>
    </Col>
    </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextEmail">
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
      <Form.Group  className="mx-3" controlId="formPlaintextEmail"> 
      <Form.Label column sm="12">
      Parent Category
        </Form.Label>
        <Col sm="12">
        <Form.Select aria-label="Parent Category" className="adminselectbox">
      <option>Select Parent Category</option>
      <option value="Dry Fruits">One</option>
      <option value="Fresh">Two</option>
      <option value="Organic">Three</option>
    </Form.Select>
        </Col>
        </Form.Group>
        </div>
      {/*Price and Quantity  */}
      <hr className="m-2" />
      <h5 className="m-0">Stock Info</h5>
      <div className="productvariety">
       <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Product Quantity
        </Form.Label>
        <Col sm="12">
          <Form.Control type="number" placeholder="Product Quantity" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Mrp
        </Form.Label>
        <Col sm="12">
          <Form.Control type="number" placeholder="mrp" />
        </Col>
      </Form.Group>
       <Form.Group  className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Product Price
        </Form.Label>
        <Col sm="12">
          <Form.Control type="number" placeholder="Price" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Sale Price
        </Form.Label>
        <Col sm="12">
          <Form.Control type="number" placeholder="Sale Price" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Discount
        </Form.Label>
        <Col sm="12">
          <Form.Control type="number" placeholder="Discount" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12 d-flex align-itmes-center">
        Special Offer
        <Form.Check className="mx-2" value={spcloffercheck} onChange={onSpecialOfferclick}/>
        </Form.Label>
        {spcloffercheck==='1' ?
        <Col sm="12">
          <Form.Control type="number" placeholder="Offer"/>
        </Col> : null }
      </Form.Group>
      </div>
{/*Date  */}
<hr className="m-2" />
      <h5 className="m-0">Date</h5>
      <div className="productvariety">
       <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Manufacturing Date
        </Form.Label>
        <Col sm="12">
          <Form.Control type="date" placeholder="Product Quantity" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" >
        <Form.Label column sm="12 d-flex align-itmes-center">
        Expire Date
        <Form.Check className="mx-2" onChange={onExpireDateclick} value={expiredatecheck}/>
        </Form.Label>
        {expiredatecheck === '1' ?
          <Col sm="12">
          <Form.Control type="date" placeholder="Price" />
        </Col> :null}
      </Form.Group>
      </div>
{/* Variation */}

      <hr className="m-2" />
      <div className="productvariety_boxx">
      <div>
      <h5 className="m-0">Variety</h5>
      <div className="productvariety_color">
       <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2 colorpickerproduct">
        Color
        </Form.Label>
        <Col sm="5">
          <Form.Control type="color" placeholder="Color"  />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Size
        </Form.Label>
        <Col sm="12">
          <Form.Control type="number" placeholder="Size" />
        </Col>
      </Form.Group>
      <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
        Quantity
        </Form.Label>
        <Col sm="12">
          <Form.Control type="number" placeholder="Quantity" />
        </Col>
      </Form.Group>
</div>
</div>
  {/* offer */}
  <div>
      <h5 className="m-0">Offer</h5>
      <div className="productvariety">
       <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="9 d-flex align-items-end">
        Featured Product
        <Form.Check />
        </Form.Label>
      </Form.Group>
      </div>
      </div>
</div>

    {/* seo tag */}
      <hr className="m-2" />
      <div className="productvariety">
       <Form.Group  className="mx-3" controlId="formPlaintextPassword">
        <Form.Label column sm="9">
        Tag
        </Form.Label>
        <div className=" d-flex align-items-center">
        <Form.Control column sm="9" onChange={undefined}/>
        <BsFillPlusSquareFill className=" mx-2 addcategoryicon" onClick={ontagaddclick}/>
        </div>
      </Form.Group>
      </div>
     
    </Form>
    </div>
    </div>
  );
};

export default Addproduct;
