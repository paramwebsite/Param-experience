import React, { useEffect, useState } from "react";
import CardSlot from "./CardSlot";
import cardData from "./cardData";
import Spline from "@splinetool/react-spline";
import Footer from "../footer/Footer";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen";

export default function Content() {
  const screenWidth = window.innerWidth;
  const [isLoading, setLoading] = useState(true);
  // let flag = 0;

  const splineLoaded = (spline) => {
    // if (flag === 1) {
    console.log("loaded");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // }
    // flag += 1;
  };

  const scrollDown = () => {
    console.log("scroll down clicked");
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    window.scrollTo({
      top: viewportHeight,
      behavior: "smooth", // Optional: for smooth scrolling
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  useEffect(() => {}, [isLoading]);

  return (
    <div className="expContainer">
      <div className={isLoading ? "" : "hidden"}>
        <LoadingScreen />
      </div>
      <div className={isLoading ? "hidden" : ""}>
        {screenWidth > 450 ? (
          <div className="firstInteraction">
            {/* {isLoading && <LoadingScreen />} */}
            <Spline
              className="splineScene"
              scene="https://prod.spline.design/EYrUus1uXb-txpTH/scene.splinecode"
              onLoad={splineLoaded}
            />
            {console.log("spline jsx")}
            <div className="firstInteractionContent">
              <p className="pageContent">
                Welcome to our immersive experience page, where you can explore
                the exciting world of science through alien worlds, immersive
                applications, crazy digital stories, cutting edge technologies
                and really cool science games.
              </p>
              <div className="scrollDown" onClick={scrollDown}>
                <p className="instruction">Scroll Down</p>
                <div className="scrollIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="firstInteraction">
            {isLoading && <LoadingScreen />}
            <Spline
              className="splineScene"
              scene="https://prod.spline.design/N4ulzrL45o-snFpq/scene.splinecode"
              onLoad={splineLoaded}
            />
            <div className="firstInteractionContent">
              <p className="pageContent">
                Welcome to our immersive experience page, where you can explore
                the exciting world of science through alien worlds, immersive
                applications, crazy digital stories, cutting edge technologies
                and really cool science games.
              </p>
              <div className="scrollDown" onClick={scrollDown}>
                <p className="instruction">Scroll Down</p>
                <div className="scrollIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="14"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#ffffff"
                      d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="cardsContainer">
          <div className="cardContent">
            <h1>
              Ready for a Fun Explosion? Unleash Our{" "}
              <span>Digital Wonderland!</span>
            </h1>
            <p>
              Forget boredom! Our incredible digital apps are your ticket to
              hours of laughter, adventure, and creative exploration. From
              brain-bending puzzles to side-splitting stories, dive in and
              discover a world of endless possibilities.
            </p>
          </div>
          <div className="cardHolder">
            {cardData.map(
              (card, index) =>
                card.linkType === "internal" ? (
                  <Link to={card.linkURL} key={index}>
                    <CardSlot
                      key={card.id}
                      id={card.id}
                      linkType={card.linkType}
                      linkURL={card.linkURL}
                      buttonText={card.buttonText}
                    />
                  </Link>
                ) : (
                  <a href={card.linkURL} key={index}>
                    <CardSlot
                      key={card.id}
                      id={card.id}
                      linkType={card.linkType}
                      linkURL={card.linkURL}
                      buttonText={card.buttonText}
                    />
                  </a>
                )
              // <CardSlot
              //   key={card.id}
              //   id={card.id}
              //   linkType={card.linkType}
              //   linkURL={card.linkURL}
              //   buttonText={card.buttonText}
              // />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
