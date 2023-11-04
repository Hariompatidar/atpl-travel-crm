import React from 'react'
// import Sidebar from '../../common/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  return (
    <div className='w-full min-h-screen flex'>
        {/* <Sidebar /> */}
        <div className='ml-[20%] flex-1'>
            <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout

