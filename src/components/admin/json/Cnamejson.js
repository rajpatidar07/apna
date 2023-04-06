import React from "react";
import { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
function CnameJson(){
  let token = localStorage.getItem("token");

     const [pdata,setPdata]=useState([])
const CatNameJson=()=>{
    axios
    .post(
      `${process.env.REACT_APP_BASEURL_0}/home?page=0&per_page=400`,
      {
        product_search: {
          search: "",
          price_from: "",
          price_to: "",
          id: "",
          sale_price: "",
          short_by_updated_on: "",
          product_title_name_asc_desc: "",
          category:"",
          product_status: "",
          is_delete: ["1"],
          colors: [],
          size: [],
          seo_tag:"",
          parent_category: [],
          product_type: [],
          // product_title_name: [],
          brand: "",
          shop: "",
        },
      },
      {
          headers: { admin_token: `${token}` },
        }
    )
    .then((response) => {
      setPdata(response.data);
      // setLoading(false);
      // setapicall(false);
    }
    )
    console.log("DATA---00988888--"+JSON.stringify(pdata))
}
   return(
    <>
     <div className="col-md-2 col-sm-6 aos_input">
              <Form.Select
                aria-label="Search by status"
                className="adminselectbox"
                placeholder="Search by vendor"
                onChange={CatNameJson}
                name="vendor"
                // value={pdata.category_name}
              >
                <option value={""}>Select Vendor</option>
                {(pdata || []).map((data, i) => {
                  
                  return (
                    <option value={data.category_name} key={i}>
                      {" "}
                      {data.shop_name}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
    </>
   )
}
export default CnameJson;