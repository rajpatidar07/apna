import React from "react";
import MainButton from "../common/button";
import Carousel from 'react-bootstrap/Carousel';
import ShowMoreText from "react-show-more-text";

const Productdetail = () => {
  return (
    <div>
      <h2>Product Detail</h2>

      {/* deatil */}

      <div className="productdetail_page_box">
        <div className="productimg_box">
          <Carousel>
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
          </Carousel>
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

            <h3 className="productname">PRODUCT NAME</h3>
            <div className="productstatus">
              <h5 className="statuslabeltext">SKU:</h5>
             <b><h6 className="text-secondary">#1213</h6></b> 
            </div>
          </div>

          {/*  */}

          <div className="product_upper_section product_mid_section">
            <h3 className="mb-0">$14</h3>
            <div className="priceboxx">
          <b><p className="text-success mb-0">50% off </p></b>  
            <p className="mrprate">($25)</p>
</div>
 <div className="priceboxx">
           <b> <p className="text-secondary">Tax: </p></b>
            <p className="">$2</p>
</div>
            <div className="product_upper_section product_mid_section">
            <h6 className="statuslabeltext">Color: </h6>
            <h6 className="statuslabeltext">Pink</h6>
            <div className="product_upper_section product_mid_section">
              <h6 className="statuslabeltext">Quantity: 14</h6>
              <h6 className="statustextred">(Out of Stock)</h6>
              </div>
            </div>
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
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
            </ShowMoreText>
          </div>
          {/*  */}
          <div className="product_lower_section product_upper_section">
            <div className="productquantity productstatus">
              <h5 className="statuslabeltext">Category:</h5>
              <p className="categorytext mb-1">Fruits & Vegetable</p>
            </div>
            <div className="productquantity productstatus">
              <h6 className="categorytext1">lettuce</h6>
              <h6 className="categorytext1">green veg</h6>
            </div>
            <MainButton
              btntext={"Edit product"}
              btnclass={"btn btn-success mt-4"}
            />
          </div>
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Productdetail;
