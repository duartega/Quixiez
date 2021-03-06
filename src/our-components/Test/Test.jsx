import React from "react";
import {
  joinRoom,
  sendMessage,
  receiveMessage,
  stopListening
} from "../../sockets/Socket";
import { INCOMING_MESSAGE } from "../../sockets/events/Events";
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
    stopListening(INCOMING_MESSAGE);
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
