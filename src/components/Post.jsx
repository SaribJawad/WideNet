export default function Post() {
  return (
    <div className="bg-[#222222] p-3 rounded-2xl">
      <div className="user-posted-info flex items-center gap-3">
        <img
          className="w-8 rounded-full"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
        />
        <div className="flex flex-col leading-5">
          <span>Sarib Jawad</span>
          <p className="text-xs text-[#8b8b8b]">2days ago</p>
        </div>
      </div>
      <div className="post pt-2">
        <p>what a nice day</p>
        <img
          className="pt-2 rounded-xl object-cover w-full"
          src="https://cdn.pixabay.com/photo/2024/01/04/16/48/landscape-8487906_960_720.jpg"
          alt=""
        />
      </div>
      <div></div>
    </div>
  );
}
