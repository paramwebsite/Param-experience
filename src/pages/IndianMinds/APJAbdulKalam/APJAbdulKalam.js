import React, { useEffect, useState } from "react";
import "./APJAbdulKalam.css";
import IMNavbar from "../../../components/IndianMinds/IMNavbar";
import DContent from "../../../components/IndianMinds/APJAbdulKalam/DContent";
import MContent from "../../../components/IndianMinds/APJAbdulKalam/MContent";

export default function () {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure this runs once when the component mounts

  return (
    <div className="APJ">
      <IMNavbar />
      {screenWidth < 450 ? <MContent /> : <DContent />}
    </div>
  );
}
