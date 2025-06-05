import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ProfileUpdateForm from "../components/ProfileUpdateForm";
import DynamicCardGenerator from "../components/DynamicCardGenerator";
import { ProfileProvider } from "../reactContext/CardGenator";
import html2canvas from "html2canvas";
import QrCode from "qrcode";
import { toast } from "react-toastify";

import { fetchData, postData } from "../Api/service";
import API from "../Api/axios";

function MyProfilePage() {
  const [uniqueID, setUniqueID] = useState();
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    dob: "",
    phone: "",
    email: "",
    district: "",
    panchayat: "",
    category: "",
    gender: "",
  });

  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [filteredPanchayats, setFilteredPanchayats] = useState([]);
  const generateId = async () => {
    const response = await fetchData({ endpoint: "api/profiles/id" });
    console.log(response);
    setUniqueID(response.data.id);
  };
  useEffect(() => {
    generateId();
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    console.log("Form data on submit:", formData);
    setFilteredPanchayats("");
  };
  const isFormFilled = Object.values(formData).every((value) => value !== "");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [qrUrl, setQrUrl] = useState("");
  const captureRef = useRef(null);

  const handleCapture = async () => {
    const element = captureRef.current;
    if (!element) {
      console.error("Element to capture not found.");
      return;
    }

    try {
      const qrData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        panchayath: formData.panchayath,
        district: formData.district,
      };
      const text = JSON.stringify(qrData); // Only include safe fields
      const url = await QrCode.toDataURL(text, { errorCorrectionLevel: "H" });
      setQrUrl(url);
      const canvas = await html2canvas(element, {
        useCORS: true,
        scale: 2, // sharper image
      });
      const dataURL = canvas.toDataURL("image/png");
      const response = await fetch(dataURL);
      const imageBlob = await response.blob();
      const link = document.createElement("a");
      link.href = dataURL;
      const formDatas = new FormData();
      formDatas.append("id", uniqueID);
      formDatas.append("name", formData.name);
      formDatas.append("dob", formData.dob);
      formDatas.append("phone", formData.phone);
      formDatas.append("email", formData.email);
      formDatas.append("district", formData.district);
      formDatas.append("panchayat", formData.panchayat);
      formDatas.append("image", imageBlob, "card.png");
      formDatas.append("category", formData.category);
      formDatas.append("gender", formData.gender);
      formDatas.append("qrcode", url);

      const apiResponse = await postData({ endpoint: "api/profiles", data: formDatas });
      console.log(apiResponse);
      if (response.status == 200) {
        toast.success("card succssfully send to your email id");
        generateId();
      }

      link.download = "card.png";
      link.click();
    } catch (error) {
      console.error("Capture failed:", error);
      toast.error("Capture failed");
    }
  };

  return (
    <ProfileProvider>
      <div fluid className="  p-md-2 border rounded border-success m-5">
        <Row className="d-flex align-content-center justify-content-center g-5">
          <Col xs={12} md={12} xl={6}>
            <Card className=" px-md-4  border-0">
              <Card.Body >
                <ProfileUpdateForm
                  isFormFilled={isFormFilled}
                  handleCapture={handleCapture}
                  handleChange={handleChange}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  formData={formData}
                  setFormData={setFormData}
                  districts={[]}
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  filteredPanchayats={filteredPanchayats}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={12} xl={6}>
            <Card className="d-flex justify-content-sm-center   border-0 mt-5">
              <Card.Body className="">
                <DynamicCardGenerator
                  qrUrl={qrUrl}
                  isFormFilled={isFormFilled}
                  handleCapture={handleCapture}
                  captureRef={captureRef}
                  uniqueID={uniqueID}
                  formData={formData}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </ProfileProvider>
  );
}

export default MyProfilePage;