import getTimestamp from './lib/util/timestamp';

import Manager from './global';

export default class StateManager{

    private _doInitialPushState:    boolean;
    private _isDebug:               boolean;
    private _previousState:         Manager.IStateObject;

    constructor(debug?:boolean, initialpushState?:boolean){
        this._doInitialPushState = (initialpushState) ? initialpushState : false;
        this._isDebug            = (debug) ? debug : false;
        
        // Check if the initial page state needs to be pushed into history
        if(this._doInitialPushState){
            this.doPush(window.location.href, document.title);
        }
    }

    /**
     * Replaces the current `StateObject` in the windows history.
     * @param stateObject - the new`StateObject`
     */
    private handleReplaceState(stateObject:Manager.IStateObject): void{
        if(this._isDebug){
            console.log('Replacing History State: ', stateObject);
        }
        window.history.replaceState(stateObject, stateObject.title, stateObject.uri);
    }

    /**
     * Pushes the `StateObject` into the windows history.
     * @param stateObject - `StateObject` that will be pushed into the windows history
     */
    private handlePushState(stateObject:Manager.IStateObject): void{
        if(this._isDebug){
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
    private buildStateObject(pageURI:string, isPushstate:boolean, pageTitle:string): void{
        const stateObject:Manager.IStateObject = {
            uri: pageURI,
            timestamp: getTimestamp(),
            history: isPushstate,
            scrollPos: {
                x: window.scrollX,
                y: window.scrollY
            }
        };
        this._previousState = stateObject;
        stateObject.title = (pageTitle !== null && pageTitle !== undefined) ? pageTitle : document.title;

        // Handle the state type
        if(isPushstate){
            this.handlePushState(stateObject);
        }else{
            this.handleReplaceState(stateObject);
        }
    }

    /**
     * Called when a new `window.history.pushState()` needs to occur.
     * @param uri - the new URI of the page
     * @param title - the new document title
     * @param scrollPosition - the current scroll position of the page
     */
    public doPush(uri:string, title:string = document.title): void{
        this.buildStateObject(uri, true, title);
    }

    /**
     * Called when a new `window.history.replaceState()` needs to occur.
     * @param uri - the new URI of the page
     * @param title - the new document title
     * @param scrollPosition - the current scroll position of the page
     */
    public doReplace(uri:string, title:string = document.title): void{
        this.buildStateObject(uri, false, title);
    }
}