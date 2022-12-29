import React,{useEffect, useState} from 'react';
import Input from "../common/input";
import DataTable from "react-data-table-component";
import MainButton from "../common/button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from "react-bootstrap/Form";
import axios from 'axios';

const CustomerReport = () => {
    const columns = [
      {
        name: "ID",
        selector: (row) => row.user_id,
        sortable: true,
        width:"70px"

      },
        {
          name: "First Name",
          selector: (row) => row.first_name,
          sortable: true,
          width:"170px"

        },
        {
          name: "Last Name",
          selector: (row) => row.last_name,
          sortable: true,
          width: "150px",
        },
       
      
     
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
            width:"170px"

          }, 
          {
            name: "Order",
            selector: (row) => row.order_count,
            sortable: true,
            width:"100px"
          },
          {
            name: "Created On",
            selector: (row) => row.created_on,
            sortable: true,
            width:"150px"
  
            
          },
          {
            name: "Total Ammount",
            selector: (row) => row.total_amount,
            sortable: true,
            width:"130px"

          },
         
          {
            name: " Average Ammount",
            selector: (row) => row.avg_value,
            sortable: true,
            width:"130px"

          },
          {
            name: "Address",
            selector: (row) => row.address,
            sortable: true,
            width:"400px"
  
          },
        
       
      ];
    
      // const data = [
      //   {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   },
      //   {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   }, {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   }, {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   }, {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   }, {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   }, {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   }, {
      //     id: 1,
      //     name: "Newton",
      //     uname: "Nicolas Edison",
      //     lactive:"23 Sep,2022",
      //     signup:"21 Oct,2025",
      //     email:"newton@gmail1524/.com",
      //     order:"25",
      //     spend:"$250.2",
      //   },
      // ];
      const [filterchange,setFilterchange] = useState('')

      const [tableCoustomer, setGetTableCoustomer]= useState([])
      const [user,setUser]=useState([])
      const [apicall,setapicall]=useState(false)


      const TimeChange = (e)=>{
        setFilterchange(e.target.value)
        setUser(e.target.value)
        
        
              }
       
  const fetchData=()=>{

   console.log("user----"+user)
    axios.post(`${process.env.REACT_APP_BASEURL}/customers_report`
    ,
    {
      "user_search":user
  }
    ).then((response) => {
          console.log('coustomer data-all---'+JSON.stringify(response.data))
        
        // console.log('coustomer data'+JSON.stringify(response.data[0]))
 
          setGetTableCoustomer(response.data)
          setapicall(false)
    }).catch(function (error) {
      console.log(error);
    });

  }



  useEffect(() => {

    fetchData();
    }, [apicall]);

      
      const submitHandler=()=>{
       
        setapicall(true)
       
       }

       const OnReset =()=>{
    
        setUser("")
         setapicall(true)
        
         
          
     
        
       
       
    }

    return (
        <div>
              <h2>Customer Report</h2>
              {/* search bar */}
      <div className="card mt-3 p-3 ">
      <div className="row pb-3">
      <div className="col-md-3 col-sm-6 aos_input">
            {/* <Form.Select
              aria-label="Search by category"
              className="adminseacrh"
              placeholder="Search by category"
              onChange={TimeChange}
            >
              <option>Search by category</option>
              <option value="1">1 day</option>
              <option value="2">1 week</option>
              <option value="3">current month</option>
              <option value="4">last month</option>
              <option value="5">last 6  month</option>
              <option value="6">custom month</option>
              <option value="7">custom date</option>

            </Form.Select> */}
            <Form.Group className="mb-3" >
        
            <Form.Control type="text" placeholder="Search by name" onChange={TimeChange} value={user}/>
            </Form.Group>
          </div>
          {filterchange==='7'?
          <>
      <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        
        <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"date"} plchldr={"Search by date"} />
        </div>
        </>
        :filterchange==='6'? <div className="col-md-3 col-sm-6 aos_input">
        <Input type={"month"} plchldr={"Search by month"} />
        </div> : null}

        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Search"} btnclass={'button main_button'}  onClick={submitHandler} />
        </div>

        <div className="col-md-auto col-sm-6 aos_input">
        <MainButton btntext={"Reset"} btnclass={'button main_button'} type="reset" onClick={OnReset}/>
        </div>
        <div className="col-md-auto col-sm-6 aos_input">
        <DropdownButton id="dropdown-variant-success" title="Download" variant="button main_button">
      <Dropdown.Item href="#/action-1">Excel</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Pdf</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
        </div>
      </div>
       {/* datatable */}
   
       <DataTable
        columns={columns}
        data={tableCoustomer}
        pagination
        highlightOnHover
        pointerOnHover
        className={"table_body customerreport_table"}
      />
      </div>

        </div>
    );
}

export default CustomerReport;
