import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import ErrorSnackbar from "../snackbars/errorSnackbar";
import {initializeAppThunkCreator, RequestStatusType} from "./app-reducer";
import {TodolistsList} from "../features/TodolistList/TodolistsList";
import {Login} from "../features/Login/Login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {logoutThunkCreator} from "../features/Login/auth-reducer";

function AppWithRedux({demo = false}: DemoPropsType) {
    const dispatch = useAppDispatch()

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppThunkCreator())
    }, [])

    const logoutHandler = useCallback (() => {
        dispatch(logoutThunkCreator())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', marginTop: '10%', marginLeft: '50%', textAlign: 'center'}}>
            <div>Loading</div>
            <CircularProgress />
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <Toolbar variant="dense" style={{backgroundColor: '#5a8b96'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" component="div">
                            News
                        </Typography>
                        {isLoggedIn ? <Button style={{color: 'red', justifyContent: 'flex-end'}} onClick={logoutHandler}>Logout</Button> : null}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress
                        style={{backgroundColor: "#e17a02", position: "absolute", marginTop: "44px", width: "100%"}}/>}
                    <ErrorSnackbar/>
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path='/' element={<TodolistsList demo={demo}/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to='/404'/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;

//types
export type DemoPropsType = {
    demo?: boolean
}


