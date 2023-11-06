import React from 'react';
import logo from '../../../assets/logo.png';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div className="min-h-screen flex flex-wrap justify-center items-center">
     <div className='w-full md:w-1/2 min-w-[384px] flex items-center justify-center p-10 max-h-min'>
        <img src={logo} className='w-[50vmax] md:w-[30vmax]' alt='Getz Destination' loading='lazy'/>
      </div>
      <div className="w-full md:w-1/2 min-w-[384px] h-full flex items-center justify-center">
        <Outlet/>
      </div>
    </div>
  );
};

export default HomeLayout;
