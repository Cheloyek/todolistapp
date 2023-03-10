import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Todolist} from "../features/TodolistList/Todolist/Todolist";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";

export default {
    title: 'Example/TodoList',
    component: Todolist,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Todolist>;

const removeTaskCallback = action('removeTask')
const changeTaskStatusCallback = action('changeTaskStatus')
const changeTaskTitleCallback = action('changeTaskTitle')
const changeTodoListTitleCallback = action('changeTodoListTitle')
const changeFilterCallback = action('changeFilter')
const addTaskCallback = action('changeFilter')

const Template: ComponentStory<typeof Todolist> = (args) => <Todolist {...args} />;

export const TodoListStories = Template.bind({});
TodoListStories.args = {
    // todolist:
    // todolist: 'TodoList title',
    // todolistId: '1',
    tasks: [{id: '1', status: TaskStatuses.Completed, title: 'taskId_1', todoListId: v1(), addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}],
    removeTask: removeTaskCallback,
    changeFilter: changeFilterCallback,
    addTask: addTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeTodoListTitle: changeTodoListTitleCallback,
    // filter: 'all',
    deleteTodoList: changeTodoListTitleCallback,
};