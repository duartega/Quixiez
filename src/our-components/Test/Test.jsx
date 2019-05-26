import React from "react";
import {
  joinRoom,
  sendMessage,
  receiveMessage,
  stopListening
} from "../../__sockets/socket";
import { RECEIVE_MESSAGE } from "../../__sockets/events";
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    // this.socket = socketIo(socketTest);
  }

  componentDidMount() {
    /** Join the room */
    // this.socket.emit("join");
    joinRoom();
    sendMessage("Hey!");
    receiveMessage(messageData => {
      const { data } = this.state;
      const { message } = messageData;
      data.push(message);
      this.setState({ data });
    });
  }

  componentWillUnmount() {
    stopListening(RECEIVE_MESSAGE);
  }

  render() {
    const listOfData = this.state.data.map((data, idx) => (
      <p key={idx}>{data}</p>
    ));
    return (
      <div>
        <h1>Test</h1>
        {listOfData}
      </div>
    );
  }
}

export default Test;
