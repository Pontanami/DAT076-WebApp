import { io } from "socket.io-client";

export const SocketIO = io("http://localhost:8080", {
    transports: ['websocket']
  });