import React from "react";
import logo from "../assets/atpl-logo.png";
import CTAButton from "../components/common/CTAButton";

const Home = () => {
    return (
        // <div className='w-full h-full flex flex-col gap-2'>
        //   <div className='px-2 py-4'>
        //     <img src={logo} width={180} alt='ATPL' loading='lazy'/>
        //   </div>
        //   <div className='w-full h-full min-h-[calc(100vh-200px)] flex flex-col text-center items-center justify-center gap-5 p-10 md:p-20'>
        //     <p className='text-3xl md:text-[4vmax] font-semibold leading-normal'>Welcome to the GetzDestination Lead Management CRM.</p>
        //     <p className='text-lg leading-5'>Click on the login button for the access of the CRM.</p>
        //     <CTAButton text={"Login"} link={"/login"}/>
        //   </div>
        // </div>

        <div className="min-h-screen flex flex-wrap justify-center items-center">
            <div className="w-full md:w-1/2 min-w-[384px] flex items-center justify-center p-10 max-h-min">
                <img
                    src={logo}
                    className="w-[50vmax] md:w-[30vmax]"
                    alt="ATPL"
                    loading="lazy"
                />
            </div>
            <div className="w-full md:w-1/2 min-w-[384px] h-full flex flex-col items-center justify-center text-center gap-4">
                <p className="text-3xl md:text-[4vmax] font-semibold lineheight">
                    Welcome to the GetzDestination Lead Management CRM.
                </p>
                <p className="text-lg font-medium leading-5">
                    Click on the login button for the access of the CRM.
                </p>
                <CTAButton text={"Login"} link={"/login"} />
            </div>
        </div>
    );
};

export default Home;
