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
  store: any;
  store2: any;
  second: number = 0;
  minute: string = '';
  hours: number = 0;
  time: boolean = true;
  clockoutvar: any;
  clockin: any;
  totalhrs: any;
  sitename: any;
  N:any;
  note: any;
  comment: any;

  constructor(private router: Router, private service: AuthguardServiceService, private activated: ActivatedRoute,private toastr:ToastrService) { }
  clockInForm = new FormGroup({
    notes: new FormControl('')
  })
  get notes() {
    return this.clockInForm.get('notes');
  }
  ngOnInit(): void {
    
    this.store=localStorage.getItem("time13");

    this.store2=localStorage.getItem("time12");
    console.log(this.store2); 

    // difference between two dates in milliseconds 
    const diff = new Date().getTime() - new Date(this.store2).getTime();
 

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



  }
  clockout() {
    // if (this.clockInForm.invalid) {
    //   this.comment = "Required note..!"
    // }
    // else {
     
        this.clockin = new Date(this.store2).getTime();
        this.clockoutvar = new Date().getTime();
        this.totalhrs = this.minute;
        this.sitename = this.store;
        this.note = this.clockInForm.get("notes")!.value
        console.log(this.clockin)
        console.log(this.clockoutvar)
        localStorage.setItem("id1",this.clockin);
        localStorage.setItem("id2",this.clockoutvar);
        localStorage.setItem("id3",this.totalhrs);
        // localStorage.setItem("id4",this.clockoutvar);
        localStorage.setItem("id5",this.note);
     
          this.router.navigate(['/clock-out'], { queryParams: { id1: btoa(this.clockin), id2: btoa(this.clockoutvar), id3: btoa(this.totalhrs), id4: btoa(this.sitename), id5: btoa(this.note) } })
          localStorage.removeItem("time12");

    // }

  }
  index() {
    this.router.navigate(['/index'])

  }
  profile() {
    this.router.navigate(['/profile'])

  }
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
