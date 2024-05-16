import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useFirebase } from "../context/firebase";

export default function CreatePost() {
  const { onCreatePost } = useFirebase();

  const schema = yup.object().shape({
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="bg-black">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <textarea
          className="text-black"
          type="text"
          placeholder={`What's on your mind, Sarib`}
          {...register("description")}
        />
        <p>{errors.description && errors.description.message}</p>
        <br />
        <button className="bg-white text-black">Create Post</button>
      </form>
    </div>
  );
}
