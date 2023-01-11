import {TodolistType} from "../App";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}



export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let copyState = [...state]
            return copyState.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            let newTodoList = {id: v1(), title: 'New Todolist', filter: 'all'}
            return [...state, newTodoList]
        }


        default:
            throw new Error("I don't understand this action type")
    }
}