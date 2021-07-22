import React from 'react';
import { Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

import PollLists from './poll-list';
import PollForm from '../poll-form'

class SideBar extends React.Component {

    state = {
        OpenModal: false,
    }

    toggleModal = () => {
        this.setState({
            OpenModal: !this.state.OpenModal
        })
    }



    render() {
        return (
            <div style={{ background: '#efefef', padding: '10px' }}>
                <div className="d-flex mb-5">
                    <Input
                        type="search"
                        placeholder="Search Your Poll"
                        value={this.props.searchTerm}
                        onChange={e => this.state.handleSearch(e.target.value)}
                    />
                    <Button
                        color="success"
                        className="ms-2"
                        onClick={this.toggleModal}
                    >
                        New
                    </Button>
                </div>
                <div>
                    <h3>List of Polls</h3>
                    <hr />
                    <PollLists
                        polls = {this.props.polls}
                        selectedPoll = {this.props.selectedPoll}
                    />
                    <Modal isOpen={this.state.OpenModal} toggle={this.toggleModal} unmountOnClose={true}>
                        <ModalHeader toggle={this.toggleModal}>
                            Create A New Poll
                        </ModalHeader>
                        <ModalBody>
                            <PollForm submit={this.props.addnewPoll}/>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default SideBar;