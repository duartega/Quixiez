import React from "react";
import socketIo from "socket.io-client";
import { socketTest } from "../../constants/routes";

/**
 * This is just a demonstration of how sockets works at
 * a very basic level. No need to understand this right
 * away. Tbh, I don't 100% fully get it.
 *
 * The fetch requests will be replaced with axios as per
 * discussed. They are just here for me to test the endpoints
 * because if the end point wasn't returning anything then
 * there was most likely an error unrelated to the websocket.
 *
 * Sockets really are only going to be used for a few things.
 * 1. Conversations/Messages.
 * 2. Updates:
 *  - New Message/Order update
 *  - New employee request
 *
 * Again, like I was saying before, I honestly am not 100% sure
 * how this is going to work out. This is just a demo, as far as
 * the frontend goes, I wouldn't even worry about the backend.
 */
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.socket = socketIo(socketTest);
  }

  componentDidMount() {
    /** Join the room */
    this.socket.emit("join");
    this.socket.on("client-incoming-message", messageData => {
      const { data } = this.state;
      const { message } = messageData;
      data.push(message);
      this.setState({ data });
    });

    this.socket.emit("client-send-message", {
      message: "Hey"
    });
  }

  componentWillUnmount() {
    this.socket.off("client-incoming-message");
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
