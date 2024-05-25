import { GoHomeFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/firebase";

export default function Navbar() {
  const { signOutCurrentUser } = useFirebase();

  return (
    <div className="h-[80px] px-10 text-[#FAFAFA] flex items-center bg-[#1A1A1A]  justify-between  ">
      <div className="links cursor-pointer">
        <Link to="/">
          <GoHomeFill size={23} />
        </Link>
      </div>
      <h2 className="text-2xl ">WideNet</h2>
      <span onClick={signOutCurrentUser} className="cursor-pointer">
        Logout
      </span>
    </div>
  );
}
