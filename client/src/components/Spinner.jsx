import React from "react";
import spinner from "../loader.gif";

const Spinner = () => {
  return (
    <div
      className="my-3 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(255,255,255,0.8)" }}
    >
      <img src={spinner} alt="" srcSet="" />
    </div>
  );
};

export default Spinner;
