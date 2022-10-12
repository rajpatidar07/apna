import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Iconbutton from "../common/iconbutton";
import { Editor } from "@tinymce/tinymce-react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";

// import AddAdmin from "./add_update_admin";
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
        <Form className="p-2 addproduct_form">
          <div className="my-3 inputsection_box">
            <h5 className="m-0">Info</h5>
            <div className="productvariety_one">
              <Form.Group className="mx-3" controlId="formPlaintextEmail">
                <Form.Label className="inputlabelheading" column sm="12">
                  Name
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Name" />
                </Col>
              </Form.Group>
              <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label className="inputlabelheading" column sm="12">
                 Email
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Email" />
                </Col>
              </Form.Group>
              <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label className="inputlabelheading" column sm="12">
               Mobile
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Mobile Number" />
                </Col>
              </Form.Group>
              <Form.Group className="mx-3" controlId="formPlaintextPassword">
                <Form.Label className="inputlabelheading" column sm="12">
                 Admin Type
                </Form.Label>
                <Col sm="12">
                  <Form.Control type="text" placeholder="Admin Type" />
                </Col>
              </Form.Group>
            </div>
          </div>
        </Form>
      </div>
    </div>  
  );
};

export default AddAdmin;
