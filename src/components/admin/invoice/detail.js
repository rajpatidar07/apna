import React from "react";
import logo from '../../../images/logo.png';


const Invoice = () => {
    return (
        <div className="container">
            <div className="invoice">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive-sm p-3">
                            <table className="invoice_header">
                                <tr className="border-bottom">
                                    <td className="align-bottom" width={'50%'}>
                                        <img src={logo} className="w-25" />
                                        <h2 className="m-0 mt-2"><b>INVOICE</b></h2>
                                    </td>
                                    <td className="text-end">
                                        <h5 className="text-uppercase m-0"><b>Apna Organic Store</b></h5>
                                        <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
                                        <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
                                        <p className="m-0">contact@apnaorganicstore.com</p>
                                        <p className="m-0">1234567890</p>
                                    </td>
                                </tr>
                            </table>
                            <div className="pb-4 pt-4">
                                <table className="invoice_header w-100">
                                    <tr className="">
                                        <td className="">
                                            <h5 className="text-uppercase m-0"><b>Order Detail:</b></h5>
                                            <p className="m-0"><b>Invoice No:</b> #FAJ6EI2300006199</p>
                                            <p className="m-0"><b>Order Id:</b> #1212131</p>
                                            <p className="m-0"><b>Order Date:</b> 24-09-2022</p>
                                            <p className="m-0"><b>Invoice Date:</b> 24-09-2022</p>
                                            <p className="m-0"><b>GSTIN:</b> 23AAACX2827R1ZX</p>
                                        </td>
                                        <td className="">
                                            <h5 className="text-uppercase m-0"><b>Bill to:</b></h5>
                                            <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
                                            <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
                                            <p className="m-0">contact@apnaorganicstore.com</p>
                                            <p className="m-0">1234567890</p>
                                        </td>
                                        <td className="">
                                            <h5 className="text-uppercase m-0"><b>Ship to:</b></h5>
                                            <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
                                            <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
                                            <p className="m-0">contact@apnaorganicstore.com</p>
                                            <p className="m-0">1234567890</p>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th className="center">#</th>
                                        <th>Item</th>
                                        <th>Description</th>

                                        <th className="right">Price</th>
                                        <th className="center">Qty</th>
                                        <th className="right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="center">1</td>
                                        <td className="left strong">Hunny</td>
                                        <td className="left">Sweet Hunny</td>

                                        <td className="right">$15</td>
                                        <td className="center">1</td>
                                        <td className="right">$15</td>
                                    </tr>
                                    <tr>
                                        <td className="center">2</td>
                                        <td className="left strong">shoes</td>
                                        <td className="left">Runing shoes</td>

                                        <td className="right">$20</td>
                                        <td className="center">2</td>
                                        <td className="right">$40</td>
                                    </tr>
                                    <tr>
                                        <td className="center">3</td>
                                        <td className="left strong">T-Shirt</td>
                                        <td className="left">100% cotton</td>

                                        <td className="right">$10</td>
                                        <td className="center">3</td>
                                        <td className="right">$30</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 col-sm-5"></div>

                            <div className="col-lg-4 col-sm-5 ml-auto">
                                <table className="table table-clear">
                                    <tbody>
                                        <tr>
                                            <td className="left">
                                                <strong>Total Amount</strong>
                                            </td>
                                            <td className="right">
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
        </div>
    );
};
export default Invoice;
