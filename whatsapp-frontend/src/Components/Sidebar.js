import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import SidebarChat from "./SidebarChat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core/";
import SearchOutlined from "@material-ui/icons/Search";
import { useStateValue } from "../store/StateProvider";

function Sidebar({ messages }) {
  const [initialState, dispatch] = useStateValue();

  const changeRoom = (user) => {
    dispatch({
      type: "CHANGE_ROOM",
      currentUser: user.name,
      currentAvatar: user.avatar,
      isSidebarHidden: true,
    });
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.currentUser === initialState.currentUser ||
      (msg.name === "You" && msg.currentUser === initialState.currentUser)
  );

  return (
    // <div className={`sidebar ${initialState.sidebarHide}`}>
    <div
      className={`sidebar ${
        !initialState.isSidebarHidden ? " " : "sidebar__hide"
      }`}
    >
      <div className="sidebar__header">
        <Avatar
          className="sidebar__header__avatar"
          src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-9/98441061_10157040823906712_4132654932786413568_o.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_ohc=9wchdriyh8gAX_U0SVM&_nc_ht=scontent-lht6-1.xx&oh=d75b86134dab70faf6580db0317763e1&oe=5F99E78D"
        />
        <div className="sidebar__header__right">
          <IconButton>
            <DonutLargeIcon className="donut" />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search__container">
          <SearchOutlined />
          <input type="text" placeholder="Search or start new chat!" />
        </div>
      </div>
      <div className="sidebar__chats">
        {initialState.users.map((user) => {
          const filteredMessages = messages.filter(
            (msg) => msg.currentUser === user.name
          );

          return (
            <div key={user.id} onClick={() => changeRoom(user)}>
              <SidebarChat
                messages={messages}
                key={user.id}
                name={user.name}
                avatar={user.avatar}
                lastMessage={
                  filteredMessages[filteredMessages.length - 1]?.message
                }
                online={user.online}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
