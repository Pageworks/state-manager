"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timestamp_1 = require("./lib/util/timestamp");
var StateManager = /** @class */ (function () {
    function StateManager(debug, initialpushState) {
        this._doInitialPushState = (initialpushState) ? initialpushState : false;
        StateManager._isDebug = (debug) ? debug : false;
        // Check if the initial page state needs to be pushed into history
        if (this._doInitialPushState) {
            StateManager.doReplace(window.location.href);
        }
    }
    /**
     * Replaces the current `StateObject` in the windows history.
     * @param stateObject - the new`StateObject`
     */
    StateManager.handleReplaceState = function (stateObject) {
        if (StateManager._isDebug) {
            console.log('Replacing History State: ', stateObject);
        }
        window.history.replaceState(stateObject, stateObject.title, stateObject.uri);
    };
    /**
     * Pushes the `StateObject` into the windows history.
     * @param stateObject - `StateObject` that will be pushed into the windows history
     */
    StateManager.handlePushState = function (stateObject) {
        if (StateManager._isDebug) {
            console.log('Pushing History State: ', stateObject);
        }
        window.history.pushState(stateObject, stateObject.title, stateObject.uri);
    };
    /**
     * Builds the custom `StateObject`
     * @param pageURI - the new URI of the page
     * @param isPushstate - the new document title
     * @param pageTitle - the current scroll position of the page
     */
    StateManager.buildStateObject = function (pageURI, isPushstate, pageTitle, scrollOffset) {
        var stateObject = {
            uri: pageURI,
            timestamp: timestamp_1.default(),
            history: isPushstate,
            scrollPos: {
                x: (window.scrollX + scrollOffset.x),
                y: (window.scrollY + scrollOffset.y)
            }
        };
        stateObject.title = (pageTitle !== null && pageTitle !== undefined) ? pageTitle : document.title;
        // Handle the state type
        if (isPushstate) {
            StateManager.handlePushState(stateObject);
        }
        else {
            StateManager.handleReplaceState(stateObject);
        }
    };
    /**
     * Called when a new `window.history.pushState()` needs to occur.
     * @param uri - the new URI of the page
     * @param title - the new document title
     * @param scrollPosition - the current scroll position of the page
     */
    StateManager.doPush = function (uri, title, scrollOffset) {
        if (title === void 0) { title = document.title; }
        if (scrollOffset === void 0) { scrollOffset = { x: 0, y: 0 }; }
        StateManager.buildStateObject(uri, true, title, scrollOffset);
    };
    /**
     * Called when a new `window.history.replaceState()` needs to occur.
     * @param uri - the new URI of the page
     * @param title - the new document title
     * @param scrollPosition - the current scroll position of the page
     */
    StateManager.doReplace = function (uri, title, scrollOffset) {
        if (title === void 0) { title = document.title; }
        if (scrollOffset === void 0) { scrollOffset = { x: 0, y: 0 }; }
        StateManager.buildStateObject(uri, false, title, scrollOffset);
    };
    return StateManager;
}());
exports.default = StateManager;
//# sourceMappingURL=manager.js.map