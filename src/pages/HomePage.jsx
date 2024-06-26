import Posts from "../components/Posts";
import SideBar from "../components/SideBar";

export default function HomePage() {
  return (
    <div className="h-full px-9 flex gap-[1.5rem] w-full ">
      <SideBar />
      <Posts />
    </div>
  );
}
