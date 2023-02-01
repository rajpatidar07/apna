import React, { useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Form from "react-bootstrap/Form";
import { BiEdit } from "react-icons/bi";
import { Modal } from "react-bootstrap";
import axios from "axios";
import SAlert from "../common/salert";

const Soldproduct = () => {
  const formRef = useRef();

  const handleAlert = () => setAlert(true);
  const hideAlert = () => setAlert(false);
  const [Alert, setAlert] = useState(false);

  const handleClick = () => {};

  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [productData, setProductData] = useState({});
  const [solddata, setsolddata] = useState([]);
  const [apicall, setapicall] = useState([]);
  const [UpdateAlert, setUpdateAlert] = useState(false);

  const [searchdata, setsearchData] = useState({
    product_title_name: "",
    category: "",
  });
console.log("*****************----------"+JSON.stringify(solddata))
  const closeUpdateAlert = () => {
    setUpdateAlert(false);
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
    } catch (err) {}

    setShow(true);
  };
  const OnSearchChange = (e) => {
    setsearchData({ ...searchdata, [e.target.name]: e.target.value });
  };

  const onSearchClick = () => {
    setapicall(true);
  };

  const OnReset = () => {
    setsearchData({ product_title_name: "", manufacturing_date: "" });
    setapicall(true);
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
            short_by_updated_on: "",
            product_title_name: "",
            sale_price: "",
            category: "",
            quantity: "",
            is_delete: ["0"],
          },
        }
      )
      .then((response) => {
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
  }, [apicall]);

  const columns = [
    {
      name: "Sku",
      selector: (row) => <p>{row.id}</p>,
      sortable: true,
      width: "150px",
      center: true,
    },
    {
      name: "#",
      width: "180px",
      center: true,
      cell: (row) => (
        <img
          height="90px"
          width="70px"
          alt={row.product_title_name}
          src={
            row.image
              ? row.image
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
      width: "280px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "200px",
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      width: "200px",
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      sortable: true,
      width: "180px",
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
                    value={productData.id}
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
                  value={productData.quantity}
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
          title="Updated Sold product Successfully "
          onConfirm={closeUpdateAlert}
        />
      </div>
    </div>
  );
};

export default Soldproduct;
