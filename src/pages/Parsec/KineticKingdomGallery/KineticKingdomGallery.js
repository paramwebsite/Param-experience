import React, { useEffect } from "react";
import IncityNavbar from "../../../components/parsec/parsecNavbar";
import "./Kinetic.css";
import ParsecFooter from "../../../components/footer/ParsecFooter";

export default function KineticKingdomGallery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
  return (
    <div className="kineticGallery">
      <IncityNavbar /> 
      <div className="kineticContent">
        <div className="subContent1">
          <div className="kineticContentDescription">
            <div className="kineticContentHead">
              <h1>KINETIC KINGDOM</h1>
            </div>
            <p>
              Welcome, bold explorer, to the intricate Kinetic Kingdom! You’re
              about to embark on a thrilling journey, a voyage through time and
              imagination. An unexplored civilization, where each corner speaks
              of an unparalleled mastery in motion and mechanics. So, tighten
              your screws, shift your gears, and prepare to delve into a world
              where mechanics and marvels intertwine and come to life.
              <br />
              <br /> From a bicycle that strides like a human, a sight both
              puzzling and brilliant, to a rain made not from clouds but
              mechanical gears. Here, the laws of motion are not just
              understood; they are reinvented, creating sights that will leave
              you in awe.
              <br />
              <br /> Are you ready to embrace the magic of kinetics and delve
              into the world filled with wonders of mechanics that come alive?
              Join us for an astonishing adventure beyond any other! Come
              discover the wonders of the Kinetic Kingdom!
            </p>
          </div>
          <div className="kineticContentBanner">
            {/* <img src="/filter.webp" alt="" /> */}
          </div>
        </div>
      </div>
      <ParsecFooter />
    </div>
  );
}
