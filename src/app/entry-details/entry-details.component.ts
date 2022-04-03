
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthguardServiceService } from '../authguard-service.service';
import { DatePipe } from '@angular/common'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { jsPDF } from 'jspdf'
import { Content } from '@angular/compiler/src/render3/r3_ast';
import html2canvas from 'html2canvas';
import { ClockOutComponent } from '../clock-out/clock-out.component';
import { IconEditComponent } from '../icon-edit/icon-edit.component';


@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.css']
})
export class EntryDetailsComponent implements OnInit {
  
  

  // NEW VARS

  sitename: string = "";
  taskSummary: any = [];
  entryId: any;
  date_today: any;
  entryDetails: any;
  tradeCategories: any;
  N: any;
  totalTaskTime: string = "00:00";
  placesOptions: any;
  timeDiff: string = "0:00";
  time_in: any = "0:00";
  time_out: any = "0:00";
  unallocatedTime: string = "0:00";

  // time_in: any;
  // time_out: any;

  constructor(private router: Router, private service: AuthguardServiceService, private activated:ActivatedRoute, private toastr:ToastrService, private datepipe: DatePipe) {
  
  }

  @ViewChild('content', { static: false }) el !: ElementRef;
  
  noteForm = new FormGroup({
    message:new FormControl('')
  });

  clockOutForm = new FormGroup({

  });

  addTaskForm = new FormGroup({
    tradeCategory: new FormControl('No Trade Category'),
    taskDescription: new FormControl(''),
    taskTime: new FormControl('0:00'),
  });  

  ngOnInit(): void {
    this.activated.queryParams.subscribe(params => {
      this.entryId = atob(params['id']);
    });

    this.getEntryDetails();
    this.getTradeCategories();
    this.placesOptions= {componentRestrictions:{country: 'AU'}};

    // this._time_out = this.entryDetails?.time_out ?? this.entryDetails?.end_time;
  }

  // set time_in(val){
  //   this._time_in = val;
  // }
  
  // get time_in(){
  //   // this.timeDifference = this.calcTimeDifference(this._time_in,this._time_out);
  //   return this._time_in;
  // }

  // set time_out(val){
  //   this._time_out = val;
  // }
  
  // get time_out(){
  //   // this.timeDifference = this.calcTimeDifference(this._time_in,this._time_out);
  //   return this._time_out;
  // }

  // set timeDifference(val){
  //   this._timeDiff = val;
  // }

  // get timeDifference(){
  //   return this._timeDiff;
  // }

  get extraTime(){
    return (this.totalTaskTime > this.timeDiff) ? this.calcTimeDifference(this.timeDiff,this.totalTaskTime) : 0;
  }

  calcUnallocatedTime(){
    this.unallocatedTime = (this.timeDiff > this.totalTaskTime)? this.calcTimeDifference(this.totalTaskTime,this.timeDiff): "";
  }

  fixExtraTime(){

    // console.log(this.timestrToSec(this.time_out),this.timestrToSec(this.extraTime), this.formatTime(sumTime));
    const timeOut = new Date(`${this.entryDetails.start_Date}T${this.time_out}`).getTime();
    const sumTime = new Date(timeOut + this.timestrToSec(this.extraTime)*1000);
    this.time_out = this.datepipe.transform(sumTime,'HH:mm');

    this.updateTimeInOut();
  }

  // reviewTotalTime(){
  //   return this.totalTaskTime > this.timeDiff;
  // }

  calcTimeDifference(start:any, end:any){
    const diff = this.timestrToSec(end) - this.timestrToSec(start);
    return this.formatTime(diff);
  }

  updateClockIn(val:any){
    this.time_in = val.target.value;
    this.updateTimeInOut();
  }

  updateClockOut(val: any){
    this.time_out = val.target.value;
    this.updateTimeInOut();
  }

  getTradeCategories(){
    this.service.getTradeCategories().subscribe((res: any) => {
      if (res.status == true) {
        this.tradeCategories = res.data;
      } else if (res.status == false) {
        this.toastr.error(res.message);
      }
    });
  }

  getEntryDetails(){
    this.service.getEntryDetails(this.entryId).subscribe((res: any) => {
      if (res.status == true) {
        this.entryDetails = res.data;
        this.getSumOfTaskTime(this.entryDetails.tasks);
        this.time_in = this.datepipe.transform(this.entryDetails?.time_in ?? this.entryDetails?.start_time, 'HH:mm') || "" ;
        this.time_out = this.datepipe.transform(this.entryDetails?.time_out ?? this.entryDetails?.end_time, 'HH:mm') || "" ;
        this.timeDiff = this.calcTimeDifference(this.time_in,this.time_out);
        this.calcUnallocatedTime();
      } else if (res.status == false) {
        this.toastr.error(res.message);
      }
    })
  }

