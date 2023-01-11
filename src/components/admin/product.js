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
import Carousel from "react-bootstrap/Carousel";
import { AiOutlinePlus, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import { GiCancel } from "react-icons/gi";
import moment from "moment/moment";
import demo from "../../images/demo.jpg";
import BrandJson from "./json/BrandJson";
let categoryArray = [];
let encoded;
// let newImageUrls = [];
let ImgObj = [];

function Product() {
  const [vendorid,setVendorId] = useState([])
  const [category, setCategory] = useState([]);
  const [indVal, setIndVal] = useState(0);
  const [subCategory, setSubCategory] = useState([]);
  const [childCategory, setchildCategory] = useState([]);
  const [grandcCategory, setgrandcCategory] = useState([]);
  const [scategory, setScategory] = useState({
    parent_category:"",
    sub_category:"",
    childcategory:"",
    gcategory:""
  });
  const [categoryeditparent,setCategoryEditparent] = useState('')
  const [categoryeditsubparent,setCategoryEditSubparent] = useState('')
  const [categoryeditchildparent,setCategoryEditChildparent] = useState('')

  const [level, setlevel] = useState("");
  const [pdata, setpdata] = useState([]);
  const [proddata, setproddata] = useState([]);
  const [variantid, setvariantid] = useState("");
  const [productid, setproductid] = useState("");
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [variantapicall, setvariantapicall] = useState(false);
  const [varietyshow, setvarietyShow] = useState(false);
  const [addtag, setaddtag] = useState();
  const [validated, setValidated] = useState(false);
  const [customvalidated, setcustomValidated] = useState(false);
  const [modalshow, setmodalshow] = useState(false);
  const [seoarray, setseoArray] = useState([]);
  const [variantarray, setvariantarray] = useState({
    product_status: "",
    product_id: "",
    unit: "",
    colors: "",
    unit_quantity: null,
    size: null,
    product_price: "",
    mrp: "",
    sale_price: "",
    discount: "",
    special_offer: false,
    featured_product: false,
    manufacturing_date: "",
    expire_date: "",
    quantity: "",
  });
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
  const [productdata, setproductdata] = useState({
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
    variety: false,
    product_description: "",
    other_introduction: "",
    // is_active: "0",
    vendor_id: "",
    shop: "",
    show_product_rating: "0",
  });
  const mainformRef = useRef();
  const formRef = useRef();
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    category: "",
    product_status: "",
  });
