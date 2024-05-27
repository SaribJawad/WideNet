import { useEffect } from "react";
import ChatBox from "../components/ChatBox";
import SendMessage from "../components/SendMessage";
import { useFirebase } from "../context/firebase";
import { useNavigate } from "react-router-dom";

export default function ChatRoom() {
  const { currentUser } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <div>
      <ChatBox />
      <SendMessage />
    </div>
  );
}
