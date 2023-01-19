import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import {Todolist} from "../Todolist/Todolist";

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
    title: 'TodoList title',
    todolistId: '1',
    tasks: [{id: '1', isDone: true, title: 'taskId_1'}],
    removeTask: removeTaskCallback,
    changeFilter: changeFilterCallback,
    addTask: addTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    changeTodoListTitle: changeTodoListTitleCallback,
    filter: 'all',
    deleteTodoList: changeTodoListTitleCallback,
};