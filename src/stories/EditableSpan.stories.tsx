import {ComponentMeta, ComponentStory} from "@storybook/react";
import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../EditableSpan";

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof EditableSpan>;

const editTitleCallback = action('Change title')

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const Title = Template.bind({});
Title.args = {
    title: 'EditableSpan',
    onChange: editTitleCallback
};