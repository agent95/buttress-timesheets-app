"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EntryDetailsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EntryDetailsComponent = /** @class */ (function () {
    function EntryDetailsComponent(router, service, activated, toastr, datepipe) {
        var _this = this;
        this.router = router;
        this.service = service;
        this.activated = activated;
        this.toastr = toastr;
        this.datepipe = datepipe;
        // NEW VARS
        this.sitename = "";
        this.start_time = "0:00:00";
        this.stop_time = "0:00:00";
        this.total_hrs = 10;
        this.taskSummary = [];
        this.totalTaskTime = "00:00:00";
        this.noteForm = new forms_1.FormGroup({
            message: new forms_1.FormControl('')
        });
        this.clockOutForm = new forms_1.FormGroup({});
        this.addTaskForm = new forms_1.FormGroup({
            tradeCategory: new forms_1.FormControl('No Trade Category'),
            taskDescription: new forms_1.FormControl(''),
            taskTime: new forms_1.FormControl('0:00:00')
        });
        this.timestrToSec = function (timestr) {
            var parts = timestr.split(":");
            return (parseInt(parts[0]) * 3600) + (parseInt(parts[1]) * 60) + (parseInt(parts[2]));
        };
        this.pad = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            else {
                return "" + num;
            }
        };
        this.formatTime = function (seconds) {
            return [_this.pad(Math.floor(seconds / 3600)),
                _this.pad(Math.floor(seconds / 60) % 60),
                _this.pad(seconds % 60),
            ].join(":");
        };
    }
    EntryDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activated.queryParams.subscribe(function (params) {
            _this.entryId = atob(params['id']);
        });
        this.getEntryDetails();
        this.getTradeCategories();
        this.placesOptions = { componentRestrictions: { country: 'AU' } };
    };
    EntryDetailsComponent.prototype.getTradeCategories = function () {
        var _this = this;
        this.service.getTradeCategories().subscribe(function (res) {
            if (res.status == true) {
                _this.tradeCategories = res.data;
            }
            else if (res.status == false) {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.getEntryDetails = function () {
        var _this = this;
        this.service.getEntryDetails(this.entryId).subscribe(function (res) {
            if (res.status == true) {
                _this.entryDetails = res.data;
                _this.getSumOfTaskTime(_this.entryDetails.tasks);
            }
            else if (res.status == false) {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.deleteEntry = function () {
        var _this = this;
        this.service.removeEntry(this.entryId).subscribe(function (res) {
            if (res.status == true) {
                _this.timesheet();
            }
            else if (res.status == false) {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.getSumOfTaskTime = function (tasks) {
        var _this = this;
        if (this.entryDetails.tasks.length === 1) {
            this.totalTaskTime = this.entryDetails.total_working_hours;
        }
        else {
            var reducerFn = function (acc, currentVal) {
                var currTime = _this.timestrToSec(currentVal.taskTime);
                var total = acc + currTime;
                return total;
            };
            var time = tasks.reduce(reducerFn, 0);
            this.totalTaskTime = this.formatTime(time);
            if (this.entryDetails.total_working_hours !== this.totalTaskTime) {
                this.updateTotalhrs();
            }
        }
        ;
    };
    EntryDetailsComponent.prototype.updateTotalhrs = function () {
        var _this = this;
        console.log('Need to update the total total_working_hrs', this.entryDetails.total_working_hours, this.totalTaskTime);
        var data = {
            entryId: this.entryId,
            totalTaskTime: this.totalTaskTime
        };
        this.service.updateEntryTime(data).subscribe(function (res) {
            if (res.status) {
                // this.toastr.success('Total Time Updated');
            }
            else {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.handleAddressChange = function (address) {
        var _this = this;
        var data = {
            entryId: this.entryId,
            siteAddress: address.formatted_address
        };
        this.service.updateSiteAddress(data).subscribe(function (res) {
            if (res.status) {
                _this.toastr.success('');
            }
            else {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.handleDateChange = function (date) {
        var _this = this;
        var data = {
            entryId: this.entryId,
            startDate: date.target.value
        };
        this.service.updateEntryDate(data).subscribe(function (res) {
            if (res.status) {
                _this.toastr.success('Date Updated');
            }
            else {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.addtask = function () {
        var _this = this;
        var task = {
            tradeCategory: this.addTaskForm.get("tradeCategory").value,
            taskDescription: this.addTaskForm.get("taskDescription").value,
            taskTime: this.addTaskForm.get("taskTime").value,
            timestamp: new Date().getTime()
        };
        // task.tradeCategory = (task.tradeCategory === 0)? 'No Trade Category' : task.tradeCategory; 
        var data = {
            entryId: this.entryId,
            tasks: task
        };
        // UPDATE THE ENTRY TO ADD NEW TASK
        this.service.updateEntryDetails(data).subscribe(function (res) {
            if (res.status) {
                // this.router.navigate(['/entry-details'])
                _this.getEntryDetails();
                _this.addTaskForm.reset();
                _this.addTaskForm.patchValue({
                    tradeCategory: 'No Trade Category',
                    taskTime: '0:00:00'
                });
                _this.toastr.success('Updated');
            }
            else {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.removeTask = function (index) {
        var _this = this;
        var data = {
            entryId: this.entryId,
            task: this.entryDetails.tasks[index]
        };
        this.service.removeTask(data).subscribe(function (res) {
            if (res.status) {
                _this.getEntryDetails();
                _this.toastr.success('Task Removed');
            }
            else {
                _this.toastr.error(res.message);
            }
        });
    };
    EntryDetailsComponent.prototype.saveNote = function () { };
    EntryDetailsComponent.prototype.share = function () { };
    EntryDetailsComponent.prototype.timesheet = function () { this.router.navigate(['/timesheet']); };
    EntryDetailsComponent.prototype.rout = function () {
        window.history.back();
    };
    __decorate([
        core_1.ViewChild('content', { static: false })
    ], EntryDetailsComponent.prototype, "el");
    EntryDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-entry-details',
            templateUrl: './entry-details.component.html',
            styleUrls: ['./entry-details.component.css']
        })
    ], EntryDetailsComponent);
    return EntryDetailsComponent;
}());
exports.EntryDetailsComponent = EntryDetailsComponent;
