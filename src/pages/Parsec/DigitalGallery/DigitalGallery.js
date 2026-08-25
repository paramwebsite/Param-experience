import React, { useEffect } from "react";
import IncityNavbar from "../../../components/parsec/parsecNavbar";
import "./Digital.css";
import ParsecFooter from "../../../components/footer/ParsecFooter";

export default function DigitalGallery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
  return (
    <div className="digitalGallery">
      <IncityNavbar />
      <div className="digitalContent">
        <div className="subContent1">
          <div className="digitalContentDescription">
            <div className="digitalContentHead">
              <h1>DIGITAL GALLERY</h1>
            </div>
            <p>
              Welcome to the Digital Galaxy, a pioneering science experience
              centre where the realms of the impossible and the technological
              merge to redefine reality. Here, you'll grasp the essence of how
              technology can simplify intricate concepts, making learning an
              exhilarating experience. In this zone we want you to experience
              and think beyond human capabilities that are possible with
              technology.
              <br />
              <br />
              Here we create experiences that would make you understand complex
              theories and processes in a fun and surreal way. So that you can
              get the grapes of how technology can be used to inculcate any
              possible task and can go beyond that too.
              <br />
              <br /> To do this, there is a small practice. Every simple
              mechanism should have input and output sources. We want you to
              practise finding those input and output sources when you visit the
              digital galaxy.
              <br />
              <br /> As a part of ever expanding technological era we want to
              give you a taste of what all the limitless possibilities are
              there.
            </p>
          </div>
          <div className="digitalContentBanner"></div>
        </div>
      </div>
      <ParsecFooter />
    </div>
  );
}
