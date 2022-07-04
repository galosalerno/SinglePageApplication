import { Button, Divider, makeStyles, Paper } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';
import React from 'react';
import { createUser } from '../api/service';
const useStyles = makeStyles({
    container: {
        margin: '15rem auto',
        justifyContent: 'center',
        textAlign: 'center',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        width: '20rem',
    },
    button: {
        width: '100%',
    }
  });
const Login = ({setInit}) => {
    const classes = useStyles();

    const handleClick = async () => {
        const userId = await createUser();
        sessionStorage.setItem("userId",userId);
        setInit(true)
    }
    return (
        <div>
            <Paper className={classes.container}>
                <h2>Bienvenido/a!</h2>
                <Divider/>
                <p><strong>La app que te ayuda a ordenar tus tareas diarias</strong></p>
                <Button 
                    onClick={() => handleClick()} 
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    endIcon={<ExitToApp/>}
                >
                    Ingresar
                </Button>
            </Paper>
        </div>
    );
};

export default Login;