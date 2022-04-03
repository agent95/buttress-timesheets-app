import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  products: any;
  nums: any;
  param: any;
  comment: any;
  val: any;
  store: any;
  err:any;
  getnum:any;
  constructor(private router: Router, private service: AuthguardServiceService, private toastr: ToastrService, private activated: ActivatedRoute) { }

  ngOnInit(): void {
    this.activated.paramMap.subscribe(params => {
      this.store = params.get('id');
      // this.val = this.activated.queryParams.subscribe(res => {
      //   this.store = atob(res['id']);
      console.log("hel", this.store)
    });
    this.var();

  }
  inputForm = new FormGroup({
    'number': new FormControl('')
  })
  // , [Validators.required, Validators.pattern("[0-9]*")]
  get number() {
    return this.inputForm.get('number');

  }

  onCountryChange(event:any){
    var cont:[]=event;
    console.log("cont",cont)
  }
  hasError(event:any){
    this.err=event;
    console.log("error",event)
  }
  getNumber(event:any){
    this.getnum=event;
    console.log("getnum",event)
  
  }
  telInputObject(event:any){
    console.log("inobj",event)
  }



  addapi() {
    if (this.err==false) {
      this.comment = "mobile number is invalid..!"
      return this.comment;
    }
    else {
      this.nums =
      {
        "mobile": this.getnum
      }
      this.param = this.getnum;
      console.log(this.nums);
      this.service.postLogin(this.nums).subscribe((resp: any) => {

        this.products = resp;
        if (this.products.status == true) {

          // this.toastr.success(resp.message);
          this.router.navigate(['/otp', this.param], { queryParams: { id1: btoa(this.param), id2: btoa(this.store) } })

        }
        else if (this.products.status == false) {
          this.toastr.error(resp.message);
        }
        console.log(this.products);

      });
    }
  }
 
  gotoSignIn() {
    this.router.navigate(['/sign-in',this.store])
  }
  gotoSignUp() {
    this.router.navigate(['/sign-up',this.store])
  }

  var() {
    if (localStorage.getItem("token") == null) {
      // this.router.navigate(["/verify", this.store]);
      this.router.navigate(['/sign-in',this.store])

    }
    else {
      this.router.navigate(['/index'])
    }


  }
}
