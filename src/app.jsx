import React from 'react';
import shortid from 'shortid';
import { Container, Row, Col } from 'reactstrap';

import MainContent from './components/main-content';
import SideBar from './components/sidebar';
import Polls from './data/polls'

class App extends React.Component {

    state = {
        polls: [],
        selectedPolls: {},
        searchTerm: '',
    }

    componentDidMount() {
        this.setState({polls: Polls})
    }

    addnewPoll = poll => {
        poll.id = shortid.generate()
        poll.created = new Date()
        poll.totalVote = 0
        poll.opinios = []

        this.setState({
            polls: this.state.polls.concat(poll)
        })
    }

    updatedPoll = (updatePollid) => {
        const polls = [...this.state.polls]
        const poll = polls.find(p => p.id === updatePollid.id)
        
        poll.title = updatePollid.title
        poll.description = updatePollid.description
        poll.options = updatePollid.options

        this.setState({polls})
    }

    deletePoll = (pollId) => {
        const polls = this.state.polls.filter(p => p.id !== pollId)
        this.setState({polls})
    }

    selectedPoll = (pollId) => {
        const polls = this.state.polls.filter(p => p.id === pollId)
        this.setState({selectedPolls: polls})
    }

    handleSearch = (searchTerm) => {

    }

    getOpinion = (res) => {
        const {polls} = this.state
        const poll = polls.find(p => p.id === res.pollId)
        const option = poll.options.find(o => o.id === res.selectedOptions)

        poll.totalVote++
        option.vote++
        const opinion = {
            id: shortid.generate(),
            name: res.name,
            selectedOptions: res.selectedOptions,
        }

        poll.opinions.push(opinion)
        this.setState({polls})
    }

    render() {
        return (
            <Container className="my-5">
                <Row>
                    <Col md={4}>
                        <SideBar 
                            polls={this.state.polls}
                            searchTerm={this.state.searchTerm}
                            handleSearch={this.handleSearch}
                            selectedPoll={this.selectedPoll}
                            addnewPoll={this.addnewPoll}
                        />
                    </Col>
                    <Col md={8}>
                        <MainContent 
                            poll={this.state.selectedPolls}
                            getOpinion={this.getOpinion}
                            updatedPoll={this.updatedPoll}
                            deletePoll={this.deletePoll}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;