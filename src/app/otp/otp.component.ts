import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'ng-otp-input/lib/models/config';
import { ToastrService } from 'ngx-toastr';
import { concat, interval, merge, timer } from 'rxjs';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  resend: boolean = true;
  timer: any;
  at: any;
  val: any;
  store: any;
  downloadTimer: any;
  data: number = 60;
  comment: any;
  product: any;
  valu: any;
  a1: any;
  otp: string = "";
  a2: any; a3: any; a4: any; A5: any;
  param: any;
  showOtpComponent = true;
  constructor(private activated: ActivatedRoute, private router: Router, private service: AuthguardServiceService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.activated.queryParams.subscribe(params => {
      this.store = atob(params['id1']);
      this.param = atob(params['id2']);
      console.log("hel", this.param)
    });
    // this.resend = false;

    const Itval = setInterval(() => {
      this.data = --(this.data);
      if (this.data <= 0) {
        this.resend = false;
        clearInterval(Itval);
        this.data = 60;

      }
    }, 1000)
    this.var();
  }

  config: Config = {
    allowNumbersOnly: false,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  otpForm = new FormGroup({
    digit1: new FormControl('', [Validators.required, Validators.pattern("[0-9]")]),
  })

  get digit1() {
    return this.otpForm.get('digit1');
  }




  sendValues() {
    if (this.otp == "") {
      this.comment = "OTP is required..!"
      return this.comment;
    }

    else {
      // this.a1 = this.otpForm.get("digit1")!.value;
      // this.a2 = this.otpForm.get("digit2")!.value;
      // this.a3 = this.otpForm.get("digit3")!.value;
      // this.a4 = this.otpForm.get("digit4")!.value;
      // this.A5 = (this.a1 + this.a2 + this.a3 + this.a4);

      // console.log(this.A5);
      this.valu =
      {
        "mobile": this.store, "otp": this.otp
      };

      this.service.postotp(this.valu).subscribe((resp: any) => {
        this.product = resp;
        console.log(this.product)
        if (this.product.status == true) {
          localStorage.setItem("token", resp.data.token)
          if (this.product.data.insert_new == false) {
            if (this.param == "c") {
              this.toastr.success(resp.message);

              this.router.navigate(['/clock']);

            }
            else if (this.param == "t") {
              this.toastr.success(resp.message);

              this.router.navigate(['/timesheet']);

            }
            else if (this.param == "p") {
              this.toastr.success(resp.message);

              this.router.navigate(['/profile']);

            }
            else if (this.param == "b") {
              this.toastr.success(resp.message);

              this.router.navigate(['/blankpage']);

            } else {
              this.toastr.success(resp.message);
              this.router.navigate(['/index']);

            }

          }
          else {
            this.toastr.success(resp.message);

            this.router.navigate(['/profile']);
          }
        }
        else {
          this.toastr.error(resp.message);

        }


      })


    }
  }


  resendOtp() {

    this.at =
      { "mobile": this.store, }
    this.service.postResend(this.at).subscribe((resp: any) => {
      console.log(resp)
      if (resp.status == true) {
        // clearInterval(Itval);
        this.resend = true
        // this.data = 30;

        const Itval2 = setInterval(() => {
          this.data = --(this.data);
          if (this.data <= 0) {
            this.resend = false;
            clearInterval(Itval2);
            this.data = 60;
          }
        }, 1000)
      } else {
        this.comment = "INVALID OTP!"
        // return this.comment;
        this.toastr.error(resp.message);

      }
    })
  }
  onOtpChange(otp: any) {
    this.otp = otp;
  }

  var() {
    if (localStorage.getItem("token") == null) {
      this.router.navigate(["/otp", this.store], { queryParams: { id1: btoa(this.store), id2: btoa(this.param) } });
    }
    else {
      this.router.navigate(['/index'])
    }


  }
}


