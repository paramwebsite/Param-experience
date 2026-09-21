import React, { useEffect } from "react";
import ParsecNav from "../../components/parsec/ParsecNav";
import ParsecFooter from "../../components/footer/ParsecFooter";
import "./GuideLines.css";
import GuidelinesData from "../../components/Guidelines/GuidelinesData";

export default function GuideLines() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
  return (
    <div className="visitorGuidelines">
      <ParsecNav />
      <div className="guidelineContent">
        <h1>GUIDELINES FOR SCHOOLS, COLLEGES AND CORPORATES</h1>
        <ul>
          {GuidelinesData.map((guideline, index) => (
            <li className="guideline" key={index}>
              <p className="head">{guideline.heading}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html: guideline.content,
                }}
              ></p>
            </li>
          ))}
        </ul>
        <p className="contactBold">
          For any other group tours, such as family trips, summer camps, tuition
          centres, etc., please feel free to contact us at +91 73385 80197 or
          marketing@paraminnovation.org.
        </p>
      </div>

      <ParsecFooter />
    </div>
  );
}
