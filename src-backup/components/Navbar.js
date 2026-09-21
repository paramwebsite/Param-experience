import React, { useRef } from "react";
import { Link } from "react-router-dom";

const sidebarLinks = [
  { linkName: "Events", redirectUrl: "https://paraminnovation.org/events" },
  { linkName: "Newsletters", redirectUrl: "https://paraminnovation.org/digital-newsletter/" },
  { linkName: "Store", redirectUrl: "https://paraminnovation.org/param-digital-store" },
  { linkName: "About Us", redirectUrl: "https://paraminnovation.org/science-centre/" },
  { linkName: "Contact Us", redirectUrl: "https://paraminnovation.org/contact/" },
  // { linkName: "Home" },
  // { linkName: "About" },
  // { linkName: "Experiences" },
  // { linkName: "Recent Updates" },
  // { linkName: "Blogs" },
  // { linkName: "Donate" },
  // { linkName: "Online Contests" },
  // { linkName: "Online Courses" },
  // { linkName: "Team" },
  // { linkName: "Sign Up" },
];

export default function ParamNavbar() {
  const screenWidth = window.innerWidth;
  const sideBarRef = useRef();
  const sideBarButtonRef = useRef();
  const isClickedRef = useRef(false);
  
  const displayHideSidebar = () => {
    document.body.style.overflowY = isClickedRef.current ? "" : "hidden";
    sideBarRef.current.style.right = isClickedRef.current ? "-100vw" : "0";
    sideBarButtonRef.current.classList.toggle("active");
    sideBarButtonRef.current.classList.toggle("not-active");
    isClickedRef.current = !isClickedRef.current;
  };

  return (
    <div className="nav">
      <a href="http://paraminnovation.org/">
        <div id="logo"></div>
      </a>
      <div className="home">
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
      {screenWidth <= 450 ? (
        <div
          ref={sideBarButtonRef}
          className="sidebarButton btn not-active"
          style={{ display: "none" }}
          onClick={displayHideSidebar}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="14"
            viewBox="0 0 448 512"
          >
            <path
              fill="#ffffff"
              d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
            />
          </svg> */}
          <span></span>
          <span></span>
          <span></span>
        </div>
      ) : (
        <></>
      )}
      {screenWidth <= 450 ? (
        <div className="sideBar" style={{display: 'none'}} ref={sideBarRef}>
          {sidebarLinks.map((link, index) => (
            <div key={index}><a href={link.redirectUrl}>{link.linkName}</a></div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
