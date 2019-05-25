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

  async componentDidMount() {
    /**
     * fetch request to api
     *
     * Only thing this is fetch request
     * is good for right now is making an
     * api call.
     */
    // const request = await fetch(socketTest);
    /**
     * Convert the fetch request to json
     * the .json() returns a promise so we
     * will await.
     */
    // const requestJson = await request.json();
    /**
     * Printing out the json response.
     */
    // console.log(requestJson);

    /**
     * The code above is equivalent to below.
     */
    // fetch(socketTest).then(response =>
    //   response.json().then(responseJson => console.log(responseJson))
    // );

    /**
     * Begin socket connection.
     *
     * @var socketTest
     * socketTest = api.stage.quixiez.com/test
     * The /test is the socket namespace.
     *
     * A namespace is kind of like a room. Except
     * in a namespace you can have rooms. But imagine
     * you have /conversations namespace. This is where
     * all of the conversations will be kept and you
     * are going to have multiple clients in this namespace,
     * but you aren't going to want someone from company-1 to
     * be reading company-2's messages. So one way to fix this
     * is through rooms. Also another way is dynamic namespaces.
     *
     * Dynamic namespaces:
     *
     * Dynamically creates a namespace, so you could have
     * namespaces created like /conversations-<company_id>
     * so all the conversations that are emitted into this
     * namespace are seen by everyone in this namespace.
     *
     */

    /**
     * Connecting to the server
     * @var io is a socket
     */
    const io = socketIo.connect(socketTest);
    /**
     * on an event called "test" the dataFromSocket is being
     * taken.
     */
    io.on("test", socketData => {
      /**
       * Getting the data from the socket
       */
      const { data: dataFromSocket } = socketData;
      console.log(dataFromSocket);
      /**
       * Getting the data from the state
       */
      const { data: stateData } = this.state;
      /**
       * Pushing the new data onto the state's data
       */
      stateData.push(dataFromSocket);
      console.log(stateData);
      /**
       * Setting the state
       */
      this.setState({ data: stateData });
    });
    /**
     * This is the client emitting an 'event'. That 'event' is 'test-message'.
     * On the server-side, we are listening for a 'test-message' event.
     *
     * Every one second we are sending the server a test message.
     */
    let i = 0;
    // setInterval(() => {
    /**
     * If you look at the data closely (in io.emit) you will see #${++i},
     * Discard the '#' for a second and we just have ${++i}.
     * All the ${some_var} is string interpolation. So
     *
     * let joesFavoriteDrink = "coffee";
     * let sentence = `Joe's favorite drink is ${joesFavoriteDrink}`;
     * sentence is the same thing as
     * This gets messy though quickly once you start having + + + + everywhere.
     * let anotherSentence = "Joe's favorite drink is" + joesFavoriteDrink.
     *
     * So all the data is saying is This is test message #1, #2, #3, ... #i.
     */
    // io.emit("test-message", {
    // data: `FROM JOE: This is test message #${++i}`
    // });
    // }, 1000);
    io.emit("join", { room: "haku", message: "This is joe" });
    // io.emit("test-message", {
    //   data: `FROM JOE: This is test message #${++i}`
    // });
  }

  render() {
    const listOfData = this.state.data.map(data => <p>{data}</p>);
    return (
      <div>
        <h1>Test</h1>
        {listOfData}
      </div>
    );
  }
}

export default Test;
