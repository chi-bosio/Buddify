import React, { useEffect, useRef } from "react";

interface ChatMessagesProps {
  messages: { sender: { id: string; name: string; lastname: string; avatar: string }; text: string }[];
  currentUserId: string;
  avatarurl: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUserId, avatarurl }) => {

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const reversedMessages = [...messages].reverse();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full overflow-auto space-y-4 p-4">
      {reversedMessages.map((message, index) => {
        const isCurrentUser = message.sender.id === currentUserId;
        const avatarSrc = isCurrentUser ? avatarurl : message.sender.avatar;
  
        return (
          <div
            key={index}
            className={`flex ${isCurrentUser ? "flex-row-reverse" : ""} items-start space-x-3`}
          >

            <img
              src={avatarSrc}
              alt={`${message.sender.name} ${message.sender.lastname}`}
              className="w-10 h-10 rounded-full border-2 border-customPalette-gray"
            />

            <div
              className={`w-full max-w-[calc(100%-2rem)] p-3 rounded-lg ml-3 mr-3 ${
                isCurrentUser
                  ? "bg-customPalette-blue text-customPalette-white self-end"
                  : "bg-customPalette-gray text-customPalette-graydark self-start"
              }`}
            >
              <span className="block font-semibold">{message.sender.name}</span>
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
  
};
export default ChatMessages;
