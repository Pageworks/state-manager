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
    StateManager.prototype.buildStateObject = function (pageURI, isPushstate, pageTitle) {
        var stateObject = {
            uri: pageURI,
            timestamp: timestamp_1.default(),
            history: isPushstate,
            scrollPos: {
                x: window.scrollX,
                y: window.scrollY
            }
        };
        stateObject.title = (pageTitle !== null && pageTitle !== undefined) ? pageTitle : document.title;
        if (isPushstate) {
            this.handlePushState(stateObject);
        }
        else {
            this.handleReplaceState(stateObject);
        }
    };
    StateManager.prototype.doPush = function (uri, title) {
        this.buildStateObject(uri, true, title);
    };
    StateManager.prototype.doReplace = function (uri, title) {
        this.buildStateObject(uri, false, title);
    };
    return StateManager;
}());
exports.default = StateManager;
//# sourceMappingURL=manager.js.map