const [newImageUrls,setnewImageUrls] = useState([])
const [variantremove,setVariantRemove] = useState([])
const [editbutton , setEditButton]= useState(false)
const [taxdata,settaxdata] = useState({
  wholesale_sales_tax: "0",
  gst: "0",
  cgst: "0",
  sgst: "0",
  retails_sales_tax: "0",
  value_added_tax: "0",
  manufacturers_sales_tax: "0",
})
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };
  const onProductStatusChange = (e,id,productid) =>{
    axios
      .put(`${process.env.REACT_APP_BASEURL}/product_status_update`, {
          "id":`${id}`,
          "product_id":`${productid}`,
          "product_status":e.target.value
      })
      .then((response) => {
        console.log("---update" + JSON.stringify(response.data));
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const OnCategorySearchChange = (e) => {
    setsearchData({ ...searchdata, category: e.target.value });
    categoryArray.push(e.target.value);
  };
  useEffect(() => {
    const first='';
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`,
        {
          product_search: {
            search: `${searchdata.product_title_name}`,
            price_from: "",
            price_to: "",
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
        
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall, searchdata, Alert]);
  //
  let filtered;
  const handleAlert = (id) => {
    setVariantRemove({...variantremove, 
      id:id[0],
     productid:id[1]
     })


    setvariantid(id[0]);
    setproductid(id[1]);
    setAlert(true);
  };
 

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
          // height="90px"
          // width="75px"
          alt={"apna_organic"}
          src={row.all_images? row.all_images:"https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"}
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
      width: "160px",
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      width: "100px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Gst",
      selector: (row) => row.gst,
      sortable: true,
      width: "90px",
      center: true,
      style: {
        paddingLeft: "0px",
      },
    },

    {
      name: "Stock",
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
      name: "Discount",
      selector: (row) => row.discount,
      sortable: true,
      width: "130px",
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
            row.product_status === 'pending'
              ? "badge bg-success"
              : row.product_status === 'expired'
              ? "badge bg-danger" :row.product_status === 'special_offer' ?
              "badge bg-info" : row.product_status === 'featured_offer'?
               "badge bg-warning" :row.product_status === 'promotional'?
               "badge bg-primary" : row.product_status === 'draft'?
               "badge bg-secondary":null
          }
        >
          {row.product_status === 'pending'
            ? "Pending"
            : row.product_status === 'expired'
            ? "Expired":
            row.product_status === 'special_offer' ?
            "Special Offer" :
            row.product_status === 'featured_offer' ?
            "Featured Offer":
            row.product_status === 'promotional' ?
             "Promotional"
            : "Draft"}
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
          onChange={(e)=>onProductStatusChange(e,row.id,row.product_id)}
        >
          <option selected={row.product_status === "" ? true : false} value="">Select</option>
          <option selected={row.product_status === "pending" ? true : false} value="pending">Pending</option>
          <option selected={row.product_status === "draft" ? true : false} value="draft">Draft</option>
          <option selected={row.product_status === "expired" ? true : false} value="expired">Expired</option>
          <option selected={row.product_status === "special_offer" ? true : false} value="special_offer">Special Offer</option>
          <option selected={row.product_status === "featured_offer" ? true : false} value="featured_offer">Featured Offer </option>
          <option selected={row.product_status === "promotional" ? true : false} value="promotional">Promotional </option>
        </Form.Select>
      ),
      sortable: true,
    },
    {
      name: "Variety",
      selector: (row) => (
        // (row.variety) ?
        <Button
          size="sm"
          onClick={handlevarietyShow.bind(this, row.product_id)}
        >
          Add Variety
        </Button>
        // : null
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
    setScategory({ ...scategory, [e.target.name]: e.target.value});
  };
  useEffect(()=>{
    try {
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/category?category=${indVal}`
        )
        .then((response) => {
          if(response.data !== []){
            let cgory = response.data;
           if (indVal === scategory.parent_category) {
            setSubCategory(cgory);
            setproductdata({
              ...productdata,
              "parent_category": "0",
              "category":indVal
            });
          } 
          else if (indVal === scategory.sub_category) {
            setchildCategory(cgory);
            setproductdata({
              ...productdata,
              "parent_category": cgory[0].all_parent_id,
              "category":indVal
            });
            setlevel(2);
          } else if (indVal === scategory.childcategory) {
            setgrandcCategory(cgory);
            setproductdata({
              ...productdata,
              "parent_category": cgory[0].all_parent_id,
              "category":indVal
            });
            setlevel(3);
          } else if (indVal === scategory.gcategory) {
            setgrandcCategory(cgory);
            setproductdata({
              ...productdata,
              "parent_category": cgory[0].all_parent_id,
              "category":indVal
            });
            setlevel(4);
          }
        }
        });
    } catch (err) {}
  },[scategory,indVal])
  // modal
  const [editparentCategory,seteditparentCategory] = useState('');
  const handleShow = (e) => {
       // vendor
    const getVendorData =()=>{
      try {
        axios
          .get(`${process.env.REACT_APP_BASEURL}/vendors?id=all`)
          .then((response) => {
            let cgory = response.data;
            const result = cgory.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.shop_name == thing.shop_name 
        )))
            setVendorId(result)
          });
      } catch (err) {}
    }
          getVendorData();

      // end vendor api
