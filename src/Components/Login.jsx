import { Button, Paper } from '@material-ui/core';
import React from 'react';
import { createUser } from '../api/service';

const Login = ({setInit}) => {
    
    const handleClick = async () => {
        const userId = await createUser();
        sessionStorage.setItem("userId",userId);
        setInit(true)
    }
    return (
        <div>
            <Paper>
                <Button onClick={() => handleClick()}>Ingresar</Button>
            </Paper>
        </div>
    );
};

export default Login;