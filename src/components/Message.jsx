import { useFirebase } from "../context/firebase";

// eslint-disable-next-line react/prop-types
export default function Message({ message }) {
  const { currentUser } = useFirebase();

  return (
    <div
      className={`chat px-16 ${
        message.uid === currentUser?.uid ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={message?.avatar} />
        </div>
      </div>
      <div className="chat-header">{message.name}</div>
      <div className="chat-bubble">{message.text}</div>
    </div>
  );
}
