import {AddItemForm} from "../AddItemForm";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";

export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const Basic = Template.bind({});
Basic.args = {
    addItem: (title: string) => {
        alert(title)
    }
};