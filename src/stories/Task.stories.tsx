import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {Task} from "../features/TodolistList/Todolist/Task/Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";

export default {
    title: 'Example/Task',
    component: Task,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Task>;

const removeTaskCallback = action('removeTask')
const changeTaskStatusCallback = action('changeTaskStatus')
const changeTaskTitleCallback = action('changeTaskTitle')

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskStories = Template.bind({});
TaskStories.args = {
    removeTask: removeTaskCallback,
    todolistId: 'todoListId_1',
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    task: {id: '1', status: TaskStatuses.Completed, title: 'taskId_1', todoListId: v1(), addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
};