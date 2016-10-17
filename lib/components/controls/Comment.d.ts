/// <reference types="react" />
import * as React from "react";
import { SelectionControl } from "./SelectionControl";
export declare class Comment extends SelectionControl<CommentProps, Survey.View.Value<string>> {
    onChange(event: React.FormEvent<React.HTMLProps<HTMLTextAreaElement>>): void;
    renderActiveView(): JSX.Element | any;
}
export interface CommentProps extends Survey.View.SelectionProps<string> {
}
