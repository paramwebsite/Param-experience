import React from "react";
import "./Footer.css";

const redirects = [
  // "Experiences",
  { linkName: "Events", redirectUrl: "https://paraminnovation.org/events" },
  // "Recent Updates",
  {
    linkName: "Newsletters",
    redirectUrl: "https://paraminnovation.org/digital-newsletter/",
  },
  {
    linkName: "Store",
    redirectUrl: "https://paraminnovation.org/param-digital-store",
  },
  // "Courses",
  // "Online Contests",
  {
    linkName: "About Us",
    redirectUrl: "https://paraminnovation.org/science-centre/",
  },
  {
    linkName: "Contact Us",
    redirectUrl: "https://paraminnovation.org/contact/",
  },
];

const icons = [
  {
    icon: "https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/Instagram.svg",
    redirectUrl: "https://www.instagram.com/paraminnovation/",
  },
  {
    icon: "https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/Facebook.svg",
    redirectUrl: "https://www.facebook.com/paraminnovation/",
  },
  {
    icon: "https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/X.svg",
    redirectUrl: "https://twitter.com/paraminnovation",
  },
  {
    icon: "https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/YouTube.svg",
    redirectUrl: "https://youtube.com/@ParamScienceExperience?feature=shared",
  },
  {
    icon: "https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/WhatsApp.svg",
    redirectUrl: "https://chat.whatsapp.com/LvIfbDlFzPeEFadbw3QOPs",
  },
];

