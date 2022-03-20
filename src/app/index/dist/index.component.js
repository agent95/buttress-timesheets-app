"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IndexComponent = void 0;
var core_1 = require("@angular/core");
var package_json_1 = require("../../../package.json");
var IndexComponent = /** @class */ (function () {
    function IndexComponent(router) {
        this.router = router;
        this.arr = [];
        this.arr2 = [];
        this.a3 = 0;
        this.ARR = [];
        this.version = package_json_1["default"].version;
    }
    IndexComponent.prototype.ngOnInit = function () {
    };
    IndexComponent.prototype.rout = function () {
        window.history.back();
    };
    IndexComponent = __decorate([
        core_1.Component({
            selector: 'app-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.css']
        })
    ], IndexComponent);
    return IndexComponent;
}());
exports.IndexComponent = IndexComponent;
