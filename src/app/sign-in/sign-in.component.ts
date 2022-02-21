import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  valu: any;
  product: any;
  comment2: any;
  comment3: any;
  comment4: any;
  Tdata: any;
  store: any;
  Tdata2: any;
  stt:any;
  constructor(private router: Router, private activated: ActivatedRoute, private service: AuthguardServiceService, private toastr: ToastrService, private socialAuthService: SocialAuthService,private Cookies:CookieService) { }
  demoEmail=this.Cookies.get('email');
demoPassword=this.Cookies.get('password');
  SignInForm = new FormGroup({
    mail: new FormControl(this.demoEmail, [Validators.required, Validators.email]),
    password: new FormControl(this.demoPassword, [Validators.required, Validators.minLength(6)]),
  })
  get mail() {
    return this.SignInForm.get('mail');
  }
  get password() {
    return this.SignInForm.get('password');
  }
  ngOnInit(): void {
    this.activated.paramMap.subscribe(params => {
      this.store = params.get('id');
      console.log("hel", this.store)
    });
    this.var();
  }
  gotoSignUp() {
    this.router.navigate(['/sign-up',this.store])
  }
  // gotoHome(){
  //   this.router.navigate(['/index'])
  //     }
  valid() {
    if (this.mail?.valid) {
      this.comment2 = "";
      // this.comment3="";
    }
    if (this.mail?.invalid) {
      this.comment2 = "email is required..!"
      this.comment3 = ""
    }
  }
  signIn() {

    if (this.SignInForm.invalid) {
      if (this.mail?.invalid && this.password?.invalid) {
        this.comment2 = "email is required..!"
        this.comment3 = "invalid password!"
      }
      else if (this.mail?.invalid) {
        this.comment2 = "email is required..!"
        this.comment3 = ""
      }
      else if (this.password?.invalid) {
        this.comment3 = "invalid password!"
        this.comment2 = ""
      }

      return;

    }
    else {
      this.valu =
      {
        "email": this.SignInForm.get("mail")!.value,
        "password": this.SignInForm.get("password")!.value,
      };
      this.service.postSignIn(this.valu).subscribe((resp: any) => {
        this.product = resp;
        console.log(this.product)
        if (this.product.status == true) {
this.Cookies.set('email',this.SignInForm.get("mail")!.value);
this.Cookies.set('password',this.SignInForm.get("password")!.value);
          localStorage.setItem("token", resp.data.token)
          if (resp.data.insert_new == false) {
            if (this.store == "c") {
          this.toastr.success("welcome");

              this.router.navigate(['/clock']);

            }
            else if (this.store == "t") {
          this.toastr.success("welcome");

              this.router.navigate(['/timesheet']);

            }
            else if (this.store == "p") {
          this.toastr.success("welcome");

              this.router.navigate(['/profile']);

            }
            else if (this.store == "b") {
          this.toastr.success("welcome");

              this.router.navigate(['/blankpage']);

            } else {
          this.toastr.success("welcome");
              this.router.navigate(['/index']);

            }
          }
          else {
            this.router.navigate(['/profile']);
          }
        }
        else {
          this.toastr.error(resp.message);
        }

      })
    }
  }

  var() {
    this.stt="q";
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/sign-in',this.store])
    }
    else {
      this.router.navigate(['/index'])
    }
  }
  onGoogleSignIn() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res: any) => {
      console.log(res)
      this.Tdata = res.email
      console.log(this.Tdata)
      this.service.postSocialLogin(this.Tdata).subscribe((res: any) => {
        console.log(res)
        if (res.status == true) {
          this.toastr.success("Successfully Loged-In")
          localStorage.setItem("token", res.data)
          this.router.navigate(['/index'])
        }
      })
    });
  }
  onFBSignIn() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((res: any) => {
      console.log(res)
      this.Tdata2 = res.email
      console.log(this.Tdata2)
      this.service.postSocialLogin(this.Tdata2).subscribe((res: any) => {
        console.log(res)
        if (res.status == true) {
          this.toastr.success("Successfully Loged-In")
          localStorage.setItem("token", res.data)
          this.router.navigate(['/index'])
        }
      })
    });
  }
  rout() {
    this.router.navigate(['/verify',this.store])
  }
}
