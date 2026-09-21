import React from "react";
import "./loader.css";

function CardSlot({ id, linkType, linkURL, buttonText }) {
  return (
    <div className="cardSlot">
      <div id={id} className="cardDisplay">
        <div className="gradient"></div>
        <div className="buttonContainerNew">
          <div className="button">{buttonText}</div>
        </div>
      </div>
    </div>
  );
}

export default CardSlot;
