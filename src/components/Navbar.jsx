import { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { MdOutlineLogin } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/firebase";

export default function Navbar() {
  const { currentUser, signOutCurrentUser } = useFirebase();

  return (
    <div className="h-[80px] px-10 text-[#FAFAFA] flex items-center justify-between  ">
      <div className="links cursor-pointer">
        <Link to="/">
          <GoHomeFill size={23} />
        </Link>
      </div>
      <h2 className="text-2xl ">WideNet</h2>
      <span>
        {currentUser ? (
          <PiSignOutBold
            size={23}
            className="links cursor-pointer"
            onClick={signOutCurrentUser}
          />
        ) : (
          <Link to="/login">
            <MdOutlineLogin size={23} className="links cursor-pointer" />
          </Link>
        )}
      </span>
    </div>
  );
}
