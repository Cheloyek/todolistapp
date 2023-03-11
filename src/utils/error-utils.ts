import {ActionsType, setAppErrorAC, setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../app/app-reducer";
import {TodoListResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";

export const handleAppError = <D>(dispatch: Dispatch<ActionsType>, data: TodoListResponseType<D>) => {
    console.log("error utils")
    if (data.messages.length > 0) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('unknown message'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch<ActionsType>, error: any) => {
    console.log("error utils network")
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error'))
    dispatch(setAppStatusAC('failed'))
}