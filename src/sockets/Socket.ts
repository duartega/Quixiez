import socketIo from "socket.io-client";
import { socketTest, socketTestTestNameSpace } from "../network/routes";

/** Events */
import {
  SEND_MESSAGE,
  INCOMING_MESSAGE,
  EMPLOYEE_START_TYPING,
  EMPLOYEE_STOP_TYPING,
  INCOMING_QUE_TEXT,
  MESSAGES_MARKED_READ
} from "./events/Events";

export const socket = socketIo(socketTestTestNameSpace);

export const joinRoom = () => socket.emit("join");

export const sendMessage = (message: string) => {
  socket.emit(SEND_MESSAGE, { message });
};

export const receiveMessage = (messageDataCb: (messageData: any) => void) => {
  socket.on(INCOMING_MESSAGE, (messageData: any) => {
    // console.log("receiving message", messageData);
    messageDataCb(messageData);
  });
};

export const handleEmployeeStartedTyping = (companyUsername: string) => {
  socket.emit(EMPLOYEE_START_TYPING, { companyUsername });
  // console.log("handleEmployee started typing", companyUsername);
};

export const handleIncomingEmployeeStartedTyping = (
  callback: (companyUsername: string) => void
) => {
  socket.on(EMPLOYEE_START_TYPING, (data: any) => {
    const { companyUsername } = data;
    callback(companyUsername);
  });
};

export const handleIncomingEmployeeStoppedTyping = (
  callback: (companyUsername: string) => void
) => {
  socket.on(EMPLOYEE_STOP_TYPING, (data: any) => {
    const { companyUsername } = data;
    callback(companyUsername);
  });
};

export const handleEmployeeStoppedTyping = (companyUsername: string) => {
  socket.emit(EMPLOYEE_STOP_TYPING, { companyUsername });
};

export const stopListening = (eventName: string) => {
  socket.off(eventName);
};

export const handleIncomingQueText = (callback: (queText: any) => void) => {
  socket.on(INCOMING_QUE_TEXT, (data: any) => {
    callback(data);
  });
};

export const handleIncomingMessagesMarkedRead = (
  callback: (queText: any) => void
) => {
  socket.on(MESSAGES_MARKED_READ, (data: any) => {
    callback(data);
  });
};
