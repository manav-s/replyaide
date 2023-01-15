import React from "react";
import "font-awesome/css/font-awesome.css";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

const NavBar = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const goToHomepage = (e) => {
    if (user) navigate("/reviewList");
    if (!user) navigate("/");
  };

  return (
    <div className="bg-gray-800">
      <div className="h-16 px-8 flex items-center">
        <i
          onClick={goToHomepage}
          className="fa fa-rocket fa-2x px-2"
          style={{ color: "red", cursor: "pointer" }}
        />
        <p
          onClick={goToHomepage}
          className="text-white font-bold"
          style={{ fontSize: "2em", cursor: "pointer" }}
        >
          ReplyAide
        </p>
        {user && (
          <div
            className="ml-auto"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p></p>
            <img
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full"
              src={user.photoURL}
              alt=""
            />
            <button
              onClick={() => auth.signOut()}
              className="text-white font-bold px-4 py-2 rounded-full"
              style={{ cursor: "pointer" }}
            >
              Log out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
