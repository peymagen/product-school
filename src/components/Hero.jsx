// import React from 'react';
// import { FaArrowRight } from 'react-icons/fa';  


// const Hero = () => (
  
//       <div className="relative flex flex-col lg:flex-row items-center justify-between w-[1920px] h-[829px]  px-[220px] py-[140px] gap-[67px] relative overflow-hidden bg-[#264D4B]">
        
      
        
//         {/* Left Side */}
//         <div className="z-10 w-[589px] h-[438px] flex flex-col gap-[60px] text-center lg:text-left">
//           <h1 className="text-white w-[589px] h-[231px] font-bold leading-[100%] tracking-[-2%] text-[64px]" style={{ fontFamily: 'Inter' }}>
//             One Platform for<br />Your Entire Campus
//           </h1>
//           <p className="text-white w-[589px] h-[60px] font-normal leading-[30px] tracking-[-2%] text-[18px] opacity-90" style={{ fontFamily: 'Inter' }}>
//             Manage your school or college website, ERP, and communication — all in one place.
//           </p>
//           <button className="bg-[#6A9D9A] text-white w-[156px] h-[63px] p-5 rounded-lg shadow hover:bg-[#4a7c76] transition flex items-center justify-center gap-[10px]">
            
           
//               Book Demo
            
//             <FaArrowRight className="w-[10px] h-[10px] " />
//           </button>
//         </div>
        
//         {/* Right Side */}
//         <div className="z-10 w-[824px] h-[549px] flex items-center justify-center gap-[4px] bg-[#C4DEFD]">
          
//         </div>
//       </div>
  

  
// );

// export default Hero;





import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styles from './Hero.module.css';  // Import CSS Module

const Hero = () => (
  <div className={styles.hero}>
    {/* Left Side */}
    <div className={styles.heroContent}>
      <h1 className={styles.title}>
        One Platform for Your Entire Campus
      </h1>
      <p className={styles.subtitle}>
        Manage your school or college website, ERP, and communication — all in one place.
      </p>
      <button className={styles.button}>
        Book Demo
        <FaArrowRight className="w-[10px] h-[10px]" />
      </button>
    </div>

    {/* Right Side */}
    <div className={styles.rightBox}>
      {/* Add image or illustration here later */}
    </div>
  </div>
);

export default Hero;
