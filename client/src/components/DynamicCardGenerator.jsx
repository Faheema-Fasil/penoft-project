import React, { useState } from "react";
import cardbg from "../assets/2.png";
import { Button } from "react-bootstrap";

function DynamicCardGenerator({ qrUrl, captureRef, formData, uniqueID }) {
  const today = new Date().toLocaleDateString();
  const [position, setPosition] = useState({ x: 25, y: -110 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleDragStart = (e) => {
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleDrag = (e) => {
    if (e.clientX === 0 && e.clientY === 0) return; 
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };
  React.useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div className="card-outer  mt-3 " >
      <div className="card-inner p-3" ref={captureRef}>
        <img src={cardbg} className="card-bg " alt="" />

        <div className="id-badge">ID {uniqueID}</div>

        <div className="profile-details">
          <img
            src={
              formData.imageBase64 ||
              "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png"
            }
            alt="Profile"
            className="profile-pic"
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            style={{
              position: "absolute",
              left: `${position.x}px`,
              top: `${position.y}px`,
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              cursor: "move",
            }}
          />
          <div className="details-text">
            <p className="name">{formData.name || "YOUR NAME"}</p>
            <p className="info">Panchayat: {formData.panchayat || "Panchayat name"}</p>
            <p className="info">{formData.district || "District"} District</p>
          </div>
        </div>

        <div className="qr-block">
          {qrUrl && (
            <>
              <img src={qrUrl} alt="QR Code" className="qr-img" />
              <p className="issue-date">Self Issued: {today}</p>
            </>
          )}
        </div>
        <Button className="preview-btn btn-success">Live Preview</Button>
      </div>

      <div className="drag-hint">Drag and adjust image position inside box</div>
    </div>
  );
}

export default DynamicCardGenerator;