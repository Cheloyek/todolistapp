import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)

    //input -> change new task title
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    //press key Enter -> addTask
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
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
        } else {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        }
    }

    return <div>
        <input type="text"
               placeholder={'Task title'}
               value={newTaskTitle}
               onChange={onChangeHandler}
               onKeyDown={onKeyDownHandler}
               className={error ? 'error' : ''}
        />
        <Button onClick={addTask} size={'medium'} variant={"contained"}
                style={{width: '20px', height: '20px', color: '#659DBD', backgroundColor: 'white', borderColor: '#659DBD'}} >
            +
        </Button>
        {error && <div className='error-message'>{error}</div>}
    </div>
}