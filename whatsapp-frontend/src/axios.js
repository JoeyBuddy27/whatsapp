import axios from "axios";

const instance = axios.create({
  baseURL: "https://live-chat-app-joe.herokuapp.com/",
});

export default instance;
