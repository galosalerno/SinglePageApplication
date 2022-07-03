import React, { useState } from "react";
import {
  FormControlLabel,
  InputBase,
  List,
  ListItem,
  ListItemText,
  Radio,
  Paper,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Filter from "./Filter";
import { deleteTodo, editTodo } from "../api/service";


const useStyles = makeStyles({
  input: {
    fontSize: "24px",
    fontFamily: "Helvetica",
    fontStyle: "normal",
    fontWeight: '700',
    lineHeight: '28px'
  },
  paper: {
    borderRadius: "20px",
    marginTop: "1rem",
    width: "95%"
  },
  title: {
    marginLeft: "0.5rem",
    fontWeight: "bold",
  },
  flexContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0.5rem",
  },
  icon: {
    marginTop: "1rem",
    marginLeft: "0.5rem",
  },
  delete: {
    textDecoration: "underline",
    fontSize: "12px",
  },
});

const TaskList = ({
  tasks,
  setTasks,
  setNewTask,
  newTask,
  isEmptyList,
  userId,
  handleAddTask,
  handleOpen
}) => {
  const classes = useStyles();
  const [filterOption, setFilterOption] = useState("Todos");
  
  const handleChange = (e) => {
    const value = e.target.value;
      setNewTask(value);
  };
  const onKeyPressHandle = (e) =>{
    if (e.charCode === 13) 
      handleAddTask();
  }

  const removeTask = async (task,idx) => {
    const copyTasks = [...tasks];
    copyTasks.splice(idx, 1);
    await deleteTodo(userId,task.id);
    setTasks(copyTasks);
  };

  const handleToggle = async (value, idx) => {
    const copyTasks = [...tasks];
    const todoNewStatus = !copyTasks[idx].completed;
    const todoId = copyTasks[idx].id;
    copyTasks[idx].completed = todoNewStatus;
    await editTodo(userId, todoId, todoNewStatus);
    setTasks(copyTasks);
  };

  const filterTasks = () => {
    if (filterOption === "realizadas") {
      return tasks.filter((task) => task.completed);
    } else if (filterOption === "no realizadas") {
      return tasks.filter((task) => !task.completed);
    } else {
      return tasks;
    }
  };

  return (
    <div>
      <InputBase
        placeholder="Escribí un item"
        className={classes.input}
        onChange={(e) => handleChange(e)}
        onKeyPress={(e) => onKeyPressHandle(e)}
        value={newTask}
      />
      {!isEmptyList && (
        <Paper className={classes.paper}>
          <div className={classes.flexContainer}>
            <Button className={classes.title} endIcon={<AddCircleIcon onClick={() => handleOpen()}/>}>
              To do list
            </Button>
            <Filter
              filterOption={filterOption}
              setFilterOption={setFilterOption}
            />
          </div>
          <List className={classes.root}>
            {filterTasks().map((task, idx) => {
              const labelId = `checkbox-list-label-${idx}`;
              return (
                <ListItem
                  key={task.message}
                  dense
                  button
                  // onClick={() => handleToggle(task,idx)} //not support double onClick
                >
                  <FormControlLabel
                    control={<Radio color="primary" />}
                    checked={task.completed}
                    onClick={() => handleToggle(task, idx)}
                  />
                  <ListItemText id={labelId} primary={task.message}/>
                  <FormControlLabel
                    control={<span className={classes.delete}>Delete</span>}
                    checked={task.completed}
                    onClick={() => removeTask(task, idx)}
                  />
                </ListItem>
              );
            })}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default TaskList;
