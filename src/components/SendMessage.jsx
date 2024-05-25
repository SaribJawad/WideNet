import { useState } from "react";
import { firestoreDatabase, useFirebase } from "../context/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function SendMessage() {
  const [message, setMessage] = useState("");
  const { currentUser, username } = useFirebase();

  async function handleSendMessage(e) {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    try {
      const { uid, displayName, photoURL } = currentUser;
      await addDoc(collection(firestoreDatabase, "messages"), {
        text: message,
        name: displayName ? displayName : username,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      });
    } catch (error) {
      console.log(error);
    }

    console.log(message);
    setMessage("");
  }

  return (
    <div className="bg-gray-700 fixed bottom-0 w-full py-10 px-32 shadow-lg">
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
