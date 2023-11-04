import React from 'react'
import {TbDashboard, TbUsers, TbMapPin2, TbBrandGoogleAnalytics, TbCoinRupee,} from "react-icons/tb";
import {MdFactCheck,MdOutlineFeedback, MdOutlineLiveHelp, MdOutlineSettings} from "react-icons/md"
// import {MdAdd} from 'react-icons/md';
//bookmark
// import {MdOutlineBookmarkAdd,MdBookmark, MdBookmarks} from 'react-icons/md';
import logo from '../../assets/atpl-logo.png';
import Avatar from "../../assets/Avatar.png";

import {NavLink} from 'react-router-dom'

const toplinks=[
  {
    id:1,
    icon:<TbDashboard/>,
    name:"Dashboard",
    link:"/dashboard"
  },
  {
    id:2,
    icon:<TbUsers/>,
    name:"My Team",
    link:"/myteam"
  },
  {
    id:3,
    icon:<TbMapPin2/>,
    name:"Destinations",
    link:"/destinations"
  },
  {
    id:4,
    icon:<MdFactCheck/>,
    name:"Todays Leads",
    link:"/todayleads"
  },
  {
    id:5,
    icon:<MdFactCheck/>,
    name:"All Leads",
    link:"/leads"
  },
  {
    id:6,
    icon:<TbBrandGoogleAnalytics/>,
    name:"Analytics",
    link:"/analytics"
  },
  {
    id:7,
    icon:<TbCoinRupee/>,
    name:"Finance",
    link:"/finance"
  },
  {
    id:8,
    icon:<MdOutlineFeedback/>,
    name:"Client Feedback",
    link:"/feedback"
  }
]

const bottomlinks=[
  {
    id:1,
    icon:<MdOutlineLiveHelp/>,
    name:"Help",
    link:"/help"
  },
  {
    id:2,
    icon:<MdOutlineSettings/>,
    name:"Setting",
    link:"/setting"
  }
]


const Navbar = () => {
  return (
    <div className='w-[20%] min-w-[200px] h-screen fixed flex flex-col gap-3 items-center py-2 borderRight'>
         {/* logo div */}
        <div className='py-2'>
              <img src={logo} alt='ATPL Global' width={180} loading='lazy'/>
        </div>
        <div className='w-full h-full flex flex-col justify-between px-5'>
               {/* top nav links */}
            <div className='flex flex-col gap-2'>
              {
                toplinks.map(toplink=>(
                  <NavLink key={toplink.id} to={toplink.link} className="flex gap-2 py-2 px-2 items-center rounded-md">
                  {toplink.icon}
                  {toplink.name}
              </NavLink>
                ))
              }
            </div>
            {/* bottom nav links  */}
            <div>
            {
                bottomlinks.map(bottomlink=>(
                  <NavLink key={bottomlink.id} to={bottomlink.link} className="flex gap-2 py-2 px-2 items-center rounded-md">
                  {bottomlink.icon}
                  {bottomlink.name}
              </NavLink>
                ))
              }
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
  )
}

export default Navbar