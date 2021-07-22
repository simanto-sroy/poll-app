import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const PollLists = props => {
    if(props.polls.length === 0) {
        return "There is no poll"
    }

    return (
        <ListGroup>
            {props.polls.map(poll => (
                <ListGroupItem
                    key={poll.id}
                    onClick={()=>props.selectedPoll(poll.id)}
                    style={{cursor: 'pointer'}}
                >
                    {poll.title.length > 30 ? poll.title.substr(0, 30) + '...' : poll.title}
                </ListGroupItem>    
            ))}
        </ListGroup>
    );
}

export default PollLists;