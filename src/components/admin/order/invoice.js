import React from "react";
import "./invoice.css";

const Invoice = () => {
  return (
    <div class="container">
      <div class="card">
        <div class="card-header">
          Invoice No
          <strong>154987</strong>
          <span class="float-right"> </span>
        </div>
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-sm-6">
              <h6 class="mb-3">From:</h6>
              <div>
                <strong>Gourav Choudhary</strong>
              </div>
              <div>74, C21 Mall</div>
              <div>Indore MP</div>
              <div>Email: info@webz.com.pl</div>
              <div>Phone: +91 985 686 9865</div>
            </div>

            <div class="col-sm-6">
              <h6 class="mb-3">To:</h6>
              <div>
                <strong>Shivani</strong>
              </div>
              <div>Attn: Daniel Marek</div>
              <div>MR9 Indore MP</div>
              <div>Email: marek@daniel.com</div>
              <div>Phone: +91 568 568 56</div>
            </div>
          </div>

          <div class="table-responsive-sm">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="center">#</th>
                  <th>Item</th>
                  <th>Description</th>

                  <th class="right">Price</th>
                  <th class="center">Qty</th>
                  <th class="right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="center">1</td>
                  <td class="left strong">Hunny</td>
                  <td class="left">Sweet Hunny</td>

                  <td class="right">$15</td>
                  <td class="center">1</td>
                  <td class="right">$15</td>
                </tr>
                <tr>
                  <td class="center">2</td>
                  <td class="left strong">shoes</td>
                  <td class="left">Runing shoes</td>

                  <td class="right">$20</td>
                  <td class="center">2</td>
                  <td class="right">$40</td>
                </tr>
                <tr>
                  <td class="center">3</td>
                  <td class="left strong">T-Shirt</td>
                  <td class="left">100% cotton</td>

                  <td class="right">$10</td>
                  <td class="center">3</td>
                  <td class="right">$30</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row">
            <div class="col-lg-4 col-sm-5"></div>

            <div class="col-lg-4 col-sm-5 ml-auto">
              <table class="table table-clear">
                <tbody>
                  <tr>
                    <td class="left">
                      <strong>Total Amount</strong>
                    </td>
                    <td class="right">
                      <strong>$85</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Invoice;
