import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FileInput from "./FileInput";
let old_number=1;
function ImageCropper({image, onCropDone, onCropCancel }) {

console.log("++++")
console.log(image)

  const [imagee, setImagee] = useState("");
  // console.log("0000")
  //  console.log(Img)
  const onImageSelected = (selectedImg) => {
    let IMG=selectedImg.dataurl
    if(IMG!="" &&  old_number==1){
      setShow(true);
      old_number++;
    }
    setImagee(IMG)

    setimageName(selectedImg.imageName)
    setCurrentPage("crop-img");
  };
 
const handleClose=()=>{

}
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [imageName, setimageName] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(false);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [show, setShow] = useState(false);
  let [count, setCount] = useState(1);
  function incrementCount() {
    if (zoom === count) {
      setZoom(true);

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
  // const handleClose = () => {
  //   setShow(false)
  //   old_number=1;
  //   // image="";
  //   setImagee("")
  //   setimageName("")
  //   // console.log("image")
  //   // console.log(image)
  // };

  // const handleShow = () => setShow(true);
 
 


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
          
          <Button variant="secondary"  onClick={()=>{handleClose()}}>
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
  
      <span className="plus_icon"><FileInput setImagee={imagee}  onImageSelected={onImageSelected} setimageName={setimageName}/> </span>
     
        </>
     :<FileInput setImagee={imagee} onImageSelected={onImageSelected}   setimageName={setimageName}/>}
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