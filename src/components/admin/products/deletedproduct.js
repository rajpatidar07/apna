import React, { useEffect, useState } from "react";
import Input from "../common/input";
import { MdOutlineRestore } from "react-icons/md";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import Iconbutton from "../common/iconbutton";
import SweetAlert from "sweetalert-react";
import "sweetalert/dist/sweetalert.css";
import axios from "axios";

const Deletedproduct = () => {
  const [id, setId] = useState();
  const [productid, setProductId] = useState();
  const [RestoreAlert, setRestoreAlert] = useState(false);

  const [Alert, setAlert] = useState(false);
  const [apicall, setapicall] = useState(false);
  const [deletedata, setdeletedata] = useState([]);
  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    manufacturing_date: "",
  });

  const hideAlert = () => setRestoreAlert(false);

  const closeRestoreAlert = () => {
    axios
      .put(`${process.env.REACT_APP_BASEURL}/products_delete_remove`, {
        varient_id: id,
        product_id: productid,
        is_delete: "0",
      })
      .then((response) => {
        let data = response.data;
        setapicall(true);
        setRestoreAlert(false);
      });
  };

  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };
  const onSearchClick = () => {
    setapicall(true);
  };
  const OnReset = () => {
    setsearchData({ start_date: "", end_date: "" });
    setapicall(true);
  };
  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_BASEURL}/products_search?page=0&per_page=50`,
        {
          product_search: {
            search: `${searchdata.product_title_name}`,
            category: "",
            price_from: "",
            price_to: "",
            latest_first: "",
            short_by_updated_on: "",
            product_title_name: "",
            sale_price: "",
            is_delete: ["1"],
            manufacturing_date: [`${searchdata.manufacturing_date}`],
          },
        }
      )
      .then((response) => {
        setdeletedata(response.data);
        setapicall(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [apicall]);

  const columns = [
    {
      name: "Id",
      selector: (row) => <p>{row.id}</p>,
      sortable: true,
      width: "80px",
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
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
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
      width: "90px",
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
      width: "90px",
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
      name: "MDate",
      selector: (row) => row.manufacturing_date,
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
      selector: (row) => row.expire_date,
      sortable: true,
      width: "150px",
      center: true,
      style: {
        paddingRight: "32px",
        paddingLeft: "0px",
      },
    },
    {
      name: "Action",
      width: "120px",
      style: {
        paddingRight: "12px",
        paddingLeft: "0px",
      },
      selector: (row) => (
        <Iconbutton
          onClick={(e) => OnProductRestore(e, row.id, row.product_id)}
          btntext={"Restore"}
          btnclass={"button bg-warning"}
          Iconname={<MdOutlineRestore className="mx-1" />}
        />
      ),
    },
  ];
  const OnProductRestore = (e, id, productid) => {
    setRestoreAlert(true);
    setId(id);
    setProductId(productid);
  };

  const handleClick = () => {};
  return (
    <div>
      <h2>Deleted Products</h2>

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
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <input
              type={"date"}
              value={searchdata.manufacturing_date}
              placeholder={"Search by date"}
              className={"adminsideinput"}
              onChange={OnSearchChange}
              name="manufacturing_date"
            />
          </div>
          <div className="col-md-3 col-sm-6 aos_input">
            <MainButton
              btntext={"Search"}
              onClick={onSearchClick}
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
          data={deletedata.results}
          pagination
          highlightOnHover
          pointerOnHover
          className={"table_body deletedproduct_tabel"}
        />
        <SweetAlert
          show={RestoreAlert}
          title="Restor Successfully "
          onConfirm={closeRestoreAlert}
          onCancel={hideAlert}
          showCancelButton={true}
        />
      </div>
    </div>
  );
};

export default Deletedproduct;