// category data
          const getCategorydata = () =>{
            try {
              axios
                .get(`${process.env.REACT_APP_BASEURL}/category?category=${indVal}`)
                .then((response) => {
                  let cgory = response.data;
                  
                  if (indVal === 0) {
                    setCategory(cgory);
                   setSubCategory('');
                    setlevel(0);
                  }
                });
            } catch (err) {}
      
          }
          getCategorydata();
          // end category data
    if (e === "add") {
      setmodalshow(e);
    } else {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/product_details?id=${e}`)
        .then((response) => {
          let data = response.data;
          if (data != undefined || data != "" || data != null) {
            setproductdata(data);
            
// categoryedit 

const arr = data.parent_category.split(',');
for(let i=0 ; i < arr.length; i++){
axios
.get(`${process.env.REACT_APP_BASEURL}/category_details?id=${arr[i]}`)
.then((response) => {
let data = response.data[0];
if(i === 0 ){
axios
.get(`${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`)
.then((response) => {
setSubCategory(response.data)
});
seteditparentCategory(data.category_name)
// console.log("---first"+data.category_name)
}
else if(i === 1 ){
axios
.get(`${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`)
.then((response) => {
       setchildCategory(response.data)
});
setCategoryEditparent(data.category_name);
// console.log("---second"+data.category_name)
}
else if(i === 2){
  axios
.get(`${process.env.REACT_APP_BASEURL}/category?category=${arr[i]}`)
.then((response) => {
  setgrandcCategory(response.data)
});
setCategoryEditSubparent(data.category_name);
// console.log("---third"+data.category_name)
}
else if(i===3){
  setCategoryEditChildparent(data.category_name);
  // console.log("---fourth"+data.category_name) 
}
})
}
// end category edit api
          }
          let customdatra = JSON.parse(response.data.add_custom_input);
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
const  getProductVariant = (id) =>{
  axios
  .post(
    `${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`,
    {
      product_search: {
        search: "",
        category: "",
        is_delete: ["1"],
        price_from: "",
        price_to: "",
        colors: [],
        size: [],
        parent_category: [],
        product_type: [],
        product_id: [`${id}`],
      },
    }
  )
  .then((response) => {
    setvdata(response.data.results);
    settaxdata(response.data.results[0])
    setvariantarray({
      ...variantarray,
      product_id: id,
    });
    setvariantapicall(false);
  })
  .catch(function (error) {
    console.log(error);
  });
}
  const handlevarietyShow = (id) => {
    getProductVariant(id);
    // image show

    // axios
    //   .get(
    //     `${process.env.REACT_APP_BASEURL}/product_images_get?product_id=${id}&product_verient_id=11`
    //   )
    //   .then((response) => {
    //     console.log("-----response" + JSON.stringify(response.data));
    //     setvariantapicall(false);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    setvarietyShow(true);
  };

  const handlevarietyClose = () => {
    setvarietyShow(false);
  };

  const handleClose = () => {
    mainformRef.current.reset();
    // setproductdata("")
    setValidated(false);
    setmodalshow(false);
  };
            // console.log("---ppppp" + JSON.stringify(productdata));

  // seotag
  let tagname;
  const ontagchange = (e) => {
    tagname = e.target.value;
    setaddtag(tagname);
  };

  const tagRemoveClick = (e) => {
    setseoArray(seoarray.filter((item) => item !== e));
  };
  const ontagaddclick = (e) => {
    // e.preventDefault();
    setproductdata({
      ...productdata,
      seo_tag: addtag,
    });
    // setseoArray(seoarray => [...seoarray, addtag]);
    setaddtag("");
  };

  // useEffect(() => {
  //   setproductdata({
  //     ...productdata,
  //     seo_tag: addtag
  //   });
  // }, [seoarray]);
  // useEffect(() => {
  //   setvariantarray(varietyjson)
  // }, []);
  // end seotag

  // variant
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      const {  name } = file;
      fileReader.addEventListener("load", () => {
        resolve({name: name,base64:fileReader.result});
      });
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  
  const imguploadchange = async (
    e,
    product_id,
    id,
    vendor_id,
  ) => {
    for (let i = 0; i < e.target.files.length; i++) {
      let coverimg;
      
      if(newImageUrls.length === 0 && i===0){
        coverimg = 'cover'
      }
      else{
        coverimg = `cover${i}`
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
        ImgObj=[]
        onImgView(id,product_id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onImgRemove = (
    id,
    name,
    vendor_id,
    product_id,
    product_verient_id
    ) => {
       axios
    .put(`${process.env.REACT_APP_BASEURL}/product_image_delete`,{
      "product_image_id":`${id}`,
      "product_image_name": `${name}`,
      "vendor_id": `${vendor_id}`
    }
    )
    .then((response) => {
      onImgView(product_verient_id,product_id);
    })
    .catch(function (error) {
      console.log(error);
    });};
    
const onImgView = (id, productid) =>{
  setEditButton(false)
  axios
      .get(`${process.env.REACT_APP_BASEURL}/product_images_get_singal_veriant?product_id=${productid}&product_verient_id=${id}`)
      .then((response) => {
        setnewImageUrls(response.data)
        setapicall(true);
        setmodalshow(false);
      })
      .catch(function (error) {
        console.log(error);
      });
}
const onImgCoverEditClick = (imgid,productid,productvariantid)=>{
  axios
  .put(
    `${process.env.REACT_APP_BASEURL}/change_porduct_cover_image`,
    {
    "product_image_id":`${imgid}`,
    "product_id":`${productid}`,
    "product_verient_id":`${productvariantid}`
  }
  )
  .then((response) => {
    onImgView(productvariantid,productid)
  })
  .catch(function (error) {
    console.log(error);
  });
}

  const onVariantChange = (e) => {
    setvariantarray({
      ...variantarray,
      [e.target.name]: e.target.value,
    });
  };
  let discountt= variantarray.mrp * variantarray.discount/100;
  let product_price = variantarray.mrp - discountt;
  let saleprice =(product_price) 
  + 
  (
    (product_price*(taxdata.gst/100) )
  +
  (product_price*(taxdata.wholesale_sales_tax/100))
  +
  (product_price*(taxdata.retails_sales_tax/100))
  +
(product_price*(taxdata.value_added_tax/100))
+
(product_price*(taxdata.manufacturers_sales_tax/100))
)
console.log("----taxes"+JSON.stringify(variantmainarray))


  useEffect(() => {
    setvariantarray({
      ...variantarray,
      product_status:"pending",
      product_price: `${product_price}`,
      sale_price:`${saleprice}`
    });
  }, [variantarray.mrp,variantarray.discount,taxdata]);
  const handleInputcheckboxChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setvariantarray({
      ...variantarray,
      [e.target.name]: value,
    });
  };
  const handleVarietyChange = (e) => {
    // const varietyvalue = e.target.type === 'radio' ? e.target.checked : e.target.value
    setproductdata({
      ...productdata,
      [e.target.name]: e.target.value,
    });
  };

  const onVariantaddclick = (id,productid) => {
    // id.preventDefault();
    console.log("-id"+id)
    if (id == "" || id == undefined || id == null) {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL}/products_varient_add`,
          variantarray
        )
        .then((response) => {
          getProductVariant(productid)
          // formRef.reset();
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      axios
        .put(
          `${process.env.REACT_APP_BASEURL}/products_varient_update`,
          variantarray
        )
        .then((response) => {
          // setvariantarray(response.data)
          // setvariantapicall(true)
          getProductVariant(productid)
          // setvarietyShow(false);
         
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  const VariantAddProduct = () => {
    // if (variantarray !== '') {
    // e.preventDefault();
    setvariantmainarray((variantmainarray) => [
      ...variantmainarray,
      variantarray,
    ]);
    setcustomValidated(false);
    formRef.current.reset();
    // }
    // else {
    //   setcustomValidated(true);
    // }
  };
  const VariantRemoveClick = (id, productid) => {
    setAlert(true);
    setVariantRemove((variantremove) =>{  
      return{...variantremove,  id : id, productid:productid }});
      console.log("dfjghhhhhhhhhhhhhhhhhhhh"+variantremove)
  };
  const hideAlert = () => {
   
    // product delete
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete`, {
        id: variantremove.id,
        product_id: variantremove.productid,
        is_delete: ["0"],
      })
      .then((response) => {
        console.log("---delete" + JSON.stringify(response.data));
        getProductVariant(variantremove.productid);
        setapicall(true);
        // setpdata(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

    // variety delete
    setAlert(false);
  };
  const VariantEditClick = (id, productid) => {
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
      price: variantmainarray,
    });
  }, [variantmainarray]);
  // varint end
  // handle click event of the Remove button

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
    })
  };
  const handleVendorNameChange = (e) => {
    let arr = e.target.value.split(',')
    setproductdata({
      ...productdata,
      "store_name": arr[1],
      "vendor_id": arr[0],
      "shop": arr[1],

    });
  };
  const handledescription = (event, editor) => {
    setdata1(editor.getData());
    let productdesc;
    if((editor.getData()) != undefined){
      productdesc = (editor.getData()).replaceAll(/"/g, '\'');
   }
    setproductdata({
      ...productdata,
      product_description: productdesc,
    });
  };

  const OtherDescription = (event, editor) => {
    setotherintro(editor.getData());
    console.log({ event, editor, otherintro });
    let otherinstrction;
    if((editor.getData()) != undefined){
      otherinstrction = (editor.getData()).replaceAll(/"/g, '\'');
   }
    setproductdata({
      ...productdata,
      other_introduction: otherinstrction,
    });
  };
  //  const createMarkup = () => {
  //     return { __html: pdata.product_description };
  //   }
  let productdataa = [];

  const handleSaveDraft = (e) => {
    setvariantarray({
      ...variantarray,
      product_status:"draft",
    });
    productdataa.push(productdata);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
      e.preventDefault();
    }
    else{
      axios
      .post(`${process.env.REACT_APP_BASEURL}/products`, productdataa)
      .then((response) => {
        console.log("finall---" + JSON.stringify(response.data));
        setapicall(true);
      });
    }
  };

  const handleAddProduct = (e) => {
    productdataa.push(productdata);
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      e.preventDefault();
    }
    setValidated(true);
    setcustomValidated(false);
    axios
      .post(`${process.env.REACT_APP_BASEURL}/products`, productdataa)
      .then((response) => {
        console.log("finall---" + JSON.stringify(response.data));
        setapicall(true);
      });
    e.preventDefault();
     mainformRef.current.reset();
    //  setpdata('');
    setValidated(false);
     handleClose();
  };
  const handleUpdateProduct = (e) => {
    // productdataa.push(productdata)
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_update`, productdata)
      .then((response) => {
        setapicall(true);
        setmodalshow(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClick = () => {};
  const navigate = useNavigate();
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
          {/* <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by category"
              className="adminselectbox"
              placeholder="Search by category"
              onChange={OnCategorySearchChange}
              name="category"
            >
              <option>Search by category</option>
              <option value="1">Food</option>
              <option value="2">Fish & Meat</option>
              <option value="3">Baby Care</option>
            </Form.Select>
          </div> */}
          <div className="col-md-3 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              placeholder="Search by status"
              onChange={OnSearchChange}
              name="product_status"
              value={searchdata.product_status}
            >
              <option>Search by status</option>
              <option  value="">Select</option>
          <option   value="pending">Pending</option>
          <option value="draft">Draft</option>
          <option  value="expired">Expired</option>
          <option  value="special_offer">Special Offer</option>
          <option   value="featured_offer">Featured Offer </option>
          <option  value="promotional">Promotional </option>
            </Form.Select>
          </div>

          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton

              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
        </div>

        {/* upload */}

        <div className="product_page_uploadbox my-4">
          <div className="product_page_uploadbox_one">
            <Input type={"file"} inputclass={"hiddeninput"} />
            <Iconbutton
              btntext={"Upload"}
              btnclass={"button main_outline_button"}
              Iconname={<AiOutlineCloudUpload />}
            />
          </div>
          <MainButton btntext={"Download"} />
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
                        controlId="validationCustom02"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Slug<span className="text-danger">* </span>
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            type="text"
                            placeholder="Product Slug"
                            onChange={(e) => handleInputFieldChange(e)}
                            name={"product_slug"}
                            value={productdata.product_slug}
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group
                        className="mx-3"
                        controlId="validationCustomBrand"
                      >
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Brand
                        </Form.Label>
                        <Col sm="12">
                          <Form.Select
                            aria-label="Product Type"
                            className="adminselectbox"
                            name="brand"
                            onChange={(e) => handleInputFieldChange(e)}
                            value={
                              productdata.brand === null ||
                              productdata.brand === undefined
                                ? ""
                                : productdata.brand
                            }
                          >
                            <option value={""}>Select Brand</option>
                            {BrandJson.BrandJson.map((item)=>{return(
                            <>
                            <option value={item}>{item}</option>
                            </>)})}
                           
                           
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
                            *{" "}
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
                            //  value={
                            //   productdata.store_name === null ||
                            //   productdata.store_name === undefined
                            //     ? ""
                            //     : productdata.store_name
                            // }
                        aria-label="store_name"
                        className="adminselectbox"
                        required
                      >
                        {vendorid.map((cdata, i) => {
                          return (
                            <option
                              value={[cdata.id,cdata.shop_name]}
                              key={i}
                              selected={(productdata.vendor_id,productdata.store_name)===(cdata.id,cdata.shop_name)}
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
                        <Form.Label className="inputlabelheading" sm="12">
                          Product Description
                        </Form.Label>
                        <Col sm="12">
                          <CKEditor
                            editor={ClassicEditor}
                            data={productdata.product_description}
                            onChange={handledescription}
                            name={"product_description"}
                            // value={productdata.product_description}
                          />
                        </Col>
                        {/* <div dangerouslySetInnerHTML={createMarkup()} className='editor'></div> */}
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
                          {/* <option value="Foods">foods</option>
                          <option value="electronic">Electronic</option>
                          <option value="Health Care">Health Care</option>
                          <option value="Books">Books</option> */}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid" className="h6">
                          Please select producttype
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    {/* category select */}
                    <Form.Group
                      className=" aos_input"
                      controlId="formBasicParentCategory"
                    >
                      <Form.Label className="inputlabelheading" sm="12">
                        Parent Category
                      </Form.Label>
                      <Form.Select
                        onChange={(e, id) => categoryFormChange(e, id)}
                        // onChange={(e) => handleInputFieldChange(e)}
                        name={"parent_category"}
                        aria-label="Parent Category"
                        className="adminselectbox"
                        required
                        // value={
                        //   productdata.parent_category === null ||
                        //   productdata.parent_category === undefined
                        //     ? ""
                        //     : productdata.parent_category
                        // }
                      >
                        {category.map((cdata, i) => {
                          return (
                            <option
                              value={cdata.id}
                              name='parent_category'
                              key={i}
                              selected={editparentCategory == cdata.category_name ? true :false }
                            >
                              {cdata.category_name}
                              {""}
                            </option>
                          );
                        })}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" className="h6">
                        Please fill category
                      </Form.Control.Feedback>
                    </Form.Group>
                    {subCategory === "" ||
                    subCategory === null ||
                    subCategory === undefined ? null : (
                      <Form.Group
                        className=" aos_input"
                        controlId="formBasicParentCategory"
                      >
                        <Form.Label>Sub Category</Form.Label>
                        <Form.Select
                          aria-label="Search by status"
                          className="adminselectbox"
                          required
                          onChange={(e, id) => categoryFormChange(e, id)}
                          name={"sub_category"}
                          // value={CategoryEditdata.category_name}
                        >
                          {/* <option value="" selected={CategoryEditdata === '' ? true :false }>Search by category</option> */}

                          {subCategory.map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                key={i}
                                 selected={categoryeditparent === cdata.category_name ? true :false }
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
                          required
                          onChange={(e, id) => categoryFormChange(e, id)}
                          name={"childcategory"}
                        >
                          {/* <option value="">Search by category</option> */}
                          {childCategory.map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                key={i}
                                 selected={categoryeditsubparent === cdata.category_name ? true :false }
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
                          required
                          onChange={(e, id) => categoryFormChange(e, id)}
                          name={"gcategory"}
                        >
                          {/* <option value={''} >
                              Select Category
                            </option> */}
                          {grandcCategory.map((cdata, i) => {
                            return (
                              <option
                                value={cdata.id}
                                key={i}
                                 selected={categoryeditchildparent === cdata.category_name ? true :false }
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
                        Gst
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          type="number"
                          min={0}
                          placeholder="Gst"
                          required
                          name="gst"
                          value={productdata.gst}
                          onChange={(e) => handleInputFieldChange(e)}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please choose a gst
                        </Form.Control.Feedback>
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
                {/*Date  */}

                {/* Variation */}
                {modalshow === "add" ? (
                  <div className="my-3 inputsection_box">
                    <div className="productvariety_box">
                      <div className="productvariety">
                        <Form.Group
                          className="mx-3"
                          controlId="validationCustom11"
                        >
                          <Form.Label
                            className="inputlabelheading"
                            sm="12 d-flex align-itmes-center"
                          >
                            <Form.Check
                              type="radio"
                              aria-label="radio 1"
                              className="mx-2"
                              onChange={handleVarietyChange}
                              name="variety"
                              value={false}
                              checked={
                                productdata.variety === false ? true : false
                              }
                            />
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
                            <Form.Check
                              type="radio"
                              aria-label="radio 2"
                              className="mx-2"
                              onChange={handleVarietyChange}
                              name="variety"
                              checked={
                                productdata.variety === true ? true : false
                              }
                              value={true}
                            />
                            Multiple Variety
                          </Form.Label>
                        </Form.Group>
                      </div>
                      <div className="row">
                        <Form.Group
                          className="mx-3"
                          // controlId="validationCustom13"
                        >
                          <div className="variation_box my-2">
                            <div className="row">
                              <div className="col-auto">
                                <Table
                                  bordered
                                  className="align-middle my-2 aadvariety_table_"
                                >
                                  <thead className="align-middle">
                                    <tr>
                                      <th>Variety</th>
                                      <th>Color</th>
                                      <th>Weight</th>
                                      <th>Size</th>
                                      <th>Mrp</th>
                                      <th>Discount</th>
                                      <th>Price</th>
                                      <th>Sale Price</th>
                                      <th>Special Offer</th>
                                      <th>Featured Product</th>
                                      <th className="manufacture_date">
                                        Mdate
                                      </th>
                                      <th className="manufacture_date">
                                        Edate
                                      </th>
                                      <th className="">Qty</th>
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
                                              value={variantarray.unit}
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                            >
                                              <option value={""}>Select</option>
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
                                                          : null
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
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
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
                                                  : null
                                              }
                                              type="number"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
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
                                                variantarray.unit === "pcs"
                                                  ? variantarray.size
                                                  : ""
                                              }
                                              type="text"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
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
                                              step={'any'}
                                              min={1}
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
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
                                              min={1}
                                              step={'any'}
                                              type="number"
                                              sm="9"
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"product_price"}
                                              value={product_price}
                                            />
                                          </InputGroup>
                                        </div>
                                      </td>
                                      
                                      <td className="p-0 text-center">
                                        
                                        <div className=" d-flex align-items-center">
                                          <InputGroup className="" size="sm">
                                            <Form.Control
                                              type="number"
                                              step={'any'}
                                              sm="9"
                                              min={1}
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
                                              onChange={(e) =>
                                                onVariantChange(e)
                                              }
                                              name={"sale_price"}
                                              value={
                                                ((product_price) 
                                                + 
                                                (
                                                  (product_price*productdata.gst/100 )
                                                +
                                                (product_price*productdata.wholesale_sales_tax/100)
                                                +
                                                (product_price*productdata.retails_sales_tax/100)
                                                +
                                              (product_price*productdata.value_added_tax/100)
                                              +
                                              (product_price*productdata.manufacturers_sales_tax/100)
                                              )).toFixed(2)
                                            }
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
                                      // value={variantarray.special_offer}
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
                                      // value={variantarray.featured_product}
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
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
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
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
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
                                              className={
                                                customvalidated === true
                                                  ? "border-danger"
                                                  : null
                                              }
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
                                            onClick={() => VariantAddProduct()}
                                            size="sm"
                                          >
                                            +
                                          </Button>
                                         
                                        </div>
                                      </td>
                                    </tr>

                                    {(variantmainarray || []).map(
                                      (variantdata, i) => {
                                       console.log(variantdata.special_offer)
                                        return (
                                          <tr>
                                            <td className="p-0 text-center ">
                                              {variantdata.unit === "pcs"
                                                ? "color"
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
                                            {/* <Button
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
                                            </Button> */}
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
                            onKeyPress={(event) => {
                              if (event.key === "Enter") {
                                ontagaddclick();
                              }
                            }}
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
                        {/* {(seoarray || []).map((seotags, i) => {
                          return ( */}
                        <Badge className="tagselecttitle mb-0" bg="success">
                          {productdata.seo_tag === null ||
                          productdata.seo_tag === undefined
                            ? ""
                            : productdata.seo_tag}
                          <GiCancel
                            className=" mx-0 ms-1 btncancel"
                            onClick={() => tagRemoveClick(proddata.seo_tag)}
                          />
                        </Badge>

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
                                className={
                                  customvalidated === true
                                    ? "border-danger"
                                    : null
                                }
                              />
                            </InputGroup>
                          </td>
                          <td className="col-4">
                            <InputGroup className="">
                              <Form.Control
                                className={
                                  customvalidated === true
                                    ? "border-danger"
                                    : null
                                }
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
                          // paraddcustom === null || paraddcustom === undefined ? '' :
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
            </Modal.Footer>
          </Form>
        </Modal>
        {/* variety */}
        <Modal
          size="lg"
          show={varietyshow}
          onHide={() => handlevarietyClose()}
          dialogClassName="addproductmainmodal"
        >
          <Form ref={formRef} validated={validated} 
        >
            <Modal.Header closeButton>
              <Modal.Title>Add Variety</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <Form.Group
                  className=""
                  // controlId="validationCustom13"
                >
                  <div className="variation_box my-2">
                    <div className="row">
                      <div className="col-auto">
                        <div className="col-12">
                          <Table bordered className="align-middle my-2">
                            <thead className="align-middle">
                              <tr>
                                <th>Variety</th>
                                <th>Color</th>
                                <th>Weight</th>
                                <th>Size</th>
                                <th>Mrp</th>
                                <th>Discount</th>
                                <th>Price</th>
                                <th>Sale Price</th>
                                <th>Special Offer</th>
                                <th>Featured Product</th>
                                <th className="manufacture_date">Mdate</th>
                                <th className="manufacture_date">Edate</th>
                                <th className="manufacture_date">Image</th>
                                <th className="manufacture_date">Quantity</th>
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
                                        // value={variantarray.unit === 'pcs' ? 'color' : variantarray.unit === 'gms' ? 'weight' : variantarray.unit === 'ml' ? 'volume' : null}
                                        onChange={(e) => onVariantChange(e)}
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
                                      >
                                        <option
                                          value={
                                            variantarray.unit === "pcs"
                                              ? "color"
                                              : variantarray.unit === "gms"
                                              ? "weight"
                                              : variantarray.unit === "ml"
                                              ? "volume"
                                              : variantarray.unit === "piece"
                                              ? "piece"
                                              : ""
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
                                            : "Select"}
                                        </option>
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
                                                    : null
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
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
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
                                            : null
                                        }
                                        type="text"
                                        sm="9"
                                        className={
                                          customvalidated === true
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
                                      <Form.Control
                                        value={
                                          variantarray.unit === "pcs"
                                            ? variantarray.size
                                            : null
                                        }
                                        type="text"
                                        sm="9"
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
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
                                        type="number"
                                        step={"any"}
                                        min={1}
                                        sm="9"
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"mrp"}
                                        value={Number(variantarray.mrp).toFixed(2)}
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
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"product_price"}
                                        value={Number(variantarray.product_price).toFixed(2)}
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
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
                                        onChange={(e) => onVariantChange(e)}
                                        name={"sale_price"}
                                        value={Number(variantarray.sale_price).toFixed(2)}
                                      //     vdata[0] === '' ? (product_price) 
                                      //     + 
                                      //     (
                                      //       (product_price*vdata[0].gst/100 )
                                      //     +
                                      //     (product_price*vdata[0].wholesale_sales_tax/100)
                                      //     +
                                      //     (product_price*vdata[0].retails_sales_tax/100)
                                      //     +
                                      //   (product_price*vdata[0].value_added_tax/100)
                                      //   +
                                      //   (product_price*vdata[0].manufacturers_sales_tax/100)
                                      //   ) : null
                                      // }
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
                                      // value={variantarray.special_offer}
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
                                      // value={variantarray.featured_product}
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
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
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
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
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
                                        className={
                                          customvalidated === true
                                            ? "border-danger"
                                            : null
                                        }
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
                                        onVariantaddclick(variantarray.id,variantarray.product_id)
                                      }
                                      size="sm"
                                    >
                                      +
                                    </Button>
                                  </div>
                                </td>
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
                                            {Number(variantdata.mrp).toFixed(2)}
                                          </td>
                                          <td className="p-0 text-center ">
                                            {Number(variantdata.discount).toFixed(2)}
                                          </td>
                                          <td className="p-0 text-center ">
                                            {Number(variantdata.product_price).toFixed(2)}
                                          </td>
                                         
                                          <td className="p-0 text-center ">
                                            {(variantdata.sale_price).toFixed(2)}
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
                                              <InputGroup
                                                className=""
                                                size="sm"
                                              >
                                                <Form.Control
                                                  multiple
                                                  type="file"
                                                  sm="9"
                                                  className={
                                                    customvalidated === true
                                                      ? "border-danger"
                                                      : null
                                                  }
                                                  onChange={(e) =>
                                                    imguploadchange(
                                                      e,
                                                      vdata[0].product_id,
                                                      vdata[0].id,
                                                      vdata[0].vendor_id,
                                                    )
                                                  }
                                                  name={"img_64"}
                                                />
                                              </InputGroup>
                                              <p onClick={(id)=>onImgView(variantdata.id,
                                                  variantdata.product_id)} className={'view_product_box my-2 text-primary'}>View Image</p>
                                            </div>
                                          </td>
                                          <td className="p-0 text-center manufacture_date">
                                            {variantdata.quantity}
                                            <p onClick={()=>setEditButton(true)} className={'view_product_box my-2 text-primary'}>Edit Image</p>
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
                                         {console.log("img lenth---"+newImageUrls.length)}
                                        {newImageUrls ? (
                                          <tr className="img_preview_boxx">
                                            {newImageUrls.map((imgg, i) => {
                                              
                                              return (
                                                `${variantdata.id}` === imgg.product_verient_id ?
                                               
                                                  <td className="">
                                                    <div className="imgprivew_box">
                                                      {imgg.image_position === 'cover' ? 
                                                    <p className="cover_img">Cover</p> : null   
                                                    }
                                                      <img
                                                        src={imgg.product_image_path}
                                                        key={i}
                                                        alt="apna_organic"
                                                        width={80}
                                                        height={100}
                                                      />
                                                      {editbutton === true ?
                                                      <span
                                                      className="cross_icon" 
                                                      onClick={(id)=>onImgCoverEditClick(imgg.product_image_id,
                                                        imgg.product_id,
                                                        imgg.product_verient_id
                                                        )}>
                                                          -
                                                      </span> :
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
                                            }
                                                    </div>
                                                  </td>
                                                 
                                                
                                                 : null
                                              );
                                             
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
                                                  className={
                                                   'img_add_button'
                                                  }
                                                  onChange={(e) =>
                                                    imguploadchange(
                                                      e,
                                                      variantdata.product_id,
                                                      variantdata.id,
                                                     variantdata.vendor_id,
                                                    )
                                                  }
                                                  name={"img_64"}
                                                />
                                                      <span
                                                        className="plus_icon"
                                                      >
                                                       
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
                </Form.Group>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button main_outline_button"
                onClick={() => handlevarietyClose()}
              >
                Cancel
              </button>
              <button
                className="button main_button"
                onClick={(e) => handlevarietyClose(e)}
              >
                Save
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
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          // onCancel={hideAlert}
        />
      </div>
    </div>
  );
}

export default Product;
