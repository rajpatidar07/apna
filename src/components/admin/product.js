import React, { useEffect, useState, useRef } from "react";
import Col from "react-bootstrap/Col";
import Input from "./common/input";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Badge } from "react-bootstrap";
import MainButton from "./common/button";
import Modal from "react-bootstrap/Modal";
import Iconbutton from "./common/iconbutton";
import { MdOutlineEdit } from "react-icons/md";
import InputGroup from "react-bootstrap/InputGroup";
import VariationJson from "./json/variation";
import CategoryJson from "./json/categorytype";
import Table from "react-bootstrap/Table";
import { AiOutlinePlus, AiOutlineCloudUpload } from "react-icons/ai";
import { FaEllipsisV } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import SAlert from "./common/salert";
import axios from "axios";
import { Button } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import moment from "moment/moment";
import BrandJson from "./json/BrandJson";
import { downloadExcel } from "react-export-table-to-excel";
import { Pointer } from "highcharts";

let categoryArray = [];
let encoded;
let ImgObj = [];

function Product() {
  const [error, setError] = useState(true);
  const [vendorid, setVendorId] = useState([]);
  const [category, setCategory] = useState([]);
  const [indVal, setIndVal] = useState(0);
  const [subCategory, setSubCategory] = useState([]);
  const [childCategory, setchildCategory] = useState([]);
  const [grandcCategory, setgrandcCategory] = useState([]);
  const [scategory, setScategory] = useState({
    parent_category: "",
    sub_category: "",
    childcategory: "",
    gcategory: "",
  });
  const [categoryeditparent, setCategoryEditparent] = useState("");
  const [categoryeditsubparent, setCategoryEditSubparent] = useState("");
  const [categoryeditchildparent, setCategoryEditChildparent] = useState("");
  const [level, setlevel] = useState("");
  const [pdata, setpdata] = useState([]);
  const [variantid, setvariantid] = useState("");
  const [productid, setproductid] = useState("");
  const [Alert, setAlert] = useState(false);
  const [VerityAlert, setVerityAlert] = useState(false);
  const [varietyValidation, setvarietyValidated] = useState(false);
  const [ProductDraftAlert, setProductDraftAlert] = useState(false);
  const [UpdatetAlert, setUpdatetAlert] = useState(false);
  const [ProductAlert, setProductAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [variantapicall, setvariantapicall] = useState(false);
  const [varietyshow, setvarietyShow] = useState(false);
  const [addtag, setaddtag] = useState();
  const [validated, setValidated] = useState(false);
  const [customvalidated, setcustomValidated] = useState(false);
  const [modalshow, setmodalshow] = useState(false);
  const [seoarray, setseoArray] = useState([]);
  const [unitValidated, setunitValidated] = useState(false);
  const [varietyUnitvalidation, setVarietyUnitvalidation] = useState("");
  var veriantData = {
    product_status: "",
    product_id: "",
    unit: "",
    colors: "",
    unit_quantity: null,
    size: null,
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
  const [variantmainarray, setvariantmainarray] = useState([]);
  const [data1, setdata1] = useState("");
  const [otherintro, setotherintro] = useState("");
  const [headerval, setheaderval] = useState("");
  const [descval, setdescval] = useState("");
  const [customarray, setcustomarray] = useState([]);
  const [AddCustom, setAddCustom] = useState({
    header: [],
    description: [],
  });
  const [vdata, setvdata] = useState([]);
  let [condition, setCondition] = useState(false);

  var data = {
    add_custom_input: [],
    product_title_name: "",
    product_slug: "",
    store_name: "",
    product_type: "",
    category: "",
    parent_category: "",
    wholesale_sales_tax: "0",
    gst: "0",
    cgst: "0",
    sgst: "0",
    retails_sales_tax: "0",
    value_added_tax: "0",
    manufacturers_sales_tax: "0",
    manufacturing_date: "",
    expire_date: "",
    seo_tag: "",
    variety: "",
    product_description: "",
    other_introduction: "",
    vendor_id: "",
    shop: "",
    show_product_rating: "0",
  };
  const [RestoreAlert, setRestoreAlert] = useState(false);
  const [productdata, setproductdata] = useState(data);
  const mainformRef = useRef();
  const formRef = useRef();
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    category: "",
    product_status: "",
  });

  const [newImageUrls, setnewImageUrls] = useState([]);
  const [variantremove, setVariantRemove] = useState([]);
  const [editbutton, setEditButton] = useState(false);
  const [taxdata, settaxdata] = useState({
    wholesale_sales_tax: "0",
    gst: "0",
    cgst: "0",
    sgst: "0",
    retails_sales_tax: "0",
    value_added_tax: "0",
    manufacturers_sales_tax: "0",
  });
  const [productID, setproductID] = useState("");
 const[bulkProductError,setBulkProductError]=useState("")


  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };
  const OnSaveProduct = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BASEURL}/add_fetured_product`, featuredata)
      .then((response) => {
        if (response.data.message === "Already_Exist") {
          setError(false);
        } else {
          setRestoreAlert(true);
          setapicall(true);
          setfeatureShow(false);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onProductStatusChange = (e, id, productid) => {
    setCondition(true);
    axios
      .put(`${process.env.REACT_APP_BASEURL}/product_status_update`, {
        id: `${id}`,
        product_id: `${productid}`,
        product_status: e.target.value,
      })
      .then((response) => {
        setCondition(false);
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
        setCondition(false);
      });
  };

  const fetchdata = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=500`,
        {
          product_search: {
            search: `${searchdata.product_title_name}`,
            price_from: "",
            price_to: "",
            latest_first: "",
            product_title_name: "",
            sale_price: "",
            short_by_updated_on: "",
            category: categoryArray,
            product_status: [`${searchdata.product_status}`],
            is_delete: ["1"],
            colors: [],
            size: [],
            parent_category: [],
            product_type: [],
          },
        }
      )
      .then((response) => {
        setpdata(response.data);
        setCondition(false);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const first = "";
    fetchdata();
  }, [apicall, Alert]);
  //
  let filtered;
  const handleAlert = (id) => {
    setAlert(true);
    setVariantRemove({ ...variantremove, id: id[0], productid: id[1] });
    setvariantid(id[0]);
    setproductid(id[1]);
  };
  const [featureshow, setfeatureShow] = useState(false);
  const [featuredata, setfeaturedata] = useState({
    start_date: "",
    end_date: "",
    product_id: "",
    fetured_type: "",
  });
  const [productname, setproductname] = useState("");

  const featureModalClose = (e) => {
    setfeatureShow(false);
    setfeaturedata({ start_date: "", end_date: "" });
  };
  const featureModalShow = () => setfeatureShow(true);
  const OnProductOfferClick = (e, productid, productname) => {
    setfeaturedata({
      ...featuredata,
      product_id: `${productid}`,
      fetured_type: e.target.value,
    });
    console.log("******__________========"+JSON.stringify(featuredata))
    setproductname(productname);
    setfeatureShow(true);
  };
  const OnFeatureDateChaneg = (e) => {
    setfeaturedata({ ...featuredata, [e.target.name]: e.target.value });
  };

  // end feature product
  //  json
  var varietyy = VariationJson;
  var categorytype = CategoryJson;
  const OnProductNameClick = (id) => {
    localStorage.setItem("variantid", id[0]);
    localStorage.setItem("productid", id[1]);
    navigate("/productdetail");
  };
  const columns = [
    {
      name: "#",
      width: "100px",
      center: true,
      cell: (row) => (
        <img
          alt={"apna_organic"}
          src={
            row.all_images
              ? row.all_images
              : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
          }
          style={{
            padding: 10,
            textAlign: "right",
            maxHeight: "100px",
            maxWidth: "100px",
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => (
        <div>
          <p
            className="mb-1"
            onClick={OnProductNameClick.bind(this, [row.id, row.product_id])}
          >
            <b>
              {row.product_title_name}
              <br />
              Product ID: {row.product_id} <br />
              <div
                dangerouslySetInnerHTML={{ __html: pdata.product_description }}
                className="editor"
              ></div>
            </b>
          </p>
        </div>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "90px",
    },
    {
      name: "Product Type",
      selector: (row) => row.product_type,
      sortable: true,
      width: "90px",
    },
    {
      name: "Mrp",
      selector: (row) => row.mrp.toFixed(2),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Dis(%)",
      selector: (row) => row.discount + "%",
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Price",
      selector: (row) => row.product_price.toFixed(2),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Tax",
      selector: (row) =>
        Number(row.gst) +
        Number(row.cgst) +
        Number(row.sgst) +
        Number(row.wholesale_sales_tax) +
        Number(row.retails_sales_tax) +
        Number(row.manufacturers_sales_tax) +
        Number(row.value_added_tax) +
        "%",
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },
    {
      name: "SP",
      selector: (row) => row.sale_price.toFixed(2),
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Qty",
      selector: (row) => row.quantity,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={
            row.product_status === "pending"
              ? "badge bg-success"
              : row.product_status === "approved"
              ? "badge bg-danger"
              : row.product_status === "special_offer"
              ? "badge bg-info"
              : row.product_status === "featured_offer"
              ? "badge bg-warning"
              : row.product_status === "promotional"
              ? "badge bg-primary"
              : row.product_status === "draft"
              ? "badge bg-secondary"
              : null
          }
        >
          {row.product_status === "pending"
            ? "Pending"
            : row.product_status === "approved"
            ? "Approved"
            : row.product_status === ""
            ? "Select"
            : row.product_status === "featured_offer"
            ? "Featured Offer"
            : row.product_status === "draft"
            ? "Draft"
            : "Select"}
        </span>
      ),
      sortable: true,
      width: "115px",
      // center: true,
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onProductStatusChange(e, row.id, row.product_id)}
        >
          <option
            disabled={true}
            selected={row.product_status === "" ? true : false}
            value=""
          >
            Select
          </option>
          <option
            disabled={condition ? true : false}
            selected={row.product_status === "pending" ? true : false}
            value="pending"
          >
            Pending
          </option>
          <option
            disabled={condition ? true : false}
            selected={row.product_status === "draft" ? true : false}
            value="draft"
          >
            Draft
          </option>
          <option
            disabled={condition ? true : false}
            selected={row.product_status === "approved" ? true : false}
            value="approved"
          >
            Approved
          </option>
        </Form.Select>
      ),
      sortable: true,
    },
    {
      name: "Variety",
      selector: (row) => (
        <Button
          size="sm"
          onClick={handlevarietyShow.bind(this, row.product_id, row.id)}
        >
          Add Variety
        </Button>
      ),
      sortable: true,
    },
    {
      name: "Action",
      width: "110px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <div className="feature_product_dropdown_box">
            <Form.Select
              aria-label="Search by delivery"
              size="sm"
              className="w-100 feature_product_select"
              onChange={(e) =>
                OnProductOfferClick(e, row.product_id, row.product_title_name)
              }
            >
              <option value="">Select</option>
              <option value="special_offer">Special Offer</option>
              <option value="featured_offer">Featured Offer </option>
              <option value="promotional">Promotional </option>
            </Form.Select>
            <IoFilter  className="feature_product_ellipsis"/>
            {/* <FaEllipsisV className="feature_product_ellipsis"/> */}
          </div>

          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this, row.product_id)}
          />
          <BsTrash
            className=" p-0 m-0 editiconn text-danger"
            onClick={handleAlert.bind(this, [
              row.id,
              row.product_id,
              row.is_delete,
            ])}
          />
        </div>
      ),
    },
  ];
  const categoryFormChange = (e, id) => {
    setIndVal(e.target.value);
    setScategory({ ...scategory, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/category?category=${indVal}`)
        .then((response) => {
          if (response.data !== []) {
            let cgory = response.data;
            if (indVal === scategory.parent_category) {
              setSubCategory(cgory);
              setproductdata({
                ...productdata,
                parent_category: "0",
                category: indVal,
              });
            } else if (indVal === scategory.sub_category) {
              setchildCategory(cgory);
              setproductdata({
                ...productdata,
                parent_category: cgory[0].all_parent_id,
                category: indVal,
              });
              setlevel(2);
            } else if (indVal === scategory.childcategory) {
              setgrandcCategory(cgory);
              setproductdata({
                ...productdata,
                parent_category: cgory[0].all_parent_id,
                category: indVal,
              });
              setlevel(3);
            } else if (indVal === scategory.gcategory) {
              setgrandcCategory(cgory);
              setproductdata({
                ...productdata,
                parent_category: cgory[0].all_parent_id,
                category: indVal,
              });
              setlevel(4);
            }
          }
        });
    } catch (err) {}
  }, [scategory, indVal]);
  // modal
  const [editparentCategory, seteditparentCategory] = useState("");

  let token = localStorage.getItem("token");

  const handleShow = (e) => {
    setproductdata(data);
    // vendor
    const getVendorData = () => {
      try {
        axios
          .post(
            `${process.env.REACT_APP_BASEURL}/vendors`,
            { vendor_id: "all" },
            {
              headers: { admin_token: `${token}` },
            }
          )
          .then((response) => {
            let cgory = response.data;
           
            const result = cgory.filter(
              (thing, index, self) =>
                index === self.findIndex((t) => t.shop_name == thing.shop_name)
            );
            setVendorId(result);
          });
      } catch (err) {}
    };
    getVendorData();

    // end vendor api
    // category data
    const getCategorydata = () => {
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/category?category=${indVal}`)
          .then((response) => {
            let cgory = response.data;
           
            if (indVal === 0) {
              setCategory(cgory);
              // seteditparentCategory(response.data.category_name)
              setSubCategory("");
              setlevel(0);
            }
            
          });
      } catch (err) {}
    };
    getCategorydata();
    // end category data
    if (e === "add") {
      setmodalshow(e);
    } else {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/product_details?id=${e}`)
        .then((response) => {
          let data = response.data;
           console.log("data-----"+JSON.stringify(data))
          if (data != undefined || data != "" || data != null) {
            setproductdata(data);
              
            // categoryedit

            const arr = data.parent_category.split(",");
            for (let i = 0; i < arr.length; i++) {
              axios
                .get(
                  `${process.env.REACT_APP_BASEURL}/category_details?id=${arr[i]}`
                )
                .then((response) => {
                  let data = response.data[0];
                  if (i === 0) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`
                      )
                      .then((response) => {
                        console.log("subcetgorydata---"+JSON.stringify(response.data))
                        setSubCategory(response.data);
                          
                      });
                      seteditparentCategory(data.category_name)
                    setCategoryEditparent(data.category_name);
                  } else if (i === 1) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`
                      )
                      .then((response) => {
                        setchildCategory(response.data);
                      });
                    // setCategoryEditparent(data.category_name);
                    setCategoryEditSubparent(data.category_name);
                  } else if (i === 2) {
                    axios
                      .get(
                        `${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`
                      )
                      .then((response) => {
                        setgrandcCategory(response.data);
                      });
                    // setCategoryEditSubparent(data.category_name);
                    setCategoryEditChildparent(data.category_name);
                  } else if (i === 3) {
                    setCategoryEditChildparent(data.category_name);
                  }
                });
            }
            // end category edit api
          }
           
          let customdatra = JSON.parse(response.data.add_custom_input);
          // console.log("customdata---"+customdatra)
          setcustomarray(customdatra);
    
        })
        .catch(function (error) {
          console.log(error);
        });
      setmodalshow(e);
    }
  };
  useEffect(() => {
    handleShow();
  }, []);

  const getProductVariant = (id) => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=500`,
        {
          product_search: {
            search: "",
            category: "",
            price_from: "",
            price_to: "",
            latest_first: "",
            product_title_name: "",
            sale_price: "",
            short_by_updated_on: "",
            is_delete: ["1"],
            product_id: [`${id}`],
          },
        }
      )
      .then((response) => {
        setvdata(response.data.results);
        settaxdata(response.data.results[0]);
        setvariantapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handlevarietyShow = (id, variantid) => {
    getProductVariant(id);
    onImgView(variantid, id);
    setvariantarray({
      ...variantarray,
      product_id: id,
    });
    setproductID(id);
    setvarietyShow(true);
  };
  const AddMoreVariety = (e) => {
    handleAddProduct(e);
    // handlevarietyShow(id, variantid);
  };
  const handlevarietyClose = (e) => {
    setvariantarray(veriantData);
    setVarietyUnitvalidation("");
    setcustomValidated(false);
    // e.preventDefault();
    // setValidated(false);
    setvarietyShow(false);
  };

  const handleClose = () => {
    setproductdata(data);
    setcustomarray([]);
    setvariantarray(veriantData);
    setvariantmainarray([]);
    setcustomValidated(false);
    setValidated(false);
    setmodalshow(false);
    setVarietyUnitvalidation("");
    setvarietyValidated(false);
  };

  // seotag
  let tagname;
  const ontagchange = (e) => {
    tagname = e.target.value;
    setaddtag(tagname);
  };

  const tagRemoveClick = (e) => {
    setproductdata({ ...productdata, seo_tag: "" });
    // setseoArray(seoarray.filter((item) => item !== e));
  };
  const ontagaddclick = (e) => {
    if (addtag === "") {
      setunitValidated("seotagclick");
    } else {
      setunitValidated("");
      setproductdata({
        ...productdata,
        seo_tag: addtag,
      });
    }
    setaddtag("");
  };
  // variant
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
    onImgView(product_id, id);
    console.log("imge newImageUrlse" + newImageUrls.length);
    console.log("imge lenth--" + e.target.files.length);
    for (let i = 0; i < e.target.files.length; i++) {
      let coverimg;

      if ((newImageUrls.length === 0 || newImageUrls.length === 1) && i === 0) {
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

    axios
      .post(`${process.env.REACT_APP_BASEURL}/product_images`, ImgObj)
      .then((response) => {
        ImgObj = [];
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
    setEditButton(false);
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`
      )
      .then((response) => {
        setnewImageUrls(response.data);
        setapicall(true);
        setmodalshow(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onCoverImgButtonCLick = (id, product_id) => {
    setEditButton(true);
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
    setValidated(false);
    setcustomValidated(false);
    setVarietyUnitvalidation("");
    setvarietyValidated(false);
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value,
    });
  };

  let discountt = (variantarray.mrp * variantarray.discount) / 100;
  let product_price = variantarray.mrp - discountt;
  let saleprice;
  if (taxdata) {
    saleprice =
      product_price +
      (product_price * (taxdata.gst / 100) +
        product_price * (taxdata.wholesale_sales_tax / 100) +
        product_price * (taxdata.retails_sales_tax / 100) +
        product_price * (taxdata.value_added_tax / 100) +
        product_price * (taxdata.manufacturers_sales_tax / 100));
  }

  useEffect(() => {
    setvariantarray({
      ...variantarray,
      product_status: "pending",
      product_price: `${product_price}`,
      sale_price: `${saleprice}`,
    });
  }, [variantarray.mrp, variantarray.discount, taxdata]);
  const handleInputcheckboxChange = (e) => {
    setcustomValidated(false);
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setvariantarray({
      ...variantarray,
      [e.target.name]: value,
    });
  };
  const handleVarietyChange = (e) => {
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(
  //   "product--" + JSON.stringify(variantarray) + productdata.product_type
  // );
  const onVariantaddclick = (e, id) => {
    setunitValidated(false);
    // id.preventDefault();
    if (id == undefined || id == null || unitValidated == "false") {
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
      } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
        setVarietyUnitvalidation("QwanityValidation");
      } else if (
        vdata[0].product_type === "Cloths" &&
        variantarray.unit === "pcs" &&
        (variantarray.colors === "" ||
          variantarray.size === null ||
          variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&size&color");
      } else if (
        vdata[0].product_type !== "Cloths" &&
        variantarray.unit === "pcs" &&
        variantarray.colors === "" &&
        (variantarray.size === null || variantarray.size === "")
      ) {
     
        setVarietyUnitvalidation("fillUnit&color");
      } else if (
        variantarray.unit !== "pcs" &&
        (variantarray.unit_quantity === "" ||
          variantarray.unit_quantity === "null" ||
          variantarray.unit_quantity === null)
      ) {
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
                unit: "",
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
                product_id: productID,
              });
            } else if (response.errno == 1064) {
              alert("Error in add product");
              setProductAlert(false);
            } else {
              setProductAlert(false);
            }

            // formRef.reset();
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
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
      } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
        setVarietyUnitvalidation("QwanityValidation");
      } else if (
        vdata[0].product_type === "Cloths" &&
        variantarray.unit === "pcs" &&
        (variantarray.colors === "" ||
          variantarray.size === null ||
          variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&size&color");
      } else if (
        vdata[0].product_type !== "Cloths" &&
        variantarray.unit === "pcs" &&
        variantarray.colors === "" &&
        (variantarray.size === null || variantarray.size === "")
      ) {
        setVarietyUnitvalidation("fillUnit&color");
      } else if (
        variantarray.unit !== "pcs" &&
        (variantarray.unit_quantity === "" ||
          variantarray.unit_quantity === "null" ||
          variantarray.unit_quantity === null)
      ) {
        setVarietyUnitvalidation("unitQwanity&size&color");
      } else if (
        Number(variantarray.discount) > 100 ||
        Number(variantarray.discount) < 0
      ) {
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
            setvariantarray({
              product_status: "",
              unit: "",
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
              product_id: productID,
            });

            if ((response.affectedRows = "1")) {
              setUpdatetAlert(true);
            } else if (response.error) {
              alert("Error in add product");
              setUpdatetAlert(false);
            } else {
              setUpdatetAlert(false);
            }

            getProductVariant(productID);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
    // e.preventDefault()
  };

  const VariantAddProduct = (e) => {
    setproductdata({
      ...productdata,
      variety: true,
    });
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
    } else if (variantarray.quantity === 0 || variantarray.quantity < 1) {
      setVarietyUnitvalidation("QwanityValidation");
    } else if (
      productdata.product_type === "Cloths" &&
      variantarray.unit === "pcs" &&
      (variantarray.colors === "" || variantarray.size === "")
    ) {
      setVarietyUnitvalidation("fillUnit&size&color");
    } else if (
      productdata.product_type !== "Cloths" &&
      variantarray.unit === "pcs" &&
      variantarray.colors === "" &&
      variantarray.size === ""
    ) {
      setVarietyUnitvalidation("fillUnit&color");
    } else if (
      variantarray.unit !== "pcs" &&
      (variantarray.unit_quantity === "" ||
        variantarray.unit_quantity === "null" ||
        variantarray.unit_quantity === null)
    ) {
      setunitValidated(true);
      setVarietyUnitvalidation("unitQwanity&size&color");
    } else if (Number(variantarray.discount) > 100) {
      setunitValidated(true);
      setVarietyUnitvalidation("discountmore");
    } else if (
      Number(variantarray.mrp) > 50000 ||
      Number(variantarray.mrp) <= 0
    ) {
      setunitValidated(true);
      setVarietyUnitvalidation("mrpmore");
    } else {
      setvariantmainarray((variantmainarray) => [
        ...variantmainarray,
        variantarray,
      ]);
      setVarietyUnitvalidation("");
      setvarietyValidated(false);
      setcustomValidated(false);

      setvariantarray({
        product_status: "",
        unit: "",
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
        product_id: productID,
      });
      // setcustomValidated(false);
    }
  };

  const VariantRemoveClick = (id, productid) => {
    setVerityAlert(true);
    setVariantRemove((variantremove) => {
      return { ...variantremove, id: id, productid: productid };
    });
  };

  const MainVariantRemoveClick = (e) => {
    setvariantmainarray(variantmainarray.filter((item) => item !== e));
  };

  const hideAlert = () => {
    // product delete
    if (vdata.length === 1) {
      setVerityAlert(false);
      setRestoreAlert(false);
      setvarietyShow(false);
      setapicall(true);
    }
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete_remove`, {
        varient_id: variantremove.id,
        product_id: variantremove.productid,
        is_delete: "0",
      })
      .then((response) => {
        getProductVariant(variantremove.productid);
      })
      .catch(function (error) {
        console.log(error);
      });

    // variety delete
    setVerityAlert(false);
    setRestoreAlert(false);
  };

  const deleteProductAlert = () => {
    // product delete
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete_remove`, {
        varient_id: variantremove.id,
        product_id: variantremove.productid,
        is_delete: "0",
      })
      .then((response) => {
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });

    // variety delete
    setAlert(false);
  };

  const closeAlert = () => {
    setAlert(false);
    setVerityAlert(false);
  };

  const closeProductAlert = () => {
    setProductAlert(false);
    setProductDraftAlert(false);
    setunitValidated(false);
    setcustomValidated(false);
    getProductVariant(productID);
    setUpdatetAlert(false);
  };

  const VariantEditClick = (id, productid) => {
    setVarietyUnitvalidation("");
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/products_pricing?id=${id}&product_id=${productid}`
      )
      .then((response) => {
        setvariantarray(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setproductdata({
      ...productdata,
      product_slug: productdata.product_title_name + "_123",
      price: variantmainarray,
    });
  }, [variantmainarray]);

  const oncustomheadChange = (e) => {
    setheaderval(e.target.value);
    setAddCustom((AddCustom) => {
      return { ...AddCustom, header: e.target.value };
    });
  };
  const oncustomdescChange = (e) => {
    setdescval(e.target.value);
    setAddCustom((AddCustom) => {
      return { ...AddCustom, description: e.target.value };
    });
  };
  const handleAddClick = (e) => {
    if (headerval !== "" && descval !== "") {
      setcustomarray((customarray) => [...customarray, AddCustom]);
      setheaderval("");
      setdescval("");
      setAddCustom("");
      setcustomValidated(false);
    } else {
      setcustomValidated(true);
    }
  };

  const handleRemoveClick = (e) => {
    setcustomarray(customarray.filter((item) => item !== e));
  };
  useEffect(() => {
    setproductdata({
      ...productdata,
      add_custom_input: customarray,
    });
  }, [customarray]);
  // end

  const handleInputFieldChange = (e) => {
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
    settaxdata({
      ...taxdata,
      [e.target.name]: e.target.value,
    });
  };
  const handleVendorNameChange = (e) => {
    let arr = e.target.value.split(",");
    setproductdata({
      ...productdata,
      store_name: arr[1],
      vendor_id: arr[0],
      shop: arr[1],
    });
  };

  const handledescription = (event, editor) => {
    setdata1(editor.getData());
    // console.log({ event, editor, data1 });

    let productdesc;
    if (editor.getData() != undefined) {
      productdesc = editor.getData().replaceAll(/"/g, "'");
    }
    setproductdata({
      ...productdata,
      product_description: productdesc,
    });
  };

  const OtherDescription = (event, editor) => {
    setotherintro(editor.getData());
    // console.log({ event, editor, otherintro });
    let otherinstrction;
    if (editor.getData() != undefined) {
      otherinstrction = editor.getData().replaceAll(/"/g, "'");
    }
    setproductdata({
      ...productdata,
      other_introduction: otherinstrction,
    });
  };
  let productdataa = [];

  const handleSaveDraft = (e) => {
    setvariantarray({
      ...variantarray,
      product_status: "draft",
    });
    productdataa.push(productdata);
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      productdata.variety === "" ||
      variantmainarray.length === 0
    ) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
      setcustomValidated(false);
      setvarietyValidated("varietyadd");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/products`, productdataa)
        .then((response) => {
          setProductDraftAlert(true);
          setapicall(true);
        });
    }
  };

  const handleAddProduct = (e) => {
    productdataa.push(productdata);
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      productdata.variety === "" ||
      variantmainarray.length === 0
    ) {
      e.stopPropagation();
      e.preventDefault();
      setValidated(true);
      setcustomValidated(false);
      setvarietyValidated("varietyadd");
    } else {
      axios
        .post(`${process.env.REACT_APP_BASEURL}/products`, productdataa)
        .then((response) => {
          setapicall(true);
        });
      e.preventDefault();
      setValidated(false);
      setcustomValidated(true);
      setProductAlert(true);
      handleClose();
    }
  };
  const handleUpdateProduct = (e) => {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_update`, productdata)
      .then((response) => {
        setapicall(true);
        setmodalshow(false);
        setUpdatetAlert(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClick = () => {};
  const navigate = useNavigate();

  const submitHandler = () => {
    setapicall(true);
  };

  const OnReset = () => {
    setsearchData({ product_title_name: "", product_status: "" });
    setapicall(true);
  };

  //-----------------------Download excel sheet code start here---------------------------------------------------

  const header = [
    "product_code",
    "product_title_name",
    "product_slug",
    "store_name",
    "product_description",
    "product_type",
    "brand",
    "category",
    "parent_category",
    "seo_tag",
    "other_introduction",
    "add_custom_input",
    "wholesale_sales_tax",
    "manufacturers_sales_tax",
    "retails_sales_tax",
    "gst",
    "cgst",
    "sgst",
    "value_added_tax",
    "variety",
    "vendor_id",
    "shop",
    "colors",
    "size",
    "mrp",
    "product_price",
    "sale_price",
    "discount",
    "manufacturing_date",
    "expire_date",
    "special_offer",
    "featured_product",
    "unit",
    "unit_quantity",
    "quantity",
    "product_status",
  ];

  function handleDownloadExcel() {
    downloadExcel({
      fileName: "Product Excel Report -> downloadExcel method",
      sheet: "Product Excel Report",
      tablePayload: {
        header,
        body: [""],
        blankrows: "No record",
      },
    });
  }

  // const saveFile = (e) => {
    
  //   console.log(" lenght----"+JSON.stringify(e.target.files))
  //     setExcelFile(e.target.files[0]);
  //     // setExcelFilename(e.target.files[0]);
  //     FileUploadAPI()
  // };


  const FileUploadAPI = (e) => {
    const formData = new FormData();
    
    formData.append("bulk_xls",e.target.files[0]);
   

    axios
      .post(`${process.env.REACT_APP_BASEURL}/product_bulk_uploads`, formData)
      .then((response) => {
        console.log("uploaddd---"+JSON.stringify(response))
        if(response.status==200){
          setProductAlert(true)
          setapicall(true)
        
        }
        else{
          setBulkProductError("Error  in adding BulkProducts")
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
   };

  //-----------------------Download excel sheet code End  here---------------------------------------------------
  return (
    <div className="App productlist_maindiv">
      <h2>Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              placeholder={"Search by product name"}
              onChange={OnSearchChange}
              name="product_title_name"
              value={searchdata.product_title_name}
              className={"adminsideinput"}
            />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              placeholder="Search by status"
              onChange={OnSearchChange}
              name="product_status"
              value={searchdata.product_status}
            >
              <option value="">Search by status</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
              <option value="approved ">Approved </option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              onClick={submitHandler}
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button w-100"}
              type="reset"
              onClick={OnReset}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <div className="product_page_uploadbox_one">
            <input type="file" className="product_page_uploadbox_button"   onChange={(e)=>{FileUploadAPI(e)}}/>
            <Iconbutton
              btntext={"Upload"}
              btnclass={"button main_outline_button"}
              Iconname={<AiOutlineCloudUpload />}
            
            />
          </div>
          {bulkProductError==""?"":<p className="mt-1 ms-2 text-danger" type="invalid">
                            {bulkProductError}
                            </p>}
          <MainButton btntext={"Download"} onClick={handleDownloadExcel} />

          <Iconbutton
            btntext={"Add Product"}
            onClick={() => {
              handleShow("add");
            }}
            Iconname={<AiOutlinePlus />}
            btnclass={"button main_button "}
          />
        </div>

        {/* datatable */}
        <Modal
          show={modalshow}
          onHide={() => handleClose()}
          dialogClassName="addproductmainmodal"
          aria-labelledby="example-custom-modal-styling-title"
          centered
        >
          <Form
            className="p-2 addproduct_form"
            validated={validated}
            ref={mainformRef}
            onSubmit={
              modalshow === "add"
                ? (e) => handleAddProduct(e)
                : (modalshow) => handleUpdateProduct(modalshow)
            }
          >
            <Modal.Header closeButton className="addproductheader">
              <Modal.Title id="example-custom-modal-styling-title">
                {modalshow === "add" ? "Add Product" : "Update Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="addproductbody p-2">
              <div className=" addproduct_form_boxx p-0 m-0">
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Basic Info</h5>
                  <div className="d-flex product_basixinfo">
                    <div className="product_detail-box col-md-4">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom01"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Title/Name
                          <span className="text-danger">
                            *
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill productname
                            </Form.Control.Feedback>
                          </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="text"
                            placeholder="Product Title/Name"
                            required
                            onChange={(e) => handleInputFieldChange(e)}
                            name={"product_title_name"}
                            value={productdata.product_title_name}
                          />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill productname
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationProductName"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Slug<span className="text-danger">* </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="text"
                            placeholder="Product Slug"
                            // onChange={(e) => handleInputFieldChange(e)}
                            name={"product_slug"}
                            value={
                              productdata.product_title_name === "" ||
                              productdata.product_title_name === "null" ||
                              productdata.product_title_name === null
                                ? null
                                : productdata.product_title_name + "_123"
                            }
                            required
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationProductslug"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Brand <span className="text-danger">* </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Select
                            aria-label="Product Type"
                            className="adminselectbox"
                            name="brand"
                            required
                            onChange={(e) => handleInputFieldChange(e)}
                            value={
                              productdata.brand === null ||
                              productdata.brand === undefined
                                ? ""
                                : productdata.brand
                            }
                          >
                            <option value={""}>Select Brand</option>
                            {BrandJson.BrandJson.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                          </Form.Select>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom03"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Store Name
                          <span className="text-danger">
                            *
                            <Form.Control.Feedback
                              type="invalid"
                              className="h6"
                            >
                              Please fill storename
                            </Form.Control.Feedback>
                          </span>
                        </Form.Label>
                        <Form.Select
                          onChange={handleVendorNameChange}
                          aria-label="store_name"
                          className="adminselectbox"
                          required
                        >
                          {" "}
                          <option value={""}> Select Store Name</option>
                          {vendorid.map((cdata, i) => {
                            return (
                              <option
                                value={[cdata.id, cdata.shop_name]}
                                key={i}
                                selected={
                                  (productdata.vendor_id,
                                  productdata.store_name) ===
                                  (cdata.id, cdata.shop_name)
                                }
                              >
                                {cdata.shop_name}
                                {""}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <Col sm="12">
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill storename
                          </Form.Control.Feedback>
                        </Col>
                      </Form.Group>
                    </div>
                    <div className="col-md-8">
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustom04"
                      >
                        {/* {console.log(
                          "product description-------" +
                            productdata.product_description
                        )} */}
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Description
                        </Form.Label>
                        <Col sm="12">
                          <CKEditor
                            editor={ClassicEditor}
                            data={productdata.product_description}
                            onChange={handledescription}
                            name={"product_description"}
                          />
                        </Col>
                      </Form.Group>
                    </div>
                  </div>
                </div>
                {/* category */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Category Info</h5>
                  <div className="productvariety">
                    <Form.Group className="mx-3" controlId="validationCustom05">
                      <Form.Label className="inputlabelheading" sm="12">
                        Product Type<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Select
                          aria-label="Product Type"
                          className="adminselectbox"
                          required
                          name="product_type"
                          onChange={(e) => handleInputFieldChange(e)}
                          value={
                            productdata.product_type === null ||
                            productdata.product_type === undefined
                              ? ""
                              : productdata.product_type
                          }
                        >
                          <option value={""}>Select Product Type</option>

                          {categorytype.categorytype.map((data) => {
                            return <option value={data}>{data}</option>;
                          })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select producttype
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    {/* category select */}
                    <Form.Group
                      className=" aos_input"
                      controlId="validationCustom06"
                    >
                      <Form.Label className="inputlabelheading" sm="12">
                        Parent Category <span className="text-danger">* </span>
                      </Form.Label>
                      <Form.Select
                        onChange={(e, id) => categoryFormChange(e, id)}
                        name={"parent_category"}
                        aria-label="Parent Category"
                        className="adminselectbox"
                        required
                      >
                        <option value={""}>Select Parent Category </option>
                        {category.map((cdata, i) => {
                          return (
                            <option
                              value={cdata.id}
                              name="parent_category"
                              key={i}
                              selected={
                                editparentCategory == cdata.category_name
                                  ? true
                                  : false
                              }
                            >
                              {cdata.category_name} {""}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please select Category
                      </Form.Control.Feedback>
                    </Form.Group>

                    {subCategory === "" ||
                    subCategory === null ||
                    subCategory === undefined ? null : (
                      <Form.Group
                        className=" aos_input"
                        controlId="formBasicParentCategory"
                      >
                        <Form.Label>
                          Sub Category <span className="text-danger">* </span>
                        </Form.Label>
                        <Form.Select
                          aria-label="Search by status"
                          className="adminselectbox"
                          onChange={(e, id) => categoryFormChange(e, id)}
                          name={"sub_category"}
                          required
                        >
                          <option value={""}>Select Category </option>
                          {subCategory.map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                key={i}
                                selected={
                                  categoryeditparent === cdata.category_name
                                    ? true
                                    : false
                                }
                              >
                                {cdata.category_name}{" "}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill category
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}

                    {childCategory[0] === "" ||
                    childCategory[0] === null ||
                    childCategory[0] === undefined ? null : (
                      <Form.Group
                        className="mb-3 aos_input"
                        controlId="formBasicParentCategory"
                      >
                        <Form.Label> Child Category</Form.Label>
                        <Form.Select
                          aria-label="Search by status"
                          className="adminselectbox"
                          onChange={(e, id) => categoryFormChange(e, id)}
                          name={"childcategory"}
                        >
                          <option value={""}>Select Category </option>
                          {childCategory.map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                key={i}
                                selected={
                                  categoryeditsubparent === cdata.category_name
                                    ? true
                                    : false
                                }
                              >
                                {cdata.category_name}{" "}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill category
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}

                    {grandcCategory[0] === "" ||
                    grandcCategory[0] === null ||
                    grandcCategory[0] === undefined ? null : (
                      <Form.Group
                        className="mb-3 aos_input"
                        controlId="formBasicParentCategory"
                      >
                        <Form.Label> Inner Category</Form.Label>
                        <Form.Select
                          aria-label="Search by status"
                          className="adminselectbox"
                          onChange={(e, id) => categoryFormChange(e, id)}
                          name={"gcategory"}
                        >
                          <option value={""}>Select Category </option>
                          {grandcCategory.map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                key={i}
                                selected={
                                  categoryeditchildparent ===
                                  cdata.category_name
                                    ? true
                                    : false
                                }
                              >
                                {cdata.category_name}{" "}
                              </option>
                            );
                          })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please fill category
                        </Form.Control.Feedback>
                      </Form.Group>
                    )}

                    {/* end category select */}
                  </div>
                </div>
                {/* Taxes */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Taxes</h5>
                  <div className="productvariety mt-0">
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Wholesale Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          min={0}
                          type="number"
                          placeholder="Wholesale Sales Tax"
                          name="wholesale_sales_tax"
                          value={
                            productdata.wholesale_sales_tax === null ||
                            productdata.wholesale_sales_tax === undefined
                              ? ""
                              : productdata.wholesale_sales_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Manufacturers’ Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Manufacturers’ Sales Tax "
                          name="manufacturers_sales_tax"
                          value={
                            productdata.manufacturers_sales_tax === null ||
                            productdata.manufacturers_sales_tax === undefined
                              ? ""
                              : productdata.manufacturers_sales_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="m-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Retail Sales Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Retail Sales Tax"
                          name="retails_sales_tax"
                          value={
                            productdata.retails_sales_tax === null ||
                            productdata.retails_sales_tax === undefined
                              ? ""
                              : productdata.retails_sales_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Gst<span className="text-danger">* </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          min={1}
                          placeholder="Gst"
                          name="gst"
                          value={productdata.gst}
                          onChange={(e) => handleInputFieldChange(e)}
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Sgst<span className="text-danger"> </span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Sgst"
                          // className={
                          //   customvalidated === true ? "border-danger" : null
                          // }
                          name="sgst"
                          value={productdata.sgst}
                          onChange={(e) => handleInputFieldChange(e)}
                          required
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Cgst<span className="text-danger"></span>
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Cgst"
                          // className={
                          //   customvalidated === true ? "border-danger" : null
                          // }
                          name="cgst"
                          value={productdata.cgst}
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                    <Form.Group className="mx-3" controlId="validationCustom11">
                      <Form.Label className="inputlabelheading" sm="12">
                        Value Added Tax
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Value Added Tax"
                          name="value_added_tax"
                          value={
                            productdata.value_added_tax === null ||
                            productdata.value_added_tax === undefined
                              ? ""
                              : productdata.value_added_tax
                          }
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                      </Col>
                    </Form.Group>
                  </div>
                </div>
                {/*single variety  */}
                <Form
                  className="p-2 addproduct_form"
                  validated={validated}
                  ref={mainformRef}
                >
                  {modalshow === "add" ? (
                    <div className="my-3 inputsection_box">
                      <div className="productvariety_box">
                        {/* <div className="productvariety">
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom11"
                          >
                            <Form.Label
                              className="inputlabelheading"
                              sm="12 d-flex align-itmes-center"
                            >
                              {productdata.variety === false ? (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 1"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={false}
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 1"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={false}
                                />
                              )}
                              Single Product
                            </Form.Label>
                          </Form.Group>
                          <Form.Group
                            className="mx-3"
                            controlId="validationCustom11"
                          >
                            <Form.Label
                              className="inputlabelheading"
                              sm="12 d-flex align-itmes-center"
                            >
                              {productdata.variety === true ? (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 2"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={true}
                                />
                              ) : (
                                <Form.Check
                                  type="radio"
                                  aria-label="radio 2"
                                  className="mx-2"
                                  onChange={handleVarietyChange}
                                  name="variety"
                                  value={true}
                                />
                              )}
                              Multiple Variety
                            </Form.Label>
                          </Form.Group>
                        </div> */}
                        <div className="row">
                          <Form.Group className="mx-3">
                            <div className="variation_box my-2">
                              <div className="row">
                                <div className="col-auto">
                                  <Table
                                    bordered
                                    className="align-middle my-2 aadvariety_table_"
                                  >
                                    <thead className="align-middle">
                                      <tr>
                                        <th>
                                          Variety
                                          <span className="text-danger">
                                            *{" "}
                                          </span>
                                        </th>
                                        <th>Color</th>
                                        <th>Weight/piece/Volume</th>
                                        <th>Size</th>
                                        <th>
                                          Mrp{" "}
                                          <span className="text-danger">
                                            *{" "}
                                          </span>
                                        </th>
                                        <th>Discount</th>
                                        <th>Price</th>
                                        <th>
                                          Sale Price{" "}
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th>Special Offer</th>
                                        <th>Featured Product</th>
                                        <th className="manufacture_date">
                                          Mdate
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th className="manufacture_date">
                                          Edate{" "}
                                          <span className="text-danger">*</span>
                                        </th>
                                        <th className="">
                                          Qty{" "}
                                          <span className="text-danger">
                                            *{" "}
                                          </span>
                                        </th>
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
                                                required
                                                value={variantarray.unit}
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                              >
                                                <option value={""}>
                                                  Select
                                                </option>
                                                {(varietyy.variety || []).map(
                                                  (vari, i) => {
                                                    return (
                                                      <option
                                                        value={
                                                          vari === "weight"
                                                            ? "gms"
                                                            : vari === "volume"
                                                            ? "ml"
                                                            : vari === "piece"
                                                            ? "piece"
                                                            : vari === "color"
                                                            ? "pcs"
                                                            : ""
                                                        }
                                                        key={i}
                                                      >
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
                                                type="text"
                                                sm="9"
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                name={"colors"}
                                                value={variantarray.colors}
                                              />
                                            </InputGroup>
                                          </div>
                                        </td>

                                        <td className="p-0 text-center">
                                          <div className=" d-flex align-items-center">
                                            <InputGroup className="" size="sm">
                                              <Form.Control
                                                value={
                                                  variantarray.unit === "weight"
                                                    ? variantarray.unit_quantity
                                                    : variantarray.unit ===
                                                      "volume"
                                                    ? variantarray.unit_quantity
                                                    : variantarray.unit ===
                                                      "piece"
                                                    ? variantarray.unit_quantity
                                                    : variantarray.unit === ""
                                                    ? variantarray.unit_quantity
                                                    : null
                                                }
                                                type="number"
                                                sm="9"
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                name={"unit_quantity"}
                                              />
                                            </InputGroup>
                                          </div>
                                        </td>
                                        <td className="p-0 text-center">
                                          <div className=" d-flex align-items-center">
                                            <InputGroup className="" size="sm">
                                              <Form.Control
                                                value={
                                                  variantarray.unit !== ""
                                                    ? variantarray.size
                                                    : variantarray.unit === ""
                                                    ? ""
                                                    : null
                                                }
                                                type="text"
                                                sm="9"
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                name={"size"}
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
                                                step="0.01"
                                                maxLength={"5"}
                                                minLength={"1"}
                                                min="1"
                                                max="50000"
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                name="mrp"
                                                value={variantarray.mrp}
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                required
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
                                                min={"0"}
                                                max={"100"}
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
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
                                                step={"any"}
                                                type="number"
                                                sm="9"
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                // onChange={(e) =>
                                                //   onVariantChange(e)
                                                // }
                                                name={"product_price"}
                                                value={product_price}
                                                required
                                              />
                                            </InputGroup>
                                          </div>
                                        </td>

                                        <td className="p-0 text-center">
                                          <div className=" d-flex align-items-center">
                                            <InputGroup className="" size="sm">
                                              <Form.Control
                                                type="number"
                                                step={"any"}
                                                sm="9"
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                // onChange={(e) =>
                                                //   onVariantChange(e)
                                                // }
                                                name={"sale_price"}
                                                value={(
                                                  product_price +
                                                  ((product_price *
                                                    productdata.gst) /
                                                    100 +
                                                    (product_price *
                                                      productdata.wholesale_sales_tax) /
                                                      100 +
                                                    (product_price *
                                                      productdata.retails_sales_tax) /
                                                      100 +
                                                    (product_price *
                                                      productdata.value_added_tax) /
                                                      100 +
                                                    (product_price *
                                                      productdata.manufacturers_sales_tax) /
                                                      100)
                                                ).toFixed(2)}
                                              />
                                            </InputGroup>
                                          </div>
                                        </td>

                                        <td className="p-0 text-center">
                                          <div className="">
                                            <Form.Check
                                              onChange={(e) =>
                                                handleInputcheckboxChange(e)
                                              }
                                              name={"special_offer"}
                                              checked={
                                                variantarray.special_offer ===
                                                  1 ||
                                                variantarray.special_offer ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </div>
                                        </td>
                                        <td className="p-0 text-center">
                                          <div className="">
                                            <Form.Check
                                              onChange={(e) =>
                                                handleInputcheckboxChange(e)
                                              }
                                              name={"featured_product"}
                                              checked={
                                                variantarray.featured_product ===
                                                  1 ||
                                                variantarray.featured_product ===
                                                  true
                                                  ? true
                                                  : false
                                              }
                                            />
                                          </div>
                                        </td>
                                        <td className="p-0 text-center">
                                          <div className="manufacture_date">
                                            <InputGroup className="" size="sm">
                                              <Form.Control
                                                type="date"
                                                sm="9"
                                                required
                                                min={moment().format(
                                                  "YYYY-MM-DD"
                                                )}
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                name={"manufacturing_date"}
                                                value={
                                                  variantarray.manufacturing_date
                                                }
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
                                                required
                                                disabled={
                                                  variantarray.manufacturing_date
                                                    ? false
                                                    : true
                                                }
                                                min={moment(
                                                  variantarray.manufacturing_date
                                                )
                                                  .add(1, "day")
                                                  .format("YYYY-MM-DD")}
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                name={"expire_date"}
                                                value={variantarray.expire_date}
                                              />
                                            </InputGroup>
                                          </div>
                                        </td>
                                        <td className="p-0">
                                          <div className="">
                                            <InputGroup className="" size="sm">
                                              <Form.Control
                                                name={"quantity"}
                                                type="number"
                                                value={variantarray.quantity}
                                                sm="9"
                                                min={"1"}
                                                required
                                                // className={
                                                //   customvalidated === true
                                                //     ? "border-danger"
                                                //     : null
                                                // }
                                                onChange={(e) =>
                                                  onVariantChange(e)
                                                }
                                                onKeyPress={(event) => {
                                                  if (event.key === "Enter") {
                                                    VariantAddProduct();
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
                                              onClick={() =>
                                                VariantAddProduct()
                                              }
                                              size="sm"
                                            >
                                              +
                                            </Button>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        {customvalidated === true ? (
                                          <p
                                            className="mt-1 ms-2 text-danger"
                                            type="invalid"
                                          >
                                            Please fill Required fields
                                          </p>
                                        ) : varietyValidation ===
                                          "varietyadd" ? (
                                          <p
                                            className="mt-1 ms-2 text-danger"
                                            type="invalid"
                                          >
                                            Please Click On Plus Button To Add
                                            Variety
                                          </p>
                                        ) : null}

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
                                        ) : varietyUnitvalidation ===
                                          "discountmore" ? (
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
                                        ) : varietyUnitvalidation ===
                                          "mrpmore" ? (
                                          <p
                                            className="mt-1 ms-2 text-danger my-3"
                                            type="invalid"
                                          >
                                            Mrp must be lesser than 50000 and
                                            greater than 0
                                          </p>
                                        ) : varietyUnitvalidation ===
                                          "" ? null : null}
                                      </tr>

                                      {(variantmainarray || []).map(
                                        (variantdata, i) => {
                                          return (
                                            <tr>
                                              <td className="p-0 text-center ">
                                                {variantdata.unit === "pcs"
                                                  ? "color"
                                                  : variantdata.unit === "gms"
                                                  ? "weight"
                                                  : variantdata.unit === "ml"
                                                  ? "volume"
                                                  : ""}
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
                                                {variantdata.size}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {variantdata.mrp}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {variantdata.discount}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {variantdata.product_price}
                                              </td>

                                              <td className="p-0 text-center ">
                                                {saleprice}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {`${variantdata.special_offer}`}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {`${variantdata.featured_product}`}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {variantdata.manufacturing_date}
                                              </td>
                                              <td className="p-0 text-center ">
                                                {variantdata.expire_date}
                                              </td>
                                              <td className="p-0 text-center">
                                                {variantdata.quantity}
                                              </td>
                                              <td className="p-0 text-center">
                                                <Button
                                                  variant="text-danger"
                                                  className="addcategoryicon text-danger"
                                                  onClick={(id) =>
                                                    MainVariantRemoveClick(
                                                      variantdata
                                                    )
                                                  }
                                                  size="sm"
                                                >
                                                  &times;
                                                </Button>
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </Form>
                {/* </Form> */}
                {/* Offer */}

                {/* seo tag */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Seo Tag</h5>
                  <div className="productvariety">
                    <Form.Group
                      className="mx-3"
                      controlId="validationCustomSeo"
                    >
                      <div className=" d-flex align-items-center my-2">
                        <InputGroup className="" size="sm">
                          <Form.Control
                            sm="9"
                            onChange={ontagchange}
                            value={addtag}
                            // onKeyPress={(event) => {
                            //   if (event.key === "Enter") {
                            //     ontagaddclick();
                            //   }
                            // }}
                          />
                          <Button
                            variant="outline-success"
                            className="addcategoryicon"
                            onClick={() => ontagaddclick()}
                            size="sm"
                          >
                            +
                          </Button>
                        </InputGroup>
                      </div>

                      <div className="d-flex align-items-center tagselectbox mt-2">
                        {productdata.seo_tag == "" && addtag === "" ? (
                          ""
                        ) :productdata.seo_tag? (
                          <Badge className="tagselecttitle mb-0" bg="success">
                            {productdata.seo_tag === null ||
                            productdata.seo_tag === undefined
                              ? ""
                              : productdata.seo_tag}
                            <span
                              onClick={() => tagRemoveClick()}
                              className={
                                "addcategoryicon mx-2 text-light spanCurser "
                              }
                            >
                              {"x"}
                            </span>
                          </Badge>
                        ):null}

                        {/* )

                        })} */}
                      </div>
                    </Form.Group>
                  </div>
                </div>

                {/* other info */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Other Instruction</h5>
                  <Col sm="12" className="mt-3">
                    <CKEditor
                      editor={ClassicEditor}
                      data={productdata.other_introduction}
                      onChange={OtherDescription}
                      name={"other_introduction"}
                    />
                  </Col>
                </div>
                {/* input */}
                <div className="my-3 inputsection_box">
                  <h5 className="m-0">Add Custom Input</h5>
                  <div className=" mt-0 mb-3">
                    <Table className="align-middle">
                      <thead>
                        <tr>
                          <th>Heading</th>
                          <th>Description</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center col-4">
                            <InputGroup className="">
                              <Form.Control
                                value={headerval}
                                type="text"
                                sm="9"
                                min={"1"}
                                onChange={oncustomheadChange}
                                name={"header"}
                              />
                            </InputGroup>
                          </td>
                          <td className="col-4">
                            <InputGroup className="">
                              <Form.Control
                                value={descval}
                                name={"description"}
                                type="text"
                                sm="9"
                                min={"1"}
                                onChange={oncustomdescChange}
                                onKeyPress={(event) => {
                                  if (event.key === "Enter") {
                                    handleAddClick();
                                  }
                                }}
                              />
                            </InputGroup>
                          </td>
                          <td className="">
                            <Button
                              variant="outline-success"
                              className="addcategoryicon"
                              onClick={() => handleAddClick()}
                              size="sm"
                            >
                              +
                            </Button>
                          </td>
                        </tr>
                        {
                         
                          (customarray || []).map((variantdata, i) => {
                            // const arr = variantdata.split(',')
                            return (
                              <tr className="">
                                <td className=" text-center">
                                  <InputGroup className="">
                                    <Form.Control
                                      value={variantdata.header}
                                      type="text"
                                      sm="9"
                                      min={"1"}
                                      onChange={oncustomheadChange}
                                      name={"custom_input_header"}
                                      required
                                    />
                                  </InputGroup>
                                </td>
                                <td className="text-center">
                                  <InputGroup className="">
                                    <Form.Control
                                      required
                                      value={variantdata.description}
                                      name={"custom_input_desc"}
                                      type="text"
                                      sm="9"
                                      min={"1"}
                                      onChange={oncustomdescChange}
                                      onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                          handleAddClick();
                                        }
                                      }}
                                    />
                                  </InputGroup>
                                </td>
                                <td className="">
                                  <Button
                                    variant="text-danger"
                                    className="addcategoryicon text-danger"
                                    onClick={() =>
                                      handleRemoveClick(variantdata)
                                    }
                                    size="sm"
                                  >
                                    &times;
                                  </Button>
                                </td>
                              </tr>
                            );
                          })
                   
                        }
                      </tbody>
                    </Table>
                  </div>
                  {/* );
                })} */}
                  {/* --------------------------------------------- */}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="addproductfooter">
              <Iconbutton
                btntext={" Cancel"}
                onClick={() => handleClose()}
                btnclass={"button main_outline_button px-2"}
                // Iconname={<GiCancel /> }
              />
              <MainButton
                btntext={"Save as Draft"}
                onClick={() => handleSaveDraft()}
              />
              <Iconbutton
                type={"submit"}
                btntext={modalshow === "add" ? "Add Product" : "Update Product"}
                btnclass={"button main_button "}
              />
              {/* {modalshow === "add" ? (
                <Iconbutton
                  // type={"submit"}
                  onClick={() => AddMoreVariety()}
                  btntext={"Add and Add More Variety"}
                  btnclass={"button main_button "}
                />
              ) : null} */}
            </Modal.Footer>
          </Form>
        </Modal>

        {/* variety */}
        <Modal
          size="lg"
          show={varietyshow}
          onHide={handlevarietyClose}
          dialogClassName="addproductmainmodal"
        >
          <Form ref={formRef}>
            <Modal.Header>
              <Modal.Title>Add Variety</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {/* <Form.Group
                  className=""
                > */}
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
                              <th>Size </th>
                              <th>
                                Mrp <span className="text-danger">*</span>
                              </th>
                              <th>Discount</th>
                              <th>
                                Price<span className="text-danger">*</span>
                              </th>
                              <th>
                                Sale Price<span className="text-danger">*</span>
                              </th>
                              <th>Special Offer</th>
                              <th>Featured Product</th>
                              <th className="manufacture_date">
                                Mdate <span className="text-danger">*</span>
                              </th>
                              <th className="manufacture_date">
                                Edate <span className="text-danger">*</span>
                              </th>
                              <th className="manufacture_date">Image</th>
                              <th className="manufacture_date">
                                Quantity<span className="text-danger">*</span>
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
                                      required
                                      aria-label="Default select example"
                                      name="unit"
                                      onChange={(e) => onVariantChange(e)}
                                      value={variantarray.unit}
                              
                                    >
                                      <option value={""}>{"Select"}</option>
                                      {/* <option
                                        value={
                                          variantarray.unit === "pcs"
                                            ? "color"
                                            : variantarray.unit === "gms"
                                            ? "weight"
                                            : variantarray.unit === "ml"
                                            ? "volume"
                                            : variantarray.unit === "piece"
                                            ? "piece"
                                            : variantarray.unit === "" ||
                                              variantarray.unit === null
                                            ? "Select"
                                            : null
                                        }
                                      >
                                        {variantarray.unit === "pcs"
                                          ? "color"
                                          : variantarray.unit === "gms"
                                          ? "weight"
                                          : variantarray.unit === "ml"
                                          ? "volume"
                                          : variantarray.unit === "piece"
                                          ? "piece"
                                          : variantarray.unit === "" ||
                                            variantarray.unit === null
                                          ? "Select"
                                          : null}
                                      </option> */}

                                      {(varietyy.variety || []).map(
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
                                      )}
                                    </Form.Select>
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      type="text"
                                      sm="9"
                                      // className={
                                      //   customvalidated === true
                                      //     ? "border-danger"
                                      //     : null
                                      // }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"colors"}
                                      value={variantarray.colors}
                                    />
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={
                                        variantarray.unit === "gms"
                                          ? variantarray.unit_quantity
                                          : variantarray.unit === "ml"
                                          ? variantarray.unit_quantity
                                          : variantarray.unit === "piece"
                                          ? variantarray.unit_quantity
                                          : variantarray.unit === ""
                                          ? variantarray.unit_quantity
                                          : null
                                      }
                                      required={
                                        variantarray.unit !== "pcs" &&
                                        variantarray.unit_quantity === ""
                                          ? true
                                          : false
                                      }
                                      type="text"
                                      sm="9"
                                      // className={
                                      //   unitValidated === true
                                      //     ? "border-danger"
                                      //     : null
                                      // }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"unit_quantity"}
                                    />
                                  </InputGroup>
                                </div>
                              </td>
                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      value={
                                        variantarray.unit !== ""
                                          ? variantarray.size
                                          : variantarray.unit === ""
                                          ? variantarray.size
                                          : null
                                      }
                                      type="text"
                                      sm="9"
                                      // className={
                                      //   customvalidated === true
                                      //     ? "border-danger"
                                      //     : null
                                      // }
                                      onChange={(e) => onVariantChange(e)}
                                      name={"size"}
                                    />
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
                                <div className=" d-flex align-items-center">
                                  <InputGroup className="" size="sm">
                                    <Form.Control
                                      step="0.01"
                                      type="number"
                                      // step={"any"}
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
                                      min={"1"}
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
                                      // onChange={(e) => onVariantChange(e)}
                                      name={"product_price"}
                                      value={Number(variantarray.product_price)}
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
                                      // onChange={(e) => onVariantChange(e)}
                                      name={"sale_price"}
                                      value={Number(
                                        variantarray.sale_price
                                      ).toFixed(2)}
                                    />
                                  </InputGroup>
                                </div>
                              </td>

                              <td className="p-0 text-center">
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
                              </td>
                              <td className="p-0 text-center">
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
                              <td className="p-0 text-center">
                                <p
                                  className="mt-2   text-center fs-6"
                                  type="invalid"
                                >
                                  Select Image This (height-156px * width-136px)
                                </p>
                              </td>
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
                                    onClick={(e) =>
                                      onVariantaddclick(
                                        e,
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

                            <tr>
                              {customvalidated === true ? (
                                <p
                                  className="mt-1 ms-2 text-danger"
                                  type="invalid"
                                >
                                  Please fill Required fields
                                </p>
                              ) : null}

                              {varietyUnitvalidation ===
                              "fillUnit&size&color" ? (
                                <p
                                  className="mt-1 ms-2 text-danger"
                                  type="invalid"
                                >
                                  Please Fill size and colors
                                </p>
                              ) : varietyUnitvalidation === "fillUnit&color" ? (
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
                                  Mrp must be lesser than 50000 and greater than
                                  0
                                </p>
                              ) : varietyUnitvalidation === "" ? null : null}
                            </tr>

                            {vdata === "" ||
                            vdata === null ||
                            vdata === undefined
                              ? null
                              : (vdata || []).map((variantdata, i) => {
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
                                            : ""}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {/* {console.log(
                                            "variantdata.colors------" +
                                              variantdata.colors
                                          )} */}
                                          {variantdata.colors}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {variantdata.unit === "gms"
                                            ? variantdata.unit_quantity
                                            : variantdata.unit === "ml"
                                            ? variantdata.unit_quantity
                                            : variantdata.unit === "piece"
                                            ? variantdata.unit_quantity
                                            : ""}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {variantdata.size}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {Number(variantdata.mrp).toFixed(2)}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {Number(variantdata.discount).toFixed(
                                            2
                                          )}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {Number(
                                            variantdata.product_price
                                          ).toFixed(2)}
                                        </td>

                                        <td className="p-0 text-center ">
                                          {variantdata.sale_price.toFixed(2)}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {variantdata.special_offer}
                                        </td>
                                        <td className="p-0 text-center ">
                                          {variantdata.featured_product}
                                        </td>
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
                                            <InputGroup className="" size="sm">
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
                                            onClick={(id) =>
                                              onCoverImgButtonCLick(
                                                variantdata.id,
                                                variantdata.product_id
                                              )
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
                                })}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </Form.Group> */}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button main_outline_button"
                onClick={handlevarietyClose}
              >
                Cancel
              </button>
            </Modal.Footer>
          </Form>
        </Modal>

        <DataTable
          columns={columns}
          data={pdata.results}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body product_table"}
        />

        <SAlert
          show={VerityAlert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={closeAlert}
        />

        <SAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={deleteProductAlert}
          showCancelButton={true}
          onCancel={closeAlert}
        />

        <SAlert
          show={ProductAlert}
          title="Added Successfully"
          text=" Product Added"
          onConfirm={closeProductAlert}
        />

        <SAlert
          show={ProductDraftAlert}
          title="Added Successfully "
          text=" Product Added To Draft"
          onConfirm={closeProductAlert}
        />

        <SAlert
          show={UpdatetAlert}
          title="Updated Successfully "
          text=" Product Updated"
          onConfirm={closeProductAlert}
        />

        {/* feature product modal */}

        <Modal show={featureshow} onHide={featureModalClose}>
          <Form className="" novalidate validated={validated} ref={formRef}>
            <Modal.Header closeButton>
              <Modal.Title>Add Offer Product</Modal.Title>
            </Modal.Header>
            {error === false ? (
              <p
                className="mt-2 ms-2 text-danger text-center fs-6"
                type="invalid"
              >
                Already Added In Offred Product List!!!
              </p>
            ) : null}

            <Modal.Body className="p-3">
              <div className="d-flex justify-content-center align-items-center p-0 m-0">
                <div className="">
                  <div className="">
                    <div className="row px-3">
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextName"
                        >
                          <Form.Label className="" column sm="12">
                            Product Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            value={productname}
                            name={"productname"}
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextName"
                        >
                          <Form.Label className="" column sm="12">
                            Product Id
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            value={featuredata.product_id}
                            name={"product_id"}
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextName"
                        >
                          <Form.Label className="" column sm="12">
                            Offer Type
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name"
                            value={featuredata.fetured_type}
                            name={"fetured_type"}
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextName"
                        >
                          <Form.Label className="" column sm="12">
                            Start Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Name"
                            onChange={(e) => OnFeatureDateChaneg(e)}
                            value={featuredata.start_date}
                            name={"start_date"}
                            required
                            min={moment().format("YYYY-MM-DD")}
                          />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill start date
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <Form.Group
                          className="mb-3"
                          controlId="formPlaintextName"
                        >
                          <Form.Label className="" column sm="12">
                            End Date
                          </Form.Label>
                          <Form.Control
                            type="date"
                            placeholder="Name"
                            onChange={(e) => OnFeatureDateChaneg(e)}
                            value={featuredata.end_date}
                            name={"end_date"}
                            required
                            min={featuredata.start_date}
                          />
                          <Form.Control.Feedback type="invalid" className="h6">
                            Please fill end date
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="">
              <Iconbutton
                type={"button"}
                btntext={"Cancel"}
                onClick={featureModalClose}
                btnclass={"button main_outline_button "}
              />
              <Iconbutton
                onClick={OnSaveProduct}
                btntext={"Save"}
                btnclass={"button main_button "}
              />
            </Modal.Footer>
          </Form>
        </Modal>
        <SAlert
          show={RestoreAlert}
          title="Offered Product Added  Sucessfully"
          onConfirm={() => setRestoreAlert(false)}
        />
      </div>
    </div>
  );
}

export default Product;
