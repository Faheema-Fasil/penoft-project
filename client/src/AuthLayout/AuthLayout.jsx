import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function AuthLayout() {
  return (
    <div>
        <Header/>
        <div className=''
         style={{
        minHeight: "calc(100vh - 150px)",
        background: "#e9fcf4"
      }}>

        <Outlet/>
        </div>
        <Footer/>
      
    </div>
  )
}

export default AuthLayout
