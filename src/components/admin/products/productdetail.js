import React, { useState, useRef } from "react";
import ShowMoreText from "react-show-more-text";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import VariationJson from "../json/variation";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SAlert from "../../admin/common/salert";
import moment from "moment/moment";
import InputGroup from "react-bootstrap/InputGroup";
import  Loader from '../common/loader'
let encoded;
let ImgObj = [];

const Productdetail = () => {
  const navigate = useNavigate();
  let vid = localStorage.getItem("variantid");
  let pid = localStorage.getItem("productid");
  const [hideallData, setHideAlldata] = useState(false);
  const [variantremove, setVariantRemove] = useState([]);
  const [VerityAlert, setVerityAlert] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [productdata, setProductData] = useState([]);
  const [validated, setValidated] = useState(false);
  const [vdata, setvdata] = useState([]);
  const [loading, setloading] = useState(false);
  const [colorchange, setcolorchange] = useState("");
  const [sizechange, setsizechange] = useState("");
  const [variantapicall, setvariantapicall] = useState(false);
  const [varietyshow, setvarietyShow] = useState(false);
  const [ProductAlert, setProductAlert] = useState(false);
  const [UpdatetAlert, setUpdatetAlert] = useState(false);
  const [viewImage, setViewImage] = useState("view");
  const veriantData = {
    product_status: "1",
    product_id: pid,
    unit: "",
    colors: "",
    unit_quantity: null,
    size: "",
    product_price: "",
    mrp: "",
    sale_price: "",
    discount: "0",
    special_offer: false,
    featured_product: false,
    manufacturing_date: "",
    expire_date: "",
    quantity: "",
  };
  const [variantarray, setvariantarray] = useState(veriantData);

  const [productalldata, setproductalldata] = useState({
    add_custom_input: "",
    product_title_name: "",
    product_slug: "",
    store_name: "",
    product_type: "",
    category: "",
    parent_category: "",
    wholesale_sales_tax: "",
    manufacturing_date: "",
    expire_date: "",
    seo_tag: "",
    variety: false,
    product_description: "",
    other_introduction: "",
    is_active: "0",
  });

  const [customvalidated, setcustomValidated] = useState(false);
  const [unitValidated, setunitValidated] = useState(false);
  const [varietyUnitvalidation, setVarietyUnitvalidation] = useState("");
  const formRef = useRef();
  const [newImageUrls, setnewImageUrls] = useState([]);
  const [variantdetail, setVariantdetail] = useState([]);
  const [editbutton, setEditButton] = useState(false);
  const [changeUnitproperty, setChangeUnitProperty] = useState(false);
  useEffect(() => {
    function getProductDetails() {
      setloading(true)
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/product_details?id=${pid}`)

          .then((response) => {
            let data = response.data;
            if (data === "error") {
              navigate("/product");
            }
            if (data != undefined || data != "" || data != null) {
              setProductData(data);
              setVariantdetail(data.product_verient);
              onImgView(vid, pid);
              setvariantarray({
                ...variantarray,
                unit: response.data.product_verient[0].unit,
                product_id: pid,
              });
              setloading(false)
            }

            setvariantapicall(false);
          });
      } catch (err) {
        console.log(err);
      }
    }

    getProductDetails();
  }, [variantapicall]);

  useEffect(() => {
    setloading(true)
    getCategorydata();
  }, [productdata.category]);

  // api call for category details
  const getCategorydata = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/category_details?id=${productdata.id}`
      )

      .then((response) => {
        let data = response.data;
        setCategoryName(data[0].category_name);
        setloading(false)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // End of api call for category details

  const onColorChange = (e, id) => {
    setcolorchange(e.target.value);
    vid = localStorage.setItem("variantid", id);
  };

  const onSizeClick = (e, id) => {
    setsizechange(e.target.value);
    vid = localStorage.setItem("variantid", id);
  };

  var varietyy = VariationJson;

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      const { name } = file;
      fileReader.addEventListener("load", () => {
        resolve({ name: name, base64: fileReader.result });
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const imguploadchange = async (e, product_id, id, vendor_id) => {
    for (let i = 0; i < e.target.files.length; i++) {
      let coverimg;
      if (newImageUrls.length === 0 && i === 0) {
        coverimg = "cover";
      } else {
        coverimg = `cover${i}`;
      }
      encoded = await convertToBase64(e.target.files[i]);
      const [first, ...rest] = encoded.base64.split(",");
      const productimg = rest.join("-");
      let imar = {
        product_id: `${product_id}`,
        product_verient_id: `${id}`,
        vendor_id: `${vendor_id}`,
        product_image_name: `${encoded.name}${i}${id}`,
        image_position: coverimg,
        img_64: productimg,
      };
      ImgObj.push(imar);
    }
    // image

    axios
      .post(`${process.env.REACT_APP_BASEURL}/product_images`, ImgObj)
      .then((response) => {
        onImgView(id, product_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onImgRemove = (id, name, vendor_id, product_id, product_verient_id) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/product_image_delete`, {
        product_image_id: `${id}`,
        product_image_name: `${name}`,
        vendor_id: `${vendor_id}`,
      })
      .then((response) => {
        onImgView(product_verient_id, product_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onImgView = (id, productid) => {
    setViewImage("notview");
    localStorage.setItem("variantid", id);
    localStorage.setItem("productid", productid);
    setEditButton(false);
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
      )
      .then((response) => {
        setnewImageUrls(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onImgCoverEditClick = (imgid, productid, productvariantid) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/change_porduct_cover_image`, {
        product_image_id: `${imgid}`,
        product_id: `${productid}`,
        product_verient_id: `${productvariantid}`,
      })
      .then((response) => {
        onImgView(productvariantid, productid);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onVariantChange = (e) => {
    setVarietyUnitvalidation("");
    setcustomValidated(false);
    setvariantapicall(true);
    setunitValidated(false);
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value,
    });
  };

  let discountt = (variantarray.mrp * variantarray.discount) / 100;
  let product_price = variantarray.mrp - discountt;
  let saleprice =
    product_price +
    (product_price * (productdata.gst / 100) +
      product_price * (productdata.wholesale_sales_tax / 100) +
      product_price * (productdata.retails_sales_tax / 100) +
      product_price * (productdata.value_added_tax / 100) +
      product_price * (productdata.manufacturers_sales_tax / 100));

  useEffect(() => {
    setvariantarray({
      ...variantarray,
      product_status: "pending",
      product_price: `${product_price}`,
      sale_price: `${saleprice}`,
    });
  }, [variantarray.mrp, variantarray.discount, productdata, variantapicall]);
  const handleInputcheckboxChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setvariantarray({
      ...variantarray,
      [e.target.name]: value,
    });
  };

  const handleVarietyChange = (e) => {
    setproductalldata({
      ...productalldata,
      [e.target.name]: e.target.value,
    });
  };

  const onVariantaddclick = (id) => {
    if (id === "" || id === null || id === undefined) {
      if (
        variantarray.unit == "" ||
        variantarray.unit == null ||
        variantarray.unit == "Select" ||
        variantarray.product_price == "" ||
        variantarray.mrp == "" ||
        variantarray.sale_price == "" ||
        variantarray.manufacturing_date == "" ||
        variantarray.expire_date == "" ||
        variantarray.quantity == ""
      ) {
        setcustomValidated(true);
      } else if (variantarray.quantity == 0 || variantarray.quantity < 1) {
        setVarietyUnitvalidation("QwanityValidation");
      } else if (variantarray.manufacturing_date > variantarray.expire_date) {
        setVarietyUnitvalidation("ExpireDateValidation");
      } else if (
        productdata.product_type !== "Cloths" &&
        variantarray.unit === "pcs" &&
        variantarray.colors === "" &&
        (variantarray.size === null || variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&color");
      } else if (
        productdata.product_type === "Cloths" &&
        variantarray.unit === "pcs" &&
        (variantarray.colors === "" ||
          variantarray.size === null ||
          variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&size&color");
      } else if (
        variantarray.unit !== "pcs" &&
        (variantarray.unit_quantity === "" ||
          variantarray.unit_quantity === "null" ||
          variantarray.unit_quantity === null)
      ) {
        setunitValidated(true);
        setVarietyUnitvalidation("unitQwanity&size&color");
      } else if (Number(variantarray.discount) > 100) {
        setVarietyUnitvalidation("discountmore");
      } else if (
        Number(variantarray.mrp) > 50000 ||
        Number(variantarray.mrp) <= 0
      ) {
        setVarietyUnitvalidation("mrpmore");
      } else {
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/products_varient_add`,
            variantarray
          )
          .then((response) => {
            if ((response.affectedRows = "1")) {
              setProductAlert(true);

              setvariantarray({
                product_status: "",
                // unit: "",
                colors: "",
                unit_quantity: "",
                size: "",
                product_price: "",
                mrp: "",
                sale_price: "",
                discount: "0",
                special_offer: false,
                featured_product: false,
                manufacturing_date: "",
                expire_date: "",
                quantity: "",
                product_id: "",
              });
              setvariantapicall(true);
              setcustomValidated(false);
              setVarietyUnitvalidation("");
            } else if (response.errno == 1064) {
              alert("Error in add product");
              setProductAlert(false);
            } else {
              setProductAlert(false);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      if (id) {
        if (
          variantarray.unit == "" ||
          variantarray.unit == null ||
          variantarray.unit == "Select" ||
          variantarray.product_price == "" ||
          variantarray.mrp == "" ||
          variantarray.sale_price == "" ||
          variantarray.manufacturing_date == "" ||
          variantarray.expire_date == "" ||
          variantarray.quantity == ""
        ) {
          setcustomValidated(true);
        } else if (variantarray.quantity == 0 || variantarray.quantity < 1) {
          setVarietyUnitvalidation("QwanityValidation");
        } else if (variantarray.manufacturing_date > variantarray.expire_date) {
          setVarietyUnitvalidation("ExpireDateValidation");
        } else if (
          productdata.product_type !== "Cloths" &&
          variantarray.unit === "pcs" &&
          variantarray.colors === "" &&
          (variantarray.size === null || variantarray.size === "")
        ) {
          setVarietyUnitvalidation("fillUnit&color");
        } else if (
          productdata.product_type === "Cloths" &&
          variantarray.unit === "pcs" &&
          (variantarray.colors === "" ||
            variantarray.size === null ||
            variantarray.size === "")
        ) {
          setVarietyUnitvalidation("fillUnit&size&color");
        } else if (
          variantarray.unit !== "pcs" &&
          (variantarray.unit_quantity === "" ||
            variantarray.unit_quantity === "null" ||
            variantarray.unit_quantity === null)
        ) {
          setunitValidated(true);
          setVarietyUnitvalidation("unitQwanity&size&color");
        } else if (Number(variantarray.discount) > 100) {
          setVarietyUnitvalidation("discountmore");
        } else if (
          Number(variantarray.mrp) > 50000 ||
          Number(variantarray.mrp) <= 0
        ) {
          setVarietyUnitvalidation("mrpmore");
        } else {
          axios
            .put(
              `${process.env.REACT_APP_BASEURL}/products_varient_update`,
              variantarray
            )
            .then((response) => {
              if ((response.affectedRows = "1")) {
                setUpdatetAlert(true);

                // setvariantarray(response.data);

                setvariantarray({
                  product_status: "",
                  // unit: "",
                  colors: "",
                  unit_quantity: "",
                  size: "",
                  product_price: "",
                  mrp: "",
                  sale_price: "",
                  discount: "0",
                  special_offer: false,
                  featured_product: false,
                  manufacturing_date: "",
                  expire_date: "",
                  quantity: "",
                  product_id: "",
                });
                setvariantapicall(true);
                setcustomValidated(false);
                setVarietyUnitvalidation("");
              } else if (response.errno == 1064) {
                alert("Error in Update product");
                setUpdatetAlert(false);
              } else {
                setUpdatetAlert(false);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      } else {
        alert("Id not provide");
      }
    }
  };

  const VariantRemoveClick = (id, productid) => {
    setVerityAlert(true);
    setVariantRemove((variantremove) => {
      return { ...variantremove, id: id, productid: productid };
    });
  };

  const closeAlert = () => {
    setVerityAlert(false);
    setProductAlert(false);
    setUpdatetAlert(false);
  };

  // console.log(
  //   "veriant lenght--" + variantdetail.length + "ppp " + changeUnitproperty
  // );

  const deleteProductVeriant = () => {
    if (variantdetail.length === 0) {
      setHideAlldata(true);
      setVerityAlert(false);
    }
    if (variantdetail.length === 2) {
      setChangeUnitProperty("editvariety");
    }
    // console.log("veriant lenght--" + variantdetail.length);
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete_remove`, {
        varient_id: variantremove.id,
        product_id: variantremove.productid,
        is_delete: "0",
      })
      .then((response) => {
        setvariantapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    setvdata(vdata.filter((item) => item !== variantremove.id));
    setVerityAlert(false);
  };

  const VariantEditClick = (id, productid) => {
    if (variantdetail.length === 1) {
      setChangeUnitProperty(true);
    }
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/products_pricing?id=${id}&product_id=${productid}&user_id`
      )
      .then((response) => {
        setvariantarray(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // useEffect((id, productid)=>{
  //   VariantEditClick(id, productid)
  // },[])
  return (<>{loading === true ? <Loader/>:null}
    <div>
      {" "}
      {hideallData == false ? (
        <>
          <h2 className="productname mb-0">{productdata.product_title_name}</h2>
          <div className="row mt-3">
            <div className="productimg_box col-8">
              <Carousel
                autoPlay
                interval="3000"
                transitionTime="3000"
                infiniteLoop
                showIndicators={false}
                className={"productimg_carousel"}
                showStatus={false}
              >
                {newImageUrls
                  ? (newImageUrls || []).map((data, i) => {
                      return data.product_verient_id == vid &&
                        data.product_id == pid ? (
                        <div className="w-100 h-50" key={i}>
                          <img
                            src={
                              newImageUrls.length === 0
                                ? "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
                                : data.product_image_path
                                ? data.product_image_path
                                : null
                            }
                            alt={data.product_image_name}
                          />
                        </div>
                      ) : null;
                    })
                  : null}
              </Carousel>
            </div>

            <div className="product_detail_box col-4 mt-4 ">
              {/*  */}
              <div className="product_upper_section row">
                <div className="col-6">
                  <b>
                    <h5 className="statuslabeltext text-success">
                      {productdata.product_title_name}
                    </h5>
                  </b>

                  {/* price */}

                  <div className="product_upper_section ">
                    {variantdetail
                      ? (variantdetail || []).map((data, i) => {
                          return data.id == vid && data.product_id == pid ? (
                            <div
                              className="product_mid_section product_variety_section"
                              key={i}
                            >
                              <h3 className="mb-0">
                                {" "}
                                Price:{data.sale_price.toFixed(2)}
                              </h3>
                              <div className="priceboxx">
                                <b>
                                  <p className="text-success mb-0">
                                    {data.discount}% off
                                  </p>
                                </b>
                                <p className="mrprate text-danger">
                                  ({data.mrp.toFixed(2)})
                                </p>
                              </div>
                              <div className="priceboxx">
                                <b>
                                  {" "}
                                  <p className="text-secondary">
                                    Product Price: {data.product_price}{" "}
                                  </p>
                                </b>
                              </div>
                            </div>
                          ) : null;
                        })
                      : null}

                    {/* store */}
                    <div className="product_lower_section product_upper_section">
                      <div className="productquantity productstatus">
                        <h5 className=" mb-0">Store:</h5>
                        <p className="statuslabeltext mb-0 text-primary">
                          {productdata.store_name}
                        </p>
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
                        className={"detailproduct"}
                      >
                        <div
                          className="detailproduct statuslabeltext editor"
                          dangerouslySetInnerHTML={{
                            __html: productdata.product_description,
                          }}
                        ></div>
                      </ShowMoreText>
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
                        <div
                          className="detailproduct statuslabeltext"
                          dangerouslySetInnerHTML={{
                            __html: productdata.other_introduction,
                          }}
                        ></div>
                      </ShowMoreText>
                    </div>
                  </div>
                </div>
                {/* category */}
                <div className="col-6">
                  <div className="product_lower_section product_upper_section">
                    <div className="productquantity productstatus">
                      <h5 className="mb-0">
                        Product type: <b>{productdata.product_type}</b>{" "}
                      </h5>
                    </div>
                    <div className="productquantity productstatus">
                      <h5 className="mb-0">
                        Category: <b>{categoryName}</b>{" "}
                      </h5>
                    </div>
                  </div>
                  {/* tax */}
                  <div className="product_mid_section product_variety_section">
                    <h5 className="mb-0">Tax:</h5>
                    <div className="productstatus">
                      <div className="d-flex align-items-center">
                        <h5 className="statuslabeltext">
                          Gst:{" "}
                          <b>
                            {productdata.gst == "undefined"
                              ? 0
                              : productdata.gst}{" "}
                          </b>{" "}
                        </h5>
                        <b></b>
                      </div>
                      <div className="d-flex align-items-center">
                        <h5 className="statuslabeltext">
                          Cgst:{" "}
                          <b>
                            {productdata.cgst == "undefined"
                              ? 0
                              : productdata.cgst}{" "}
                          </b>{" "}
                        </h5>
                      </div>
                      <div className="d-flex align-items-center">
                        <h5 className="statuslabeltext">
                          Sgst:{" "}
                          <b>
                            {productdata.sgst == "undefined"
                              ? 0
                              : productdata.sgst}{" "}
                          </b>
                        </h5>
                      </div>
                      <div className="d-flex">
                        <h5 className="statuslabeltext">
                          Wholesale sales tax:{" "}
                          <b>
                            {productdata.wholesale_sales_tax == "" ||
                            productdata.wholesale_sales_tax == "undefined"
                              ? 0
                              : productdata.wholesale_sales_tax}
                          </b>
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <h5 className="statuslabeltext">
                        Manufacturers sales tax:{" "}
                        <b>
                          {productdata.manufacturers_sales_tax == "" ||
                          productdata.manufacturers_sales_tax == "undefined"
                            ? 0
                            : productdata.manufacturers_sales_tax}
                        </b>
                      </h5>
                    </div>
                    <div className="d-flex align-items-center">
                      <h5 className="statuslabeltext">
                        Retails sales tax:{" "}
                        <b>
                          {productdata.retails_sales_tax == "" ||
                          productdata.retails_sales_tax == "undefined"
                            ? 0
                            : productdata.retails_sales_tax}
                        </b>
                      </h5>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
            </div>

            <div className="variety_section_box col-12">
              <Form ref={formRef} validated={validated}>
                <Form.Group className="">
                  <div className="variation_box my-2">
                    <div className="row">
                      <div className="col-auto">
                        <div className="col-12">
                          <Table bordered className="align-middle my-2">
                            <thead className="align-middle">
                              <tr>
                                <th>
                                  Variety <span className="text-danger">*</span>
                                </th>
                                <th>Color</th>
                                <th>Weight/piece/Volume </th>
                                <th>Size</th>
                                <th>
                                  Mrp <span className="text-danger">*</span>
                                </th>
                                <th>Discount</th>
                                <th>
                                  Price <span className="text-danger">*</span>
                                </th>
                                <th>
                                  Sale Price{" "}
                                  <span className="text-danger">*</span>
                                </th>
                                {/* <th>Special Offer</th>
                                <th>Featured Product</th> */}
                                <th className="manufacture_date">
                                  Mdate <span className="text-danger">*</span>
                                </th>
                                <th className="manufacture_date">
                                  Edate <span className="text-danger">*</span>
                                </th>
                                <th className="manufacture_date">Image</th>
                                <th className="manufacture_date">
                                  Quantity{" "}
                                  <span className="text-danger">*</span>
                                </th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Select
                                        aria-label="Default select example"
                                        name="unit"
                                        onChange={(e) => onVariantChange(e)}
                                        disabled={
                                          variantarray.unit &&
                                          changeUnitproperty == false
                                            ? true
                                            : variantarray.unit ||
                                              changeUnitproperty == true
                                            ? false
                                            : true
                                        }
                                        value={variantarray.unit}
                                        // className={
                                        //   customvalidated === true
                                        //     ? "border-danger"
                                        //     : null
                                        // }
                                      >
                                        {" "}
                                        <option value={""}>{"Select"}</option>
                                        {(varietyy.variety || []).map(
                                          (vari, i) => {
                                            return changeUnitproperty ==
                                              true ? (
                                              <option
                                                value={
                                                  vari === "color"
                                                    ? "pcs"
                                                    : vari === "weight"
                                                    ? "gms"
                                                    : vari === "volume"
                                                    ? "ml"
                                                    : vari === "piece"
                                                    ? "piece"
                                                    : ""
                                                }
                                                key={i}
                                              >
                                                {vari}
                                              </option>
                                            ) : productdata.product_type ===
                                                "Cloths" ||
                                              productdata.product_type ===
                                                "Fashion" ? (
                                              vari === "weight" ||
                                              vari === "volume" ? null : (
                                                <option
                                                  value={
                                                    vari === "piece"
                                                      ? "piece"
                                                      : vari === "color"
                                                      ? "pcs"
                                                      : ""
                                                  }
                                                  key={i}
                                                >
                                                  {vari}
                                                </option>
                                              )
                                            ) : vari === "color" ? null : (
                                              <option
                                                value={
                                                  vari === "weight"
                                                    ? "gms"
                                                    : vari === "volume"
                                                    ? "ml"
                                                    : vari === "piece"
                                                    ? "piece"
                                                    : ""
                                                }
                                                key={i}
                                              >
                                                {vari}
                                              </option>
                                            );
                                          }
                                        )}
                                        {/* {(varietyy.variety || []).map(
                                          (vari, i) => {
                                            return (
                                              <option
                                                value={
                                                  vari === "color"
                                                    ? "pcs"
                                                    : vari === "weight"
                                                    ? "gms"
                                                    : vari === "volume"
                                                    ? "ml"
                                                    : vari === "piece"
                                                    ? "piece"
                                                    : ""
                                                }
                                                key={i}
                                              >
                                                {vari}
                                              </option>
                                            );
                                          }
                                        )} */}
                                      </Form.Select>
                                    </InputGroup>
                                  </div>
                                </td>

                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Select
                                        aria-label="Default select example"
                                        required
                                        sm="9"
                                        name="colors"
                                        value={variantarray.colors}
                                        onChange={(e) => onVariantChange(e)}
                                      >
                                        <option
                                          value={variantarray.colors == ""}
                                        >
                                          Select
                                        </option>
                                        {(varietyy.color || []).map(
                                          (vari, i) => {
                                            return (
                                              <option value={vari} key={i}>
                                                {vari}
                                              </option>
                                            );
                                          }
                                        )}
                                      </Form.Select>
                                    </InputGroup>
                                  </div>
                                </td>

                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        value={
                                          // variantarray.unit === "gms"
                                          //   ? variantarray.unit_quantity
                                          //   : variantarray.unit === "ml"
                                          //   ? variantarray.unit_quantity
                                          //   : variantarray.unit === "piece"
                                          //   ? variantarray.unit_quantity
                                          //   : variantarray.unit === ""
                                          //   ?
                                          variantarray.unit_quantity
                                          // : null
                                        }
                                        required={
                                          variantarray.unit !== "pcs" &&
                                          variantarray.unit_quantity === ""
                                            ? true
                                            : false
                                        }
                                        disabled={
                                          // productVeriantUnit == "pcs" ||
                                          variantarray.unit == "pcs"
                                            ? true
                                            : false
                                        }
                                        type="text"
                                        sm="9"
                                        className={
                                          unitValidated === true
                                            ? "border-danger"
                                            : null
                                        }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"unit_quantity"}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>

                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Select
                                        aria-label="Default select example"
                                        required
                                        sm="9"
                                        name="size"
                                        value={variantarray.size}
                                        onChange={(e) => onVariantChange(e)}
                                        disabled={
                                          // productVeriantUnit !== "pcs" ||
                                          variantarray.unit !== "pcs" &&
                                          variantarray.unit !== ""
                                            ? true
                                            : variantarray.unit == ""
                                            ? false
                                            : false
                                        }
                                      >
                                        <option value={variantarray.size == ""}>
                                          Select
                                        </option>
                                        {(varietyy.size || []).map(
                                          (vari, i) => {
                                            return (
                                              <option value={vari} key={i}>
                                                {vari}
                                              </option>
                                            );
                                          }
                                        )}
                                      </Form.Select>
                                    </InputGroup>
                                  </div>
                                </td>

                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        type="number"
                                        step={"0.01"}
                                        min={1}
                                        sm="9"
                                        // className={
                                        //   customvalidated === true
                                        //     ? "border-danger"
                                        //     : null
                                        // }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"mrp"}
                                        value={variantarray.mrp}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>
                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        type="number"
                                        sm="9"
                                        min={1}
                                        max={"100"}
                                        onChange={(e) => onVariantChange(e)}
                                        name={"discount"}
                                        value={variantarray.discount}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>
                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        min={1}
                                        step={0.01}
                                        type="number"
                                        sm="9"
                                        // className={
                                        //   customvalidated === true
                                        //     ? "border-danger"
                                        //     : null
                                        // }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"product_price"}
                                        value={Number(
                                          variantarray.product_price
                                        )}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>
                                <td className="p-0 text-center">
                                  <div className=" d-flex align-items-center">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        step={0.01}
                                        type="number"
                                        sm="9"
                                        min={1}
                                        // className={
                                        //   customvalidated === true
                                        //     ? "border-danger"
                                        //     : null
                                        // }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"sale_price"}
                                        value={saleprice.toFixed(2)}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>

                                {/* <td className="p-0 text-center">
                                  <div className="">
                                    <Form.Check
                                      onChange={(e) =>
                                        handleInputcheckboxChange(e)
                                      }
                                      name={"special_offer"}
                                      checked={
                                        variantarray.special_offer === 1 ||
                                        variantarray.special_offer === true
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                </td> */}
                                {/* <td className="p-0 text-center">
                                  <div className="">
                                    <Form.Check
                                      onChange={(e) =>
                                        handleInputcheckboxChange(e)
                                      }
                                      name={"featured_product"}
                                      checked={
                                        variantarray.featured_product === 1 ||
                                        variantarray.featured_product === true
                                          ? true
                                          : false
                                      }
                                    />
                                  </div>
                                </td> */}
                                <td className="p-0 text-center">
                                  <div className="manufacture_date">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        type="date"
                                        sm="9"
                                        // className={
                                        //   customvalidated === true
                                        //     ? "border-danger"
                                        //     : null
                                        // }
                                        min={moment().format("YYYY-MM-DD")}
                                        onChange={(e) => onVariantChange(e)}
                                        name={"manufacturing_date"}
                                        value={moment(
                                          variantarray.manufacturing_date
                                        ).format("YYYY-MM-DD")}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>
                                <td className="p-0 text-center">
                                  <div className="manufacture_date">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        type="date"
                                        sm="9"
                                        // className={
                                        //   customvalidated === true
                                        //     ? "border-danger"
                                        //     : null
                                        // }
                                        min={moment(
                                          variantarray.manufacturing_date
                                        )
                                          .add(1, "day")
                                          .format("YYYY-MM-DD")}
                                        disabled={
                                          variantarray.manufacturing_date
                                            ? false
                                            : true
                                        }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"expire_date"}
                                        value={moment(
                                          variantarray.expire_date
                                        ).format("YYYY-MM-DD")}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>
                                <td className="p-0 text-center"></td>
                                <td className="p-0">
                                  <div className="manufacture_date">
                                    <InputGroup className="" size="sm">
                                      <Form.Control
                                        name={"quantity"}
                                        type="number"
                                        value={variantarray.quantity}
                                        sm="9"
                                        min={"1"}
                                        // className={
                                        //   customvalidated === true
                                        //     ? "border-danger"
                                        //     : null
                                        // }
                                        onChange={(e) => onVariantChange(e)}
                                        onKeyPress={(event) => {
                                          if (event.key === "Enter") {
                                            onVariantaddclick();
                                          }
                                        }}
                                      />
                                    </InputGroup>
                                  </div>
                                </td>
                                <td className="p-0">
                                  <div className=" d-flex align-items-center">
                                    <Button
                                      variant="outline-success"
                                      className="addcategoryicon"
                                      // type="submit"
                                      onClick={() =>
                                        onVariantaddclick(
                                          variantarray.id,
                                          variantarray.product_id
                                        )
                                      }
                                      size="sm"
                                    >
                                      +
                                    </Button>
                                  </div>
                                </td>
                              </tr>

                              {customvalidated === true ? (
                                <tr>
                                  <p
                                    className="mt-1 ms-2 text-danger"
                                    type="invalid"
                                  >
                                    Please fill Required fields
                                  </p>
                                </tr>
                              ) : null}

                              {varietyUnitvalidation ===
                              "ExpireDateValidation" ? (
                                <tr>
                                  <p
                                    className="mt-1 ms-2 text-danger"
                                    type="invalid"
                                  >
                                    Please Expire date should be greater than
                                    Manufacturing date
                                  </p>
                                </tr>
                              ) : null}

                              <tr>
                                {varietyUnitvalidation ===
                                "fillUnit&size&color" ? (
                                  <p
                                    className="mt-1 ms-2 text-danger"
                                    type="invalid"
                                  >
                                    Please Fill size and colors
                                  </p>
                                ) : varietyUnitvalidation ===
                                  "fillUnit&color" ? (
                                  <p
                                    className="mt-1 ms-2 text-danger my-3"
                                    type="invalid"
                                  >
                                    Please fill color
                                  </p>
                                ) : varietyUnitvalidation ===
                                  "unitQwanity&size&color" ? (
                                  <p
                                    className="mt-1 ms-2 text-danger my-3"
                                    type="invalid"
                                  >
                                    Please fill weight/volume/piece
                                  </p>
                                ) : varietyUnitvalidation === "discountmore" ? (
                                  <p
                                    className="mt-1 ms-2 text-danger my-3"
                                    type="invalid"
                                  >
                                    Discount should be less then 100
                                  </p>
                                ) : varietyUnitvalidation ===
                                  "QwanityValidation" ? (
                                  <p
                                    className="mt-1 ms-2 text-danger my-3"
                                    type="invalid"
                                  >
                                    Quantity must be greater than 0
                                  </p>
                                ) : varietyUnitvalidation === "mrpmore" ? (
                                  <p
                                    className="mt-1 ms-2 text-danger my-3"
                                    type="invalid"
                                  >
                                    Mrp must be lesser than 50000 and greater
                                    than 0
                                  </p>
                                ) : varietyUnitvalidation === "" ? null : null}
                              </tr>

                              {productdata.product_verient === "" ||
                              productdata.product_verient === null ||
                              productdata.product_verient === undefined
                                ? null
                                : (productdata.product_verient || []).map(
                                    (variantdata, i) => {
                                      return variantdata.is_delete ===
                                        "0" ? null : (
                                        <>
                                          <tr>
                                            <td className="p-0 text-center ">
                                              {variantdata.unit === "pcs"
                                                ? "color"
                                                : variantdata.unit === "piece"
                                                ? "piece"
                                                : variantdata.unit === "gms"
                                                ? "weight"
                                                : variantdata.unit === "ml"
                                                ? "volume"
                                                : null}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.colors}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.unit === "gms"
                                                ? variantdata.unit_quantity
                                                : variantdata.unit === "ml"
                                                ? variantdata.unit_quantity
                                                : variantdata.unit === "piece"
                                                ? variantdata.unit_quantity
                                                : null}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.unit === "pcs"
                                                ? variantdata.size
                                                : null}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.mrp}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.discount}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.product_price.toFixed(
                                                2
                                              )}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.sale_price.toFixed(
                                                2
                                              )}
                                            </td>
                                            {/* <td className="p-0 text-center ">
                                              {variantdata.special_offer}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {variantdata.featured_product}
                                            </td> */}
                                            <td className="p-0 text-center ">
                                              {moment(
                                                variantdata.manufacturing_date
                                              ).format("YYYY-MM-DD")}
                                            </td>
                                            <td className="p-0 text-center ">
                                              {moment(
                                                variantdata.expire_date
                                              ).format("YYYY-MM-DD")}
                                            </td>
                                            <td className="p-0 text-center">
                                              <div className="manufacture_date">
                                                <InputGroup
                                                  className=""
                                                  size="sm"
                                                >
                                                  <Form.Control
                                                    multiple
                                                    type="file"
                                                    sm="9"
                                                    // className={
                                                    //   customvalidated === true
                                                    //     ? "border-danger"
                                                    //     : null
                                                    // }
                                                    onChange={(e) =>
                                                      imguploadchange(
                                                        e,
                                                        variantdata.product_id,
                                                        variantdata.id,
                                                        variantdata.vendor_id
                                                      )
                                                    }
                                                    name={"img_64"}
                                                  />
                                                </InputGroup>
                                                <p
                                                  onClick={(id) =>
                                                    onImgView(
                                                      variantdata.id,
                                                      variantdata.product_id
                                                    )
                                                  }
                                                  className={
                                                    "view_product_box my-2 text-primary"
                                                  }
                                                >
                                                  View Image
                                                </p>
                                              </div>
                                            </td>
                                            <td className="p-0 text-center manufacture_date">
                                              {variantdata.quantity}
                                              <p
                                                onClick={() =>
                                                  setEditButton(true)
                                                }
                                                className={
                                                  "view_product_box my-2 text-primary"
                                                }
                                              >
                                                Edit Image
                                              </p>
                                            </td>
                                            <td className="p-0 text-center">
                                              <Button
                                                variant="text-danger"
                                                className="addcategoryicon text-danger"
                                                onClick={(id) =>
                                                  VariantRemoveClick(
                                                    variantdata.id,
                                                    variantdata.product_id
                                                  )
                                                }
                                                size="sm"
                                              >
                                                &times;
                                              </Button>
                                              <Button
                                                variant="text-danger"
                                                className="addcategoryicon text-danger"
                                                onClick={(id) =>
                                                  VariantEditClick(
                                                    variantdata.id,
                                                    variantdata.product_id
                                                  )
                                                }
                                                size="sm"
                                              >
                                                <MdOutlineEdit />
                                              </Button>
                                            </td>
                                          </tr>

                                          {newImageUrls ? (
                                            <tr className="img_preview_boxx">
                                              {newImageUrls.map((imgg, i) => {
                                                return `${variantdata.id}` ===
                                                  imgg.product_verient_id ? (
                                                  <td className="">
                                                    <div className="imgprivew_box">
                                                      {imgg.image_position ===
                                                      "cover" ? (
                                                        <p className="cover_img">
                                                          Cover
                                                        </p>
                                                      ) : null}
                                                      <img
                                                        src={
                                                          imgg.product_image_path
                                                        }
                                                        key={i}
                                                        alt="apna_organic"
                                                        width={80}
                                                        height={100}
                                                      />
                                                      {editbutton === true ? (
                                                        <span
                                                          className="cross_icon"
                                                          onClick={(id) =>
                                                            onImgCoverEditClick(
                                                              imgg.product_image_id,
                                                              imgg.product_id,
                                                              imgg.product_verient_id
                                                            )
                                                          }
                                                        >
                                                          -
                                                        </span>
                                                      ) : (
                                                        <span
                                                          className="cross_icon"
                                                          onClick={() =>
                                                            onImgRemove(
                                                              imgg.product_image_id,
                                                              imgg.product_image_name,
                                                              imgg.vendor_id,
                                                              imgg.product_id,
                                                              imgg.product_verient_id
                                                            )
                                                          }
                                                        >
                                                          x
                                                        </span>
                                                      )}
                                                    </div>
                                                  </td>
                                                ) : null;
                                              })}
                                              <td className="imgprivew_div">
                                                <div className="imgprivew_box">
                                                  <img
                                                    src={
                                                      "https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png?fit=399%2C275&ssl=1"
                                                    }
                                                    key={i}
                                                    alt="apna_organic"
                                                    width={80}
                                                    height={100}
                                                  />
                                                  <Form.Control
                                                    multiple
                                                    type="file"
                                                    sm="9"
                                                    className={"img_add_button"}
                                                    onChange={(e) =>
                                                      imguploadchange(
                                                        e,
                                                        variantdata.product_id,
                                                        variantdata.id,
                                                        variantdata.vendor_id
                                                      )
                                                    }
                                                    name={"img_64"}
                                                  />
                                                  <span className="plus_icon">
                                                    +
                                                  </span>
                                                </div>
                                              </td>
                                            </tr>
                                          ) : null}
                                        </>
                                      );
                                    }
                                  )}
                              {changeUnitproperty === "editvariety" ? (
                                <tr className="text-primary text-center mx-5">
                                  Now You can edit vareity type
                                </tr>
                              ) : null}
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </div>

          <SAlert
            show={VerityAlert}
            title={"Product"}
            text="Are you Sure you want to delete"
            onConfirm={deleteProductVeriant}
            showCancelButton={true}
            onCancel={closeAlert}
          />

          <SAlert
            show={ProductAlert}
            title="Added Successfully"
            text=" Product Added"
            onConfirm={closeAlert}
          />

          <SAlert
            show={UpdatetAlert}
            title="Updated Successfully "
            text=" Product Updated"
            onConfirm={closeAlert}
          />
        </>
      ) : hideallData == true ? (
        <h1>No Record Found</h1>
      ) : null}
    </div>
    </>
  );
};

export default Productdetail;
