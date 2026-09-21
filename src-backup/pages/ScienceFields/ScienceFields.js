import React, { useEffect } from "react";
import "./ScienceFields.css";
import ParamNavbar from "../../components/Navbar";
import Footer from "../../components/footer/Footer";

export default function ScienceFields() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
    var screenWidth = window.innerWidth;

    var navLinks = document.querySelectorAll(".side-nav ul li a");
    var desktop = document.getElementsByClassName("desktop")[0];
    var mobile = document.getElementsByClassName("mobile")[0];
    let navColors = [
      "#AD7B10",
      "#AD7B10",
      "#4E6D6E",
      "#4E5F33",
      "#7D2B05",
      "#6F2700",
      "#012443",
      "#B1CC81",
      "#981F0E",
      "#233730",
      "#74B3BC",
      "#CD8D5D",
      "#F74521",
      "#643C25",
      "##f2e0a0",
    ];
    if (screenWidth > 450) {
      mobile.classList.remove("active-section");
      desktop.classList.add("active-section");
    } else {
      mobile.classList.add("active-section");
      desktop.classList.remove("active-section");
    }

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current) {
          current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
      });
    });

    window.onload = function () {
      changeActiveNav();
    };

    // JavaScript
    window.onscroll = function () {
      changeActiveNav();
    };

    function changeActiveNav() {
      let sections, nav_links, index;
      const activeSection = document.querySelector(".active-section");
      if (activeSection) {
        sections = activeSection.querySelectorAll(".sContainer > div");
        nav_links = document.querySelectorAll(".side-nav ul li a");
        index = sections.length;
      }

      while (
        --index &&
        window.scrollY + window.innerHeight / 2 < sections[index].offsetTop
      ) {}

      if (nav_links) {
        nav_links.forEach((link) => {
          link.classList.remove("active");
          // Change the color of all links
          link.style.backgroundColor = navColors[index];
          // Also change the color of <p> elements within the links
          let pElement = link.querySelector(".side-nav ul li a p");
          if (pElement) {
            pElement.style.color = navColors[index];
          }
        });
        nav_links[index].classList.add("active");
      }
    }
  }, []);

  return (
    <div className="fieldsOfScience">
      <ParamNavbar />
      <div className="top-nav">
        <div id="fosLogo"></div>
      </div>
      <div id="dSwipe"></div>
      <div className="welcome">
        <div id="disclaimer">
          Disclaimer : Please note that the animation featured in this
          application is not compatible with iPhone and iPad devices.
        </div>
      </div>
      <div id="ipadDisclaimer">
        Disclaimer : Please note that the animation featured in this application
        is not compatible with iPhone and iPad devices.
      </div>
      <div className="desktop">
        <div className="sContainer">
          <div id="first" className="first background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="second" className="second background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="third" className="third background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fourth" className="fourth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifth" className="fifth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="sixth" className="sixth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="seventh" className="seventh background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eight" className="eight background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="ninth" className="ninth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="tenth" className="tenth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eleventh" className="eleventh background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="twelfth" className="twelfth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="thirteenth"
            className="thirteenth background"
            data-speed="0.5"
          >
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="fourtheenth"
            className="fourtheenth background"
            data-speed="0.5"
          >
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifteenth" className="fifteenth background" data-speed="0.5">
            <div className="story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="side-nav">
          <ul>
            <li>
              <a
                href="#first"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#first").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Aeronautics</p>
              </a>
            </li>
            <li>
              <a
                href="#second"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#second").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Anatomy</p>
              </a>
            </li>
            <li>
              <a
                href="#third"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#third").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Botany</p>
              </a>
            </li>
            <li>
              <a
                href="#fourth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#fourth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Mechanics</p>
              </a>
            </li>
            <li>
              <a
                href="#fifth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#fifth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Geography</p>
              </a>
            </li>
            <li>
              <a
                href="#sixth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#sixth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Mineralogy</p>
              </a>
            </li>
            <li>
              <a
                href="#seventh"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#seventh").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Physics</p>
              </a>
            </li>
            <li>
              <a
                href="#eight"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#eight").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Forestry</p>
              </a>
            </li>
            <li>
              <a
                href="#ninth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#ninth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Medicine</p>
              </a>
            </li>
            <li>
              <a
                href="#tenth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#tenth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Paleontology</p>
              </a>
            </li>
            <li>
              <a
                href="#eleventh"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#eleventh").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Robotics</p>
              </a>
            </li>
            <li>
              <a
                href="#twelfth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#twelfth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Accoustics</p>
              </a>
            </li>
            <li>
              <a
                href="#thirteenth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#thirteenth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Volcanology</p>
              </a>
            </li>
            <li>
              <a
                href="#fourtheenth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#fourtheenth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Mining</p>
              </a>
            </li>
            <li>
              <a
                href="#fifteenth"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: document.querySelector("#fifteenth").offsetTop,
                    behavior: "smooth",
                  });
                }}
              >
                <p>Archaeology</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mobile">
        <div className="sContainer">
          <div id="first" className="first background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="second" className="second background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="third" className="third background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fourth" className="fourth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifth" className="fifth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="sixth" className="sixth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="seventh" className="seventh background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eight" className="eight background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="ninth" className="ninth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="tenth" className="tenth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="eleventh" className="eleventh background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="twelfth" className="twelfth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="thirteenth"
            className="thirteenth background"
            data-speed="0.5"
          >
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div
            id="fourtheenth"
            className="fourtheenth background"
            data-speed="0.5"
          >
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
        <div className="sContainer">
          <div id="fifteenth" className="fifteenth background" data-speed="0.5">
            <div className="m-story">
              <div id="title"></div>
              <div id="img"></div>
              <div id="num"></div>
              <div id="paraContainer"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
