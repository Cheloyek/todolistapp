import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    //input -> change new task title
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value.length >= 100) {}
        setNewTaskTitle(e.currentTarget.value)
    }
    //press key Enter -> addTask
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (event.key === 'Enter') {
            addTask()
        }
    }
    //add new task
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
        {/*<input type="text"*/}
        {/*       placeholder={'Task title'}*/}
        {/*       value={newTaskTitle}*/}
        {/*       onChange={onChangeHandler}*/}
        {/*       onKeyDown={onKeyDownHandler}*/}
        {/*       className={error ? 'error' : ''}*/}
        {/*/>*/}
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
        {/*{error && <div className='error-message'>{error}</div>}*/}
    </div>
})