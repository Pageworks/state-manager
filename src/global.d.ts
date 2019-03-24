export { StateManager as default };

export as namespace StateManager;

declare class StateManager{
    constructor(debug?:boolean, initialpushState?:boolean);
    public static doPush(uri:string, title?:string):void;
    public static doReplace(uri:string, title?:string, scrollOffset?:StateManager.IScrollPosition):void;
}


declare namespace StateManager{
    export interface IScrollPosition{
        x:  number;
        y:  number;
    }
    
    export interface IStateObject{
        uri:        string;
        timestamp:  number;
        scrollPos:  IScrollPosition;
        title?:     string;
        history?:   boolean;
    }
}