import React, { useEffect, useState } from "react";
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";
import moment from "moment";

const Expiredproduct = () => {
  const handleClick = () => {};
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  let [searcherror, setsearcherror] = useState(false);
  const [expiredata, setexpiredata] = useState([]);
  const currentdate = moment().format("YYYY-MM-DD");
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    category: "",
    manufacturing_date: "",
  });
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
    setsearcherror(false);
  };

  const OnDateChange = (e) => {
    let mdate = moment(e.target.value).format("YYYY-MM-DD");
    setsearchData({ ...searchdata, manufacturing_date: mdate });
  };
  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASEURL}/home?page=0&per_page=400`, {
        product_search: {
          search: "",
          category: `${searchdata.category}`,
          price_from: "",
          price_to: "",
          id: "",
          product_title_name_asc_desc: "",
          sale_price: "",
          short_by_updated_on: "",
          product_title_name: [`${searchdata.product_title_name}`],
          manufacturing_date: [`${searchdata.manufacturing_date}`],
          expire_date: [`${currentdate}`],
        },
      })
      .then((response) => {
        let data = response.data.results;
        setexpiredata(data);
        setapicall(false);
        setsearcherror(false);
      });
  }, [apicall]);
  const columns = [
    {
      name: "Id",
      selector: (row) => <p>{row.id}</p>,
      sortable: true,
      width: "70px",
      center: true,
    },
    {
      name: "#",
      width: "120px",
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
  ];
  const onSearchClick = () => {
    if (searchdata.product_title_name === "") {
      setsearcherror(true);
    } else {
      setsearcherror(false);
      setapicall(true);
    }
  };

  const OnReset = () => {
    setsearchData({ product_title_name: "", manufacturing_date: "" });
    setapicall(true);
    setsearcherror(false);
  };
  return (
    <div>
      <h2>Expired Products</h2>

      {/* search bar */}
      <div className="card mt-3 p-3 ">
        <div className="row pb-3">
          <div className="col-md-3 col-sm-6 aos_input">
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

          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"date"}
              max={moment().format("YYYY-MM-DD")}
              placeholder={"Search by manufacturing date"}
              onChange={OnDateChange}
              name="manufacturing_date"
              value={searchdata.manufacturing_date}
              className={"adminsideinput"}
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
          data={expiredata}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body expired_product_table"}
        />
        <SweetAlert
          show={Alert}
          title="Product Name"
          text="Are you Sure you want to delete"
          onConfirm={hideAlert}
          showCancelButton={true}
          onCancel={hideAlert}
        />
      </div>
    </div>
  );
};

export default Expiredproduct;
