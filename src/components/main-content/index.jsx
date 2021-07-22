import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import ParticipateFrom from './participate-form';
import PollForm from '../poll-form';

class MainContent extends React.Component {

    state = {
        openModal: false,
    }

    toggleModal = () => {
        this.setState({ openModal: !this.state.openModal });
    }

    render() {
        if(Object.keys(this.props.poll).length === 0) {
            return (
                <div>
                    <h3>Wellcome To My Applications</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam officia doloribus culpa nisi hic maxime odit rerum enim vel ipsum? Laborum commodi ducimus, quibusdam at enim deleniti maiores cupiditate? Reprehenderit.
                    </p>
                </div>
            );
        }

        const {poll, getOpinion, updatePoll, deletePoll} = this.props
        return (
            <div>
                <h3>{poll.title}</h3>
                <p>{poll.description}</p>
                <br />
                <ParticipateFrom
                    poll={poll}
                    getOpinion={getOpinion}
                    toggleModal={this.toggleModal}
                    deletePoll={deletePoll}
                />
                <Modal
                    isOpen={this.state.openModal}
                    toggle={this.toggleModal}
                    unmountOnClose={true}
                >
                    <ModalHeader toggle={this.toggleModal}>
                        Update Modal
                    </ModalHeader>

                    <ModalBody>
                        <PollForm
                            poll={poll}
                            isUpdate={true}
                            submit={updatePoll}
                            buttonValue='Update Poll'
                        />
                    </ModalBody>

                </Modal>
            </div>
        );
    }
}

export default MainContent;