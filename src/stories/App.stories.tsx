import {ComponentMeta} from "@storybook/react";
import React from "react";
import App from "../app/App";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Example/App',
    component: App,
    decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
}

export const AppStories = () => {return <App/>};
