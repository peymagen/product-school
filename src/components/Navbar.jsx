import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { IoMdMenu, IoMdClose } from 'react-icons/io';
import { FaArrowRight } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between w-[1920px] h-[92px] px-[220px] py-4 bg-[#264D4B] ">
      
      <div className="flex items-center w-[191px] h-[34px] justify-between relative">
        {/* Logo icon */}
        <div className="w-[37px] h-[29px] bg-white rounded-sm flex items-center justify-center absolute top-[2.5px] left-[20px]">
          <span className="text-[#2F5C5C] font-bold text-lg">A</span>
        </div>
        <span className="text-white font-bold text-[28px] leading-[100%] tracking-[0%] absolute left-[67px] top-0 w-[104px] h-[34px] flex items-center" style={{ fontFamily: 'Inter' }}>
          Acadex
        </span>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex text-white text-sm w-[780.5px] h-[60px] items-center">
        <li className="hover:text-gray-300 cursor-pointer flex items-center w-[113px] h-[24px] ">
          Features
          <MdKeyboardArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
        </li>
        <li className="hover:text-gray-300 cursor-pointer flex items-center w-[116px] h-[24px] ">
          Products
          <MdKeyboardArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
        </li>
        <li className="hover:text-gray-300 cursor-pointer flex items-center w-[128px] h-[24px] ">
          Resources
          <MdKeyboardArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
        </li>
        <li className="hover:text-gray-300 cursor-pointer flex items-center w-[97px] h-[24px] ">
          Pricing
          <MdKeyboardArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
        </li>
        <li>
          <button className="hidden md:flex bg-[#6A9D9A] text-white w-[169px] h-[60px] px-6 py-4 rounded-lg shadow hover:bg-[#4a7c76] transition items-center justify-center gap-2.5 text-sm">
            Get in touch 
            <FaArrowRight className="w-4 h-4" />
          </button>
        </li>
      </ul>
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <IoMdClose className="w-6 h-6" />
        ) : (
          <IoMdMenu className="w-6 h-6" />
        )}
      </button>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#2F5C5C] border-t border-[#4a7c76] md:hidden z-50">
          <ul className="px-4 py-4 space-y-4">
            <li className="text-white hover:text-gray-300 cursor-pointer flex items-center justify-between">
              Features
              <MdKeyboardArrowDown className="w-4 h-4" />
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer flex items-center justify-between">
              Products
              <MdKeyboardArrowDown className="w-4 h-4" />
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer flex items-center justify-between">
              Resources
              <MdKeyboardArrowDown className="w-4 h-4" />
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer flex items-center justify-between">
              Pricing
              <MdKeyboardArrowDown className="w-4 h-4" />
            </li>
            <li className="pt-4 border-t border-[#4a7c76]">
              <button className="w-full bg-[#6A9D9A] text-white px-6 py-4 rounded-lg shadow hover:bg-[#4a7c76] transition flex items-center justify-center gap-2.5">
                Get in touch 
                <FaArrowRight className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;