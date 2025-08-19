import { IoMdCheckboxOutline } from "react-icons/io";

const Card = ({ title, features, type }) => {
  const isDark = type === "dark";

  return (
    <div
      className={`w-[397.75px] h-[405px] gap-[25px] rounded-[10px] p-[40px_44px] ${
        isDark ? "bg-[#264d4b]" : "border border-[#FFE492]"
      }`}
    >
      <p
        className={`font-inter font-bold text-[36px] leading-[1] tracking-[-0.02em] ${
          isDark ? "text-[#FFE492]" : "text-black"
        }`}
      >
        {title}
      </p>
      <div className="mt-[28px]">
        {features.map((feature, i) => (
          <div key={i} className="flex mt-[19px]">
            <IoMdCheckboxOutline
              className={`w-[18px] h-[18px] mr-2 ${
                isDark ? "text-[#FFE492]" : "text-black"
              }`}
            />
            <p
              className={`font-inter font-normal text-[16px] leading-[20px] tracking-[-0.02em] ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {feature}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
