"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timestamp_1 = require("./lib/util/timestamp");
var StateManager = (function () {
    function StateManager(debug, initialpushState) {
        this._doInitialPushState = (initialpushState) ? initialpushState : false;
        this._isDebug = (debug) ? debug : false;
        if (this._doInitialPushState) {
            this.doPush(window.location.href, document.title);
        }
    }
    StateManager.prototype.handleReplaceState = function (stateObject) {
        if (this._isDebug) {
            console.log('Replacing History State: ', stateObject);
        }
        window.history.replaceState(stateObject, stateObject.title, stateObject.uri);
    };
    StateManager.prototype.handlePushState = function (stateObject) {
        if (this._isDebug) {
            console.log('Pushing History State: ', stateObject);
        }
        window.history.pushState(stateObject, stateObject.title, stateObject.uri);
    };
    StateManager.prototype.buildStateObject = function (pageURI, isPushstate, pageTitle, scrollOffset) {
        var stateObject = {
            uri: pageURI,
            timestamp: timestamp_1.default(),
            history: isPushstate,
            scrollPos: {
                x: (window.scrollX + scrollOffset.x),
                y: (window.scrollY + scrollOffset.y)
            }
        };
        this._previousState = stateObject;
        stateObject.title = (pageTitle !== null && pageTitle !== undefined) ? pageTitle : document.title;
        if (isPushstate) {
            this.handlePushState(stateObject);
        }
        else {
            this.handleReplaceState(stateObject);
        }
    };
    StateManager.prototype.doPush = function (uri, title, scrollOffset) {
        if (title === void 0) { title = document.title; }
        if (scrollOffset === void 0) { scrollOffset = { x: 0, y: 0 }; }
        this.buildStateObject(uri, true, title, scrollOffset);
    };
    StateManager.prototype.doReplace = function (uri, title, scrollOffset) {
        if (title === void 0) { title = document.title; }
        if (scrollOffset === void 0) { scrollOffset = { x: 0, y: 0 }; }
        this.buildStateObject(uri, false, title, scrollOffset);
    };
    return StateManager;
}());
exports.default = StateManager;
//# sourceMappingURL=manager.js.map