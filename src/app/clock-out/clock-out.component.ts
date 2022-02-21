import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';

@Component({
  selector: 'app-clock-out',
  templateUrl: './clock-out.component.html',
  styleUrls: ['./clock-out.component.css']
})
export class ClockOutComponent implements OnInit {
  valu: any;
  totalHRS:any;
  clockin:any;
  clockoutvar:any;
  sitename:any;
  note:any;
  N:any;
  TodayDate:any;
  constructor(private router: Router, private service: AuthguardServiceService, private activated:ActivatedRoute,private toastr:ToastrService,public datepipe: DatePipe) { }
  clockOutForm = new FormGroup({
    mess: new FormControl('',)
  })
  noteForm=new FormGroup({
    message:new FormControl('')
  })
  ngOnInit(): void {
    // location.replace("http://localhost:4200/clock")
      this.clockin = localStorage.getItem("id1");
      this.clockoutvar = localStorage.getItem("id2");
      this.totalHRS=localStorage.getItem("id3");
      this.sitename=localStorage.getItem("time13");
      this.note=localStorage.getItem("id5");
  
    this.clockOutForm.patchValue({
      'mess':this.note,
    })
    this.noteForm.patchValue({
      'message':this.note,
    })
    this.TodayDate=new Date();
    this.clockOutForm.controls["mess"].disable();
  }
  patchMessage(){
    this.noteForm.patchValue({
      'message':this.note,
    })
  }
  saveNote(){
    this.clockOutForm.patchValue({
      'mess':this.noteForm.get("message")!.value,
    })
    localStorage.setItem("id5",this.noteForm.get("message")!.value)
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
  rout() {
    window.history.back();
  }

  clockPut() {
   
    this.valu = {
        "end_time":this.datepipe.transform(this.clockoutvar, 'yyyy-MM-ddTHH:mm:ss'),
        "total_working_hours":this.totalHRS,
        "note": this.clockOutForm.get('mess')!.value
      }
    this.service.clockput(this.valu).subscribe((resp: any) => {
      console.log(resp);
      if(resp.status==true){
        
        this.toastr.success("Your timer end for this site");        
        this.router.navigate(['/clock'])
      }
      if(resp.status==false){
        this.toastr.error(resp.message);
      }
      localStorage.removeItem("latestToken1");
      // localStorage.removeItem("time12");
      localStorage.removeItem("time13");
      localStorage.removeItem("id1");
      localStorage.removeItem("id2");
      localStorage.removeItem("id3");
      localStorage.removeItem("id5");

    })
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
