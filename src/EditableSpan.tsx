import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('editable span')
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>('')

    const activateEditMode = (value: boolean) => {
        setEditMode(value)
        if (value) {
            setTitle(props.title)
        }
        if (!value) {
            props.onChange(title)
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        // props.onChange(title)
    }

    return editMode
        ? <TextField variant='standard' value={title} onBlur={() => activateEditMode(false)} autoFocus={true} onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={() => activateEditMode(true)} style={{margin: '5px'}}>{props.title}</span>
})