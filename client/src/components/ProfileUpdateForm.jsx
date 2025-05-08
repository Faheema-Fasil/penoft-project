import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import Button from "react-bootstrap/Button";

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
  const [selectedDistrict, setSelectedDistrict] = useState(formData.district);

  const filteredPanchayats = panchayats.filter((panchayat) => panchayat.district === selectedDistrict);

  return (
    <div className="d-flex flex-column gap-2 p-3 p-md-5">
      <div className="d-flex flex-column gap-0 justify-content-start align-items-start">
        <p className="text-dark fw-bolder">
          Your Full Name <span className="text-danger">*</span>
        </p>
        <Form.Control
          type="text"
          placeholder="Enter Full Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-100 border border-success"
        />
      </div>
      <div className="d-flex flex-row gap-3 justify-content-start align-items-start">
        <div className="w-50">
          <p className="text-dark fw-bolder">
            Add Your Images <span className="text-danger">*</span>
          </p>
          <Form.Control type="file" onChange={handleFileChange} required className="border border-success" />
          <p className="text-danger justify-content-center d-flex align-items-center fs-6 mt-2">Less than 1 Mb file</p>
        </div>
        <div className="w-50">
          <p className="text-dark fw-bolder">
            Date of Birth <span className="text-danger">*</span>
          </p>
          <Form.Control
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="border border-success"
          />
        </div>
      </div>
      <div className="d-flex flex-column gap-0 justify-content-start align-items-start">
        <p className="text-dark fw-bolder">
          Phone Number<span className="text-danger"> *</span>
        </p>
        <Form.Control
          type="text"
          placeholder="+91 | 6282600896"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-100 border border-success"
        />
      </div>
      <div className="d-flex flex-column gap-0 justify-content-start align-items-start">
        <p className="text-dark fw-bolder">
          Email Id <span className="text-danger"> *</span>
        </p>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-100 border border-success"
        />
      </div>
      <div className="d-flex flex-column gap-0">
        <p className="text-dark fw-bolder">
          District <span className="text-danger"> *</span>
        </p>
        <Select
          name="district"
          required
          options={districts}
          value={districts.find((option) => option.value === selectedDistrict)}
          onChange={(selectedOption) => {
            setSelectedDistrict(selectedOption.value);
            setFormData((prev) => ({ ...prev, district: selectedOption.value }));
          }}
          placeholder="Select a district..."
          className="w-full pl-4 pr-10 py-2 placeholder-gray-400 appearance-none bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 "
        />
      </div>
      <div className="d-flex flex-column gap-0">
        <p className="text-dark fw-bolder">
          Panchayat <span className="text-danger"> *</span>
        </p>
        <Select
          name="panchayat"
          required
          options={filteredPanchayats}
          value={filteredPanchayats.find((option) => option.value === formData.panchayat)}
          onChange={(selectedOption) => {
            setFormData((prev) => ({ ...prev, panchayath: selectedOption.value }));
          }}
          placeholder="Select a panchayat..."
          className="w-full pl-4 pr-10 py-2 placeholder-gray-400 appearance-none bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <Button variant="primary" onClick={handleCapture} className="mt-4">
        Submit & Download
      </Button>
    </div>
  );
}

export default ProfileUpdateForm;
