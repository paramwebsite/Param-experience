import React from "react";
import CardSlot from "./CardSlot";
import cardData from "./cardData";
import Spline from "@splinetool/react-spline";

export default function Content() {
  return (
    <div className="expContainer">
      <div className="expImg">
        <div className="expTag">
          <h1>Experience Science Online</h1>
          <p>
            Welcome to our immersive experience page, where you can explore the exciting world of science through alien worlds, immersive applications, crazy digital stories, cutting edge technologies and really cool science games.
          </p>
        </div>
      </div>
      <div className="cardsContainer">
        <div className="cardHolder">
          {cardData.map((card) => (
            <CardSlot
              key={card.id}
              id={card.id}
              linkType={card.linkType}
              linkURL={card.linkURL}
              buttonText={card.buttonText}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
