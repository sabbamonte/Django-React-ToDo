import React, { Component } from "react";
import axios from "axios";
import {Button, Form, FormGroup, Label, Input, Col, FormFeedback} from 'reactstrap';

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            timestamp: new Date(),
            completed: false,
            touched: {
                title: false,
            }
 
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
   
        this.setState({
          [name]: value
        });
  
    }

    handleSubmit() {
       
        axios.post('/api/tasks/', {
            task: this.state.title,
            body: this.state.body,
            timestamp: this.state.timestamp,
            completed: this.state.completed

        })
        .then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
       
        })
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true } //Spread Operator
        });
    } 

    validate(title) { // Inputs as parameters
        const errors = { // Create object called errors, recreate a this.state
            title: ''
        };
     // Error check all of them
        if (this.state.touched.title && title.length < 3)
            errors.title = 'Title should be >= 3 characters';
  
        return errors; // Return the errors
    }
 
    render() {
        const errors = this.validate(this.state.title);
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label htmlFor="title" md={3}>Title</Label>
                    <Col md={10}>
                        <Input type="text" id="title" name="title"
                        value={this.state.title}
                        onBlur={this.handleBlur('title')}
                        onChange={this.handleInputChange}
                        invalid={errors.title !== ''}/> 
                        <FormFeedback>{errors.title}</FormFeedback>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label htmlFor="body" md={3}>Description</Label>
                    <Col md={10}>
                        <Input type="textarea" id="body" name="body"
                        value={this.state.body}
                        onChange={this.handleInputChange} /> 
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={{size: 10}}>
                        <Button type="submit" color="dark">
                            Add Task
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }   
}

export default AddTask;