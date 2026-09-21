import React, { useEffect, useRef, useState } from "react";
import "./IncityGallery.css";
import Content from "../../components/parsec/Content1";
import ParsecNav from "../../components/parsec/ParsecNav";
import ParsecFooter from "../../components/footer/ParsecFooter";
import FAQForParsec from "../../components/parsec/FAQs/FAQForParsec";

export default function IncityGallery() {
  const [alert, setAlert] = useState(null);
  const ticketAlertRef = useRef(null);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  })

  // FETCH DATA FROM API
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    };

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/getAlert`, requestOptions)
      .then((response) => response.json())
      .then((result) => setAlert(result.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAlertClose = () => {
    if(ticketAlertRef.current){
      ticketAlertRef.current.style.display = 'none';
    }
  }

  return (
    <div className="incity">
      <ParsecNav />
      {alert && (
      <div ref={ticketAlertRef} className="ticketAlert box2d">{alert?.message}<img src="/close.svg" alt="" onClick={handleAlertClose} /></div>
      )}
      <Content />
      <FAQForParsec />
      <ParsecFooter />
    </div>
  );
}
