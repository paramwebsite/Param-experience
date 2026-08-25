import React from "react";
import { Link } from "react-router-dom";

export default function ScienceAplicationNavBar() {

  return (
    <div className="nav">
      <div id="logo">
        <a href="http://paraminnovation.org/"></a>
      </div>
      <div>
        <p>
          <a href="/Mathemartica">
            {/* <Link to="/gaming-zone"> */}
            <i class="fa-regular fa-circle-left" style={{color: "#ffffff"}}></i>
            {/* </Link> */}
          </a>
        </p>
      </div>
    </div>
  );
}