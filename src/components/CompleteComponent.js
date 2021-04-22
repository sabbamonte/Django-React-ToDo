import React, { Component } from "react";
import axios from "axios";
import {Form, FormGroup, Label, Input, Col} from 'reactstrap';

class Complete extends Component {
    constructor(props){
        super(props);

        this.state = {
            completed: this.props.task.completed
        }

        this.handleSubmit =  this.handleSubmit.bind(this);
    }

    handleSubmit() {

        this.setState({
            completed: !this.state.completed
        });

        axios.put(`/api/tasks/${this.props.task.id}/`, {
            
            task: this.props.task.task,
            body: this.props.task.body,
            completed: !this.state.completed
        
        })

            .then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);

        })

        window.location.reload(false);

    }

    render() {
        return(
            <div className="row" style={{margin:  '10px', marginLeft: '1px'}}>

           
            <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                <Col>
                    <FormGroup check>
                    <Label check>
                        <Input type="checkbox"
                            name="completed"
                            onChange={this.handleSubmit}/>
                            <p>Completed</p>
                    </Label>
                    </FormGroup>
                </Col>
                </FormGroup>
               
            </Form>
            </div>
        )
    }
}

export default Complete