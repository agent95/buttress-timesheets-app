import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.css']
})
export class ClockInComponent implements OnInit {
  valu: any;
  val: any;
  siteName: any;
  siteTime: any;
  second: number = 0;
  minute: string = '';
  hours: number = 0;
  time: boolean = true;
  clockoutvar: any;
  clockin: any;
  totalhrs: any;
  N:any;
  note: any;
  comment: any;
  tradeCategories: any;
  tradeCategory: any;

  constructor(private router: Router, private service: AuthguardServiceService, private activated: ActivatedRoute,private toastr:ToastrService) { }
  clockInForm = new FormGroup({
    tradeCategory: new FormControl(0),
    notes: new FormControl('')
  })
  get notes() {
    return this.clockInForm.get('notes');
  }
  ngOnInit(): void {
    
    this.siteName=localStorage.getItem("siteName");
    this.siteTime=localStorage.getItem("siteTime");

    // difference between two dates in milliseconds 
    const diff = new Date().getTime() - new Date(this.siteTime).getTime();
 

    // new date object created from this difference 
    const start = new Date(diff);
    setInterval(() => {
      // updating the time every second 
      start.setSeconds(start.getSeconds() + 1);
      this.minute = `${format(start.getUTCHours())}:${format(start.getUTCMinutes())}:${format(start.getUTCSeconds())}`;
    }, 1000)
    function format(n: string | number) {
      return n < 10 ? '0' + n : '' + n;
    }

    this.getTradeCategories();
  }

  getTradeCategories(){
    this.service.getTradeCategories().subscribe((res: any) => {
      if (res.status == true) {
        this.tradeCategories = res.data;
      } else if (res.status == false) {
        this.toastr.error(res.message);
      }
    })
  }

  clockout() {
    // if (this.clockInForm.invalid) {
    //   this.comment = "Required note..!"
    // }
    // else {
     
        this.clockin = new Date(this.siteTime).getTime();
        this.clockoutvar = new Date().getTime();
        this.totalhrs = this.minute;
        this.note = this.clockInForm.get("notes")!.value;
        this.tradeCategory = this.clockInForm.get("tradeCategory")!.value;
        localStorage.setItem("clockInTime",this.clockin);
        localStorage.setItem("clockOutTime",this.clockoutvar);
        localStorage.setItem("totalHrs",this.totalhrs);
        localStorage.setItem("tradeCategory",this.tradeCategory);
        localStorage.setItem("note",this.note);
        // localStorage.setItem("id1",this.clockin);
        // localStorage.setItem("id2",this.clockoutvar);
        // localStorage.setItem("id3",this.totalhrs);
        // localStorage.setItem("id4",this.clockoutvar);
        // localStorage.setItem("id5",this.note);
     
        // this.router.navigate(['/clock-out'], { queryParams: { start: btoa(this.clockin), stop: btoa(this.clockoutvar), total: btoa(this.totalhrs), site: btoa(this.siteName), trade: btoa(this.tradeCategory), note: btoa(this.note) } })
        this.router.navigate(['/clock-out']);
        //localStorage.removeItem("siteTime");

    // }

  }
  index() {
    this.router.navigate(['/index'])

  }
  profile() {
    this.router.navigate(['/profile'])

  }
  clock() {
    if (localStorage.getItem("siteAddress") == null) {
      this.router.navigate(['/clock'])

    }
    else {
      if (localStorage.getItem("siteAddress") == "") {
        if (localStorage.getItem("siteTime") !== null) {
          this.router.navigate(['/clock-in'])

        }
        else if (localStorage.getItem("siteTime") == null) {
          this.router.navigate(['/clock-out'])

        }
        else {
          this.router.navigate(['/clock'])
        }
      }
      else {
        if (localStorage.getItem("siteTime") == null) {
          this.router.navigate(['/clock-out'])
        }
        else {

          this.router.navigate(['/clock-in'])
        }
      }
    }
  }
  timesheet() {
    this.router.navigate(['/timesheet'])

  }
  rout() {
    window.history.back();
  }
  logout(){
    this.N=""
    this.toastr.success("logout successfully");
    localStorage.removeItem("token")
    this.router.navigate(['/verify', this.N]);
  }
  blankpage(){
    this.router.navigate(["/blankpage"]);
  }
}
