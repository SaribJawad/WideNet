import Posts from "../components/Posts";
import SideBar from "../components/SideBar";
import UserDisplay from "../components/UserDisplay";

export default function HomePage() {
  return (
    <div className="h-[100vh] border-2 px-9 flex gap-[3rem]">
      <SideBar />
      <Posts />
      <UserDisplay />
    </div>
  );
}
