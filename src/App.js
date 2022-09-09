import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  //Defining States
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [add, setAdd] = useState(false);
  const [taskDone, setTaskDone] = useState([]);

  //function for adding a new task
  const addTask = () => {
    setAdd(prev => !prev);
    let taskArr = []
    if (taskList.length === 0) {
      taskArr[0] = newTask;
    }
    else {
      taskArr = [...taskList];
      taskArr.unshift(newTask);
    }
    setTaskList([...taskArr]);
    localStorage.setItem("task", JSON.stringify(taskArr));
    setNewTask("")
  }

  //function for deleting a non completed task
  const delTask = (index) => {
    let deletedArr = taskList.filter((val, id) => { return index !== id })
    setTaskList([...deletedArr])
    localStorage.setItem("task", JSON.stringify(deletedArr));
  }

  //function for completed task
  const taskComplete = (index) => {
    let completedTask = taskList[index];
    delTask(index);
    let arr = [];
    if (taskDone.length === 0) {
      arr[0] = completedTask;
    }
    else {
      arr = [...taskDone];
      arr.push(completedTask);
    }
    setTaskDone([...arr]);
    localStorage.setItem("completed-task", JSON.stringify(arr));
  }

  //function for deleting completed task  
  const delCompletedTask = (index) => {
    let completedArr = taskDone.filter((val, id) => { return id !== index })
    setTaskDone([...completedArr]);
    localStorage.setItem("completed-task", JSON.stringify(completedArr));
  }

  //function for resetting the app
  const resetApp = () => {
    setAdd(prev => !prev);
    localStorage.clear();
  }

  //
  useEffect(() => {
    if (localStorage.getItem("task")) {
      let arr = JSON.parse(localStorage.getItem("task"));
      setTaskList([...arr]);
    }
    else {
      setTaskList([])
    }
    if (localStorage.getItem("completed-task")) {
      let arr = JSON.parse(localStorage.getItem("completed-task"));
      setTaskDone([...arr]);
    }
    else {
      setTaskDone([])
    }
  }, [add]);

  return (
    <div className="App">
      <div className='main'>
        <h1>TO-DO List <button className='reset' onClick={resetApp}>Reset</button></h1>
        <input value={newTask} type="text" placeholder="New Task Here!" onChange={(e) => setNewTask(e.target.value)} />
        <button className='addbtn' onClick={addTask}>Add Task</button>
        <ul>
          {
            taskList.map((val, index) => (
              <>
                <li className='list'>
                  <span className='task' key={index}>{val}</span> &nbsp;
                  <button className='completebtn' onClick={() => taskComplete(index)}>Complete</button>
                  <button className='deletebtn' onClick={() => delTask(index)}>Delete</button>
                </li>
              </>
            ))
          }
        </ul>
        <ul>
          {
            taskDone.map((val, index) => (
              <>
                <li className='list complete'>
                  <span key={index}>{val}</span> &nbsp;
                  <button className='delbtn' onClick={() => delCompletedTask(index)}>Delete</button>
                </li>
              </>
            ))
          }
        </ul>

      </div>
    </div>
  );
}

export default App;
