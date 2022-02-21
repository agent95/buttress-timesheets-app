import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  valu: any;
  product: any;
  comment2: any;
  comment3: any;
  Tdata: any;
  Tdata2: any;
  store:any;
  stt:any;
  constructor(private router: Router,private activated:ActivatedRoute, private Cookies:CookieService,private service: AuthguardServiceService, private toastr: ToastrService, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.activated.paramMap.subscribe(params => {
      this.store = params.get('id');
            console.log("hel", this.store)
    });
    this.var();
  }

  SignUpForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  get mail() {
    return this.SignUpForm.get('mail');
  }
  get password() {
    return this.SignUpForm.get('password');
  }
  valid() {
    if (this.mail?.valid) {
      this.comment2 = "";
      // this.comment3 = "";
    }
    if (this.mail?.invalid) {
      this.comment2 = "email is required..!"
      this.comment3 = ""
    }
  }
  signUp() {

    if (this.SignUpForm.invalid) {
      if (this.mail?.invalid && this.password?.invalid) {
        this.comment2 = "email is required..!"
        this.comment3 = "password is required..!"
      }
      else if (this.mail?.invalid) {
        this.comment2 = "email is required..!"
        this.comment3 = ""
      }
      else if (this.password?.invalid) {
        this.comment3 = "password is required..!"
        this.comment2 = ""
      }

      return;

    }
    else {
      this.valu =
      {
        "email": this.SignUpForm.get("mail")!.value,
        "password": this.SignUpForm.get("password")!.value,
      };
      this.service.postSignUp(this.valu).subscribe((resp: any) => {
        this.product = resp;
        console.log(this.product)

        if (this.product.status == true) {
          this.Cookies.set('email',this.SignUpForm.get("mail")!.value);
this.Cookies.set('password',this.SignUpForm.get("password")!.value);

          localStorage.setItem("token", resp.data.token)
          if (resp.data.insert_new == true) {
            this.router.navigate(['/profile']);
            this.toastr.success(resp.message);

          }
          else {
            if (this.store == "c") {
              this.toastr.success(resp.message);

              this.router.navigate(['/clock']);

            }
            else if (this.store == "t") {
              this.toastr.success(resp.message);

              this.router.navigate(['/timesheet']);

            }
            else if (this.store == "p") {
              this.toastr.success(resp.message);

              this.router.navigate(['/profile']);

            }
            else if (this.store == "b") {
              this.toastr.success(resp.message);

              this.router.navigate(['/blankpage']);

            } else {
              this.toastr.success(resp.message);
              this.router.navigate(['/index']);

            }       
             this.toastr.success(resp.message);
          }

        }
        else {
          this.toastr.error(resp.message);
        }

      })
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
  var() {
    this.stt="q";
    if (localStorage.getItem("token") == null) {
      this.router.navigate(['/sign-up',this.store])
    }
    else {
      this.router.navigate(['/index'])
    }
  }
 
  rout() {
    this.router.navigate(['/sign-in',this.store])
  }
}
