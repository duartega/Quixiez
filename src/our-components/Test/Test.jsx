import React from "react";
import socketIo from "socket.io-client";
import { socketTest } from "../../constants/routes";

/**
 * This works.
 *
 * What you need to do is open to screens
 * and connect to localhost:<your_port>/test
 *
 * Once you open up both screens start to refresh on of them
 * and you will see the message of 'Hey'
 *
 * This works because every time you refresh the
 * screen the component sends the message.
 *
 * There isn't anything in this component to actually send a message.
 *
 * If you try to just save a bunch of times thinking the page will
 * refresh it wont because there haven't been any updates to the
 * file.
 */

/** TEST */
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
