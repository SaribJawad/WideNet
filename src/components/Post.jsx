/* eslint-disable react/prop-types */
import { RiHeart3Fill } from "react-icons/ri";
import { RiHeart3Line } from "react-icons/ri";

export default function Post({ post }) {
  console.log(post);
  return (
    <div className="bg-[#222222] p-3 rounded-2xl mb-8">
      <div className="user-posted-info flex items-center gap-3">
        <img
          className="w-8 rounded-full"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt=""
        />
        <div className="flex flex-col leading-5">
          <span>{post.username}</span>
          <p className="text-xs text-[#8b8b8b]">2days ago</p>
        </div>
      </div>
      <div className="post pt-2">
        <p>{post.description}</p>
        <img
          className="pt-2 rounded-xl object-cover w-full"
          src="https://cdn.pixabay.com/photo/2024/01/04/16/48/landscape-8487906_960_720.jpg"
          alt=""
        />
      </div>
      <div className="pt-2  w-fit  flex items-center gap-2  ">
        <span className="cursor-pointer ">
          {/* <RiHeart3Fill size={30} color="#FF3040" /> */}
          <RiHeart3Line size={30} color="#8B8B8B" />
        </span>
        <p className="text-[#8B8B8B]">29</p>
      </div>
    </div>
  );
}
