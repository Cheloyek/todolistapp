import React from 'react';
import './App.css';
import {AppBar, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {TaskType} from "../api/todolists-api";
import ErrorSnackbar from "../snackbars/errorSnackbar";
import {RequestStatusType} from "./app-reducer";
import {TodolistsList} from "../features/TodolistList/TodolistsList";

function AppWithRedux({demo = false}: DemoPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: '#5a8b96'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                </Toolbar>
                {status === 'loading' && <LinearProgress style={{backgroundColor: "#e17a02", position: "absolute", marginTop: "44px", width: "100%"}}/>}
                <ErrorSnackbar/>
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default AppWithRedux;

// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

export type DemoPropsType = {
    demo?: boolean
}


