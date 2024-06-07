import React from "react";
import { NavBar } from "../components";

function Requirements() {

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      <NavBar />
      <div className="flex-grow w-screen flex flex-col items-center justify-center">
        <p>Requirements</p>
      </div>
    </div>
  );
}

export default Requirements;

