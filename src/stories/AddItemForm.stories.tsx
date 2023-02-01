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
const Template_disabled: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} disabled={true}/>;

export const Basic = Template.bind({});
export const Disabled = Template_disabled.bind({});
Basic.args = {
    addItem: (title: string) => {
        alert(title)
    }
};

Disabled.args = {
    addItem: (title: string) => {
        alert(title)
    }
};