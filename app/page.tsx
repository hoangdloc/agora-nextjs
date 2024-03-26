"use client";
import AgoraChat from "@/components/AgoraChat";
import AgoraUIKit_Test from "@/components/AgoraUIKit_Test";
import { Provider } from "agora-chat-uikit";

export default function Home() {
  return (
    <>
      <Provider
        initConfig={{
          appKey: "611120999#1304698"
        }}
      >
        <AgoraChat />
      </Provider>
    </>
  );
}
