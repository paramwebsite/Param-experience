import React, { useRef } from "react";
import NavrasaField from "../../../components/parsec/IllusionGallery/NavrasaField";
import "./Navrasa.css";
import paragraphsData from "../../../components/parsec/IllusionGallery/ParagraphData";

export default function Navrasa() {
  //   const fields = Array.from({ length: 9 }, (_, i) => i + 1);

  const fields = paragraphsData;
  // Using useRef instead of useState to store refs
  const fieldRefs = useRef(fields.map(() => React.createRef()));
  
  return (
    <div className="navrasa">
      <div className="firstPage"></div>
      {fields.map((id, index) => (
        <NavrasaField key={index+1} id={index+1} paragraphs={id.paragraphs} ref={fieldRefs.current[index]} />
      ))}
    </div>
  );
}
 