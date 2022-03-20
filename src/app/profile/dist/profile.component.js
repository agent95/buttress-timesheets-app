"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(router, service, toastr) {
        this.router = router;
        this.service = service;
        this.toastr = toastr;
        this.products = [];
        this.profileForm = new forms_1.FormGroup({
            img: new forms_1.FormControl(''),
            fname: new forms_1.FormControl(''),
            lname: new forms_1.FormControl(''),
            number: new forms_1.FormControl(''),
            email: new forms_1.FormControl(''),
            CompanyName: new forms_1.FormControl(''),
            ABN: new forms_1.FormControl(''),
            Qualifications: new forms_1.FormControl(''),
            Whitecard: new forms_1.FormControl(''),
            Safetyrating: new forms_1.FormControl('')
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getItem();
        // this.ab();
    };
    // ab(){
    //   if(this.profileForm.value.number!==""){
    //     this.profileForm.controls["number"].disable();
    //   }
    // }
    ProfileComponent.prototype.uploadprofile = function (event) {
        if (event.target.files && event.target.files[0]) {
            this.profileImage = event.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            this.uploadimages();
        }
    };
    ProfileComponent.prototype.uploadimages = function () {
        var _this = this;
        var formData = new FormData();
        formData.append('image', this.profileImage);
        this.service.uploadimage(formData).subscribe(function (res) {
            console.log(res);
            if (res.status == true) {
                _this.toastr.success(res.message);
                _this.getItem();
            }
            else {
                _this.toastr.error(res.message);
            }
        });
    };
    //   limit(event:any){
    // const reg=/^-?\d(\d{0,9})?$/;
    // let input =event.target.value+String.fromCharCode(event.charCode);
    // if(!reg.test(input)){
    //   event.preventDefault();
    // }
    //   }
    ProfileComponent.prototype.getItem = function () {
        var _this = this;
        this.service.updateProduct().subscribe(function (resp) {
            console.log(resp);
            _this.products = resp.data;
            console.log("hellol", _this.products);
            if (resp.status == true) {
            }
            else if (resp.status == false) {
                alert(resp.message);
            }
            _this.profileForm.patchValue({
                'fname': _this.products.firstname,
                'lname': _this.products.lastname,
                'number': _this.products.mobile,
                'email': _this.products.email,
                'CompanyName': _this.products.companyName,
                'ABN': _this.products.xabn,
                'Qualifications': _this.products.xqualifications,
                'Whitecard': _this.products.xwhitecard,
                'Safetyrating': _this.products.xsafetyrating
            });
        });
    };
    ProfileComponent.prototype.sendDetails = function () {
        var _this = this;
        this.details = { "firstname": this.profileForm.get("fname").value, "lastname": this.profileForm.get("lname").value, "mobile": this.profileForm.get("number").value, "email": this.profileForm.get("email").value, "companyName": this.profileForm.get("CompanyName").value, "xabn": this.profileForm.get("ABN").value, "xqualifications": this.profileForm.get("Qualifications").value, "xwhitecard": this.profileForm.get("Whitecard").value, "xsafetyrating": this.profileForm.get("Safetyrating").value };
        this.service.putDetails(this.details).subscribe(function (res) {
            console.log(res);
            if (res.status == true) {
                _this.toastr.success(res.message);
                _this.getItem();
                _this.router.navigate(["/clock"]);
            }
            else if (res.status == false) {
                _this.toastr.error(res.message);
            }
        });
    };
    ProfileComponent.prototype.gotoClock = function () {
        this.router.navigate(["/clock"]);
    };
    ProfileComponent.prototype.rout = function () {
        window.history.back();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
