import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  return (
    <form className=" flex items-center flex-col gap-5 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="flex items-center flex-col mb-7">
        <h1 className="text-[4rem] font-medium">Log in.</h1>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="username"
          className="text-black px-3 py-2 w-[350px] outline-none rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          placeholder="password"
          className="text-black px-3 py-2 w-[350px] outline-none rounded-md"
        />
      </div>
      <div className="buttons mt-5 flex flex-col gap-5 w-full">
        <div className="w-full flex gap-5">
          <button
            type="submit"
            className="
          w-[30%] px-6 py-[8px] text- bg-[#FFFD00] text-black font-medium rounded-md"
          >
            Login
          </button>
          <button
            type="submit"
            className="w-[70%] px-6 py-[8px] text- bg-[#ffffff] text-black font-medium rounded-md flex items-center gap-2 justify-center"
          >
            Sign in with
            <span>
              <FcGoogle size={20} />
            </span>
          </button>
        </div>
        <button className=" w-[100%] px-6 py-[8px] text- bg-[#FFFD00] text-black font-medium rounded-md">
          Sign up now
        </button>
      </div>
    </form>
  );
}
