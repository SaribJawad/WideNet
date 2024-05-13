import { useFirebase } from "../context/firebase";

export default function SideBar() {
  const { currentUser, username } = useFirebase();

  console.log(currentUser?.photoURL);

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
    </div>
  );
}
