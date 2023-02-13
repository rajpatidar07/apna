import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { BiEdit } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import axios from "axios";
import BrandJson from "./../json/BrandJson";
import SAlert from "../common/salert";

const Soldproduct = () => {
  const formRef = useRef();
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const handleClick = () => {};
  let token = localStorage.getItem("token");
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [productData, setProductData] = useState({});
  const [solddata, setsolddata] = useState([]);
  const [apicall, setapicall] = useState([]);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  let [searcherror, setsearcherror] = useState(false);
  const [filtervategory, setfiltercategory] = useState([]);
  const [vendorid, setVendorId] = useState([]);
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    category: [],
    vendor: [],
    brand: [],
  });
  // console.log("*****************----------" + JSON.stringify(solddata));
  const closeUpdateAlert = () => {
    setUpdateAlert(false);
  };
  /*<---Category list api---> */
  const getCategorydatafilter = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL}/category?category=all`)
        .then((response) => {
          let cgory = response.data;
          setfiltercategory(cgory);
        });
    } catch (err) {}
  };
  /*<---vendor list api---> */
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
          const result1 = result.filter(
            (item) => item.status === "approved" || item.status === "active"
          );
          setVendorId(result1);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleShow = (id, product_id) => {
    try {
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/products_pricing?id=${id}&product_id=${product_id}`
        )
        .then((response) => {
          let data = response.data;
          setProductData(data[0]);
          setId(data[0].id);
        });
    } catch (err) {
      console.log(err);
    }

    setShow(true);
  };
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
  };

  const onSearchClick = () => {
    if (searchdata.product_title_name === "" && searchdata.category === "") {
      setsearcherror(true);
    } else {
      setsearcherror(false);
      setapicall(true);
    }
  };

  const OnReset = () => {
    setsearchData({
      product_title_name: "",
      category: "",
      vendor: "",
      brand: "",
    });
    setapicall(true);
    setsearcherror(false);
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`, {
        product_search: {
          search: [`${searchdata.product_title_name}`],
          price_from: "",
          price_to: "",
          id: "",
          sale_price: "",
          product_title_name_asc_desc: "",
          short_by_updated_on: "",
          // product_title_name: [`${searchdata.product_title_name}`],
          category: [`${searchdata.category}`],
          brand: [`${searchdata.brand}`],
          shop: [`${searchdata.vendor}`],
          quantity: ["0"],
          is_delete: ["1"],
        },
      })
      .then((response) => {
        setsearcherror(false);
        let data = response.data;
        if ((data.length = 0)) {
          setsolddata([0]);
        } else {
          setsolddata(response.data);
        }
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    getCategorydatafilter();
    getVendorData();
  }, [apicall]);

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
          <p className="mb-1" onClick={(row.id, row.product_id)}>
            <b>
              {row.product_title_name}
              <br />
            </b>
            {/* Product ID: {row.product_id} <br /> */}
            <div className="d-flex flex-column ">
              {row.is_featured === 1 ? (
                <span className={"badge bg-warning mt-1"}>
                  {"featured product"}
                </span>
              ) : null}
              {row.is_special_offer === 1 ? (
                <span className={"badge bg-info mt-1"}>{"special offer"}</span>
              ) : null}
            </div>
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
      name: "Vendor",
      selector: (row) => row.shop,
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
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
      width: "100px",
    },
    {
      name: "Mrp",
      selector: (row) => (
        <p className="m-0">
          <b>MRP :</b>₹ {Number(row.mrp).toFixed(2)} <br />
          <b>Discount : </b>
          {Number(row.discount).toFixed(2)}%
          {/* {row.discount === "0" ? null : row.discount + "%"}{" "} */}
          <br />
          <b>Product Price:</b>₹ {Number(row.product_price).toFixed(2)} <br />
          <b>Sale Price:</b>₹ {Number(row.sale_price).toFixed(2)} <br />
        </p>
      ),
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "Tax",
      selector: (row) => (
        <div className="d-flex flex-column">
          <b>
            Total:
            {Number(row.gst) +
              Number(row.cgst) +
              Number(row.sgst) +
              Number(row.wholesale_sales_tax) +
              Number(row.retails_sales_tax) +
              Number(row.manufacturers_sales_tax) +
              Number(row.value_added_tax) +
              "%"}{" "}
          </b>{" "}
          <div className="d-flex">
            <b>Gst :</b>₹ {Number(row.gst).toFixed(2)}%<b>Cgst : </b>
            {Number(row.cgst).toFixed(2)}%
            {/* {row.discount === "0" ? null : row.discount + "%"}{" "} */}
            <b>Sgst:</b> {Number(row.sgst).toFixed(2)}%
          </div>
          <div className="d-flex flex-column">
            <b>
              wholesale_sales_tax:{Number(row.wholesale_sales_tax).toFixed(2)}%
            </b>{" "}
            <b>retails_sales_tax:{Number(row.retails_sales_tax).toFixed(2)}%</b>{" "}
            <b>value_added_tax:{Number(row.value_added_tax).toFixed(2)}% </b>
            <b>
              manufacturers_sales_tax:{" "}
              {Number(row.manufacturers_sales_tax).toFixed(2)}%
            </b>{" "}
          </div>
        </div>
      ),

      sortable: true,
      width: "200px",
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
      name: "Action",
      width: "180px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this, row.id, row.product_id)}
          />
        </div>
      ),
    },
  ];

  const OnQuntityChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const OnProductQutUpdate = (e) => {
    axios
      .put(
        `${process.env.REACT_APP_BASEURL}/products_varient_update`,
        productData
      )
      .then((response) => {
        let data = response.data;
        setapicall(true);
        setShow(false);
        setUpdateAlert(true);
      });
  };

  const handleClose = () => {
    setProductData({});
    setShow(false);
  };
  return (
    <div>
      <h2>Sold Products </h2>

      {/* search bar */}
      <div className="card mt-3 p-3">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"text"}
              placeholder={"Search by product name"}
              onChange={OnSearchChange}
              name="product_title_name"
              value={searchdata.product_title_name}
              className={"adminsideinput"}
            />
            {searcherror === true ? (
              <small className="text-danger">please fill the feild</small>
            ) : null}
          </div>
          <div className="col-md-2 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              placeholder="Search by category"
              onChange={OnSearchChange}
              name="category"
              value={String(searchdata.category)}
            >
              <option value={""}>Select Category</option>
              {(filtervategory || []).map((data, i) => {
                return (
                  <option value={data.id} key={i}>
                    {" "}
                    {data.id}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-md-2 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by status"
              className="adminselectbox"
              placeholder="Search by vendor"
              onChange={OnSearchChange}
              name="vendor"
              value={String(searchdata.vendor)}
            >
              <option value={""}>Select Vendor</option>
              {(vendorid || []).map((data, i) => {
                return (
                  <option value={data.shop_name} key={i}>
                    {" "}
                    {data.shop_name}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-md-2 col-sm-6 aos_input">
            <Form.Select
              aria-label="Search by brand"
              className="adminselectbox"
              placeholder="Search by brand"
              onChange={OnSearchChange}
              name="brand"
              value={String(searchdata.brand)}
            >
              <option value={""}>Select Brand</option>
              {(BrandJson.BrandJson || []).map((data, i) => {
                return (
                  <option value={data} key={i}>
                    {" "}
                    {data}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              btnclass={"button main_button w-100"}
              onClick={onSearchClick}
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

        <Modal size="lg" show={show} onHide={() => handleClose()}>
          <Modal.Header closeButton>
            <Modal.Title>Sold Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row p-3 m-0">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3 aos_input"
                  controlId="validationCustom01"
                >
                  <Form.Label>Product Id</Form.Label>
                  <Form.Control
                    defaultValue={productData.id}
                    type="text"
                    placeholder="Add Title"
                    name={"id"}
                  />
                </Form.Group>
              </div>

              <div className="col-md-3 col-sm-6 aos_input">
                <label>Quantity</label>
                <input
                  type={"number"}
                  placeholder={"Select quantity"}
                  onChange={OnQuntityChange}
                  name="quantity"
                  defaultValue={productData.quantity}
                  className={"adminsideinput"}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="button main_outline_button"
              onClick={() => handleClose()}
            >
              Cancel
            </button>
            <button
              className="button main_outline_button"
              onClick={() => OnProductQutUpdate()}
            >
              Update
            </button>
          </Modal.Footer>
        </Modal>

        {/* datatable */}

        <DataTable
          columns={columns}
          data={solddata.results}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body soldproduct_table"}
        />
        <SAlert
          show={UpdateAlert}
          title={"Update sucsessfully"}
          onConfirm={closeUpdateAlert}
        />
      </div>
    </div>
  );
};

export default Soldproduct;
