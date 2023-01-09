import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState<boolean>(false)
    let [title, setTitle] = useState<string>('')

    const activateEditMode = (value: boolean) => {
        setEditMode(value)
        if (value === true) {
            setTitle(props.title)
        }
        if (value === false) {
            props.onChange(title)
        }
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        // props.onChange(title)
    }

    return editMode
        ? <input value={title} onBlur={() => activateEditMode(false)} autoFocus={true} onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={() => activateEditMode(true)}>{props.title}</span>
}