import React, {useRef, useState } from 'react'
import ProfileUpdateForm from '../components/ProfileUpdateForm'
import DynamicCardGenerator from '../components/DynamicCardGenerator'
import { ProfileProvider } from '../reactContext/CardGenator'
import html2canvas from 'html2canvas';
import QrCode from 'qrcode'
function MyProfilePage() {
  const[formData,setFormData]=useState({
    name:"",
    image:"",
    dob:"",
    phone:"",
    email:"",
    district:"",
    panchayath:""
  })

  const handleChange = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, image: file }));
  };




// /////////////////
const [qrUrl, setQrUrl] = useState('');

  

  // capture
  const captureRef = useRef(null);

  const handleCapture = async () => {
    const element = captureRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true, // helpful if there are external resources
        backgroundColor: null, // keeps transparency
      });

      const dataUrl = canvas.toDataURL('image/png');

      // Optional: Open in new tab (for testing)
      // window.open(dataUrl);

      // Download image
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'screenshot.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Screenshot failed:', error);
    }
  };

  const generateQR = async () => {
    try {
      let text = 'I am a pony!';
      const url = await QrCode.toDataURL(text);
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ProfileProvider>

    <div className='d-flex custom-border  p-4 m-2 ' >

      <ProfileUpdateForm handleCapture={handleCapture} handleChange={handleChange} handleInputChange={handleInputChange}  handleFileChange={handleFileChange} formData={formData} setFormData={setFormData}/>
      <DynamicCardGenerator qrUrl={qrUrl} handleCapture={handleCapture} captureRef={captureRef} generateQR={generateQR} handleChange={handleChange} handleInputChange={handleInputChange}  handleFileChange={handleFileChange} formData={formData}/>
    </div>
    </ProfileProvider>
  )
}

export default MyProfilePage
