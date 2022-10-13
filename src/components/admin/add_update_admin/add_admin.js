import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";


const AddAdmin = (props) => {
  const [inputList, setInputList] = useState([{ Header: "", Description: "" }]);
  const [addtag, setaddtag] = useState("");
  const [clickaddtag, setclickaddtag] = useState("");

  const ontagchangeclick = (e) => {
    setaddtag(e.target.value);
  };
  const tagRemoveClick = () => {
    seotag.unshift(clickaddtag);
  };
  const seotag = [];
  const ontagaddclick = () => {
    setclickaddtag(addtag);
    seotag.push(clickaddtag);
    setaddtag("");
    console.log(seotag);
  };
  // --------------------------------------------------------------------------
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { Header: "", Description: "" }]);
  };

  // ----------------------------------------
  return (
    <div>
      {/* form */}

      <div className="d-flex justify-content-center align-items-center addproduct_form_boxx p-0 m-0">
        <Form className="p-2 ">
          <div className="my-3 ">
             <div className="">
            <div className="row">
            <div className="col-12">
              <Form.Group className="mx-3" controlId="formPlaintextEmail">
                <Form.Label className="" column sm="12">
                  Name
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Name" />
                </Col>
              </Form.Group>
              </div>
              <div className="col-12">
              <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label className="inputlabelheading" column sm="12">
                 Email
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Email" />
                </Col>
              </Form.Group>
              </div>
              <div className="col-md-6">
              <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label className="inputlabelheading" column sm="12">
               Mobile
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Mobile Number" />
                </Col>
              </Form.Group>
              </div>
              <div className="col-md-6">
              <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label className="inputlabelheading" column sm="12">
                 Admin Type
                </Form.Label>
                <Col sm="12">               
                 <Form.Select aria-label="Default select example">
                   <option>Open this select menu</option>
                   <option value="1">One</option>
                   <option value="2">Two</option>
                   <option value="3">Three</option>
                </Form.Select>           
                </Col>
              </Form.Group>
              </div>
              <div className="col-12">
              <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label className="inputlabelheading" column sm="12">
                 Password
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Password"/>
                </Col>
              </Form.Group>
              </div>
            </div>
          </div>
          </div>
        </Form>
      </div>
    </div>  
  );
};

export default AddAdmin;
