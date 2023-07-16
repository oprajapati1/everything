/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("cors");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lookupUrl = exports.shortenUrl = void 0;
const tslib_1 = __webpack_require__(1);
const sqlite3_1 = tslib_1.__importDefault(__webpack_require__(5));
const sqlite_1 = __webpack_require__(6);
let _db;
function getDB() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (_db == null) {
            const conn = yield (0, sqlite_1.open)({
                filename: './urls.db',
                driver: sqlite3_1.default.Database,
            });
            _db = conn;
            yield _db.run('CREATE TABLE IF NOT EXISTS url (id INTEGER PRIMARY KEY AUTOINCREMENT, original TEXT);');
        }
        return _db;
    });
}
function shortenUrl(url) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield getDB();
        const result = yield db.run('INSERT INTO url (original) VALUES (?)', url);
        const id = result.lastID;
        const short = `http://localhost:3333/s/${id}`;
        return short;
    });
}
exports.shortenUrl = shortenUrl;
function lookupUrl(shortenedId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const db = yield getDB();
        const result = yield db.get('SELECT original FROM url WHERE id = (?)', shortenedId);
        return result.original;
    });
}
exports.lookupUrl = lookupUrl;


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("sqlite3");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("sqlite");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const cors_1 = tslib_1.__importDefault(__webpack_require__(3));
const persist_1 = __webpack_require__(4);
const path = tslib_1.__importStar(__webpack_require__(7));
// Composition Root
const deps = {
    shortenUrl: persist_1.shortenUrl,
    lookupUrl: persist_1.lookupUrl,
};
function main({ shortenUrl, lookupUrl }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use(express_1.default.json());
        app.use((0, cors_1.default)());
        app.use(express_1.default.static(path.join(__dirname, 'dist/apps/url/client')));
        app.post('/api/shorten', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const original = req.body.original;
            const short = yield shortenUrl(original);
            res.send({
                short: short,
                original: original,
            });
        }));
        app.get('/s/:id', (req, res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const original = yield lookupUrl(id);
            res.redirect(original);
        }));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, 'dist/apps/url/client/index.html'));
        });
        const port = process.env.PORT || 3333;
        const server = app.listen(port, () => {
            console.log(`Listening at http://localhost:${port}/api`);
        });
        server.on('error', console.error);
    });
}
main(deps);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map