"use client";

import "@livekit/components-styles";
import {
  LiveKitRoom,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  ControlBar,
  useTracks,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
import { Track } from "livekit-client";
import { useSearchParams } from "next/navigation";
import styles from './room.module.css';

export default function Page() {

  const params = useSearchParams();

  useEffect(() => {
    const room = params.get("room");
    const name = params.get("name");
    if (room && name) {
      setRoom(room);
      setName(name);
    }
  }, [params]);

  const [room, setRoom] = useState<string>();
  const [name, setName] = useState<string>();

  const [token, setToken] = useState("");

  const handleLogOut = async () => {
    await setToken("");
    console.log("Hello World Logout");
  };

  const handleLogIn = () => {
    console.log("Hello World Login");
  };

  async function getToken() {
    if (!room || !name) {
      return;
    }
    try {
      const resp = await fetch(
        `/api/get-participant-token?room=${room}&username=${name}`
      );
      const data = await resp.json();
      setToken(data.token);
    } catch (e) {
      console.error(e);
    }
  }

  if (token === "") {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getToken();
        }}
        className={`flex flex-col justify-center items-center h-96 w-30 bg-slate-500 ${styles.body}`}
      >
        <input
          type="text"
          placeholder="Enter room number"
          value={room}
          className={`mb-4 ${styles.input}`}
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          className={`mb-4 ${styles.input}`}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => handleLogIn()}
          type="submit"
          className="px-10 py-3 bg-blue-500 text-black font-bold bg-blue rounded-md hover:bg-blue-600 transition-colors"
        >
          Join
        </button>
      </form>
    );
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      onDisconnected={() => handleLogOut()}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: "100dvh" }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen 
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );
  return (
    <GridLayout
      tracks={tracks}
      style={{ height: "calc(100vh - var(--lk-control-bar-height))" }}
    >
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}
