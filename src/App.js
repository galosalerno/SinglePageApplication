import { useEffect, useState } from 'react';
import Header from './Components/Header';
import TaskList from './Components/TaskList';
import AddButton from './Components/AddButton';
import Login from './Components/Login';
import ResetDialog from './Components/ResetDialog';
import { Modal } from '@material-ui/core';
import { createTodo, getTodosForUser, resetTodoList } from './api/service';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [init, setInit] = useState(sessionStorage.getItem("init"));
  const [open, setOpen] = useState(false);
  const isEmptyList = tasks.length === 0;
  
  const getTasks = async () => {
    const res = await getTodosForUser(userId);
    return res;
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
      async function getData (){
        const userIdStorage = sessionStorage.getItem("userId");
        setUserId(userIdStorage);
        const isFirstSession = !sessionStorage.getItem("init");
        const tareas = await getTasks(); //Get tasks from backend
        setTasks(tareas);
        if(isFirstSession){
          sessionStorage.setItem("init", true);
        }
      }
      getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]) //Only the first render

  const resetTasks = async () => {
    setTasks([]);
    await resetTodoList(userId);
    handleClose();
  }
  const handleAddTask = async (e) => {
    const copyTasks = [...tasks];
    const response = await createTodo(userId,newTask);
    copyTasks.push(response);
    setTasks(copyTasks);
    setNewTask("");
  };
  //Render
  return (
   <>
      {init ? (
        <div className="container">
          <Header isEmptyList={isEmptyList} />
          <Modal open={open} onClose={handleClose}>
            <ResetDialog closeDialog={handleClose} resetTasks={resetTasks} />
          </Modal>
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            setNewTask={setNewTask}
            newTask={newTask}
            isEmptyList={isEmptyList}
            userId={userId}
            handleAddTask={handleAddTask}
            handleOpen={handleOpen}
          />
          <div className="footer">
            <AddButton handleAddTask={handleAddTask} newTask={newTask} />
          </div>
        </div>
      ) : (
        <Login setInit={setInit}/> //Only de first render.
      )}

    </>
  );
}

export default App;
