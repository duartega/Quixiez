import socketIo from "socket.io-client";
import { socketTest, socketTestTestNameSpace } from "../constants/routes";

/** Events */
import {
  SEND_MESSAGE,
  INCOMING_MESSAGE,
  EMPLOYEE_START_TYPING
} from "./events/Events";

export const socket = socketIo(socketTestTestNameSpace);

export const joinRoom = () => socket.emit("join");

export const sendMessage = (message: string) => {
  socket.emit(SEND_MESSAGE, { message });
};

export const receiveMessage = (messageDataCb: (messageData: any) => void) => {
  socket.on(INCOMING_MESSAGE, (messageData: any) => {
    console.log("receiving message", messageData);
    messageDataCb(messageData);
  });
};

export const handleEmployeeStartedTyping = (companyUsername: string) => {
  socket.emit(EMPLOYEE_START_TYPING, { companyUsername });
  console.log("handleEmployee started typing", companyUsername);
};

export const handleIncomingEmployeeStartedTyping = (
  callback: (companyUsername: string) => void
) => {
  socket.on(EMPLOYEE_START_TYPING, (data: any) => {
    const { companyUsername } = data;
    callback(companyUsername);
  });
};

export const stopListening = (eventName: string) => {
  socket.off(eventName);
};
