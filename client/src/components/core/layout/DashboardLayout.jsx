import React from 'react'
import Navbar from '../../common/Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='w-full min-h-screen flex'>
        <Navbar />
        <div className='ml-[20%] flex-1'>
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout

