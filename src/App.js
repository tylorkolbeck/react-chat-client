import "./App.css";
import useWebSocket from "react-use-websocket";
import { useEffect, useState } from "react";
import ChatBox from "./components/ChatBox/ChatBox";
import MessageInput from "./components/MessageInput/MessageInput";
import Login from "./components/Login/Login";

const DATA = {
  TYPE: {
    0: "REGISTER",
    1: "MESSAGE",
    REGISTER: 0,
    MESSAGE: 1,
  },
};

const dummyMessages = [
  // generate 100 dummy message with random sender and time and message
  ...Array.from({ length: 100 }, () => ({
    //create a random message
    message: "Hello",
    sender: Math.random() > 0.5 ? "Tylor" : "Bob",
    time: `${Math.floor(Math.random() * 24)}:${Math.floor(
      Math.random() * 60
    )}`,
  })),

];

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(dummyMessages);
  const [registered, setIsRegistered] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [name, setName] = useState("");
  const [websocket, setWebsocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket("ws://192.168.1.170:9002", {
    onOpen: () => {
      setIsConnected(true);
    },
    onMessage: ({ data }) => {
      if (data === "REGISTERED") {
        setIsRegistered(true);
        return;
      }

      setMessages([data, ...messages]);
    },
    shouldReconnect: (closeEvent) => true,
  });

  const onRegisterHandler = (event) => {
    sendJsonMessage({
      type: "REGISTER" | "MESSAGE",
      message: "REGISTER",
      user: name,
    });
  };

  const messageChangedHandler = (e) => {
    setUserMsg(e.target.value);
  };

  const sendClickHandler = (event) => {
    event.preventDefault();
    sendJsonMessage({ type: DATA.TYPE.MESSAGE, message: userMsg, user: name });
  };

  function loginHandler(username) {
    setName(username);
    sendJsonMessage({ type: DATA.TYPE.REGISTER, user: name });


  }

  return (
    <div className="app-wrapper">
      {/* <div>
        <p>Connection status: {isConnected ? "Connected" : "Not connected"}</p>
      </div>
      {!registered && (
        <div>
          <p>User name:</p>
          <input onChange={onNameChangedHandler} value={name}></input>
          <button onClick={onRegisterHandler} disabled={name.length < 3}>
            Register
          </button>
        </div>
      )}

      {!isConnected && <p>Connecting to the server...</p>} */}

      {/* {registered && ( */}

          {/* <p>Input Message:</p>
          <input onChange={messageChangedHandler}></input>
          <button onClick={sendClickHandler}>Send</button> */}
          {registered ? (<><ChatBox messages={messages} senderName={name}/> <MessageInput /></>) : <Login onLogin={loginHandler}/>}
          
          
     
      {/* )} */}
    </div>
  );
}

export default App;
