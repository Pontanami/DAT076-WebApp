import { io } from "socket.io-client";
import { hostPort } from "./hostPort";

export const socket = io(`http://${hostPort}:8080`);