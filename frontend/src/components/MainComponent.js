import React, { Component } from "react";
import axios from "axios";
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import AddTask from "./AddTaskComponent";
import DeleteTask from "./DeleteTaskComponent";
import EditTask from "./EditTaskComponent";


class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Tasks: [],
            isModalOpen: false,
            isToggle: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
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

    handleClick() {
        this.setState({
            isToggle: !this.state.isToggle,
        })
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
                            <button onClick={this.handleClick} className="btn btn-dark">
                                {this.state.isToggle === false ? "Completed" : "Open Tasks"}
                            </button> 
                        </div>
                        <ul className="list-group list-group-flush border-top-0">
                            {this.state.Tasks.map((task) => 
                                this.state.isToggle === true && task.completed === true ?  
                                    <div key={task.id} className="list-group-item">
                                        <h6>{task.task}</h6>
                                        <p>{task.body}</p>
                                        <p input type={Date}>{task.timestamp.substring(0,10)}</p>
                                        <p>{task.completed}</p>
                                        {task.id ? <div>
                                            <DeleteTask toDelete={task.id}/> 
                                        </div>: null}
                                    </div> 
                                : this.state.isToggle === false && task.completed === false ? 
                                    <div key={task.id} className="list-group-item">
                                        <h6>{task.task}</h6>
                                        <p>{task.body}</p>
                                        <p input type={Date}>{task.timestamp.substring(0,10)}</p>
                                        <p>{task.completed}</p>
                                        {task.id ? <div>
                                            <DeleteTask toDelete={task.id}/> 
                                            <EditTask editTask={task}/>
                                        </div>: null}
                                    </div> 
                                : null
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} closeTimeoutMS={500}>
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

