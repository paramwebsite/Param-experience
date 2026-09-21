import React, { useEffect } from "react";
import IncityNavbar from "../../../components/parsec/parsecNavbar";
import "./Cardboard.css";
import ParsecFooter from "../../../components/footer/ParsecFooter";

export default function CardboardGallery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
  return (
    <div className="cardboardGallery">
      <IncityNavbar />
      <div className="cardboardContent">
        <div className="subContent1">
          <div className="cardboardContentDescription">
            <div className="cardboardContentHead">
              <h1>CARDBOARD GALLERY</h1>
            </div>
            <p>
              "Cardboard Cosmos: A Lilliputian World" is an innovative
              collaboration between Param Science Experience Centre and Out of
              the Box, blending aerospace engineering with artistic creativity.
              This unique exhibit showcases an array of cardboard mockups, from
              classic jets to futuristic airships, each piece a testament to
              intricate craftsmanship and imaginative design.<br /><br /> In this realm
              where creativity knows no bounds, visitors encounter flights and
              airships designed like never before. Positioned elegantly or
              suspended dynamically, these creations illustrate the
              transformative power of cardboard, turning a simple material into
              complex, inspiring science exhibits.<br /><br /> More than a display,
              Cardboard Cosmos invites visitors into a miniaturized world,
              imagined and constructed by beings a fraction of human size. Every
              detail, from tiny houses to minuscule furniture, is carefully
              crafted, offering an immersive experience in this Lilliputian
              universe.<br /><br /> Cardboard Cosmos celebrates the versatility of cardboard
              as a sustainable, flexible material ideal for creating
              captivating, educational science exhibits. It embodies the spirit
              of innovation, where cardboard becomes a medium for discovery and
              education, offering new insights into the worlds of science and
              engineering.<br /><br />Join us at Cardboard Cosmos for a journey into a
              realm where imagination and science unite, crafting a visionary
              world of possibilities with cardboard.
            </p>
          </div>
          <div className="cardboardContentBanner"></div>
        </div>
      </div>
      <ParsecFooter />
    </div>
  );
}
