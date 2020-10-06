import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
  Mic,
  ArrowBackIos,
} from "@material-ui/icons";
import React, { useState, useRef, useEffect } from "react";
import axios from "../axios";
import { useStateValue } from "../store/StateProvider";
import moment from "moment";
import FadeIn from "react-fade-in";

function Chat({ messages }, props) {
  const [input, setInput] = useState("");
  const [initialState, dispatch] = useStateValue();
  const [sendAsGuest, setSendAsGuest] = useState(false);

  // alert(initialState.currentUser);
  //send typed message via Axios to API

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: sendAsGuest ? initialState.currentUser : "You",
      timestamp: new Date(),
      received: sendAsGuest ? true : false,
      currentUser: initialState.currentUser,
    });

    //clear input
    setInput("");
  };

  const changeSender = (e) => {
    e.preventDefault();
    setSendAsGuest(!sendAsGuest);
  };

  const showChats = () => {
    dispatch({
      type: "OPEN_CHATS",
      isSidebarHidden: false,
    });
  };

  let messagesEndRef = useRef(null); //create the ref

  //scroll to end function
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      className={`chat ${initialState.isSidebarHidden ? "chat__show" : " "}`}
    >
      <div className="chat__header">
        <div className="div" onClick={showChats}>
          <IconButton>
            <ArrowBackIos />
          </IconButton>
        </div>
        <Avatar src={initialState.currentAvatar} />

        <div className="chat__header__info">
          <h3>{initialState.currentUser}</h3>
        </div>

        <div className="div__chat__header__right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages
          .filter(
            (msg) =>
              msg.name === initialState.currentUser ||
              (msg.name === "You" &&
                msg.currentUser === initialState.currentUser)
          )
          .map((message) => {
            return (
              <FadeIn>
                <div key={Math.random()}>
                  <p
                    key={message.id}
                    className={`chat__body__message ${
                      message.received && "chat__body__receiver"
                    }`}
                  >
                    <span className="chat__body__message__name">
                      {message.name}
                    </span>
                    {message.message !== "" || null ? message.message : null}
                    <span className="chat__body__message__timestamp">
                      {moment(message.timestamp).fromNow()}
                    </span>
                  </p>
                </div>
              </FadeIn>
            );
          })}

        <div ref={messagesEndRef}></div>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form action="" className="chat__footer__form">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="type a message"
          />
          {/* <label for="chat__footer__form__checkbox">
            Send as {initialState.currentUser}
            <input
              type="checkbox"
              className="chat__footer__form__checkbox"
              onChange={() => setSendAsGuest(!sendAsGuest)}
              checked={sendAsGuest}
            />
          </label> */}
          <p onClick={(e) => changeSender(e)}>
            Sending as
            <span className="chat__footer__form__sendAs">
              {sendAsGuest ? `${initialState.currentUser}` : "You"}
            </span>
          </p>
          <button
            className="chat__footer__form__submit"
            onClick={sendMessage}
            type="submit"
          >
            Send
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
