import React, { Component } from "react";
import axios from "axios";
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';

class AddTask extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            timestamp: new Date(),
            completed: false
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

    handleSubmit(event) {
        alert("Current State is: " + JSON.stringify(this.state));
        event.preventDefault(); // This means it won’t reload page
    }
    
    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label htmlFor="title" md={3}>Title</Label>
                    <Col md={10}>
                        <Input type="text" id="title" name="title"
                        value={this.state.title}
                        onChange={this.handleInputChange} /> 
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