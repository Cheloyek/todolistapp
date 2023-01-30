
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    error: 'true',
    status: 'loading' as RequestStatusType
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

type ActionsType = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>
