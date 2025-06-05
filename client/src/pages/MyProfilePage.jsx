import React, { useRef, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap"; 
import ProfileUpdateForm from "../components/ProfileUpdateForm"; 
import DynamicCardGenerator from "../components/DynamicCardGenerator"; 
import { ProfileProvider } from "../reactContext/CardGenator"; 
import html2canvas from "html2canvas";
import QrCode from "qrcode";
import { toast } from "react-toastify";

import { postData } from "../Api/service";

function MyProfilePage() {
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

  const handleChange = (e) => {
    e.preventDefault();
    console.log("Form data on submit:", formData);
    setFilteredPanchayats("")
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
      const url = await QrCode.toDataURL(text, { errorCorrectionLevel: 'H' });
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
      const formDatas = new FormData()
      formDatas.append("name", formData.name)
      formDatas.append("dob", formData.dob)
      formDatas.append("phone", formData.phone)
      formDatas.append("email", formData.email)
      formDatas.append("district", formData.district)
      formDatas.append("panchayat", formData.panchayat)
      formDatas.append("image", imageBlob, "card.png");
      formDatas.append("category", formData.category)
      formDatas.append("gender", formData.gender)
      formDatas.append("qrcode",url)

      const apiResponse = await postData({ endpoint: "api/profiles", data: formDatas })
      console.log(apiResponse);
      toast.success("card succssfully send to your email id")

      // link.download = "card.png";
      // link.click();
    } catch (error) {
      console.error("Capture failed:", error);
      toast.error("Capture failed")
    }
  };



 


  return (
    <ProfileProvider>
      <div fluid className="  p-md-2 border rounded border-success m-5"> {/* Added padding, light background, min-vh-100 */}
        <Row className="d-flex align-content-center justify-content-center g-5"> {/* Use Row for layout, justify-content-center to center content, g-4 for gutter */}
          {/* Profile Update Form Column */}
          <Col xs={12} lg={6}> {/* Full width on mobile, half width on large screens */}
            <Card className=" p-md-2  border-0"> {/* Added Card, padding, shadow, and h-100 for equal height */}
              <Card.Body>
                <ProfileUpdateForm
                  isFormFilled={isFormFilled}
                  handleCapture={handleCapture} // This handleCapture is for the form's submit button
                  handleChange={handleChange}
                  handleInputChange={handleInputChange}
                  handleFileChange={handleFileChange}
                  formData={formData}
                  setFormData={setFormData}
                  // Pass props for district and panchayat
                  districts={[]} // Replace with your actual districts data
                  selectedDistrict={selectedDistrict}
                  setSelectedDistrict={setSelectedDistrict}
                  filteredPanchayats={filteredPanchayats}
                />
              </Card.Body>
            </Card>
          </Col>

          {/* Dynamic Card Generator Column */}
          <Col xs={12} lg={6}> {/* Full width on mobile, half width on large screens */}
            <Card className="d-flex justify-content-lg-center   border-0 mt-5"> {/* Added Card, padding, shadow, and h-100 for equal height */}
              <Card.Body className="">
                <DynamicCardGenerator
                  qrUrl={qrUrl}
                  isFormFilled={isFormFilled}
                  handleCapture={handleCapture} // This handleCapture is for the card's download button
                  captureRef={captureRef}

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
