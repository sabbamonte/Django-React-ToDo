import React, { Component }  from "react";
import axios from "axios";
import {Form, Button} from 'reactstrap';

class DeleteTask extends Component {
    constructor(props){
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        
        axios.delete(`/api/tasks/${this.props.toDelete}`)
    
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
    
        })
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Button className="form-group btn btn-dark">
                    Delete Task
                </Button>
            </Form>    
        )
    }

}

export default DeleteTask;