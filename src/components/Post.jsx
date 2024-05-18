/* eslint-disable react/prop-types */
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { useFirebase } from "../context/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestoreDatabase } from "../context/firebase";
import { useEffect, useState } from "react";

export default function Post({ post }) {
  const { currentUser } = useFirebase();

  const [like, setLike] = useState(null);

  // setting likes
  const likesRef = collection(firestoreDatabase, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post?.postId));

  async function addLike() {
    const newDoc = await addDoc(likesRef, {
      userId: currentUser?.uid,
      postId: post?.postId,
    });
    if (currentUser) {
      setLike((prev) => [
        ...prev,
        { userId: currentUser?.uid, likeId: newDoc.id },
      ]);
    }
  }

  // getting likes from firestore
  async function getLikes() {
    const data = await getDocs(likesDoc);
    setLike(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
        likeId: doc.id,
      }))
    );
  }

  // removing like form firestore
  async function removeLike() {
    const likeToDeleteQuery = query(
      likesRef,
      where("postId", "==", post.postId),
      where("userId", "==", currentUser?.uid)
    );
    const like = await getDocs(likeToDeleteQuery);
    const likeId = like.docs[0].id;

    const likeToDelete = doc(firestoreDatabase, "likes", likeId);

    await deleteDoc(likeToDelete);
    if (currentUser) {
      setLike((prev) => prev?.filter((like) => like.likeId !== likeId));
    }
  }

  const hasUserLiked = like?.find((x) => x.userId === currentUser?.uid);

  // console.log(like);

  useEffect(() => {
    getLikes();
  }, []);

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
        {/* <img
          className="pt-2 rounded-xl object-cover w-full"
          src="https://cdn.pixabay.com/photo/2024/01/04/16/48/landscape-8487906_960_720.jpg"
          alt=""
        /> */}
      </div>
      <div className="pt-2 px-2 w-full flex items-center justify-between  gap-2  ">
        <span
          className="cursor-pointer "
          onClick={hasUserLiked ? removeLike : addLike}
        >
          {/* */}
          {hasUserLiked ? (
            <IoMdHeart size={30} color="#FF3040" />
          ) : (
            <IoMdHeartEmpty size={25} color="#8B8B8B" />
          )}
        </span>
        <p className="text-[#8B8B8B] text-sm">
          {like ? like.length : "0"} likes
        </p>
      </div>
    </div>
  );
}
