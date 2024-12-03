import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthContext } from "../../../contexts/authContext";
import useSocket from "./useSocket";
import { jwtDecode } from "jwt-decode";

interface Message {
  text: string;
  sender: {
    id: string;
    name: string;
    lastname: string;
    avatar: string;
  };
}

interface ActivityDetails {
  name: string;
  description: string;
  image: string;
  date: string;
  time: string;
  place: string;
  latitude: string;
  longitude: string;
}

const useChat = () => {
  const searchParams = useSearchParams();
  const activityId = searchParams.get("activityId");
  
  const { userName, isLoggedIn, authTokens, loading } = useAuthContext();
  const [newMessage, setNewMessage] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [activityDetails, setActivityDetails] = useState<ActivityDetails | null>(null);

  const getUserIdFromToken = (token: string | undefined): string | null => {
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.sub || null;
    } catch (error) {
      console.error("Error al decodificar el token", error);
      return null;
    }
  };

  const socket = useSocket(activityId, isLoggedIn, authTokens?.token, setMessages, setActivityDetails);

  if (!isLoggedIn && !loading) {
    return { loading: false, redirectToLogin: true, handleSendMessage: () => {} };
  }

  if (loading) {
    return { loading: true, redirectToLogin: false, handleSendMessage: () => {} };
  }

  const handleSendMessage = () => {

    if (socket && newMessage.trim() !== "") {

      const senderId = getUserIdFromToken(authTokens?.token);

      socket.emit("sendMessage", { sender: userName, text: newMessage, activityId: activityId });

        setNewMessage(""); 
    }
  };
  
  useEffect(() => {
    if (activityId && isLoggedIn) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(`http://localhost:3001/messages/${activityId}`, {
            headers: {
              Authorization: `Bearer ${authTokens?.token}`,
            },
          });
  
          if (response.ok) {
            const data = await response.json();
            setMessages(prevMessages => {
              return [
                ...prevMessages,
                ...data.filter((newMessage: Message) =>
                  !prevMessages.some(
                    (existingMessage: Message) =>
                      existingMessage.text === newMessage.text &&
                      existingMessage.sender.id === newMessage.sender.id
                  )
                ),
              ];
            });
          } else {
            console.error("Error al obtener los mensajes del backend");
          }
        } catch (error) {
          console.error("Error al obtener los mensajes", error);
        }
      };
  
      fetchMessages();
    }
  }, [activityId, isLoggedIn, authTokens?.token]);
  



  return {
    userName,
    isLoggedIn,
    authTokens,
    activityId,
    messages,
    handleSendMessage,
    newMessage,
    setNewMessage,
    activityDetails,
    redirectToLogin: false,
    loading: false
  };
};

export default useChat;
