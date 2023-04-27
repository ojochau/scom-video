/// <amd-module name="@scom/scom-video/interface.ts" />
declare module "@scom/scom-video/interface.ts" {
    import { IDataSchema } from "@ijstech/components";
    export interface ICommand {
        execute(): void;
        undo(): void;
        redo(): void;
    }
    export interface IPageBlockAction {
        name: string;
        icon: string;
        command: (builder: any, userInputData: any) => ICommand;
        userInputDataSchema: IDataSchema;
    }
    export interface PageBlock {
        getActions: () => IPageBlockAction[];
        getData: () => any;
        setData: (data: any) => Promise<void>;
        getTag: () => any;
        setTag: (tag: any) => Promise<void>;
        defaultEdit?: boolean;
        tag?: any;
        validate?: () => boolean;
        readonly onEdit: () => Promise<void>;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
    }
    export interface IData {
        url: string;
        showHeader?: boolean;
        showFooter?: boolean;
    }
}
/// <amd-module name="@scom/scom-video/index.css.ts" />
declare module "@scom/scom-video/index.css.ts" { }
/// <amd-module name="@scom/scom-video" />
declare module "@scom/scom-video" {
    import { Module, IDataSchema, Container, ControlElement } from '@ijstech/components';
    import { IData, PageBlock } from "@scom/scom-video/interface.ts";
    import "@scom/scom-video/index.css.ts";
    interface ScomVideoElement extends ControlElement {
        url: string;
        showHeader?: boolean;
        showFooter?: boolean;
    }
    global {
        namespace JSX {
            interface IntrinsicElements {
                ["i-scom-video"]: ScomVideoElement;
            }
        }
    }
    export default class ScomVideo extends Module implements PageBlock {
        private data;
        private oldData;
        private iframeElm;
        private dappContainer;
        tag: any;
        readonly onConfirm: () => Promise<void>;
        readonly onDiscard: () => Promise<void>;
        readonly onEdit: () => Promise<void>;
        defaultEdit?: boolean;
        validate?: () => boolean;
        edit: () => Promise<void>;
        confirm: () => Promise<void>;
        discard: () => Promise<void>;
        constructor(parent?: Container, options?: any);
        get showFooter(): boolean;
        set showFooter(value: boolean);
        get showHeader(): boolean;
        set showHeader(value: boolean);
        init(): void;
        static create(options?: ScomVideoElement, parent?: Container): Promise<ScomVideo>;
        get url(): string;
        set url(value: string);
        getConfigSchema(): {
            type: string;
            required: any[];
            properties: {
                width: {
                    type: string;
                };
                height: {
                    type: string;
                };
            };
        };
        getData(): IData;
        setData(value: IData): Promise<void>;
        getTag(): any;
        setTag(value: any): Promise<void>;
        getEmbedderActions(): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => void;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
        }[];
        getActions(): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => void;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
        }[];
        _getActions(settingSchema: IDataSchema, themeSchema: IDataSchema): {
            name: string;
            icon: string;
            command: (builder: any, userInputData: any) => {
                execute: () => void;
                undo: () => void;
                redo: () => void;
            };
            userInputDataSchema: IDataSchema;
        }[];
        checkValidation(value: IData): boolean;
        render(): any;
    }
}
