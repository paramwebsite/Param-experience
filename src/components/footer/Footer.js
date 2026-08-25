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

export default function Footer() {
  const screenWidth = window.innerWidth;

  return (
    <div className="footer">
      {screenWidth > 450 ? (
        <div className="redirects">
          {redirects.map((redirect, index) =>
            index === redirects.length - 1 ? (
              <React.Fragment key={index}>
                {" "}
                <p key={index}>
                  {" "}
                  <a href={redirect.redirectUrl}>{redirect.linkName}</a>{" "}
                </p>
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>
                <p key={index}>
                  {" "}
                  <a href={redirect.redirectUrl}>{redirect.linkName}</a>{" "}
                </p>{" "}
                |
              </React.Fragment>
            )
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="copyright">
        <p>Copyright © 2021-22. Param Foundation. All Rights Reserved</p>
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
    </div>
  );
}
