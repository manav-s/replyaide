import React from "react";
import "font-awesome/css/font-awesome.css";

const NavBar = () => {
  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <i className="fa fa-rocket fa-2x px-2" style={{ color: "red" }} />
        <p className="text-white font-bold" style={{ fontSize: "2em" }}>
          ReplyAide
        </p>
      </div>
    </div>
  );
};

export default NavBar;
