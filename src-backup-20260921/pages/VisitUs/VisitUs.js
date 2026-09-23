import React, { useEffect } from "react";
import ParsecNav from "../../components/parsec/ParsecNav";
import Content from "../../components/visitUs/Content";
import "./VisitUs.css";
import ParsecFooter from "../../components/footer/ParsecFooter";

export default function VisitUs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });

  return (
    <div className="visitUs">
      <ParsecNav />
      <Content />
      <ParsecFooter />
    </div>
  );
}
