"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FooterComponent = void 0;
var core_1 = require("@angular/core");
var FooterComponent = /** @class */ (function () {
    function FooterComponent(router) {
        this.router = router;
        this.activeTab = "";
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent.prototype.index = function () { this.router.navigate(['/index']); };
    FooterComponent.prototype.profile = function () { this.router.navigate(['/profile']); };
    FooterComponent.prototype.clock = function () {
        if (localStorage.getItem("siteAddress") == null) {
            this.router.navigate(['/clock']);
        }
        else {
            if (localStorage.getItem("siteAddress") == "") {
                if (localStorage.getItem("siteTime") !== null) {
                    this.router.navigate(['/clock-in']);
                }
                else if (localStorage.getItem("siteTime") == null) {
                    this.router.navigate(['/clock-out']);
                }
                else {
                    this.router.navigate(['/clock']);
                }
            }
            else {
                if (localStorage.getItem("siteTime") == null) {
                    this.router.navigate(['/clock-out']);
                }
                else {
                    this.router.navigate(['/clock-in']);
                }
            }
        }
    };
    FooterComponent.prototype.timesheet = function () { this.router.navigate(['/timesheet']); };
    FooterComponent.prototype.logout = function () {
        localStorage.removeItem("token");
        this.router.navigate(["/verify"]);
    };
    FooterComponent.prototype.gotoHome = function () {
        this.router.navigate(["/index"]);
    };
    FooterComponent.prototype.gotoClock = function () {
        this.router.navigate(["/clock"]);
    };
    FooterComponent.prototype.rout = function () {
        window.history.back();
    };
    FooterComponent.prototype.blankpage = function () {
        this.router.navigate(["/blankpage"]);
    };
    __decorate([
        core_1.Input()
    ], FooterComponent.prototype, "activeTab");
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.css']
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
