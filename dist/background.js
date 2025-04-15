/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// Listen for installation or update\nchrome.runtime.onInstalled.addListener(() => {\n    // Set default settings\n    const defaultSettings = {\n        theme: 'light',\n        detailLevel: 'medium',\n        autoGenerate: true\n    };\n    chrome.storage.sync.set(defaultSettings);\n});\n// Listen for messages from content script or popup\nchrome.runtime.onMessage.addListener((request, sender, sendResponse) => {\n    if (request.type === 'getSettings') {\n        chrome.storage.sync.get({\n            theme: 'light',\n            detailLevel: 'medium',\n            autoGenerate: true\n        }, (settings) => {\n            sendResponse(settings);\n        });\n        return true; // Will respond asynchronously\n    }\n});\n\n\n\n//# sourceURL=webpack://code-flowchart-generator/./src/background/background.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background/background.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;