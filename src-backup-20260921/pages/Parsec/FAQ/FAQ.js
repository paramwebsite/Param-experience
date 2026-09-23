import React, { useEffect } from "react";
import ParsecNav from "../../../components/parsec/ParsecNav";
import ParsecFooter from "../../../components/footer/ParsecFooter";
import FAQContent from "../../../components/parsec/FAQs/FAQContent";
import "./FAQ.css";

export default function FAQ() {
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });

  return (
    <div className="faqPage">
      <ParsecNav />
      <FAQContent />
      <ParsecFooter />
    </div>
  );
}
