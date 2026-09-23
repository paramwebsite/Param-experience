import React, { useEffect } from "react";
import IncityNavbar from "../../../components/parsec/parsecNavbar";
import "./Tactile.css";
import ParsecFooter from "../../../components/footer/ParsecFooter";

export default function TactileGallery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
  return (
    <div className="tactileGallery">
      <IncityNavbar />
      <div className="tactileContent">
        <div className="subContent1">
          <div className="tactileContentDescription">
            <div className="tactileContentHead">
              <h1>TACTILE GALLERY</h1>
            </div>
            <p>
              Hey, I'm Huggsy! I'm on a unique mission, and I need your help.
              Once, I was in tune with every texture and sensation around me,
              but now, that connection's gone. I'm inviting you to help me find
              it again.
              <br />
              <br /> Think of the little things – the feel of raindrops, the
              warmth of the sun, the roughness of tree bark. I miss that. Step
              into my world, where each exhibit, from the rhythmic Musical Steps
              to the intriguing Interactive Illuminations, is a piece of the
              puzzle in understanding what touch truly means.
              <br />
              <br /> As the journey unfolds, we'll uncover the secrets behind
              touch. Feel the surprise at the Texture Tiles and experience a
              spark at the Van de Graaff Generator. It's not just about feeling,
              it's about understanding and reconnecting.
              <br />
              <br /> But there's more. We'll explore how touch goes beyond the
              physical. How does it shape our perception and our experiences?
              The psychological touch section will challenge what you think you
              know about sensation.
              <br />
              <br /> So, are you ready to join me on this extraordinary journey?
              <br />
              <br /> Come, and see for yourself – will I rediscover my long-lost
              sense of touch? The adventure awaits you! Every step we take is a
              step towards a sensory experience that's about rediscovery,
              reconnection, and reawakening our understanding of TOUCH.
            </p>
          </div>
          <div className="tactileContentBanner"></div>
        </div>
      </div>
      <ParsecFooter />
    </div>
  );
}
