/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _manager__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_manager__WEBPACK_IMPORTED_MODULE_0__);


(()=>{
    new _manager__WEBPACK_IMPORTED_MODULE_0___default.a(true, true);

    const replaceButton = document.body.querySelector('.js-replace');
    const pushButton    = document.body.querySelector('.js-push');
    const input         = document.body.querySelector('input');

    replaceButton.addEventListener('click', (e)=>{
        let fixedInput = input.value.replace(/\s/gi, '-');
        _manager__WEBPACK_IMPORTED_MODULE_0___default.a.doReplace(window.location.origin + '/' + fixedInput);
    });

    pushButton.addEventListener('click', (e)=>{
        let fixedInput = input.value.replace(/\s/gi, '-');
        _manager__WEBPACK_IMPORTED_MODULE_0___default.a.doPush(window.location.origin + '/' + fixedInput);
    });
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var timestamp_1 = __webpack_require__(2);
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
        // this._previousState = stateObject;
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Grab the current timestamp.
 * @returns `Date.now()` number
 */
exports.default = (function () {
    return Date.now();
});
//# sourceMappingURL=timestamp.js.map

/***/ })
/******/ ]);