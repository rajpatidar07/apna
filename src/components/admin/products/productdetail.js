import React from "react";
import MainButton from "../common/button";
import ShowMoreText from "react-show-more-text";
import { AiFillPushpin } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ListGroup from 'react-bootstrap/ListGroup';
const Productdetail = () => {
  return (
    <div>
      <h2 className="productname mb-0">Green Leaf Lettuce</h2>

      {/* deatil */}

      <div className="productdetail_page_box card mt-3">
        <div className="productimg_box">
          {/* caerousel */}
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

        {/*  */}
        <div className="product_detail_box mt-4">
          {/*  */}
          <div className="product_upper_section">
            <div>
              <b><h5 className="statuslabeltext text-success">Green Leaf Lettuce</h5></b>
              <div className="productstatus">
                <h5 className="statuslabeltext">SKU:</h5>
                <b>
                  <h6 className="text-secondary statuslabeltext">#1213</h6>
                </b>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="product_upper_section ">
            <div className="product_mid_section product_variety_section">
              <h3 className="mb-0">$14</h3>
              <div className="priceboxx">
                <b>
                  <p className="text-success mb-0">50% off </p>
                </b>
                <p className="mrprate text-danger">($25)</p>
              </div>
              <div className="priceboxx">
                <b>
                  {" "}
                  <p className="text-secondary">Tax: </p>
                </b>
                <p className="">$2</p>
              </div>
            </div>

            <div className="product_lower_section product_upper_section">
              <h5 className="mb-1">Product Variety:</h5>
              <div className="product_mid_section">
                <div className="productstatus align-items-start">
                  <AiFillPushpin className="text-success h5" />
                  <h6 className="statuslabeltext">Color: </h6>
                  <select className="coolorselect">
                    <option>Pink</option>
                    <option>Red</option>
                    <option>Yellow</option>
                  </select>
                </div>
                <div className="productstatus align-items-start">
                  <AiFillPushpin className="text-success h5" />
                  <h6 className="statuslabeltext">Quantity:</h6>
                  <h6 className="statustextsize"> 14</h6>
                  {/* <h6 className="statustextred">(Out of Stock)</h6> */}
                </div>
                <div className="productstatus align-items-start">
                  <AiFillPushpin className="text-success h5" />
                  <h6 className="statuslabeltext">Size:</h6>
                  <div className="productstatus">
                    <h6 className="statustextoutsize">XS</h6>
                    <h6 className="statustextsize">X</h6>
                    <h6 className="statustextsize">M</h6>
                    <h6 className="statustextsize">L</h6>
                  </div>
                </div>
              </div>
            </div>

            {/* store */}
            <div className="product_lower_section product_upper_section">
              <div className="productquantity productstatus">
                <h5 className=" mb-0">Store:</h5>
                <p className="statuslabeltext mb-0 text-primary">Gyansheet</p>
              </div>
            </div>
            {/*  */}

            {/* date */}
            <div className="product_lower_section product_upper_section">
              <h5 className="mb-0">Date:</h5>
              <div className="product_mid_section">
                <div className="productquantity productstatus">
                  <h5 className="statuslabeltext mb-0">Manufactured Date:</h5>
                  <p className="categorytext mb-0 text-primary">2022-oct-22</p>
                </div>
                <div className="productquantity productstatus">
                  <h5 className="statuslabeltext mb-0">Expire Date:</h5>
                  <p className="categorytext mb-0 text-danger">2022-oct-22</p>
                </div>
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
                anchorClass="oooeeer"
                expanded={false}
                width={500}
                className={'detailproduct'}
              >
                <p className="detailproduct statuslabeltext">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum
                </p>
              </ShowMoreText>
            </div>
            {/*  */}

            {/* category */}
            <div className="product_lower_section product_upper_section">
              <div className="productquantity productstatus">
                <h5 className="mb-0">Category:</h5>
                <p className="categorytext statuslabeltext mb-0">
                  Fruits & Vegetable
                </p>
              </div>
              <div className="productquantity productstatus">
                <h6 className="categorytext1">lettuce</h6>
                <h6 className="categorytext1">green veg</h6>
              </div>
            </div>
            {/*  */}

            {/* offers */}
            <div className="product_lower_section product_upper_section">
              <h5 className="mb-0">Offers:</h5>
              <div className="product_mid_section ">
                <div className="productquantity productstatus align-items-start">
                  <BsCheckLg className="text-success h5" />
                  <h5 className="statuslabeltext mb-0">Featured Product</h5>
                </div>
                <div className="productquantity productstatus align-items-start">
                  <ImCross className="text-danger h5" />
                  {/* <BsCheckLg className='text-success h5'/> */}
                  <h5 className="statuslabeltext mb-0">Special Offer</h5>
                </div>
                <div className="productquantity productstatus align-items-start">
                  <BsCheckLg className="text-success h5" />
                  <h5 className="statuslabeltext mb-0">Promotional Product</h5>
                </div>
              </div>
            </div>
            {/* other instarusction */}
            <div>
              <h5 className="mb-1">Other Instruction:</h5>
              <ShowMoreText
                /* Default options */
                lines={5}
                more="Show more"
                less="...Show less"
                anchorClass="oooeeer"
                expanded={false}
                width={500}
              >
                <p className="detailproduct statuslabeltext">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <ListGroup variant="flush">
                  <ListGroup.Item>No style</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Success</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Danger</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Warning</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Info</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Light</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Dark</ListGroup.Item>
                </ListGroup>
              </ShowMoreText>
            </div>
          </div>

          {/*  */}
          <MainButton
            btntext={"Edit product"}
            btnclass={"btn btn-success my-4"}
          />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Productdetail;
