"use client";

import { useRouter } from "next/navigation";
import useChat from "./components/useChat";
import ChatMessages from "./components/ChatMessages";
import MessageInput from "./components/MessageInput";
import { jwtDecode } from "jwt-decode";
import { CalendarDays, Clock4, MapPin } from "lucide-react";

const Chat = () => {
  const router = useRouter();

  const {
    userName,
    isLoggedIn,
    authTokens,
    messages = [],
    newMessage = "",
    setNewMessage = () => {},
    handleSendMessage,
    loading,
    activityDetails,
  } = useChat();

  const decoded: any = jwtDecode(authTokens!.token);
  const currentUserId = decoded.sub;
  const avatarurl = decoded.avatar;

  if (!isLoggedIn && !loading) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

return (
  <div className="h-screen bg-[url('/assets/textura-fondo2.jpg')] bg-cover bg-center">
    <div className="grid grid-rows-[10%_70%_10%] h-screen max-w-3xl mx-auto p-4">
      <h2 className="text-2xl md:text-3xl lg:text-4xl text-customPalette-black font-semibold text-center mb-6">
        {activityDetails ? (
          <>
            <div className="mb-3">Chat para: {activityDetails.name}</div>

            <div className="flex flex-wrap justify-center text-base md:text-lg lg:text-xl font-medium text-customPalette-graydark mb-6">

            <div className="flex items-center mr-6 mb-3">
                <CalendarDays size={24} className="mr-2 text-customPalette-graydark" />
                <span className="font-bold">El día: </span>&nbsp;
                {new Date(activityDetails.date).toLocaleDateString()}
            </div>

            <div className="flex items-center mr-6 mb-3">
                <Clock4 size={24} className="mr-2 text-customPalette-graydark" />
                <span className="font-bold">A las: </span>&nbsp;
                {activityDetails.time}
            </div>

            <div className="flex items-center mb-3">
                <MapPin size={24} className="mr-2 text-customPalette-graydark" />
                <span className="font-bold">{activityDetails.place}</span>
            </div>
        </div>
          </>
        ) : (
          "Cargando detalles de la actividad..."
        )}
      </h2>

      <div className="bg-customPalette-white shadow-lg rounded-lg p-4 overflow-auto">
      <ChatMessages
            messages={messages}
            currentUserId={currentUserId}
            avatarurl={avatarurl}
          />
      </div>
      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  </div>
);

};

export default Chat;
