import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import review from "./reviwe.png";
import Info from "./product_info.png";
import Description from "./description.png";
import Iconbutton from "../common/iconbutton";
import { AiOutlineCloudUpload } from "react-icons/ai";

function ContentManager() {
  return (
    <div className="main_body">
      <h2>Content Manager</h2>
      <div className="row">
        <div className="col-md-6 col-6">
          <div className=" d-flex justify-content-between flex-row card my-2">
            <div className="content_image_text_text d-flex px-3 pt-2">
              <div className="content_image">
                <img alt="apnaorganic" src={review} />
              </div>
              <div>
                <h5>Product Review</h5>
                <p>page:Product</p>
                <p className="lead">#this_is_id</p>
              </div>
            </div>
            <div className="hide_show d-flex px-3 pt-2">
              <h5 className="lead pt-1">Hide</h5>
              <Form.Switch
                name="group1"
                isValid="true"
                defaultChecked
                className="mx-2"
              />
              <h5 className="lead pt-1">show</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-6">
          <div className="d-flex justify-content-between flex-row card my-2">
            <div className="content_image_text_text d-flex px-3 pt-2">
              <div className="content_image">
                <img alt="apnaorganic" src={Info} />
              </div>
              <div>
                <h5>Additional info</h5>
                <p>page:Product</p>
                <p className="lead">#this_is_id</p>
              </div>
            </div>
            <div className="hide_show d-flex px-3 pt-2">
              <h5 className="lead pt-1">Hide</h5>
              <Form.Switch
                name="group1"
                isValid="true"
                defaultChecked
                className="mx-2"
              />
              <h5 className="lead pt-1">show</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-6 mt-3">
          <div className="d-flex justify-content-between flex-row card my-2">
            <div className="content_image_text_text d-flex px-3 pt-2">
              <div className="content_image">
                <img alt="apnaorganic" src={Description} />
              </div>
              <div>
                <h5>Product Description</h5>
                <p>page:Product</p>
                <p className="lead">#this_is_id</p>
              </div>
            </div>
            <div className="hide_show d-flex px-3 pt-2">
              <h5 className="lead pt-1">Hide</h5>
              <Form.Switch name="group1" isValid="true" className="mx-2" />
              <h5 className="lead pt-1">show</h5>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-6 mt-3">
          <div className=" d-flex justify-content-between flex-row card my-2">
            <div className="content_image_text_text d-flex px-3 pt-2">
              <div className="content_image">
                <img alt="apnaorganic" src={review} />
              </div>
              <div>
                <h5>Product Review</h5>
                <p>page:Product</p>
                <p className="lead">#this_is_id</p>
              </div>
            </div>
            <div className="hide_show d-flex px-3 pt-2">
              <h5 className="lead pt-1">Hide</h5>
              <Form.Switch
                name="group1"
                isValid="true"
                defaultChecked
                className="mx-2"
              />
              <h5 className="lead pt-1">show</h5>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <h2>Footer Links</h2>
        <div className="footer_manage">
          <div className="row">
            <div className="col-md-6">
              <div className="card">
                <h4 className="ps-3 pt-3 m-0 text-center">Social MediaLink</h4>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Google</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Fackbook</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Twitter</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Pinterest</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>FAQs</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <h4 className="ps-3 pt-3 m-0 text-center">Store Infomation</h4>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Address</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Contact</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Email Address</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>Fex</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
                <div className="footer_links px-3 pt-2">
                  <div className="d-flex pb-2">
                    <Form.Check aria-label="option 1" className="me-2" />
                    <lable>...</lable>
                  </div>
                  <InputGroup size="sm" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">
                      Link
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Small"
                      aria-describedby="inputGroup-sizing-sm"
                    />
                  </InputGroup>
                </div>
              </div>
            </div>

            <div className="upload_logo mt-3">
              <h2>Upload Logo</h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="card p-3 d-flex flex-row justify-content-between">
                    <div className="my-auto">
                      <lable> Add Your Logo</lable>
                    </div>
                    <div>
                      <div className="d-flex">
                        <div className="m-auto pe-2">
                          <p className="m-0">236&times;96</p>
                        </div>
                        <Iconbutton
                          btntext={"Upload"}
                          btnclass={"button main_outline_button"}
                          Iconname={<AiOutlineCloudUpload />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentManager;
