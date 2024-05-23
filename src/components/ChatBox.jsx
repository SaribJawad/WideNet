import Message from "./Message";

export default function ChatBox() {
  const messages = [
    {
      id: 1,
      message: "hello there",
    },
    {
      id: 2,
      message: "Hi",
    },
  ];

  return (
    <div className="pb-44 pt-20 ">
      {messages.map((message) => (
        <Message message={message} key={message.id} />
      ))}
    </div>
  );
}
