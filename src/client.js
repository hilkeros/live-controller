  
import io from "socket.io-client";

import React from "react";
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"]
});

const App = ({}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // socket.on("connect", () => {
    //   socket.emit("username", username);
    // });

    // socket.on("users", users => {
    //   setUsers(users);
    // });

    socket.on("message", message => {
      setMessages(messages => [...messages, message]);
    });

    // socket.on("connected", user => {
    //   setUsers(users => [...users, user]);
    // });

    // socket.on("disconnected", id => {
    //   setUsers(users => {
    //     return users.filter(user => user.id !== id);
    //   });
    // });
  }, []);

  const submit = event => {
    event.preventDefault();
    socket.emit("send", message);
    setMessage("");
  };

  return (
    <div className="container">
        <form onSubmit={submit} id="form">
            <div className="input-group">
                <input
                type="text"
                className="form-control"
                onChange={e => setMessage(e.currentTarget.value)}
                value={message}
                id="text"
                />
                <span className="input-group-btn">
                <button id="submit" type="submit" className="btn btn-primary">
                    Send
                </button>
                </span>
            </div>
        </form>
        <div className="messages">
            {messages.map(({ clientId, text }, index) => (
                <div key={index} className="row mb-2">
                    <div className="col-md-2">{clientId}</div>
                    <div className="col-md-2">{text}</div>
                </div>
            ))}
        </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));