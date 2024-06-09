import React from "react";
import { NavBar } from "../components";

function EditRoles() {

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-black">
      <NavBar />
      <div className="flex-grow w-screen flex flex-col items-center justify-center">
        <p>EditRoles</p>
      </div>
    </div>
  );
}

export default EditRoles;

