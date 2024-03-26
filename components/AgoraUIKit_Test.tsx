import React from "react";
import AgoraUIKit from "agora-react-uikit";

const rtcProps = {
  appId: "0beded9afece4e3c89539f3ceffa19a2",
  channel: "test",
  token: null // enter your channel token as a string
};

const AgoraUIKit_Test = () => {
  return <AgoraUIKit rtcProps={rtcProps} />;
};

export default AgoraUIKit_Test;
