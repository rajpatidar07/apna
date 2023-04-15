import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FileInput from "./FileInput";
let old_number=1;
function ImageCropper({ image, onCropDone, onCropCancel }) {

  const [currentPage, setCurrentPage] = useState("choose-img");
  // const [image, setImage] = useState("");
  const [imageName, setimageName] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [show, setShow] = useState(true);
  let [count, setCount] = useState(1);
  function incrementCount() {
    console.log("++")
    if (zoom === count) {
      setZoom(true);
    console.log("++"+zoom)

    } else {
      count = count + 1;
      setCount(count);
      setZoom(false);
    }
  }
  /*<-----Decrement Functionality----> */
  const decrementCount = () => {
    if (count > 1) {
      setCount((count) => count - 1);
      setZoom(false);
    }
  };
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const onImageSelected = (selectedImg) => {
    if(image!="" ){
   
      setShow(true);
      // console.log("show")
      // console.log(show)
      // old_number++
    }
    // setImage(selectedImg.dataurl);
    setimageName(selectedImg.imageName)
    console.log(imageName)
    setCurrentPage("crop-img");
   
  };

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };

 
  return (
      <>
      
      <Modal show={show} onHide={handleClose} size="lg" className="h-100"  >
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="cropper ">
        <div className="container">
          <Cropper
            image={image}
            imageNamee={imageName}
            aspect={aspectRatio}
            crop={crop}
            zoom={count}
            onCropChange={setCrop}
            onClick={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: "40%",
                height: "70%",
                marginTop:"10px",
                marginLeft:"190px",
                backgroundColor: "#fff",
              },
            }}
          />
         

        </div>
      </div>
     
     <div className="action-btns" >
      {window.location.pathname==="/product"?
        <div className="aspect-ratios" style={{ marginLeft:"30%" ,marginTop:"30px"}} onChange={onAspectRatioChange}>
        <Form.Check inline type="radio"  value={1 / 1} name="ratio" label="1:1" />
        <Form.Check inline type="radio"  value={3 / 2} name="ratio" label="3:2" />
          <Button variant="info" onClick={incrementCount} > +</Button>&nbsp;
          <Button variant="info" onClick={decrementCount} > -</Button>
        </div> 
       :
       <div className="aspect-ratios" style={{ marginLeft:"30%" ,marginTop:"30px"}} onChange={onAspectRatioChange}>
         <Form.Check inline type="radio"  value={1 / 1} name="ratio" label="1:1" />
       <Form.Check inline type="radio"  value={1 / 2} name="ratio" label="1:2" />
       <Form.Check inline type="radio" value={1 / 3} name="ratio" label="1:3" />
       <Form.Check inline type="radio" value={1 / 4} name="ratio" label="1:4" />
       <Button variant="info" onClick={incrementCount} > +</Button>
          <Button variant="info" onClick={decrementCount} > -</Button>
       </div>
     
          }
       
        {/* <button className="btn btn-outline" onClick={onCropCancel}>
          Cancel
        </button>

        <button
          className="btn"
          onClick={() => {
            onCropDone(croppedArea);
          }}
        >
          Done
        </button> */}
      </div> 
    
         
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={() => {
            onCropDone(croppedArea);
          }}>
            Done
          </Button>
        </Modal.Footer>
      </Modal> 
       <div className="imgprivew_box">
        {window.location.pathname==="/product"?
        <>
         <img
      src={
             "https://i2.wp.com/asvs.in/wp-content/uploads/2017/08/dummy.png?fit=399%2C275&ssl=1"
          }
      alt="apna_organic"
       width={100}
       height={"100%"}
       /> 
  
      <span className="plus_icon"><FileInput setImage={image}  onImageSelected={onImageSelected} setimageName={setimageName}/> </span>
     
        </>
     :<FileInput setImage={image}  onImageSelected={onImageSelected} setimageName={setimageName}/>}
      </div>
     
      {/* <div style={{marginTop:"30px"}}>
      <Button variant="primary"  onClick={handleShow}>
        Crop Image
      </Button>
      </div> */}
      
    </>
  );
}

export default ImageCropper;