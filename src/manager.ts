import getTimestamp from './lib/util/timestamp';

import Manager from './global';

export default class StateManager{

    private _doInitialPushState:    boolean;
    private static _isDebug:        boolean;

    constructor(debug?:boolean, initialpushState?:boolean){
        this._doInitialPushState = (initialpushState) ? initialpushState : false;
        StateManager._isDebug    = (debug) ? debug : false;
        
        // Check if the initial page state needs to be pushed into history
        if(this._doInitialPushState){
            StateManager.doReplace(window.location.href);
        }
    }

    /**
     * Replaces the current `StateObject` in the windows history.
     * @param stateObject - the new`StateObject`
     */
    private static handleReplaceState(stateObject:Manager.IStateObject): void{
        if(StateManager._isDebug){
            console.log('Replacing History State: ', stateObject);
        }
        window.history.replaceState(stateObject, stateObject.title, stateObject.uri);
    }

    /**
     * Pushes the `StateObject` into the windows history.
     * @param stateObject - `StateObject` that will be pushed into the windows history
     */
    private static handlePushState(stateObject:Manager.IStateObject): void{
        if(StateManager._isDebug){
            console.log('Pushing History State: ', stateObject);
        }
        window.history.pushState(stateObject, stateObject.title, stateObject.uri);
    }

    /**
     * Builds the custom `StateObject`
     * @param pageURI - the new URI of the page
     * @param isPushstate - the new document title
     * @param pageTitle - the current scroll position of the page
     */
    private static buildStateObject(pageURI:string, isPushstate:boolean, pageTitle:string, scrollOffset:Manager.IScrollPosition): void{
        const stateObject:Manager.IStateObject = {
            uri: pageURI,
            timestamp: getTimestamp(),
            history: isPushstate,
            scrollPos: {
                x: (window.scrollX + scrollOffset.x),
                y: (window.scrollY + scrollOffset.y)
            }
        };
        stateObject.title = (pageTitle !== null && pageTitle !== undefined) ? pageTitle : document.title;

        // Handle the state type
        if(isPushstate){
            StateManager.handlePushState(stateObject);
        }else{
            StateManager.handleReplaceState(stateObject);
        }
    }

    /**
     * Called when a new `window.history.pushState()` needs to occur.
     * @param uri - the new URI of the page
     * @param title - the new document title
     * @param scrollPosition - the current scroll position of the page
     */
    public static doPush(uri:string, title:string = document.title, scrollOffset:Manager.IScrollPosition = {x:0,y:0}): void{
        StateManager.buildStateObject(uri, true, title, scrollOffset);
    }

    /**
     * Called when a new `window.history.replaceState()` needs to occur.
     * @param uri - the new URI of the page
     * @param title - the new document title
     * @param scrollPosition - the current scroll position of the page
     */
    public static doReplace(uri:string, title:string = document.title, scrollOffset:Manager.IScrollPosition = {x:0,y:0}): void{
        StateManager.buildStateObject(uri, false, title, scrollOffset);
    }
}