import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestoreDatabase } from "../context/firebase";

export default function ChatBox() {
  const messagesEndRef = useRef();
  const [messages, setMessages] = useState([]);

  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const q = query(
      collection(firestoreDatabase, "messages"),
      orderBy("createdAt")
      // limit(50)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });

    return () => unsubscribe;
  }, []);

  return (
    <div className="pb-44 pt-20 px-40">
      {messages.map((message) => (
        <Message ge message={message} key={message.id} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
}
