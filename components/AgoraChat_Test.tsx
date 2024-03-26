"use client";
import React, { useEffect, useRef, useState } from "react";
import AgoraRTM from "agora-rtm-sdk";
import { v4 as uuidv4 } from "uuid";

interface IMessage {
  text: string;
  uid: string;
}

const APP_ID = "0beded9afece4e3c89539f3ceffa19a2";
const CHANNEL = "test";

let uid = uuidv4();
let client = new AgoraRTM.RTM(APP_ID, uid);

const AgoraChat_Test: React.FC = () => {
  const messagesRef = useRef<React.ElementRef<"div">>(null);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [text, setText] = useState("");
  const [channel, setChannel] = useState<any>(null);

  const appendMessage = (message: IMessage) => {
    setMessages(messages => [...messages, message]);
  };

  useEffect(() => {
    const connect = async () => {
      await client.login();
      const channel = await client.createStreamChannel(CHANNEL);
      await channel.join();
      channel.on("ChannelMessage", (message, peerId) => {
        appendMessage({
          text: message.text,
          uid: peerId
        });
      });
      setChannel(channel);
      return channel;
    };
    const connection = connect();

    return () => {
      const disconnect = async () => {
        const channel = await connection;
        await channel.leave();
        await client.logout();
      };
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text === "") return;
    channel.sendMessage({ text, type: "text" });
    appendMessage({
      text: text,
      uid
    });
    setText("");
  };

  return (
    <main>
      <div className="panel">
        <div
          className="messages"
          ref={messagesRef}
        >
          <div className="inner">
            {messages.map((message, idx) => (
              <div
                key={idx}
                className="message"
              >
                {message.uid === uid && (
                  <div className="user-self">You:&nbsp;</div>
                )}
                {message.uid !== uid && (
                  <div className="user-them">Them:&nbsp;</div>
                )}
                <div className="text">{message.text}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={sendMessage}>
          <input
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button>+</button>
        </form>
      </div>
    </main>
  );
};

export default AgoraChat_Test;
