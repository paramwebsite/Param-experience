import React, { useEffect, useRef, useState } from "react";
import "./SideBar.css";
import fieldsFrequency from "./FieldsFrequency";
import fieldColors from "./FieldsColor";

const Sidebar = ({ fieldRefs, setLoading }) => {
  const markerRef = useRef(null);
  const colorBarRef = useRef(null); // Reference for the color bar
  const [currentLetter, setCurrentLetter] = useState("A");

  useEffect(() => {
    const handleScroll = () => {
      let passedFields = 0;
      let colorIndex = 0;

      fieldRefs.forEach((ref, idx) => {
        if (
          ref.current.getBoundingClientRect().top <
          window.innerHeight / 0.8
        ) {
          passedFields++;
        }
        if (ref.current.getBoundingClientRect().top < window.innerHeight / 3) {
          colorIndex = idx; // Track the index of the last field in viewport
        }
      });

      let cumulativeFields = 0;
      let newLetter = "A";

      fieldsFrequency.some((field) => {
        cumulativeFields += field.count;
        if (passedFields <= cumulativeFields + 1) {
          newLetter = field.letter;
          return true;
        }
        return false;
      });
      setCurrentLetter(newLetter);

      // Update the color of the rectangle bar
      if (colorBarRef.current) {
        colorBarRef.current.style.backgroundColor = fieldColors[colorIndex];
      }
    };

    // Delay the attachment of the scroll listener
    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100); // delay for 100ms, adjust as necessary
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [fieldRefs]);

  useEffect(() => {
    const setMarkerAndColorBarPosition = () => {
      const letterElements = document.querySelectorAll(".sidebar .letter");
      const currentLetterElement = Array.from(letterElements).find(
        (el) => el.textContent === currentLetter
      );
      if (currentLetterElement && markerRef.current && colorBarRef.current) {
        const topPosition =
          currentLetterElement.offsetTop === 0
            ? "5.8%"
            : `${currentLetterElement.offsetTop - 4}px`;
        markerRef.current.style.top = topPosition;
        colorBarRef.current.style.top = topPosition;
        // Hide the loading screen once everything is positioned
        setLoading(false);
        document.body.style.overflow = "visible";
      }
    };

    if (document.readyState === "complete") {
      // If document is already loaded, directly set positions
      setMarkerAndColorBarPosition();
    } else {
      // Otherwise, wait for the window to load before setting positions
      window.addEventListener("load", setMarkerAndColorBarPosition);
      return () =>
        window.removeEventListener("load", setMarkerAndColorBarPosition);
    }
  }, [currentLetter, setLoading]);

  return (
    <div className="navbar">
      <div className="sidebar">
        <div className="color-bar" ref={colorBarRef}></div>
        <img
          src="https://digitalassestbucket.s3.amazonaws.com/Fields+of+Science/Asset/Pointer.svg"
          className="marker"
          ref={markerRef}
          alt="Marker"
        />
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map(
          (letter) => (
            <div
              key={letter}
              className={`letter ${letter === currentLetter ? "active" : ""}`}
            >
              {letter}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
