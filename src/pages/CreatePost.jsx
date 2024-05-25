import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

export default function CreatePost() {
  const { onCreatePost, currentUser, storage } = useFirebase();
  const [imageUpload, setImageUpload] = useState(null);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    description: yup.string().required("You must add something."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleChange(e) {
    setImageUpload(e.target.files[0]);
  }

  async function handleClick(data) {
    let imageUrl = "";
    if (imageUpload) {
      const storageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      await uploadBytes(storageRef, imageUpload);
      imageUrl = await getDownloadURL(storageRef);
      setImageUpload(null);
    }
    await onCreatePost(data, imageUrl);
    navigate("/");
  }

  return (
    <div className="h-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] text-black flex flex-col items-center justify-center gap-20 text-white">
      <h1 className=" font-normal text-[1.5rem]">
        What's on your mind, {`${currentUser?.displayName}`}!
      </h1>
      <div className="bg-[#282828] rounded-3xl flex flex-col w-full p-5">
        <form onSubmit={handleSubmit(handleClick)}>
          <textarea
            className="h-[200px] resize-none w-full outline-none rounded-3xl p-3"
            type="text"
            placeholder="e.g. Had a good day at my job"
            {...register("description")}
          />
          <p className="text-red-600 flex items-center gap-1 justify-center">
            {errors.description && errors.description.message}
          </p>
          <br />
          <div className="flex justify-between">
            <button className="bg-white px-3 py-1 rounded-3xl" type="submit">
              Create Post
            </button>

            <input
              type="file"
              id="file"
              onChange={handleChange}
              className="rounded-3xl bg-white outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
