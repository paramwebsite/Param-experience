import React, { useEffect, useState } from "react";
import "./Jamsetji.css";
import IMNavbar from "../../../components/IndianMinds/IMNavbar";
import DContent from "../../../components/IndianMinds/JamshetjiTata/DContent";
import MContent from "../../../components/IndianMinds/JamshetjiTata/MContent";

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
    <div className="jamsetjiBioPage">
      <IMNavbar />
      {screenWidth < 450 ? <MContent /> : <DContent />}
    </div>
  );
}
