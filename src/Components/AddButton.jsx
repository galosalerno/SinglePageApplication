import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    button: {
      borderRadius: '50px',
      width: '315px',
      height: '48px',
      backgroundColor: '#000',
      color: '#FFFFFF'
    },
  });

const AddButton = ({handleAddTask,newTask}) => {
  const classes = useStyles();
  const canAddTask = newTask === "";
    return (
      <Button 
        variant="contained" 
        className={classes.button} 
        onClick={handleAddTask}
        disabled={canAddTask}
      >
        Agregar
      </Button>
  );
};

export default AddButton;
