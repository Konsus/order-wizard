/// <reference types="react" />
import * as React from "react";
import { SelectionControl } from "./SelectionControl";
export declare class File extends SelectionControl<FileProps, Survey.View.Value<string>> {
    onChange(event: React.FormEvent<React.HTMLProps<HTMLTextAreaElement>>): void;
    render(): JSX.Element;
}
export interface FileProps extends Survey.View.SelectionProps<string> {
}
