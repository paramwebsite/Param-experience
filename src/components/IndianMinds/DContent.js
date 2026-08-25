import React from "react";
import { useContext } from "react";
import { ImagesContext } from "../../pages/IndianMinds/IndianMinds"; // Adjust the path
import { Link } from "react-router-dom";

function Card({ image, altText, route }) {
  return (
    <div className="IMcard" style={{ backgroundImage: `url('${image}')` }}>
      <div className="textContent">
        <p>{altText}</p>
        <div className="IMbutton">
          <Link className="bttn" to={route}>
            SELECT
          </Link>
        </div>
      </div>
    </div>
  );
}

function CardsHolder() {
  const images = useContext(ImagesContext);
  return (
    <div className="IMcards-table">
      {images.map((img, index) => (
        <Card key={index} image={img.src} altText={img.altText} route={img.route} />
      ))}
    </div>
  );
}

export default function DContent() {
  return (
    <div className="DContent">
      <CardsHolder />
    </div>
  );
}
