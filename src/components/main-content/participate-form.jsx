import React from 'react';
import { Input, Form, FormGroup, FormFeedback, CustomInput, Label, Button } from 'reactstrap';

class ParticipateFrom extends React.Component {

    state = {
        name: '',
        selectedOptions: '',
        errors: {},
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { errors, isValid } = this.validate()

        if (isValid) {
            this.props.getOpinion({
                pollId: this.props.poll.id,
                name: this.state.name,
                selectedOptions: this.state.selectedOptions,
            })
            event.target.reset()
            this.setState({
                name: '',
                selectedOptions: '',
                errors: {}
            })
        } else {
            this.setState({ errors })
        }
    }

    validate = () => {
        const errors = {};

        if (!this.state.name) {
            errors.name = 'Please Provide A Name'
        } else if (this.state.name.length > 20) {
            errors.name = 'Name Too Long'
        }

        if (!this.state.selectedOptions) {
            errors.selectedOptions = 'Please Select One Option'
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <div className="d-flex">
                    <h4>Options</h4>
                    <Button
                        color="warning"
                        type="button"
                        className="ms-auto"
                        onClick={this.props.toggleModal}
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        className="ms-2"
                        onClick={this.props.deletePoll(this.props.poll.id)}
                    >
                        Delete
                    </Button>
                </div>
                {
                    this.props.poll.options && this.props.poll.options.map(opt => {
                        return (
                            <FormGroup className="my-2" key={opt.id}>
                                <Label className="d-flex">
                                    <CustomInput
                                        type='radio'
                                        id={opt.id}
                                        name='selectedOptions'
                                        value={opt.id}
                                        onChange={this.handleChange}
                                        invalid={
                                            this.state.errors.selectedOptions ? true : false
                                        }
                                    />
                                    {opt.value}
                                    <span
                                        style={{
                                            padding: '5px 20px',
                                            background: 'green',
                                            color: 'white',
                                            borderRadius: '5px'
                                        }}

                                        className="ms-auto"
                                    >
                                        {opt.vote}
                                    </span>
                                    <span
                                        style={{
                                            padding: '5px 20px',
                                            background: 'orange',
                                            color: 'white',
                                            borderRadius: '5px'
                                        }}

                                        className="ms-2"
                                    >
                                        {this.props.poll.totalVote > 0 ? (
                                            (100 * opt.vote) / this.props.poll.totalVote
                                        ).toFixed(2)
                                            : 0
                                        }
                                        %
                                    </span>
                                </Label>
                            </FormGroup>
                        )
                    })
                }

                <FormGroup className="my-3">
                    <Label>Enter Your Name</Label>
                    <Input
                        name="name"
                        placeholder="Enter your name"
                        value={this.state.value}
                        onChange={this.handleChange}
                        invalid={this.state.errors.name ? true : false}
                    />
                    {this.state.errors.name && <FormFeedback>{this.state.errors.name}</FormFeedback>}
                </FormGroup>
                <Button type="submit">Submit Your Opinion</Button>
            </Form>
        )
    }
}

export default ParticipateFrom;