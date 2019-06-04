import React from 'react';
import ConversationCell from "./ConversationCell";
import testData from './testData';

class ConversationList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            time: "",
            message: "",
            firstInitial: ""
        }
    };

    render() {

        return (
            <>
                {testData.map((data, idx)=>
                    <ConversationCell key={idx} props={data}/>
                )}
                
            </>
        );
    };
}

export default ConversationList;