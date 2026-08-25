import React from "react";
import { useContext } from "react";
import { ImagesContext } from "../../pages/IndianMinds/IndianMinds"; // Adjust the path
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Card({ key, image, altText, route }) {
  return (
    <div className="IMcard" style={{ backgroundImage: `url("${image}")` }}>
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
    <Carousel
      className="IMcards"
      showStatus={false}
      showThumbs={false}
      infiniteLoop={false}
      autoPlay={false} // if you want auto-play feature
    //   interval={3000} // adjust this time for auto-play duration
    >
      {images.map((img, index) => (
        <div className="IMcardHolder" key={index}>
          <Card image={img.src} altText={img.altText} route={img.route} />
        </div>
      ))}
    </Carousel>
  );
}

export default function MContent() {
  return (
    <div className="MContent">
      <CardsHolder />
    </div>
  );
}
