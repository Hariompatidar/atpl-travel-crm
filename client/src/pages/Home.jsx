import React from "react";
import CTAButton from "../components/common/CTAButton";

const Home = () => {
    return (
        <div className="w-full min-w-[384px]  flex flex-col items-center justify-center text-center gap-4">
        <p className="text-3xl md:text-[4vmax] leading-[5vmax] md:leading-[4.2vmax] font-semibold">
            Welcome to the GetzDestination Lead Management CRM.
        </p>
        <p className="text-lg font-medium leading-5">
            Click on the login button for the access of the CRM.
        </p>
        <CTAButton text={"Login"} link={"/login"} />
    </div>
    );
};

export default Home;
