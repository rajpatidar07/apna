import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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

      <div className="cropper ">
        <div>
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
                width: "30%",
                height: "30%",
                // marginTop:"30%",
                // marginLeft:"50px",
                backgroundColor: "#fff",
              },
            }}
          />
        </div>


      </div>
      <div className="action-btns " >
        <div className="aspect-ratios" onChange={onAspectRatioChange}>
          <input type="radio" value={1 / 1} name="ratio" /> 1:1
          <input type="radio" value={1 / 2} name="ratio" /> 1:2
          <input type="radio" value={1 / 3} name="ratio" /> 1:3
          <input type="radio" value={1 / 4} name="ratio" /> 1:4
        </div>

        <button className="btn btn-outline" onClick={onCropCancel}>
          Cancel
        </button>

        <button
          className="btn"
          onClick={() => {
            onCropDone(croppedArea);
          }}
        >
          Done
        </button>
      </div>
    </>
  );
}

export default ImageCropper;