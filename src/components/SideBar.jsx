import { useFirebase } from "../context/firebase";

export default function SideBar() {
  const { currentUser, username } = useFirebase();

  return (
    <div className="rounded-3xl flex flex-col items-center sticky  gap-5 justify-center  border-red min-w-[200px] w-[25%] bg-[#282828] h-[50%] py-10">
      <img
        className="w-[40%] rounded-full "
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        alt=""
      />
      <div className="userinfo flex flex-col items-center leading-snug ">
        <h1 className="text-[1.8vw]">
          {currentUser?.displayName !== null
            ? currentUser?.displayName
            : username?.username}
        </h1>
        <p className="text-[.9vw] text-[#8b8b8b]">{currentUser?.email}</p>
      </div>
    </div>
  );
}
