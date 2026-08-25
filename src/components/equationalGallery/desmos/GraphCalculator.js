import React, { useEffect, useRef } from "react";
import { useState } from "react";

export default function GraphCalculator() {
  const calculatorRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [calculator, setCalculator] = useState(null);

  useEffect(() => {
    // Add the script to the document
    const script = document.createElement("script");
    script.src =
      "https://www.desmos.com/api/v1.8/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
    script.async = true;
    document.body.appendChild(script);

    // Wait for the script to load before initializing the calculator
    script.onload = () => {
      if (calculatorRef.current) {
        const calculator = window.Desmos.GraphingCalculator(
          calculatorRef.current
        );
        setCalculator(calculator);
        setIsLoaded(true);
      }
    };

    // Clean up on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleButtonClick = (event) => {
    event.preventDefault();
    if (calculator) {
      const expression = event.target.getAttribute("data-expression");
      calculator.setExpression({ id: "m", latex: expression });
    }
  };

  const scrollToSection = (sectionId, event) => {
    event.preventDefault();
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <div className="calculatorContainer">
      {!isLoaded && (
        <div className="loader">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      <div
        id="calculator"
        ref={calculatorRef}
        style={{ width: "60%", height: "70%" }}
      />
      <div className="buttonContainer">
        <a href="#" className="button" data-expression="r\theta=600\sqrt{\cos\left(\frac{\theta\pi}{3}\right)}" onClick={handleButtonClick}>
          Set Example Expression
        </a>
        <a href="#desmosContent" className="button" onClick={(e) => scrollToSection('desmosContent', e)}>
          How to use
        </a>
        <a href="#example" className="button" onClick={(e) => scrollToSection('example', e)}>
          See some more Expressions
        </a>
      </div>
    </div>
  );
}
