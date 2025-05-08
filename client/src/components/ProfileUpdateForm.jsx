import React from 'react'
import { Form } from 'react-bootstrap'
import Select from 'react-select';

import Button from 'react-bootstrap/Button';
const options = [
  { value: 'malappuram', label: 'Malappuram' },
  { value: 'kozhikode', label: 'Kozhikode' },
  { value: 'ernakulam', label: 'Ernakulam' },
];
const districts = [
  'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha', 'Kottayam',
  'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode',
  'Wayanad', 'Kannur', 'Kasaragod'
];

function ProfileUpdateForm({handleCapture, handleInputChange,  handleFileChange, formData}) {
  


  return (
    <>
      <div className='d-flex p-5 flex-column gap-2'>
        {/* full name */}
        <div className='d-flex flex-column gap-0 justify-content-start align-items-start'>
          <p className='text-dark fw-bolder'> Your Full Name <span className='text-danger'>*</span></p>
          <Form.Control type="text" placeholder="Enter Full Name" name='name' value={formData.name}
          onChange={handleInputChange} required/>
        </div>
        {/* image and birtdate */}
        <div className='d-flex flex-row gap-3 justify-content-start align-items-start'>
          <div>

            <p className='text-dark fw-bolder'> Add Your Images <span className='text-danger'>*</span></p>
            <Form.Control type="file" placeholder="Normal text"  onChange={handleFileChange} required/>
            <p className='text-danger justify-content-center d-flex align-items-center  fs-6 mt-2'>Less than 1 Mb file</p>
          </div>
          <div>

            <p className='text-dark fw-bolder'> Date of Birth <span className='text-danger'>*</span></p>
            <Form.Control type="date" placeholder="Normal text " name='dob' value={formData.dob}
          onChange={handleInputChange} />
          </div>
        </div>
        {/* phone number */}
        <div className='d-flex flex-column gap-0 justify-content-start align-items-start'>
          <p className='text-dark fw-bolder'>Phone Number<span className='text-danger'> *</span></p>
          <Form.Control type="text" placeholder="+91 | 6282600896" name='phone'  value={formData.phone}
          onChange={handleInputChange}/>
        </div>
        {/* email */}
        <div className='d-flex flex-column gap-0 justify-content-start align-items-start'>
          <p className='text-dark fw-bolder'>Email Id <span className='text-danger'> *</span></p>
          <Form.Control type="email" placeholder="Enter Email" name='email'  value={formData.email}
          onChange={handleInputChange}/>
        </div>
        {/* district */}
        <div className='d-flex flex-column gap-0 '>
          <p className='text-dark fw-bolder'>District  <span className='text-danger'> *</span></p>
          <div className="relative">
            <Select
            name='district'
            required
            options={options}
             value={formData.district}
             isSearchable
             onChange={handleInputChange}
             placeholder="Select a district..."
              className="w-full pl-4 pr-10 py-2   placeholder-gray-400 appearance-none bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >

            </Select>

          </div>
        </div>
        {/* panchayyath */}
        <div className='d-flex flex-column gap-0 '>
          <p className='text-dark fw-bolder'>Panchayat <span className='text-danger'> *</span></p>
          <div className="relative">
            <Select
            name='panchayath'
            required
            value={formData.panchayath}
            onChange={handleInputChange}
            placeholder='Select Panchayat'
              className="w-full pl-4 pr-10 py-2  border-green-300 placeholder-gray-400 appearance-none bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="" disabled hidden>
              Select Panchayat
              </option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </Select>

          </div>
        </div>
        {/* submit button */}
        <Button style={{backgroundColor:"green"}} size="lg" onClick={handleCapture}>
        Submit & Download
      </Button>
      </div>
    </>
  )
}

export default ProfileUpdateForm
