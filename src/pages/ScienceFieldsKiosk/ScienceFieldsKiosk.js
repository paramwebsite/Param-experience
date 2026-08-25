import React, { useEffect, useRef, useState } from "react";
import "./ScienceFieldsKiosk.css";
import "./Loading.css";
import ScienceField from "../../components/scienceFieldsKiosk/ScienceField";
import Sidebar from "../../components/scienceFieldsKiosk/SideBar";
import CustomNav from "../../components/scienceFieldsKiosk/CustomNav";

export default function ScienceFieldsKiosk() {
  const [loading, setLoading] = useState(true);
  const fields = Array.from({ length: 53 }, (_, i) => i + 1);

  // Using useRef instead of useState to store refs
  const fieldRefs = useRef(fields.map(() => React.createRef()));

  useEffect(() => {
    // Apply the viewport meta tag when the component mounts
    const viewportMetaTag = document.createElement("meta");
    viewportMetaTag.name = "viewport";
    viewportMetaTag.content = "width=device-width, user-scalable=no";

    // Append the meta tag to the document head
    document.head.appendChild(viewportMetaTag);

    // Remove the meta tag when the component unmounts
    return () => {
      document.head.removeChild(viewportMetaTag);
    };
  }, []);

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

    // const handleTouchStart = (event) => {192.168.0.102:3000
    //   if (event.touches.length >= 2) {
    //     isPinching = true;
    //     event.preventDefault();
    //   }
    // };

    // const handleTouchEnd = (event) => {
    //   if (event.touches.length >= 2) {
    //     event.preventDefault();
    //     isPinching = false;
    //   }
    // };

    const preventZoom = (event) => {
      // event.preventDefault();
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

  useEffect(() => {
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });// Disable scrolling on the body element
  document.body.style.overflow = "hidden";

  // Reset the overflow values to their original values after a slight delay
  setTimeout(() => {
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";
    // console.log(document.body.style.overflow);
    // console.log(window.getComputedStyle(document.body).overflow);
  }, 3000); // 1000ms should be enough, but you can adjust if needed
  }, []);

  return (
    <div className="scienceFieldsKiosk">
      <CustomNav />

      {loading && (
        <div className="loading scene">
          <div className="cube-wrapper">
            <div className="cube">
              <div className="cube-faces">
                <div className="cube-face shadow"></div>
                <div className="cube-face bottom"></div>
                <div className="cube-face top"></div>
                <div className="cube-face left"></div>
                <div className="cube-face right"></div>
                <div className="cube-face back"></div>
                <div className="cube-face front"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {fields.map((id, index) => (
        <ScienceField key={id} id={id} ref={fieldRefs.current[index]} />
      ))}
      <Sidebar fieldRefs={fieldRefs.current} setLoading={setLoading} />
    </div>
  );
}
