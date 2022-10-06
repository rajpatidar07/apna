import React from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import MainButton from "../common/button";

const Addproduct = (props) => {
  return (
    <div>
      {/* form */}
     
    
<div className="d-flex justify-content-center align-items-center addproduct_form_boxx">
      <Form className="p-3 addproduct_form">
      <Form.Group as={Row} className="m-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
        Product SKU
        </Form.Label>
        <Col sm="10">
        <Form.Control type="text" placeholder="Product SKU" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" />
      <Form.Group as={Row} className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Product Title/Name
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Product Title/Name" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" />
      <Form.Group as={Row} className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Product Slug
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Product Slug" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" />
       <Form.Group as={Row} className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Product Description
        </Form.Label>
        <Col sm="10">
          <Form.Control as="textarea" rows={3} placeholder="Product Description" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" />
      <Form.Group as={Row} className="m-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
      Parent Category
        </Form.Label>
        <Col sm="10">
      <Form.Select aria-label="Parent Category" className="adminselectbox">
      <option> Select Parent Category</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    </Col>
    </Form.Group>
      <hr className="mx-n3" />
       <Form.Group as={Row} className="m-3" controlId="formPlaintextEmail"> 
      <Form.Label column sm="2">
      Child Category
        </Form.Label>
        <Col sm="10">
        <Form.Select aria-label="Child Category" className="adminselectbox">
      <option>Select Child Category</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
        </Col>
        </Form.Group>
     
      <hr className="mx-n3" />
       <Form.Group as={Row} className="m-3" controlId="formPlaintextEmail">
      <Form.Label column sm="2">
      Product Type
        </Form.Label>
        <Col sm="10">
      <Form.Select aria-label="Product Type" className="adminselectbox">
      <option>Select Product Type</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </Form.Select>
    </Col>
    </Form.Group>
      <hr className="mx-n3" /> <Form.Group as={Row} className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Product Quantity
        </Form.Label>
        <Col sm="10">
          <Form.Control type="number" placeholder="Product Quantity" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" /> <Form.Group as={Row} className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Product Price
        </Form.Label>
        <Col sm="10">
          <Form.Control type="number" placeholder="Price" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" /> <Form.Group as={Row} className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Sale Price
        </Form.Label>
        <Col sm="10">
          <Form.Control type="number" placeholder="Sale Price" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" /> <Form.Group as={Row} className="m-3" controlId="formPlaintextPassword">
        <Form.Label column sm="2">
        Product Tag
        </Form.Label>
        <Col sm="10">
          <Form.Control type="text" placeholder="Product Tag" />
        </Col>
      </Form.Group>
      <hr className="mx-n3" />
      
      {/* <hr className="mx-n3" />  */}
      {/* <div className="addbtn_box">
      <MainButton btntext={"Add"}  onClick={props.onAddClick}/>
        <MainButton btntext={"Cancel"} onClick={props.onCancelClick}/>
        </div> */}
    </Form>
    </div>
    </div>
  );
};

export default Addproduct;
