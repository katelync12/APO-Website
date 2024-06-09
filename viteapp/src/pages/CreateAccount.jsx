import React from "react";
import { NavBar } from "../components";

function CreateAccount() {

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      <NavBar />
      <div className="flex-grow w-screen flex flex-col items-center justify-center">
        <p>CreateAccount</p>
      </div>
    </div>
  );
}

export default CreateAccount;

