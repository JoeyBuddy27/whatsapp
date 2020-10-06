import React, { useEffect, useState } from "react";
import "./SASS/app.min.css";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [messages, setMessages] = useState([]);

  //fetch the synced messages, and push them into an array
  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  //create pusher - listen for changes
  useEffect(() => {
    const pusher = new Pusher("c6c60b7089033928282a", {
      cluster: "eu",
    });

    //subscrube to our 'messages' databse. and bind on "insert" events
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    //cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar messages={messages} />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
