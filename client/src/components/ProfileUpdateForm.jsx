import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";

const districts = [
  { value: "thiruvananthapuram", label: "Thiruvananthapuram" },
  { value: "kollam", label: "Kollam" },
  { value: "pathanamthitta", label: "Pathanamthitta" },
  { value: "alappuzha", label: "Alappuzha" },
  { value: "kottayam", label: "Kottayam" },
  { value: "idukki", label: "Idukki" },
  { value: "ernakulam", label: "Ernakulam" },
  { value: "thrissur", label: "Thrissur" },
  { value: "palakkad", label: "Palakkad" },
  { value: "malappuram", label: "Malappuram" },
  { value: "kozhikode", label: "Kozhikode" },
  { value: "wayanad", label: "Wayanad" },
  { value: "kannur", label: "Kannur" },
  { value: "kasaragod", label: "Kasaragod" },
];

const panchayats = [
  { value: "adimaly", label: "Adimaly", district: "idukki" },
  { value: "alappuzha", label: "Alappuzha", district: "alappuzha" },
  { value: "amalapuram", label: "Amalapuram", district: "malappuram" },
  { value: "anchal", label: "Anchal", district: "kollam" },
  { value: "chavakkad", label: "Chavakkad", district: "thrissur" },
  { value: "chengannur", label: "Chengannur", district: "alappuzha" },
  { value: "cherthala", label: "Cherthala", district: "alappuzha" },
  { value: "edapally", label: "Edapally", district: "ernakulam" },
  { value: "kanjirappally", label: "Kanjirappally", district: "kottayam" },
  { value: "kannur", label: "Kannur", district: "kannur" },
  { value: "kasaragod", label: "Kasaragod", district: "kasaragod" },
  { value: "kattanam", label: "Kattanam", district: "alappuzha" },
  { value: "kochi", label: "Kochi", district: "ernakulam" },
  { value: "kollam", label: "Kollam", district: "kollam" },
  { value: "kottayam", label: "Kottayam", district: "kottayam" },
  { value: "kunnamkulam", label: "Kunnamkulam", district: "thrissur" },
  { value: "malappuram", label: "Malappuram", district: "malappuram" },
  { value: "mannar", label: "Mannar", district: "alappuzha" },
  { value: "maradu", label: "Maradu", district: "ernakulam" },
  { value: "muvattupuzha", label: "Muvattupuzha", district: "ernakulam" },
  { value: "neyyattinkara", label: "Neyyattinkara", district: "thiruvananthapuram" },
  { value: "north paravoor", label: "North Paravoor", district: "ernakulam" },
  { value: "ottapalam", label: "Ottapalam", district: "palakkad" },
  { value: "palakkad", label: "Palakkad", district: "palakkad" },
  { value: "pathanamthitta", label: "Pathanamthitta", district: "pathanamthitta" },
  { value: "perumbavoor", label: "Perumbavoor", district: "ernakulam" },
  { value: "piravom", label: "Piravom", district: "ernakulam" },
  { value: "punalur", label: "Punalur", district: "kollam" },
  { value: "sulthan bathery", label: "Sulthan Bathery", district: "wayanad" },
  { value: "taliparamba", label: "Taliparamba", district: "kasaragod" },
  { value: "thiruvalla", label: "Thiruvalla", district: "pathanamthitta" },
  { value: "thodupuzha", label: "Thodupuzha", district: "idukki" },
  { value: "thrikkakkara", label: "Thrikkakkara", district: "ernakulam" },
  { value: "thrissur", label: "Thrissur", district: "thrissur" },
  { value: "vadakara", label: "Vadakara", district: "kozhikode" },
  { value: "varkala", label: "Varkala", district: "thiruvananthapuram" },
  { value: "wayanad", label: "Wayanad", district: "wayanad" },
];

