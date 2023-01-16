import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {Task} from "../Todolist/Task";
import {action} from "@storybook/addon-actions";

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
    task: {id: '1', isDone: true, title: 'taskId_1'}
};