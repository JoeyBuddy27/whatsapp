export const initialState = {
  users: [
    {
      id: "0",
      name: "Phil",
      avatar:
        "https://s.studiobinder.com/wp-content/uploads/2019/09/Quentin-Tarantinos-Star-Trek-Featured-StudioBinder.jpg",
      online: true,
    },
    {
      id: "1",
      name: "Kidsan",
      avatar:
        "https://i.insider.com/5f0a67534dca6808ef640f43?width=1100&format=jpeg&auto=webp",
    },
    {
      id: "2",
      name: "Cian",
      avatar:
        "https://www.indiewire.com/wp-content/uploads/2019/02/shutterstock_10118627hz.jpg",
    },
    {
      id: "3",
      name: "Shane",
      avatar:
        "https://www.cheatsheet.com/wp-content/uploads/2020/09/Brad-Pitt-4-1024x689.jpg",
    },
  ],
  currentUser: "Phil",
  currentAvatar:
    "https://s.studiobinder.com/wp-content/uploads/2019/09/Quentin-Tarantinos-Star-Trek-Featured-StudioBinder.jpg",

  isSidebarHidden: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_ROOM":
      return {
        ...state,
        currentUser: action.currentUser,
        currentAvatar: action.currentAvatar,
        isSidebarHidden: action.isSidebarHidden,
      };
    case "OPEN_CHATS":
      return {
        ...state,
        isSidebarHidden: action.isSidebarHidden,
      };
    default:
      return state;
  }
};

export default reducer;
