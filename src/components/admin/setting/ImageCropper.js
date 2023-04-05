import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
function ImageCropper({ image, onCropDone, onCropCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);
  const [aspectRatio, setAspectRatio] = useState(4 / 3);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onAspectRatioChange = (event) => {
    setAspectRatio(event.target.value);
  };

  return (
      <>
      
      <Modal show={show} onHide={handleClose} size="md" className="h-100"  aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="cropper ">
        <div className="container">
          <Cropper
            image={image}
            aspect={aspectRatio}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={{
              containerStyle: {
                width: "40%",
                height: "70%",
                marginTop:"10px",
                marginLeft:"160px",
                backgroundColor: "#fff",
              },
            }}
          />
        </div>


      </div>
     
     <div className="action-btns" >
        <div className="aspect-ratios" style={{ marginLeft:"30%" ,marginTop:"30px"}} onChange={onAspectRatioChange}>
        <Form.Check inline type="radio"  value={1 / 1} name="ratio" label="1:1" />
        <Form.Check inline type="radio"  value={1 / 2} name="ratio" label="1:2" />
        <Form.Check inline type="radio" value={1 / 3} name="ratio" label="1:3" />
        <Form.Check inline type="radio" value={1 / 4} name="ratio" label="1:4" />

          {/* <input type="radio" value={1 / 1} name="ratio" /> 1:1 */}
          {/* <input type="radio" value={1 / 2} name="ratio" /> 1:2
          <input type="radio" value={1 / 3} name="ratio" /> 1:3
          <input type="radio" value={1 / 4} name="ratio" /> 1:4 */}
        </div>

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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary"  onClick={() => {
            onCropDone(croppedArea);
          }}>
            Done
          </Button>
        </Modal.Footer>
      </Modal> 
      <div style={{marginTop:"30px"}}>
      <Button variant="primary"  onClick={handleShow}>
        Crop Image
      </Button>
      </div>
      
    </>
  );
}

export default ImageCropper;