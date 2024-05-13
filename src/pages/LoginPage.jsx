import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BiErrorCircle } from "react-icons/bi";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFirebase } from "../context/firebase";
import { useEffect, useState } from "react";
import SpinnerMini from "../components/ui/SpinnerMini";

export default function LoginPage() {
  const { signinUser, signupWithGoogle, currentUser } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // signup btn
  function signupBtn() {
    navigate("/signup");
  }

  // schema for login form
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // login btn
  async function login(data) {
    try {
      setIsLoading(true);
      const signedinUser = await signinUser(data.email, data.password);
      if (signedinUser) navigate("/");
    } catch (err) {
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/invalid-email" ||
        err.code === "auth/user-not-found"
      ) {
        setIsError(true);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <form
        onSubmit={handleSubmit(login)}
        className=" flex items-center flex-col gap-5 "
      >
        <div className="flex items-center flex-col mb-7">
          <h1 className="text-[4rem] font-medium">Log in.</h1>
        </div>
        <div className="flex flex-col gap-1">
          {isError && (
            <p className=" text-red-600 flex items-center gap-1 justify-center">
              <span>
                <BiErrorCircle />
              </span>
              Invalid email or password
            </p>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            placeholder="Enter your email here"
            className="text-black px-3 py-2 w-[350px] outline-none rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <span>
                <BiErrorCircle />
              </span>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password here"
            className="text-black px-3 py-2 w-[350px] outline-none rounded-md"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <span>
                <BiErrorCircle />
              </span>
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="mt-5  w-full">
          <div className="w-full flex gap-5">
            <button
              type="submit"
              className="
          w-[100%] px-6 py-[8px] text- bg-[#FFFD00] text-black font-medium rounded-md flex justify-center"
            >
              {isLoading ? <SpinnerMini /> : "Login"}
            </button>
          </div>
        </div>
      </form>
      <div className="w-full flex mt-3 gap-3">
        <button
          type="submit"
          className="w-[50%] px-6 py-[8px] text- bg-[#ffffff] text-black font-medium rounded-md flex items-center gap-2 justify-center"
          onClick={signupWithGoogle}
        >
          Sign in with
          <span>
            <FcGoogle size={20} />
          </span>
        </button>
        <button
          onClick={signupBtn}
          className=" w-[50%] px-6 py-[8px] text- bg-[#FFFD00] text-black font-medium rounded-md"
        >
          Sign up now
        </button>
      </div>
    </div>
  );
}
