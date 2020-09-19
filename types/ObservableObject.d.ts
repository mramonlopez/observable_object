declare type PropertyChange = {
    property: string,
    oldValue: any | undefined
}

declare type Listener = (object: ObservableObject, change: PropertyChange) => void;

declare class ObservableObject {
    createProperty(property: string): void;
    addObserver(observer: Listener): void;
    removeObserver(observer: Listener): void;
    set(value: PropertyChange[]): void;
}

declare module 'observable-object' {
    export = ObservableObject
}