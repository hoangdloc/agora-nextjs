"use client";

import React, { useEffect } from "react";
import {
  Conversation,
  Chat,
  ConversationList,
  rootStore,
  useClient
} from "agora-chat-uikit";
import "agora-chat-uikit/style.css";
import Image from "next/image";

const user = "hoangluke"; // your user ID
const agoraToken =
  "007eJxTYFhVcETuiu4FyWn+b65a6FolnLQ+0Cw5fWZ74lO720rbPecoMBgkpaakplgmpqUmp5qkGidbWJoaW6YZJ6empSUaWiYacXszpjUEMjKUTnBnYWRgZWBkYGIA8RkYALtBHdc="; // agora chat token

const conversations: Conversation[] = [
  {
    chatType: "singleChat", // 'singleChat' || 'groupChat'
    conversationId: "darren", // target user id or group id
    name: "Darren Wong", // target user nickname or group name
    lastMessage: {},
    unreadCount: 0
  },
  {
    chatType: "singleChat", // 'singleChat' || 'groupChat'
    conversationId: "jasmine", // target user id or group id
    name: "Jasmine Tay", // target user nickname or group name
    lastMessage: {},
    unreadCount: 1
  },
  {
    chatType: "groupChat", // 'singleChat' || 'groupChat'
    conversationId: "243229254549505", // target user id or group id
    name: "Venture Group", // target user nickname or group name
    lastMessage: {},
    unreadCount: 1
  }
];

const AgoraChat = () => {
  const client = useClient();
  console.log("🚀 ~ AgoraChat ~ client:", client);
  useEffect(() => {
    client &&
      client
        .open({
          user,
          agoraToken
        })
        .then((res: any) => {
          console.log("get token success", res);
          // create a conversation
          conversations.forEach(conversation =>
            rootStore.conversationStore.addConversation(conversation)
          );
          rootStore.conversationStore.setCurrentCvs(conversations[0]);
        });
  }, [client]);

  return (
    <div className="flex w-full h-[100vh]">
      <div className="flex-1 max-w-96 border-r border-neutral-200">
        <ConversationList
          headerProps={{
            content: <p className="font-semibold">Chat List</p>,
            avatar: (
              <Image
                src="/next.svg"
                alt="Venture blick"
                width={40}
                height={40}
              />
            )
          }}
        />
      </div>
      <Chat />
    </div>
  );
};

export default AgoraChat;
