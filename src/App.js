import Header from './Components/Header';
import TaskList from './Components/TaskList';
import './App.css';
import AddButton from './Components/AddButton';
import { useEffect, useState } from 'react';
import Login from './Components/Login';
import { createTodo, getTodosForUser } from './api/service';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));
  const [init, setInit] = useState(sessionStorage.getItem("init"));
  
  const isEmptyList = tasks.length === 0;
  
  const getTasks = async () => {
    const res = await getTodosForUser(userId);
    return res;
  }
  useEffect(() => {
      async function getData (){
        const userIdStorage = sessionStorage.getItem("userId");
        setUserId(userIdStorage);
        console.log("UserId",userId);
        const isFirstSession = !sessionStorage.getItem("init");
        const tareas = await getTasks();
        setTasks(tareas);
        console.log("Tareas",tareas);
        if(isFirstSession){
          sessionStorage.setItem("init", true);
        }
      }
      getData();
  },[])


  const handleAddTask = async (e) => {
    const copyTasks = [...tasks];
    const response = await createTodo(userId,newTask);
    console.log("Response",response);
    copyTasks.push(response);
    setTasks(copyTasks);
    setNewTask("");
  };
  return (
   <>
      {init ? (
        <div className="container">
          <Header isEmptyList={isEmptyList} />
          <TaskList
            tasks={tasks}
            setTasks={setTasks}
            setNewTask={setNewTask}
            newTask={newTask}
            isEmptyList={isEmptyList}
            userId={userId}
            handleAddTask={handleAddTask}
          />
          <div className="footer">
            <AddButton handleAddTask={handleAddTask} newTask={newTask} />
          </div>
        </div>
      ) : (
        <Login setInit={setInit}/>
      )}

    </>
  );
}

export default App;
