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


@Component({
  selector: 'app-timesheet-task',
  templateUrl: './timesheet-task.component.html',
  styleUrls: ['./timesheet-task.component.css']
})
export class TimesheetTaskComponent implements OnInit {
  val: any;
  valu: any;
  prm: any;
  date: any;
  time: any;
  todaydate: any;
  listData: any;
  newarr: any = [];
  siteChecking: boolean = true;
  stime: any;
  etime: any;
  thrs: any;
  sname: any;
  mentos: any;
  sendingStime: any;
  sendingEtime: any;
  s_id: any;
  TOTALHRS: any;
  Note: any;
sitecode:any;

  constructor(private router: Router, private service: AuthguardServiceService, private activated: ActivatedRoute, private toastr: ToastrService, public datepipe: DatePipe) { }
  sendtimesheet(Stime: any, Etime: any, Thrs: any, Sname: any, S_id: any, note: any,site_code:any) {
    this.stime = Stime;
    this.etime = Etime;
    this.thrs = Thrs;
    this.sname = Sname;
    this.s_id = S_id;
    this.Note = note;
this.sitecode=site_code;
    this.sendingStime = this.datepipe.transform(this.stime, 'yyyy-MM-ddTHH:mm:ss'),
      this.sendingEtime = this.datepipe.transform(this.etime, 'yyyy-MM-ddTHH:mm:ss'),
      // alert(this.s_id)

      this.EDITSite.patchValue({
"SITECODE":this.sitecode,
        "STARTTIME": this.datepipe.transform(this.stime, 'MMM dd/yyyy'),
        "STARTTIME2": this.datepipe.transform(this.stime, 'HH:mm:ss'),
        "ENDTIME": this.datepipe.transform(this.etime, 'MMM dd/yyyy'),
        "ENDTIME2": this.datepipe.transform(this.etime, 'HH:mm:ss'),
        "NOTE": this.Note,
      })
    // alert(this.datepipe.transform(this.EDITSite.value.STARTTIME, 'yyyy-MM-dd')+"T"+this.EDITSite.value.STARTTIME2)
    // alert(this.Note)
  }
  timesheetTaskForm = new FormGroup({
    categories: new FormControl(''),
    code: new FormControl(''),
    taskNote: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
  })
  EDITSite = new FormGroup({
    STARTNAME: new FormControl(''),
    SITECODE:new FormControl(''),
    STARTTIME: new FormControl(''),
    STARTTIME2: new FormControl(''),
    ENDTIME: new FormControl(''),
    ENDTIME2: new FormControl(''),
    NOTE: new FormControl(''),
  })


  ngOnInit(): void {
    this.service.getData().subscribe((res: any) => {
      this.valu = res.data;
      console.log("happy", this.valu)
    })
    this.activated.queryParams.subscribe(params => {
      this.date = atob(params['date']);
      this.time = atob(params['time']);
      console.log(this.date)

    });
    this.getData();
  }
  @ViewChild('content', { static: false }) el !: ElementRef;
  makepdf() {
    var siteTime3: any = new Date().getTime();
    var data1: any = document.getElementById('content');
    html2canvas(data1).then(canvas => {
      console.log(canvas)
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight:any = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      console.log(imgHeight)
      const contentDataUrl = canvas.toDataURL('image/jpeg');
      let pdf = new jsPDF('p', 'mm', 'a4');
      var Position =5;
      pdf.addImage(contentDataUrl, 'JPEG', 0, Position, imgWidth, imgHeight)
      heightLeft -= pageHeight;
      while (heightLeft >= 0) {
         Position = heightLeft - imgHeight +2;
         pdf.addPage();
         pdf.addImage(contentDataUrl, 'JPEG', 0, Position, imgWidth, imgHeight);
         heightLeft -= pageHeight;
      }
      pdf.save(siteTime3);
    })

    // var siteTime3: any = new Date().getTime();
    // let pdf = new jsPDF('p', 'pt', 'a2');
    // pdf.html(this.el.nativeElement, {
    //   callback: (pdf) => {
    //     pdf.save(siteTime3);
    //   },
    //   margin: [30,25,25,25],
    //   // x: 50,
    //   // y: 32,
    // });

  }

  make(){
    
  }
  closemodal1() {
    let myDialog: any = document.getElementById("exampleModal5");
    myDialog.close('exampleModal5');
  }
  updateDetails() {

    this.mentos = {
      "start_time": this.datepipe.transform(this.EDITSite.value.STARTTIME, 'yyyy-MM-dd') + "T" + this.EDITSite.value.STARTTIME2,
      "end_time": this.datepipe.transform(this.EDITSite.value.ENDTIME, 'yyyy-MM-dd') + "T" + this.EDITSite.value.ENDTIME2,
      "code": this.EDITSite.value.STARTNAME,
      "note": this.EDITSite.value.NOTE,
    }
    this.service.putEditSite(this.mentos, this.s_id).subscribe((res: any) => {
      console.log(res)
      if (res.status == true) {
        window.location.reload();

      }

    })
    // this.router.navigate(['/timesheet-task'], { queryParams: { date: btoa(this.stime), time: btoa(this.thrs)} }) 

    // window.location.reload();
  }

  getData() {
    this.service.gettimesheetTask(this.date).subscribe((res: any) => {
      if (res.status == true) {
        console.log(res)
        this.listData = res.data.allResult;
        this.TOTALHRS = res.data.total_hours;
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].siteName != "") {
            this.listData[i].siteChecking = false;
          }
          else {
            this.listData[i].siteChecking = true;
          }
          // this.newarr = res.data.allResult[i].total_working_hours.split(":", 2)
          // console.log("hwlo", this.newarr);
          // res.data.allResult[i].total_working_hours = this.newarr[0] + ":" + this.newarr[1];

        }
        console.log("11", this.listData);
        // this.Note=this.listData[0].note;
      }
      else {
        this.toastr.error(res.message);
      }
      // this.router.navigate(['/timesheet-task'])
    })
  }
  changeCity(e: any) {
    this.timesheetTaskForm.patchValue({
      "code": e.target.value

    })
  }
  changeCode(e: any) {
    this.EDITSite.patchValue({
      "SITECODE": e.target.value

    })
  }
  timesheet() {
    this.val = {
      "site_code": this.timesheetTaskForm.get("code")!.value,
      "start_time": this.date + 'T' + this.timesheetTaskForm.get("startTime")!.value,
      "end_time": this.date + 'T' + this.timesheetTaskForm.get("endTime")!.value,
      "note": this.timesheetTaskForm.get("taskNote")!.value,
    }
    this.service.postAddTask(this.val).subscribe((res: any) => {
      console.log(res);
      if (res.status == true) {
        this.toastr.success(res.message);
        this.router.navigate(['/timesheet'])
      }
      else {
        this.toastr.error(res.message);

      }

    })
    // this.a1 =this.datepipe.transform(this.todaydate, 'yyyy-MM-dd')

  }
  // this.router.navigate(['/timesheet'])}
  rout() {
    window.history.back();
  }

  gotoTimesheet() {
    this.router.navigate(['/timesheet'])
  }
  openAlert() {
    alert("Editable...")
  }
}
