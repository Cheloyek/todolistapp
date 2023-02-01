
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    error: null,
    status: 'idle' as RequestStatusType
}

export type InitialStateType = {
    error: null | string
    status: RequestStatusType
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':

            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return <InitialStateType>{...state, error: action.error};
        default:
            return state
    }
}

export const setErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}

export const setStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

export type SetErrorActionsType = ReturnType<typeof setErrorAC>;
export type SetStatusActionsType = ReturnType<typeof setStatusAC>;
type ActionsType = SetErrorActionsType | SetStatusActionsType