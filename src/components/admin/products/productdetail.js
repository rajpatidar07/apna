import React, { useState } from "react";
import MainButton from "../common/button";
import ShowMoreText from "react-show-more-text";
import { AiFillPushpin } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ListGroup from 'react-bootstrap/ListGroup';
import axios from "axios";
import { useEffect } from "react";
const Productdetail = () => {
  const [productdata, setProductData] = useState([]);
  const [colorchange, setcolorchange] = useState('');
  const [sizechange, setsizechange] = useState('');

  let vid = localStorage.getItem("variantid")
  let pid = localStorage.getItem("productid");
  useEffect(() => {
    function getProductDetails() {
      try {
        axios.post(`http://192.168.29.108:5000/products_search?page=0&per_page=10`,
          {
            "product_search": {
              "search": "",
              "product_id": `${pid}`
            }
          }
        )
          .then((response) => {
            let data = response.data.results;
            setProductData(data);
            console.log("getttttttttttttttttttttttttttttt----------" + JSON.stringify(data));
          });
      } catch (err) { }
    }

    getProductDetails();
  }, []);
  // const productinfo = (e) => {
  //   setProductData({ ...productdata, [e.target.name]: e.target.value});
  // };
const onColorChange = (e,id) =>{
  setcolorchange(e.target.value)
 vid = localStorage.setItem("variantid" , id)
 console.log("----ejkfje"+e.target.value + "000"+id)
}
const onSizeClick = (e,id) =>{
  setsizechange(e.target.value)
 vid = localStorage.setItem("variantid" , id)
 console.log("----ejkfje"+e.target.value + "000"+id)
}
  return (

    <div>
      {(productdata || []).map((data) => {
        return (
          <>
            {/* <h2 className="productname mb-0">{data.product_title_name}</h2> */}
            {(vid == data.id && pid == data.product_id) ?
            <div className="productdetail_page_box  mt-3">
              <div className="productimg_box">

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
               
                  <div className="variety_section_box">

                    {/* variety */}
                    <div className="product_lower_section product_upper_section">
                      {/* {data.id}{data.product_id} */}
                      <b>  <h5 className="mb-1">Product Variety:</h5></b>
                      <div className="product_mid_section">


                        <div className="productstatus align-items-start">
                          <AiFillPushpin className="text-success h5" />
                          <h6 className="statuslabeltext">Color:</h6>
                          <select className="coolorselect" onChange={(e)=>onColorChange(e,data.id)} name='colors'>
                          {(productdata || []).map((data) => {
        return (
                            <option>{data.colors}</option>
                            
        )})}
                          </select>
                        </div>
                        <div className="productstatus align-items-start">
                          <AiFillPushpin className="text-success h5" />
                          <h6 className="statuslabeltext">Size:</h6>
                         
                          <div className="productstatus">
                          {(productdata || []).map((data) => {
        return (
                colorchange === data.colors ?
                            <h6 className="statustextoutsize" onClick={(e)=>onSizeClick(e,data.id)}>{data.size}</h6> : null
                            )})}
                           
                          </div>
                        </div>
                        <div className="productstatus align-items-start">
                          <AiFillPushpin className="text-success h5" />
                          <h6 className="statuslabeltext">Quantity:</h6>
                          {(productdata || []).map((data) => {
        return (
                sizechange === data.size && colorchange === data.colors  ?
                          <h6 className="statustextsize"> {data.quantity}</h6>
                          : null
                            )})}
                           
                          {/* <h6 className="statustextred">(Out of Stock)</h6> */}
                        </div>

                     
                      </div>
                    </div>



                    {/* date */}
                    <div className="product_lower_section product_upper_section">
                      <b>  <h5 className="mb-0">Date:</h5> </b>
                      <div className="product_mid_section">
                        <div className="productquantity productstatus">
                          <h5 className="statuslabeltext mb-0">Manufactured Date:</h5>
                          <p className="categorytext mb-0 text-primary">{data.manufacturing_date}</p>
                        </div>
                        <div className="productquantity productstatus">
                          <h5 className="statuslabeltext mb-0">Expire Date:</h5>
                          <p className="categorytext mb-0 text-danger">{data.expire_date}</p>
                        </div>
                      </div>
                      <div className="productquantity productstatus">
                        <b> <h5 className="mb-0">Price:</h5> </b>
                        <b><p className="mb-0 text-success">{data.product_price}</p> </b>
                      </div>
                    </div>
                    {/*  */}



                    {/* offers */}
                    <div className="product_lower_section product_upper_section">
                      <b> <h5 className="mb-0">Offers:</h5></b>
                      <div className="product_mid_section ">
                        <div className="productquantity productstatus align-items-start">
                          {data.featured_product === 0 ? <ImCross className="text-danger h5" /> :
                            <BsCheckLg className="text-success h5" />}
                          <h5 className="statuslabeltext mb-0">Featured Product</h5>
                        </div>
                        <div className="productquantity productstatus align-items-start">
                          {data.special_offer === 0 ? <ImCross className="text-danger h5" /> :
                            <BsCheckLg className="text-success h5" />}
                          <h5 className="statuslabeltext mb-0">Special Offer</h5>
                        </div>
                        {/* <div className="productquantity productstatus align-items-start">
                     <BsCheckLg className="text-success h5" />
                     <h5 className="statuslabeltext mb-0">Promotional Product</h5>
                   </div> */}
                      </div>
                    </div>
                  </div>
                 
              </div>


              <div className="product_detail_box mt-4">
                {/*  */}
                <div className="product_upper_section">
                  <div>
                    <b><h5 className="statuslabeltext text-success">{data.product_title_name}</h5></b>
                    <div className="productstatus">
                      <h5 className="statuslabeltext">SKU:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.id}</h6>
                      </b>
                    </div>
                  </div>
                </div>

                {/* price */}

                <div className="product_upper_section ">
                  <div className="product_mid_section product_variety_section">
                    <h3 className="mb-0">{data.product_price}</h3>
                    <div className="priceboxx">
                      <b>
                        <p className="text-success mb-0">{data.discount}% off </p>
                      </b>
                      <p className="mrprate text-danger">({data.mrp})</p>
                    </div>
                    <div className="priceboxx">
                      <b>
                        {" "}
                        <p className="text-secondary">Sale Price: </p>
                      </b>
                      <p className="">{data.sale_price}</p>
                    </div>
                  </div>

                  {/* tax */}
                  <div className="product_mid_section product_variety_section">
                    <h5 className="mb-0">Tax:</h5>
                    <div className="productstatus">
                      <h5 className="statuslabeltext">Gst:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.gst}</h6>
                      </b>
                      <h5 className="statuslabeltext">wholesale_sales_tax:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.wholesale_sales_tax}</h6>
                      </b>
                    </div>
                    <div className="productstatus">
                      <h5 className="statuslabeltext">manufacturers_sales_tax:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.manufacturers_sales_tax}</h6>
                      </b>
                      <h5 className="statuslabeltext">retails_sales_tax:</h5>
                      <b>
                        <h6 className="text-secondary statuslabeltext">{data.retails_sales_tax}</h6>
                      </b>
                    </div>
                  </div>


                  {/* store */}
                  <div className="product_lower_section product_upper_section">
                    <div className="productquantity productstatus">
                      <h5 className=" mb-0">Store:</h5>
                      <p className="statuslabeltext mb-0 text-primary">{data.store_name}</p>
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
                      anchorclassName="oooeeer"
                      expanded={false}
                      width={500}
                      className={'detailproduct'}
                    >
                      <p className="detailproduct statuslabeltext">
                        {data.product_description}
                      </p>
                    </ShowMoreText>
                  </div>
                  {/*  */}

                  {/* category */}
                  <div className="product_lower_section product_upper_section">
                    <div className="productquantity productstatus">
                      <h5 className="mb-0">Category:</h5>
                      <p className="categorytext statuslabeltext mb-0">
                        {data.category}
                      </p>
                    </div>
                    <div className="productquantity productstatus">
                      <h6 className="categorytext1">{data.parent_category}</h6>
                      <h6 className="categorytext1">{data.parent_category}</h6>
                    </div>
                  </div>
                  {/*  */}
                  {/* other instarusction */}
                  <div>
                    <h5 className="mb-1">Other Instruction:</h5>
                    <ShowMoreText
                      /* Default options */
                      lines={5}
                      more="Show more"
                      less="...Show less"
                      anchorclassName="oooeeer"
                      expanded={false}
                      width={500}
                    >
                      <p className="detailproduct statuslabeltext">
                        {data.other_introduction}
                      </p>
                      {/* <ListGroup variant="flush">
                  <ListGroup.Item>No style</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Success</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Danger</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Warning</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Info</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Light</ListGroup.Item>
                  <ListGroup.Item variant="secondary">Dark</ListGroup.Item>
                </ListGroup> */}
                    </ShowMoreText>
                  </div>
                </div>



              </div>


              {/*  */}
              <MainButton
                btntext={"Edit product"}
                btnclass={"btn btn-success my-4"}
              />
            </div>
 : null}
          </>
        )
      })}

    </div>

  );
};

export default Productdetail;
