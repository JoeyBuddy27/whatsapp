import { Avatar } from "@material-ui/core/";
import React from "react";

function SidebarChat(props) {
  return (
    <div className="sidebarChat">
      <Avatar src={props.avatar} />
      <div className="sidebarChat__info">
        <h2>{props.name}</h2>
        <p>{props.lastMessage}</p>
      </div>
      {props.online && <Avatar className="sidebarChat__online"> </Avatar>}
    </div>
  );
}

export default SidebarChat;
