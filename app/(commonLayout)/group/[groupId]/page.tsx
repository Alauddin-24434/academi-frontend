"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const CallPage = dynamic(() => import("@/components/home-section/video"), { ssr: false });

export default function GroupPage({ params }: { params: { groupId: string } }) {
  const [calling, setCalling] = useState(false);
  const [targetId, setTargetId] = useState("");

  const currentUserId =useSelector(selectCurrentUser)

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Group ID: {params.groupId}</h1>

      <input
        type="text"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
        placeholder="Enter Target User ID"
        className="border p-2 my-2"
      />

      <button
        onClick={() => setCalling(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Call User
      </button>

      {calling && (
        <CallPage
          userId={currentUserId?.id}
          targetId={targetId}
          callType="video"
          onClose={() => setCalling(false)}
        />
      )}
    </div>
  );
}
