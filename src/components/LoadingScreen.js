import React from "react";
import "./LoadingScreen.css";

export default function LoadingScreen() {
  return (
    <div className="paramLoading">
      <img
        src="paramLoading.svg"
        //   className={isRotating ? 'rotating' : 'slowing-down'}
        className="rotating-smooth"
        alt="Loading"
      />
      <p>LOADING</p>
    </div>
  );
}
