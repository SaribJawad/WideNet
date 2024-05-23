import { useNavigate } from "react-router-dom";
import { useFirebase } from "../context/firebase";

export default function SideBar() {
  const navigate = useNavigate();
  const { currentUser, username } = useFirebase();

  function handleClick() {
    navigate("/createpost");
  }

  return (
    <div className="rounded-3xl flex flex-col items-center sticky  gap-5 justify-center  border-red min-w-[250px] w-[25%] bg-[#282828] h-[50%] py-10">
      <img
        className="w-[40%] rounded-full "
        src={`${currentUser?.photoURL}`}
        alt=""
      />
      <div className="userinfo flex flex-col items-center leading-snug ">
        <h1 className="text-[25px]">
          {currentUser?.displayName !== null
            ? currentUser?.displayName
            : username?.username}
        </h1>
        <p className="text-[13px] text-[#8b8b8b]">{currentUser?.email}</p>
      </div>
      <button
        className="bg-[#1A1A1A] px-5 py-2 rounded-3xl text-[13px]  text-[#8b8b8b]"
        onClick={handleClick}
      >
        Create post
      </button>
      <button
        className="bg-[#1A1A1A] px-5 py-2 rounded-3xl text-[13px]  text-[#8b8b8b]"
        onClick={() => navigate("/chatroom")}
      >
        Chat
      </button>
    </div>
  );
}
