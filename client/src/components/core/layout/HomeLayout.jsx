import React from 'react';
import logo from '../../../assets/atpl-logo.png';

const HomeLayout = ({comp}) => {
  return (
    <div className="min-h-screen flex flex-wrap justify-center items-center">
     <div className='w-full md:w-1/2 min-w-[384px] flex items-center justify-center p-10 max-h-min'>
        <img src={logo} className='w-[50vmax] md:w-[30vmax]' alt='ATPL' loading='lazy'/>
      </div>
      <div className="w-full md:w-1/2 min-w-[384px] h-full flex items-center justify-center">
       {comp}
      </div>
    </div>
  );
};

export default HomeLayout;
