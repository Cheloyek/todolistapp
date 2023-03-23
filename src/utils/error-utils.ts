import {Dispatch} from "redux";
import {TodoListResponseType} from "api";
import {AppReducerActionsType, setAppErrorAC, setAppStatusAC} from "app";

/**
 * utils function which show error message when get error from server
 * @param dispatch
 * @param {TodoListResponseType} data - error message from back end.
 */
export const handleAppError = <D>(dispatch: Dispatch<AppReducerActionsType>, data: TodoListResponseType<D>) => {
    if (data.messages.length > 0) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'unknown message'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

/**
 * utils function which show error message when server network error
 * @param dispatch
 * @param {message: string} error - message from error.
 */
export const handleServerNetworkError = (dispatch: Dispatch<AppReducerActionsType>, error: { message: string}) => {
    dispatch(setAppErrorAC({error: error.message ? error.message : 'Some error'}))
    dispatch(setAppStatusAC({status: 'failed'}))
}