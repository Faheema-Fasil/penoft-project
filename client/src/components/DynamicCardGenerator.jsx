import React, { useState, useEffect } from "react";
import cardbg from "../assets/2.png";
import { Button } from "react-bootstrap";

function DynamicCardGenerator({ qrUrl, captureRef, formData, uniqueID }) {
  const today = new Date().toLocaleDateString();
  const [position, setPosition] = useState({ x: 25, y: -110 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  // Ensure image is preloaded for capture
  useEffect(() => {
    if (formData.imageBase64) {
      const img = new Image();
      img.src = formData.imageBase64;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => console.error("Failed to load profile image");
    }
  }, [formData.imageBase64]);

  const handleDragStart = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    setDragStart({ x: clientX - position.x, y: clientY - position.y });
  };

  const handleDrag = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    if (clientX === 0 && clientY === 0) return;
    setPosition({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y,
    });
  };

  const handleDragEnd = () => {
    // Optional: Add boundary checks to keep image within card
    setPosition((prev) => ({
      x: Math.max(10, Math.min(prev.x, 300)), // Adjust based on card width
      y: Math.max(-150, Math.min(prev.y, 50)), // Adjust based on card height
    }));
  };

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div className="card-outer mt-3">
      <div className="card-inner p-3" ref={captureRef}>
        <img src={cardbg} className="card-bg" alt="Card background" />

        <div className="id-badge">ID {uniqueID}</div>

        <div className="profile-details">
         
        <img
  src={
    imageLoaded && formData.imageBase64
      ? formData.imageBase64
      : "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png"
  }
  alt="Profile"
  className="profile-pic"
  onLoad={() => {
    if (formData.imageBase64) setImageLoaded(true);
  }}
  onDragStart={handleDragStart}
  onDrag={handleDrag}
  onDragEnd={handleDragEnd}
  onTouchStart={handleDragStart}
  onTouchMove={handleDrag}
  onTouchEnd={handleDragEnd}
  style={{
    position: "absolute",
    left: `${position.x}px`,
    top: `${position.y}px`,
    cursor: "move",
    touchAction: "none",
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
      </div>
      <Button className="preview-btn btn-success">Live Preview</Button>
      <div className="drag-hint">Drag and adjust image position inside box</div>
    </div>
  );
}

export default DynamicCardGenerator;