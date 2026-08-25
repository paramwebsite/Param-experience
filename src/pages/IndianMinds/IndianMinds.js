import React, { useEffect, useState } from "react";
import cvraman from "./Assets/Dr CV Raman.png";
import jamsetji from "./Assets/Jamsetji Tata.png";
import kalam from "./Assets/APJ abdul kalam.png";
import "./IndianMinds.css";
import ParamNavbar from "../../components/Navbar";
import DContent from "../../components/IndianMinds/DContent";
import MContent from "../../components/IndianMinds/MContent";
import Footer from "../../components/footer/Footer";

export const ImagesContext = React.createContext();

export default function IndianMinds() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure this runs once when the component mounts

  const images = [
    { src: cvraman, altText: "Dr. C.V Raman", route: "/cv-raman" },
    { src: jamsetji, altText: "Shree Jamsetji Tata", route: "/jamshetji-tata" },
    { src: kalam, altText: "Dr. A.P.J Abdul Kalam", route: "/apj-abdul-kalam" },
  ];

  return (
    <div className="indianMinds">
      <ParamNavbar />
      <div className="IMcaption">
        <h1>CHOOSE YOUR LEGEND</h1>
      </div>
      <ImagesContext.Provider value={images}>
        {screenWidth < 450 ? <MContent /> : <DContent />}
      </ImagesContext.Provider>
      <Footer />
    </div>
  );
}
