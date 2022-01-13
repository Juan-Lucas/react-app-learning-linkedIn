import React from "react";
import NavBar from "./NavBar";
import ToDoList from "./taks/ToDoList";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddTask from "./taks/AddTask";
import initialData from "../initialData";
import uniqueId from "uniqueid";
import Fetching from "./data/Fetching";

class App extends React.Component {

  state = {
    tasks: [],
    fetching: true,
  };

  componentDidMount = () => {
    let delay = Math.floor(Math.random() * 5000);

    setTimeout(() => {
      this.setState({
        fetching: false,
        tasks: initialData,
      })
    },delay);
  }

  onToggleCompleted = (taskId) => {
    let taskToUpdate = this.state.tasks.find((task) => taskId === task.id);

    taskToUpdate.completed = !taskToUpdate.completed;

    this.setState((prevState) =>
      prevState.tasks.map((task) => {
        return task.id === taskId ? taskToUpdate : task;
      })
    );
  };


  onAddTask = (newTaskName) => {
    let newTask = {
      id: uniqueId(),
      name: newTaskName,
      completed: false,
    }

    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask]
    }))
  }

  onDeleteCompleted = () => {

    this.setState(prevState => {
      let newTasks = prevState.tasks.filter(task => !task.completed)

      return {
        tasks: newTasks,
      }
    })
  }

  render() {
    return (
      <section id="todo">
      {this.state.fetching? <Fetching /> : null}
        <BrowserRouter>
          <Switch>
            <Route path="/add-task" render={(props) => (<AddTask {...props} onAddTask={this.onAddTask} />)} />
            <Route
              path="/:filter?"
              render={(props) => (
                <ToDoList {...props} tasks={this.state.tasks} onToggleCompleted={this.onToggleCompleted} />
              )}
            />
          </Switch>
          <NavBar onDeleteCompleted={this.onDeleteCompleted} />
        </BrowserRouter>
      </section>
    );
  }
}

export default App;
