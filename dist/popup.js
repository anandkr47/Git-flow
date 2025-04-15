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

/***/ "./src/ui/popup.ts":
/*!*************************!*\
  !*** ./src/ui/popup.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\ndocument.addEventListener('DOMContentLoaded', () => {\n    const settingsForm = document.getElementById('settings-form');\n    // Load saved settings\n    const defaultSettings = {\n        theme: 'light',\n        detailLevel: 'medium',\n        autoGenerate: true\n    };\n    chrome.storage.sync.get(defaultSettings, (items) => {\n        const settings = items;\n        document.getElementById('theme').value = settings.theme;\n        document.getElementById('detail-level').value = settings.detailLevel;\n        document.getElementById('auto-generate').checked = settings.autoGenerate;\n    });\n    // Save settings\n    settingsForm.addEventListener('submit', (e) => {\n        e.preventDefault();\n        const theme = document.getElementById('theme').value;\n        const detailLevel = document.getElementById('detail-level').value;\n        const autoGenerate = document.getElementById('auto-generate').checked;\n        const settings = {\n            theme,\n            detailLevel,\n            autoGenerate\n        };\n        chrome.storage.sync.set(settings, () => {\n            const status = document.getElementById('status');\n            if (status) {\n                status.textContent = 'Settings saved!';\n                setTimeout(() => {\n                    status.textContent = '';\n                }, 2000);\n            }\n        });\n        // Notify content script of settings change\n        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {\n            if (tabs[0].id) {\n                chrome.tabs.sendMessage(tabs[0].id, {\n                    type: 'settingsUpdated',\n                    settings\n                });\n            }\n        });\n    });\n});\n\n\n\n//# sourceURL=webpack://code-flowchart-generator/./src/ui/popup.ts?");

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
/******/ 	__webpack_modules__["./src/ui/popup.ts"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;