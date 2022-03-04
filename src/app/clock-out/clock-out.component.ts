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
  // valu: any;
  totalHRS:any;
  clockin:any;
  clockoutvar:any;
  sitename:any;
  note:any;
  N:any;
  TodayDate:any;
  tradeCategories: any;
  taskSummary:any[] = [];

  constructor(private router: Router, private service: AuthguardServiceService, private activated:ActivatedRoute,private toastr:ToastrService,public datepipe: DatePipe) { }
  clockOutForm = new FormGroup({
    mess: new FormControl('',)
  });
  noteForm=new FormGroup({
    message:new FormControl('')
  });
  addTaskForm=new FormGroup({
    tradeCategory: new FormControl(0),
    taskDescription: new FormControl(''),
    taskTime: new FormControl('0:00:00')
  });

  ngOnInit(): void {
    // location.replace("http://localhost:4200/clock")
      this.clockin = localStorage.getItem("clockInTime");
      this.clockoutvar = localStorage.getItem("clockOutTime");
      this.totalHRS=localStorage.getItem("totalHrs");
      this.sitename=localStorage.getItem("siteName");
      this.taskSummary.push({
        tradeCategory: localStorage.getItem('tradeCategory'),
        taskDescription: localStorage.getItem("note"),
        taskTime: this.totalHRS
      })
  
    this.clockOutForm.patchValue({
      'mess':this.note,
    })
    this.noteForm.patchValue({
      'message':this.note,
    })
    this.TodayDate=new Date();
    this.clockOutForm.controls["mess"].disable();

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

  patchMessage(){
    this.noteForm.patchValue({
      'message':this.note,
    })
  }
  saveNote(){
    this.clockOutForm.patchValue({
      'mess':this.noteForm.get("message")!.value,
    })
    localStorage.setItem("note",this.noteForm.get("message")!.value)
  }
  addtask(){
    const task = {
      tradeCategory: this.addTaskForm.get('tradeCategory')!.value, 
      taskDescription: this.addTaskForm.get('taskDescription')!.value, 
      taskTime: this.addTaskForm.get('taskTime')!.value, 
    }

    this.taskSummary.push(task);
    this.toastr.success("Task Added!");
    this.addTaskForm.reset();
    this.addTaskForm.patchValue({
      tradeCategory: 0,
      taskTime: '0:00:00'
    })
    
  }

  index() { this.router.navigate(['/index']) }
  profile() { this.router.navigate(['/profile']) }
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
  timesheet() { this.router.navigate(['/timesheet']) }
  rout() {
    window.history.back();
  }

  confirmTime(){
    const clockData = {
      "end_time":this.datepipe.transform(this.clockoutvar, 'yyyy-MM-ddTHH:mm:ss'),
      "total_working_hours":this.totalHRS,
      "tasks": this.taskSummary
      // "note": this.clockOutForm.get('mess')!.value
    }

    this.service.updateEntry(clockData).subscribe((res: any) => {
      console.log(res);
      if(res.status){
        this.router.navigate(['/timesheet'])
      } else {
        this.toastr.error(res.message);
      }
    })

      localStorage.removeItem("siteAddress");
      localStorage.removeItem("siteName");
      localStorage.removeItem("clockInTime");
      localStorage.removeItem("clockOutTime");
      localStorage.removeItem("totalHrs");
      localStorage.removeItem("note");
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
