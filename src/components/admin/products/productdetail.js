import React, { useEffect } from "react";
import MainButton from "../common/button";
import Carousel from "react-bootstrap/Carousel";
import ShowMoreText from "react-show-more-text";
import { AiOutlineBgColors } from "react-icons/ai";
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBContainer,
} from "mdb-react-ui-kit";
const Productdetail = () => {
 


  return (
    <div className="card ">
      <h2 className="productname mb-0">Green Leaf Lettuce</h2>

      {/* deatil */}

      <div className="productdetail_page_box">
        <div className="productimg_box">
          {/* caerousel */}
        

          {/* <div id="myCarousel" class="carousel slide" data-bs-ride="carousel" align="center">
                                <div class="carousel-inner">
                                    <div class="carousel-item active"> <img src="https://i.imgur.com/bV1xmG5.jpg" class="rounded" /> </div>
                                    <div class="carousel-item"> <img src="https://i.imgur.com/vgMi4nw.jpg" class="rounded" /> </div>
                                    <div class="carousel-item"> <img src="https://i.imgur.com/hRlGe10.jpg" class="rounded" /> </div>
                                </div>
                                <ol class="carousel-indicators list-inline">
                                    <li class="list-inline-item active"> <a id="carousel-selector-0" class="selected" data-bs-slide-to="0" data-bs-target="#myCarousel"> <img src="https://i.imgur.com/bV1xmG5.jpg" class="img-fluid rounded" /> </a> </li>
                                    <li class="list-inline-item"> <a id="carousel-selector-1" data-bs-slide-to="1" data-bs-target="#myCarousel"> <img src="https://i.imgur.com/vgMi4nw.jpg" class="img-fluid rounded" /> </a> </li>
                                    <li class="list-inline-item"> <a id="carousel-selector-2" data-bs-slide-to="2" data-bs-target="#myCarousel"> <img src="https://i.imgur.com/hRlGe10.jpg" class="img-fluid rounded" /> </a> </li>
                                </ol>
                            </div> */}
        </div>



        {/*  */}
        <div className="product_detail_box">
          {/*  */}
          <div className="product_upper_section">
            {/* <div className="productstatus">
              <h5 className="statuslabeltext">Status:</h5>
              <h6 className="statustext">Status</h6>
            </div> */}
            <div>
            <h5 className="statuslabeltext">Green Leaf Lettuce</h5>
              <div className="productstatus">
                <h5 className="statuslabeltext">SKU:</h5>
                <b>
                  <h6 className="text-secondary">#1213</h6>
                </b>
              </div>
            </div>
          </div>

          {/*  */}

          <div className="product_upper_section product_mid_section">
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

            <div className="product_mid_section product_variety_section">
              <h5 className="mb-1">Product Variety:</h5>
              <div className="productstatus">
                <div className="productstatus">
                  <h6 className="statuslabeltext">Color: </h6>
                  <select className="coolorselect">
                    <option>Pink</option>
                    <option>Red</option>
                    <option>Yellow</option>
                  </select>
                </div>
                <div className="productstatus">
                  <h6 className="statuslabeltext">Quantity:</h6>
                  <h6 className="statustextsize"> 14</h6>
                  {/* <h6 className="statustextred">(Out of Stock)</h6> */}
                </div>
              </div>
              <div className="productstatus">
                <h6 className="statuslabeltext">Size:</h6>
                <div className="productstatus">
                  <h6 className="statustextoutsize">XS</h6>
                  <h6 className="statustextsize">X</h6>
                  <h6 className="statustextsize">M</h6>
                  <h6 className="statustextsize">L</h6>
                </div>
              </div>
            </div>

            {/* store */}
            <div className="product_lower_section product_upper_section">
              <div className="productquantity productstatus">
                <h5 className="statuslabeltext mb-0">Store:</h5>
                <p className="categorytext mb-0">Gyansheet</p>
              </div>
            </div>
            {/*  */}

            {/* date */}
            <div className="product_lower_section product_upper_section">
            <h5 className="mb-1">Date:</h5>
              <div className="productquantity productstatus">
                <h5 className="statuslabeltext mb-0">Manufactured Date:</h5>
                <p className="categorytext mb-0">2022-oct-22</p>
              </div>
              <div className="productquantity productstatus">
                <h5 className="statuslabeltext mb-0">Expire Date:</h5>
                <p className="categorytext mb-0">2022-oct-22</p>
              </div>
            </div>
            {/*  */}

            {/*  */}
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
              >
                <p className="detailproduct">
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
          </div>
          {/*  */}

          {/*  */}
          <div className="product_lower_section product_upper_section">
            <div className="productquantity productstatus">
              <h5 className="statuslabeltext mb-0">Category:</h5>
              <p className="categorytext mb-0">Fruits & Vegetable</p>
            </div>
            <div className="productquantity productstatus">
              <h6 className="categorytext1">lettuce</h6>
              <h6 className="categorytext1">green veg</h6>
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
    </div>
  );
};

export default Productdetail;
