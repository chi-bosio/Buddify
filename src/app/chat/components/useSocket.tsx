import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3001/chat";

type ActivityDetails = {
  name: string;
  description: string;
  image: string;
  date: string;
  time: string;
  place: string;
  latitude: string;
  longitude: string;
} | null;

const useSocket = (
  activityId: string | null,
  isLoggedIn: boolean,
  token: string | undefined,
  setMessages: React.Dispatch<React.SetStateAction<{ sender: { id: string; name: string; lastname: string; avatar: string }; text: string }[]>>,
  setActivityDetails: React.Dispatch<React.SetStateAction<ActivityDetails>>
): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!activityId || !isLoggedIn) {
      return;
    }

    const newSocket = io(SOCKET_SERVER_URL, {
      query: { activityId },
      transports: ["websocket"],
      auth: { token },
    });

    newSocket.on("connect", () => {
      newSocket.emit("joinActivity", activityId);
    });

    newSocket.on(`activity-${activityId}`, (message) => {
      setMessages((prev) => {

        const isDuplicate = prev.some((msg) => msg.sender.id === message.id);

        if (isDuplicate) {
          return prev;
        }

        return [
          {
            id: message.id,
            sender: {
              id: message.sender.id,
              name: message.sender.name,
              lastname: message.sender.lastname,
              avatar: message.sender.avatar
            },
            text: message.text,
          },
          ...prev,
        ];
      });
    });

    newSocket.on("activityDetails", (details: ActivityDetails) => {
      setActivityDetails(details);
    });

    newSocket.on("disconnect", () => {
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [activityId, isLoggedIn, token, setMessages, setActivityDetails]);

  return socket;
};

export default useSocket;
