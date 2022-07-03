import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./../logo.svg";

const useStyles = makeStyles({
    header: {
      textAlign: "left",
    },
    emptyTasks:{
      height: "2rem"
    }
  });

const Header = ({isEmptyList}) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.header}>
        <img src={logo} alt="" />
        {isEmptyList ? 
          <>
            <h2>To do list</h2>
            <p>¿Qué cosas tenés que terminar hoy?</p>
          </>
          :
          <div className={classes.emptyTasks}>
          </div>
        }
      </div>
    </div>
  );
};

export default Header;
