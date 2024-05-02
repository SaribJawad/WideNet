import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useFirebase } from "../context/firebase";

export default function SignupPage() {
  const { signup } = useFirebase();

  const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(5)
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

  function onSignUp(data: object) {
    console.log(data); // This should log the form data
  }

  return (
    <form
      className="absolute flex items-center flex-col gap-5 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      onSubmit={handleSubmit(onSignUp)}
    >
      {/* Form fields */}
      <div className="flex items-center flex-col mb-7">
        <h1 className="text-[4rem] font-medium">Sign Up</h1>
        <p className="text-[.9rem] font-light ">It's quick and easy.</p>
      </div>
      {/* Username field */}
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="text-black px-3 py-2 w-[350px] outline-none rounded-md"
          {...register("username")}
        />
        {errors.username && <p>{errors.username.message}</p>}
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
        {errors.email && <p>{errors.email.message}</p>}
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
        {errors.password && <p>{errors.password.message}</p>}
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
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>
      {/* Submit button */}
      <div className="buttons mt-8">
        <button
          type="submit"
          className="px-6 py-[8px] text- bg-[#FFFD00] text-black font-medium rounded-md"
        >
          Signup
        </button>
      </div>
    </form>
  );
}
