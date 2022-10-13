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

      <div className="d-flex justify-content-center align-items-center p-0 m-0">
        <Form className="">
          <div className="">
            <div className="">
              <div className="row px-3">
                <div className="col-12">
                  <Form.Group className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label className="" column sm="12">
                      Name
                    </Form.Label>

                    <Form.Control type="text" placeholder="Name" />
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Email
                    </Form.Label>

                    <Form.Control type="text" placeholder="Email" />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Mobile
                    </Form.Label>

                    <Form.Control type="text" placeholder="Mobile Number" />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Admin Type
                    </Form.Label>

                    <Form.Select aria-label="Default select example">
                      <option>Super Admin</option>
                      <option value="1">Admin</option>
                      <option value="2">Editor</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="col-12">
                  <Form.Group
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label className="" column sm="12">
                      Password
                    </Form.Label>

                    <Form.Control type="text" placeholder="Password" />
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
