import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length >= 100) {}
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        }
        else if (newTaskTitle.length >= 100) {
            setError('The field Title must be a maximum length of \'100\' symbols')
        }
            else {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }

    return <div style={{marginTop: '10px'}}>
        <TextField type="text"
                   label={'Task title'}
                   value={newTaskTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   error={!!error}
                   helperText={error}
                   disabled={props.disabled}
                   variant='outlined'
        />
        <Button onClick={addTask} size={'medium'} variant={"contained"}
                style={{color: '#1132a8', backgroundColor: '#e17a02', borderColor: '#659DBD', margin: '10px'}} disabled={props.disabled}>
            <AddIcon/>
        </Button>
    </div>
})

//types
type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}