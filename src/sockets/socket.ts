import socketIo from "socket.io-client";
import { socketTest } from "../constants/routes";

export const defaultSocket = socketIo(socketTest);

export const joinRoom = () => defaultSocket.emit("join");
