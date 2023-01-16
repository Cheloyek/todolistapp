import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (id: string, todoListId: string) => void
    todolistId: string
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {
    //button -> delete task
    const onClickTaskDeleteHandler = useCallback (() => {
        props.removeTask(props.task.id, props.todolistId)
    },[props.removeTask, props.todolistId])
    //checkbox
    const onChangeStatusHandler = useCallback ((e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistId)
    }, [props.changeTaskStatus, props.task.id, props.todolistId])

    //input task title
    const onChangeTaskTitleHandler = useCallback ((newTitle: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, newTitle)
    }, [props.changeTaskTitle, props.todolistId, props.task.id])

    return <div key={props.task.id} className={props.task.isDone ? 'completed-task' : ''}>
        <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitleHandler}/>
        <IconButton aria-label="delete" size="small">
            <DeleteIcon fontSize="small" onClick={onClickTaskDeleteHandler}/>
        </IconButton>
    </div>
})