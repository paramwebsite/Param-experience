import React, { useEffect } from "react";
import IncityNavbar from "../../../components/parsec/parsecNavbar";
import "./Intro.css";
import ParsecFooter from "../../../components/footer/ParsecFooter";

export default function IntroGallery() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  });
  return (
    <div className="introGallery">
      <IncityNavbar />
      <div className="introContent">
        <div className="subContent1">
          <div className="introContentDescription">
            <div className="introContentHead">
              <h1>INTRO GALLERY</h1>
            </div>
            <p>
              Project Param is an expansive and visionary initiative, spreading
              over 16 acres in Channenahalli, Bengaluru. This multifaceted
              project includes Science Experience Centre, Cultural Experience Centre, Convention Centre, Incubation and
              Innovation labs, Historic Experience Theatre and 250 guest rooms. <br /><br />Born from the enduring legacy of the
              Janaseva Trust's five decades of nation-building, Project Param
              stands as a symbol of growth and innovation in Bengaluru. As the
              construction progresses towards completion by the end of 2023,
              this project is set to become a landmark of the city, embodying
              pride and inspiration for the future.<br /><br /> The Param Science Experience
              Centre is not just a science museum but an experiential science
              centre that sets new standards for scientific exploration. This
              world-class facility serves as an extraordinary hub of creativity
              and innovation, designed to ignite a lifelong passion for science
              and technology in visitors of all ages. Guided by the ethos of
              nurturing creativity, inspiring curiosity, and building
              confidence, the centre draws inspiration from the five elements:
              fire, earth, water, air, and space.<br /><br /> Our passion goes beyond
              inspiring visitors of all ages, we are committed to making Science
              a lifestyle. Whether it be our monthly science magazine or
              innovative campaigns like the Bangalore Science Campaign, we have
              already touched lives with Science. To keep this spirit alive, we
              need your help. Philanthropy fuels our innovation, from creating
              the next exhibit to helping teachers improve science education.
              It’s donations from people like you that keep us going. To know
              more about how you can be a part of this and help be a catalyst
              for curiosity, learning and discovery, visit:
              <a href="https://paraminnovation.org/donate-science-centre/"> https://paraminnovation.org/donate-science-centre/</a>
            </p>
          </div>
          <div className="introContentBanner">
          </div>
        </div>
      </div>
      <ParsecFooter />
    </div>
  );
}
