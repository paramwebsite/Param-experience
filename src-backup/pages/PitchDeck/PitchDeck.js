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
        src="https://digital-applications-assets.sgp1.cdn.digitaloceanspaces.com/digitalassestbucket/Pitch/index.html"
        title="External Page"
        id="pitchIframe"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default PitchDeck;


