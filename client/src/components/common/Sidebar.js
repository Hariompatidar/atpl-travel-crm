import React from 'react'
import {TbDashboard, TbUsers, TbMapPin2, TbBrandGoogleAnalytics, TbCoinRupee,} from "react-icons/tb";
import {MdFactCheck,MdOutlineFeedback, MdOutlineLiveHelp, MdOutlineSettings} from "react-icons/md"
import {FaRegCircleXmark} from 'react-icons/fa6'
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


const Sidebar = () => {
    
  return (
    <div className='w-[20%] min-w-[200px] h-screen fixed flex flex-col gap-3 items-center py-2 borderRight'>
      <span
      className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
      onclick={(e) => {e.target.classList.toggle("hidden")}}
    >
      <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
    </span>
    <div
      className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
    >
      <div className="text-gray-100 text-xl">
        <div className="p-2.5 mt-1 flex items-center">
          <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 className="font-bold text-gray-200 text-[15px] ml-3">TailwindCSS</h1>
          <FaRegCircleXmark
            className=" cursor-pointer ml-28 lg:hidden"
            onclick={(e) => { console.log(e.target) ;    e.target.classList.toggle("hidden")}}
          />
        </div>
        <div className="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <div
        className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
      >
        <i className="bi bi-search text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
        />
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-house-door-fill"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-bookmark-fill"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Bookmark</span>
      </div>
      <div className="my-4 bg-gray-600 h-[1px]"></div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      
      >
        <i className="bi bi-chat-left-text-fill"></i>
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Chatbox</span>
          <span className="text-sm rotate-180" id="arrow">
            <i className="bi bi-chevron-down"></i>
          </span>
        </div>
      </div>
      <div
        className="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
        id="submenu"
      >
        <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Social
        </h1>
        <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Personal
        </h1>
        <h1 className="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">
          Friends
        </h1>
      </div>
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
      </div>
    </div>

    </div>
  )
}

export default Sidebar