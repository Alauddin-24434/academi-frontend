"use client";

import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"; // optional: use your scroll component
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/soket";

interface Message {
  content: string;
  senderId: string;
  receiverId?: string;
  group?: string;
  createdAt?: string;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const userId = "user1";
  const receiverId = "user2"; // or group id

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on(`message:receive:${userId}`, (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect");
      socket.off(`message:receive:${userId}`);
    };
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      content: input,
      senderId: userId,
      receiverId,
    };

    socket.emit("message:send", newMsg);
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (optional) */}
      <div className="w-64 bg-white border-r p-4 hidden md:block">
        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
        <ul className="space-y-2">
          <li className="text-blue-600 font-medium">User 1</li>
          <li>User 2</li>
          <li>Group A</li>
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 overflow-y-auto mb-4 space-y-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-xs px-4 py-2 rounded-xl text-white ${
                msg.senderId === userId
                  ? "ml-auto bg-purple-600"
                  : "mr-auto bg-gray-500"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
