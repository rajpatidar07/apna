import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import moment from "moment";

const Pendingproduct = () => {
  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [pendingdata, setpendingdata] = useState([]);
  const currentdate = moment().format("YYYY-MM-DD");
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    category: "",
    manufacturing_date: "",
  });

  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };

  const OnDateChange = (e) => {
    let mdate = moment(e.target.value).format("YYYY-MM-DD");
    setsearchData({ ...searchdata, manufacturing_date: mdate });
  };

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`,
        {
          product_search: {
            search: `${searchdata.product_title_name}`,
            price_from: "",
            price_to: "",
            latest_first: "",
            product_title_name: "",
            sale_price: "",
            short_by_updated_on: "",
            product_status: ["pending"],
            manufacturing_date: [`${searchdata.manufacturing_date}`],
          },
        }
      )
      .then((response) => {
        setpendingdata(response.data);
        setapicall(false);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, [apicall]);


  const onSearchClick = () => {
    setapicall(true);
  };
  const OnReset = () => {
    setsearchData({ product_title_name: "", manufacturing_date: "" });
    setapicall(true);
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
        >
          <option selected={row.product_status === "" ? true : false} value="">
            Select
          </option>
          <option
            selected={row.product_status === "pending" ? true : false}
            value="pending"
          >
            Pending
          </option>
          <option
            selected={row.product_status === "draft" ? true : false}
            value="draft"
          >
            Draft
          </option>
          <option
            selected={row.product_status === "active" ? true : false}
            value="active"
          >
            Active
          </option>
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
      .catch(function(error) {
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
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              onClick={onSearchClick}
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
