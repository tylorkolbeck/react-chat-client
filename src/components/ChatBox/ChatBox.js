import React from "react";
import "./ChatBox.css";

export default function ChatBox({ messages, senderName }) {

  return (
    <div className="chat-box">
      {messages.map((msg, index) => {
        return (
          <div key={index} className="message-wrapper" style={{justifyContent: msg.sender === senderName ? 'flex-end' : 'flex-start'}}>
            <div className="message-avatar">{msg.sender[0]}</div>
            <p key={index} className={["message", msg.sender === senderName ? " sent" : "received"].join(" ")}>
              {msg.message}
            </p>
          </div>
        );
      })}
    </div>
  );
}
