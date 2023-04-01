import React, { useRef } from "react";
import { Form } from "react-bootstrap";
function FileInput({ onImageSelected }) {
  const inputRef = useRef();
  const handleOnChange = (event) => {
    if (event.target.files[0].name && event.target.files.length > 0) {
      const reader = new FileReader();
      const image_name = event.target.files[0].name;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function (e) {
        onImageSelected({ "dataurl": reader.result, "imageName": image_name });
      };
    }
  };


  return (
    <div>
      <Form.Control
        multiple
        className={"img_add_button"}
        onChange={handleOnChange}
        type="file"
        placeholder="Shop_logo"
        name={"img_64"}
        ref={inputRef}
      />
      <span className="plus_icon"> + </span>

    </div>
  );
}

export default FileInput;