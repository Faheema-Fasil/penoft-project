import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Select from "react-select";
import { fetchData } from "../Api/service";
import { toast } from "react-toastify";

const category = [
  { label: "cat1", value: "cat1" },
  { label: "cat2", value: "cat2" },
  { label: "cat3", value: "cat3" },
];
const gender = [
  { label: "women", value: "women" },
  { label: "men", value: "men" },
  { label: "other", value: "other" },
];

function ProfileUpdateForm({ handleCapture, handleInputChange, handleFileChange, formData, setFormData }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [locationData, setLocationData] = useState([]);
  const [key, setKey] = useState(Date.now());

  const fetchLocationData = async () => {
    const locationResponse = await fetchData({ endpoint: "/api/locations" });
    if (locationResponse.status === 200) {
      setLocationData(locationResponse);
      console.log(locationResponse);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);
  const districts = locationData?.data?.map((item) => ({
    value: item.district,
    label: item.district,
  }));
  console.log(districts);

  const [selectedDistrictOption, setSelectedDistrictOption] = useState(
    districts?.find((option) => option.value === formData.district) || null
  );

  const [filteredPanchayats, setFilteredPanchayats] = useState([]);
  const captureScreenshot = async() => {
    const requiredFields = ["name", "dob", "phone", "email", "district", "panchayat"];

    const allFilled = requiredFields.every((field) => {
      const value = formData[field];
      return typeof value === "string" ? value.trim() !== "" : Boolean(value);
    });

    if (!allFilled) {
      toast.warning("Please fill all required fields before submitting.");
      console.log("Validation failed: ", formData);
      return;
    }  if (!emailRegex.test(formData.email)) {
            toast.error("Please enter a valid email address.");
            return;
          }
    

    await handleCapture();
     setFormData({
      name: "",
      dob: "",
      phone: "",
      email: "",
      district: "",
      panchayat: "",
      category: "",
      gender: "",
      image: null,
      imageBase64: "",
    });
    setSelectedDistrictOption(null);
    setKey(Date.now());
  };

  useEffect(() => {
    if (selectedDistrictOption) {
      const districtData = locationData?.data.find((district) => district.district === selectedDistrictOption.value);

      let filteredPanchayatsOptions = [];
      if (districtData && Array.isArray(districtData.panchayats)) {
        filteredPanchayatsOptions = districtData.panchayats.map((panchayatName) => ({
          value: panchayatName,
          label: panchayatName,
        }));
      }

      console.log("Filtered Panchayats Options:", filteredPanchayatsOptions);
      setFilteredPanchayats(filteredPanchayatsOptions);
      const currentPanchayatIsValid = filteredPanchayatsOptions.some((p) => p.value === formData.panchayat);

      if (!currentPanchayatIsValid && formData.panchayat !== "") {
        setFormData((prev) => ({ ...prev, panchayat: "" }));
      }
    } else {
      // If no district is selected, clear panchayats and form data
      setFilteredPanchayats([]);
      setFormData((prev) => ({ ...prev, panchayat: "" }));
    }
  }, [selectedDistrictOption, formData.panchayat, setFilteredPanchayats, setFormData, locationData]); // Added locationData to dependencies

  return (
    <Form className=" py-sm-4  px-sm-4  bg-white">
      <Row className="mb-1">
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

      <Row className="mb-1 ">
        <Form.Group as={Col} xs={12} md={6} controlId="formAddImages" className="p-2 ">
          <Form.Label className="fw-bolder text-dark mb-1">
            Add Your Images <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control
            key={key}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="border-success"
          />
          {/* <Form.Text className="text-danger fs-6 mt-2">
            Less than 1 Mb file
          </Form.Text> */}
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

      <Row className="mb-1">
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
      <Row className="mb-1">
        <Form.Group as={Col} xs={12} md={12} controlId="formGender" className="p-2">
          {" "}
          {/* Changed controlId */}
          <Form.Label className="fw-bolder text-dark mb-1">
            Gender <span className="text-danger"> *</span>
          </Form.Label>
          <Select
            name="gender" // Changed name
            required
            options={gender}
            value={
              formData.gender // Ensure the 'value' prop receives the full option object if required by react-select, or just the value if that's how your `gender` options are structured and you want to display the correct selected value
                ? gender.find((option) => option.value === formData.gender)
                : null
            }
            onChange={(selectedOption) => {
              setFormData((prev) => ({ ...prev, gender: selectedOption ? selectedOption.value : "" }));
            }}
            placeholder="Select a gender..."
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: "#28a745",
                "&:hover": {
                  borderColor: "#28a745",
                },
                boxShadow: "none",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#e2ffed" : "white",
                color: "black",
              }),
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mb-1">
        <Form.Group as={Col} xs={12} md={12} controlId="formCategory" className="p-2">
          <Form.Label className="fw-bolder text-dark mb-1">
            Category <span className="text-danger"> *</span>
          </Form.Label>
          <Select
            name="category"
            required
            options={category}
            value={formData.category ? category.find((option) => option.value === formData.category) : null}
            onChange={(selectedOption) => {
              setFormData((prev) => ({ ...prev, category: selectedOption ? selectedOption.value : "" }));
            }}
            placeholder="Select a category..."
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: "#28a745",
                "&:hover": {
                  borderColor: "#28a745",
                },
                boxShadow: "none",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#e2ffed" : "white",
                color: "black",
              }),
            }}
          />
        </Form.Group>
      </Row>

      <Row className="mb-1">
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
              setFormData((prev) => ({ ...prev, district: selectedOption ? selectedOption.value : "" }));
            }}
            placeholder="Select a district..."
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: "#28a745", // Bootstrap success color
                "&:hover": {
                  borderColor: "#28a745",
                },
                boxShadow: "none",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#e2ffed" : "white",
                color: "black",
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
            value={filteredPanchayats?.find((option) => option.value === formData.panchayat) || null}
            onChange={(selectedOption) => {
              setFormData((prev) => ({ ...prev, panchayat: selectedOption ? selectedOption.value : "" }));
            }}
            placeholder="Select a panchayat..."
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: "#28a745",
                "&:hover": {
                  borderColor: "#28a745",
                },
                boxShadow: "none",
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isFocused ? "#e2ffed" : "white",
                color: "black",
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