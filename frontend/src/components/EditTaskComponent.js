import React, { Component } from "react";
import axios from "axios";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, Col} from 'reactstrap';

class EditTask extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: this.props.editTask.task,
            body: this.props.editTask.body,
            completed: this.props.editTask.completed,
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
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

        axios.put(`/api/tasks/${this.props.editTask.id}/`, {
            
            task: this.state.title,
            body: this.state.body,
            completed: this.state.completed

        })

        .then((response) => {
            console.log(response);
            }, (error) => {
            console.log(error);
        
        })
        
    }

    render() {
        return(
            <div>
                <button className="btn btn-dark btn-sm" onClick={this.toggleModal} style={{margin:  '1px'}}>
                    Edit Task
                </button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} closeTimeoutMS={500}>
                    <ModalHeader toggle={this.toggleModal}>Edit Task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="title" md={3}>Title</Label>
                                <Col md={10}>
                                    <Input type="text" id="title" name="title"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}/> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="body" md={3}>Description</Label>
                                <Col md={10}>
                                    <Input type="text" id="body" name="body"
                                    value={this.state.body}
                                    onChange={this.handleInputChange}/> 
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={1}>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox"
                                            name="completed"
                                            checked={this.state.completed}
                                            onChange={this.handleInputChange} /> 
                                            <p>Completed</p>
                                    </Label>
                                </FormGroup>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="dark">
                                        Submit Changes
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default EditTask;