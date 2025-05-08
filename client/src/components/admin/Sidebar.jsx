import React, { useState } from 'react'
import {
    FaTh,
    FaMapMarkerAlt,
    FaArchive,
    FaWarehouse,
    FaLink,
    FaMedal,
    FaDownload,
    FaUser,
    FaCog,
    FaSignOutAlt,
  } from 'react-icons/fa'; // Using Font Awesome for icons
  
  import logo from '../../assets/log.ico';
import { Link } from 'react-router-dom';
function Sidebar() {
    const[clicked,setClicked]=useState(false)
    const handleCliked=()=>setClicked(true);
  return (
    <>
       <div className="d-flex gap-5 flex-column bg-light shadow-sm" style={{ width: '200px', height: '100vh' }}>
      <div className='p-3'>
         <Link to="/myprofile">
        <img src={logo} alt="Logo" className="img-fluid" style={{ maxWidth: '100px' }} />
         </Link>
      </div>
      <ul className="nav nav-pills flex-column  ">
        <li className="nav-item">
          <Link to="/dashboard" className={`btn nav-link fs-6  d-flex align-items-center text-dark ${clicked ? 'btn-success ' : 'btn-secondary'}`} onClick={handleCliked }>
            <FaTh className="me-3" />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <a href="/menu02" className="nav-link fs-6 d-flex align-items-center text-dark ">
            <FaMapMarkerAlt className="me-3" />
            <span>Menu 02</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/menu03" className="nav-link fs-6  d-flex align-items-center text-dark ">
            <FaArchive className="me-3" />
            <span>Menu 03</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/menu04" className="nav-link fs-6  d-flex align-items-center text-dark ">
            <FaWarehouse className="me-3" />
            <span>Menu 04</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/menu05" className="nav-link fs-6  d-flex align-items-center text-dark ">
            <FaLink className="me-3" />
            <span>Menu 05</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/menu06" className="nav-link fs-6  d-flex align-items-center text-dark ">
            <FaMedal className="me-3" />
            <span>Menu 06</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/downloads" className="nav-link fs-6  d-flex align-items-center text-dark ">
            <FaDownload className="me-3" />
            <span>Downloads</span>
          </a>
        </li>
      </ul>


      <div className="px-3 gap-3 mt-auto">
        <Link to="/myprofile" className={`btn text-dark d-flex align-items-center w-100  `} >
          <FaUser className="me-2" />
          <span>My Profile</span>
        </Link>
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <a href="/settings" className="nav-link d-flex align-items-center text-dark py-2">
            <FaCog className="me-2" />
            <span>Settings</span>
          </a>
        </li>
        <li className="nav-item">
          <a href="/logout" className="nav-link d-flex align-items-center text-dark py-2">
            <FaSignOutAlt className="me-2" />
            <span>Logout</span>
          </a>
        </li>
      </ul>
      <div className="px-3 mt-3 text-dark text-center  ">
        <p style={{fontSize:"12px",fontFamily:"fantasy"}}> Ver 1.21</p>
      </div>
      </div>
    </div>
    </>
  )
}

export default Sidebar
