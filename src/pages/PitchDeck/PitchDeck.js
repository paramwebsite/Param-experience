import "./PitchDeck.css";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParamNavbar from "../../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

function PitchDeck() {

  return (
    <div className="pitchDeckContainer">
      <ParamNavbar />
      <iframe
        src="https://digitalassestbucket.s3.amazonaws.com/Pitch/index.html"
        title="External Page"
        id="pitchIframe"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default PitchDeck;
