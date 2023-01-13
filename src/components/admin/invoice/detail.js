import React from "react";
import axios from "axios";
import { useState,useEffect} from "react";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';


const Invoice = () => {
    let invoice_no=localStorage.getItem("invoice_no")
    let invoiceid=localStorage.getItem("invoiceid")
    const[invoicedetails,setInvoiceDetails]=useState([]);
    const[pdetails,setpDetails]=useState([]);

    // const total=(invoicedetails.reduce((total,price)=>total = total+price , 0 ));
    useEffect(() => {
            axios
              .get(`${process.env.REACT_APP_BASEURL}/invoice_details?invoice_no=${invoice_no}`)
              .then((response) => {
                // let data = response.data;
                setInvoiceDetails(response.data);
                setpDetails(response.data.product_types)
              });
      }, []);
      var qty=0;
      var mrpTotal=0;
      var disCountTotal=0;
      var taxable_value_total=0
      var taxTotal=0;
      var salePrice_total=0;
      var totalGSt=0;
      var totalCGST=0;
      var totalSGST=0;
      var GrandTotal=0;










     function printDocument() {
    const input = document.getElementById('container1');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const unit = "pt";
        const size = "A2"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const pdf = new jsPDF(orientation, unit, size);
      
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("Invoice.pdf");
      });
    }


    return (
        <>
        {/* <Document >
            <Page size="A4" style={''}> */}
                <div className="container" id="container1">
                    <div className="invoice">
                        <div className="card">
                            <div className="card-body">
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
                                                <tbody>
                                                <tr className="">
                                                    <td className="">
                                                        <h5 className="text-uppercase m-0"><b>Order Detail:</b></h5>
                                                        <p className="m-0"><b>Invoice No:</b>{invoicedetails.invoice_no}</p>
                                                       
                                                        <p className="m-0"><b>Order Id:</b> {invoicedetails.id}</p>
                                                        <p className="m-0"><b>Order Date:</b>{invoicedetails.order_date}</p>
                                                        <p className="m-0"><b>Invoice Date:</b> {invoicedetails.invoice_date}</p>
                                                        {/* <p className="m-0"><b>GSTIN:</b> {invoicedetails.cgst}</p> */}
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
                                                </tbody>
                                            </table>
                                          
                                            
                                        </div>
                                        <table className="table table-striped border">
                                            <thead>
                                                <tr>
                                                    <th className="center">Product</th>
                                                    
                                                    <th> ₹ MRP  </th>
                                                    <th>  ₹ Discount (10%)</th>

                                                    <th className="center">₹ Taxable Price </th>
                                                    <th className="center"> ₹ Tax </th>
                                                    <th>Qty</th>
                                                    <th className="right">₹ Sale Price </th>
                                            
                                                    <th className="right">₹  Total amount </th>
                                                </tr>
                                            </thead>
                                           
                                            <tbody>
                                         
                                                 {(pdetails).map((invodetails)=>{
                                                invodetails.discount = '0' 
                                                let discont=(invodetails.mrp)*10/100;
                                                let taxeble_price=  (invodetails.mrp) -(discont)
                                                 let tax= taxeble_price *(Number(invodetails.gst)+Number(invodetails.cgst)+Number(invodetails.sgst))/100;
                                                 let salePrice=taxeble_price+tax
                                                 let totalAmmount=(parseInt(invodetails.quantity)*(salePrice)).toFixed(2)
                                                 qty += Number(invodetails.quantity);
                                                 mrpTotal +=Number(invodetails.mrp)
                                                 disCountTotal +=Number(discont)
                                                 taxable_value_total +=taxeble_price
                                                 taxTotal += tax
                                                 salePrice_total +=salePrice
                                                 totalGSt += Number(invodetails.gst)
                                                 totalCGST += Number(invodetails.cgst)
                                                 totalSGST += Number(invodetails.sgst)
                                                 GrandTotal +=  Number(totalAmmount)
                                                


                                                    
                                             return(
                                               
                                                <tr>
                                                    
                                                <td className="center"><b> {invodetails.product_title_name}</b><br />
                                                    
                                                     <small>GST: {invodetails.gst} %</small><br />
                                                    <small>CGST: {invodetails.cgst} %</small><br />
                                                    <small>SGST: {invodetails.sgst} %</small>
                                                    
                                                </td>
                                                
                                                <td className="left">
                                                     {parseInt(invodetails.mrp)}
                                                    
                                                </td>
                                                <td className="left">
                                                    ₹ {discont.toFixed(2)} <br/>
                                                 
                                                    </td>
                                                <td className="left">
                                                    ₹ {taxeble_price.toFixed(2)} <br/>
                                                 
                                                    </td>
                                                    <td className="left">
                                                    ₹ {tax.toFixed(2)} 
                                                 
                                                    </td>
                                                    <td className="">{invodetails.quantity}</td>
                                              <td className="left">{salePrice.toFixed(2)}</td>
                                            
                                                <td className="left">{totalAmmount}</td>
                                              
                                                
                                            </tr>

                                              )
                                            })} 
                                          
                                            {/* <tr>
                                                <td className="center"><b>Shipping And Packaging Charges</b>
                                                </td>
                                                <td className="">2</td>
                                                <td className="left">00</td>
                                                <td className="left">00</td>
                                                <td className="left">00</td>
                                                <td className="left">00</td>
                                                <td className="left">00</td>
                                                <td className="left">00</td>
                                            </tr> */}
                                           
                                            <tr>
                                                <th className="font-weight-bold"><b>Total</b></th>
                                                
                                             
                                                <th className=""><b> ₹ {mrpTotal} </b></th>
                                                <th className=""><b>₹ {disCountTotal} </b></th>

                                                <th className=""><b> ₹ {((taxable_value_total).toFixed(2)) } </b></th>
                                                <th className=""><b> ₹ {((taxTotal).toFixed(2)) } </b></th>
                                                <th className=""><b> ₹ {qty}</b></th>
                                                <th className=""><b> ₹ {(salePrice_total).toFixed(2)}</b></th>
                                             
                                                <th className=""><b> ₹ {GrandTotal}</b></th>
                                            </tr>
                                              
                                            <tr>
                                                <th colSpan={'7'} className="font-weight-bold text-end p-4"><h5><b>Grand Total</b></h5></th>
                                                <th className="pt-4 pb-4"><h5><b> ₹ {GrandTotal}</b></h5></th>
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
                                   
                            </div>
                                  <div className="mb-5 m-auto">
                            <button onClick={()=> printDocument ()} className="btn btn-outline-success m-auto" >Print</button>
                         </div>
                        </div>
                    </div>
                </div>




{/* ----------------------------------------------------jjj ---------------------------------------------------------------*/}

               
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
