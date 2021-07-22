import React from 'react';
import shortid from 'shortid';

import MyForm from './form'

const defaultOptions = [
    {id: shortid.generate(), value: '', vote: 0},
    {id: shortid.generate(), value: '', vote: 0}
]

class PollForm extends React.Component {
     
    state = {
        title: '',
        description: '',
        options: defaultOptions,
        errors: {},
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleOptionChange = (event, index) => {
        const options = [...this.state.options];
        options[index].value = event.target.value;
        this.setState({ options})
    }

    createOption = () => {
        const {options} = this.state
        if(options.length < 5) {
            options.push({
                id: shortid.generate(),
                value: '',
                vote: 0
            });
            this.setState({ options })
        } else {
            alert('You can create max 5 options')
        }
    };

    deleteOption = index => {
        const {options} = this.state
        if(options.length > 2) {
            options.splice(index, 1)
            this.setState({ options})
        }else {
            alert('You must have at least two options')
        }
    }

    handleSubmit = event => {
        event.preventDefault()
        const {isValid, errors} = this.validate()

        if(isValid) {
            const {title, description, options} = this.state
            this.props.submit({
                title,
                description,
                options
            })
            event.target.reset()
            this.setState({
                title: '',
                description: '',
                options: defaultOptions,
                errors: {}
            })
        } else {
            this.setState({ errors })
        }
    }

    validate = () => {
        const errors = {}
        const {title, description, options} = this.state

        if(!title) {
            errors.title = 'Please Provide A Title'
        } else if(title.length < 20) {
            errors.title = 'Title Too Short'
        } else if (title.length > 100) {
            errors.title = 'Title Too Long'
        }

        if(!description) {
            errors.description = 'Please Provide A Description'
        } else if(description.length > 500) {
            errors.description = 'Description Too Long'
        } 

        const optionErrors = []
        options.forEach((opt, index) => {
            if(!opt.value) {
                optionErrors[index] = ('Option Text Empty')
            } else if(opt.value.length > 100) {
                optionErrors[index] = ('Option Text Too Long') 
            }
        })

        if(optionErrors.length > 0) {
            errors.options = optionErrors
        }

        return {
            errors,
            isValid: Object.keys(errors).length === 0
        }
    };

    render() {
        const {title, description, options, errors} = this.state
        return(
            <MyForm
                title={title}
                description={description}
                options={options}
                buttonValue={this.props.buttonValue || 'Create Poll'}
                errors={errors}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleOptionChange={this.handleOptionChange}
                createOption={this.createOption}
                deleteOption={this.deleteOption}
            />
        )
    }

}

export default PollForm;