  deleteEntry(){
    this.service.removeEntry(this.entryId).subscribe((res: any) => {
      if (res.status == true) {
        this.timesheet();
      } else if (res.status == false) {
        this.toastr.error(res.message);
      }
    })
  }

  getSumOfTaskTime(tasks: any){
    //  if (this.entryDetails.tasks.length === 1){
    //   this.totalTaskTime = this.entryDetails.total_working_hours;
    //  } else {
    //    let reducerFn = (acc:any, currentVal:any) => {
    //      const currTime = this.timestrToSec(currentVal.taskTime);
    //      const total = acc + currTime;
    //      return total;
    //     };
    //    let time = tasks.reduce(reducerFn,0);
    //    this.totalTaskTime =  this.formatTime(time);

    //    if(this.entryDetails.total_working_hours !== this.totalTaskTime){
    //      this.updateTotalhrs();
    //    }
    //  }; 
      let reducerFn = (acc:any, currentVal:any) => {
        const currTime = this.timestrToSec(currentVal.taskTime);
        const total = acc + currTime;
        return total;
      };
      let time = tasks.reduce(reducerFn,0);
      this.totalTaskTime =  this.formatTime(time);

      if(this.entryDetails.total_working_hours !== this.totalTaskTime){
        this.updateTotalhrs();
      }
  }
  
  timestrToSec = (timestr:any) => {
    let parts = timestr && timestr.split(":");
    // return (parseInt(parts[0]) * 3600) + (parseInt(parts[1]) * 60) + (parseInt(parts[2]));
    return (parseInt(parts[0]) * 3600) + (parseInt(parts[1]) * 60);
  }
  
  pad = (num:any) => {
    if(num < 10) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }
  
  formatTime = (seconds:any) => {
    return [this.pad(Math.floor(seconds/3600)),
            this.pad(Math.floor(seconds/60)%60),
            // this.pad(seconds%60),
            ].join(":");
  }

  updateTotalhrs(){
    console.log('Need to update the total total_working_hrs',this.entryDetails.total_working_hours, this.totalTaskTime);
    const data = {
      entryId : this.entryId,
      totalTaskTime: this.totalTaskTime
    }

    this.service.updateEntryTime(data).subscribe((res: any) => {
      if(res.status){
        // this.toastr.success('Total Time Updated');
      } else {
        this.toastr.error(res.message);
      }
    })

  }

  updateTimeInOut(){
    const data = {
      entryId : this.entryId,
      timeIn: `${this.entryDetails.start_Date}T${this.time_in}`,
      timeOut: `${this.entryDetails.start_Date}T${this.time_out}`
    }

    this.timeDiff = this.calcTimeDifference(this.time_in,this.time_out);
    this.calcUnallocatedTime();

    this.service.updateTimeInOut(data).subscribe((res: any) => {
      if(res.status){
        this.toastr.success('Updated');
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  handleAddressChange(address: any) {
    const data = {
      entryId : this.entryId,
      siteAddress: address.formatted_address
    }

    this.service.updateSiteAddress(data).subscribe((res: any) => {
      if(res.status){
        this.toastr.success('');
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  handleDateChange(date: any){
    const data = {
      entryId : this.entryId,
      startDate: date.target.value
    }

    this.service.updateEntryDate(data).subscribe((res: any) => {
      if(res.status){
        this.toastr.success('Date Updated');
      } else {
        this.toastr.error(res.message);
      }
    })
  }
  
  addtask(){
    const task = {
      tradeCategory: this.addTaskForm.get("tradeCategory")!.value,
      taskDescription: this.addTaskForm.get("taskDescription")!.value,
      taskTime: this.addTaskForm.get("taskTime")!.value,
      timestamp: new Date().getTime()
    }

    // task.tradeCategory = (task.tradeCategory === 0)? 'No Trade Category' : task.tradeCategory; 

    const data = {
      entryId: this.entryId,
      tasks: task
    }
    // UPDATE THE ENTRY TO ADD NEW TASK
    this.service.updateEntryDetails(data).subscribe((res: any) => {
      if(res.status){
        // this.router.navigate(['/entry-details'])
        this.getEntryDetails();
        this.addTaskForm.reset();
        this.addTaskForm.patchValue({
          tradeCategory: 'No Trade Category',
          taskTime: '0:00'
        })
        this.toastr.success('Updated');
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  removeTask(index:any){
    const data = {
      entryId: this.entryId,
      task: this.entryDetails.tasks[index]
    }

    this.service.removeTask(data).subscribe((res: any) => {
      if(res.status){
        this.getEntryDetails();
        this.toastr.success('Task Removed');
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  saveNote(){}
  share(){}

  timesheet() { this.router.navigate(['/timesheet']) }
  rout() {
    window.history.back();
  }

}

