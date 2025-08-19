
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import stud_detail from "../assets/stud_detail.png";
// import { IoMdCheckboxOutline } from "react-icons/io";
import TickIcon from "./TickIcon.jsx"; 
import { FaCheck } from "react-icons/fa";
import App from '../assets/Apps.png'
import Group from '../assets/Group.png';
// import Quote from '../assets/Quote.png';
// import Avatar from '../assets/Avater.png';
// import Group1 from '../assets/Group1.png';
// import Avatar1 from '../assets/Avater1.png'
// import Avatar2 from '../assets/Avater2.png'
// import contactUs from '../assets/CONTACT US.png';
import Products from './Products.jsx'
import Testtimonials from './Testtimonials.jsx';


const Acedmic = () => {
    return (
        <div >

            {/* Section 1 (Acedmic) */}
            <div className="w-[1480px] absolute h-[585px] mx-auto flex flex-row items-center justify-between absolute gap-[60px] top-[1061px] left-[220px]">
                {/* Left Side */}
                <div className="w-[672px] h-[585px] flex flex-col gap-[60px]">
                    <div className="w-[672px] h-[462px] gap-[25px]">
                        <div className="w-[672px] h-[348px] font-inter font-bold text-[72px] leading-[100%] tracking-[-0.02em]">
                            <p>
                                Academic & <br/> Administrative <br/> Management Made <br/> Easy
                            </p>
                        </div>
                        <div className="w-[672px] h-[90px] font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em] mt-[-20px]">
                            <p>
                                From admissions to attendance, fee collection to faculty management — 
                                our ERP handles it all seamlessly. Get real-time reports and analytics 
                                to make informed decisions.
                            </p>
                        </div>
                    </div>
                    {/* Learn More Button */}
                    <div className="w-[199px] h-[63px] rounded-[6px] px-[40px] py-[20px] bg-[#6A9D9A] flex items-center justify-center gap-[10px]">
                        <button className="font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] flex items-center gap-2 text-[#ffffff]">
                            Learn More
                            <FaArrowRight className="w-[14px] h-[14px] opacity-100 border border-[1px]" />

                        </button>
                    </div>
                </div>
                {/* Right Side Box with Image */}
                <div className="w-[748px] h-[547px] bg-[#c4defd] flex items-center justify-center relative">
                    {/* <img
                        src
                        
                    /> */}
                </div>
            </div>

            {/* Section-2 */}

            <div
            className="absolute w-[662px] h-[662px] top-[1764px] left-[180px]"
            >
                <img src={stud_detail} alt="" />
                

            </div>

            <div
                className="absolute w-[650px] h-[284px] top-[1857px] left-[1031px] opacity-100 flex flex-col gap-[60px]"
                >
                    <p className="font-inter font-bold text-[72px] leading-[100%] tracking-[-0.02em]">
                       keep everyone connected
                    </p>
                    <p className="font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em] w-[650px] h-[60px] opacity-100">
                        Enable smooth communication between teachers, students, and parents. Share notices, assignments, and performance updates instantly.

                    </p>

                    <button className="w-[186px] h-[63px] gap-[10px] rounded-[6px] px-[40px] py-[20px] opacity-100 flex item-center justify-center bg-[#6A9D9A] text-[#ffffff]">
                        <p className="font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] w-[82px] h-[23px]">
                            Try it now
                        </p>
                        <FaArrowRight className="w-[14px] h-[14px] opacity-100 border border-[1px]" />

                    </button>    

            </div>



            {/* Section-3 */}
            <div className="w-[1921px] h-[759px] pt-[140px] pr-[220px] pb-[140px] pl-[220px] gap-[98px] opacity-100 absolute top-[2509px] bg-[#264D4B] flex flex-row">

                <div className="w-[697px] h-[381px] mt-[60px] opacity-100 text-[#ffffff] ">
                        <div className="w-[697px] h-[258px] gap-[24px] opacity-100">
                            <p className="font-inter font-bold text-[72px] leading-[100%] tracking-[-0.02em]">
                                Integrates With Your Existing System
                            </p>
                             
                             {/* Image  */}
                            {/* <img src="" alt="" /> */}

                            <p className="font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em] w-[697px] h-[60px] opacity-100">
                                Already have a website? Our ERP fits right in, or we can build you a new one from scratch.
                            </p>

                            <button className="w-[171px] h-[63px] rounded-[6px] px-[40px] py-[20px] gap-[10px] opacity-100 bg-[#6A9D9A] mt-[60px] flex">
                               <span className="font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] w-[67px] h-[23px] opacity-100">
                                Let's Go
                            </span>
                            <FaArrowRight className="w-[14px] h-[14px] opacity-100 border border-[1px] mx-[4px]" />


                            </button>


                        </div>
                        


                </div>
                        <div className="w-[686px] h-[479px] flex flex-col gap-[4px] opacity-100 bg-[#c4defd]">
                            {/* Content here */}
                        </div>

                
            </div>


            {/* Section-4 */}
            <div className="w-[1921px] h-[812px] pt-[140px] pr-[220px] pb-[140px] pl-[220px] flex gap-[98px] opacity-100 absolute top-[3268px] ">
                    <div className="w-[714px] h-[532px] flex gap-[4px] opacity-100 bg-[#c4defd]">
                        {/* Content here */}
                    </div>
                    <div className="w-[669px] h-[351px] flex mt-[60px] opacity-100 ">
                        <div className="w-[669px] h-[228px] flex gap-[24px] opacity-100 flex flex-col">
                            <p className="font-inter font-bold text-[72px] leading-[100%] tracking-[-0.02em] w-[669px] h-[174px] opacity-100">
                                Modules That Fit Your Institutions
                            </p>
                            <p className="font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em] w-[669px] h-[30px] opacity-100">
                                Choose from 30+ modules-add,remove or customize based on your workflow.
                            </p>
                            <button className="w-[171px] h-[63px] gap-[10px] rounded-[8px] px-[40px] py-[20px] opacity-100 flex items-center justify-center bg-[#6A9D9A]">
                               <span className="font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] opacity-100">
                                    Let’s Go
                                </span>
                                <FaArrowRight className="w-[14px] h-[14px] opacity-100" />

                            </button>


                        </div>

                    </div>


            </div>

            

            {/* Section 5 (PRoduct) */}
            <div className="w-[800px] h-[87px] flex gap-[24px] absolute top-[4120px] left-[61px] opacity-100">
                <p className="font-inter font-bold text-[72px] leading-[100%] tracking-[-0.02em] w-[800px] h-[87px] opacity-100">
                    Product’s Features
                </p>

            </div>

            <div className="w-[1687px] h-[515px] absolute top-[4232px] left-[164px] gap-[32px] opacity-100 flex">
                
                <Products />


            </div>

            
            {/* Section 6  */}
            <div className="w-[1921px] h-[574px] absolute top-[5372px] opacity-100 rotate-0 pt-[140px] pr-[220px] pb-[140px] pl-[220px] bg-[#264D4B] text-[#ffffff] ">
                <div className="w-[1481px] h-[294px]  mt-[60px] opacity-100 rotate-0 flex flex-col items-center justify-center">
                    <div className="w-[1064px] h-[171px] gap-[24px] opacity-100 rotate-0">
                        <p className="w-[1064px] h-[87px] font-inter font-bold text-[72px] leading-[1] tracking-[-0.02em] rotate-0 opacity-100">
                            Your work, everywhere you are
                        </p>

                        <p className="w-[1064px] h-[60px] font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em] text-center rotate-0 opacity-100 mt-[10px]">
                            Access your notes from your computer, phone or tablet by synchronising with various services, including whitepace, Dropbox and OneDrive. The app is available on Windows, macOS, Linux, Android and iOS. A terminal app is also available!
                        </p>


                    </div>

                    <button className="w-[174px] h-[63px] mt  -[10px] rounded-[8px] pt-[20px] pr-[40px] pb-[20px] pl-[40px] opacity-100 rotate-0 bg-[#6A9D9A] flex items-center justify-center gap-2">
                        <p className="w-[70px] h-[23px] font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] rotate-0 opacity-100">
                            Try Now
                        </p>
                        <FaArrowRight className="w-[14px] h-[14px] border border-[1px] opacity-100 rotate-0"/>

                    </button>


                </div>

            </div>

            {/* Section-7 (plan) */}
            <div className="w-[1921px] h-[1211px] absolute top-[5926px] left-[-6px] pt-[140px] pr-[220px] pb-[140px] pl-[220px] gap-[60px] opacity-100">
                        <div className="w-[1481px] h-[87px] gap-[24px] opacity-100">
                            <p className="font-inter font-bold text-[72px] leading-[100%] tracking-[-0.02em] text-center w-[1481px] h-[87px] opacity-100">
                                Choose Your Plan
                            </p>

                        </div>

                        <div className="w-[1481px] h-[784px] gap-[32px] flex flex-row items-center mt-[40px]">
                            {/* Left card */}
                            <div className="w-[472.33px] h-[594px] p-[40px] pr-[44px] pb-[40px] pl-[44px] gap-[25px] rounded-[10px] border border-[#FFE492] ">
                                <div class="w-[384.33px] h-[153px] flex gap-[25px] opacity-100 bg-white  flex flex-col item-center">
                                    <p class="w-[384.33px] h-[36px] font-inter font-semibold text-[24px] leading-[36px] tracking-[0%] opacity-100">
                                        Free
                                    </p>
                                    <p class="w-[384.33px] h-[44px] font-inter font-bold text-[36px] leading-[100%] tracking-[-0.02em] opacity-100">
                                        ₹0
                                    </p>
                                    <p class="w-[384.33px] h-[23px] font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] opacity-100">
                                        Capture ideas and find them quickly
                                    </p>



                                </div>

                                <div class="w-[384.33px] h-[260px] flex mt-[28px] opacity-100 bg-white flex flex-col">

                                     <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex">
                                         <TickIcon />
                                         <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 ">
                                            15 days full access to all ERP modules
                                        </p>
                                    </div>

                                    <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                         <TickIcon />
                                         <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                            Unlimited student & teacher logins during trial
                                        </p>
                                    </div>

                                    <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                         <TickIcon />
                                         <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                            All features unlocked without restrictions
                                        </p>
                                    </div>

                                    <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex  mt-4">
                                         <TickIcon />
                                         <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                           Access on mobile, tablet, and desktop
                                        </p>
                                    </div>

                                    <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                         <TickIcon />
                                         <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                            Email support for quick queries
                                        </p>
                                    </div>

                                    <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                         <TickIcon />
                                         <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                            Easy upgrade to paid plans anytime
                                        </p>
                                    </div>

                                </div>

                                <button className="w-[166px] h-[51px] px-[40px] py-[16px] rounded-[8px] border border-black">
                                    <p className="font-inter font-medium text-[16px] leading-[100%] tracking-[-0.02em]">
                                        Get Started
                                    </p>
                                </button>



                            </div>

                            {/* Middle card (highlight) */}
                            <div className="w-[472.33px] h-[784px] pt-[80px] pr-[44px] pb-[80px] pl-[44px] gap-[25px] rounded-[10px] bg-[#264D4B] ">
                                
                                    <div class="w-[384.33px] h-[153px] flex gap-[25px] opacity-100  flex flex-col item-center">
                                        <p class="w-[384.33px] h-[36px] font-inter font-semibold text-[24px] leading-[36px] tracking-[0%] opacity-100 text-white">
                                          Personal
                                        </p>
                                        <p class="w-[384.33px] h-[44px] font-inter font-bold text-[36px] leading-[100%] tracking-[-0.02em] opacity-100 text-[#FFE492]">
                                            ₹ 4999/month
                                        </p>
                                        <p class="w-[384.33px] h-[23px] font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] opacity-100 text-white">
                                           Keep parents and institution on track
                                        </p>



                                    </div>

                                    <div className="w-[384.33px] h-[370px] gap-[28px] opacity-100  flex mt-[28px] opacity-100  flex flex-col">

                                        <div class="w-[384.33px] h-[23px] flex gap-[19px] opacity-100 flex">
                                            <div className="w-[18.01px] h-[18.01px] border-2 border-[#FFE492] rounded-full flex items-center justify-center relative " >
                                                <FaCheck className="w-[22.7px] h-[11.01px] text-[#FFE492] relative -top-[2.8px] left-[6.3px] bg-[#264D4B]"  />
                                            </div>
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 text-white ">
                                                Unlimited users (students, staff, parents)
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <div className="w-[18.01px] h-[18.01px] border-2 border-[#FFE492] rounded-full flex items-center justify-center relative " >
                                                <FaCheck className="w-[22.7px] h-[11.01px] text-[#FFE492] relative -top-[2.8px] left-[6.3px] bg-[#264D4B]"  />
                                            </div>
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 text-white">
                                               All ERP modules included (attendance, fees, exams, library, etc.)
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <div className="w-[18.01px] h-[18.01px] border-2 border-[#FFE492] rounded-full flex items-center justify-center relative " >
                                                <FaCheck className="w-[22.7px] h-[11.01px] text-[#FFE492] relative -top-[2.8px] left-[6.3px] bg-[#264D4B]"  />
                                            </div>
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 text-white">
                                                Website + ERP hosting on secure servers
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex  mt-4">
                                            <div className="w-[18.01px] h-[18.01px] border-2 border-[#FFE492] rounded-full flex items-center justify-center relative " >
                                                <FaCheck className="w-[22.7px] h-[11.01px] text-[#FFE492] relative -top-[2.8px] left-[6.3px] bg-[#264D4B]"  />
                                            </div>
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 text-white">
                                                Email & phone support with quick resolution times
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <div className="w-[18.01px] h-[18.01px] border-2 border-[#FFE492] rounded-full flex items-center justify-center relative " >
                                                <FaCheck className="w-[22.7px] h-[11.01px] text-[#FFE492] relative -top-[2.8px] left-[6.3px] bg-[#264D4B]"  />
                                            </div>
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 text-white">
                                               Regular updates & new features at no extra cost
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <div className="w-[18.01px] h-[18.01px] border-2 border-[#FFE492] rounded-full flex items-center justify-center relative " >
                                                <FaCheck className="w-[22.7px] h-[11.01px] text-[#FFE492] relative -top-[2.8px] left-[6.3px] bg-[#264D4B]"  />
                                            </div>
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 text-white">
                                              Custom branding with your institution’s logo & colors
                                            </p>
                                        </div>

                                    </div>

                                    <button className="w-[166px] h-[51px] px-[40px] py-[16px] rounded-[8px] bg-[#69AD9A] text-white  transition mt-3">
                                        <p className="font-inter font-medium text-base leading-none tracking-[-0.02em] w-[86px] h-[19px] opacity-100">
                                            Get Started
                                        </p>
                                    </button>



                                
                            </div>
                            
                            {/* Right card */}
                            <div className="w-[472.33px] h-[594px] p-[40px] pr-[44px] pb-[40px] pl-[44px] gap-[25px] rounded-[10px] border border-[#FFE492]">
                                
                                    <div class="w-[384.33px] h-[153px] flex gap-[25px] opacity-100 bg-white  flex flex-col item-center">
                                        <p class="w-[384.33px] h-[36px] font-inter font-semibold text-[24px] leading-[36px] tracking-[0%] opacity-100">
                                           Enterprise 
                                        </p>
                                        <p class="w-[384.33px] h-[44px] font-inter font-bold text-[36px] leading-[100%] tracking-[-0.02em] opacity-100">
                                            Custom Pricing
                                        </p>
                                        <p class="w-[384.33px] h-[23px] font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] opacity-100">
                                           Capture ideas and find them quickly
                                        </p>



                                    </div>

                                    <div class="w-[384.33px] h-[260px] flex mt-[28px] opacity-100 bg-white flex flex-col item-center justify-center">

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex">
                                            <TickIcon />
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100 ">
                                                Everything included in Standard plan
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <TickIcon />
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                               Dedicated account manager for your institution
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <TickIcon />
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                                Custom module development to fit your workflow
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex  mt-4">
                                            <TickIcon />
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                           Priority support with 24/7 helpline
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <TickIcon />
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                               On-site training for staff & faculty
                                            </p>
                                        </div>

                                        <div class="w-[384.33px] h-[20px] flex gap-[19px] opacity-100 flex mt-4">
                                            <TickIcon />
                                            <p className="font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] w-[347.33px] h-[20px] opacity-100">
                                               Advanced analytics & AI-driven insights for decision-making
                                            </p>
                                        </div>

                                    </div>

                                    <button className="w-[173px] h-[51px] px-[40px] py-[16px] rounded-[8px] border border-[1px] opacity-100">
                                        <p className="font-inter font-medium text-[16px] leading-[100%] tracking-[-0.02em] w-[93px] h-[19px] opacity-100">
                                            Get in Touch
                                        </p>
                                    </button>



                               
                            </div>


                            
                        </div>



            </div>



            {/* Section -8 */}
            <div className="w-[1920px] h-[750.8px] absolute top-[7125.22px] pt-[140px] pr-[220px] pb-[140px] pl-[220px] gap-[100px] opacity-100 bg-[#264D4B] flex">
                <div className="w-[1920px] h-[750.8px]">
                    <img src={App} alt="" />
                </div>

                <div className='w-[798px] h-[351px] gap-[60px] opacity-100 text-white flex flex-col'>

                    <p className="w-[798px] h-[174px] font-inter font-bold text-[72px] leading-[100%] tracking-[-0.02em] opacity-100">
                        Work with Your Favorite Apps
                    </p>

                    <p className="w-[798px] h-[30px] font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em] opacity-100">
                        Seamlessly integrate with Google Workspace, Microsoft Teams, Zoom, and more
                    </p>

                    <button className="w-[194px] h-[63px] pt-[20px] pr-[40px] pb-[20px] pl-[40px] gap-[10px] rounded-[8px] opacity-100 bg-[#6A9D9A] flex items-center justify-center">
                            <p className="font-inter font-medium text-[18px] leading-[23px] tracking-[-0.02em] w-[90px] h-[23px] opacity-100">
                            Read more
                            </p>
                            <FaArrowRight className='w-[14px] h-[14px] opacity-100 border border-[1px]' />

                    </button>



                </div>
            </div>

            {/* Section 9 (Testimonials) */}
            <div className="absolute w-[1919px] h-[994.46px] top-[7876.02px] pt-[140px] pr-[220px] pb-[140px] pl-[220px] gap-[60px] opacity-100">
                <h2 className="font-inter font-bold text-[70px] leading-[84px] tracking-[0px] text-center">
                    What Our Clients{" "}
                    <span className="relative ">
                    Says
                    <img
                        src={Group}
                        alt=""
                        className="absolute bottom-0 left-0 w-[257.97px] h-[47.67px] z-[-1]"
                    />
                    </span>
                </h2>




                {/* Testimonials */}
                <div className="w-[1479px] h-[498.46px] gap-[32px] flex flex-row items-center mt-[40px] flex items-center justify-center "> 
     
                    <Testtimonials/>

                </div>

            </div>


            {/* Section-10 (contact us) */}
            <div className="absolute w-[1919px] h-[737px] top-[8838px] opacity-100 bg-[#F2F8F5]">
                {/* Background outlined text */}
                <h1
                    className="absolute w-[1783.07px] h-[293.95px] top-[-64.6px] left-[19.99px] opacity-30 
                    font-['Outfit'] font-bold text-[246.93px] leading-[100%] tracking-[0%] lowercase
                    text-transparent [-webkit-text-stroke:1.5px_black]"
                >
                    contact us
                </h1>

                
                <p
                    className="absolute w-[726.29px] h-[214.43px] top-[120.7px] left-[185.24px] opacity-100 
                    font-['Outfit'] font-bold text-[64.08px] leading-[100%] tracking-[0%] text-[#264D4B]
                    "
                >
                    Have a Query! <br />
                    Let’sdiscuss
                </p>
                <p
                    className="absolute w-[760.93px] h-[224.36px] top-[362.11px] left-[185.24px] 
                                font-['Outfit'] font-normal text-[30.08px] leading-[50px] tracking-[0%] opacity-100 text-[#264D4B]"
                    >
                    Thank you for getting in touch!Kindly. Fill the form, have a great day!
                </p>

                <form className="grid grid-cols-2 gap-6 font-['Outfit'] text-[18px] text-[#133D33]">
                    {/* row 1 */}
                        <input type="text"  className="absolute top-[120.7px] left-[1131.41px] w-[250.53px] h-[26.98px] 
                        font-outfit font-normal text-[20px] leading-[50px] tracking-[0%] 
                        align-middle opacity-100 bg-[#F2F8F5] text-[#264D4B]"
                        placeholder='your Name'
                        />
                        <div className="absolute top-[153.63px] left-[1131.77px] w-[303.47px] border-b border-[#264D4B] opacity-100"></div>

                        <input type="text" 
                        className="absolute top-[120.7px] left-[1455.24px] w-[182.57px] h-[26.98px] 
   font-outfit font-normal text-[20px] leading-[50px] tracking-[0%] align-middle opacity-100 bg-[#F2F8F5] text-[#264D4B]"
                        placeholder='your Email'
                       />  
                       <div className="absolute top-[153.63px] left-[1455.27px] w-[302.47px] border-b border-[#264D4B] opacity-100"></div>

                       {/* row2 */}
                       <input type="number" 
                        className="absolute top-[222.95px] left-[1131.24px] w-[182.57px] h-[26.98px] 
   font-outfit font-normal text-[20px] leading-[50px] tracking-[0%] align-middle opacity-100 bg-[#F2F8F5] text-[#264D4B]"
                        placeholder='your Phone Number'
                       />  
                     <div className="absolute top-[255.82px] left-[1131.77px] w-[303.47px] border-b border-[#264D4B] opacity-100"></div>
                     
                     
                     
                     <select className="absolute top-[224.37px] left-[1455.24px] w-[303.47px] border-b border-[#264D4B] opacity-100 focus:ring-[#264D4B] decoration-none">
    <option value="">Country </option>
    <option value="india">India</option>
    <option value="usa">Russia</option>
    <option value="uk">UK</option>
    <option value="canada">Canada</option>

  </select>
                     <div className="absolute top-[255.82px] left-[1455.27px] w-[303.47px] border-b border-[#264D4B] opacity-100"></div>




                     <input type="text" 
                        className="absolute top-[312.41px] left-[1131.41px] w-[250.54px] h-[51.12px] opacity-100
                font-outfit font-normal text-[20px] leading-[50px] tracking-[0] align-middle bg-[#F2F8F5] text-[#264D4B"
                        placeholder='Describe Query'
                       />
                       <div className="absolute top-[358.01px] left-[1131.77px] w-[303.47px] border-b border-[#264D4B] opacity-100" /> 


                        <select className="absolute top-[311.08px] left-[1455.24px] w-[303.47px] border-b border-[#264D4B] opacity-100 focus:ring-[#264D4B] decoration-none">
    <option value="">Query Related</option>
    <option value="india">Query1</option>
    <option value="usa">Query2</option>
    <option value="uk">Query3</option>
    <option value="canada">Query4</option>
   
  </select>
                       
                       <div className="absolute top-[358.01px] left-[1455.27px] w-[303.47px] border-b border-[#264D4B] opacity-100" />






                    <input type="text" 
                        className="absolute top-[418.91px] left-[1131.41px] w-[149.26px] h-[52.54px] opacity-100 
                font-outfit font-normal text-[20px] leading-[50px] tracking-[0] align-middle  bg-[#F2F8F5] text-[#264D4B]"
                        placeholder='Message'
                       />
                     <div className="absolute top-[465.64px] left-[1131.77px] w-[626px] border-b border-[#264D4B] opacity-100 " />


                    <button className="absolute top-[516.89px] left-[1127.41px] w-[234.54px] h-[76.68px] rounded-[10px] opacity-100 bg-[#264D4B]" type='submit'>
                            <p className='absolute top-[15.04px] left-[58.47px] w-[113.27px] h-[45.44px] opacity-100 text-white'>Submit</p>
                    </button>

                </form>
            </div>

        </div>
    );
};

export default Acedmic;
