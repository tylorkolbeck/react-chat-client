import React from 'react'
import "./Login.css"

export default function Login({onLogin}) {
  const [userName, setUserName] = React.useState("");

  function onSubmitHandler() {
    onLogin(userName)
  }

  return (
    <div className="login-wrapper">
      <h4>Enter you username: </h4>
      <input value={userName} onChange={(e) => setUserName(e.target.value)}></input>
      <button className="btn" onClick={onSubmitHandler}>Enter Chat</button>
    </div>
  )
}
