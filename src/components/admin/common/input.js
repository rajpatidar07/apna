import React from 'react';

const Input = (props) => {
    return (
        <div>
            <input type={props.type} placeholder={props.plchldr} name={props.name} value={props.value} onChange={props.onChange} className={props.inputclass}/>
        </div>
    );
}

export default Input;
Input.defaultProps = {
    inputclass: 'adminsideinput input-lg px-5 py-3',
    name: '',
    onChange: {},
    type:'',
    value:'',
    plchldr:''
  };
  