import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import moment from "moment";
import BrandJson from "./../json/BrandJson";

const Pendingproduct = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  let [searcherror, setsearcherror] = useState(false);
  const [pendingdata, setpendingdata] = useState([]);
  const currentdate = moment().format("YYYY-MM-DD");
  const [filtervategory, setfiltercategory] = useState([]);
  const [vendorid, setVendorId] = useState([]);
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    manufacturing_date: "",
    category: [],
    vendor: [],
    brand: [],
  });
  let token = localStorage.getItem("token");

  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
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

  const OnDateChange = (e) => {
    let mdate = moment(e.target.value).format("YYYY-MM-DD");
    setsearchData({ ...searchdata, manufacturing_date: mdate });
  };

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`, {
        product_search: {
          search: [`${searchdata.product_title_name}`],
          price_from: "",
          price_to: "",
          id: "",
          product_title_name_asc_desc: "",
          sale_price: "",
          short_by_updated_on: "",
          // product_title_name: ,
          product_status: ["pending"],
          manufacturing_date: [`${searchdata.manufacturing_date}`],
          category: [`${searchdata.category}`],
          brand: [`${searchdata.brand}`],
          shop: [`${searchdata.vendor}`],
        },
      })
      .then((response) => {
        setpendingdata(response.data);
        setapicall(false);
        setsearcherror(false);
      })
      .catch(function (error) {
        console.log(error);
      });
    getCategorydatafilter();
    getVendorData();
  }, [apicall]);

  const onSearchClick = () => {
    if (
      searchdata.product_title_name === "" &&
      searchdata.brand === "" &&
      searchdata.category === "" &&
      searchdata.vendor === "" &&
      searchdata.manufacturing_date === ""
    ) {
      setsearcherror(true);
    } else {
      setsearcherror(false);
      setapicall(true);
    }
  };

  const OnReset = () => {
    setsearchData({
      product_title_name: "",
      manufacturing_date: "",
      vendor: "",
      category: "",
      brand: "",
    });
    setapicall(true);
    setsearcherror(false);
  };
  // end search and reset
  const columns = [
    {
      name: "Sku",
      selector: (row) => <p>{row.id}</p>,
      sortable: true,
      width: "100px",
      center: true,
    },
    {
      name: "#",
      width: "150px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="70px"
          alt={row.product_title_name}
          src={
            row.all_images
              ? row.all_images
              : "https://t3.ftcdn.net/jpg/05/37/73/58/360_F_537735846_kufBp10E8L4iV7OLw1Kn3LpeNnOIWbvf.jpg"
          }
          style={{
            borderRadius: 10,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: "right",
          }}
          onClick={handleClick}
        />
      ),
    },
    {
      name: "Product Name",
      selector: (row) => row.product_title_name,
      sortable: true,
      width: "200px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "100px",
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
      width: "120px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },

    {
      name: "MDate",
      selector: (row) => moment(row.manufacturing_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "EDate",
      selector: (row) => moment(row.expire_date).format("DD-MM-YYYY"),
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Change Status",
      selector: (row) => (
        <Form.Select
          aria-label="Search by delivery"
          size="sm"
          className="w-100"
          onChange={(e) => onProductStatusChange(e, row.id, row.product_id)}
          value={row.product_status}
        >
          <option value="">Select</option>
          <option value="pending">Pending</option>
          <option value="draft">Draft</option>
          <option value="Approved">Approved</option>
        </Form.Select>
      ),
      sortable: true,
    },
  ];
  const onProductStatusChange = (e, id, productid) => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/product_status_update`, {
        id: `${id}`,
        product_id: `${productid}`,
        product_status: e.target.value,
      })
      .then((response) => {
        setapicall(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClick = () => {};
  return (
    <div>
      <h2>Pending Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              onChange={OnSearchChange}
              name="product_title_name"
              value={searchdata.product_title_name}
              className={"adminsideinput"}
              type={"text"}
              placeholder={"Search by product name"}
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
          <div className="col-md-3 col-sm-6 aos_input value={}">
            <input
              type={"date"}
              onChange={OnDateChange}
              name="manufacturing_date"
              value={searchdata.manufacturing_date}
              className={"adminsideinput"}
              placeholder={"Search by Date"}
              max={currentdate}
            />
          </div>
          <div className="col-md-3 col-sm-6 mt-2 aos_input">
            <MainButton
              onClick={onSearchClick}
              btntext={"Search"}
              btnclass={"button main_button w-100"}
            />
          </div>
          <div className="col-md-2 col-sm-6 mt-2 aos_input">
            <MainButton
              btntext={"Reset"}
              btnclass={"button main_button w-100"}
              type="reset"
              onClick={OnReset}
            />
          </div>
        </div>

        {/* upload */}

        {/* datatable */}

        <DataTable
          columns={columns}
          data={pendingdata.results}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body pendingproduct_table"}
        />
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to restore"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
};

export default Pendingproduct;
