import React from "react";
import { FaCheck } from "react-icons/fa";


const TickIcon = () => {
    return (
         <div className="w-[18.01px] h-[18.01px] border-2 border-[#212529] rounded-full flex items-center justify-center relative " >
                <FaCheck className="w-[22.7px] h-[11.01px] text-[#212529] relative -top-[2.8px] left-[6.3px] bg-white"  />
        </div>
    );
};

export default TickIcon;
