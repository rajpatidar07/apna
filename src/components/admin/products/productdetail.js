import React from 'react';
import MainButton from '../common/button';

const Productdetail = () => {
    return (
        <div>
             <h2>Product Detail</h2>

             {/* deatil */}

             <div className='productdetail_page_box'>
<div className='productimg_box'>
<img src='https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg' className='productpicture'/>
</div>
<div className='product_detail_box'>
{/*  */}
<div className='product_upper_section'>
    <div className='productstatus'>
<h5 className='statuslabeltext'>Status:</h5>
<h5 className='statustext'>Status</h5>
    </div>

    <h2 className='productname'>PRODUCT NAME</h2>

    <div className='productstatus'>
<h5 className='statuslabeltext'>SKU:</h5>
<h5 className='statustext'>#1213</h5>
    </div>
</div>

{/*  */}

<div className='product_upper_section'>
    <h2>$14</h2>
    <div className='productquantity'>
<h4 className='statuslabeltext'>In Stock</h4>
<h4 className='statustext'>Quantity: 14</h4>
    </div>

    <div className='detailproduct'>
        dfsiefhidgrjkdrlejdsjm
    </div>
    </div>
{/*  */}
    <div className='product_upper_section'>
  
    <div className='productquantity'>
<h4 className='statuslabeltext'>Category</h4>
<h4 className='statustext'>Quantity</h4>
    </div>
    <div className='productquantity'>
<h4 className='statuslabeltext'>Category</h4>
<h4 className='statustext'>Quantity</h4>
    </div>
    <MainButton btntext={'Edit product'}/>
</div>
{/*  */}
</div>
             </div>
        </div>
    );
}

export default Productdetail;
