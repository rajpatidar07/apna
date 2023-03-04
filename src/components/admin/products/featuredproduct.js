import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import { BiEdit } from "react-icons/bi";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import axios from "axios";
import SAlert from "../common/salert";
import MainButton from "../common/button";
import BrandJson from "./../json/BrandJson";
import Loader from "../common/loader";

const Featuredproduct = () => {
  const currentdate = moment().format("");
  const formRef = useRef();
  const [featuredProductData, setFeatureProductData] = useState([]);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [featuredData, setFeaturetData] = useState([]);
  const [show, setShow] = useState("");
  const [validated, setValidated] = useState(false);
  const [id, setId] = useState("");
  const [filtervategory, setfiltercategory] = useState([]);
  const [vendorid, setVendorId] = useState([]);
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    status: "",
    category: "",
    vendor: "",
    brand: "",
  });
  const [searcherror, setsearcherror] = useState("");
  let [loading, setloading] = useState(false);

  let token = localStorage.getItem("token");

  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);

  const handleClose = () => {
    // formRef.current.reset();
    setValidated(false);
    setShow(false);
    setapicall(true);
  };

  let closeUpdateAlert = () => {
    setUpdateAlert(false);
  };

  /*<---Category list api---> */
  const getCategorydatafilter = () => {
    try {
      axios
        .get(`${process.env.REACT_APP_BASEURL_0}/category?category=all`)
        .then((response) => {
          let cgory = response.data;
          setfiltercategory(cgory);
        });
    } catch (err) {}
  };
  /*<---Category list api---> */
  const getVendorData = () => {
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL_0}/vendors`,
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
  //   console.log("oooooo--------"+JSON.stringify(featuredProductData))
  /*<----Function to get the data---->*/
  const handleShow = (id) => {
    console.log(id);
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL_0}/fetured_product_search`,
          {
            id: id,
            fetured_type: "featured_offer",
            start_date: "",
            end_date: "",
          },
          {
            headers: { admin_token: `${token}` },
          }
        )
        .then((response) => {
          setId(response.data[0].id);
          console.log(response.data[0].start_date);
          for (let i = 0; i < response.data.length; i++) {
            if (response.data[i].id === id) {
              console.log(response.data[i]); // return the object if id matches
              return response.data[i];
            }
          }
          setFeaturetData({
            ...featuredData,
            start_date: response.data[0].start_date,

            end_date: response.data[0].end_date,
          });
          setapicall(false);
        });
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };
  /*<---Render feature data function--->*/
  useEffect(() => {
    console.log(searchdata.product_title_name);
    setloading(true);
    try {
      axios
        .post(
          `${process.env.REACT_APP_BASEURL_0}/fetured_product_search`,
          {
            fetured_type: "featured_offer",
            product_title_name: [`${searchdata.product_title_name}`],
            vendor_id: [`${searchdata.vendor}`],
            status: searchdata.status,
            category: [`${searchdata.category}`],
          },
          {
            headers: { admin_token: `${token}` },
          }
        )
        .then((response) => {
          console.log(response);
          setFeatureProductData(response.data);
          setapicall(false);
          setloading(false);
        });
    } catch (err) {
      console.log(err);
    }
    getCategorydatafilter();
    getVendorData();
  }, [apicall]);

  /*<---Table data ---->*/
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
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => (
        <div>
          <p className="mb-1">
            <b>
              {row.product_title_name}
              <br />
            </b>
            {/* Product ID: {row.product_id} <br /> */}
            <span className="d-flex flex-column ">
              {row.is_featured === 1 ? (
                <span className={"badge bg-warning mt-1"}>
                  {"featured product"}
                </span>
              ) : null}
              {row.is_special_offer === 1 ? (
                <span className={"badge bg-info mt-1"}>{"special offer"}</span>
              ) : null}
            </span>
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
    // {
    //   name: "Product ID",
    //   selector: (row) => row.product_id,
    //   sortable: true,
    //   width: "130px",
    //   center: true,
    //   style: {
    //     paddingLeft: 0,
    //   },
    // },
    {
      name: "Fetured_type",
      selector: (row) => row.fetured_type,
      sortable: true,
      width: "250px",
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
            (currentdate > row.start_date || currentdate === row.start_date) &&
            currentdate < row.end_date
              ? "badge bg-success"
              : currentdate > row.end_date || currentdate === row.end_date
              ? "badge bg-danger"
              : currentdate < row.start_date
              ? "badge bg-info"
              : null
          }
        >
          {(currentdate > row.start_date || currentdate === row.start_date) &&
          currentdate < row.end_date
            ? "Active"
            : currentdate > row.end_date || currentdate === row.end_date
            ? "Expired"
            : currentdate < row.start_date
            ? "In Active"
            : null}
        </span>
      ),
      sortable: true,
      width: "200px",
    },
    {
      name: "Start Date",
      selector: (row) => moment(row.start_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "End Date",
      selector: (row) => moment(row.end_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "130px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Action",
      width: "100px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      center: true,
      selector: (row) => (
        <div className={"actioncolimn"}>
          <BiEdit
            className=" p-0 m-0  editiconn text-secondary"
            onClick={handleShow.bind(this, row.id)}
          />
        </div>
      ),
    },
  ];

  /*<----Onchange function of Feature---->*/
  const handleFormChange = (e) => {
    setFeaturetData({ ...featuredData, [e.target.name]: e.target.value });
  };

  /*<----Function to update feature product---->*/
  const UpdateFeaturedProduct = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_BASEURL_0}/update_fetured_product`,
        {
          id: id,
          start_date: featuredData.start_date,
          end_date: featuredData.end_date,
        },
        {
          headers: { admin_token: `${token}` },
        }
      )
      .then((response) => {
        let data = response.data;
        setapicall(true);
        setShow(false);
        setUpdateAlert(true);
      });
    formRef.current.reset();
    // setValidated(false);
  };

  const OnDateChange = (e) => {};
  const submitHandler = () => {
    setapicall(true);
  };
  /*<---Onchange function of search --->*/
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    console.log(searchdata);
    setsearcherror(false);
  };
  /*<---Function to reset Search--->*/
  const OnReset = () => {
    setsearchData({
      product_title_name: "",
      status: "",
      category: "",
      brand: "",
      vendor: "",
    });
    setapicall(true);
    setsearcherror(false);
  };
  /*<---Onlick Function to Search--->*/
  const Search = () => {
    if (
      searchdata.product_title_name === "" &&
      searchdata.status === "" &&
      searchdata.vendor === "" &&
      searchdata.brand === "" &&
      searchdata.category === ""
    ) {
      setsearcherror(true);
    } else {
      setsearcherror(false);
      setapicall(true);
    }
  };

  return (
    <>
      {loading === true ? <Loader /> : null}
      <div>
        <h2>Featured Products</h2>
        <div className="card mt-3 p-3">
          <div className="row pb-3">
            <div className="col-md-3 col-sm-6 aos_input mb-2">
              <input
                type={"text"}
                placeholder={"Search by product name"}
                onChange={OnSearchChange}
                name="product_title_name"
                value={searchdata.product_title_name}
                className={"adminsideinput"}
              />{" "}
              {searcherror === true ? (
                <small className="text-danger">please fill the feild</small>
              ) : null}
            </div>
            {/* <div className="col-md-3 col-sm-6 aos_input mb-2">
  <input type={"text"}  onChange={OnSearchChange} name='product_title_name'
  value={searchdata.status} placeholder={"Search by status"} className={'adminsideinput'}/>
</div> */}
            <div className="col-md-3 col-sm-6 aos_input mb-2">
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
                      {data.category_name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-3 col-sm-6 aos_input mb-2">
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
            <div className="col-md-3 col-sm-6 aos_input mb-2">
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
            <div className="col-md-3 col-sm-6">
              <Form.Select
                aria-label="Search by delivery"
                className="adminselectbox"
                onChange={OnSearchChange}
                name="status"
                value={String(searchdata.status)}
              >
                <option value="">status</option>
                <option value="Active">Active</option>
                <option value="expired">Expired</option>
                <option value="inactive">In active</option>
              </Form.Select>
            </div>

            <div className="col-md-3 col-sm-6 aos_input mb-2 ">
              <MainButton
                btntext={"Search"}
                btnclass={"button main_button w-100"}
                onClick={Search}
              />
            </div>
            <div className="col-md-3 col-sm-6 aos_input mb-2 ">
              <MainButton
                btntext={"Reset"}
                btnclass={"button main_button w-100"}
                type="reset"
                onClick={OnReset}
              />
            </div>
          </div>
        </div>

        <Modal size="lg" show={show} onHide={() => setShow(false)}>
          <Form className="" ref={formRef}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row p-3 m-0">
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicStartDate"
                  >
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                      name="start_date"
                      value={featuredData.start_date}
                      onChange={(e) => handleFormChange(e)}
                      type="date"
                      placeholder="Coupon Start Date"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group
                    className="mb-3 aos_input"
                    controlId="formBasicStartDate"
                  >
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                      name="end_date"
                      value={featuredData.end_date}
                      onChange={(e) => handleFormChange(e)}
                      type="date"
                      placeholder="Coupon Start Date"
                    />
                  </Form.Group>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="button main_outline_button"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="button main_outline_button"
                onClick={UpdateFeaturedProduct}
              >
                Update
              </button>
            </Modal.Footer>
          </Form>
        </Modal>
        <DataTable
          columns={columns}
          data={featuredProductData}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body featuredproduct_table"}
        />

        <SAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to remove"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
        <SAlert
          show={UpdateAlert}
          title=" Sold product Updated Successfully "
          onConfirm={closeUpdateAlert}
        />
      </div>
    </>
  );
};

export default Featuredproduct;
