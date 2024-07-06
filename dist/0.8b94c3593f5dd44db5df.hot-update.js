"use strict";
exports.id = 0;
exports.ids = null;
exports.modules = {

/***/ 43:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReactController = void 0;
const common_1 = __webpack_require__(6);
const mongodb_1 = __webpack_require__(13);
const validation_pipe_1 = __webpack_require__(44);
const swagger_1 = __webpack_require__(27);
const react_service_1 = __webpack_require__(20);
const react_dto_1 = __webpack_require__(46);
const jwt_auth_guard_1 = __webpack_require__(29);
let ReactController = class ReactController {
    constructor(productService) {
        this.productService = productService;
    }
    async getReacts() {
        return await this.productService.getReacts();
    }
    async getReactsByObjectId(id) {
        return await this.productService.getReactsByObjectId(id);
    }
    async createReact(reactDto) {
        return await this.productService.createReacts(reactDto);
    }
    async detailReact(id) {
        const id_string = id.toString();
        return await this.productService.detailReacts(id_string);
    }
    async deleteReact(id) {
        return await this.productService.deleteReact(id);
    }
};
exports.ReactController = ReactController;
__decorate([
    (0, common_1.Get)('/allreacts/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ReactController.prototype, "getReacts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/reacts/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReactController.prototype, "getReactsByObjectId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new validation_pipe_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof react_dto_1.ReactDto !== "undefined" && react_dto_1.ReactDto) === "function" ? _c : Object]),
    __metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ReactController.prototype, "createReact", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/react/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _e : Object]),
    __metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ReactController.prototype, "detailReact", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof mongodb_1.ObjectId !== "undefined" && mongodb_1.ObjectId) === "function" ? _g : Object]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ReactController.prototype, "deleteReact", null);
exports.ReactController = ReactController = __decorate([
    (0, common_1.Controller)('/likes'),
    (0, swagger_1.ApiTags)('REACTS'),
    __metadata("design:paramtypes", [typeof (_a = typeof react_service_1.ReactService !== "undefined" && react_service_1.ReactService) === "function" ? _a : Object])
], ReactController);


/***/ })

};
exports.runtime =
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5d31af2141b63ab64409")
/******/ })();
/******/ 
/******/ }
;