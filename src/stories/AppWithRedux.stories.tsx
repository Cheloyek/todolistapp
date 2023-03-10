import {ComponentMeta} from "@storybook/react";
import React from "react";
import AppWithRedux from "../app/AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Example/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

export const AppStories = () => {return <AppWithRedux demo={true}/>};
