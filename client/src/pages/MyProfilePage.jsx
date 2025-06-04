import React, { useRef, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap"; // Import Container, Row, Col, Card
import ProfileUpdateForm from "../components/ProfileUpdateForm"; // Assuming this path is correct
import DynamicCardGenerator from "../components/DynamicCardGenerator"; // Assuming this path is correct
import { ProfileProvider } from "../reactContext/CardGenator"; // Assuming this path is correct
import html2canvas from "html2canvas";
import QrCode from "qrcode";

function MyProfilePage() {
  const [formData, setFormData] = useState({
    name: "",
    image: null, // Changed to null to properly handle file object
    dob: "",
    phone: "",
    email: "",
    district: "",
    panchayat: "", // Corrected typo from 'panchayath' to 'panchayat' for consistency
  });

  // State for selected district and filtered panchayats for ProfileUpdateForm
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
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: 2, // sharper image
    });
    const dataURL = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "card.png";
    link.click();
  } catch (error) {
    console.error("Capture failed:", error);
  }
};

  

  const generateQR = async () => {
    try {
      if (!formData.name || !formData.email || !formData.phone) {
        alert("Please fill Name, Email, and Phone to generate QR code.");
        return;
      }
  
      // Create a clone and remove file/blob type fields
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
      console.log("QR Code generated successfully!");
    } catch (err) {
      console.error("QR Code generation failed:", err);
      alert("Failed to generate QR code. Please check your data.");
    }
  };
  

  return (
    <ProfileProvider>
      <Container fluid className="  p-md-2 border rounded border-success w-100"> {/* Added padding, light background, min-vh-100 */}
        <Row className="justify-content-center g-5"> {/* Use Row for layout, justify-content-center to center content, g-4 for gutter */}
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
            <Card className="d-flex justify-content-lg-center  border-0 mt-5"> {/* Added Card, padding, shadow, and h-100 for equal height */}
              <Card.Body className="">
                <DynamicCardGenerator
                  qrUrl={qrUrl}
                  isFormFilled={isFormFilled}
                  handleCapture={handleCapture} // This handleCapture is for the card's download button
                  captureRef={captureRef}
                  generateQR={generateQR}
                  formData={formData}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </ProfileProvider>
  );
}

export default MyProfilePage;
