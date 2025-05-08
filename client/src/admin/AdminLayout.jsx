import React from 'react'
import Header from '../components/admin/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

import Sidebar from '../components/admin/Sidebar'

function AdminLayout() {
  return (
    <div className='d-flex '>

        <Sidebar/>
<div className='w-100 px-4 d-flex flex-column justify-content-between align-content-center' >

        <Header/>
      <Outlet/>
      <Footer/>
</div>

    </div>
  )
}

export default AdminLayout
