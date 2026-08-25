import React, { useEffect } from "react";
import "./FunScience.css";
// import image from "./public/check.jpg";
import Data from "./Data";
import ParamNavbar from "../../components/Navbar";

function Card({ redLink, altText, imgSrc /*, route */ }) {
  // Truncate the altText if it exceeds 20 characters
  const truncatedText =
    altText.length > 20 ? altText.substring(0, 20) + "..." : altText;

  return (
    <a href={redLink} target="_blank" rel="noopener noreferrer">
      <div className="card">
        <img className="imgStyle" src={imgSrc} alt={altText} title={altText} />
        <div className="content">
          <span>{truncatedText}</span>
        </div>
      </div>
    </a>
  );
}

function CardsTable({ images }) {
  return (
    <div className="cards-table">
      {images.map((img, index) => (
        <Card
          key={index}
          redLink={img.redSrc}
          altText={img.altText}
          imgSrc={img.imgSrc}
        />
      ))}
    </div>
  );
}

export default function FunScience() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    console.log("scrolling to top");
  }, []);
  return (
    <>
      <ParamNavbar />
      <div className="funScience">
        <div className="headContent">
          <h1>Fun Science Online</h1>
          <p>
            Collection of fun Sciencey things to do from around the internet
          </p>
        </div>
        <CardsTable images={Data} />
      </div>
    </>
  );
}
