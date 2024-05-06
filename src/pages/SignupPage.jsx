import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { BiErrorCircle } from "react-icons/bi";
import { useFirebase } from "../context/firebase";
import { useState } from "react";
import SpinnerMini from "../components/ui/SpinnerMini";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { signup, putData } = useFirebase();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(6)
      .required("Password should be greater than 5 letters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Please confirm your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSignUp(data) {
    try {
      setIsLoading(true);
      const newUser = await signup(data.email, data.password);
      // putting new user in the database
      putData(`users/${newUser.user.uid}`, {
        username: data.username,
        email: data.email,
      });
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/email-already-in-use") setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="absolute flex items-center flex-col gap-5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      onSubmit={handleSubmit(onSignUp)}
    >
      {/* Form fields */}
      <div className="flex items-center flex-col mb-7">
        <h1 className="text-[4rem] font-medium">Sign Up.</h1>
        <p className="text-[.9rem] font-light ">It's quick and easy.</p>
      </div>
      {/* Username field */}
      <div className="flex flex-col gap-2">
        {isError && (
          <p className="flex justify-center items-center gap-1 text-red-600">
            <span>
              <BiErrorCircle />
            </span>
            Email is already in use
          </p>
        )}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="text-black px-3 py-2 w-[350px] outline-none rounded-md"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span>
              <BiErrorCircle />
            </span>
            {errors.username.message}
          </p>
        )}
      </div>
      {/* Email field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="email"
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
      {/* Password field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="password"
          className="text-black px-3 py-2  w-[350px] outline-none rounded-md"
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
      {/* Confirm password field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="confirmPassword">Confirm your password</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder="confirm your password"
          className="text-black px-3 py-2  w-[350px] outline-none rounded-md"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 flex items-center gap-1">
            <span>
              <BiErrorCircle />
            </span>
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {/* Submit button */}
      <div className="buttons mt-5 w-full">
        <button
          type="submit"
          className="  w-full px-6 py-[8px] text- bg-[#FFFD00] text-black font-medium rounded-md
            flex  justify-center"
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : "Signup"}
        </button>
      </div>
    </form>
  );
}
