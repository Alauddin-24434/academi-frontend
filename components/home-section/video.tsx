"use client";

import { socket } from "@/lib/soket";
import React, { useEffect, useRef, useState } from "react";

interface CallPageProps {
  userId: string; // your logged-in userId
}

const CallPage: React.FC<CallPageProps> = ({ userId }) => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const [mySocketId, setMySocketId] = useState("");
  const [calling, setCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{
    from: string;
    offer: RTCSessionDescriptionInit;
  } | null>(null);

  const [targetUserId, setTargetUserId] = useState("");
  const [callAccepted, setCallAccepted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);

  // Configuration for STUN servers (needed for ICE)
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      // add TURN servers here if needed
    ],
  };

  useEffect(() => {
    if (!userId) return;

    socket.connect();

    // Tell server who you are
    socket.emit("join", userId);

    setMySocketId(socket.id);

    // Incoming call event
    socket.on("call-made", async ({ from, offer }) => {
      console.log("Incoming call from", from);
      setIncomingCall({ from, offer });
      setCalling(false);
      setCallAccepted(false);
      setCallRejected(false);
    });

    // Answer received
    socket.on("answer-made", async ({ from, answer }) => {
      console.log("Answer received from", from);
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        setCallAccepted(true);
      }
    });

    // ICE candidate received
    socket.on("ice-candidate", async ({ from, candidate }) => {
      try {
        if (peerConnectionRef.current && candidate) {
          await peerConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
          // console.log("Added ICE candidate");
        }
      } catch (err) {
        console.error("Error adding ICE candidate", err);
      }
    });

    // Call rejected
    socket.on("call-rejected", ({ from }) => {
      alert(`Call rejected by user ${from}`);
      cleanupCall();
    });

    return () => {
      socket.off("call-made");
      socket.off("answer-made");
      socket.off("ice-candidate");
      socket.off("call-rejected");
      socket.disconnect();
      cleanupCall();
    };
  }, [userId]);

  // Create peer connection and set handlers
  const createPeerConnection = (remoteUserId: string) => {
    const pc = new RTCPeerConnection(iceServers);

    // When remote stream arrives, show it
    pc.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Send ICE candidates to remote
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: remoteUserId,
          candidate: event.candidate,
        });
      }
    };

    return pc;
  };

  // Start call - create offer and send to target userId
  const startCall = async () => {
    if (!targetUserId.trim()) {
      alert("Please enter target user ID to call");
      return;
    }
    setCalling(true);
    setCallRejected(false);

    const pc = createPeerConnection(targetUserId);
    peerConnectionRef.current = pc;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      socket.emit("call-user", {
        to: targetUserId,
        offer,
      });
    } catch (error) {
      console.error("Error getting media or creating offer", error);
      cleanupCall();
    }
  };

  // Accept incoming call
  const acceptCall = async () => {
    if (!incomingCall) return;
    setCallAccepted(true);
    setCallRejected(false);

    const pc = createPeerConnection(incomingCall.from);
    peerConnectionRef.current = pc;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      await pc.setRemoteDescription(new RTCSessionDescription(incomingCall.offer));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("make-answer", {
        to: incomingCall.from,
        answer,
      });

      setIncomingCall(null);
    } catch (error) {
      console.error("Error accepting call", error);
      cleanupCall();
    }
  };

  // Reject incoming call
  const rejectCall = () => {
    if (!incomingCall) return;
    socket.emit("reject-call", { to: incomingCall.from });
    setIncomingCall(null);
    setCallRejected(true);
  };

  // Cleanup media and peer connection
  const cleanupCall = () => {
    setCalling(false);
    setCallAccepted(false);
    setIncomingCall(null);
    setTargetUserId("");
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const tracks = (localVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
      const tracks = (remoteVideoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="mb-4 font-semibold text-xl">Your Socket ID: {mySocketId}</h2>

      {!callAccepted && !incomingCall && (
        <div>
          <input
            type="text"
            placeholder="Enter target user ID"
            value={targetUserId}
            onChange={(e) => setTargetUserId(e.target.value)}
            className="border rounded px-3 py-2 mb-2 w-full"
          />
          <button
            onClick={startCall}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            disabled={calling}
          >
            {calling ? "Calling..." : "Start Call"}
          </button>
        </div>
      )}

      {/* Incoming call UI */}
      {incomingCall && (
        <div className="p-4 border rounded bg-yellow-100 mt-4">
          <p>
            Incoming call from <strong>{incomingCall.from}</strong>
          </p>
          <button
            onClick={acceptCall}
            className="mr-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Accept
          </button>
          <button
            onClick={rejectCall}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}

      {/* Call accepted UI */}
      {callAccepted && (
        <div className="mt-4">
          <h3 className="mb-2 font-semibold">In Call with {targetUserId || (incomingCall?.from ?? "")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-1">Local Video</h4>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded bg-black"
              />
            </div>
            <div>
              <h4 className="mb-1">Remote Video</h4>
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full rounded bg-black"
              />
            </div>
          </div>

          <button
            onClick={cleanupCall}
            className="mt-4 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            End Call
          </button>
        </div>
      )}

      {/* Call rejected message */}
      {callRejected && (
        <p className="mt-4 text-red-600 font-semibold">Call was rejected.</p>
      )}
    </div>
  );
};

export default CallPage;