export default function ParsecFooter() {
  const screenWidth = window.innerWidth;

  return (
    <div className="parsec footer">
      <div className="mapContainer">
        <div className="locationContainer">
          <div className="locationBox">
            <p className="head">Location</p>
            <p className="para">
              27, 32nd Cross Rd, 7th Block, Jayanagar, Bengaluru, Karnataka
              560082
            </p>
            <a href="https://maps.app.goo.gl/uUn1LP9ZvXpHuoTE9">
              <div className="openMap">OPEN MAPS</div>
            </a>
          </div>
        </div>
        <div className="text">
          <h2>VISITOR REGULATIONS</h2>
          <div>
            <ul>
              <li>The Science Gallery is under CCTV surveillance.</li>
              <li>Please leave your luggage at the cloakroom counter</li>
              <li>Food and Beverages are not allowed</li>
              <li>Children should be supervised at all times</li>
              <li>Please interact gently with the exhibits</li>
              <li>
                This is strictly a smoke-free, drug-free and alcohol-free zone
              </li>
              <li>
                We reserve the right to deny entry to any individual or remove
                any individual from these premises at our discretion
              </li>
              <li>
                Your ticket is valid for a duration of 60 minutes to help us
                avoid overcrowding and give you the best experience
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footerMainContent">
        {screenWidth > 450 ? <div className="logo"></div> : <></>}
        <div className="details">
          {screenWidth > 450 ? (
            <>
              <div className="mediaAndTiming">
                <div className="media">
                  <h2>Follow Us On Social Media</h2>
                  <div className="icons">
                    {icons.map((icon, index) => (
                      <a href={icon.redirectUrl} key={index}>
                        <div
                          className="iconRedirects"
                          style={{ backgroundImage: `url(${icon.icon})` }}
                        ></div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="timing">
                  <h2>Opening Hours</h2>
                  <div className="timeTable">
                    <p className="days">
                      Tuesday - Friday
                      <br />
                      Saturday - Sunday
                      <br />
                      Monday
                    </p>
                    <p className="time">
                      10:00 am to 06:00 pm
                      <br />
                      11:00 am to 07:00 pm
                      <br />
                      <span style={{ color: "#ea4135" }}>Closed</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="linksAndContact">
                <div className="redirects">
                  <h2>Quick Links</h2>
                  {redirects.map((redirect, index) => (
                    <React.Fragment key={index}>
                      <a href={redirect.redirectUrl}>{redirect.linkName}</a>
                      <br />
                    </React.Fragment>
                  ))}
                </div>
                <div className="contactUs">
                  <h2>Contact Us</h2>
                  <p className="contactUsContent" style={{ width: "90%" }}>
                    Reach out to us for discounted packages for schools,
                    colleges, and group tours.
                  </p>
                  <p className="marketingEmail">
                    <img
                      src="https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/mail.svg"
                      alt=""
                    />{" "}
                    marketing@paraminnovation.org
                  </p>
                  <p className="contactNo">
                    <img
                      src="https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/contact.svg"
                      alt=""
                    />{" "}
                    +91 73385 80197
                  </p>
                  <p className="contactNo">
                    <img
                      src="https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/contact.svg"
                      alt=""
                    />{" "}
                    +91 99806 25752
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mediaAndLinks">
                <div className="media">
                  <h2>Follow Us On Social Media</h2>
                  <div className="icons">
                    {icons.map((icon, index) => (
                      <a href={icon.redirectUrl} key={index}>
                        <div
                          className="iconRedirects"
                          style={{ backgroundImage: `url(${icon.icon})` }}
                        ></div>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="redirects">
                  <h2>Quick Links</h2>
                  {screenWidth <= 450 ? (
                    <div>
                      {redirects.map((redirect, index) => (
                        <React.Fragment key={index}>
                          <a
                            style={{ color: "#777778" }}
                            href={redirect.redirectUrl}
                          >
                            {redirect.linkName}
                          </a>
                          <br />
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    <>
                      {redirects.map((redirect, index) => (
                        <React.Fragment key={index}>
                          <a
                            style={{ color: "#777778" }}
                            href={redirect.redirectUrl}
                          >
                            {redirect.linkName}
                          </a>
                          <br />
                        </React.Fragment>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div className="timingAndContact">
                <div className="timing">
                  <h2>Opening Hours</h2>
                  <div className="timeTable">
                    <div className="days">
                      <p>Tuesday - Friday</p>
                      <p>10:00 am to 06:00 pm</p>
                    </div>
                    <div className="days">
                      <p>Saturday - Sunday</p>
                      <p>11:00 am to 07:00 pm</p>
                    </div>
                    <div className="days">
                      <p>Monday</p>
                      <p style={{ color: "#ea4135" }}>Closed</p>
                    </div>
                  </div>
                </div>
                <div className="contactUs">
                  <h2>Contact Us</h2>
                  <p className="contactUsContent" style={{ width: "90%" }}>
                    Reach out to us for discounted packages for schools,
                    colleges, and group tours.
                  </p>
                  <div>
                    <p className="marketingEmail">
                      <img
                        src="https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/mail.svg"
                        alt=""
                      />{" "}
                      marketing@paraminnovation.org
                    </p>
                    <p className="contactNo">
                      <img
                        src="https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/contact.svg"
                        alt=""
                      />{" "}
                      +91 73385 80197
                    </p>
                    <p className="contactNo">
                      <img
                        src="https://digitalassestbucket.s3.amazonaws.com/paramscience/footer/icons/contact.svg"
                        alt=""
                      />{" "}
                      +91 99806 25752
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {/* <div className="visitorRegulations">
        <h2>Visitor Regulations</h2>
        <div>
          <ul>
            <li>The Science Gallery is under CCTV surveillance.</li>
            <li>Please leave your luggage at the cloakroom counter</li>
            <li>Food and Beverages are not allowed</li>
            <li>Children should be supervised at all times</li>
            <li>Please interact gently with the exhibits</li>
            <li>
              This is strictly a smoke-free, drug-free and alcohol-free zone
            </li>
            <li>
              We reserve the right to deny entry to any individual or remove any
              individual from these premises at our discretion
            </li>
            <li>
              Your ticket is valid for a duration of 60 minutes to help us avoid
              overcrowding and give you the best experience
            </li>
          </ul>
        </div>
      </div> */}

      <div className="copyright">
        <p style={{ width: "auto" }}>
          Copyright © 2021-22. Param Foundation. All Rights Reserved
        </p>
      </div>
    </div>
  );
}


