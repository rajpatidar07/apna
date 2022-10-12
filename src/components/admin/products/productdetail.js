import React, { useEffect } from "react";
import MainButton from "../common/button";
import Carousel from "react-bootstrap/Carousel";
import ShowMoreText from "react-show-more-text";
import { AiOutlineBgColors } from "react-icons/ai";
import $ from "jquery";

const Productdetail = () => {
  return (
    <div>
      <h2>Product Detail</h2>

      {/* deatil */}

      <div className="productdetail_page_box">
        <div className="productimg_box">
          <div class="container mt-5">
            <div class="carousel-container position-relative row">
              <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                  <div class="carousel-item active" data-slide-number="0">
                    <img
                      src="https://source.unsplash.com/Pn6iimgM-wo/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/Pn6iimgM-wo/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="1">
                    <img
                      src="https://source.unsplash.com/tXqVe7oO-go/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/tXqVe7oO-go/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="2">
                    <img
                      src="https://source.unsplash.com/qlYQb7B9vog/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/qlYQb7B9vog/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="3">
                    <img
                      src="https://source.unsplash.com/QfEfkWk1Uhk/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/QfEfkWk1Uhk/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="4">
                    <img
                      src="https://source.unsplash.com/CSIcgaLiFO0/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/CSIcgaLiFO0/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="5">
                    <img
                      src="https://source.unsplash.com/a_xa7RUKzdc/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/a_xa7RUKzdc/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="6">
                    <img
                      src="https://source.unsplash.com/uanoYn1AmPs/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/uanoYn1AmPs/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="7">
                    <img
                      src="https://source.unsplash.com/_snqARKTgoc/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/_snqARKTgoc/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="8">
                    <img
                      src="https://source.unsplash.com/M9F8VR0jEPM/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/M9F8VR0jEPM/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                  <div class="carousel-item" data-slide-number="9">
                    <img
                      src="https://source.unsplash.com/Q1p7bh3SHj8/1600x900/"
                      class="d-block w-100"
                      alt="..."
                      data-remote="https://source.unsplash.com/Q1p7bh3SHj8/"
                      data-type="image"
                      data-toggle="lightbox"
                      data-gallery="example-gallery"
                    />
                  </div>
                </div>
              </div>

              <div
                id="carousel-thumbs"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="row mx-0">
                      <div
                        id="carousel-selector-0"
                        class="thumb col-4 col-sm-2 px-1 py-2 selected"
                        data-target="#myCarousel"
                        data-slide-to="0"
                      >
                        <img
                          src="https://source.unsplash.com/Pn6iimgM-wo/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-1"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="1"
                      >
                        <img
                          src="https://source.unsplash.com/tXqVe7oO-go/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-2"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="2"
                      >
                        <img
                          src="https://source.unsplash.com/qlYQb7B9vog/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-3"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="3"
                      >
                        <img
                          src="https://source.unsplash.com/QfEfkWk1Uhk/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-4"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="4"
                      >
                        <img
                          src="https://source.unsplash.com/CSIcgaLiFO0/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-5"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="5"
                      >
                        <img
                          src="https://source.unsplash.com/a_xa7RUKzdc/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <div class="row mx-0">
                      <div
                        id="carousel-selector-6"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="6"
                      >
                        <img
                          src="https://source.unsplash.com/uanoYn1AmPs/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-7"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="7"
                      >
                        <img
                          src="https://source.unsplash.com/_snqARKTgoc/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-8"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="8"
                      >
                        <img
                          src="https://source.unsplash.com/M9F8VR0jEPM/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div
                        id="carousel-selector-9"
                        class="thumb col-4 col-sm-2 px-1 py-2"
                        data-target="#myCarousel"
                        data-slide-to="9"
                      >
                        <img
                          src="https://source.unsplash.com/Q1p7bh3SHj8/600x400/"
                          class="img-fluid"
                          alt="..."
                        />
                      </div>
                      <div class="col-2 px-1 py-2"></div>
                      <div class="col-2 px-1 py-2"></div>
                    </div>
                  </div>
                </div>
                <a
                  class="carousel-control-prev"
                  href="#carousel-thumbs"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a
                  class="carousel-control-next"
                  href="#carousel-thumbs"
                  role="button"
                  data-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          {/* <Carousel>
            <Carousel.Item>
              <img
                className="productpicture w-100"
                src="https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="productpicture  w-100"
                src="https://images.pexels.com/photos/3123792/pexels-photo-3123792.jpeg?cs=srgb&dl=pexels-wallace-chuck-3123792.jpg&fm=jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="productpicture w-100"
                src="https://images.pexels.com/photos/4449068/pexels-photo-4449068.jpeg?cs=srgb&dl=pexels-satyam-verma-4449068.jpg&fm=jpg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel> */}
          {/* <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
                <div>
                    <img src="assets/1.jpeg" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src="assets/2.jpeg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="assets/3.jpeg" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src="assets/4.jpeg" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src="assets/5.jpeg" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src="assets/6.jpeg" />
                    <p className="legend">Legend 6</p>
                </div>
            </Carousel> */}
        </div>
        <div className="product_detail_box">
          {/*  */}
          <div className="product_upper_section">
            {/* <div className="productstatus">
              <h5 className="statuslabeltext">Status:</h5>
              <h6 className="statustext">Status</h6>
            </div> */}
            <div>
              <h3 className="productname mb-0">PRODUCT NAME</h3>
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
                <p className="mrprate">($25)</p>
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

            {/*  */}
            <div className="product_lower_section product_upper_section">
              <div className="productquantity productstatus">
                <h5 className="statuslabeltext mb-0">Store:</h5>
                <p className="categorytext mb-0">Gyansheet</p>
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
