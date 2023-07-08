import React, {useCallback, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {useSelector} from "react-redux";
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
import {useAppDispatch} from "./store";
import ErrorSnackbar from "snackbars";
import {initializeAppTC} from "./app-reducer";
import {TodolistsList} from "features/TodolistList";
import {logoutTC, authSelectors, Login} from "features/Auth";
import {selectIsInitialized, selectStatus} from "./selectors";

function App(props: DemoPropsType) {
    const dispatch = useAppDispatch()

    // const status = useSelector<AppRootStateType, RequestStatusType>(selectStatus)
    // const isInitialized = useSelector<AppRootStateType, boolean>(selectIsInitialized)
    // const isLoggedIn = useSelector<AppRootStateType, boolean>(selectIsLoggedIn)

    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    useEffect(() => {
        if (!isInitialized) {
            dispatch(initializeAppTC())
        }
    }, [])

    const logoutHandler = useCallback (() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', marginTop: '10%', marginLeft: '50%', textAlign: 'center'}}>
            <div>Loading</div>
            <CircularProgress />
        </div>
    }
    return (
            <div className="App">
                <AppBar position="static">
                    <Toolbar variant="dense" style={{backgroundColor: '#5a8b96', position: "fixed", top: 0, zIndex: "2", width: "100%"}}>
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
                <Container fixed style={{marginLeft: "10px"}}>
                    <Routes>
                        {/*<Route path='/' element={<TodolistsList demo={false}/>}/>*/}
                        <Route path='/todolistapp/' element={<TodolistsList demo={false}/>}/>
                        {/*<Route path='/login' element={<Login/>}/>*/}
                        <Route path='/todolistapp/login' element={<Login/>}/>
                        {/*<Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>*/}
                        <Route path='/todolistapp/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                        {/*<Route path='*' element={<Navigate to='/404'/>}/>*/}
                        <Route path='/todolistapp/*' element={<Navigate to='/404'/>}/>
                    </Routes>
                </Container>
            </div>
    );
}

export default App;

//types
export type DemoPropsType = {
}


