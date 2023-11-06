import React, { useState } from 'react'
import {TbDashboard, TbUsers, TbMapPin2, TbBrandGoogleAnalytics, TbCoinRupee,TbMenuDeep} from "react-icons/tb";
import {MdFactCheck,MdOutlineFeedback, MdOutlineLiveHelp, MdOutlineSettings,MdOutlineClose} from "react-icons/md"
// import {MdAdd} from 'react-icons/md';
//bookmark
// import {MdOutlineBookmarkAdd,MdBookmark, MdBookmarks} from 'react-icons/md';
import logo from '../../assets/logo.png';
import Avatar from "../../assets/Avatar.png";

import {NavLink} from 'react-router-dom'

const toplinks=[
  {
    id:1,
    icon:<TbDashboard className='h-5 w-5'/>,
    name:"Dashboard",
    link:"/dashboard"
  },
  {
    id:2,
    icon:<TbUsers className='h-5 w-5'/>,
    name:"My Team",
    link:"/myteam"
  },
  {
    id:3,
    icon:<TbMapPin2 className='h-5 w-5'/>,
    name:"Destinations",
    link:"/destinations"
  },
  {
    id:4,
    icon:<MdFactCheck className='h-5 w-5'/>,
    name:"Todays Leads",
    link:"/todayleads"
  },
  {
    id:5,
    icon:<MdFactCheck className='h-5 w-5'/>,
    name:"All Leads",
    link:"/leads"
  },
  {
    id:6,
    icon:<TbBrandGoogleAnalytics className='h-5 w-5'/>,
    name:"Analytics",
    link:"/analytics"
  },
  {
    id:7,
    icon:<TbCoinRupee className='h-5 w-5'/>,
    name:"Finance",
    link:"/finance"
  },
  {
    id:8,
    icon:<MdOutlineFeedback className='h-5 w-5'/>,
    name:"Client Feedback",
    link:"/feedback"
  }
]

const bottomlinks=[
  {
    id:1,
    icon:<MdOutlineLiveHelp className='h-5 w-5'/>,
    name:"Help",
    link:"/help"
  },
  {
    id:2,
    icon:<MdOutlineSettings className='h-5 w-5'/>,
    name:"Setting",
    link:"/setting"
  }
]


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative h-full'>
        {/* Hamburger to open/close the Navbar on small screens */}
        <div className={`lg:hidden absolute top-5 ${isOpen?'-right-[290px]':'-right-9'}`}>
        {isOpen ? (
          <span onClick={toggleNavbar}>
            <MdOutlineClose className='w-6 h-6' />
          </span>
        ) : (
          <span onClick={toggleNavbar}>
            <TbMenuDeep className='w-6 h-6' />
          </span>
        )}
      </div>
    <div className={` min-w-[260px] h-screen fixed z-50 flex flex-col gap-3 items-center py-2 borderRight lg:min-w-[260px] lg:h-screen ${isOpen ? '' : 'hidden'} max-lg:bg-[#14151B]`}>
    

      {/* logo div */}
      <div className='py-2'>
        <img src={logo} alt='Getz Destination' width={200} loading='lazy' />
      </div>

      <div className='w-full h-full flex flex-col justify-between px-5'>
        {/* top nav links */}
        <div className='flex flex-col gap-2'>
          {toplinks.map(toplink => (
            <NavLink key={toplink.id} to={toplink.link} className="link flex gap-2 py-2 px-4 items-center rounded-md">
              {toplink.icon}
              {toplink.name}
            </NavLink>
          ))}
        </div>
        {/* bottom nav links  */}
        <div>
          {bottomlinks.map(bottomlink => (
            <NavLink key={bottomlink.id} to={bottomlink.link} className="link flex gap-2 py-2 px-4 items-center rounded-md">
              {bottomlink.icon}
              {bottomlink.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* user profile div  */}
      <div className="w-full flex gap-3 justify-center text-sm pt-2 borderTop">
        <img
          src={Avatar}
          alt="Profile"
          loading="lazy"
          className="rounded-full"
        />
        <div>
          <p className="font-bold">Olivia Rhye</p>
          <p>olivia@untitledui.com</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Navbar