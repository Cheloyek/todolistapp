import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskStatuses, TaskType} from "api";

export const Task = React.memo((props: TaskPropsType) => {
    const onClickTaskDeleteHandler = useCallback (() => {
        props.removeTask(props.task.id, props.todolistId)
    },[props.removeTask, props.todolistId])

    const onChangeStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    const onChangeTaskTitleHandler = useCallback ((newTitle: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'completedTask' : ''} style={{position: "relative"}}>
        <IconButton aria-label="delete" size="small" style={{position: "absolute", right: "2px", top: "2px"}}>
        <DeleteIcon fontSize="small" onClick={onClickTaskDeleteHandler}/>
        </IconButton>
        <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler}/>
    </div>
})

//types
type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void
    todolistId: string
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    task: TaskType
}