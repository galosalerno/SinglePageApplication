import { Button, makeStyles, Paper } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    container : {
        height : '8rem',
        margin: '8rem auto',
        padding: '1rem',
        width: '20rem'
    },
    paper: {
        padding: '1rem',
        borderRadius: '20px'
    },
    newListButton: {
        borderRadius: '50px',
        width: '315px',
        height: '48px',
        backgroundColor: '#000',
        color: '#FFFFFF',
        marginLeft: '0.5rem'
    },
    cancelButton: {
        borderRadius: '50px',
        width: '315px',
        height: '48px',
        backgroundColor: '#FAFAFA',
        color: '#000'
    },
    actionDialog: {
        display: 'flex',
        padding: '0.5rem',
    }
})
const ResetDialog = ({resetTasks,closeDialog}) => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Paper className={classes.paper}>
                <h3>Empezar una nueva lista</h3>
                <p>
                    Cuando comenzás una nueva lista, tu lista existente se elimina.
                    ¿Estás seguro que querés empezar una nueva lista?
                </p>
                <div className={classes.actionDialog}>
                    <Button
                     variant="contained" 
                     className={classes.cancelButton}
                     onClick={closeDialog}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="contained" 
                        className={classes.newListButton} 
                        onClick={resetTasks}
                    >
                        Nueva Lista
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default ResetDialog;