import React from 'react';
import shortid from 'shortid';
import { Container, Row, Col } from 'reactstrap';

import MainContent from './components/main-content';
import Sidebar from './components/sidebar';
import Polls from './data/polls'

class App extends React.Component {

	state = {
		polls: [],
		selectedPoll: {},
		searchTerm: "",
	}

	componentDidMount(){
		this.setState({polls: Polls})
	}

	addNewPoll = poll => {
		poll.id = shortid.generate()
		poll.created = new Date()
		poll.createVote = 0
		poll.opinions = []

		this.setState({
			polls: this.state.polls.concat(poll)
		})
	}

	updatedPoll = updatedPoll => {
		const polls = [...this.state.polls]
		const poll = polls.find(p=>p.id === updatedPoll.id)

		poll.title = updatedPoll.title
		poll.description = updatedPoll.description
		poll.opinions = updatedPoll.opinions

		this.setState({polls})
	}

	deletePoll = pollId => {
		const polls = this.state.polls.filter(p=>p.id !== pollId)
		this.setState({polls, selectedPoll: {}})
	}

	selectPoll = pollId => {
		const poll = this.state.polls.find(p => p.id === pollId)
		this.setState({selectedPoll: poll})
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

	handleSearch = searchTerm => {

	}

	render(){
		return (
			<Container className="my-5">
				<Row>
					<Col md={4}>
						<Sidebar 
							polls={this.state.polls}
							selectPoll={this.selectPoll}
							searchTerm={this.state.searchTerm}
							handleSearch={this.handleSearch}
							addNewPoll={this.addNewPoll}
						/>
					</Col>
					<Col md={8}>
						<MainContent 
							poll={this.state.selectedPoll}
							getOpinion={this.getOpinion}
							updatedPoll={this.updatedPoll}
							deletePoll={this.deletePoll}
						/>
					</Col>
				</Row>
			</Container>
		)
	}
}

export default App;