import React, { useEffect /*, { useRef, useState }*/ } from "react";
import "./Evolution.css";
import ParamNavbar from "../../components/Navbar";
import PortalEffectHeroSlider from "../../components/evolutionOfScience/PortalEffectHeroSlider";

const Evolution = ({ kiosk }) => {
  console.log(kiosk)

  useEffect(() => {
    if(kiosk){
      // Apply the viewport meta tag when the component mounts
      const viewportMetaTag = document.createElement('meta');
      viewportMetaTag.name = 'viewport';
      viewportMetaTag.content = 'width=device-width, user-scalable=no';
  
      // Append the meta tag to the document head
      document.head.appendChild(viewportMetaTag);
  
      // Remove the meta tag when the component unmounts
      return () => {
        document.head.removeChild(viewportMetaTag);
      };
    }
  }, [kiosk]);

  useEffect(() => {
    let isPinching = false;

    const handleTouchStart = (event) => {
      if (event.touches.length >= 2) {
        isPinching = true;
      }
    };

    const handleTouchEnd = () => {
      isPinching = false;
    };

    const preventZoom = (event) => {
      if (isPinching) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchmove", preventZoom, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", preventZoom);
    };
  }, []);

  return (
    <div className="evolution-sci">
      {!kiosk && <ParamNavbar />}

      <PortalEffectHeroSlider />
      {/* {(isSmallScreen.current && !enterFullScreen) && (
        <div className="prompt">
          <button onClick={requestFullscreen}>click me</button>
        </div>
      )} */}
    </div>
  );
};

export default Evolution;
