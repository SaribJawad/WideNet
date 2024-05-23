import { useState } from "react";

export default function SendMessage() {
  const [message, setMessage] = useState("");

  function handleSendMessage(e) {
    e.preventDefault();
    console.log(message);
    setMessage("");
  }

  return (
    <div className="bg-gray-700 text-black fixed bottom-0 w-full py-10 px-5 shadow-lg">
      <form
        onSubmit={handleSendMessage}
        className="containerWrap flex items-center justify-center"
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-12 w-[90%] focus:outline-none rounded-r-none  rounded-l-lg px-3"
          type="text"
        />
        <button className="h-12 w-auto bg-gray-500 text-white rounded-r-lg px-5 text-sm">
          Send
        </button>
      </form>
    </div>
  );
}
