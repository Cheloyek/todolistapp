import * as appSelectors from './selectors'

export type {AppRootStateType, RootReducerType, AppActionsType, AppThunk} from "./store"
export type {DemoPropsType} from "./App"
export type {SetErrorActionType, SetStatusActionType, AppReducerActionsType, RequestStatusType, InitialStateType} from "./app-reducer"

export {appReducer, setAppStatusAC, setAppErrorAC} from "./app-reducer"
export {
    appSelectors
}