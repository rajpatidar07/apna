import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
// import {  pdf,Page, Text, View, Document, StyleSheet, usePDF, PDFDownloadLink } from '@react-pdf/renderer';
// import DownloadInvoice from './download.js';


const Invoice = () => {
    let invoice_no=localStorage.getItem("invoice_no")
      console.log("invoicebbbbbbbbbbbbbbbbb"+invoice_no)
    const[invoicedetails,setInvoiceDetails]=useState([]);
    useEffect(() => {
        function getInvoiceDetails() {
          try {
            axios
              .get(`http://192.168.29.108:5000/invoice_details?invoice_no=${invoice_no}`)
              .then((response) => {
                let data = response.data;
                setInvoiceDetails(data);
                console.log("invoiceeee detailsssssssssssssssssssss--------" + JSON.stringify(data));
              });
          } catch (err) {}
        }
    
        getInvoiceDetails();
      }, []);
    return (
        <>
        {/* <Document >
            <Page size="A4" style={''}> */}
                <div className="container">
                    <div className="invoice">
                        <div className="card">
                            <div className="card-body">
                                {invoicedetails.map((invodetails)=>{
                                    return(
                                        <div className="table-responsive-sm p-3">
                                        <table className="invoice_header w-100">
                                            <tr className="border-bottom">
                                                <td className="align-bottom" width={'50%'}>
                                                    {/* <img src={logo} className="w-25" /> */}
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
                                                        <p className="m-0"><b>Invoice No:</b>{invodetails.invoice_no}</p>
                                                        <p className="m-0"><b>Order Id:</b> {invodetails.order_id}</p>
                                                        <p className="m-0"><b>Order Date:</b>{invodetails.order_date}</p>
                                                        <p className="m-0"><b>Invoice Date:</b> {invodetails.invoice_date}</p>
                                                        <p className="m-0"><b>GSTIN:</b> {invodetails.gst}</p>
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
                                        <table className="table table-striped border">
                                            <thead>
                                                <tr>
                                                    <th className="center">Product</th>
                                                    <th>Qty</th>
                                                    <th>Gross Amount ₹</th>
    
                                                    <th className="right">discount_coupon ₹</th>
                                                    <th className="center">taxable_value ₹</th>
                                                    <th className="center">cgst ₹</th>
                                                    <th className="center">sgst ₹</th>
                                                    <th className="right">total_amount ₹</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
                                                        <small>CGST: {invodetails.cgst} %</small><br />
                                                        <small>SGST/UTGST: {invodetails.sgst} %</small>
                                                    </td>
                                                    <td className="">{invodetails.quantity}</td>
                                                    <td className="left">{invodetails.price}</td>
                                                    <td className="left">{invodetails.discount_coupon}</td>
                                                    <td className="left">{invodetails.taxable_value}</td>
                                                    <td className="left">{invodetails.cgst}</td>
                                                    <td className="left">{invodetails.sgst}</td>
                                                    <td className="left">{invodetails.total_amount}</td>
                                                </tr>
                                                <tr>
                                                    <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
                                                        <small>CGST:{invodetails.cgst}%</small><br />
                                                        <small>SGST/UTGST: {invodetails.sgst}%</small>
                                                    </td>
                                                    <td className="">1</td>
                                                    <td className="left">15999.00</td>
                                                    <td className="left">-1283.00</td>
                                                    <td className="left">12471.18</td>
                                                    <td className="left">1122.40</td>
                                                    <td className="left">1122.40</td>
                                                    <td className="left">14716.00</td>
                                                </tr>
                                                <tr>
                                                    <td className="center"><b>Shipping And Packaging Charges</b>
                                                    </td>
                                                    <td className="">2</td>
                                                    <td className="left">99.00</td>
                                                    <td className="left">-70.00</td>
                                                    <td className="left">24.58</td>
                                                    <td className="left">2.21</td>
                                                    <td className="left">2.21</td>
                                                    <td className="left">29.00</td>
                                                </tr>
                                                <tr>
                                                    <th className="font-weight-bold"><b>Total</b></th>
                                                    <th className=""><b>2</b></th>
                                                    <th className=""><b>16098.00</b></th>
                                                    <th className=""><b>-1353.00</b></th>
                                                    <th className=""><b>12495.76</b></th>
                                                    <th className=""><b>1124.61</b></th>
                                                    <th className=""><b>1124.61</b></th>
                                                    <th className=""><b>14745.00</b></th>
                                                </tr>
                                                <tr>
                                                    <th colSpan={'7'} className="font-weight-bold text-end p-4"><h5><b>Grand Total</b></h5></th>
                                                    <th className="pt-4 pb-4"><h5><b>14745.00</b></h5></th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="col-md-12 text-end">
                                            <h5>Apna Organic Store</h5>
                                            {/* <img src={logo} className='w-25 p-4 pt-1 pb-1 px-1' /> */}
                                            <h5>Authorised Signatury</h5>
                                        </div>
                                        <div className="col-md-12 border-top p-2">
                                            <p><b>Returns Policy:</b> At Apna Organic we try to deliver perfectly each and every time. But in the off-chance that you need to return the item, please do so with the <b>original Brand box/price
                                                tag, original packing and invoice</b> without which it will be really difficult for us to act on your request. Please help us in helping you. Terms and conditions apply.</p>
                                            <p>The goods sold as are intended for end user consumption and not for re-sale.</p>
    
                                        </div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            {/* </Page>

        </Document> */}
        </>
    );
};
// const MyDoc = () => (
//     <Document >
//         <Page size="A4" style={''}>
//             <div className="container">
//                 <div className="invoice">
//                     <div className="card">
//                         <div className="card-body">
//                             <div className="table-responsive-sm p-3">
//                                 <table className="invoice_header">
//                                     <tr className="border-bottom">
//                                         <td className="align-bottom" width={'50%'}>
//                                             <img src={logo} className="w-25" />
//                                             <h2 className="m-0 mt-2"><b>INVOICE</b></h2>
//                                         </td>
//                                         <td className="text-end">
//                                             <h5 className="text-uppercase m-0"><b>Apna Organic Store</b></h5>
//                                             <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                             <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                             <p className="m-0">contact@apnaorganicstore.com</p>
//                                             <p className="m-0">1234567890</p>
//                                         </td>
//                                     </tr>
//                                 </table>
//                                 <div className="pb-4 pt-4">
//                                     <table className="invoice_header w-100">
//                                         <tr className="">
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Order Detail:</b></h5>
//                                                 <p className="m-0"><b>Invoice No:</b> #FAJ6EI2300006199</p>
//                                                 <p className="m-0"><b>Order Id:</b> #1212131</p>
//                                                 <p className="m-0"><b>Order Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>Invoice Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>GSTIN:</b> 23AAACX2827R1ZX</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Bill to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Ship to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </div>
//                                 <table className="table table-striped border">
//                                     <thead>
//                                         <tr>
//                                             <th className="center">Product</th>
//                                             <th>Qty</th>
//                                             <th>Gross Amount ₹</th>

//                                             <th className="right">Discounts/Coupons ₹</th>
//                                             <th className="center">Taxable Value ₹</th>
//                                             <th className="center">CGST ₹</th>
//                                             <th className="center">SGST/UTGST ₹</th>
//                                             <th className="right">Total ₹</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>Shipping And Packaging Charges</b>
//                                             </td>
//                                             <td className="">2</td>
//                                             <td className="left">99.00</td>
//                                             <td className="left">-70.00</td>
//                                             <td className="left">24.58</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">29.00</td>
//                                         </tr>
//                                         <tr>
//                                             <th className="font-weight-bold"><b>Total</b></th>
//                                             <th className=""><b>2</b></th>
//                                             <th className=""><b>16098.00</b></th>
//                                             <th className=""><b>-1353.00</b></th>
//                                             <th className=""><b>12495.76</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>14745.00</b></th>
//                                         </tr>
//                                         <tr>
//                                             <th colSpan={'7'} className="font-weight-bold text-end p-4"><h5><b>Grand Total</b></h5></th>
//                                             <th className="pt-4 pb-4"><h5><b>14745.00</b></h5></th>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                                 <div className="col-md-12 text-end">
//                                     <h5>Apna Organic Store</h5>
//                                     <img src={logo} className='w-25 p-4 pt-1 pb-1 px-1' />
//                                     <h5>Authorised Signatury</h5>
//                                 </div>
//                                 <div className="col-md-12 border-top p-2">
//                                     <p><b>Returns Policy:</b> At Apna Organic we try to deliver perfectly each and every time. But in the off-chance that you need to return the item, please do so with the <b>original Brand box/price
//                                         tag, original packing and invoice</b> without which it will be really difficult for us to act on your request. Please help us in helping you. Terms and conditions apply.</p>
//                                     <p>The goods sold as are intended for end user consumption and not for re-sale.</p>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </Page>
//     </Document>
// );
// const Invoice = () => (
//     <div>
//         {/* <div className="container p-0">
//                 <div className="invoice">
//                     <div className="card">
//                         <div className="card-body">
//                             <div className="table-responsive-sm p-3">
//                                 <table className="invoice_header">
//                                     <tr className="border-bottom">
//                                         <td className="align-bottom" width={'50%'}>
//                                             <img src={logo} className="w-25" />
//                                             <h2 className="m-0 mt-2"><b>INVOICE</b></h2>
//                                         </td>
//                                         <td className="text-end">
//                                             <h5 className="text-uppercase m-0"><b>Apna Organic Store</b></h5>
//                                             <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                             <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                             <p className="m-0">contact@apnaorganicstore.com</p>
//                                             <p className="m-0">1234567890</p>
//                                         </td>
//                                     </tr>
//                                 </table>
//                                 <div className="pb-4 pt-4">
//                                     <table className="invoice_header w-100">
//                                         <tr className="">
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Order Detail:</b></h5>
//                                                 <p className="m-0"><b>Invoice No:</b> #FAJ6EI2300006199</p>
//                                                 <p className="m-0"><b>Order Id:</b> #1212131</p>
//                                                 <p className="m-0"><b>Order Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>Invoice Date:</b> 24-09-2022</p>
//                                                 <p className="m-0"><b>GSTIN:</b> 23AAACX2827R1ZX</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Bill to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                             <td className="">
//                                                 <h5 className="text-uppercase m-0"><b>Ship to:</b></h5>
//                                                 <p className="m-0">Plot No. 45 Universal Tower ,2nd Floor,</p>
//                                                 <p className="m-0">Scheme 54 PU4, Indore, MP 452001</p>
//                                                 <p className="m-0">contact@apnaorganicstore.com</p>
//                                                 <p className="m-0">1234567890</p>
//                                             </td>
//                                         </tr>
//                                     </table>
//                                 </div>
//                                 <table className="table table-striped border">
//                                     <thead>
//                                         <tr>
//                                             <th className="center">Product</th>
//                                             <th>Qty</th>
//                                             <th>Gross Amount ₹</th>

//                                             <th className="right">Discounts/Coupons ₹</th>
//                                             <th className="center">Taxable Value ₹</th>
//                                             <th className="center">CGST ₹</th>
//                                             <th className="center">SGST/UTGST ₹</th>
//                                             <th className="right">Total ₹</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>OPPO K10 5G (Ocean Blue, 128 GB)</b><br />
//                                                 <small>CGST: 9.0 %</small><br />
//                                                 <small>SGST/UTGST: 9.0 %</small>
//                                             </td>
//                                             <td className="">1</td>
//                                             <td className="left">15999.00</td>
//                                             <td className="left">-1283.00</td>
//                                             <td className="left">12471.18</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">1122.40</td>
//                                             <td className="left">14716.00</td>
//                                         </tr>
//                                         <tr>
//                                             <td className="center"><b>Shipping And Packaging Charges</b>
//                                             </td>
//                                             <td className="">2</td>
//                                             <td className="left">99.00</td>
//                                             <td className="left">-70.00</td>
//                                             <td className="left">24.58</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">2.21</td>
//                                             <td className="left">29.00</td>
//                                         </tr>
//                                         <tr>
//                                             <th className="font-weight-bold"><b>Total</b></th>
//                                             <th className=""><b>2</b></th>
//                                             <th className=""><b>16098.00</b></th>
//                                             <th className=""><b>-1353.00</b></th>
//                                             <th className=""><b>12495.76</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>1124.61</b></th>
//                                             <th className=""><b>14745.00</b></th>
//                                         </tr>
//                                         <tr>
//                                             <th colSpan={'7'} className="font-weight-bold text-end p-4"><h5><b>Grand Total</b></h5></th>
//                                             <th className="pt-4 pb-4"><h5><b>14745.00</b></h5></th>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                                 <div className="col-md-12 text-end">
//                                     <h5>Apna Organic Store</h5>
//                                     <img src={logo} className='w-25 p-4 pt-1 pb-1 px-1' />
//                                     <h5>Authorised Signatury</h5>
//                                 </div>
//                                 <div className="col-md-12 border-top p-2">
//                                     <p><b>Returns Policy:</b> At Apna Organic we try to deliver perfectly each and every time. But in the off-chance that you need to return the item, please do so with the <b>original Brand box/price
//                                         tag, original packing and invoice</b> without which it will be really difficult for us to act on your request. Please help us in helping you. Terms and conditions apply.</p>
//                                     <p>The goods sold as are intended for end user consumption and not for re-sale.</p>

//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
//             {({blob, url, loading, error }) =>
//                 loading ? 'Loading document...' : 'Download now!'
//             }
//         </PDFDownloadLink> */}
//     </div>
// );
// const blob = pdf(MyDoc).toBlob();
export default Invoice;
