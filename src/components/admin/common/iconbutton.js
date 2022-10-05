import React from 'react';

const Iconbutton = (props) => {
    return (
        <div className='iconbtnbox'>
               <button type={props.type}  name={props.name} value={props.value} onClick={props.onClick} className={props.btnclass}>
               {props.Iconname}
               {props.btntext}</button>
        </div>
    );
}

export default Iconbutton;
Iconbutton.defaultProps = {
    btnclass: 'adminmainbutton iconbtn btn-success text-light btn px-5 py-2',
    name: '',
    onClick: {},
    type:'',
    value:'',
    plchldr:'',
    btntext:'',
   
  };