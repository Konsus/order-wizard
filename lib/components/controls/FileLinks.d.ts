/// <reference types="react" />
import * as React from "react";
import { SelectionControl } from "./SelectionControl";
export declare class FileLinks extends SelectionControl<FileLinksProps, FileLinksState> {
    private dropZone;
    constructor(...args: any[]);
    onChange(event: React.FormEvent<React.HTMLProps<HTMLTextAreaElement>>): void;
    onDrop(files: IFile[]): void;
    onOpenClick(): void;
    render(): JSX.Element;
}
export interface FileLinksProps extends Survey.View.SelectionProps<FileLink[]> {
}
export interface FileLinksState extends Survey.View.Value<any> {
    files?: IFile[];
}
export interface FileLink {
}
export interface FileLinkData {
}
export interface IFile {
    name: string;
    size: number;
    type: string;
    preview: string;
}
