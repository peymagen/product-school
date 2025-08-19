import React, { useState } from "react";
import Logo from '../assets/Logo Icon.png'
import { FaArrowRight } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import icon from '../assets/Icon.png';

const Footer = () => {
    const [selectedOption, setSelectedOption] = useState("english");
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className="absolute top-[9575.48px] w-[1920px] h-[474px] 
                pt-[140px] pr-[220px] pb-[32px] pl-[220px] 
                flex gap-[200px] opacity-100 bg-[#264D4B] flex flex-col">

            <div className="w-[1480px] h-[302px] flex flex-col gap-[100px] opacity-100">

                <div className="w-[1480px] h-[182px] flex gap-[100px] opacity-100 ">
                    <div className="w-[205.25px] h-[34px] flex gap-[15px] opacity-100">
                        <img src={Logo} alt="Logo" className="w-[37px] h-[29px]  rounded-sm" />
                        <span className="font-inter font-bold text-[28px] leading-[100%] tracking-[0%] w-[104px] h-[34px] left-[47px] opacity-100 text-white">
                        Acadex</span>
                    </div>

                    <div className="w-[205.25px] h-[130px] flex gap-4 opacity-100 flex-col text-white">
                        <p className="font-inter font-bold text-[18px] leading-[100%] tracking-[-0.02em] w-[68px] h-[22px] opacity-100">
                        Product
                        </p>
                        <a href="example.com"><p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[70px] h-[20px] opacity-100 text-[#FFE492]">
                        Overview
                        </p></a>
                        <a href="example.com"><p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[50px] h-[20px] opacity-100 ">
                        Pricing
                        </p></a>
                        <a href="example.com"><p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[177px] h-[20px] opacity-100 ">
                        Customer stories
                        </p></a>
                        

                    </div>

                    <div className="w-[205.25px] h-[130px] flex gap-4 opacity-100 flex flex-col text-white">
                        <p className="font-inter font-bold text-[18px] leading-[100%] tracking-[-0.02em] w-[91px] h-[22px] opacity-100">
                        Resources
                        </p>
                        <a href="example.com">
                            <p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[33px] h-[20px] opacity-100 ">
                        Blog
                        </p>
                        </a>
                        <a href="example.com">
                            <p className="font-inter font-normal text-[16px] leading-[100%] tracking-[-0.02em] w-[128px] h-[20px] opacity-100 ">
                        Guides & tutorials
                        </p>
                        </a>
                        <a href="example.com">
                            <p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[130px] h-[20px] opacity-100 ">
                        Help center
                        </p>
                        </a>
                    </div>

                    <div className="w-[205.25px] h-[130px] gap-4 opacity-100 flex flex-col text-white">
                        <p className="font-inter font-bold text-[18px] leading-[100%] tracking-[-0.02em] w-[83px] h-[22px] opacity-100">
                        Company
                        </p>
                        <a href="example.com">
                            <p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[76px] h-[20px] opacity-100 ">
                        About us
                        </p>
                        </a>
                        <a href="example.com">
                            <p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[62px] h-[20px] opacity-100 ">
                        Careers

                        </p>
                        </a>
                        <a href="exaple.com">
                            <p className="font-inter font-normal text-[18px] leading-[100%] tracking-[-0.02em] w-[99px] h-[20px] opacity-100 ">
                        Media kit
                        </p>
                        </a>
                    </div>

                    <div className="w-[259px] h-[182px] gap-[23px] opacity-100 flex flex-col text-white ">
                        <p className="font-inter font-bold text-[28px] leading-[36px] tracking-[-0.02em] w-[155px] h-[36px] opacity-100">
                       Try It Today
                        </p>
                        <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[259px] h-[40px] opacity-100">
                        Get started for free.
                        Add your whole team as your needs grow.
                        </p>


                        <button className="w-[189px] h-[60px] pt-[20px] pr-[40px] pb-[20px] pl-[40px] gap-[10px] opacity-100 rounded-[8px] flex bg-[#6A9D9A]" >
                            <span className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[85px] h-[20px] opacity-100">
                            Book Demo
                            </span>
                            <FaArrowRight className="w-[14px] h-[14px] gap-[4px] opacity-100" />

                        </button>

                    </div>

                </div>

                <div className="w-[1480px] h-[20px] flex justify-between opacity-100 text-white">
                    <div className="w-[625px] h-[20px] flex gap-[60px] opacity-100">

                        <div className="relative w-[150px] flex items-center gap-2">
                            <img src={icon} alt="Language" className="w-4 h-4" />
                            <span className="ml-2 text-white cursor-pointer" onClick={toggleDropdown}>
                                {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}
                            </span>
                            <FaChevronDown onClick={toggleDropdown} className="cursor-pointer text-white" />
                            
                            {showDropdown && (
                                <div className="absolute left-0 mt-[-18] bg-[#264D4B] text-white">
                                <p
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-white"
                                    onClick={() => { setSelectedOption("english"); setShowDropdown(false); }}
                                >
                                    English
                                </p>
                                <p
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-white"
                                    onClick={() => { setSelectedOption("hindi"); setShowDropdown(false); }}
                                >
                                    Hindi
                                </p>
                                </div>
                            )}
                        </div>


                        <p className="font-inter font-normal text-[13px] leading-[20px] tracking-[-0.02em] w-[117px] h-[20px] opacity-100">
                        Terms & privacy
                        </p>
                        <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[60px] h-[20px] opacity-100">
                        Security
                        </p>
                        <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[47px] h-[20px] opacity-100">
                        Status
                        </p>
                        <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[57px] h-[20px] opacity-100">
                       ©2025.
                        </p>

                    </div>
                    <div className="w-[105px] h-[16.68px] flex gap-[32px] opacity-100 text-white">
                        <FaTwitter className="w-[9px] h-[16.68px]  opacity-100" />
                        <FaFacebookF className="w-[9px] h-[16.68px]   opacity-100" />
                        <FaLinkedinIn className="w-[9px] h-[16.68px]   opacity-100" />
                    </div>
                </div>

            </div>

        </div>

    );
}

export default Footer;