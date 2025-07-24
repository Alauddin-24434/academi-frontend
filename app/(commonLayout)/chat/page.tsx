"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import dynamic from "next/dynamic";

import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface IGroup {
  id: string;
  name: string;
  session: string;
}

interface IMessage {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  sender: {
    fullName: string;
    passportPhoto: string;
    user: {
      id: string;
      socketId?: string; // <-- Add this if you track socketId in backend for users
    };
  };
}

// Dynamically import the CallPage to avoid SSR issues
const VideoCall = dynamic(() => import("@/components/home-section/video"), {
  ssr: false,
});

export default function GroupChatPage() {
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [calling, setCalling] = useState(false);
  const [targetSocketId, setTargetSocketId] = useState(""); // This would ideally be determined by selecting a specific member to call

  const user = useSelector(selectCurrentUser);

  const [groupMembers, setGroupMembers] = useState<any[]>([]);

  // Fetch group members when a group is selected
  useEffect(() => {
    if (!selectedGroup) return;

    axios
      .get(`http://localhost:5000/api/groups/${selectedGroup.id}/members`)
      .then((res) => setGroupMembers(res.data.data))
      .catch((err) => console.error("Failed to fetch group members:", err));
  }, [selectedGroup]);

  // Fetch all groups for the sidebar
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/messages/group", {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((res) => {
        setGroups(res.data.data);
      })
      .catch((err) => console.error("Failed to fetch groups:", err));
  }, []);

  // Fetch messages for the selected group
  useEffect(() => {
    if (!selectedGroup) {
      setMessages([]);
      return;
    }
    axios
      .get(`http://localhost:5000/api/messages/${selectedGroup.id}`, {
        headers: { "Cache-Control": "no-cache" },
      })
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => console.error("Failed to fetch messages:", err));
  }, [selectedGroup]);

  // Send message
  const sendMessage = async () => {
    if (!newMsg.trim() || !selectedGroup || !user?.id) return; // Ensure user.id exists

    const payload = {
      groupId: selectedGroup.id,
      senderId: user.id, // Using user.id directly. Adjust if user.student.id is the correct identifier.
      content: newMsg.trim(),
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages/message",
        payload
      );
      setMessages((prev) => [...prev, res.data.data]);
      setNewMsg("");
    } catch (error) {
      console.error("Failed to send message:", error);
      // Optionally show an error message to the user
    }
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to format time (already good)
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Handle call initiation
  const handleCall = (type: "audio" | "video") => {
    if (!selectedGroup) return;

    // IMPORTANT: For a real group call, you'd likely involve a signaling server
    // to manage multiple participants. For 1:1 calls from a group context,
    // you'd need to select a specific member to call and use their socketId.
    // The current implementation picks the socketId from the first message sender,
    // which is a placeholder and not robust for general calling.

    // DEMO placeholder: Try to get a socketId from a group member if available
    const firstGroupMemberWithSocketId = groupMembers.find(
      (member) => member.user?.socketId
    );

    const targetUserSocketId = firstGroupMemberWithSocketId?.user?.socketId;

    if (!targetUserSocketId) {
      alert(
        "Cannot initiate call: No online group member with a socket ID found."
      );
      return;
    }
    setTargetSocketId(targetUserSocketId);
    setCalling(true);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Chats</h1>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-100 border-0 rounded-full"
            />
          </div>
        </div>

        {/* Groups List */}
        <div className="flex-1 overflow-y-auto">
          {filteredGroups.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No groups available</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredGroups.map((group) => (
                <div
                  key={group.id}
                  onClick={() => setSelectedGroup(group)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                    selectedGroup?.id === group.id
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : ""
                  }`}
                >
                  <Avatar className="h-12 w-12 mr-3">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                      {group.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {group.name}
                      </h3>
                      {/* You might want to display the last message time here, not a static time */}
                      <span className="text-xs text-gray-500">2:30 PM</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-gray-600 truncate">
                        Session: {group.session}
                      </p>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 text-xs"
                      >
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedGroup ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {selectedGroup.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {selectedGroup.name}
                    </h2>
                    {/* Display actual member count if available from groupMembers state */}
                    <p className="text-sm text-gray-500">
                      {groupMembers.length} members • Active now
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleCall("audio")}
                    title="Audio Call"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={() => handleCall("video")}
                    title="Video Call"
                  >
                    <Video className="h-5 w-5" />
                  </Button>

                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4">
              {messages.map((msg) => {
                const isOwnMessage = msg.senderId === user?.id; // Assuming user.id is the correct identifier

                return (
                  <div
                    key={msg.id}
                    className={`flex w-full ${
                      isOwnMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-end gap-2 max-w-xs md:max-w-md w-fit ${
                        isOwnMessage ? "flex-row-reverse" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <img
                        src={
                          msg.sender.passportPhoto ||
                          "/placeholder.svg?height=40&width=40"
                        } // Fallback for avatar
                        alt={msg.sender.fullName}
                        className="w-10 h-10 rounded-full object-cover border"
                      />

                      {/* Message Bubble */}
                      <div
                        className={`p-3 rounded-lg shadow-sm ${
                          isOwnMessage
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-800"
                        }`}
                      >
                        <div
                          className={`flex items-center mb-1 text-xs ${
                            isOwnMessage ? "text-blue-100" : "text-gray-500"
                          } ${isOwnMessage ? "justify-end" : "justify-start"}`}
                        >
                          <span
                            className={`font-semibold ${
                              isOwnMessage ? "text-blue-100" : "text-purple-700"
                            }`}
                          >
                            {isOwnMessage ? "You" : msg.sender.fullName}
                          </span>
                          <span className="ml-2">
                            {formatTime(msg.createdAt)}
                          </span>
                        </div>
                        <div
                          className={`text-sm ${
                            isOwnMessage ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {messages.length === 0 && selectedGroup && (
                <p className="text-center text-gray-500">
                  Be the first to send a message! 🚀
                </p>
              )}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-gray-500"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>

                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Type a message..."
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    className="rounded-full border-gray-300 pr-12 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full text-gray-500"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  onClick={sendMessage}
                  disabled={!newMsg.trim()}
                  className="rounded-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed p-3"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* No Group Selected State */
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="bg-white rounded-full p-6 mb-4 shadow-sm mx-auto w-fit">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Welcome to Group Chat
              </h2>
              <p className="text-gray-600 max-w-md">
                Select a group from the sidebar to start chatting with your
                classmates and colleagues.
              </p>
            </div>
          </div>
        )}

        {/* Video Call Modal */}
        {calling && targetSocketId && user?.id && (
          <VideoCall
            userId={user.id} // Ensure user.id is correctly passed
            targetId={targetSocketId}
            callType="video"
            onClose={() => setCalling(false)}
          />
        )}
      </div>
    </div>
  );
}