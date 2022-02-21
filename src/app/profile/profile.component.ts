import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  details: any;
  products: any = [];
  ftu: any;
  profileImage: any;
  val: any;

  constructor(private router: Router, private service: AuthguardServiceService, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getItem();
    // this.ab();
  }
  index() { this.router.navigate(['/index']) }
  profile() { this.router.navigate(['/profile']) }
  clock() {
    if (localStorage.getItem("latestToken1") == null) {
      this.router.navigate(['/clock'])

    }
    else {
      if (localStorage.getItem("latestToken1") == "") {
        if (localStorage.getItem("time12") !== null) {
          this.router.navigate(['/clock-in'])

        }
        else if (localStorage.getItem("time12") == null) {
          this.router.navigate(['/clock-out'])

        }
        else {
          this.router.navigate(['/clock'])
        }
      }
      else {
        if (localStorage.getItem("time12") == null) {
          this.router.navigate(['/clock-out'])
        }
        else {

          this.router.navigate(['/clock-in'])
        }
      }
    }
  }
  timesheet() { this.router.navigate(['/timesheet']) }

  profileForm = new FormGroup({
    img: new FormControl(''),
    fname: new FormControl(''),
    lname: new FormControl(''),
    number: new FormControl(''),
    email: new FormControl(''),
    CompanyName: new FormControl(''),
    ABN: new FormControl(''),
    Qualifications: new FormControl(''),
    Whitecard: new FormControl(''),
    Safetyrating: new FormControl(''),

  })
  // ab(){
  //   if(this.profileForm.value.number!==""){
  //     this.profileForm.controls["number"].disable();
  //   }
  // }

  uploadprofile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.profileImage = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.uploadimages();
    }
  }
  uploadimages() {
    let formData = new FormData();
    formData.append('image', this.profileImage);
    this.service.uploadimage(formData).subscribe((res: any) => {
      console.log(res);
      if (res.status == true) {
        this.toastr.success(res.message);
        this.getItem();
      } else {
        this.toastr.error(res.message);
      }
    });
  }

//   limit(event:any){
// const reg=/^-?\d(\d{0,9})?$/;
// let input =event.target.value+String.fromCharCode(event.charCode);
// if(!reg.test(input)){
//   event.preventDefault();
// }
//   }
  getItem() {
    this.service.updateProduct().subscribe((resp: any) => {
      console.log(resp);
      this.products = resp.data;
      console.log("hellol",this.products);
      if (resp.status == true) {
      } else if (resp.status == false) {
        alert(resp.message)
      }
      this.profileForm.patchValue({

        'fname': this.products.firstname,
        'lname': this.products.lastname,
        'number': this.products.mobile,
        'email': this.products.email,
        'CompanyName': this.products.companyName,
        'ABN': this.products.xabn,
        'Qualifications': this.products.xqualifications,
        'Whitecard': this.products.xwhitecard,
        'Safetyrating': this.products.xsafetyrating,
      });
    });
  }
  sendDetails() {
    this.details = { "firstname": this.profileForm.get("fname")!.value, "lastname": this.profileForm.get("lname")!.value, "mobile": this.profileForm.get("number")!.value, "email": this.profileForm.get("email")!.value, "companyName": this.profileForm.get("CompanyName")!.value, "xabn": this.profileForm.get("ABN")!.value, "xqualifications": this.profileForm.get("Qualifications")!.value, "xwhitecard": this.profileForm.get("Whitecard")!.value, "xsafetyrating": this.profileForm.get("Safetyrating")!.value, }
    this.service.putDetails(this.details).subscribe((res: any) => {
      console.log(res)
      if (res.status == true) {
        this.toastr.success(res.message);
        this.getItem();
        this.router.navigate(["/index"]);
      } else if (res.status == false) {
        this.toastr.error(res.message);
      }
    })
  }
  logout() {
    localStorage.removeItem("token")
    this.router.navigate(["/verify"]);
  }
  gotoHome() {
    this.router.navigate(["/index"]);
  }
  rout() {
    window.history.back();
  }
  blankpage() {
    this.router.navigate(["/blankpage"]);
  }
}