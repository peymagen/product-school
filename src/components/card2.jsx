
import React from "react";

const Card = ({ quoteImg, text, avatar, name, position, bgColor, textColor }) => {
  return (
    <div className={`w-[472px] h-[498px] p-[60px_40px] gap-[60px] rounded-[10px] flex flex-col ${bgColor}`}>
      <div className={`w-[392px] h-[223px] gap-[32px] pb-[40px] border-b border-[#212529] flex flex-col ${textColor}`}>
        <img src={quoteImg} alt="Quote" className="w-[86px] h-[61px]" />
        <p className="font-inter font-normal text-[18px] leading-[30px] tracking-[-0.02em] w-[392px] h-[90px]">
          {text}
        </p>
      </div>

      <div className="flex w-[383px] h-[95px] gap-[42px]">
        <img src={avatar} alt={name} className="w-[95px] h-[95px]" />
        <div className="w-[246px] h-[95px] flex flex-col items-center justify-center">
          <p className="font-inter font-semibold text-[24px] leading-[36px]">{name}</p>
          <p className="font-inter font-normal text-[16px] leading-[20px]">{position}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
