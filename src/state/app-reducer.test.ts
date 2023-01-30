import {v1} from "uuid";
import {appReducer, InitialStateType, RequestStatusType, setErrorAC, setStatusAC} from "../app-reducer";

let todoListId1: string
let todoListId2: string
let todoListId3: string
let startState: InitialStateType


beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()
    todoListId3 = v1()

    startState = {
        error: null,
        status: 'idle'
    }
})

test('correct error message should be set', () => {

    const errorMessage = 'some error'
    const endState = appReducer(startState, setErrorAC(errorMessage))

    expect(endState.error).toBe(errorMessage)

})

test('correct status should be set', () => {

    const status: RequestStatusType = 'succeeded'
    const endState = appReducer(startState, setStatusAC(status))

    expect(endState.status).toBe(status)

})