function ProfileUpdateForm({ handleCapture, handleInputChange, handleFileChange, formData, setFormData }) {

  const [selectedDistrictOption, setSelectedDistrictOption] = useState(
    districts.find((option) => option.value === formData.district) || null
  );

  const [filteredPanchayats, setFilteredPanchayats] = useState([]);
  const captureScreenshot = () => {
    const requiredFields = ["name", "dob", "phone", "email", "district", "panchayat"];
  
    const allFilled = requiredFields.every((field) => {
      const value = formData[field];
      return typeof value === "string" ? value.trim() !== "" : Boolean(value);
    });
  
    if (!allFilled) {
      alert("Please fill all required fields before submitting.");
      console.log("Validation failed: ", formData);
      return;
    }
  
    handleCapture();
    setFormData({
      name: "",
    dob: "",
    phone: "",
    email: "",
    district: "",
    panchayat: "",
    })
  };
  
  useEffect(() => {
    if (selectedDistrictOption) {
      const filtered = panchayats.filter(
        (panchayat) => panchayat.district === selectedDistrictOption.value
      );
      setFilteredPanchayats(filtered);

      if (!filtered.some(p => p.value === formData.panchayat)) {
        setFormData((prev) => ({ ...prev, panchayat: "" }));
      }
    } else {
      setFilteredPanchayats([]);
      setFormData((prev) => ({ ...prev, panchayat: "" }));
    }
  }, [selectedDistrictOption, formData.panchayat, setFormData]);


  return (
    <Form className=" py-md-1  px-md-0  bg-white">


      <Row className="mb-2">
        <Form.Group as={Col} xs={12} controlId="formFullName" className="p-2">
          <Form.Label className="fw-bolder text-dark mb-1">
            Your Full Name <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="border-success"
          />
        </Form.Group>
      </Row>

      <Row className="mb-2 ">
        <Form.Group as={Col} xs={12} md={6} controlId="formAddImages" className="mb-3 p-2 mb-md-0">
          <Form.Label className="fw-bolder text-dark mb-1">
            Add Your Images <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border-success"

          />
          <Form.Text className="text-danger fs-6 mt-2">
            Less than 1 Mb file
          </Form.Text>
        </Form.Group>

        <Form.Group as={Col} xs={12} md={6} controlId="formDateOfBirth" className="p-2">
          <Form.Label className="fw-bolder text-dark mb-1">
            Date of Birth <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="border-success"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-1">
        <Form.Group as={Col} xs={12} controlId="formPhoneNumber" className="p-2">
          <Form.Label className="fw-bolder text-dark mb-1">
            Phone Number<span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="tel"
            pattern="[0-9]{10}"
            maxLength={10}
            placeholder="6282600896"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="border-success "
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-2">
        <Form.Group as={Col} xs={12} controlId="formEmail" className="p-2">
          <Form.Label className="fw-bolder text-dark mb-1">
            Email Id <span className="text-danger"> *</span>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="border-success"
            required
          />
        </Form.Group>
      </Row>

      <Row className="mb-2">
        <Form.Group as={Col} xs={12} md={12} controlId="formDistrict" className="mb-3 mb-md-0 p-2">
          <Form.Label className="fw-bolder text-dark mb-1">
            District <span className="text-danger"> *</span>
          </Form.Label>
          <Select
            name="district"
            required
            options={districts}
            value={selectedDistrictOption} // Use local state for value
            onChange={(selectedOption) => {
              setSelectedDistrictOption(selectedOption); // Update local state
              setFormData((prev) => ({ ...prev, district: selectedOption ? selectedOption.value : '' }));
            }}
            placeholder="Select a district..."
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: '#28a745', // Bootstrap success color
                '&:hover': {
                  borderColor: '#28a745',
                },
                boxShadow: 'none',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? '#e2ffed' : 'white',
                color: 'black',
              }),
            }}
          />
        </Form.Group>

        <Form.Group as={Col} xs={12} md={12} controlId="formPanchayat" className="p-2">
          <Form.Label className="fw-bolder text-dark mb-1">
            Panchayat <span className="text-danger"> *</span>
          </Form.Label>
          <Select
            name="panchayat"
            required
            options={filteredPanchayats}
            value={filteredPanchayats.find((option) => option.value === formData.panchayat) || null}
            onChange={(selectedOption) => {
              setFormData((prev) => ({ ...prev, panchayat: selectedOption ? selectedOption.value : '' }));
            }}
            placeholder="Select a panchayat..."
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: '#28a745',
                '&:hover': {
                  borderColor: '#28a745',
                },
                boxShadow: 'none',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? '#e2ffed' : 'white',
                color: 'black',
              }),
            }}
            isDisabled={!selectedDistrictOption} // Disable panchayat until district is selected
          />
        </Form.Group>
      </Row>

      <div className="d-grid gap-2 mt-2">
        <Button variant="success" size="lg" onClick={captureScreenshot} className="fw-bold py-2">
          Submit & Download
        </Button>
      </div>
    </Form>
  );
}

export default ProfileUpdateForm;