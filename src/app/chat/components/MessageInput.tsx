import React from "react";
import { SendHorizontal } from "lucide-react";

interface MessageInputProps {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => void;
}



const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) => {

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && newMessage.trim() !== "") {
          handleSendMessage();
        }
      };
    
  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe un mensaje"
        className="w-full p-2 border text-customPalette-black border-customPalette-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-customPalette-bluelink"
      />
        <button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ""}
            className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                newMessage.trim() === ""
                    ? "bg-customPalette-gray text-customPalette-graydark cursor-not-allowed"
                    : "bg-customPalette-green text-customPalette-white hover:bg-customPalette-bluelightst"
            }`}
        >
            <SendHorizontal
                size={24}
                color={newMessage.trim() === "" ? "gray" : "white"}
            />
        </button>
    </div>
  );
};

export default MessageInput;
