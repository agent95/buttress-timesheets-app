
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


@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.css']
})
export class EntryDetailsComponent implements OnInit {
  
  // val: any;
  // valu: any;
  // prm: any;
  // date: any;
  // time: any;
  // todaydate: any;
  // listData: any;
  // newarr: any = [];
  // siteChecking: boolean = true;
  // stime: any;
  // etime: any;
  // thrs: any;
  // sname: any;
  // mentos: any;
  // sendingStime: any;
  // sendingEtime: any;
  // s_id: any;
  // TOTALHRS: any;
  // Note: any;
  // sitecode:any;

  // NEW VARS

  sitename: string = "";
  start_time: string = "0";
  stop_time: string = "0";
  total_hrs: number = 10;
  taskSummary: any = [];
  entryId: any;
  date_today: any;
  entryDetails: any;
  tradeCategories: any;
  N: any;

  constructor(private router: Router, private service: AuthguardServiceService, private activated:ActivatedRoute, private toastr:ToastrService, private datepipe: DatePipe) {
  
  }

  @ViewChild('content', { static: false }) el !: ElementRef;
  
  noteForm = new FormGroup({
    message:new FormControl('')
  });

  clockOutForm = new FormGroup({

  });

  addTaskForm = new FormGroup({
    tradeCategory: new FormControl('0'),
    taskDescription: new FormControl(''),
    taskTime: new FormControl('0:00:00'),
  });
  

  ngOnInit(): void {
    this.activated.queryParams.subscribe(params => {
      this.entryId = atob(params['id']);
    });

    this.getEntryDetails();
    this.getTradeCategories();
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
      } else if (res.status == false) {
        this.toastr.error(res.message);
      }
    })
  }

  addtask(){
    const task = {
      tradeCategory: this.addTaskForm.get("tradeCategory")!.value,
      taskDescription: this.addTaskForm.get("taskDescription")!.value,
      taskTime: this.addTaskForm.get("taskTime")!.value,
    }

    const data = {
      entryId: this.entryId,
      task: task
    }
    // UPDATE THE ENTRY TO ADD NEW TASK
    this.service.updateEntryDetails(data).subscribe((res: any) => {
      if(res.status){
        // this.router.navigate(['/entry-details'])
        this.getEntryDetails();
        this.addTaskForm.reset();
        this.addTaskForm.patchValue({
          tradeCategory: 0,
          taskTime: '0:00:00'
        })
        this.toastr.success('Updated');
      } else {
        this.toastr.error(res.message);
      }
    })
  }

  saveNote(){}
  share(){}

  logout(){
    this.N=""
    this.toastr.success("logout successfully");
    localStorage.removeItem("token")
    // this.router.navigate(['/verify', this.N]);
  }
  blankpage(){
    this.router.navigate(["/blankpage"]);
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

}

