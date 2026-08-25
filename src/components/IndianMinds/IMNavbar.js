import React from "react";
// import { Link } from "react-router-dom";

export default function IMNavbar() {
  return (
    <div className="nav">
      <div id="logo">
        <a href="http://paraminnovation.org/"></a>
      </div>
      <div>
        <p>
          <a href="/indian-minds">
            {/* <Link to="/indian-minds"> */}
            {/* <i class="fa-solid fa-arrow-left"></i> */}
            <i className="fa-regular fa-circle-left" style={{color: "#ffffff"}}></i>
            {/* </Link> */}
          </a>
        </p>
      </div>
    </div>
  );
}
