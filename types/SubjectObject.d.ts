declare type PropertyChange = {
    property: string,
    oldValue: any | undefined
}

declare type Listener = (object: SubjectObject, change: PropertyChange) => void;

declare class SubjectObject {
    createProperty(property: string): void;
    addObserver(observer: Listener): void;
    removeObserver(observer: Listener): void;
    set(value: PropertyChange[]): void;
}

declare module 'subject-object' {
    export = SubjectObject
}