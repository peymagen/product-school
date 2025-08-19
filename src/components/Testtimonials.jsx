import React from "react";
import Card from "./card2.jsx";
import { testimonials } from "./data2.js"; 

const App = () => {
  return (
    <div className="w-[1479px] h-[498px] flex flex-row items-center justify-center gap-[32px] mt-[40px]">
      {testimonials.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  );
};

export default App;