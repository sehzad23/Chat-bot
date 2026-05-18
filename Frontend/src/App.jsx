import { useEffect, useState } from "react";

import socket from "./services/socket";

import Header from "./components/Header";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";

import { saveChat, loadChat } from "./utils/localStorage";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    setMessages(loadChat());

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("ai-response", (data) => {
      setMessages((prev) => {
        const updated = [
          ...prev,
          { text: data, sender: "ai" },
        ];

        saveChat(updated);

        return updated;
      });
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("ai-response");
    };
  }, []);

  const sendMessage = (text) => {
    const newMessage = {
      text,
      sender: "user",
    };

    const updated = [...messages, newMessage];

    setMessages(updated);

    saveChat(updated);

    socket.emit("ai-message", text);
  };

  return (
    <div className="min-h-screen bg-[#0b1220] text-white flex flex-col">
      <Header isConnected={isConnected} />

      <div className="flex-1 lg:w-[50%] w-full m-auto flex flex-col">
        <ChatMessages messages={messages} />

        <ChatInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default App;