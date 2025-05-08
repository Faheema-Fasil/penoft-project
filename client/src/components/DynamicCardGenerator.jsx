import React from "react";
import cardbg from "../assets/cardbg.jpeg";
import { Button } from "react-bootstrap";

function DynamicCardGenerator({ qrUrl, generateQR, captureRef, formData, handleChange }) {
  const today = new Date().toLocaleDateString();

  const isFormFilled = Object.values(formData).every((value) => value !== "");

  React.useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <div className="card-outer border border-success" style={{
      borderRadius: "10px",
    }}>
      <div className="card-inner" ref={captureRef}>
        <img src={cardbg} className="card-bg" alt="" />

        <div className="id-badge">ID TVM0489</div>

        <div className="profile-details">
          <img
            src={formData.image ? URL.createObjectURL(formData.image) : "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png"}
            alt="Profile"
            className="profile-pic"
          />
          <div className="details-text">
            <p className="name">{formData.name || "YOUR NAME"}</p>
            <p className="info">Panchayat: {formData.panchayath || "Panchayat name"}</p>
            <p className="info">{formData.district || "District"} District</p>
          </div>
        </div>

        <div className="qr-block">
          {qrUrl ? (
            <>
              <img src={qrUrl} alt="QR Code" className="qr-img" />
              <p className="issue-date">Self Issued: {today}</p>
            </>
          ) : (
            <Button onClick={generateQR} className="qr-btn" disabled={!isFormFilled}>
              {isFormFilled ? "Create QR" : "Please fill all fields"}
            </Button>
          )}
        </div>
      </div>

      <Button className="preview-btn" size="lg" onClick={handleChange}>
        Live Preview
      </Button>
      <div className="drag-hint">Drag and adjust image position inside box</div>
    </div>
  );
}

export default DynamicCardGenerator;
