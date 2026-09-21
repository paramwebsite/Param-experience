import React, { useEffect } from "react";
import IncityNavbar from "../../../components/parsec/parsecNavbar";
import "./Illusion.css";
import Navrasa from "./Navrasa";
import ParsecFooter from "../../../components/footer/ParsecFooter";

export default function IllusionGallery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  })
  return (
    <div className="illusionGallery">
      <IncityNavbar />
      <Navrasa />
      <ParsecFooter />
    </div>
  );
}
