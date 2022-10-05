import React from "react";
import Input from "./common/input";
import { AiFillDelete,AiFillEdit } from 'react-icons/ai';
import DataTable from 'react-data-table-component';
import MainButton from "./common/button";
import { navigate, useNavigate } from "react-router-dom";


const columns = [
  {
      name: 'SKU',
      selector: row => row.title,
      sortable:true,
  },
  {
    name: '#',
    cell: row => <img height="70px" width="65px" alt={row.name} src={'https://images.pexels.com/photos/12547195/pexels-photo-12547195.jpeg?cs=srgb&dl=pexels-fidan-nazim-qizi-12547195.jpg&fm=jpg'} style={{borderRadius:50, paddingTop:10, paddingBottom:10}} onClick={handleClick}/>,
 
},
  {
      name: 'PRODUCT NAME',
      selector: row => row.year,
      sortable:true,
  },
  {
    name: 'CATEGORY',
    selector: row => row.year,
    sortable:true,
},
{
  name: 'PRICE',
  selector: row => row.year,
  sortable:true,
},
{
  name: 'DISCOUNT',
  selector: row => row.year,
  sortable:true,
},
{
  name: 'STATUS',
  selector: row => row.year,
  sortable:true,

},
{
  name: 'ACTION',
  selector: row => <div className={"actioncolimn"}>
  <AiFillEdit className="w-75 p-0 m-0 editiconn"/>
   <AiFillDelete className="w-75 p-0 m-0 editiconn"/></div>,
},
];

const data = [
  {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
  },
  {
      id: 2,
      title: 'Ghostbusters',
      year: '1984',
  },
]
const handleClick = ()=>{
 
}
function Product() {
  return (
    <div className="App">
      <h2>Products</h2>
     
     {/* search bar */}
     <div className="product_page_searchbox bg-gray">
      <Input type={'text'} plchldr={'Search by product name'}/>
      <Input type={'text'} plchldr={'Search by category'}/> 
      <Input type={'text'} plchldr={'Search by status'}/>
     </div>

     {/* upload */}

     <div className="product_page_uploadbox">
      <MainButton  btntext={'Upload'} />
      <MainButton  btntext={'Add'}/>

     </div>

     {/* datatable */}

     <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            pointerOnHover
        />
    </div>
  );
}

export default Product;
