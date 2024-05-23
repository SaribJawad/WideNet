import { useEffect } from "react";
import { useFirebase } from "../context/firebase";
import Post from "./Post";

export default function Posts() {
  const { getPosts, postsList } = useFirebase();

  console.log(postsList);
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="rounded-3xl bg-[#282828] w-[50%] min-w-[500px] p-5 h-[100%] min-h-[88vh]">
      {postsList?.length !== 0 ? (
        postsList?.map((post) => <Post key={post.postId} post={post} />)
      ) : (
        <p className="text-center">No posts to show right now :(</p>
      )}
    </div>
  );
}
