import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DatePipe } from '@angular/common'
import { AuthguardServiceService, Product } from '../authguard-service.service';
import {formatDate} from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  // val: any;
  array: [] = [];
  i: any;
  startdate: any;
  userDetails: any;
  Stime:any;
  Etime: any;
  Thours: any;
  itm: any;
  hrs: any; 
  a1:any;
  a2:any;
  newarr: any = [];
  myCurrentDate:any;
  // myPastDate:any;
  
  constructor(private router: Router, private service: AuthguardServiceService,public datepipe: DatePipe,private toastr:ToastrService) {
  }
  // this.myCurrentDate=new Date();
  // var myPastDate=new Date(this.myCurrentDate);
  //     myPastDate.setDate(myPastDate.getDate() - 8);

 dat=this.datepipe.transform(new Date().getTime(), 'MM-dd-yyyy') ;
 delay=new Date(new Date()).setDate(new Date(new Date()).getDate()-10);
 delay2=this.datepipe.transform(new Date(this.delay).getTime(), 'MM-dd-yyyy') ;
  timesheetForm = new FormGroup({
    initialDate: new FormControl(this.delay2),
    endDate: new FormControl(this.dat),
  })

  ngOnInit(): void {
    this.callApi();
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

  // sendtimesheet(id:any, date:any,time:any) { 
  //   this.router.navigate(['/entry-details'], { queryParams: {id:btoa(id), date: btoa(date), time: btoa(time)} }) 
  // }

  sendtimesheet(id:any) { 
    this.router.navigate(['/entry-details'], { queryParams: {id:btoa(id)} }) 
  }

  callApi() {
    const dateRange = {
      "start_time": this.timesheetForm.get("initialDate")!.value,
      "end_time": this.timesheetForm.get("endDate")!.value,
    }
    this.service.getTimeSheet(dateRange).subscribe((res: any) => {
      console.log(res);
      this.userDetails = res.data;
      this.userDetails=this.userDetails?.reverse();
      console.log('this.userDetails: ',this.userDetails);
      // for(let i = 0; i < this.userDetails.length; i++){
      // this.newarr=res.data[i].total_working_hours.split(":",2)
      // console.log("hwlo",this.newarr);
      // res.data[i].total_working_hours = this.newarr[0]+":"+this.newarr[1];

      // }

      
    })
   
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(["/verify"]);
  }
  blankpage(){
    this.router.navigate(["/blankpage"]);
  }
}



