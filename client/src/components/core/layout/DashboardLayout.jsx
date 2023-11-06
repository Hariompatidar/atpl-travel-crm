import React from 'react'
import Navbar from '../../common/Navbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='w-full min-h-screen flex'>
        <Navbar />
        <div className='ml-[260px] max-lg:m-0 flex-1'>
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout

