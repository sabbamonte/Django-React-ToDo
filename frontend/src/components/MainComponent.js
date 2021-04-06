import React, { Component } from "react";
import axios from "axios";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import AddTask from "./AddTaskComponent";


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Tasks: [],
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    createTaskList = () => {
        axios
            .get("/api/tasks/")
            .then((res) => {

                this.setState({
                    Tasks: res.data
                })
            })

            .catch((error) => {
                console.log(error)
            })
    };

    componentDidMount(){
        this.createTaskList()
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
        <div className="container">
            <h1 className="text-white text-uppercase text-center my-4">TASKS</h1>
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        <div className="mb-4">
                            <button onClick={this.toggleModal} className="btn btn-dark">
                                Add task
                            </button>
                        </div>
                        <ul className="list-group list-group-flush border-top-0">
                            {this.state.Tasks.map((task) => 
                            <div key={task.id} className="list-group-item">
                                <h6>{task.task}</h6>
                                <p>{task.body}</p>
                                <p input type={Date}>{task.timestamp.substring(0,10)}</p>
                                <p>{task.completed}</p>
                            </div>)}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add New Task</ModalHeader>
                <ModalBody>
                       <AddTask/>
                </ModalBody>
            </Modal>
        </div>
      
        )
    }
}

export default Main;

